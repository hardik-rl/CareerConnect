// import { Link } from "react-router-dom";
// import api from "../../services/api";
// import { useEffect, useState } from "react";

// const stats = [
//   { label: "Applications", value: "18", change: "↑ 4 this month" },
//   { label: "Saved Jobs", value: "12", change: "↑ 3 this week" },
//   { label: "Profile Views", value: "146", change: "↑ 18.4% this month" },
//   { label: "Interview Invites", value: "4", change: "↑ 2 this month" },
// ];


// const recentApplications = [
//   { company: "TechForge", status: "Interview", date: "Oct 02" },
//   { company: "Northstar", status: "Applied", date: "Sep 21" },
//   { company: "PixelCraft", status: "Shortlisted", date: "Sep 19" },
//   { company: "Vertex", status: "Rejected", date: "Sep 12" },
// ];


// type RecommendedJob = {
//   id: string;
//   title: string;
//   location: string;
//   jobType: string;
//   salaryMin: number | null;
//   salaryMax: number | null;
//   company: {
//     id: string;
//     name: string;
//   };
// };

// function JobSeekerDashboard() {

//   const [recommendedJobsData, setRecommendedJobsData] = useState<RecommendedJob[]>([]);
//   const [jobsLoading, setJobsLoading] = useState(true);

//   const fetchJobs = async () => {
//     try {
//       const response = await api.get("/api/jobs");
//       console.log(response, "response");

//       setRecommendedJobsData(response.data.data);
//     } catch (error) {
//       console.error("Failed to fetch recommended jobs:", error);
//     } finally {
//       setJobsLoading(false);
//     }
//   };


//   useEffect(() => {
//     fetchJobs();
//   }, []);
//   return (
//     <div className=" bg-[#f7f8fa] text-[#202938] [font-family:Inter,ui-sans-serif,system-ui,sans-serif]">
//       <main className="mx-auto bg-[#f7f8fa] px-5 pb-12 pt-[32px] sm:px-[16px]">
//         <section aria-labelledby="dashboard-title">
//           <h1
//             id="dashboard-title"
//             className="text-[22px] font-bold leading-[26px] tracking-[-0.45px] text-[#202938]"
//           >
//             Job Seeker Dashboard
//           </h1>
//           <p className="mt-[6px] text-[10px] leading-[15px] text-[#828b9b]">
//             Manage your applications, saved jobs and profile from your CareerConnect account.
//           </p>
//         </section>

//         <section
//           aria-label="Your job search statistics"
//           className="mt-[22px] grid grid-cols-2 gap-3 sm:grid-cols-[1fr_1fr_1fr_1.2fr] sm:gap-[14px]"
//         >
//           {stats.map((stat) => (
//             <article
//               key={stat.label}
//               className="h-[84px] rounded-[11px] bg-white px-[14px] py-[13px]"
//             >
//               <h2 className="text-[10px] leading-3 text-[#8992a1]">
//                 {stat.label}
//               </h2>
//               <p className="mt-[5px] text-[19px] font-bold leading-[22px] tracking-[-0.4px] text-[#232b3a]">
//                 {stat.value}
//               </p>
//               <p className="mt-[4px] text-[9px] font-semibold leading-[11px] text-[#36b77b]">
//                 {stat.change}
//               </p>
//             </article>
//           ))}
//         </section>

//         <div className="mt-[20px] grid gap-4 md:grid-cols-[1.55fr_1fr] md:gap-[21px]">
//           <section
//             aria-labelledby="recommended-heading"
//             className="min-h-[273px] rounded-[11px] bg-white px-5 pb-5 pt-[20px]"
//           >
//             <h2
//               id="recommended-heading"
//               className="text-[14px] font-bold leading-[18px] tracking-[-0.15px] text-[#242c3a]"
//             >
//               Recommended for you
//             </h2>
//             <ul className="mt-[7px]">
//               {/* {recommendedJobs.map((job) => (
//                 <li
//                   key={job.title}
//                   className="flex min-h-[63px] items-center gap-3"
//                 >
//                   <div className="flex h-[33px] w-[33px] shrink-0 items-center justify-center rounded-full bg-[#f0efff] text-[8px] font-semibold text-[#7c77dd]">
//                     {job.initials}
//                   </div>
//                   <div className="min-w-0 flex-1">
//                     <h3 className="truncate text-[11px] font-semibold leading-[14px] text-[#303846]">
//                       {job.title}
//                     </h3>
//                     <p className="mt-[3px] truncate text-[9px] leading-[12px] text-[#929aaa]">
//                       {job.company} · {job.details}
//                     </p>
//                   </div>
//                   <span className="hidden min-w-[84px] rounded-full bg-[#f0efff] px-2 py-[5px] text-center text-[9px] font-semibold leading-[11px] text-[#7772d9] sm:inline-block">
//                     {job.salary}
//                   </span>
//                   <Link
//                     to={`/job-seeker/jobs/${job.id}`}
//                     className="shrink-0 rounded-[6px] bg-[#111521] px-[15px] py-[6px] text-[9px] font-semibold leading-[11px] text-white transition hover:bg-[#303748]"
//                   >
//                     View Job
//                   </Link>
//                 </li>
//               ))} */}

//               {jobsLoading ? (
//                 <li className="py-6 text-center text-sm text-[#828b9b]">
//                   Loading jobs...
//                 </li>
//               ) : recommendedJobsData.length === 0 ? (
//                 <li className="py-6 text-center text-sm text-[#828b9b]">
//                   No jobs available right now.
//                 </li>
//               ) : (
//                 recommendedJobsData.map((job) => (
//                   <li
//                     key={job.id}
//                     className="flex min-h-[63px] items-center gap-3"
//                   >
//                     <div className="flex h-[33px] w-[33px] shrink-0 items-center justify-center rounded-full bg-[#f0efff] text-[8px] font-semibold text-[#7c77dd]">
//                       {job.company.name.slice(0, 2)}
//                     </div>

//                     <div className="min-w-0 flex-1">
//                       <h3 className="truncate text-[11px] font-semibold leading-[14px] text-[#303846]">
//                         {job.title}
//                       </h3>

//                       <p className="mt-[3px] truncate text-[9px] leading-[12px] text-[#929aaa]">
//                         {job.company.name} · {job.location}
//                       </p>
//                     </div>

//                     <span className="hidden min-w-[84px] rounded-full bg-[#f0efff] px-2 py-[5px] text-center text-[9px] font-semibold leading-[11px] text-[#7772d9] sm:inline-block">
//                       {job.salaryMin != null && job.salaryMax != null
//                         ? `₹${job.salaryMin.toLocaleString("en-IN")}–${job.salaryMax.toLocaleString("en-IN")}`
//                         : job.salaryMin != null
//                           ? `From ₹${job.salaryMin.toLocaleString("en-IN")}`
//                           : job.salaryMax != null
//                             ? `Up to ₹${job.salaryMax.toLocaleString("en-IN")}`
//                             : "Salary N/A"}
//                     </span>

//                     <Link
//                       to={`/job-seeker/jobs/${job.id}`}
//                       className="shrink-0 rounded-[6px] bg-[#111521] px-[15px] py-[6px] text-[9px] font-semibold leading-[11px] text-white transition hover:bg-[#303748]"
//                     >
//                       View Job
//                     </Link>
//                   </li>
//                 ))
//               )}
//             </ul>
//           </section>

//           <section
//             aria-labelledby="recent-heading"
//             className="min-h-[273px] rounded-[11px] bg-white px-5 pb-5 pt-[20px]"
//           >
//             <h2
//               id="recent-heading"
//               className="text-[14px] font-bold leading-[18px] tracking-[-0.15px] text-[#242c3a]"
//             >
//               Recent applications
//             </h2>
//             <ul className="mt-[7px]">
//               {recentApplications.map((application) => (
//                 <li
//                   key={application.company}
//                   className="grid min-h-[44px] grid-cols-[minmax(0,1fr)_74px_44px] items-center gap-2"
//                 >
//                   <span className="truncate text-[10px] font-semibold text-[#303846]">
//                     {application.company}
//                   </span>
//                   <span
//                     className={`rounded-full px-2 py-[5px] text-center text-[9px] font-semibold leading-[11px] ${application.status === "Interview"
//                       ? "bg-[#e5f7ef] text-[#4ba981]"
//                       : application.status === "Rejected"
//                         ? "bg-[#ffeded] text-[#e78383]"
//                         : "bg-[#f0efff] text-[#7772d9]"
//                       }`}
//                   >
//                     {application.status}
//                   </span>
//                   <time className="text-right text-[9px] text-[#8c95a4]">
//                     {application.date}
//                   </time>
//                 </li>
//               ))}
//             </ul>
//           </section>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default JobSeekerDashboard;


import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

// type Job = {
//   id: string;
//   title: string;
//   location: string;
//   jobType: string;
//   salaryMin: number | null;
//   salaryMax: number | null;
//   company: {
//     id: string;
//     name: string;
//   };
// };

type Job = {
  id: string;
  title: string;
  location: string;
  jobType: string;
  salaryMin: number | null;
  salaryMax: number | null;
  requirements?: string[];
  company: {
    id: string;
    name: string;
  };
};

type Application = {
  id: string;
  status: string;
  createdAt: string;
  job?: {
    title?: string;
    company?: {
      name?: string;
    };
  };
};

const stats = [
  {
    label: "Applications",
    value: "—",
    change: "Your job applications",
  },
  {
    label: "Saved Jobs",
    value: "—",
    change: "Jobs saved",
  },
  {
    label: "Profile Views",
    value: "—",
    change: "Profile activity",
  },
  {
    label: "Interview Invites",
    value: "—",
    change: "Interview updates",
  },
];

function formatSalary(job: Job) {
  const { salaryMin, salaryMax } = job;

  if (salaryMin != null && salaryMax != null) {
    return `₹${salaryMin.toLocaleString("en-IN")}–₹${salaryMax.toLocaleString("en-IN")}`;
  }

  if (salaryMin != null) {
    return `From ₹${salaryMin.toLocaleString("en-IN")}`;
  }

  if (salaryMax != null) {
    return `Up to ₹${salaryMax.toLocaleString("en-IN")}`;
  }

  return "Salary not disclosed";
}

function formatDate(date: string) {
  if (!date) return "—";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return "—";

  return parsedDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
  });
}

function getStatusClasses(status: string) {
  const normalizedStatus = status.toUpperCase();

  if (
    normalizedStatus.includes("INTERVIEW") ||
    normalizedStatus.includes("SHORTLIST")
  ) {
    return "bg-[#e5f7ef] text-[#359b70]";
  }

  if (
    normalizedStatus.includes("REJECT") ||
    normalizedStatus.includes("WITHDRAW")
  ) {
    return "bg-[#ffeded] text-[#df7777]";
  }

  return "bg-[#f0efff] text-[#7772d9]";
}

function JobSeekerDashboard() {
  const [allJobs, setAllJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [applicationsLoading, setApplicationsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"recommended" | "all">(
    "recommended"
  );
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchJobs = async () => {
      try {
        setJobsLoading(true);

        const response = await api.get("/jobs");
        const jobs = response.data?.data;

        if (isMounted) {
          setAllJobs(Array.isArray(jobs) ? jobs : []);
        }
      } catch (error) {
        console.error("Failed to fetch jobs:", error);

        if (isMounted) {
          setAllJobs([]);
        }
      } finally {
        if (isMounted) {
          setJobsLoading(false);
        }
      }
    };

    const fetchApplications = async () => {
      try {
        setApplicationsLoading(true);

        // Update this endpoint if your backend uses a different route.
        const response = await api.get("/applications");
        const data = response.data?.data;

        if (isMounted) {
          setApplications(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error("Failed to fetch applications:", error);

        if (isMounted) {
          setApplications([]);
        }
      } finally {
        if (isMounted) {
          setApplicationsLoading(false);
        }
      }
    };

    fetchJobs();
    fetchApplications();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredJobs = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return allJobs.filter((job) => {
      const title = job.title?.toLowerCase() ?? "";
      const company = job.company?.name?.toLowerCase() ?? "";
      const location = job.location?.toLowerCase() ?? "";
      const jobType = job.jobType?.toLowerCase() ?? "";

      return (
        !query ||
        title.includes(query) ||
        company.includes(query) ||
        location.includes(query) ||
        jobType.includes(query)
      );
    });
  }, [allJobs, searchTerm]);


// const uniqueJobs = useMemo(() => {
//   const seen = new Set<string>();

//   return allJobs.filter((job) => {
//     const key = [
//       job.title.trim().toLowerCase(),
//       job.company?.name?.trim().toLowerCase(),
//       job.location.trim().toLowerCase(),
//       job.jobType.trim().toLowerCase(),
//     ].join("|");

//     if (seen.has(key)) return false;

//     seen.add(key);
//     return true;
//   });
// }, [allJobs]);

const uniqueJobs = useMemo(() => {
  const seen = new Set<string>();

  return allJobs.filter((job) => {
    const key = [
      job.title.trim().toLowerCase(),
      job.company?.name?.trim().toLowerCase(),
      job.location.trim().toLowerCase(),
      job.jobType.trim().toLowerCase(),
    ].join("|");

    if (seen.has(key)) return false;

    seen.add(key);
    return true;
  });
}, [allJobs]);

const filteredUniqueJobs = useMemo(() => {
  const query = searchTerm.trim().toLowerCase();

  return uniqueJobs.filter((job) => {
    return (
      !query ||
      job.title.toLowerCase().includes(query) ||
      job.company.name.toLowerCase().includes(query) ||
      job.location.toLowerCase().includes(query) ||
      job.jobType.toLowerCase().includes(query)
    );
  });
}, [uniqueJobs, searchTerm]);

// const visibleJobs = filteredUniqueJobs;


// const filteredUniqueJobs = useMemo(() => {
//   const query = searchTerm.trim().toLowerCase();

//   return uniqueJobs.filter((job) => {
//     return (
//       !query ||
//       job.title.toLowerCase().includes(query) ||
//       job.company.name.toLowerCase().includes(query) ||
//       job.location.toLowerCase().includes(query) ||
//       job.jobType.toLowerCase().includes(query)
//     );
//   });
// }, [uniqueJobs, searchTerm]);


  const recommendedJobs = useMemo(() => {
  // Temporary recommendation logic:
  // Job title, job type aur company ko search query se match karega.
  // Actual skill-based matching ke liye profile API connect karni hogi.
  return filteredJobs;
}, [filteredJobs]);

const visibleJobs = filteredUniqueJobs;

// const visibleJobs =
//   activeTab === "recommended"
//     ? recommendedJobs
//     : filteredJobs;

  const recentApplications = useMemo(
    () =>
      [...applications]
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
        )
        .slice(0, 4),
    [applications]
  );

  return (
    <div className="min-h-screen bg-[#f7f8fa] text-[#202938] [font-family:Inter,ui-sans-serif,system-ui,sans-serif]">
      <main className="mx-auto w-full max-w-[1440px] px-4 pb-12 pt-8 sm:px-6 lg:px-8">
        {/* Page heading */}
        <section aria-labelledby="dashboard-title">
          <h1
            id="dashboard-title"
            className="text-[22px] font-bold leading-[26px] tracking-[-0.45px] text-[#202938]"
          >
            Job Seeker Dashboard
          </h1>

          <p className="mt-[6px] text-[11px] leading-[17px] text-[#828b9b]">
            Manage your applications, explore jobs and keep your profile up to
            date.
          </p>
        </section>

        {/* Dashboard statistics */}
        <section
          aria-label="Your job search statistics"
          className="mt-[22px] grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-[14px]"
        >
          {stats.map((stat) => (
            <article
              key={stat.label}
              className="min-h-[84px] rounded-[11px] bg-white px-[14px] py-[13px] shadow-[0_1px_3px_rgba(16,24,40,0.03)]"
            >
              <h2 className="text-[10px] leading-3 text-[#8992a1]">
                {stat.label}
              </h2>

              <p className="mt-[5px] text-[19px] font-bold leading-[22px] tracking-[-0.4px] text-[#232b3a]">
                {stat.value}
              </p>

              <p className="mt-[4px] text-[9px] leading-[12px] text-[#8992a1]">
                {stat.change}
              </p>
            </article>
          ))}
        </section>

        {/* Main dashboard columns */}
        <div className="mt-5 grid grid-cols-1 items-start gap-4 lg:grid-cols-[1.55fr_1fr] lg:gap-[21px]">
          {/* Explore jobs */}
          <section
            aria-labelledby="jobs-heading"
            className="min-w-0 rounded-[11px] bg-white px-4 pb-5 pt-5 shadow-[0_1px_3px_rgba(16,24,40,0.03)] sm:px-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2
                  id="jobs-heading"
                  className="text-[14px] font-bold leading-[18px] tracking-[-0.15px] text-[#242c3a]"
                >
                  Explore Jobs
                </h2>

                <p className="mt-1 text-[10px] text-[#929aaa]">
                  Discover opportunities that match your career goals.
                </p>
              </div>

              <Link
                to="/job-list"
                className="text-[10px] font-semibold text-[#7772d9] hover:text-[#5f59c7]"
              >
                Browse all jobs →
              </Link>
            </div>

            {/* Tabs */}
            <div
              className="mt-5 flex gap-5 border-b border-[#edf0f4]"
              role="tablist"
              aria-label="Job categories"
            >
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "recommended"}
                onClick={() => setActiveTab("recommended")}
                className={`relative pb-3 text-[11px] font-semibold transition ${
                  activeTab === "recommended"
                    ? "text-[#716bd5] after:absolute after:bottom-[-1px] after:left-0 after:h-[2px] after:w-full after:bg-[#7772d9]"
                    : "text-[#8992a1] hover:text-[#303846]"
                }`}
              >
                Recommended for You
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "all"}
                onClick={() => setActiveTab("all")}
                className={`relative pb-3 text-[11px] font-semibold transition ${
                  activeTab === "all"
                    ? "text-[#716bd5] after:absolute after:bottom-[-1px] after:left-0 after:h-[2px] after:w-full after:bg-[#7772d9]"
                    : "text-[#8992a1] hover:text-[#303846]"
                }`}
              >
                All Jobs
              </button>
            </div>

            {/* Search */}
            <div className="mt-4">
              <label htmlFor="job-search" className="sr-only">
                Search jobs
              </label>

              <div className="flex h-10 items-center gap-2 rounded-[7px] border border-[#e7eaf0] bg-white px-3 focus-within:border-[#aaa5ed]">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-4 w-4 shrink-0 text-[#929aaa]"
                >
                  <circle
                    cx="11"
                    cy="11"
                    r="7"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />
                  <path
                    d="m16 16 4 4"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                </svg>

                <input
                  id="job-search"
                  type="search"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search by job title, company or location..."
                  className="h-full min-w-0 flex-1 bg-transparent text-[11px] text-[#303846] outline-none placeholder:text-[#a0a7b4]"
                />

                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm("")}
                    className="shrink-0 text-[10px] font-medium text-[#7772d9] hover:text-[#5f59c7]"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Job list */}
            <div className="mt-2">
              {jobsLoading ? (
                <div className="py-10 text-center text-[11px] text-[#828b9b]">
                  Loading jobs...
                </div>
              ) : visibleJobs.length === 0 ? (
                <div className="py-10 text-center">
                  <p className="text-[12px] font-semibold text-[#303846]">
                    {searchTerm
                      ? "No jobs match your search."
                      : "No jobs available right now."}
                  </p>

                  <p className="mt-2 text-[10px] text-[#929aaa]">
                    {searchTerm
                      ? "Try another job title, company or location."
                      : "Please check again later for new opportunities."}
                  </p>

                  {searchTerm && (
                    <button
                      type="button"
                      onClick={() => setSearchTerm("")}
                      className="mt-3 text-[10px] font-semibold text-[#7772d9]"
                    >
                      Clear search
                    </button>
                  )}
                </div>
              ) : (
                <ul>
                  {visibleJobs.map((job) => (
                    <li
                      key={job.id}
                      className="flex flex-col gap-3 border-b border-[#f0f2f5] py-4 last:border-b-0 sm:flex-row sm:items-center"
                    >
                      {/* Company avatar */}
                      <div className="flex min-w-0 flex-1 items-center gap-3">
                        <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full bg-[#f0efff] text-[10px] font-bold uppercase text-[#7c77dd]">
                          {job.company?.name?.slice(0, 2) || "CO"}
                        </div>

                        <div className="min-w-0 flex-1">
                          <h3 className="truncate text-[11px] font-semibold leading-[15px] text-[#303846]">
                            {job.title}
                          </h3>

                          <p className="mt-[4px] truncate text-[10px] leading-[14px] text-[#929aaa]">
                            {job.company?.name || "Company"} ·{" "}
                            {job.location || "Location not specified"}
                          </p>

                          <div className="mt-2 flex flex-wrap gap-2">
                            <span className="rounded-full bg-[#f4f5f8] px-2 py-1 text-[9px] text-[#697386]">
                              {job.jobType || "Job type not specified"}
                            </span>

                            <span className="rounded-full bg-[#f0efff] px-2 py-1 text-[9px] font-medium text-[#7772d9] sm:hidden">
                              {formatSalary(job)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Salary and action */}
                      <div className="flex shrink-0 items-center justify-between gap-3 sm:justify-end">
                        <span className="hidden max-w-[145px] truncate rounded-full bg-[#f0efff] px-3 py-[6px] text-center text-[9px] font-semibold text-[#7772d9] sm:inline-block">
                          {formatSalary(job)}
                        </span>

                        <Link
                          to={`/job-seeker/jobs/${job.id}`}
                          className="inline-flex min-h-[31px] shrink-0 items-center justify-center rounded-[6px] bg-[#111521] px-4 py-2 text-[10px] font-semibold text-white transition hover:bg-[#303748] focus:outline-none focus:ring-2 focus:ring-[#aaa5ed] focus:ring-offset-2"
                        >
                          View Job
                        </Link>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {!jobsLoading && allJobs.length > 0 && (
              <p className="mt-3 text-[9px] text-[#929aaa]">
                Showing {visibleJobs.length} of {allJobs.length} jobs
              </p>
            )}
          </section>

          {/* Recent applications */}
          <section
            aria-labelledby="recent-heading"
            className="min-w-0 rounded-[11px] bg-white px-4 pb-5 pt-5 shadow-[0_1px_3px_rgba(16,24,40,0.03)] sm:px-5"
          >
            <div className="flex items-center justify-between gap-3">
              <h2
                id="recent-heading"
                className="text-[14px] font-bold leading-[18px] tracking-[-0.15px] text-[#242c3a]"
              >
                Recent Applications
              </h2>

              <Link
                to="/applications"
                className="shrink-0 text-[10px] font-semibold text-[#7772d9] hover:text-[#5f59c7]"
              >
                View all →
              </Link>
            </div>

            {applicationsLoading ? (
              <div className="py-8 text-center text-[11px] text-[#828b9b]">
                Loading applications...
              </div>
            ) : recentApplications.length === 0 ? (
              <div className="py-8 text-center">
                <p className="text-[11px] font-semibold text-[#303846]">
                  No applications yet
                </p>

                <p className="mt-2 text-[10px] text-[#929aaa]">
                  Browse jobs and apply to your first opportunity.
                </p>

                <Link
                  to="/job-list"
                  className="mt-4 inline-flex rounded-[6px] bg-[#111521] px-4 py-2 text-[10px] font-semibold text-white hover:bg-[#303748]"
                >
                  Explore Jobs
                </Link>
              </div>
            ) : (
              <ul className="mt-2">
                {recentApplications.map((application) => {
                  const companyName =
                    application.job?.company?.name || "Company";

                  return (
                    <li
                      key={application.id}
                      className="flex min-h-[60px] items-center gap-3 border-b border-[#f0f2f5] last:border-b-0"
                    >
                      <div className="flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-full bg-[#f0efff] text-[9px] font-bold uppercase text-[#7c77dd]">
                        {companyName.slice(0, 2)}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[10px] font-semibold text-[#303846]">
                          {application.job?.title || companyName}
                        </p>

                        <p className="mt-1 truncate text-[9px] text-[#929aaa]">
                          {companyName} ·{" "}
                          {formatDate(application.createdAt)}
                        </p>
                      </div>

                      <span
                        className={`shrink-0 rounded-full px-2 py-[5px] text-center text-[9px] font-semibold ${getStatusClasses(
                          application.status
                        )}`}
                      >
                        {application.status}
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        </div>

        {/* Profile reminder */}
        <section className="mt-5 flex flex-col gap-3 rounded-[11px] border border-[#e9e7ff] bg-[#f1f0ff] p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div>
            <h2 className="text-[12px] font-bold text-[#30305f]">
              Keep your profile up to date
            </h2>

            <p className="mt-1 text-[10px] leading-[16px] text-[#7772a9]">
              Add your skills, experience and resume to help employers discover
              you.
            </p>
          </div>

          <Link
            to="/job-seeker/profile"
            className="inline-flex min-h-[34px] shrink-0 items-center justify-center self-start rounded-[6px] bg-[#7772d9] px-4 py-2 text-[10px] font-semibold text-white transition hover:bg-[#625cc7] sm:self-auto"
          >
            Update Profile
          </Link>
        </section>
      </main>
    </div>
  );
}

export default JobSeekerDashboard;
