import { Link } from "react-router-dom";

const JobDetails = () => {
  return (
    <div className="min-h-screen bg-[#f8f9fb] text-[#151b2b]">
      <main className="mx-auto max-w-[1260px] px-6 pb-20 pt-10 lg:px-0">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-[13px] font-normal text-[#687386]">
          <Link to="/jobs" className="hover:text-[#2f55ed]">
            Jobs
          </Link>

          <span>/</span>

          <span>Engineering</span>

          <span>/</span>

          <span className="text-[#687386]">
            Senior Frontend Engineer
          </span>
        </div>

        {/* Job Header Card */}
        <section className="relative min-h-[228px] rounded-[18px] border border-[#dce2eb] bg-white px-7 py-8 md:px-7 lg:px-7">
          <div className="flex flex-col gap-7 md:flex-row md:items-start">
            {/* Company Logo */}
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[17px] bg-[#edf2ff]">
              <span className="text-[28px] font-semibold text-[#2f55ed]">
                N
              </span>
            </div>

            {/* Job Information */}
            <div className="min-w-0">
              <h1 className="text-[30px] font-bold leading-[1.2] tracking-[-0.7px] text-[#151b2b]">
                Senior Frontend Engineer
              </h1>

              <p className="mt-3 text-[16px] leading-6 text-[#687386]">
                Nova Labs <span className="mx-1">•</span> Remote{" "}
                <span className="mx-1">•</span> Full-time
              </p>

              {/* Salary */}
              <div className="mt-7 inline-flex h-[27px] items-center rounded-full bg-[#e6f8ef] px-3">
                <span className="text-[12px] font-semibold text-[#18a76a]">
                  ₹18–28 LPA
                </span>
              </div>
            </div>
          </div>

          {/* Apply Button */}
          <button
            type="button"
            className="absolute right-7 top-[76px] h-[43px] w-[164px] rounded-[10px] bg-[#2f55ed] text-[13px] font-semibold text-white transition hover:bg-[#2448d5]"
          >
            Apply now
          </button>
        </section>

        {/* Main Content */}
        <div className="mt-9 grid grid-cols-1 gap-7 lg:grid-cols-[1fr_347px]">
          {/* Left Column */}
          <section className="min-h-[638px] rounded-[18px] border border-[#dce2eb] bg-white px-8 py-9">
            <h2 className="text-[21px] font-bold tracking-[-0.3px] text-[#151b2b]">
              About the role
            </h2>

            <div className="mt-6 text-[15px] leading-[1.25] text-[#687386]">
              <p>
                We are looking for a thoughtful frontend engineer who enjoys
                building fast, accessible and polished experiences. You will
                collaborate closely with product, design and backend teams.
              </p>

              <p className="mt-5">What you will do</p>

              <ul className="space-y-0">
                <li>• Build reusable React and Next.js interfaces</li>
                <li>• Improve performance and accessibility</li>
                <li>• Partner with designers to deliver pixel-perfect UI</li>
                <li>• Review code and contribute to engineering standards</li>
              </ul>
            </div>
          </section>

          {/* Right Column */}
          <aside className="flex flex-col gap-7">
            {/* About Company */}
            <section className="min-h-[328px] rounded-[18px] border border-[#dce2eb] bg-white px-7 py-8">
              <h2 className="text-[20px] font-bold tracking-[-0.3px] text-[#151b2b]">
                About Nova Labs
              </h2>

              <p className="mt-6 text-[14px] leading-[1.25] text-[#687386]">
                A product-focused technology company
                <br />
                building tools used by teams across the world.
              </p>

              <div className="mt-[77px] text-[13px] font-semibold leading-[1.2] text-[#151b2b]">
                <p>120–250 employees</p>
                <p>Technology</p>
                <p>Founded in 2018</p>
              </div>

              <button
                type="button"
                className="mt-[77px] h-[43px] w-full rounded-[10px] border border-[#dce2eb] bg-white text-[13px] font-semibold text-[#151b2b] transition hover:bg-[#f8f9fb]"
              >
                View company
              </button>
            </section>

            {/* Job Overview */}
            <section className="min-h-[247px] rounded-[18px] border border-[#dce2eb] bg-white px-7 py-8">
              <h2 className="text-[20px] font-bold tracking-[-0.3px] text-[#151b2b]">
                Job overview
              </h2>

              <div className="mt-8 grid grid-cols-[82px_1fr] gap-y-1 text-[14px] leading-[1.15]">
                <span className="text-[#687386]">Experience</span>
                <span className="text-[#687386]">4–7 years</span>

                <span className="text-[#687386]">Job type</span>
                <span className="text-[#687386]">Full-time</span>

                <span className="text-[#687386]">Location</span>
                <span className="text-[#687386]">Remote • India</span>

                <span className="text-[#687386]">Posted</span>
                <span className="text-[#687386]">2 days ago</span>
              </div>
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default JobDetails;