// import { useEffect } from "react";
// import { useHeader } from "../context/HeaderContext";

// const JobsPage = () => {
//   const { setHeader } = useHeader();

//   useEffect(() => {
//     setHeader("Jobs", "View and manage all job listings");
//   }, [setHeader]);

//   return (
//     <main className="bg-[#f9fafc] px-6 py-8 sm:px-8">
//       <div className="rounded-lg bg-white p-6 shadow-sm">
//         <h2 className="text-2xl font-bold text-[#1f2937]">Jobs Management</h2>
//         <p className="mt-2 text-[#6b7280]">Add content here for jobs management.</p>
//       </div>
//     </main>
//   );
// };

// export default JobsPage;


import { useEffect, useMemo, useState } from "react";
import { useHeader } from "../context/HeaderContext";

type JobStatus = "Published" | "Pending" | "Rejected";

interface Job {
    id: number;
    title: string;
    company: string;
    location: string;
    status: JobStatus;
}

const JOBS: Job[] = [
    {
        id: 1,
        title: "Senior React Developer",
        company: "NovaLabs",
        location: "Ahmedabad",
        status: "Published",
    },
    {
        id: 2,
        title: "Product Designer",
        company: "PixelCraft",
        location: "Ahmedabad",
        status: "Pending",
    },
    {
        id: 3,
        title: "Backend Engineer",
        company: "Orbit Systems",
        location: "Ahmedabad",
        status: "Published",
    },
    {
        id: 4,
        title: "QA Engineer",
        company: "CloudNest",
        location: "Ahmedabad",
        status: "Published",
    },
    {
        id: 5,
        title: "Marketing Lead",
        company: "FinEdge",
        location: "Ahmedabad",
        status: "Published",
    },
];

const FILTERS: ("All" | JobStatus)[] = [
    "All",
    "Pending",
    "Published",
    "Rejected",
];

export default function Jobs() {
    const { setHeader } = useHeader();

    const [search, setSearch] = useState("");
    const [activeFilter, setActiveFilter] = useState<
        "All" | JobStatus
    >("All");

    const filteredJobs = useMemo(() => {
        return JOBS.filter((job) => {
            const searchValue = search.toLowerCase().trim();

            const matchesSearch =
                !searchValue ||
                job.title.toLowerCase().includes(searchValue) ||
                job.company.toLowerCase().includes(searchValue) ||
                job.location.toLowerCase().includes(searchValue);

            const matchesFilter =
                activeFilter === "All" || job.status === activeFilter;

            return matchesSearch && matchesFilter;
        });
    }, [search, activeFilter]);

    const handleView = (job: Job) => {
        console.log("View job:", job);
    };

    const handleApprove = (job: Job) => {
        console.log("Approve job:", job);
    };
    useEffect(() => {
        setHeader("Jobs", "Moderate published and pending job listings");
    }, [setHeader]);

    return (
        <main className="min-h-screen bg-[#F7F8FC]">


            {/* =========================================
          CONTENT
      ========================================== */}
            <section className="px-6 pb-10 pt-[54px] sm:px-8">
                {/* Search */}
                <div className="w-full max-w-[420px]">
                    <div className="flex h-[47px] items-center rounded-[9px] bg-white px-[14px]">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search jobs"
                            className="
                w-full
                bg-transparent
                text-[14px]
                text-[#26334A]
                outline-none
                placeholder:text-[#71809A]
              "
                        />
                    </div>
                </div>

                {/* =========================================
            FILTER TABS
        ========================================== */}
                <div className="mt-[31px] flex flex-wrap items-center gap-[23px]">
                    {FILTERS.map((filter) => {
                        const active = activeFilter === filter;

                        return (
                            <button
                                key={filter}
                                type="button"
                                onClick={() => setActiveFilter(filter)}
                                className={`
                  flex
                  h-[29px]
                  min-w-[82px]
                  items-center
                  justify-center
                  rounded-full
                  px-4
                  text-[12px]
                  font-medium
                  transition
                  ${active
                                        ? "bg-[#EEF0FF] text-[#5B5CE2]"
                                        : "bg-[#EEF0FF] text-[#697791]"
                                    }
                `}
                            >
                                {filter}
                            </button>
                        );
                    })}
                </div>

                {/* =========================================
            JOB LIST
        ========================================== */}
                <div className="mt-[46px] space-y-[20px]">
                    {filteredJobs.length > 0 ? (
                        filteredJobs.map((job) => (
                            <JobCard
                                key={job.id}
                                job={job}
                                onView={() => handleView(job)}
                                onApprove={() => handleApprove(job)}
                            />
                        ))
                    ) : (
                        <div className="flex h-[150px] items-center justify-center rounded-[14px] bg-white text-sm text-[#697791]">
                            No jobs found
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}

/* =========================================
   JOB CARD
========================================= */

interface JobCardProps {
    job: Job;
    onView: () => void;
    onApprove: () => void;
}

function JobCard({
    job,
    onView,
    onApprove,
}: JobCardProps) {
    const isPending = job.status === "Pending";

    return (
        <div
            className="
        min-h-[91px]
        rounded-[14px]
        bg-white
        px-7
        py-5
        sm:px-7
        md:flex
        md:items-center
        md:justify-between
      "
        >
            {/* Job Information */}
            <div className="min-w-0">
                <h2 className="truncate text-[16px] font-semibold leading-[20px] text-[#1D293D]">
                    {job.title}
                </h2>

                <p className="mt-[9px] text-[13px] leading-[16px] text-[#66758F]">
                    {job.company}
                    <span className="mx-[5px]">•</span>
                    {job.location}
                </p>
            </div>

            {/* Desktop Actions */}
            <div
                className="
          mt-4
          flex
          items-center
          justify-between
          gap-5
          md:mt-0
          md:w-[480px]
          md:justify-between
        "
            >
                {/* Status */}
                <StatusBadge status={job.status} />

                {/* Action */}
                {isPending ? (
                    <button
                        type="button"
                        onClick={onApprove}
                        className="
              flex
              h-[43px]
              w-[150px]
              items-center
              justify-center
              rounded-[8px]
              bg-[#5B5CE2]
              text-[14px]
              font-semibold
              text-white
              transition
              hover:bg-[#5051D5]
              active:scale-[0.99]
            "
                    >
                        Approve
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={onView}
                        className="
              flex
              h-[43px]
              w-[150px]
              items-center
              justify-end
              rounded-[8px]
              text-[14px]
              font-semibold
              text-[#1D293D]
              transition
              hover:text-[#5B5CE2]
            "
                    >
                        View
                    </button>
                )}
            </div>
        </div>
    );
}

/* =========================================
   STATUS BADGE
========================================= */

function StatusBadge({
    status,
}: {
    status: JobStatus;
}) {
    let textClass = "text-[#00B96B]";

    if (status === "Pending") {
        textClass = "text-[#F59E0B]";
    }

    if (status === "Rejected") {
        textClass = "text-[#FF2B20]";
    }

    return (
        <span
            className={`
        inline-flex
        h-[29px]
        min-w-[91px]
        items-center
        justify-center
        rounded-full
        bg-[#EEF0FF]
        px-3
        text-[12px]
        font-medium
        ${textClass}
      `}
        >
            {status}
        </span>
    );
}