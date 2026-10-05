interface TimelineItem {
  stage: string;
  date: string;
}

const skillsList = [
  "React",
  "TypeScript",
  "JavaScript",
  "Next.js",
  "HTML/CSS",
  "Figma",
];

const timelineData: TimelineItem[] = [
  { stage: "Applied", date: "Sep 24" },
  { stage: "Shortlisted", date: "Sep 25" },
  { stage: "Interview", date: "Oct 02" },
];

const EmployerProfile = () => {
  return (
    <main className="min-h-screen bg-[#F8F9FB] text-[#1E293B]">
      <div className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6 lg:px-8">
        
        {/* Page Title / Heading Section */}
        <section className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-[#0F172A]">
            Candidate Profile
          </h1>
          <p className="mt-1.5 text-sm text-[#64748B]">
            Review candidate profile, resume and hiring history.
          </p>
        </section>

        {/* Candidate Profile Header Card */}
        <section className="mb-6 rounded-2xl bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-5">
              {/* Avatar Placeholder */}
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#EEF2FF] text-lg font-semibold text-[#4F46E5]">
                PS
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-[#0F172A]">Priya Shah</h2>
                <p className="mt-1 text-sm font-normal text-[#64748B]">
                  Senior React Developer &bull; Applied Sep 24
                </p>
                <div className="mt-3">
                  <span className="inline-block rounded-full bg-[#FEF3C7] px-3 py-1 text-xs font-semibold text-[#D97706]">
                    Interview
                  </span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="shrink-0">
              <button
                type="button"
                className="w-full rounded-xl bg-[#5B57D9] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#4C48C2] focus:outline-none focus:ring-2 focus:ring-[#5B57D9] focus:ring-offset-2 sm:w-auto"
              >
                Schedule Interview
              </button>
            </div>
          </div>
        </section>

        {/* Main Grid Content */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr]">
          
          {/* Left Column - Details */}
          <div className="space-y-6">
            <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
              {/* Professional Summary */}
              <section className="mb-8">
                <h3 className="text-lg font-bold text-[#0F172A]">
                  Professional Summary
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-[#475569]">
                  Frontend developer with strong React and TypeScript experience,
                  focused on accessible and scalable UI.
                </p>
              </section>

              {/* Skills */}
              <section className="mb-8">
                <h3 className="text-lg font-bold text-[#0F172A]">Skills</h3>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {skillsList.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-xl bg-[#F1F5F9] px-4 py-2 text-xs font-medium text-[#475569]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>

              {/* Application Timeline */}
              <section>
                <h3 className="mb-4 text-lg font-bold text-[#0F172A]">
                  Application timeline
                </h3>
                <div className="divide-y divide-slate-100">
                  {timelineData.map((item) => (
                    <div
                      key={item.stage}
                      className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0"
                    >
                      <span className="text-sm font-semibold text-[#0F172A]">
                        {item.stage}
                      </span>
                      <span className="text-xs font-medium text-[#64748B]">
                        {item.date}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>

          {/* Right Column - Actions & Hiring Notes */}
          <div className="space-y-6">
            <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
              <h3 className="text-lg font-bold text-[#0F172A]">Hiring Notes</h3>
              
              {/* Notes Container */}
              <div className="mt-4 rounded-xl bg-[#F8FAFC] p-4 text-xs leading-relaxed text-[#475569]">
                <ul className="space-y-1.5 list-disc list-inside">
                  <li>Strong communication</li>
                  <li>Good React fundamentals</li>
                  <li>Ask about accessibility projects</li>
                  <li>Discuss notice period</li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-col gap-3">
                <button
                  type="button"
                  className="w-full rounded-xl bg-[#0F172A] py-3 text-sm font-medium text-white transition hover:bg-[#1E293B]"
                >
                  Download Resume
                </button>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    className="w-full rounded-xl bg-[#10B981] py-3 text-sm font-medium text-white transition hover:bg-[#059669]"
                  >
                    Shortlist
                  </button>
                  <button
                    type="button"
                    className="w-full rounded-xl bg-[#EF4444] py-3 text-sm font-medium text-white transition hover:bg-[#DC2626]"
                  >
                    Reject
                  </button>
                </div>

                <button
                  type="button"
                  className="w-full rounded-xl bg-[#5B57D9] py-3 text-sm font-medium text-white transition hover:bg-[#4C48C2]"
                >
                  Move to Interview
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
};

export default EmployerProfile;