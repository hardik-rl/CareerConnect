import React from "react";

const stats = [
  {
    label: "Active Jobs",
    value: "12",
    change: "3 this month",
  },
  {
    label: "Applications",
    value: "486",
    change: "18.6% this month",
  },
  {
    label: "Shortlisted",
    value: "62",
    change: "9 this month",
  },
  {
    label: "Interviews",
    value: "18",
    change: "4 this month",
  },
];

const pipeline = [
  {
    label: "Applied",
    value: 486,
    width: "100%",
    color: "bg-[#3B82F6]",
  },
  {
    label: "Screening",
    value: 142,
    width: "29.2%",
    color: "bg-[#5B57D9]",
  },
  {
    label: "Shortlisted",
    value: 62,
    width: "12.8%",
    color: "bg-[#16B364]",
  },
  {
    label: "Interview",
    value: 18,
    width: "6.2%",
    color: "bg-[#F5A623]",
  },
];

const candidates = [
  {
    name: "Priya Shah",
    role: "React Developer",
    status: "New",
    statusClass: "bg-[#E7F0FF] text-[#3B82F6]",
  },
  {
    name: "Rahul Mehta",
    role: "Frontend Engineer",
    status: "Interview",
    statusClass: "bg-[#FFF4DF] text-[#F59E0B]",
  },
  {
    name: "Aarav Patel",
    role: "UI Developer",
    status: "Shortlisted",
    statusClass: "bg-[#E3F7ED] text-[#16B364]",
  },
  {
    name: "Neha Joshi",
    role: "Product Designer",
    status: "Review",
    statusClass: "bg-[#EEEEFF] text-[#5B57D9]",
  },
];

const StatCard = ({
  label,
  value,
  change,
}: {
  label: string;
  value: string;
  change: string;
}) => {
  return (
    <div className="rounded-2xl bg-white px-5 py-5">
      <p className="text-[13px] font-normal leading-5 text-[#64748B]">
        {label}
      </p>

      <p className="mt-1 text-[27px] font-semibold leading-9 text-[#1E293B]">
        {value}
      </p>

      <div className="mt-1.5 flex items-center gap-1 text-[12px] font-medium leading-5 text-[#16B364]">
        <span className="text-[14px]">↑</span>
        <span>{change}</span>
      </div>
    </div>
  );
};

const PipelineRow = ({
  label,
  value,
  width,
  color,
}: {
  label: string;
  value: number;
  width: string;
  color: string;
}) => {
  return (
    <div className="flex items-center gap-4">
      <div className="w-[106px] shrink-0">
        <span className="text-[13px] font-normal text-[#64748B]">
          {label}
        </span>
      </div>

      <div className="h-3 flex-1 overflow-hidden rounded-full bg-[#E2E5EB]">
        <div
          className={`h-full rounded-full ${color}`}
          style={{ width }}
        />
      </div>

      <div className="w-[74px] shrink-0 text-right">
        <span className="text-[13px] font-semibold text-[#1E293B]">
          {value}
        </span>
      </div>
    </div>
  );
};

const CandidateRow = ({
  name,
  role,
  status,
  statusClass,
}: {
  name: string;
  role: string;
  status: string;
  statusClass: string;
}) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="min-w-0">
        <p className="truncate text-[13px] font-semibold leading-5 text-[#1E293B]">
          {name}
        </p>

        <p className="mt-0.5 truncate text-[11px] font-normal leading-4 text-[#64748B]">
          {role}
        </p>
      </div>

      <span
        className={`flex h-[27px] w-[120px] shrink-0 items-center justify-center rounded-full text-[11px] font-medium ${statusClass}`}
      >
        {status}
      </span>
    </div>
  );
};

const EmployerDashboard: React.FC = () => {
  return (
    <main className="min-h-screen bg-[#F8F9FB]">
      <div className="mx-auto w-full max-w-[1280px] px-5 py-12 sm:px-6 lg:px-8">
        {/* Page Heading */}
        <section>
          <h1 className="text-[30px] font-semibold leading-9 tracking-[-0.5px] text-[#1E293B]">
            Employer Dashboard
          </h1>

          <p className="mt-2 text-[13px] font-normal leading-5 text-[#64748B]">
            Manage your hiring activity, jobs and candidates from one place.
          </p>
        </section>

        {/* Stats */}
        <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {stats.map((stat) => (
            <StatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              change={stat.change}
            />
          ))}
        </section>

        {/* Dashboard Bottom Section */}
        <section className="mt-[30px] grid grid-cols-1 gap-5 xl:grid-cols-[1.55fr_1fr]">
          {/* Hiring Pipeline */}
          <div className="min-h-[410px] rounded-2xl bg-white px-7 py-8">
            <h2 className="text-[19px] font-semibold leading-6 text-[#1E293B]">
              Hiring pipeline
            </h2>

            <div className="mt-7 space-y-7">
              {pipeline.map((item) => (
                <PipelineRow
                  key={item.label}
                  label={item.label}
                  value={item.value}
                  width={item.width}
                  color={item.color}
                />
              ))}
            </div>
          </div>

          {/* Recent Candidates */}
          <div className="min-h-[410px] rounded-2xl bg-white px-7 py-8">
            <h2 className="text-[19px] font-semibold leading-6 text-[#1E293B]">
              Recent candidates
            </h2>

            <div className="mt-6 space-y-5">
              {candidates.map((candidate) => (
                <CandidateRow
                  key={candidate.name}
                  name={candidate.name}
                  role={candidate.role}
                  status={candidate.status}
                  statusClass={candidate.statusClass}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default EmployerDashboard;