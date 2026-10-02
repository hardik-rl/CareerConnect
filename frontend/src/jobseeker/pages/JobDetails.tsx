import { useState } from "react";
import {
  ArrowLeft,
  Bookmark,
  Briefcase,
  Building2,
  CalendarDays,
  Clock3,
  MapPin,
  Users,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { JOBS } from "../../data/jobs";

const JobDetails = () => {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const [isSaved, setIsSaved] = useState(false);
  const [applyMessage, setApplyMessage] = useState("");
  const job = JOBS.find((item) => item.id === Number(id));

  if (!job) {
    return (
      <main className="mx-auto flex min-h-[65vh] max-w-[1240px] flex-col items-start justify-center px-5 py-16 xl:px-0">
        <p className="text-sm font-semibold text-[#2954f2]">Job details</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#151b2b]">
          This job isn’t available
        </h1>
        <p className="mt-3 max-w-lg text-[15px] leading-6 text-[#687386]">
          The job may have been removed or the link may be incorrect. Browse
          current opportunities to find your next role.
        </p>
        <Link
          to="/job-list"
          className="mt-7 inline-flex items-center gap-2 rounded-lg bg-[#2954f2] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1f46d6]"
        >
          <ArrowLeft className="h-4 w-4" />
          Browse jobs
        </Link>
      </main>
    );
  }

  const overview = [
    { label: "Experience", value: job.experience, icon: Clock3 },
    { label: "Job type", value: job.type, icon: Briefcase },
    { label: "Location", value: job.location, icon: MapPin },
    { label: "Posted", value: job.posted, icon: CalendarDays },
  ];

  return (
    <main className="min-h-screen bg-[#f8f9fb] text-[#151b2b]">
      <div className="mx-auto max-w-[1240px] px-5 pb-16 pt-7 sm:pt-10 xl:px-0">
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex flex-wrap items-center gap-2 text-[13px] text-[#687386]"
        >
          <Link to="/job-list" className="transition hover:text-[#2954f2]">
            Find jobs
          </Link>
          <span aria-hidden="true">/</span>
          <span>{job.category}</span>
          <span aria-hidden="true">/</span>
          <span aria-current="page" className="font-medium text-[#151b2b]">
            {job.title}
          </span>
        </nav>

        <section className="rounded-2xl border border-[#e1e6ee] bg-white p-5 shadow-[0_3px_16px_rgba(21,27,43,0.03)] sm:p-7 lg:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <div className="flex h-[62px] w-[62px] shrink-0 items-center justify-center rounded-2xl bg-[#edf2ff] text-[26px] font-bold text-[#2954f2]">
              {job.company.charAt(0)}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-[#edf2ff] px-3 py-1 text-xs font-semibold text-[#2954f2]">
                  {job.category}
                </span>
                <span className="text-xs text-[#7b8494]">Posted {job.posted}</span>
              </div>
              <h1 className="mt-3 text-[26px] font-bold leading-tight tracking-[-0.6px] text-[#151b2b] sm:text-[32px]">
                {job.title}
              </h1>
              <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-[14px] text-[#687386] sm:text-[15px]">
                <span className="font-semibold text-[#343d4c]">{job.company}</span>
                <span aria-hidden="true">·</span>
                <span>{job.location}</span>
                <span aria-hidden="true">·</span>
                <span>{job.type}</span>
              </div>
              <span className="mt-5 inline-flex items-center rounded-full bg-[#e6f8ef] px-3.5 py-1.5 text-[13px] font-semibold text-[#15945e]">
                {job.salary}
              </span>
            </div>

            <div className="flex shrink-0 flex-col gap-3 sm:w-[170px]">
              {isAuthenticated ? (
                <button
                  type="button"
                  onClick={() =>
                    setApplyMessage(
                      "Online applications aren’t available just yet. Please check back soon.",
                    )
                  }
                  className="inline-flex h-11 items-center justify-center rounded-[10px] bg-[#2954f2] px-5 text-sm font-semibold text-white transition hover:bg-[#1f46d6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2954f2]"
                >
                  Apply now
                </button>
              ) : (
                <Link
                  to="/login"
                  className="inline-flex h-11 items-center justify-center rounded-[10px] bg-[#2954f2] px-5 text-sm font-semibold text-white transition hover:bg-[#1f46d6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2954f2]"
                >
                  Apply now
                </Link>
              )}
              <button
                type="button"
                aria-pressed={isSaved}
                onClick={() => setIsSaved((saved) => !saved)}
                className={`inline-flex h-11 items-center justify-center gap-2 rounded-[10px] border px-4 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2954f2] ${
                  isSaved
                    ? "border-[#cdd8ff] bg-[#f2f5ff] text-[#2954f2]"
                    : "border-[#dce2eb] bg-white text-[#343d4c] hover:bg-[#f8f9fb]"
                }`}
              >
                <Bookmark className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
                {isSaved ? "Saved" : "Save job"}
              </button>
            </div>
          </div>
          {applyMessage && (
            <p role="status" className="mt-5 text-sm text-[#687386]">
              {applyMessage}
            </p>
          )}
        </section>

        <div className="mt-6 grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
          <section className="rounded-2xl border border-[#e1e6ee] bg-white p-6 sm:p-8">
            <h2 className="text-xl font-bold tracking-[-0.3px] text-[#151b2b]">
              About the role
            </h2>
            <p className="mt-4 text-[14px] leading-7 text-[#687386] sm:text-[15px]">
              {job.description}
            </p>

            <div className="mt-8 border-t border-[#eef1f5] pt-7">
              <h3 className="text-[17px] font-bold text-[#151b2b]">
                What you’ll do
              </h3>
              <ul className="mt-4 space-y-3.5">
                {job.responsibilities.map((responsibility) => (
                  <li
                    key={responsibility}
                    className="flex gap-3 text-[14px] leading-6 text-[#687386] sm:text-[15px]"
                  >
                    <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#2954f2]" />
                    {responsibility}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 border-t border-[#eef1f5] pt-7">
              <h3 className="text-[17px] font-bold text-[#151b2b]">
                What we’re looking for
              </h3>
              <ul className="mt-4 space-y-3.5">
                {job.requirements.map((requirement) => (
                  <li
                    key={requirement}
                    className="flex gap-3 text-[14px] leading-6 text-[#687386] sm:text-[15px]"
                  >
                    <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#2954f2]" />
                    {requirement}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 border-t border-[#eef1f5] pt-7">
              <h3 className="text-[17px] font-bold text-[#151b2b]">
                Skills and experience
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {job.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full bg-[#f3f5f8] px-3.5 py-2 text-[13px] font-medium text-[#515c6d]"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <aside className="flex flex-col gap-6">
            <section className="rounded-2xl border border-[#e1e6ee] bg-white p-6 sm:p-7">
              <h2 className="text-lg font-bold tracking-[-0.3px] text-[#151b2b]">
                About {job.company}
              </h2>
              <p className="mt-4 text-[14px] leading-6 text-[#687386]">
                {job.companyDescription}
              </p>
              <div className="mt-6 space-y-4 border-t border-[#eef1f5] pt-5 text-[13px] text-[#515c6d]">
                <p className="flex items-center gap-3">
                  <Users className="h-4 w-4 shrink-0 text-[#8791a1]" />
                  {job.companySize}
                </p>
                <p className="flex items-center gap-3">
                  <Building2 className="h-4 w-4 shrink-0 text-[#8791a1]" />
                  {job.category}
                </p>
                <p className="flex items-center gap-3">
                  <CalendarDays className="h-4 w-4 shrink-0 text-[#8791a1]" />
                  {job.founded}
                </p>
              </div>
              <Link
                to="/companies"
                className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-[10px] border border-[#dce2eb] text-sm font-semibold text-[#343d4c] transition hover:bg-[#f8f9fb] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2954f2]"
              >
                View company
              </Link>
            </section>

            <section className="rounded-2xl border border-[#e1e6ee] bg-white p-6 sm:p-7">
              <h2 className="text-lg font-bold tracking-[-0.3px] text-[#151b2b]">
                Job overview
              </h2>
              <dl className="mt-5 space-y-4">
                {overview.map(({ label, value, icon: Icon }) => (
                  <div
                    key={label}
                    className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 text-[13px]"
                  >
                    <dt className="flex items-center gap-2 text-[#7b8494]">
                      <Icon className="h-4 w-4 shrink-0" />
                      {label}
                    </dt>
                    <dd className="text-right font-medium text-[#343d4c]">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          </aside>
        </div>

        <Link
          to="/job-list"
          className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#687386] transition hover:text-[#2954f2]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all jobs
        </Link>
      </div>
    </main>
  );
};

export default JobDetails;
