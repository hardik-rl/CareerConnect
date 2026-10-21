import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

type Job = {
  id: string;
  title: string;
  location: string;
  jobType: string;
  experienceLevel: string;
  salaryMin: number | null;
  salaryMax: number | null;
  isActive: boolean;
  createdAt: string;
  _count?: {
    applications: number;
  };
};

const formatLabel = (value: string) =>
  value
    .toLowerCase()
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

const formatSalary = (
  min: number | null,
  max: number | null,
) => {
  if (min == null && max == null) return "Not disclosed";

  const formatAmount = (amount: number) =>
    `₹${(amount / 100000).toLocaleString("en-IN", {
      maximumFractionDigits: 1,
    })}L`;

  if (min != null && max != null) {
    return `${formatAmount(min)} - ${formatAmount(max)}`;
  }

  return min != null
    ? `${formatAmount(min)}+`
    : `Up to ${formatAmount(max!)}`;
};

const ManageJobs: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError("");

        // Uses the existing public jobs endpoint.
        const response = await api.get("/jobs/employer/my-jobs");
        const payload = response.data;

        const list = Array.isArray(payload)
          ? payload
          : payload.data ?? payload.jobs ?? [];

        setJobs(list);
      } catch (err: unknown) {
        const apiError = err as {
          response?: { data?: { message?: string } };
        };

        setError(
          apiError.response?.data?.message ??
          "Could not load jobs. Please try again.",
        );
      } finally {
        setLoading(false);
      }
    };

    void fetchJobs();
  }, []);

  const filteredJobs = useMemo(() => {
    const query = search.trim().toLowerCase();

    return jobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(query) ||
        job.location.toLowerCase().includes(query);

      const matchesFilter =
        filter === "ALL" ||
        (filter === "ACTIVE" && job.isActive) ||
        (filter === "INACTIVE" && !job.isActive);

      return matchesSearch && matchesFilter;
    });
  }, [jobs, search, filter]);

  return (
    <main className="min-h-screen bg-[#F8F9FB] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[1280px]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-[#1E293B]">
              Manage Jobs
            </h1>
            <p className="mt-2 text-sm text-[#64748B]">
              Create, manage and track your job postings.
            </p>
          </div>

          <Link
            to="/employer/jobs/create"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#5B57D9] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#4B47C7]"
          >
            <span className="text-lg leading-none">+</span>
            Post a New Job
          </Link>
        </div>

        <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-[#EEF0F4] bg-white p-5">
            <p className="text-sm text-[#64748B]">Total Jobs</p>
            <p className="mt-2 text-3xl font-semibold text-[#1E293B]">
              {jobs.length}
            </p>
          </div>

          <div className="rounded-2xl border border-[#EEF0F4] bg-white p-5">
            <p className="text-sm text-[#64748B]">Active Jobs</p>
            <p className="mt-2 text-3xl font-semibold text-[#16A36A]">
              {jobs.filter((job) => job.isActive).length}
            </p>
          </div>

          <div className="rounded-2xl border border-[#EEF0F4] bg-white p-5">
            <p className="text-sm text-[#64748B]">Inactive Jobs</p>
            <p className="mt-2 text-3xl font-semibold text-[#64748B]">
              {jobs.filter((job) => !job.isActive).length}
            </p>
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-[#EEF0F4] bg-white p-4 sm:p-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:max-w-md">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]">
                ⌕
              </span>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by job title or location..."
                className="w-full rounded-lg border border-[#E2E8F0] py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#5B57D9] focus:ring-2 focus:ring-[#5B57D9]/10"
              />
            </div>

            <select
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              className="rounded-lg border border-[#E2E8F0] bg-white px-4 py-3 text-sm text-[#475569] outline-none focus:border-[#5B57D9]"
            >
              <option value="ALL">All jobs</option>
              <option value="ACTIVE">Active jobs</option>
              <option value="INACTIVE">Inactive jobs</option>
            </select>
          </div>

          {loading && (
            <p className="py-16 text-center text-sm text-[#64748B]">
              Loading your jobs...
            </p>
          )}

          {!loading && error && (
            <div className="py-12 text-center">
              <p className="text-sm text-red-600">{error}</p>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-4 rounded-lg bg-[#5B57D9] px-4 py-2 text-sm font-semibold text-white"
              >
                Try again
              </button>
            </div>
          )}

          {!loading && !error && (
            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[760px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-[#EEF0F4] text-xs uppercase tracking-wide text-[#94A3B8]">
                    <th className="px-4 py-4 font-medium">Job Details</th>
                    <th className="px-4 py-4 font-medium">Job Type</th>
                    <th className="px-4 py-4 font-medium">Salary</th>
                    <th className="px-4 py-4 font-medium">Posted On</th>
                    <th className="px-4 py-4 font-medium">Status</th>
                    <th className="px-4 py-4 font-medium">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredJobs.map((job) => (
                    <tr
                      key={job.id}
                      className="border-b border-[#F1F5F9] last:border-0 hover:bg-[#FAFBFF]"
                    >
                      <td className="px-4 py-5">
                        <p className="font-semibold text-[#1E293B]">
                          {job.title}
                        </p>
                        <p className="mt-1 text-xs text-[#64748B]">
                          {job.location}
                        </p>
                        <p className="mt-1 text-xs text-[#94A3B8]">
                          {formatLabel(job.experienceLevel)}
                        </p>
                      </td>

                      <td className="px-4 py-5 text-sm text-[#475569]">
                        {formatLabel(job.jobType)}
                      </td>

                      <td className="px-4 py-5 text-sm text-[#475569]">
                        {formatSalary(job.salaryMin, job.salaryMax)}
                      </td>

                      <td className="px-4 py-5 text-sm text-[#64748B]">
                        {new Date(job.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>

                      {/* {console.log(job, "job")} */}
                      <td className="px-4 py-5">
                        {/* <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${job.isActive
                              ? "bg-[#E3F7ED] text-[#16A364]"
                              : "bg-[#F1F5F9] text-[#64748B]"
                            }`}
                        >
                          {job.isActive ? "Active" : "Inactive"}
                        </span> */}
                        <span
                          className={
                            job.isActive
                              ? "rounded-full bg-green-100 px-3 py-1 text-green-700"
                              : "rounded-full bg-red-100 px-3 py-1 text-red-700"
                          }
                        >
                          {job.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>

                      <td className="px-4 py-5">
                        <Link
                          to={`/employer/jobs/${job.id}/edit`}
                          className="text-sm font-semibold text-[#5B57D9] hover:underline"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}

                  {filteredJobs.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-4 py-16 text-center text-sm text-[#64748B]"
                      >
                        {jobs.length === 0
                          ? "No jobs found. Post your first job to get started."
                          : "No jobs match your search or filter."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default ManageJobs;
