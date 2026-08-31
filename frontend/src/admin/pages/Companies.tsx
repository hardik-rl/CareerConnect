import { useEffect, useMemo, useState } from "react";
import { useHeader } from "../context/HeaderContext";

type CompanyStatus = "Approved" | "Pending";

interface Company {
  id: number;
  name: string;
  industry: string;
  jobs: number;
  status: CompanyStatus;
}

const COMPANIES: Company[] = [
  {
    id: 1,
    name: "NovaLabs",
    industry: "Technology",
    jobs: 12,
    status: "Approved",
  },
  {
    id: 2,
    name: "Orbit Systems",
    industry: "SaaS",
    jobs: 18,
    status: "Approved",
  },
  {
    id: 3,
    name: "PixelCraft",
    industry: "Design",
    jobs: 24,
    status: "Approved",
  },
  {
    id: 4,
    name: "FinEdge",
    industry: "Finance",
    jobs: 30,
    status: "Pending",
  },
  {
    id: 5,
    name: "CloudNest",
    industry: "Cloud",
    jobs: 36,
    status: "Approved",
  },
];

export default function Companies() {
  const [search, setSearch] = useState("");
  const { setHeader } = useHeader();

  const filteredCompanies = useMemo(() => {
    const value = search.toLowerCase().trim();

    if (!value) return COMPANIES;

    return COMPANIES.filter(
      (company) =>
        company.name.toLowerCase().includes(value) ||
        company.industry.toLowerCase().includes(value)
    );
  }, [search]);

  const handleAddCompany = () => {
    console.log("Add company clicked");
  };

  const handleActions = (company: Company) => {
    console.log("Actions:", company);
  };

  useEffect(() => {
      setHeader("Companies", "Review and manage company profiles");
    }, [setHeader]);

  return (
    <main className="min-h-screen bg-[#F7F8FC]">

      {/* ================= CONTENT ================= */}
      <section className="px-6 pb-10 pt-[54px] sm:px-8">
        {/* Search + Add Company */}
        <div className="mb-[52px] flex items-start justify-between gap-5">
          {/* Search */}
          <div className="w-full max-w-[430px]">
            <div className="flex h-[47px] items-center rounded-[9px] bg-white px-[14px]">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search companies"
                className="w-full bg-transparent text-[14px] text-[#26334A] outline-none placeholder:text-[#71809A]"
              />
            </div>
          </div>

          {/* Add Company */}
          <button
            type="button"
            onClick={handleAddCompany}
            className="flex h-[43px] w-[150px] shrink-0 items-center justify-center rounded-[8px] bg-[#5B5CE2] text-[14px] font-semibold text-white transition-colors hover:bg-[#5051D5] active:scale-[0.99]"
          >
            Add company
          </button>
        </div>

        {/* ================= COMPANY TABLE ================= */}
        <div className="overflow-hidden rounded-[16px] bg-white px-[22px] py-[18px]">
          {/* Desktop Header */}
          <div
            className="
              hidden
              grid-cols-[2.15fr_1.15fr_0.75fr_1.35fr_0.7fr]
              items-center
              border-b border-[#E1E5EC]
              px-[6px]
              pb-[15px]
              md:grid
            "
          >
            <div className="text-[12px] font-semibold text-[#687690]">
              Company
            </div>

            <div className="text-[12px] font-semibold text-[#687690]">
              Industry
            </div>

            <div className="text-[12px] font-semibold text-[#687690]">
              Jobs
            </div>

            <div className="text-[12px] font-semibold text-[#687690]">
              Status
            </div>

            <div className="text-[12px] font-semibold text-[#687690]">
              Actions
            </div>
          </div>

          {/* Company Rows */}
          {filteredCompanies.length > 0 ? (
            filteredCompanies.map((company) => (
              <div
                key={company.id}
                className="border-b border-[#E1E5EC] last:border-b-0"
              >
                {/* ================= DESKTOP ROW ================= */}
                <div
                  className="
                    hidden
                    min-h-[82px]
                    grid-cols-[2.15fr_1.15fr_0.75fr_1.35fr_0.7fr]
                    items-center
                    px-[6px]
                    md:grid
                  "
                >
                  {/* Company */}
                  <div className="flex items-center gap-[14px]">
                    {/* Logo Placeholder */}
                    <div className="h-[38px] w-[38px] shrink-0 rounded-[9px] bg-[#EEF0FF]" />

                    <span className="text-[14px] font-semibold text-[#1D293D]">
                      {company.name}
                    </span>
                  </div>

                  {/* Industry */}
                  <div className="text-[13px] text-[#66758F]">
                    {company.industry}
                  </div>

                  {/* Jobs */}
                  <div className="text-[13px] text-[#66758F]">
                    {company.jobs}
                  </div>

                  {/* Status */}
                  <div>
                    <StatusBadge status={company.status} />
                  </div>

                  {/* Actions */}
                  <div>
                    <ActionButton
                      onClick={() => handleActions(company)}
                    />
                  </div>
                </div>

                {/* ================= MOBILE ROW ================= */}
                <div className="flex items-center justify-between gap-4 px-2 py-5 md:hidden">
                  <div className="flex min-w-0 items-center gap-3">
                    {/* Logo */}
                    <div className="h-[38px] w-[38px] shrink-0 rounded-[9px] bg-[#EEF0FF]" />

                    <div className="min-w-0">
                      <p className="truncate text-[14px] font-semibold text-[#1D293D]">
                        {company.name}
                      </p>

                      <div className="mt-1 flex items-center gap-2">
                        <span className="text-[12px] text-[#66758F]">
                          {company.industry}
                        </span>

                        <span className="text-[12px] text-[#A0A8B7]">
                          •
                        </span>

                        <span className="text-[12px] text-[#66758F]">
                          {company.jobs} Jobs
                        </span>
                      </div>

                      <div className="mt-2">
                        <StatusBadge status={company.status} />
                      </div>
                    </div>
                  </div>

                  <ActionButton
                    onClick={() => handleActions(company)}
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="flex h-[150px] items-center justify-center text-sm text-[#697791]">
              No companies found
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

/* ================= STATUS ================= */

function StatusBadge({
  status,
}: {
  status: CompanyStatus;
}) {
  const approved = status === "Approved";

  return (
    <span
      className={`
        inline-flex
        min-w-[84px]
        items-center
        justify-center
        rounded-full
        px-3
        py-[6px]
        text-[12px]
        font-medium
        ${
          approved
            ? "bg-[#EEF0FF] text-[#00B96B]"
            : "bg-[#EEF0FF] text-[#F59E0B]"
        }
      `}
    >
      {status}
    </span>
  );
}

/* ================= ACTION BUTTON ================= */

function ActionButton({
  onClick,
}: {
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Company actions"
      className="
        flex
        h-8
        w-8
        items-center
        justify-center
        rounded-md
        text-[#172238]
        transition
        hover:bg-[#F4F5F8]
      "
    >
      <span className="flex items-center gap-[3px]">
        <span className="h-[5px] w-[5px] rounded-full bg-current" />
        <span className="h-[5px] w-[5px] rounded-full bg-current" />
        <span className="h-[5px] w-[5px] rounded-full bg-current" />
      </span>
    </button>
  );
}