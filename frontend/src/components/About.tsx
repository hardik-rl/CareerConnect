import React from "react";

type Stat = {
  id: number;
  number: string;
  label: string;
  subtext: string;
};

const STATS: Stat[] = [
  {
    id: 1,
    number: "10k+",
    label: "Active jobs",
    subtext: "Growing every month",
  },
  {
    id: 2,
    number: "2k+",
    label: "Companies",
    subtext: "Growing every month",
  },
  {
    id: 3,
    number: "50k+",
    label: "Candidates",
    subtext: "Growing every month",
  },
];

const AboutPage: React.FC = () => {
  return (
    <main className="min-h-[calc(100vh-76px)] bg-[#f7f8fc] px-4 py-10 sm:px-6 md:py-16 lg:px-0">
      <div className="mx-auto max-w-[1280px]">
        {/* Page Title & Subtitle */}
        <section className="text-center sm:text-left">
          <h1 className="text-[36px] font-bold leading-tight tracking-[-0.8px] text-[#1b2434] md:text-[44px]">
            Build your career with confidence.
          </h1>
          <p className="mt-[12px] max-w-[720px] text-[16px] leading-[26px] text-[#68758d] md:text-[18px]">
            CareerConnect helps talented people discover meaningful work and helps ambitious companies build exceptional teams.
          </p>
        </section>

        {/* Hero Banner / Mission Card */}
        <section className="mt-[40px] rounded-[20px] bg-[#eef0ff] p-[32px] md:p-[48px]">
          <div className="max-w-[640px]">
            <h2 className="text-[22px] font-bold tracking-[-0.3px] text-[#1b2434] md:text-[26px]">
              Our mission
            </h2>
            <p className="mt-[12px] text-[15px] leading-[26px] text-[#68758d] md:text-[17px]">
              Make career opportunities easier to discover, understand and pursue.
            </p>
          </div>
        </section>

        {/* Key Statistics Grid */}
        <section className="mt-[32px]">
          <div className="grid grid-cols-1 gap-[24px] sm:grid-cols-2 lg:grid-cols-3">
            {STATS.map((stat) => (
              <div
                key={stat.id}
                className="rounded-[16px] bg-white p-[28px] shadow-sm transition-shadow duration-200 hover:shadow-md"
              >
                <div className="text-[32px] font-bold tracking-[-0.5px] text-[#1b2434] md:text-[36px]">
                  {stat.number}
                </div>
                <div className="mt-[4px] text-[16px] font-semibold text-[#1b2434]">
                  {stat.label}
                </div>
                <div className="mt-[6px] text-[13px] text-[#68758d]">
                  {stat.subtext}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default AboutPage;