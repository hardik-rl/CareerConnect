import { ArrowUp } from "lucide-react";

const STATS = [
  { label: "Total Users", value: "12,840", change: "12.5%" },
  { label: "Active Jobs", value: "1,248", change: "12.5%" },
  { label: "Applications", value: "4,562", change: "12.5%" },
  { label: "Reports", value: "94", change: "12.5%" },
];

const BARS = [30, 47, 65, 84, 32, 55, 72];

const ACTIVITY = [
  { title: "New employer registered", time: "A few minutes ago" },
  { title: "Job pending review", time: "A few minutes ago" },
  { title: "User reported a listing", time: "A few minutes ago" },
  { title: "Application milestone", time: "A few minutes ago" },
];

const AdminOverview = () => {
  return (
    <main className="min-h-screen bg-white px-6 py-8 sm:px-8 sm:py-10 lg:bg-[#f9fafc]">
      {/* Header Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight text-[#1a202c] sm:text-4xl">
          Welcome back, Hardik
        </h2>
        <p className="mt-2 text-sm text-[#6b7280] sm:text-base">
          Here is what is happening across CareerConnect.
        </p>
      </div>

      {/* Stats Grid */}
      <section className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat) => (
          <article
            key={stat.label}
            className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-[#e5e7eb] transition-shadow hover:shadow-md"
          >
            <p className="text-xs font-medium text-[#9ca3af] uppercase tracking-wide">
              {stat.label}
            </p>
            <p className="mt-3 text-2xl font-bold text-[#1f2937] sm:text-3xl">
              {stat.value}
            </p>
            <p className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#10b981]">
              <ArrowUp className="h-3.5 w-3.5" strokeWidth={2.5} />
              {stat.change} this month
            </p>
          </article>
        ))}
      </section>

      {/* Charts Section */}
      <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        {/* Application Activity Chart */}
        <article className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-[#e5e7eb] sm:p-8">
          <h3 className="text-lg font-bold text-[#1f2937]">Application activity</h3>
          <div className="mt-8 flex h-48 items-end justify-center gap-2 sm:gap-3 lg:gap-4 lg:h-52">
            {BARS.map((height, index) => (
              <div
                key={index}
                className="flex-1 rounded-sm bg-[#6366f1] transition-colors hover:bg-[#4f46e5]"
                style={{
                  height: `${height}%`,
                  minHeight: "2px",
                  maxWidth: "2.5rem",
                }}
                aria-label={`Bar ${index + 1}: ${height}%`}
              />
            ))}
          </div>
        </article>

        {/* Recent Activity */}
        <article className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-[#e5e7eb] sm:p-8">
          <h3 className="text-lg font-bold text-[#1f2937]">Recent activity</h3>
          <ul className="mt-6 space-y-4">
            {ACTIVITY.map((activity, index) => (
              <li key={index} className="border-b border-[#f3f4f6] pb-4 last:border-b-0">
                <p className="text-sm font-semibold text-[#1f2937]">{activity.title}</p>
                <p className="mt-1 text-xs text-[#9ca3af]">{activity.time}</p>
              </li>
            ))}
          </ul>
        </article>
      </section>
    </main>
  );
};

export default AdminOverview;