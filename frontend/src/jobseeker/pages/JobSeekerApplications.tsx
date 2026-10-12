import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

type ApiStatus =
  | "PENDING"
  | "REVIEWED"
  | "SHORTLISTED"
  | "REJECTED"
  | "ACCEPTED";

type ApplicationStatus =
  | "Applied"
  | "Under Review"
  | "Shortlisted"
  | "Rejected"
  | "Accepted";

type ApiApplication = {
  id: string;
  jobId: string;
  status: ApiStatus;
  createdAt: string;
  job: {
    id: string;
    title: string;
    location: string;
    jobType: string;
    company: {
      id: string;
      name: string;
    };
  };
};

type Application = {
  id: string;
  jobId: string;
  company: string;
  role: string;
  applied: string;
  status: ApplicationStatus;
  nextStep: string;
};

const FILTERS = [
  { label: "All", value: "All" },
  { label: "Applied", value: "Applied" },
  { label: "Under Review", value: "Under Review" },
  { label: "Shortlisted", value: "Shortlisted" },
  { label: "Rejected", value: "Rejected" },
  { label: "Accepted", value: "Accepted" },
] as const;

type FilterValue = (typeof FILTERS)[number]["value"];

const statusLabels: Record<ApiStatus, ApplicationStatus> = {
  PENDING: "Applied",
  REVIEWED: "Under Review",
  SHORTLISTED: "Shortlisted",
  REJECTED: "Rejected",
  ACCEPTED: "Accepted",
};

const statusClasses: Record<ApplicationStatus, string> = {
  "Under Review": "bg-[#fff4dc] text-[#ad7414]",
  Applied: "bg-[#e8f2ff] text-[#3885eb]",
  Shortlisted: "bg-[#f0f0ff] text-[#5c5ce0]",
  Rejected: "bg-[#ffebeb] text-[#e03d3d]",
  Accepted: "bg-[#e5f7ed] text-[#14b266]",
};

const JobSeekerApplications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterValue>("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/api/applications/me");
        const data: ApiApplication[] = response.data.data;

        const mappedApplications: Application[] = data.map((item) => ({
          id: item.id,
          jobId: item.job.id,
          company: item.job.company.name,
          role: item.job.title,
          applied: new Date(item.createdAt).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
          status: statusLabels[item.status] ?? "Applied",
          nextStep:
            item.status === "REJECTED"
              ? "Application not selected"
              : item.status === "ACCEPTED"
                ? "Application accepted"
                : item.status === "SHORTLISTED"
                  ? "Shortlisted for next stage"
                  : item.status === "REVIEWED"
                    ? "Application under review"
                    : "Awaiting response",
        }));

        setApplications(mappedApplications);
      } catch (err) {
        console.error("Failed to fetch applications:", err);
        setError("Unable to load applications. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const filteredApplications = useMemo(() => {
    if (activeFilter === "All") return applications;

    return applications.filter(
      (application) => application.status === activeFilter
    );
  }, [applications, activeFilter]);

  return (
    <main className="min-h-screen bg-[#f8f9fb] text-[#171f2e]">
      <div className="px-5 pb-16 pt-10">
        <header>
          <h1 className="text-[28px] font-bold leading-[42px] tracking-[-0.4px] text-[#171f2e]">
            My Applications
          </h1>

          <p className="mt-0.5 text-[13px] leading-6 text-[#616b80]">
            Track every application from submission to interview and outcome.
          </p>
        </header>

        {/* Status filters */}
        <section className="mt-7 rounded-[14px] bg-white px-6 py-5">
          <div
            className="flex flex-wrap gap-5 overflow-x-auto"
            role="tablist"
            aria-label="Application status"
          >
            {FILTERS.map((filter) => {
              const isActive = activeFilter === filter.value;

              const count =
                filter.value === "All"
                  ? applications.length
                  : applications.filter(
                    (application) => application.status === filter.value
                  ).length;

              return (
                <button
                  key={filter.value}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveFilter(filter.value)}
                  className={`h-8 min-w-[140px] shrink-0 rounded-full px-4 text-[11px] font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5c5ce0] ${isActive
                      ? "bg-[#5c5ce0] text-white"
                      : "bg-[#f8f9fb] text-[#616b80] hover:bg-[#f0f0f5]"
                    }`}
                >
                  {filter.label} ({count})
                </button>
              );
            })}
          </div>
        </section>

        {/* Applications list */}
        <section className="mt-[31px] overflow-hidden rounded-[14px] bg-white">
          <div className="hidden grid-cols-[minmax(330px,3fr)_120px_170px_minmax(210px,2fr)_100px] items-center px-7 pt-7 text-[12px] font-semibold text-[#616b80] md:grid">
            <div>Company / Role</div>
            <div>Applied</div>
            <div>Status</div>
            <div>Next step</div>
            <div />
          </div>

          {loading ? (
            <div className="px-6 py-16 text-center text-sm text-[#616b80]">
              Loading your applications...
            </div>
          ) : error ? (
            <div className="px-6 py-16 text-center">
              <p className="text-sm text-red-600">{error}</p>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-4 rounded-lg bg-[#0e131f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#252b38]"
              >
                Try Again
              </button>
            </div>
          ) : filteredApplications.length === 0 ? (
            <div className="px-6 py-16 text-center text-sm text-[#616b80]">
              {applications.length === 0
                ? "You haven't applied for any jobs yet."
                : "No applications found for this status."}

              {applications.length === 0 && (
                <div className="mt-4">
                  <Link
                    to="/job-list"
                    className="inline-flex rounded-lg bg-[#0e131f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#252b38]"
                  >
                    Browse Jobs
                  </Link>
                </div>
              )}
            </div>
          ) : (
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

                    <div className="mt-1 text-[11px] text-[#616b80] md:hidden">
                      Applied {application.applied}
                    </div>
                  </div>

                  <div className="mt-3 text-[11px] text-[#616b80] md:mt-0">
                    {application.applied}
                  </div>

                  <div className="mt-3 md:mt-0">
                    <span
                      className={`inline-flex h-7 min-w-[105px] items-center justify-center rounded-full px-4 text-[11px] font-semibold ${statusClasses[application.status]}`}
                    >
                      {application.status}
                    </span>
                  </div>

                  <div className="mt-3 text-[11px] text-[#616b80] md:mt-0">
                    <span className="md:hidden">Next: </span>
                    {application.nextStep}
                  </div>

                  <div className="mt-4 md:mt-0 md:flex md:justify-end">
                    <Link
                      to={`/jobs/${application.jobId}`}
                      className="inline-flex h-[30px] w-[100px] items-center justify-center rounded-[8px] bg-[#0e131f] text-[12px] font-semibold text-white transition hover:bg-[#252b38] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5c5ce0]"
                    >
                      View
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default JobSeekerApplications;
