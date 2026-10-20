import { useEffect, useState } from "react";
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
import { isAxiosError } from "axios";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

type ApiJob = {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  location: string;
  salaryMin: number | null;
  salaryMax: number | null;
  jobType: string;
  experienceLevel: string;
  createdAt: string;
  company: {
    id: string;
    name: string;
  };
};

const formatLabel = (value: string) =>
  value
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const formatSalary = (min: number | null, max: number | null) => {
  const formatAmount = (amount: number) =>
    `₹${amount.toLocaleString("en-IN")}`;

  if (min != null && max != null) {
    return `${formatAmount(min)} - ${formatAmount(max)}`;
  }

  if (min != null) return `From ${formatAmount(min)}`;
  if (max != null) return `Up to ${formatAmount(max)}`;

  return "Salary not disclosed";
};

const JobSeekerJobDetails = () => {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();

  const [isSaved, setIsSaved] = useState(false);
  const [job, setJob] = useState<ApiJob | null>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  const [applyMessage, setApplyMessage] = useState("");
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const fetchJob = async () => {
      if (!id) {
        setLoadError("Invalid job link.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setLoadError("");
      setJob(null);
      setIsApplied(false);
      setApplyMessage("");

      try {
        const response = await api.get<{
          success: boolean;
          data: ApiJob;
        }>(`/jobs/${id}`);

        if (!cancelled) {
          setJob(response.data.data);
        }
      } catch (error) {
        if (!cancelled) {
          setLoadError(
            isAxiosError(error) && error.response?.status === 404
              ? "This job isn’t available."
              : "Unable to load job details. Please try again.",
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void fetchJob();

    return () => {
      cancelled = true;
    };
  }, [id]);

  // const handleApply = async () => {
  //   if (!job || applying || isApplied) return;

  //   if (!isAuthenticated) {
  //     return;
  //   }

  //   setApplying(true);
  //   setApplyMessage("");

  //   try {
  //     await api.post("/api/applications", {
  //       jobId: job.id,
  //     });

  //     setIsApplied(true);
  //     setApplyMessage("Application submitted successfully!");
  //   } catch (error) {
  //     const status = isAxiosError(error)
  //       ? error.response?.status
  //       : undefined;

  //     const message = isAxiosError<{ message?: string }>(error)
  //       ? error.response?.data?.message
  //       : undefined;

  //     if (status === 409 || /already applied/i.test(message ?? "")) {
  //       setIsApplied(true);
  //       setApplyMessage("You have already applied for this job.");
  //     } else {
  //       setApplyMessage(
  //         message || "Unable to submit your application. Please try again.",
  //       );
  //     }
  //   } finally {
  //     setApplying(false);
  //   }
  // };



  // const handleApply = async () => {
  //   console.log("handleApply called");
  //   if (!job || applying || isApplied) return;

  //   if (!isAuthenticated) {
  //     setApplyMessage("Please login to apply for this job.");
  //     return;
  //   }

  //   setApplying(true);
  //   setApplyMessage("");

  //   try {
  //     const response = await api.post("/applications", {
  //       jobId: job.id,
  //     });

  //     console.log("Application response:", response.data);

  //     setIsApplied(true);
  //     setApplyMessage("Application submitted successfully!");
  //   } catch (error) {
  //     console.error("Application error:", error);

  //     if (isAxiosError<{ message?: string }>(error)) {
  //       setApplyMessage(
  //         error.response?.data?.message ||
  //           `Application failed (${error.response?.status ?? "network error"}).`
  //       );
  //     } else {
  //       setApplyMessage("Something went wrong. Please try again.");
  //     }
  //   } finally {
  //     setApplying(false);
  //   }
  // };

const handleApply = async () => {
  if (!job) return;

  try {
    setApplying(true);
    setApplyMessage("");

    await api.post("/applications", {
      jobId: job.id,
    });

    setIsApplied(true);
    setApplyMessage("Application submitted successfully!");
  } catch (error: any) {
    if (error.response?.status === 409) {
      setApplyMessage("You have already applied for this job.");
    } else {
      setApplyMessage(
        error.response?.data?.message ||
          "Failed to submit application."
      );
    }
  } finally {
    setApplying(false);
  }
};



  if (loading) {
    return (
      <main className="flex min-h-[65vh] items-center justify-center bg-[#f8f9fb] px-5">
        <p className="text-sm font-medium text-[#687386]">
          Loading job details...
        </p>
      </main>
    );
  }

  if (!job) {
    return (
      <main className="mx-auto flex min-h-[65vh] max-w-[1240px] flex-col items-start justify-center px-5 py-16 xl:px-0">
        <p className="text-sm font-semibold text-[#2954f2]">Job details</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#151b2b]">
          This job isn’t available
        </h1>
        <p className="mt-3 max-w-lg text-[15px] leading-6 text-[#687386]">
          {loadError ||
            "The job may have been removed or the link may be incorrect."}
          {" "}Browse current opportunities to find your next role.
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

  const jobType = formatLabel(job.jobType);
  const experience = formatLabel(job.experienceLevel);
  const salary = formatSalary(job.salaryMin, job.salaryMax);
  const posted = new Date(job.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const descriptionItems = job.description
    .split(/\n+/)
    .map((item) => item.trim())
    .filter(Boolean);

  const overview = [
    { label: "Experience", value: experience, icon: Clock3 },
    { label: "Job type", value: jobType, icon: Briefcase },
    { label: "Location", value: job.location, icon: MapPin },
    { label: "Posted", value: posted, icon: CalendarDays },
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
          <span>{experience}</span>
          <span aria-hidden="true">/</span>
          <span aria-current="page" className="font-medium text-[#151b2b]">
            {job.title}
          </span>
        </nav>

        <section className="rounded-2xl border border-[#e1e6ee] bg-white p-5 shadow-[0_3px_16px_rgba(21,27,43,0.03)] sm:p-7 lg:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <div className="flex h-[62px] w-[62px] shrink-0 items-center justify-center rounded-2xl bg-[#edf2ff] text-[26px] font-bold text-[#2954f2]">
              {job.company.name.charAt(0).toUpperCase()}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-[#edf2ff] px-3 py-1 text-xs font-semibold text-[#2954f2]">
                  {experience}
                </span>
                <span className="text-xs text-[#7b8494]">
                  Posted {posted}
                </span>
              </div>

              <h1 className="mt-3 text-[26px] font-bold leading-tight tracking-[-0.6px] text-[#151b2b] sm:text-[32px]">
                {job.title}
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-[14px] text-[#687386] sm:text-[15px]">
                <span className="font-semibold text-[#343d4c]">
                  {job.company.name}
                </span>
                <span aria-hidden="true">·</span>
                <span>{job.location}</span>
                <span aria-hidden="true">·</span>
                <span>{jobType}</span>
              </div>

              <span className="mt-5 inline-flex items-center rounded-full bg-[#e6f8ef] px-3.5 py-1.5 text-[13px] font-semibold text-[#15945e]">
                {salary}
              </span>
            </div>

            <div className="flex shrink-0 flex-col gap-3 sm:w-[170px]">
              {/* {isAuthenticated ? (
                <button
                  type="button"
                  onClick={handleApply}
                  disabled={applying || isApplied}
                  className="inline-flex h-11 items-center justify-center rounded-[10px] bg-[#2954f2] px-5 text-sm font-semibold text-white transition hover:bg-[#1f46d6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2954f2] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {applying
                    ? "Applying..."
                    : isApplied
                      ? "Applied"
                      : "Apply now"}
                </button>
              ) : (
                <Link
                  to="/login"
                  className="inline-flex h-11 items-center justify-center rounded-[10px] bg-[#2954f2] px-5 text-sm font-semibold text-white transition hover:bg-[#1f46d6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2954f2]"
                >
                  Apply now
                </Link>
              )} */}



              {/* <button
  type="button"
  onClick={() => {
    console.log("1. Apply button clicked");
    console.log("2. Job:", job);
    console.log("3. Authenticated:", isAuthenticated);
    console.log("4. Applying:", applying);
    console.log("5. Already applied:", isApplied);

    void handleApply();
  }}
  className="inline-flex h-11 items-center justify-center rounded-[10px] bg-[#2954f2] px-5 text-sm font-semibold text-white"
>
  Apply now
</button> */}



              <button
                type="button"
                onClick={handleApply}
                disabled={applying || isApplied}
                className="inline-flex h-11 items-center justify-center rounded-[10px] bg-[#2954f2] px-5 text-sm font-semibold text-white"
              >
                {applying
                  ? "Applying..."
                  : isApplied
                    ? "Already Applied"
                    : "Apply Now"}
              </button>

              {applyMessage && <p role="status">{applyMessage}</p>}

              <button
                type="button"
                aria-pressed={isSaved}
                onClick={() => setIsSaved((saved) => !saved)}
                className={`inline-flex h-11 items-center justify-center gap-2 rounded-[10px] border px-4 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2954f2] ${isSaved
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
            <p
              role="status"
              className={`mt-5 text-sm ${isApplied
                  ? "text-[#15945e]"
                  : "text-[#687386]"
                }`}
            >
              {applyMessage}
            </p>
          )}
        </section>

        <div className="mt-6 grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
          <section className="rounded-2xl border border-[#e1e6ee] bg-white p-6 sm:p-8">
            <h2 className="text-xl font-bold tracking-[-0.3px] text-[#151b2b]">
              About the role
            </h2>
            <p className="mt-4 whitespace-pre-line text-[14px] leading-7 text-[#687386] sm:text-[15px]">
              {job.description}
            </p>

            <div className="mt-8 border-t border-[#eef1f5] pt-7">
              <h3 className="text-[17px] font-bold text-[#151b2b]">
                What you’ll do
              </h3>
              <ul className="mt-4 space-y-3.5">
                {(descriptionItems.length ? descriptionItems : [job.description]).map(
                  (item, index) => (
                    <li
                      key={`${index}-${item}`}
                      className="flex gap-3 text-[14px] leading-6 text-[#687386] sm:text-[15px]"
                    >
                      <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#2954f2]" />
                      {item}
                    </li>
                  ),
                )}
              </ul>
            </div>

            <div className="mt-8 border-t border-[#eef1f5] pt-7">
              <h3 className="text-[17px] font-bold text-[#151b2b]">
                What we’re looking for
              </h3>
              {job.requirements.length > 0 ? (
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
              ) : (
                <p className="mt-4 text-sm leading-6 text-[#687386]">
                  No specific requirements have been provided.
                </p>
              )}
            </div>

            <div className="mt-8 border-t border-[#eef1f5] pt-7">
              <h3 className="text-[17px] font-bold text-[#151b2b]">
                Skills and experience
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {[experience, jobType].map((item) => (
                  <li
                    key={item}
                    className="rounded-full bg-[#f3f5f8] px-3.5 py-2 text-[13px] font-medium text-[#515c6d]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <aside className="flex flex-col gap-6">
            <section className="rounded-2xl border border-[#e1e6ee] bg-white p-6 sm:p-7">
              <h2 className="text-lg font-bold tracking-[-0.3px] text-[#151b2b]">
                About {job.company.name}
              </h2>
              <p className="mt-4 text-[14px] leading-6 text-[#687386]">
                Company information is not available yet.
              </p>

              <div className="mt-6 space-y-4 border-t border-[#eef1f5] pt-5 text-[13px] text-[#515c6d]">
                <p className="flex items-center gap-3">
                  <Users className="h-4 w-4 shrink-0 text-[#8791a1]" />
                  Company size not specified
                </p>
                <p className="flex items-center gap-3">
                  <Building2 className="h-4 w-4 shrink-0 text-[#8791a1]" />
                  {job.company.name}
                </p>
                <p className="flex items-center gap-3">
                  <CalendarDays className="h-4 w-4 shrink-0 text-[#8791a1]" />
                  Posted {posted}
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

export default JobSeekerJobDetails;
