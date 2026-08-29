import { useState } from "react";
import { Link } from "react-router-dom";

type Company = {
  id: number;
  name: string;
  industry: string;
  description: string;
  openPositions: number;
  logoBg: string;
};

const COMPANIES: Company[] = [
  {
    id: 1,
    name: "NovaLabs",
    industry: "Technology",
    description: "Building products and teams that shape the future.",
    openPositions: 12,
    logoBg: "bg-[#eef0ff]",
  },
  {
    id: 2,
    name: "Orbit Systems",
    industry: "SaaS",
    description: "Building products and teams that shape the future.",
    openPositions: 19,
    logoBg: "bg-[#e9fbf2]",
  },
  {
    id: 3,
    name: "PixelCraft",
    industry: "Design",
    description: "Building products and teams that shape the future.",
    openPositions: 26,
    logoBg: "bg-[#fff1e9]",
  },
  {
    id: 4,
    name: "FinEdge",
    industry: "Finance",
    description: "Building products and teams that shape the future.",
    openPositions: 33,
    logoBg: "bg-[#eef0ff]",
  },
  {
    id: 5,
    name: "MedFlow",
    industry: "Healthcare",
    description: "Building products and teams that shape the future.",
    openPositions: 40,
    logoBg: "bg-[#e9fbf2]",
  },
  {
    id: 6,
    name: "CloudNest",
    industry: "Cloud",
    description: "Building products and teams that shape the future.",
    openPositions: 47,
    logoBg: "bg-[#fff1e9]",
  },
];

const CATEGORIES = [
  "Technology",
  "Finance",
  "Healthcare",
  "Design",
];

const Companies = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("");

  const filteredCompanies = COMPANIES.filter((company) => {
    const matchesSearch =
      company.name.toLowerCase().includes(search.toLowerCase()) ||
      company.industry.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      !activeCategory ||
      company.industry.toLowerCase() === activeCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-[calc(100vh-76px)] bg-[#f7f8fc]">
      <div className="mx-auto max-w-[1280px] px-6 pb-20 pt-[47px] lg:px-0">
        {/* Page Heading */}
        <div>
          <h1 className="text-[38px] font-bold leading-[1.15] tracking-[-1px] text-[#1b2434]">
            Explore top companies
          </h1>

          <p className="mt-[9px] text-[16px] leading-6 text-[#68758d]">
            Discover companies that are actively hiring talented people.
          </p>
        </div>

        {/* Search */}
        <div className="mt-[38px]">
          <label
            htmlFor="company-search"
            className="mb-[7px] block text-[12px] font-semibold text-[#68758d]"
          >
            Search companies
          </label>

          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              id="company-search"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Company name or industry"
              className="h-[47px] w-full rounded-[9px] border border-transparent bg-white px-[14px] text-[14px] text-[#1b2434] outline-none placeholder:text-[#68758d] focus:border-[#5b5ce2] sm:w-[500px]"
            />

            <button
              type="button"
              className="h-[43px] w-full rounded-[8px] bg-[#5b5ce2] px-[26px] text-[14px] font-semibold text-white transition hover:bg-[#4e4fd0] sm:w-[110px]"
            >
              Search
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="mt-[27px] flex flex-wrap gap-[21px]">
          {CATEGORIES.map((category) => {
            const isActive = activeCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() =>
                  setActiveCategory(isActive ? "" : category)
                }
                className={`h-[29px] rounded-full px-[15px] text-[12px] font-semibold transition ${
                  isActive
                    ? "bg-[#5b5ce2] text-white"
                    : "bg-[#eef0ff] text-[#5b5ce2] hover:bg-[#e4e6ff]"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Company Grid */}
        <div className="mt-[32px] grid grid-cols-1 gap-[30px] md:grid-cols-2 xl:grid-cols-3">
          {filteredCompanies.map((company) => (
            <Link
              key={company.id}
              to={`/companies/${company.id}`}
              className="group block"
            >
              <article className="h-[215px] rounded-[15px] bg-white px-[22px] py-[22px] transition duration-200 hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(30,40,70,0.07)]">
                {/* Company Header */}
                <div className="flex items-start">
                  <div
                    className={`flex h-[53px] w-[53px] shrink-0 items-center justify-center rounded-[13px] ${company.logoBg}`}
                  >
                    {/* Empty logo area matching screenshot */}
                  </div>

                  <div className="ml-[18px] pt-[5px]">
                    <h2 className="text-[18px] font-semibold leading-5 text-[#1b2434]">
                      {company.name}
                    </h2>

                    <p className="mt-[7px] text-[13px] text-[#68758d]">
                      {company.industry}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="mt-[28px] max-w-[315px] text-[14px] leading-[18px] text-[#68758d]">
                  {company.description}
                </p>

                {/* Bottom */}
                <div className="mt-[19px] flex items-center justify-between">
                  <span className="text-[13px] font-semibold text-[#5b5ce2]">
                    {company.openPositions} open positions
                  </span>

                  <span className="mr-[41px] text-[14px] font-semibold text-[#1b2434] transition group-hover:text-[#5b5ce2]">
                    View
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredCompanies.length === 0 && (
          <div className="mt-8 rounded-[15px] bg-white px-6 py-12 text-center">
            <p className="text-[15px] text-[#68758d]">
              No companies found.
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Companies;