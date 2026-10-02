import { Link } from "react-router-dom";

const stats = [
  { label: "Applications", value: "18", change: "↑ 4 this month" },
  { label: "Saved Jobs", value: "12", change: "↑ 3 this week" },
  { label: "Profile Views", value: "146", change: "↑ 18.4% this month" },
  { label: "Interview Invites", value: "4", change: "↑ 2 this month" },
];

const recommendedJobs = [
  {
    id: 1,
    initials: "Te",
    title: "Senior React Developer",
    company: "TechForge",
    details: "Remote India",
    salary: "₹12–18 LPA",
  },
  {
    id: 2,
    initials: "Cl",
    title: "Frontend Engineer",
    company: "CloudScale",
    details: "Pune · Hybrid",
    salary: "₹10–15 LPA",
  },
  {
    id: 3,
    initials: "Ki",
    title: "UI Developer",
    company: "KiteWorks",
    details: "Mumbai · Hybrid",
    salary: "₹8–12 LPA",
  },
];

const recentApplications = [
  { company: "TechForge", status: "Interview", date: "Oct 02" },
  { company: "Northstar", status: "Applied", date: "Sep 21" },
  { company: "PixelCraft", status: "Shortlisted", date: "Sep 19" },
  { company: "Vertex", status: "Rejected", date: "Sep 12" },
];

function JobSeekerDashboard() {
  return (
    <div className=" bg-[#f7f8fa] text-[#202938] [font-family:Inter,ui-sans-serif,system-ui,sans-serif]">
      {/* <header className="mx-auto h-[54px] max-w-[1008px] bg-white">
        <div className="flex h-full items-center justify-between px-5 sm:px-[45px]">
          <Link
            to="/"
            className="shrink-0 text-[15px] font-bold tracking-[-0.35px] text-[#151b27]"
          >
            CareerConnect
          </Link>

          <nav className="hidden items-center gap-10 md:flex">
            <Link
              to="/job-list"
              className="text-[9px] font-semibold text-[#202531] transition hover:text-[#6c69d8]"
            >
              Find Jobs
            </Link>
            <Link
              to="/companies"
              className="text-[9px] font-semibold text-[#202531] transition hover:text-[#6c69d8]"
            >
              Companies
            </Link>
            <Link
              to="/career-advice"
              className="text-[9px] font-semibold text-[#202531] transition hover:text-[#6c69d8]"
            >
              Career Advice
            </Link>
          </nav>

          <div className="flex items-center gap-5 sm:gap-11">
            <Link
              to="/job-list"
              className="hidden text-[9px] font-semibold text-[#202531] transition hover:text-[#6c69d8] sm:inline"
            >
              Saved Jobs
            </Link>
            <Link
              to="/job-seeker/profile"
              className="hidden text-[9px] font-semibold text-[#202531] transition hover:text-[#6c69d8] sm:inline"
            >
              Job Seeker
            </Link>
            <Link
              to="/job-seeker/profile"
              aria-label="Open your profile"
              className="flex h-[29px] w-[29px] items-center justify-center rounded-full bg-[#f0efff] text-[8px] font-semibold text-[#716be2] transition hover:ring-2 hover:ring-[#716be2]/20"
            >
              {initials}
            </Link>
          </div>
        </div>
      </header> */}

      <main className="mx-auto bg-[#f7f8fa] px-5 pb-12 pt-[32px] sm:px-[16px]">
        <section aria-labelledby="dashboard-title">
          <h1
            id="dashboard-title"
            className="text-[22px] font-bold leading-[26px] tracking-[-0.45px] text-[#202938]"
          >
            Job Seeker Dashboard
          </h1>
          <p className="mt-[6px] text-[10px] leading-[15px] text-[#828b9b]">
            Manage your applications, saved jobs and profile from your CareerConnect account.
          </p>
        </section>

        <section
          aria-label="Your job search statistics"
          className="mt-[22px] grid grid-cols-2 gap-3 sm:grid-cols-[1fr_1fr_1fr_1.2fr] sm:gap-[14px]"
        >
          {stats.map((stat) => (
            <article
              key={stat.label}
              className="h-[84px] rounded-[11px] bg-white px-[14px] py-[13px]"
            >
              <h2 className="text-[10px] leading-3 text-[#8992a1]">
                {stat.label}
              </h2>
              <p className="mt-[5px] text-[19px] font-bold leading-[22px] tracking-[-0.4px] text-[#232b3a]">
                {stat.value}
              </p>
              <p className="mt-[4px] text-[9px] font-semibold leading-[11px] text-[#36b77b]">
                {stat.change}
              </p>
            </article>
          ))}
        </section>

        <div className="mt-[20px] grid gap-4 md:grid-cols-[1.55fr_1fr] md:gap-[21px]">
          <section
            aria-labelledby="recommended-heading"
            className="min-h-[273px] rounded-[11px] bg-white px-5 pb-5 pt-[20px]"
          >
            <h2
              id="recommended-heading"
              className="text-[14px] font-bold leading-[18px] tracking-[-0.15px] text-[#242c3a]"
            >
              Recommended for you
            </h2>
            <ul className="mt-[7px]">
              {recommendedJobs.map((job) => (
                <li
                  key={job.title}
                  className="flex min-h-[63px] items-center gap-3"
                >
                  <div className="flex h-[33px] w-[33px] shrink-0 items-center justify-center rounded-full bg-[#f0efff] text-[8px] font-semibold text-[#7c77dd]">
                    {job.initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-[11px] font-semibold leading-[14px] text-[#303846]">
                      {job.title}
                    </h3>
                    <p className="mt-[3px] truncate text-[9px] leading-[12px] text-[#929aaa]">
                      {job.company} · {job.details}
                    </p>
                  </div>
                  <span className="hidden min-w-[84px] rounded-full bg-[#f0efff] px-2 py-[5px] text-center text-[9px] font-semibold leading-[11px] text-[#7772d9] sm:inline-block">
                    {job.salary}
                  </span>
                  <Link
                    to={`/job-seeker/jobs/${job.id}`}
                    className="shrink-0 rounded-[6px] bg-[#111521] px-[15px] py-[6px] text-[9px] font-semibold leading-[11px] text-white transition hover:bg-[#303748]"
                  >
                    View Job
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section
            aria-labelledby="recent-heading"
            className="min-h-[273px] rounded-[11px] bg-white px-5 pb-5 pt-[20px]"
          >
            <h2
              id="recent-heading"
              className="text-[14px] font-bold leading-[18px] tracking-[-0.15px] text-[#242c3a]"
            >
              Recent applications
            </h2>
            <ul className="mt-[7px]">
              {recentApplications.map((application) => (
                <li
                  key={application.company}
                  className="grid min-h-[44px] grid-cols-[minmax(0,1fr)_74px_44px] items-center gap-2"
                >
                  <span className="truncate text-[10px] font-semibold text-[#303846]">
                    {application.company}
                  </span>
                  <span
                    className={`rounded-full px-2 py-[5px] text-center text-[9px] font-semibold leading-[11px] ${
                      application.status === "Interview"
                        ? "bg-[#e5f7ef] text-[#4ba981]"
                        : application.status === "Rejected"
                          ? "bg-[#ffeded] text-[#e78383]"
                          : "bg-[#f0efff] text-[#7772d9]"
                    }`}
                  >
                    {application.status}
                  </span>
                  <time className="text-right text-[9px] text-[#8c95a4]">
                    {application.date}
                  </time>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}

export default JobSeekerDashboard;
