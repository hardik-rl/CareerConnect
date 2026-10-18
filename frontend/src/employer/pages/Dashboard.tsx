
import React, { useEffect, useState } from "react";
import api from "../../services/api";

type ApplicationStatus =
  | "PENDING"
  | "REVIEWED"
  | "SHORTLISTED"
  | "REJECTED"
  | "ACCEPTED";

type DashboardData = {
  company: {
    id: string;
    name: string;
  };
  stats: {
    activeJobs: number;
    applications: number;
    shortlisted: number;
    accepted: number;
  };
  pipeline: {
    pending: number;
    reviewed: number;
    shortlisted: number;
    accepted: number;
    rejected: number;
  };
  recentCandidates: {
    id: string;
    name: string;
    email: string;
    role: string;
    status: ApplicationStatus;
    appliedAt: string;
  }[];
};

const statusLabels: Record<ApplicationStatus, string> = {
  PENDING: "New",
  REVIEWED: "Review",
  SHORTLISTED: "Shortlisted",
  REJECTED: "Rejected",
  ACCEPTED: "Accepted",
};

const statusClasses: Record<ApplicationStatus, string> = {
  PENDING: "bg-[#E7F0FF] text-[#3B82F6]",
  REVIEWED: "bg-[#EEEEFF] text-[#5B57D9]",
  SHORTLISTED: "bg-[#E3F7ED] text-[#16B364]",
  REJECTED: "bg-[#FEE2E2] text-[#DC2626]",
  ACCEPTED: "bg-[#FFF4DF] text-[#B77908]",
};

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const StatCard = ({
  label,
  value,
}: {
  label: string;
  value: number;
}) => (
  <div className="rounded-2xl bg-white px-5 py-5">
    <p className="text-[13px] font-normal leading-5 text-[#64748B]">
      {label}
    </p>
    <p className="mt-1 text-[27px] font-semibold leading-9 text-[#1E293B]">
      {value.toLocaleString("en-IN")}
    </p>
    <p className="mt-1.5 text-[12px] font-medium leading-5 text-[#64748B]">
      Live database count
    </p>
  </div>
);

const EmployerDashboard: React.FC = () => {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get<{
        success: boolean;
        data: DashboardData;
      }>("/jobs/employer/dashboard");

      setDashboard(response.data.data);
    } catch (err: unknown) {
      const errorWithResponse = err as {
        response?: {
          status?: number;
          data?: {
            message?: string;
          };
        };
      };

      setError(
        errorWithResponse.response?.data?.message ||
          "Unable to load dashboard. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchDashboard();
  }, []);

  const stats = dashboard
    ? [
        { label: "Active Jobs", value: dashboard.stats.activeJobs },
        { label: "Applications", value: dashboard.stats.applications },
        { label: "Shortlisted", value: dashboard.stats.shortlisted },
        { label: "Accepted", value: dashboard.stats.accepted },
      ]
    : [];

  const pipeline = dashboard
    ? [
        {
          label: "Applied",
          value: dashboard.pipeline.pending,
          color: "bg-[#3B82F6]",
        },
        {
          label: "Screening",
          value: dashboard.pipeline.reviewed,
          color: "bg-[#5B57D9]",
        },
        {
          label: "Shortlisted",
          value: dashboard.pipeline.shortlisted,
          color: "bg-[#16B364]",
        },
        {
          label: "Accepted",
          value: dashboard.pipeline.accepted,
          color: "bg-[#F5A623]",
        },
        {
          label: "Rejected",
          value: dashboard.pipeline.rejected,
          color: "bg-[#DC2626]",
        },
      ]
    : [];

  return (
    <main className="min-h-screen bg-[#F8F9FB]">
      <div className="mx-auto w-full max-w-[1280px] px-5 py-12 sm:px-6 lg:px-8">
        <section>
          <h1 className="text-[30px] font-semibold leading-9 tracking-[-0.5px] text-[#1E293B]">
            Employer Dashboard
          </h1>
          <p className="mt-2 text-[13px] font-normal leading-5 text-[#64748B]">
            Manage your hiring activity, jobs and candidates from one place.
          </p>

          {dashboard && (
            <p className="mt-2 text-sm font-medium text-[#5B57D9]">
              {dashboard.company.name}
            </p>
          )}
        </section>

        {loading && (
          <div className="mt-8 rounded-2xl bg-white p-8 text-sm text-[#64748B]">
            Loading your hiring dashboard...
          </div>
        )}

        {!loading && error && (
          <div
            role="alert"
            className="mt-8 rounded-2xl border border-red-200 bg-white p-6"
          >
            <p className="font-semibold text-red-700">
              Unable to load dashboard
            </p>
            <p className="mt-2 text-sm text-[#64748B]">{error}</p>
            <button
              type="button"
              onClick={() => void fetchDashboard()}
              className="mt-4 rounded-lg bg-[#5B57D9] px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
            >
              Try again
            </button>
          </div>
        )}

        {!loading && !error && dashboard && (
          <>
            <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
              {stats.map((stat) => (
                <StatCard
                  key={stat.label}
                  label={stat.label}
                  value={stat.value}
                />
              ))}
            </section>

            <section className="mt-[30px] grid grid-cols-1 gap-5 xl:grid-cols-[1.55fr_1fr]">
              <div className="min-h-[410px] rounded-2xl bg-white px-5 py-8 sm:px-7">
                <h2 className="text-[19px] font-semibold leading-6 text-[#1E293B]">
                  Hiring pipeline
                </h2>

                <p className="mt-1 text-xs text-[#64748B]">
                  Application status breakdown
                </p>

                <div className="mt-7 space-y-7">
                  {pipeline.map((item) => {
                    const total = dashboard.stats.applications;
                    const width =
                      total > 0 ? (item.value / total) * 100 : 0;

                    return (
                      <div
                        key={item.label}
                        className="flex items-center gap-3 sm:gap-4"
                      >
                        <div className="w-[88px] shrink-0 sm:w-[106px]">
                          <span className="text-[12px] text-[#64748B] sm:text-[13px]">
                            {item.label}
                          </span>
                        </div>

                        <div className="h-3 flex-1 overflow-hidden rounded-full bg-[#E2E5EB]">
                          <div
                            className={`h-full rounded-full ${item.color}`}
                            style={{ width: `${width}%` }}
                          />
                        </div>

                        <div className="w-10 shrink-0 text-right sm:w-[74px]">
                          <span className="text-[13px] font-semibold text-[#1E293B]">
                            {item.value}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {dashboard.stats.applications === 0 && (
                  <p className="mt-8 text-sm text-[#64748B]">
                    No applications received yet.
                  </p>
                )}
              </div>

              <div className="min-h-[410px] rounded-2xl bg-white px-5 py-8 sm:px-7">
                <h2 className="text-[19px] font-semibold leading-6 text-[#1E293B]">
                  Recent candidates
                </h2>

                <div className="mt-6 space-y-5">
                  {dashboard.recentCandidates.map((candidate) => (
                    <div
                      key={candidate.id}
                      className="flex items-start justify-between gap-3 border-b border-[#F1F5F9] pb-4 last:border-0"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[13px] font-semibold leading-5 text-[#1E293B]">
                          {candidate.name}
                        </p>
                        <p className="mt-0.5 truncate text-[11px] text-[#64748B]">
                          {candidate.role}
                        </p>
                        <p className="mt-1 truncate text-[11px] text-[#94A3B8]">
                          {candidate.email}
                        </p>
                        <p className="mt-1 text-[11px] text-[#94A3B8]">
                          Applied {formatDate(candidate.appliedAt)}
                        </p>
                      </div>

                      <span
                        className={`flex min-h-[27px] w-[100px] shrink-0 items-center justify-center rounded-full px-2 text-center text-[11px] font-medium sm:w-[120px] ${
                          statusClasses[candidate.status]
                        }`}
                      >
                        {statusLabels[candidate.status]}
                      </span>
                    </div>
                  ))}

                  {dashboard.recentCandidates.length === 0 && (
                    <p className="py-8 text-sm text-[#64748B]">
                      No candidates have applied to your jobs yet.
                    </p>
                  )}
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
};

export default EmployerDashboard;
