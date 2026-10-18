// import { useMemo, useState } from "react";
// import { Link } from "react-router-dom";

// type ApplicationStatus =
//   | "Interview"
//   | "Applied"
//   | "Shortlisted"
//   | "Review";

// type Application = {
//   id: number;
//   jobId: number;
//   company: string;
//   role: string;
//   applied: string;
//   status: ApplicationStatus;
// };

// const APPLICATIONS: Application[] = [
//   {
//     id: 1,
//     jobId: 1,
//     company: "TechForge",
//     role: "Priya Shah",
//     applied: "Senior React Developer",
//     status: "Interview",
//   },
//   {
//     id: 2,
//     jobId: 4,
//     company: "Northstar",
//     role: "Rahul Mehta",
//     applied: "Frontend Engineer",
//     status: "Interview",
//   },
//   {
//     id: 3,
//     jobId: 2,
//     company: "PixelCraft",
//     role: "Aarav Patel",
//     applied: "UI Developer",
//     status: "Shortlisted",
//   },
//   {
//     id: 4,
//     jobId: 3,
//     company: "CloudScale",
//     role: "Neha Joshi",
//     applied: "Senior React Developer",
//     status: "Review",
//   },
// ];

// const FILTERS = [
//   { label: "All", value: "All", count: 486 },
//   { label: "New", value: "New", count: 142 },
//   { label: "Shortlisted", value: "Shortlisted", count: 62 },
//   { label: "Interview", value: "Interview", count: 18 },
//   // { label: "Rejected", value: "Rejected", count: 2 },
// ] as const;

// const statusClasses: Record<ApplicationStatus, string> = {
//   Interview: "bg-[#e5f7ed] text-[#14b266]",
//   Applied: "bg-[#e8f2ff] text-[#3885eb]",
//   Shortlisted: "bg-[#f0f0ff] text-[#5c5ce0]",
//   Review: "bg-[#fff4e5] text-[#d97706]",
//   // Rejected: "bg-[#ffebeb] text-[#e03d3d]",
// };

// const EmployerApplications = () => {
//   const [activeFilter, setActiveFilter] =
//     useState<(typeof FILTERS)[number]["value"]>("All");

//   const filteredApplications = useMemo(() => {
//     if (activeFilter === "All") {
//       return APPLICATIONS;
//     }

//     return APPLICATIONS.filter(
//       (application) => application.status === activeFilter,
//     );
//   }, [activeFilter]);

//   return (
//     <main className="min-h-screen bg-[#f8f9fb] text-[#171f2e]">
//       <div className="px-5 pb-16 pt-10">
//         <header>
//           <h1 className="text-[28px] font-bold leading-[42px] tracking-[-0.4px] text-[#171f2e] sm:text-[28px]">
//             Applications
//           </h1>

//           <p className="mt-0.5 text-[13px] leading-6 text-[#616b80]">
//             Review applicants and move candidates through your hiring pipeline.
//           </p>
//         </header>

//         <section className="mt-7 rounded-[14px] bg-white px-6 py-5 sm:px-6">
//           <div
//             className="flex flex-wrap gap-5 overflow-x-auto"
//             role="tablist"
//             aria-label="Application status"
//           >
//             {FILTERS.map((filter) => {
//               const isActive = activeFilter === filter.value;

//               return (
//                 <button
//                   key={filter.value}
//                   type="button"
//                   role="tab"
//                   aria-selected={isActive}
//                   onClick={() => setActiveFilter(filter.value)}
//                   className={`h-8 min-w-[140px] shrink-0 rounded-full px-4 text-[11px] font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5c5ce0] ${
//                     isActive
//                       ? "bg-[#5c5ce0] text-white"
//                       : "bg-[#f8f9fb] text-[#616b80] hover:bg-[#f0f0f5]"
//                   }`}
//                 >
//                   {filter.label} ({filter.count})
//                 </button>
//               );
//             })}
//           </div>
//         </section>

//         <section className="mt-[31px] overflow-hidden rounded-[14px] bg-white">
//           <div className="hidden grid-cols-[minmax(330px,3fr)_120px_170px_minmax(210px,2fr)_100px] items-center px-7 pt-7 text-[12px] font-semibold text-[#616b80] md:grid">
//             <div>Candidate</div>
//             <div>Applied for</div>
//             <div>Status</div>
//             <div>Action</div>
//             <div />
//           </div>

//           <div className="divide-y divide-[#f0f2f5]">
//             {filteredApplications.map((application) => (
//               <article
//                 key={application.id}
//                 className="px-6 py-5 md:grid md:min-h-[80px] md:grid-cols-[minmax(330px,3fr)_120px_170px_minmax(210px,2fr)_100px] md:items-center md:px-7 md:py-0"
//               >
//                 <div className="min-w-0">
//                   <div className="text-[13px] font-semibold leading-5 text-[#171f2e]">
//                     {application.company} · {application.role}
//                   </div>

//                   <div className="mt-1 text-[11px] min-w-[205px]  text-[#616b80] md:hidden">
//                     Applied {application.applied}
//                   </div>
//                 </div>

//                 <div className="mt-3 text-[11px] min-w-[205px] text-[#616b80] md:mt-0">
//                   {application.applied}
//                 </div>

//                 <div className="mt-3 md:mt-0">
//                   <span
//                     className={`inline-flex h-7 min-w-[105px] items-center justify-center rounded-full px-4 text-[11px] font-semibold ${statusClasses[application.status]}`}
//                   >
//                     {application.status}
//                   </span>
//                 </div>

//                 {/* <div className="mt-3 text-[11px] text-[#616b80] md:mt-0">
//                   <span className="md:hidden">Next: </span>
//                   {application.nextStep}
//                 </div> */}

//                 <div className="mt-4 md:mt-0 md:flex md:items-center md:gap-3">
//                   <Link
//                     to={`/jobs/${application.jobId}`}
//                     className="inline-flex h-[30px] w-[100px] items-center justify-center rounded-[8px] bg-[#0e131f] text-[12px] font-semibold text-white transition hover:bg-[#252b38] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5c5ce0]"
//                   >
//                     View
//                   </Link>
//                     <Link
//                     to={`/jobs/${application.jobId}`}
//                     className="inline-flex h-[30px] w-[100px] items-center justify-center rounded-[8px] bg-[#5C5CE0] text-[12px] font-semibold text-white transition hover:bg-[#252b38] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5c5ce0]"
//                   >
//                     Update Status
//                   </Link>
//                 </div>
//               </article>
//             ))}
//           </div>

//           {filteredApplications.length === 0 && (
//             <div className="px-6 py-16 text-center text-sm text-[#616b80]">
//               No applications found for this status.
//             </div>
//           )}
//         </section>
//       </div>
//     </main>
//   );
// };

// export default EmployerApplications;



import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

type ApplicationStatus =
  | "PENDING"
  | "REVIEWED"
  | "SHORTLISTED"
  | "REJECTED"
  | "ACCEPTED";

type Application = {
  id: string;
  status: ApplicationStatus;
  createdAt: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  job: {
    id: string;
    title: string;
    company?: {
      name: string;
    };
  };
};

type FilterValue =
  | "All"
  | "New"
  | "REVIEWED"
  | "SHORTLISTED"
  | "ACCEPTED"
  | "REJECTED";

const FILTERS: { label: string; value: FilterValue }[] = [
  { label: "All", value: "All" },
  { label: "New", value: "New" },
  { label: "Reviewed", value: "REVIEWED" },
  { label: "Shortlisted", value: "SHORTLISTED" },
  { label: "Accepted", value: "ACCEPTED" },
  { label: "Rejected", value: "REJECTED" },
];

const STATUS_OPTIONS: { label: string; value: ApplicationStatus }[] = [
  { label: "Pending", value: "PENDING" },
  { label: "Reviewed", value: "REVIEWED" },
  { label: "Shortlisted", value: "SHORTLISTED" },
  { label: "Accepted", value: "ACCEPTED" },
  { label: "Rejected", value: "REJECTED" },
];

const statusLabels: Record<ApplicationStatus, string> = {
  PENDING: "Pending",
  REVIEWED: "Reviewed",
  SHORTLISTED: "Shortlisted",
  REJECTED: "Rejected",
  ACCEPTED: "Accepted",
};

const statusClasses: Record<ApplicationStatus, string> = {
  PENDING: "bg-[#e8f2ff] text-[#3885eb]",
  REVIEWED: "bg-[#fff4e5] text-[#d97706]",
  SHORTLISTED: "bg-[#f0f0ff] text-[#5c5ce0]",
  REJECTED: "bg-[#ffebeb] text-[#e03d3d]",
  ACCEPTED: "bg-[#e5f7ed] text-[#14b266]",
};

const EmployerApplications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterValue>("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedStatuses, setSelectedStatuses] = useState<
    Record<string, ApplicationStatus>
  >({});
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function fetchApplications() {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/applications/employer");
        const data: Application[] = response.data.data;

        if (!cancelled) {
          setApplications(data);
        }
      } catch (err: unknown) {
        const apiError = err as {
          response?: { data?: { message?: string } };
        };

        if (!cancelled) {
          setError(
            apiError.response?.data?.message ??
            "Unable to load applications. Please try again.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void fetchApplications();

    return () => {
      cancelled = true;
    };
  }, []);

  const counts = useMemo(
    () => ({
      All: applications.length,
      New: applications.filter((item) => item.status === "PENDING").length,
      REVIEWED: applications.filter((item) => item.status === "REVIEWED").length,
      SHORTLISTED: applications.filter(
        (item) => item.status === "SHORTLISTED",
      ).length,
      ACCEPTED: applications.filter((item) => item.status === "ACCEPTED").length,
      REJECTED: applications.filter((item) => item.status === "REJECTED").length,
    }),
    [applications],
  );

  const filteredApplications = useMemo(() => {
    if (activeFilter === "All") return applications;

    if (activeFilter === "New") {
      return applications.filter((item) => item.status === "PENDING");
    }

    return applications.filter((item) => item.status === activeFilter);
  }, [applications, activeFilter]);

  const handleUpdateStatus = async (application: Application) => {
    const newStatus =
      selectedStatuses[application.id] ?? application.status;

    if (newStatus === application.status) {
      setEditingId(null);
      return;
    }

    try {
      setUpdatingId(application.id);
      setError("");
      setNotice("");

      await api.patch(`/applications/${application.id}/status`, {
        status: newStatus,
      });

      setApplications((previous) =>
        previous.map((item) =>
          item.id === application.id
            ? { ...item, status: newStatus }
            : item,
        ),
      );

      setEditingId(null);
      setNotice("Application status updated successfully.");
    } catch (err: unknown) {
      const apiError = err as {
        response?: { data?: { message?: string } };
      };

      setError(
        apiError.response?.data?.message ??
        "Unable to update application status.",
      );
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <main className="min-h-screen bg-[#f8f9fb] text-[#171f2e]">
      <div className="px-5 pb-16 pt-10">
        <header>
          <h1 className="text-[28px] font-bold leading-[42px] tracking-[-0.4px]">
            Applications
          </h1>
          <p className="mt-0.5 text-[13px] leading-6 text-[#616b80]">
            Review applicants and move candidates through your hiring pipeline.
          </p>
        </header>

        <section className="mt-7 rounded-[14px] bg-white px-6 py-5">
          <div
            className="flex flex-wrap gap-3 overflow-x-auto"
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
                  className={`h-8 shrink-0 rounded-full px-4 text-[11px] font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5c5ce0] ${isActive
                      ? "bg-[#5c5ce0] text-white"
                      : "bg-[#f8f9fb] text-[#616b80] hover:bg-[#f0f0f5]"
                    }`}
                >
                  {filter.label} ({counts[filter.value]})
                </button>
              );
            })}
          </div>
        </section>

        {error && (
          <div
            role="alert"
            className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        {notice && (
          <div
            role="status"
            className="mt-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
          >
            {notice}
          </div>
        )}

        <section className="mt-[31px] overflow-hidden rounded-[14px] bg-white">
          <div className="hidden grid-cols-[minmax(220px,2fr)_minmax(180px,1.5fr)_130px_minmax(260px,2fr)] items-center gap-4 px-7 pb-5 pt-7 text-[12px] font-semibold text-[#616b80] md:grid">
            <div>Candidate</div>
            <div>Applied for</div>
            <div>Status</div>
            <div>Action</div>
          </div>

          {loading ? (
            <div className="px-6 py-16 text-center text-sm text-[#616b80]">
              Loading applications...
            </div>
          ) : filteredApplications.length === 0 ? (
            <div className="px-6 py-16 text-center text-sm text-[#616b80]">
              No applications found for this status.
            </div>
          ) : (
            <div className="divide-y divide-[#f0f2f5]">
              {filteredApplications.map((application) => (
                <article
                  key={application.id}
                  className="space-y-4 px-6 py-5 md:grid md:grid-cols-[minmax(220px,2fr)_minmax(180px,1.5fr)_130px_minmax(260px,2fr)] md:items-center md:gap-4 md:space-y-0 md:px-7"
                >
                  <div className="min-w-0">
                    <p className="break-words text-[13px] font-semibold leading-5 text-[#171f2e]">
                      {application.user.name}
                    </p>
                    <p className="mt-1 break-all text-[11px] text-[#616b80]">
                      {application.user.email}
                    </p>
                    <p className="mt-1 text-[11px] text-[#616b80]">
                      Applied{" "}
                      {new Date(application.createdAt).toLocaleDateString(
                        "en-IN",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        },
                      )}
                    </p>
                  </div>

                  <div className="min-w-0">
                    <p className="break-words text-[12px] font-medium text-[#171f2e]">
                      {application.job.title}
                    </p>
                    <p className="mt-1 text-[11px] text-[#616b80]">
                      {application.job.company?.name ?? "Your company"}
                    </p>
                  </div>

                  <div>
                    <span
                      className={`inline-flex min-h-7 items-center justify-center rounded-full px-3 text-[11px] font-semibold ${statusClasses[application.status]
                        }`}
                    >
                      {statusLabels[application.status]}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <Link
                      to={`/jobs/${application.job.id}`}
                      className="inline-flex h-[32px] items-center justify-center rounded-[8px] bg-[#0e131f] px-4 text-[12px] font-semibold text-white transition hover:bg-[#252b38] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5c5ce0]"
                    >
                      View Job
                    </Link>

                    <Link
                      to={`/employer/applications/${application.id}`}
                      className="rounded-lg bg-blue-600 px-3 py-2 text-xs text-white"
                    >
                      View Profile
                    </Link>

                    {editingId === application.id ? (
                      <div className="flex flex-wrap items-center gap-2">
                        <select
                          aria-label={`Update status for ${application.user.name}`}
                          value={
                            selectedStatuses[application.id] ??
                            application.status
                          }
                          onChange={(event) =>
                            setSelectedStatuses((previous) => ({
                              ...previous,
                              [application.id]: event.target
                                .value as ApplicationStatus,
                            }))
                          }
                          className="h-[32px] max-w-[150px] rounded-lg border border-slate-200 bg-white px-2 text-xs outline-none focus:border-indigo-500"
                        >
                          {STATUS_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>

                        <button
                          type="button"
                          disabled={updatingId === application.id}
                          onClick={() => void handleUpdateStatus(application)}
                          className="h-[32px] rounded-[8px] bg-[#5C5CE0] px-3 text-[11px] font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
                        >
                          {updatingId === application.id ? "Saving..." : "Save"}
                        </button>

                        <button
                          type="button"
                          onClick={() => setEditingId(null)}
                          className="h-[32px] rounded-[8px] border border-slate-200 px-3 text-[11px] font-medium text-slate-600"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedStatuses((previous) => ({
                            ...previous,
                            [application.id]: application.status,
                          }));
                          setEditingId(application.id);
                          setNotice("");
                        }}
                        className="inline-flex h-[32px] items-center justify-center rounded-[8px] bg-[#5C5CE0] px-4 text-[12px] font-semibold text-white transition hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5c5ce0]"
                      >
                        Update Status
                      </button>
                    )}
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

export default EmployerApplications;
