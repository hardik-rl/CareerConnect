import React from "react";

const skills = [
  "React.js",
  "TypeScript",
  "JavaScript",
  "HTML5",
  "CSS3",
  "Tailwind CSS",
  "Bootstrap",
  "MUI",
  "Figma",
];

const profileItems = [
  "Personal information",
  "Professional summary",
  "Experience",
  "Skills",
  "Resume",
];

const JobSeekerProfile: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F7F8FA] text-[#171D2B]">

      {/* ================= MAIN ================= */}
      <main className="mx-auto px-4 pb-16 pt-8 sm:px-8 sm:pt-12 lg:pb-[84px]">

        {/* Page Heading */}
        <section className="mb-8">
          <h1 className="m-0 text-[26px] font-bold leading-[36px] tracking-[-0.4px] sm:text-[30px] sm:leading-[42px]">
            My Profile
          </h1>

          <p className="mt-1.5 text-[13px] leading-6 text-[#64708A] sm:text-[14px]">
            Build a strong profile so employers can discover you.
          </p>
        </section>

        {/* ================= PROFILE HEADER CARD ================= */}
        <section className="mb-[30px] flex min-h-[175px] flex-col justify-between gap-6 rounded-[14px] bg-white p-6 sm:p-8 md:flex-row md:items-center">

          {/* User Information */}
          <div className="flex items-center">
            {/* Avatar */}
            <div className="flex h-[68px] w-[68px] shrink-0 items-center justify-center rounded-full bg-[#F0EFFF] text-[12px] font-medium text-[#5B5BE7] sm:h-[82px] sm:w-[82px]">
              HP
            </div>

            {/* Details */}
            <div className="ml-4 sm:ml-[26px]">
              <h2 className="m-0 text-[20px] font-bold leading-[30px] sm:text-[23px]">
                Hardik Patel
              </h2>

              <p className="mb-3 mt-1 text-[12px] leading-[22px] text-[#64708A] sm:mb-[18px] sm:text-[14px]">
                Frontend Developer · Ahmedabad, India
              </p>

              {/* Open To Work */}
              <span className="inline-flex h-7 items-center justify-center rounded-full bg-[#DEF7EB] px-6 text-[11px] font-semibold text-[#0CAF63]">
                Open to work
              </span>
            </div>
          </div>

          {/* Edit Button */}
          <button
            type="button"
            className="h-[42px] w-full shrink-0 rounded-lg border-0 bg-[#111722] text-[12px] font-semibold text-white transition hover:bg-[#202735] md:w-[150px]"
          >
            Edit Profile
          </button>
        </section>

        {/* ================= BOTTOM GRID ================= */}
        <section className="grid grid-cols-1 gap-[30px] xl:grid-cols-[minmax(0,820px)_430px]">

          {/* ================= LEFT CARD ================= */}
          <div className="min-h-[460px] rounded-[14px] bg-white p-6 sm:p-8">

            {/* Professional Summary */}
            <div>
              <h3 className="m-0 text-[18px] font-semibold leading-[26px]">
                Professional Summary
              </h3>

              <p className="mt-[34px] max-w-[740px] text-[13px] leading-[18px] text-[#64708A]">
                7+ years of web development experience focused on React,
                TypeScript, responsive UI and Figma-to-code implementation.
              </p>
            </div>

            {/* Skills */}
            <div className="mt-[50px]">
              <h3 className="m-0 text-[18px] font-semibold leading-[26px]">
                Skills
              </h3>

              <div className="mt-[15px] grid grid-cols-2 gap-[15px] sm:grid-cols-3 md:grid-cols-4">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="flex h-[30px] w-full items-center justify-center rounded-[18px] bg-[#EFEFFF] px-2 text-[11px] font-medium text-[#5454E8]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Resume */}
            <div className="mt-[50px]">
              <h3 className="m-0 text-[18px] font-semibold leading-[26px]">
                Resume
              </h3>

              <div className="mt-[18px] flex flex-col gap-[13px] sm:flex-row">
                <button
                  type="button"
                  className="h-[38px] w-full rounded-[7px] border-0 bg-[#111722] text-[12px] font-semibold text-white transition hover:bg-[#202735] sm:w-[180px]"
                >
                  View Resume
                </button>

                <button
                  type="button"
                  className="h-[38px] w-full rounded-[7px] border-0 bg-[#5B57E8] text-[12px] font-semibold text-white transition hover:bg-[#4E4AD7] sm:w-[180px]"
                >
                  Download Resume
                </button>
              </div>
            </div>
          </div>

          {/* ================= RIGHT CARD ================= */}
          <aside className="min-h-[460px] rounded-[14px] bg-white p-6 sm:p-[30px]">

            <h3 className="m-0 text-[18px] font-semibold leading-[26px]">
              Profile completeness
            </h3>

            {/* Percentage */}
            <div className="mt-[17px] text-[21px] font-bold leading-[30px]">
              92% complete
            </div>

            {/* Progress */}
            <div className="mt-[15px] h-[10px] w-full overflow-hidden rounded-full bg-[#DFE3EA]">
              <div className="h-full w-[92%] rounded-full bg-[#11B96C]" />
            </div>

            {/* Checklist */}
            <div className="mt-[35px] flex flex-col gap-[27px]">
              {profileItems.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-[13px] leading-[22px] text-[#303746]"
                >
                  <span className="text-[12px]">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
};

export default JobSeekerProfile;