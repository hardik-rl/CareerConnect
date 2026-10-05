import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

type ApplicationStatus =
  | "Interview"
  | "Applied"
  | "Shortlisted"
  | "Review";

type Application = {
  id: number;
  jobId: number;
  company: string;
  role: string;
  applied: string;
  status: ApplicationStatus;
};

const APPLICATIONS: Application[] = [
  {
    id: 1,
    jobId: 1,
    company: "TechForge",
    role: "Priya Shah",
    applied: "Senior React Developer",
    status: "Interview",
  },
  {
    id: 2,
    jobId: 4,
    company: "Northstar",
    role: "Rahul Mehta",
    applied: "Frontend Engineer",
    status: "Interview",
  },
  {
    id: 3,
    jobId: 2,
    company: "PixelCraft",
    role: "Aarav Patel",
    applied: "UI Developer",
    status: "Shortlisted",
  },
  {
    id: 4,
    jobId: 3,
    company: "CloudScale",
    role: "Neha Joshi",
    applied: "Senior React Developer",
    status: "Review",
  },
];

const FILTERS = [
  { label: "All", value: "All", count: 486 },
  { label: "New", value: "New", count: 142 },
  { label: "Shortlisted", value: "Shortlisted", count: 62 },
  { label: "Interview", value: "Interview", count: 18 },
  // { label: "Rejected", value: "Rejected", count: 2 },
] as const;

const statusClasses: Record<ApplicationStatus, string> = {
  Interview: "bg-[#e5f7ed] text-[#14b266]",
  Applied: "bg-[#e8f2ff] text-[#3885eb]",
  Shortlisted: "bg-[#f0f0ff] text-[#5c5ce0]",
  Review: "bg-[#fff4e5] text-[#d97706]",
  // Rejected: "bg-[#ffebeb] text-[#e03d3d]",
};

const EmployerApplications = () => {
  const [activeFilter, setActiveFilter] =
    useState<(typeof FILTERS)[number]["value"]>("All");

  const filteredApplications = useMemo(() => {
    if (activeFilter === "All") {
      return APPLICATIONS;
    }

    return APPLICATIONS.filter(
      (application) => application.status === activeFilter,
    );
  }, [activeFilter]);

  return (
    <main className="min-h-screen bg-[#f8f9fb] text-[#171f2e]">
      <div className="px-5 pb-16 pt-10">
        <header>
          <h1 className="text-[28px] font-bold leading-[42px] tracking-[-0.4px] text-[#171f2e] sm:text-[28px]">
            Applications
          </h1>

          <p className="mt-0.5 text-[13px] leading-6 text-[#616b80]">
            Review applicants and move candidates through your hiring pipeline.
          </p>
        </header>

        <section className="mt-7 rounded-[14px] bg-white px-6 py-5 sm:px-6">
          <div
            className="flex flex-wrap gap-5 overflow-x-auto"
            role="tablist"
            aria-label="Application status"
          >
            {FILTERS.map((filter) => {
              const isActive = activeFilter === filter.value;

              return (
                <button
                  key={filter.value}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveFilter(filter.value)}
                  className={`h-8 min-w-[140px] shrink-0 rounded-full px-4 text-[11px] font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5c5ce0] ${
                    isActive
                      ? "bg-[#5c5ce0] text-white"
                      : "bg-[#f8f9fb] text-[#616b80] hover:bg-[#f0f0f5]"
                  }`}
                >
                  {filter.label} ({filter.count})
                </button>
              );
            })}
          </div>
        </section>

        <section className="mt-[31px] overflow-hidden rounded-[14px] bg-white">
          <div className="hidden grid-cols-[minmax(330px,3fr)_120px_170px_minmax(210px,2fr)_100px] items-center px-7 pt-7 text-[12px] font-semibold text-[#616b80] md:grid">
            <div>Candidate</div>
            <div>Applied for</div>
            <div>Status</div>
            <div>Action</div>
            <div />
          </div>

          <div className="divide-y divide-[#f0f2f5]">
            {filteredApplications.map((application) => (
              <article
                key={application.id}
                className="px-6 py-5 md:grid md:min-h-[80px] md:grid-cols-[minmax(330px,3fr)_120px_170px_minmax(210px,2fr)_100px] md:items-center md:px-7 md:py-0"
              >
                <div className="min-w-0">
                  <div className="text-[13px] font-semibold leading-5 text-[#171f2e]">
                    {application.company} · {application.role}
                  </div>

                  <div className="mt-1 text-[11px] min-w-[205px]  text-[#616b80] md:hidden">
                    Applied {application.applied}
                  </div>
                </div>

                <div className="mt-3 text-[11px] min-w-[205px] text-[#616b80] md:mt-0">
                  {application.applied}
                </div>

                <div className="mt-3 md:mt-0">
                  <span
                    className={`inline-flex h-7 min-w-[105px] items-center justify-center rounded-full px-4 text-[11px] font-semibold ${statusClasses[application.status]}`}
                  >
                    {application.status}
                  </span>
                </div>

                {/* <div className="mt-3 text-[11px] text-[#616b80] md:mt-0">
                  <span className="md:hidden">Next: </span>
                  {application.nextStep}
                </div> */}

                <div className="mt-4 md:mt-0 md:flex md:items-center md:gap-3">
                  <Link
                    to={`/jobs/${application.jobId}`}
                    className="inline-flex h-[30px] w-[100px] items-center justify-center rounded-[8px] bg-[#0e131f] text-[12px] font-semibold text-white transition hover:bg-[#252b38] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5c5ce0]"
                  >
                    View
                  </Link>
                    <Link
                    to={`/jobs/${application.jobId}`}
                    className="inline-flex h-[30px] w-[100px] items-center justify-center rounded-[8px] bg-[#5C5CE0] text-[12px] font-semibold text-white transition hover:bg-[#252b38] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5c5ce0]"
                  >
                    Update Status
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {filteredApplications.length === 0 && (
            <div className="px-6 py-16 text-center text-sm text-[#616b80]">
              No applications found for this status.
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default EmployerApplications;
