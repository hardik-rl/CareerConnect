import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

type Job = {
  id: number;
  title: string;
  type: string;
  location: string;
  postedAgo: string;
  package?: string;
};

type Company = {
  id: number;
  name: string;
  industry: string;
  location: string;
  employeeCount: string;
  websiteUrl: string;
  aboutText: string;
  jobs: Job[];
};

const COMPANY_DATA: Company = {
  id: 1,
  name: "NovaLabs",
  industry: "Technology",
  location: "Ahmedabad, India",
  employeeCount: "201-500 employees",
  websiteUrl: "https://example.com",
  aboutText:
    "NovaLabs builds modern software products used by growing teams around the world.",
  jobs: [
    {
      id: 1,
      title: "Senior Frontend Engineer",
      type: "Full-time",
      location: "Ahmedabad",
      postedAgo: "2 days ago",
      package: "₹12,00,000 - ₹18,00,000",
    },
    {
      id: 2,
      title: "Product Designer",
      type: "Full-time",
      location: "Remote",
      postedAgo: "2 days ago",
      package: "₹10,00,000 - ₹15,00,000",
    },
    {
      id: 3,
      title: "Product Manager",
      type: "Full-time",
      location: "Ahmedabad",
      postedAgo: "2 days ago",
    package: "₹15,00,000 - ₹20,00,000",
    },
  ],
};

const CompanyDetails: React.FC = () => {
  useParams<{ id: string }>();
  const [company] = useState<Company>(COMPANY_DATA);

  return (
    <main className="min-h-[calc(100vh-76px)] bg-[#f7f8fc] px-4 py-8 md:py-12 lg:px-0">
      <div className="mx-auto max-w-[1280px]">
        {/* Top Company Card */}
        <section className="flex rounded-[15px] bg-white px-12 pb-[34px] pt-[38px]  shadow-sm">
          {/* Logo Container */}
          <div className="flex h-[72px] w-[72px] items-center justify-center rounded-[16px] bg-[#eef0ff]">
            {/* Replace with <img> tag when actual logo URL is available */}
            <span className="text-[26px] font-bold text-[#5b5ce2]">
              {company.name.charAt(0)}
            </span>
          </div>

          {/* Company Title */}
         <div className="ml-[24px]">
             <h1 className="text-[28px] font-bold leading-tight tracking-[-0.5px] text-[#1b2434]">
            {company.name}
          </h1>

          {/* Subtitle / Meta */}
          <p className="mt-[8px] mb-9 text-[15px] font-normal leading-normal text-[#68758d]">
            {company.industry} • {company.location} • {company.employeeCount}
          </p>

          {/* Website Link */}
          <a
            href={company.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-[22px] text-[14px] font-semibold text-[#1b2434] transition hover:text-[#5b5ce2]"
          >
            Visit website
          </a>
         </div>
        </section>

        {/* About Section */}
        <section className="mt-12 mb-16">
          <h2 className="text-[20px] font-bold tracking-[-0.3px] text-[#1b2434]">
            About {company.name}
          </h2>
          <p className="mt-[12px] max-w-[1000px] text-[15px] leading-[24px] text-[#68758d]">
            {company.aboutText}
          </p>
        </section>

        {/* Open Positions Section */}
        <section className="mt-[36px]">
          <h2 className="text-[22px] font-bold tracking-[-0.4px] text-[#1b2434]">
            Open positions
          </h2>

          <div className="mt-[20px] grid grid-cols-1 gap-[24px] md:grid-cols-3">
            {company.jobs.map((job) => (
              <Link
                key={job.id}
                to={`/jobs/${job.id}`}
                className="group block rounded-[15px] bg-white p-[24px] transition duration-200 hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(30,40,70,0.07)]"
              >
                <h3 className="text-[17px] font-bold leading-snug text-[#1b2434] transition group-hover:text-[#5b5ce2]">
                  {job.title}
                </h3>
                <p className="mt-[4px] text-[13px] text-[#68758d]">
                  {company.name}
                </p>

                {/* Job Type Pill */}
                <div className="mt-[16px]">
                  <span className="inline-block rounded-[6px] bg-[#eef0ff] px-[12px] py-[5px] text-[12px] font-semibold text-[#5b5ce2]">
                    {job.type}
                  </span>
                </div>

                {/* Location & Time */}
                <p className="mt-[18px] text-[13px] text-[#68758d]">
                  {job.location} • {job.postedAgo}
                </p>

                <p className="mt-[6px] text-[13px] font-bold">
                  {job.package}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default CompanyDetails;