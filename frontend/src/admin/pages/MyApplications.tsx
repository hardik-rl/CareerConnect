
// import { useEffect, useMemo, useState } from "react";
// import { Link } from "react-router-dom";
// import api from "../../services/api";

// type ApiApplication = {
//   id: string;
//   status: "PENDING" | "REVIEWED" | "SHORTLISTED" | "REJECTED" | "ACCEPTED";
//   createdAt: string;
//   jobId: string;
//   job: {
//     id: string;
//     title: string;
//     location: string;
//     jobType: string;
//     company: {
//       id: string;
//       name: string;
//     };
//   };
// };

// type ApplicationStatus =
//   | "Applied"
//   | "Under Review"
//   | "Shortlisted"
//   | "Rejected"
//   | "Accepted";

// type Application = {
//   id: string;
//   jobId: string;
//   company: string;
//   role: string;
//   location: string;
//   jobType: string;
//   applied: string;
//   status: ApplicationStatus;
// };

// const FILTERS = [
//   "All",
//   "Applied",
//   "Under Review",
//   "Shortlisted",
//   "Rejected",
//   "Accepted",
// ] as const;

// type Filter = (typeof FILTERS)[number];

// const statusLabels: Record<ApiApplication["status"], ApplicationStatus> = {
//   PENDING: "Applied",
//   REVIEWED: "Under Review",
//   SHORTLISTED: "Shortlisted",
//   REJECTED: "Rejected",
//   ACCEPTED: "Accepted",
// };

// const statusClasses: Record<ApplicationStatus, string> = {
//   Applied: "bg-blue-50 text-blue-700",
//   "Under Review": "bg-amber-50 text-amber-700",
//   Shortlisted: "bg-violet-50 text-violet-700",
//   Rejected: "bg-red-50 text-red-700",
//   Accepted: "bg-emerald-50 text-emerald-700",
// };

// const MyApplications = () => {
//   const [applications, setApplications] = useState<Application[]>([]);
//   const [activeFilter, setActiveFilter] = useState<Filter>("All");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchApplications = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         // Assumes your Axios baseURL already ends with /api.
//         const response = await api.get("/applications/me");

//         const data: ApiApplication[] = response.data.data;

//         const mappedApplications: Application[] = data.map((item) => ({
//           id: item.id,
//           jobId: item.job.id,
//           company: item.job.company.name,
//           role: item.job.title,
//           location: item.job.location,
//           jobType: item.job.jobType.replaceAll("_", " "),
//           applied: new Date(item.createdAt).toLocaleDateString("en-IN", {
//             day: "2-digit",
//             month: "short",
//             year: "numeric",
//           }),
//           status: statusLabels[item.status],
//         }));

//         setApplications(mappedApplications);
//       } catch (err) {
//         console.error("Failed to load applications:", err);
//         setError("Unable to load your applications. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchApplications();
//   }, []);

//   const filteredApplications = useMemo(() => {
//     if (activeFilter === "All") return applications;

//     return applications.filter(
//       (application) => application.status === activeFilter
//     );
//   }, [applications, activeFilter]);

//   return (
//     <div className="min-h-screen bg-[#F8FAFC] p-4 sm:p-6 lg:p-8">
//       <div className="mx-auto max-w-6xl">
//         <div className="mb-8">
//           <h1 className="text-2xl font-bold text-[#111827] sm:text-3xl">
//             My Applications
//           </h1>
//           <p className="mt-2 text-sm text-[#6B7280] sm:text-base">
//             Track the jobs you have applied for.
//           </p>
//         </div>

//         <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
//           {FILTERS.map((filter) => {
//             const count =
//               filter === "All"
//                 ? applications.length
//                 : applications.filter((application) => application.status === filter)
//                     .length;

//             return (
//               <button
//                 key={filter}
//                 type="button"
//                 onClick={() => setActiveFilter(filter)}
//                 className={`rounded-xl border px-3 py-3 text-sm font-medium transition ${
//                   activeFilter === filter
//                     ? "border-blue-600 bg-blue-600 text-white"
//                     : "border-gray-200 bg-white text-gray-600 hover:border-blue-300 hover:text-blue-600"
//                 }`}
//               >
//                 <span className="block">{filter}</span>
//                 <span className="mt-1 block text-lg font-bold">{count}</span>
//               </button>
//             );
//           })}
//         </div>

//         {loading ? (
//           <div className="rounded-xl border border-gray-200 bg-white p-10 text-center text-gray-500">
//             Loading your applications...
//           </div>
//         ) : error ? (
//           <div className="rounded-xl border border-red-200 bg-white p-6 text-center">
//             <p className="text-sm text-red-600">{error}</p>
//             <button
//               type="button"
//               onClick={() => window.location.reload()}
//               className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
//             >
//               Try again
//             </button>
//           </div>
//         ) : filteredApplications.length === 0 ? (
//           <div className="rounded-xl border border-gray-200 bg-white px-6 py-12 text-center">
//             <h2 className="text-lg font-semibold text-gray-900">
//               {applications.length === 0
//                 ? "No applications yet"
//                 : `No ${activeFilter.toLowerCase()} applications`}
//             </h2>
//             <p className="mt-2 text-sm text-gray-500">
//               {applications.length === 0
//                 ? "Explore available jobs and submit your first application."
//                 : "Try selecting another status filter."}
//             </p>
//             {applications.length === 0 && (
//               <Link
//                 to="/job-list"
//                 className="mt-5 inline-flex rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
//               >
//                 Browse Jobs
//               </Link>
//             )}
//           </div>
//         ) : (
//           <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
//             <div className="border-b border-gray-100 px-5 py-4">
//               <h2 className="font-semibold text-[#111827]">
//                 Applications ({filteredApplications.length})
//               </h2>
//             </div>

//             <div className="overflow-x-auto">
//               <table className="w-full min-w-[760px] text-left">
//                 <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
//                   <tr>
//                     <th className="px-5 py-4 font-semibold">Job & Company</th>
//                     <th className="px-5 py-4 font-semibold">Applied On</th>
//                     <th className="px-5 py-4 font-semibold">Status</th>
//                     <th className="px-5 py-4 font-semibold">Job Type</th>
//                     <th className="px-5 py-4 font-semibold">Action</th>
//                   </tr>
//                 </thead>

//                 <tbody className="divide-y divide-gray-100">
//                   {filteredApplications.map((application) => (
//                     <tr key={application.id} className="hover:bg-gray-50">
//                       <td className="px-5 py-4">
//                         <p className="font-semibold text-gray-900">
//                           {application.role}
//                         </p>
//                         <p className="mt-1 text-sm text-gray-500">
//                           {application.company}
//                         </p>
//                         <p className="mt-1 text-xs text-gray-400">
//                           {application.location}
//                         </p>
//                       </td>

//                       <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-600">
//                         {application.applied}
//                       </td>

//                       <td className="px-5 py-4">
//                         <span
//                           className={`inline-flex whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${statusClasses[application.status]}`}
//                         >
//                           {application.status}
//                         </span>
//                       </td>

//                       <td className="px-5 py-4 text-sm text-gray-600">
//                         {application.jobType}
//                       </td>

//                       <td className="px-5 py-4">
//                         <Link
//                           to={`/jobs/${application.jobId}`}
//                           className="whitespace-nowrap text-sm font-semibold text-blue-600 hover:text-blue-800"
//                         >
//                           View Job
//                         </Link>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MyApplications;



import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

type ApiApplicationStatus =
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
  status: ApiApplicationStatus;
  createdAt: string;
  jobId: string;
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
  location: string;
  jobType: string;
  applied: string;
  status: ApplicationStatus;
};

const FILTERS = [
  "All",
  "Applied",
  "Under Review",
  "Shortlisted",
  "Rejected",
  "Accepted",
] as const;

type Filter = (typeof FILTERS)[number];

const statusLabels: Record<ApiApplicationStatus, ApplicationStatus> = {
  PENDING: "Applied",
  REVIEWED: "Under Review",
  SHORTLISTED: "Shortlisted",
  REJECTED: "Rejected",
  ACCEPTED: "Accepted",
};

const statusClasses: Record<ApplicationStatus, string> = {
  Applied: "bg-[#e8f2ff] text-[#3885eb]",
  "Under Review": "bg-[#fff7e6] text-[#b7791f]",
  Shortlisted: "bg-[#f0f0ff] text-[#5c5ce0]",
  Rejected: "bg-[#ffebeb] text-[#e03d3d]",
  Accepted: "bg-[#e5f7ed] text-[#14b266]",
};

const MyApplications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        setError("");

        // Axios baseURL should be http://localhost:5000/api
        const response = await api.get("/applications/me");

        const data: ApiApplication[] = response.data.data;

        const mappedApplications: Application[] = data.map((item) => ({
          id: item.id,
          jobId: item.job.id,
          company: item.job.company.name,
          role: item.job.title,
          location: item.job.location,
          jobType: item.job.jobType.replace(/_/g, " "),
          applied: new Date(item.createdAt).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
          // PENDING will always display as Applied
          status: statusLabels[item.status] ?? "Applied",
        }));

        setApplications(mappedApplications);
      } catch (err) {
        console.error("Failed to load applications:", err);
        setError("Unable to load your applications. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const filteredApplications = useMemo(() => {
    if (activeFilter === "All") {
      return applications;
    }

    return applications.filter(
      (application) => application.status === activeFilter
    );
  }, [applications, activeFilter]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl">
        {/* Page heading */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#111827] sm:text-3xl">
            My Applications
          </h1>

          <p className="mt-2 text-[#6B7280]">
            Track the jobs you have applied for.
          </p>
        </div>

        {/* Status filters */}
        <div className="mb-6 flex flex-wrap gap-2">
          {FILTERS.map((filter) => {
            const count =
              filter === "All"
                ? applications.length
                : applications.filter(
                    (application) => application.status === filter
                  ).length;

            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`rounded-lg border px-4 py-2.5 text-sm font-medium transition ${
                  activeFilter === filter
                    ? "border-[#2563EB] bg-[#2563EB] text-white"
                    : "border-gray-200 bg-white text-gray-600 hover:border-blue-300 hover:text-blue-600"
                }`}
              >
                {filter}
                <span className="ml-2">{count}</span>
              </button>
            );
          })}
        </div>

        {/* Loading state */}
        {loading && (
          <div className="rounded-xl border border-gray-200 bg-white p-10 text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
            <p className="mt-4 text-sm text-gray-500">
              Loading your applications...
            </p>
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div className="rounded-xl border border-red-200 bg-white p-6 text-center">
            <p className="text-sm text-red-600">{error}</p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && filteredApplications.length === 0 && (
          <div className="rounded-xl border border-gray-200 bg-white px-6 py-12 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                className="h-7 w-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 7V3m8 4V3M4 11h16M5 5h14a1 1 0 0 1 1 1v13H4V6a1 1 0 0 1 1-1Z"
                />
              </svg>
            </div>

            <h2 className="mt-4 text-lg font-semibold text-gray-900">
              {applications.length === 0
                ? "No applications yet"
                : `No ${activeFilter.toLowerCase()} applications`}
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              {applications.length === 0
                ? "Explore available jobs and submit your first application."
                : "Try selecting another status filter."}
            </p>

            {applications.length === 0 && (
              <Link
                to="/job-list"
                className="mt-5 inline-flex rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Browse Jobs
              </Link>
            )}
          </div>
        )}

        {/* Applications table */}
        {!loading && !error && filteredApplications.length > 0 && (
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-100 px-5 py-4">
              <h2 className="font-semibold text-[#111827]">
                Applications ({filteredApplications.length})
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left">
                <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                  <tr>
                    <th className="px-5 py-4 font-semibold">
                      Job &amp; Company
                    </th>
                    <th className="px-5 py-4 font-semibold">Applied On</th>
                    <th className="px-5 py-4 font-semibold">Status</th>
                    <th className="px-5 py-4 font-semibold">Job Type</th>
                    <th className="px-5 py-4 font-semibold">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {filteredApplications.map((application) => (
                    <tr
                      key={application.id}
                      className="transition hover:bg-gray-50"
                    >
                      <td className="px-5 py-4">
                        <p className="font-semibold text-gray-900">
                          {application.role}
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                          {application.company}
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                          {application.location}
                        </p>
                      </td>

                      <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-600">
                        {application.applied}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${
                            statusClasses[application.status]
                          }`}
                        >
                          {application.status}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-600">
                        {application.jobType}
                      </td>

                      <td className="px-5 py-4">
                        <Link
                          to={`/jobs/${application.jobId}`}
                          className="whitespace-nowrap text-sm font-semibold text-blue-600 hover:text-blue-800"
                        >
                          View Job
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyApplications;
