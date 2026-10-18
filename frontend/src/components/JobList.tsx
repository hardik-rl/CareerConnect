// import { useState } from "react";
// import { Heart, ChevronDown } from "lucide-react";
// import { Link } from "react-router-dom";
// import { JOBS } from "../data/jobs";

// const FILTERS = [
//   { label: "Job type", placeholder: "Select job type", options: ["Full-time", "Part-time", "Contract", "Internship"] },
//   { label: "Experience", placeholder: "Select experience", options: ["Entry level", "1-3 years", "3-5 years", "5+ years"] },
//   { label: "Location", placeholder: "Select location", options: ["Remote", "Ahmedabad", "Pune", "Mumbai", "Bengaluru"] },
//   { label: "Salary range", placeholder: "Select salary range", options: ["₹0 - 5 LPA", "₹5 - 10 LPA", "₹10 - 20 LPA", "₹20+ LPA"] },
// ];

// const JobList = () => {
//   const [saved, setSaved] = useState<string[]>([]);
//   const [values, setValues] = useState<Record<string, string>>({});

//   return (
//     <div className="min-h-screen bg-background font-sans">

//       <main className="mx-auto max-w-[1440px] px-6 pb-24 lg:px-[100px]">
//         <section className="pt-10 lg:pt-[68px]">
//           <h1 className="text-[34px] font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-[42px]">
//             Find your next opportunity
//           </h1>
//           <p className="mt-3 text-[16px] text-muted-foreground">
//             Browse curated jobs and narrow your search with filters.
//           </p>
//         </section>

//         <div id="jobs" className="mt-10 flex flex-col gap-8 lg:mt-[76px] lg:flex-row">
//           <aside className="w-full shrink-0 self-start rounded-xl border border-border bg-card p-7 lg:w-[300px]">
//             <h2 className="text-[19px] font-bold text-foreground">Filters</h2>

//             <div className="mt-6 flex flex-col gap-6">
//               {FILTERS.map((f) => (
//                 <label key={f.label} className="block">
//                   <span className="text-[15px] font-bold text-foreground">{f.label}</span>
//                   <div className="relative mt-2.5">
//                     <select
//                       value={values[f.label] ?? ""}
//                       onChange={(e) => setValues((v) => ({ ...v, [f.label]: e.target.value }))}
//                       className="w-full appearance-none rounded-lg border border-border bg-secondary px-4 py-[13px] text-[15px] text-foreground outline-hidden focus:border-primary focus:ring-2 focus:ring-ring/30 data-[empty=true]:text-muted-foreground"
//                       data-empty={!values[f.label]}
//                     >
//                       <option value="">{f.placeholder}</option>
//                       {f.options.map((o) => (
//                         <option key={o} value={o}>
//                           {o}
//                         </option>
//                       ))}
//                     </select>
//                     <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//                   </div>
//                 </label>
//               ))}
//             </div>

//             <button
//               onClick={() => setValues({})}
//               className="mt-10 w-full rounded-lg border border-border bg-card py-[13px] text-[15px] font-bold text-foreground transition-colors hover:bg-secondary lg:mt-[104px]"
//             >
//               Clear filters
//             </button>
//           </aside>

//           <div className="min-w-0 flex-1">
//             <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:justify-between">
//               <p className="min-w-0 truncate text-[17px] font-bold text-foreground">
//                 {JOBS.length} {JOBS.length === 1 ? "job" : "jobs"} found
//               </p>
//               <div className="relative">
//                 <select
//                   className="appearance-none rounded-lg border border-border bg-card py-[13px] pl-4 pr-10 text-[15px] text-foreground outline-hidden focus:border-primary"
//                   defaultValue="recent"
//                 >
//                   <option value="recent">Most recent</option>
//                   <option value="relevant">Most relevant</option>
//                   <option value="salary">Highest salary</option>
//                 </select>
//                 <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//               </div>
//             </div>

//             <ul className="mt-8 grid gap-8 sm:grid-cols-2">
//               {JOBS.map((job) => {
//                 const isSaved = saved.includes(job.title);
//                 return (
//                   <li
//                     key={job.id}
//                     className="rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-card"
//                   >
//                     <div className="flex items-start justify-between">
//                       <Link
//                         to={`/jobs/${job.id}`}
//                         className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-brand-soft text-[18px] font-bold text-primary transition hover:opacity-90"
//                         aria-label={`View ${job.title}`}
//                       >
//                         {job.company.charAt(0)}
//                       </Link>

//                       <button
//                         type="button"
//                         aria-label={isSaved ? `Unsave ${job.title}` : `Save ${job.title}`}
//                         onClick={(event) => {
//                           event.preventDefault();
//                           setSaved((s) =>
//                             s.includes(job.title) ? s.filter((t) => t !== job.title) : [...s, job.title],
//                           );
//                         }}
//                         className="shrink-0 text-muted-foreground transition-colors hover:text-primary"
//                       >
//                         <Heart className={`h-[18px] w-[18px] ${isSaved ? "fill-primary text-primary" : ""}`} />
//                       </button>
//                     </div>

//                     <Link to={`/jobs/${job.id}`} className="mt-4 block">
//                       <h3 className="text-[19px] font-bold leading-snug text-foreground">{job.title}</h3>
//                       <p className="mt-1.5 text-[15px] text-muted-foreground">{job.company}</p>
//                       <p className="mt-2.5 text-[14px] text-muted-foreground">{job.location}</p>
//                       <span className="mt-4 inline-flex rounded-full bg-brand-soft px-4 py-1.5 text-[13px] font-bold text-primary">
//                         {job.type}
//                       </span>
//                     </Link>
//                   </li>
//                 );
//               })}
//             </ul>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default JobList;


import { useEffect, useMemo, useState } from "react";
import { Heart, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../services/api";

type ApiJob = {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  location: string;
  salaryMin: number | null;
  salaryMax: number | null;
  jobType: "FULL_TIME" | "PART_TIME" | "CONTRACT" | "INTERNSHIP" | "FREELANCE";
  experienceLevel: "ENTRY" | "JUNIOR" | "MID" | "SENIOR" | "LEAD";
  createdAt: string;
  company: {
    id: string;
    name: string;
  };
};

type FilterValues = {
  "Job type": string;
  Experience: string;
  Location: string;
  "Salary range": string;
};

const FILTERS = [
  {
    label: "Job type",
    placeholder: "Select job type",
    options: ["Full-time", "Part-time", "Contract", "Internship", "Freelance"],
  },
  {
    label: "Experience",
    placeholder: "Select experience",
    options: ["Entry level", "1-3 years", "3-5 years", "5+ years"],
  },
  {
    label: "Location",
    placeholder: "Select location",
    options: ["Remote", "Ahmedabad", "Pune", "Mumbai", "Bengaluru"],
  },
  {
    label: "Salary range",
    placeholder: "Select salary range",
    options: ["₹0 - 5 LPA", "₹5 - 10 LPA", "₹10 - 20 LPA", "₹20+ LPA"],
  },
];

const JOB_TYPE_LABELS: Record<ApiJob["jobType"], string> = {
  FULL_TIME: "Full-time",
  PART_TIME: "Part-time",
  CONTRACT: "Contract",
  INTERNSHIP: "Internship",
  FREELANCE: "Freelance",
};

const EXPERIENCE_LABELS: Record<ApiJob["experienceLevel"], string> = {
  ENTRY: "Entry level",
  JUNIOR: "Junior",
  MID: "Mid-level",
  SENIOR: "Senior",
  LEAD: "Lead",
};

const EMPTY_FILTERS: FilterValues = {
  "Job type": "",
  Experience: "",
  Location: "",
  "Salary range": "",
};

const formatSalary = (min: number | null, max: number | null) => {
  if (min == null && max == null) return "Salary not disclosed";

  const formatLpa = (amount: number) =>
    `₹${(amount / 100000).toLocaleString("en-IN", {
      maximumFractionDigits: 1,
    })} LPA`;

  if (min != null && max != null) {
    return `${formatLpa(min)} - ${formatLpa(max)}`;
  }

  if (min != null) return `From ${formatLpa(min)}`;
  return `Up to ${formatLpa(max!)}`;
};

const matchesExperience = (
  level: ApiJob["experienceLevel"],
  filter: string,
) => {
  if (!filter) return true;

  const groups: Record<string, ApiJob["experienceLevel"][]> = {
    "Entry level": ["ENTRY"],
    "1-3 years": ["JUNIOR"],
    "3-5 years": ["MID"],
    "5+ years": ["SENIOR", "LEAD"],
  };

  return groups[filter]?.includes(level) ?? true;
};

const matchesSalary = (job: ApiJob, filter: string) => {
  if (!filter) return true;

  const min = job.salaryMin ?? 0;
  const max = job.salaryMax ?? job.salaryMin ?? 0;

  switch (filter) {
    case "₹0 - 5 LPA":
      return min <= 500000 && max >= 0 && max <= 500000;
    case "₹5 - 10 LPA":
      return min <= 1000000 && max >= 500000;
    case "₹10 - 20 LPA":
      return min <= 2000000 && max >= 1000000;
    case "₹20+ LPA":
      return max >= 2000000;
    default:
      return true;
  }
};

const JobList = () => {
  const [jobs, setJobs] = useState<ApiJob[]>([]);
  const [saved, setSaved] = useState<string[]>([]);
  const [values, setValues] = useState<FilterValues>(EMPTY_FILTERS);
  const [sortBy, setSortBy] = useState("recent");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError("");

        // Axios baseURL already includes /api.
        const response = await api.get<{
          success: boolean;
          count: number;
          data: ApiJob[];
        }>("/jobs");

        if (!cancelled) {
          setJobs(response.data.data ?? []);
        }
      } catch (err: unknown) {
        if (cancelled) return;

        const message =
          typeof err === "object" &&
          err !== null &&
          "response" in err &&
          typeof err.response === "object" &&
          err.response !== null &&
          "data" in err.response &&
          typeof err.response.data === "object" &&
          err.response.data !== null &&
          "message" in err.response.data &&
          typeof err.response.data.message === "string"
            ? err.response.data.message
            : "Unable to load jobs. Please check your backend server and try again.";

        setError(message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void fetchJobs();

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredJobs = useMemo(() => {
    const result = jobs.filter((job) => {
      const jobTypeMatches =
        !values["Job type"] ||
        JOB_TYPE_LABELS[job.jobType] === values["Job type"];

      const experienceMatches = matchesExperience(
        job.experienceLevel,
        values.Experience,
      );

      const locationMatches =
        !values.Location ||
        job.location.toLowerCase().includes(values.Location.toLowerCase());

      const salaryMatches = matchesSalary(job, values["Salary range"]);

      return (
        jobTypeMatches &&
        experienceMatches &&
        locationMatches &&
        salaryMatches
      );
    });

    if (sortBy === "salary") {
      result.sort(
        (a, b) => (b.salaryMax ?? b.salaryMin ?? 0) -
          (a.salaryMax ?? a.salaryMin ?? 0),
      );
    } else if (sortBy === "relevant") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      result.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime(),
      );
    }

    return result;
  }, [jobs, values, sortBy]);

  const clearFilters = () => setValues(EMPTY_FILTERS);

  return (
    <div className="min-h-screen bg-background font-sans">
      <main className="mx-auto max-w-[1440px] px-6 pb-24 lg:px-[100px]">
        <section className="pt-10 lg:pt-[68px]">
          <h1 className="text-[34px] font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-[42px]">
            Find your next opportunity
          </h1>
          <p className="mt-3 text-[16px] text-muted-foreground">
            Browse curated jobs and narrow your search with filters.
          </p>
        </section>

        <div id="jobs" className="mt-10 flex flex-col gap-8 lg:mt-[76px] lg:flex-row">
          <aside className="w-full shrink-0 self-start rounded-xl border border-border bg-card p-7 lg:w-[300px]">
            <h2 className="text-[19px] font-bold text-foreground">Filters</h2>

            <div className="mt-6 flex flex-col gap-6">
              {FILTERS.map((filter) => (
                <label key={filter.label} className="block">
                  <span className="text-[15px] font-bold text-foreground">
                    {filter.label}
                  </span>

                  <div className="relative mt-2.5">
                    <select
                      value={values[filter.label as keyof FilterValues]}
                      onChange={(event) =>
                        setValues((current) => ({
                          ...current,
                          [filter.label]: event.target.value,
                        }))
                      }
                      className="w-full appearance-none rounded-lg border border-border bg-secondary px-4 py-[13px] text-[15px] text-foreground outline-hidden focus:border-primary focus:ring-2 focus:ring-ring/30"
                    >
                      <option value="">{filter.placeholder}</option>
                      {filter.options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>

                    <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  </div>
                </label>
              ))}
            </div>

            <button
              type="button"
              onClick={clearFilters}
              className="mt-10 w-full rounded-lg border border-border bg-card py-[13px] text-[15px] font-bold text-foreground transition-colors hover:bg-secondary lg:mt-[104px]"
            >
              Clear filters
            </button>
          </aside>

          <div className="min-w-0 flex-1">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:justify-between">
              <p className="min-w-0 truncate text-[17px] font-bold text-foreground">
                {loading ? "Loading jobs..." : `${filteredJobs.length} ${filteredJobs.length === 1 ? "job" : "jobs"} found`}
              </p>

              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value)}
                  aria-label="Sort jobs"
                  className="appearance-none rounded-lg border border-border bg-card py-[13px] pl-4 pr-10 text-[15px] text-foreground outline-hidden focus:border-primary"
                >
                  <option value="recent">Most recent</option>
                  <option value="relevant">Most relevant</option>
                  <option value="salary">Highest salary</option>
                </select>

                <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>

            {loading && (
              <div className="mt-8 rounded-xl border border-border bg-card p-8 text-center text-muted-foreground">
                Loading available jobs...
              </div>
            )}

            {!loading && error && (
              <div role="alert" className="mt-8 rounded-xl border border-red-200 bg-red-50 p-6 text-red-700">
                <p className="font-semibold">Could not load jobs</p>
                <p className="mt-2 text-sm">{error}</p>
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="mt-4 rounded-lg border border-red-300 px-4 py-2 font-semibold hover:bg-red-100"
                >
                  Try again
                </button>
              </div>
            )}

            {!loading && !error && filteredJobs.length === 0 && (
              <div className="mt-8 rounded-xl border border-border bg-card p-8 text-center">
                <h3 className="text-lg font-bold text-foreground">
                  No jobs found
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Try changing your filters or clearing them.
                </p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-4 rounded-lg bg-primary px-5 py-2.5 font-semibold text-white hover:opacity-90"
                >
                  Clear filters
                </button>
              </div>
            )}

            {!loading && !error && filteredJobs.length > 0 && (
              <ul className="mt-8 grid gap-8 sm:grid-cols-2">
                {filteredJobs.map((job) => {
                  const isSaved = saved.includes(job.id);

                  return (
                    <li
                      key={job.id}
                      className="rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-card"
                    >
                      <div className="flex items-start justify-between">
                        <Link
                          to={`/jobs/${job.id}`}
                          className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-brand-soft text-[18px] font-bold text-primary transition hover:opacity-90"
                          aria-label={`View ${job.title}`}
                        >
                          {job.company.name.charAt(0).toUpperCase()}
                        </Link>

                        <button
                          type="button"
                          aria-label={isSaved ? `Unsave ${job.title}` : `Save ${job.title}`}
                          onClick={() =>
                            setSaved((current) =>
                              current.includes(job.id)
                                ? current.filter((id) => id !== job.id)
                                : [...current, job.id],
                            )
                          }
                          className="shrink-0 text-muted-foreground transition-colors hover:text-primary"
                        >
                          <Heart
                            className={`h-[18px] w-[18px] ${isSaved ? "fill-primary text-primary" : ""}`}
                          />
                        </button>
                      </div>

                      <Link to={`/jobs/${job.id}`} className="mt-4 block">
                        <h3 className="text-[19px] font-bold leading-snug text-foreground">
                          {job.title}
                        </h3>
                        <p className="mt-1.5 text-[15px] text-muted-foreground">
                          {job.company.name}
                        </p>
                        <p className="mt-2.5 text-[14px] text-muted-foreground">
                          {job.location}
                        </p>

                        <span className="mt-4 inline-flex rounded-full bg-brand-soft px-4 py-1.5 text-[13px] font-bold text-primary">
                          {JOB_TYPE_LABELS[job.jobType] ?? job.jobType}
                        </span>

                        <p className="mt-3 text-sm font-semibold text-foreground">
                          {formatSalary(job.salaryMin, job.salaryMax)}
                        </p>

                        <p className="mt-2 text-xs text-muted-foreground">
                          {EXPERIENCE_LABELS[job.experienceLevel] ?? job.experienceLevel}
                        </p>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default JobList;
