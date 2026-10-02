import { useState } from "react";
import { Heart, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { JOBS } from "../data/jobs";

const FILTERS = [
  { label: "Job type", placeholder: "Select job type", options: ["Full-time", "Part-time", "Contract", "Internship"] },
  { label: "Experience", placeholder: "Select experience", options: ["Entry level", "1-3 years", "3-5 years", "5+ years"] },
  { label: "Location", placeholder: "Select location", options: ["Remote", "Ahmedabad", "Pune", "Mumbai", "Bengaluru"] },
  { label: "Salary range", placeholder: "Select salary range", options: ["₹0 - 5 LPA", "₹5 - 10 LPA", "₹10 - 20 LPA", "₹20+ LPA"] },
];

const JobList = () => {
  const [saved, setSaved] = useState<string[]>([]);
  const [values, setValues] = useState<Record<string, string>>({});

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
              {FILTERS.map((f) => (
                <label key={f.label} className="block">
                  <span className="text-[15px] font-bold text-foreground">{f.label}</span>
                  <div className="relative mt-2.5">
                    <select
                      value={values[f.label] ?? ""}
                      onChange={(e) => setValues((v) => ({ ...v, [f.label]: e.target.value }))}
                      className="w-full appearance-none rounded-lg border border-border bg-secondary px-4 py-[13px] text-[15px] text-foreground outline-hidden focus:border-primary focus:ring-2 focus:ring-ring/30 data-[empty=true]:text-muted-foreground"
                      data-empty={!values[f.label]}
                    >
                      <option value="">{f.placeholder}</option>
                      {f.options.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  </div>
                </label>
              ))}
            </div>

            <button
              onClick={() => setValues({})}
              className="mt-10 w-full rounded-lg border border-border bg-card py-[13px] text-[15px] font-bold text-foreground transition-colors hover:bg-secondary lg:mt-[104px]"
            >
              Clear filters
            </button>
          </aside>

          <div className="min-w-0 flex-1">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:justify-between">
              <p className="min-w-0 truncate text-[17px] font-bold text-foreground">
                {JOBS.length} {JOBS.length === 1 ? "job" : "jobs"} found
              </p>
              <div className="relative">
                <select
                  className="appearance-none rounded-lg border border-border bg-card py-[13px] pl-4 pr-10 text-[15px] text-foreground outline-hidden focus:border-primary"
                  defaultValue="recent"
                >
                  <option value="recent">Most recent</option>
                  <option value="relevant">Most relevant</option>
                  <option value="salary">Highest salary</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>

            <ul className="mt-8 grid gap-8 sm:grid-cols-2">
              {JOBS.map((job) => {
                const isSaved = saved.includes(job.title);
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
                        {job.company.charAt(0)}
                      </Link>

                      <button
                        type="button"
                        aria-label={isSaved ? `Unsave ${job.title}` : `Save ${job.title}`}
                        onClick={(event) => {
                          event.preventDefault();
                          setSaved((s) =>
                            s.includes(job.title) ? s.filter((t) => t !== job.title) : [...s, job.title],
                          );
                        }}
                        className="shrink-0 text-muted-foreground transition-colors hover:text-primary"
                      >
                        <Heart className={`h-[18px] w-[18px] ${isSaved ? "fill-primary text-primary" : ""}`} />
                      </button>
                    </div>

                    <Link to={`/jobs/${job.id}`} className="mt-4 block">
                      <h3 className="text-[19px] font-bold leading-snug text-foreground">{job.title}</h3>
                      <p className="mt-1.5 text-[15px] text-muted-foreground">{job.company}</p>
                      <p className="mt-2.5 text-[14px] text-muted-foreground">{job.location}</p>
                      <span className="mt-4 inline-flex rounded-full bg-brand-soft px-4 py-1.5 text-[13px] font-bold text-primary">
                        {job.type}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}

export default JobList;