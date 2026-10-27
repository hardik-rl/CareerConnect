import { useCallback, useEffect, useState } from "react";
import {
    ArrowUp,
    BriefcaseBusiness,
    FileText,
    Users,
    RefreshCw,
    AlertCircle,
} from "lucide-react";
import { useHeader } from "../context/HeaderContext";
import api from "../../services/api";

// const API_BASE_URL = (
//   import.meta.env.VITE_API_URL || "http://localhost:5000/api"
// ).replace(/\/$/, "");

interface DashboardStats {
    totalUsers: number;
    totalJobSeekers: number;
    totalEmployers: number;
    totalCompanies: number;
    totalJobs: number;
    activeJobs: number;
    totalApplications: number;
}

interface RecentJob {
    id: string;
    title: string;
    createdAt: string;
    company?: {
        id: string;
        name: string;
    } | null;
}

interface RecentApplication {
    id: string;
    status?: string;
    createdAt: string;
    user?: {
        id: string;
        name: string;
        email?: string;
    } | null;
    job?: {
        id: string;
        title: string;
        company?: {
            id: string;
            name: string;
        } | null;
    } | null;
}

interface DashboardResponse {
    success: boolean;
    message?: string;
    data: {
        stats: DashboardStats;
        recentJobs: RecentJob[];
        recentApplications: RecentApplication[];
        applicationActivity: {
            date: string;
            count: number;
        }[];
    };
}

interface ActivityItem {
    id: string;
    title: string;
    description: string;
    createdAt: string;
}

const formatNumber = (value?: number) =>
    typeof value === "number"
        ? value.toLocaleString("en-IN")
        : "—";

const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) return "Recently";

    const diff = Math.max(0, Date.now() - date.getTime());
    const minutes = Math.floor(diff / 60000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;

    const days = Math.floor(hours / 24);
    if (days < 7) return `${days} day${days === 1 ? "" : "s"} ago`;

    return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
};

const AdminDashboard = () => {
    const { setHeader } = useHeader();

    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [recentJobs, setRecentJobs] = useState<RecentJob[]>([]);
    const [recentApplications, setRecentApplications] = useState<
        RecentApplication[]
    >([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [applicationActivity, setApplicationActivity] = useState<
        { date: string; count: number }[]
    >([]);

    useEffect(() => {
        setHeader("Overview", "Monitor your platform activity and performance");
    }, [setHeader]);

    const fetchDashboard = useCallback(async () => {
        setLoading(true);
        setError("");

        try {
            const token = localStorage.getItem("token");

            if (!token) {
                throw new Error("Authentication token missing. Please log in again.");
            }

            const response = await api.get<DashboardResponse>("/admin/dashboard", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const result = response.data;

            if (!result.success) {
                throw new Error(
                    result.message || "Unable to load admin dashboard."
                );
            }

            setStats(result.data.stats);
            setRecentJobs(result.data.recentJobs ?? []);
            setRecentApplications(result.data.recentApplications ?? []);
            setApplicationActivity(result.data.applicationActivity ?? []);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Something went wrong while loading dashboard."
            );
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        void fetchDashboard();
    }, [fetchDashboard]);

    const statCards = [
        {
            title: "Total Users",
            value: formatNumber(stats?.totalUsers),
            icon: Users,
            iconBg: "bg-[#EEF2FF]",
            iconColor: "text-[#5C5BE2]",
        },
        {
            title: "Active Jobs",
            value: formatNumber(stats?.activeJobs),
            icon: BriefcaseBusiness,
            iconBg: "bg-[#E8F8EF]",
            iconColor: "text-[#00A86B]",
        },
        {
            title: "Applications",
            value: formatNumber(stats?.totalApplications),
            icon: FileText,
            iconBg: "bg-[#FFF4E5]",
            iconColor: "text-[#E99A24]",
        },
        // {
        //     title: "Reports",
        //     value: "—",
        //     icon: AlertCircle,
        //     iconBg: "bg-[#FCEBEC]",
        //     iconColor: "text-[#D94F58]",
        // },
        {
            title: "Reports",
            value: formatNumber(
                stats
                    ? stats.totalUsers +
                    stats.totalJobs +
                    stats.totalApplications
                    : undefined
            ),
            icon: FileText,
            iconBg: "bg-[#FCEBEC]",
            iconColor: "text-[#D94F58]",
        },
    ];

    const activities: ActivityItem[] = [
        ...recentJobs.map((job) => ({
            id: `job-${job.id}`,
            title: "New job posted",
            description: `${job.title} · ${job.company?.name || "Company"}`,
            createdAt: job.createdAt,
        })),
        ...recentApplications.map((application) => ({
            id: `application-${application.id}`,
            title: "New application received",
            description: `${application.user?.name || "Job seeker"} · ${application.job?.title || "Job"
                }`,
            createdAt: application.createdAt,
        })),
    ]
        .sort(
            (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
        )
        .slice(0, 4);

    return (
        <div
            className="
        min-h-[calc(100vh-78px)]
        bg-[#F7F8FC]
        px-[32px]
        pb-[50px]
        pt-[34px]
        max-md:px-[20px]
        max-sm:px-[16px]
        max-sm:pt-[24px]
      "
        >
            {/* Welcome */}
            <section className="flex items-start justify-between gap-4">
                <div>
                    <h2
                        className="
              text-[28px]
              font-semibold
              leading-[34px]
              tracking-[-0.5px]
              text-[#182336]
              max-sm:text-[24px]
              max-sm:leading-[30px]
            "
                    >
                        Welcome back, Hardik
                    </h2>

                    <p className="mt-[5px] text-[14px] leading-[20px] text-[#71809A]">
                        Here is what is happening across CareerConnect.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => void fetchDashboard()}
                    disabled={loading}
                    aria-label="Refresh dashboard"
                    className="
            flex shrink-0 items-center gap-2 rounded-lg
            border border-[#E5E7EB] bg-white px-3 py-2
            text-sm font-medium text-[#253044]
            transition hover:bg-gray-50 disabled:opacity-50
          "
                >
                    <RefreshCw
                        size={16}
                        className={loading ? "animate-spin" : ""}
                    />
                    <span className="max-sm:hidden">Refresh</span>
                </button>
            </section>

            {/* Error */}
            {error && (
                <div
                    role="alert"
                    className="
            mt-6 flex flex-wrap items-center justify-between gap-3
            rounded-xl border border-red-200 bg-red-50 p-4
            text-sm text-red-700
          "
                >
                    <p>{error}</p>
                    <button
                        type="button"
                        onClick={() => void fetchDashboard()}
                        className="font-semibold underline"
                    >
                        Try again
                    </button>
                </div>
            )}

            {/* Statistics */}
            <section
                className="
          mt-[39px] grid grid-cols-4 gap-[30px]
          lg:grid-cols-4 md:grid-cols-2
          max-md:mt-[30px] max-md:gap-[20px]
          max-sm:grid-cols-1
        "
            >
                {statCards.map((stat) => {
                    const Icon = stat.icon;

                    return (
                        <article
                            key={stat.title}
                            className="
                min-h-[132px] rounded-[14px] bg-white
                px-[20px] py-[22px] shadow-sm
                ring-1 ring-[#EEF0F5]
                max-sm:min-h-[115px]
              "
                        >
                            <div className="flex items-center justify-between gap-2">
                                <p className="text-[13px] leading-[16px] text-[#71809A]">
                                    {stat.title}
                                </p>

                                <div
                                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${stat.iconBg}`}
                                >
                                    <Icon size={18} className={stat.iconColor} />
                                </div>
                            </div>

                            <p className="mt-[15px] text-[30px] font-semibold leading-[30px] tracking-[-0.5px] text-[#182336]">
                                {loading ? "..." : stat.value}
                            </p>

                            <p className="mt-[8px] text-[12px] leading-[15px] text-[#71809A]">
                                {stat.title === "Reports"
                                    ? "Users + jobs + applications"
                                    : "Live platform data"}
                            </p>
                        </article>
                    );
                })}
            </section>

            {/* Application Activity + Recent Activity */}
            <section
                className="
          mt-[38px] grid grid-cols-[minmax(0,1fr)_350px]
          gap-[28px]
          xl:grid-cols-[minmax(0,2.18fr)_350px]
          lg:grid-cols-[minmax(0,1fr)_330px]
          md:grid-cols-1
          max-md:mt-[24px]
        "
            >
                {/* Application Activity */}
                <article
                    className="
            min-h-[300px] rounded-[14px] bg-white
            px-[24px] py-[28px] shadow-sm ring-1 ring-[#EEF0F5]
            max-sm:px-[20px] max-sm:py-[22px]
          "
                >
                    <h3 className="text-[18px] font-semibold leading-[22px] text-[#182336]">
                        Application activity
                    </h3>

                    <div className="flex min-h-[205px] items-center justify-center pt-5">
                        {loading ? (
                            <p className="text-sm text-[#71809A]">
                                Loading dashboard data...
                            </p>
                        ) : error ? (
                            <p className="text-sm text-[#71809A]">
                                Activity data is unavailable.
                            </p>
                        ) : (
                            <div className="max-w-[360px] text-center">
                                {/* <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#EEF2FF]">
                                    <FileText size={22} className="text-[#5C5BE2]" />
                                </div>
                                <p className="mt-4 text-sm font-semibold text-[#253044]">
                                    {formatNumber(stats?.totalApplications)} total applications
                                </p>
                                <p className="mt-2 text-xs leading-5 text-[#71809A]">
                                    Historical chart data is not available from the current
                                    dashboard API. Connect a date-wise applications endpoint
                                    to display a real trend chart here.
                                </p> */}

                                <div className="mt-6">
                                    {loading ? (
                                        <div className="flex h-[205px] items-center justify-center">
                                            <p className="text-sm text-[#71809A]">
                                                Loading application activity...
                                            </p>
                                        </div>
                                    ) : error ? (
                                        <div className="flex h-[205px] items-center justify-center">
                                            <p className="text-sm text-red-500">
                                                Unable to load chart data.
                                            </p>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="flex h-[180px] w-full items-end justify-around gap-3 border-b border-[#EEF0F5] px-2 sm:gap-5">
                                                {applicationActivity.map((item) => {
                                                    const maxCount = Math.max(
                                                        ...applicationActivity.map((day) => day.count),
                                                        1
                                                    );

                                                    const barHeight =
                                                        item.count === 0
                                                            ? 3
                                                            : Math.max((item.count / maxCount) * 145, 6);

                                                    const label = new Date(
                                                        `${item.date}T12:00:00Z`
                                                    ).toLocaleDateString("en-IN", {
                                                        weekday: "short",
                                                        timeZone: "UTC",
                                                    });

                                                    return (
                                                        <div
                                                            key={item.date}
                                                            className="flex h-full min-w-0 flex-1 flex-col items-center justify-end"
                                                        >
                                                            <span className="mb-2 text-xs font-semibold text-[#253044]">
                                                                {item.count}
                                                            </span>

                                                            <div
                                                                title={`${item.date}: ${item.count} applications`}
                                                                className="w-full max-w-[38px] rounded-t-[7px] bg-[#5C5BE2] transition-all duration-300 hover:bg-[#4544C7]"
                                                                style={{ height: `${barHeight}px` }}
                                                                role="img"
                                                                aria-label={`${label}: ${item.count} applications`}
                                                            />

                                                            <span className="mt-3 text-[11px] text-[#71809A]">
                                                                {label}
                                                            </span>
                                                        </div>
                                                    );
                                                })}
                                            </div>

                                            <p className="mt-4 text-center text-xs text-[#71809A]">
                                                Daily applications · Last 7 days
                                            </p>
                                        </>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </article>

                {/* Recent Activity */}
                <article
                    className="
            min-h-[300px] rounded-[14px] bg-white
            px-[24px] py-[28px] shadow-sm ring-1 ring-[#EEF0F5]
            max-md:min-h-0
            max-sm:px-[20px] max-sm:py-[22px]
          "
                >
                    <h3 className="text-[18px] font-semibold leading-[22px] text-[#182336]">
                        Recent activity
                    </h3>

                    {loading ? (
                        <p className="mt-6 text-sm text-[#71809A]">
                            Loading recent activity...
                        </p>
                    ) : error ? (
                        <p className="mt-6 text-sm text-[#71809A]">
                            Unable to load recent activity.
                        </p>
                    ) : activities.length === 0 ? (
                        <p className="mt-6 text-sm text-[#71809A]">
                            No recent jobs or applications found.
                        </p>
                    ) : (
                        <div className="mt-[25px] space-y-[16px]">
                            {activities.map((activity) => (
                                <div
                                    key={activity.id}
                                    className="border-b border-[#F0F2F6] pb-3 last:border-b-0 last:pb-0"
                                >
                                    <p className="text-[14px] font-semibold leading-[19px] text-[#253044]">
                                        {activity.title}
                                    </p>

                                    <p className="mt-1 break-words text-[12px] leading-[17px] text-[#71809A]">
                                        {activity.description}
                                    </p>

                                    <p className="mt-1 text-[11px] leading-[15px] text-[#9CA3AF]">
                                        {formatTimeAgo(activity.createdAt)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </article>
            </section>
        </div>
    );
};

export default AdminDashboard;
