import { useCallback, useEffect, useMemo, useState } from "react";
import { useHeader } from "../context/HeaderContext";
import api from "../../services/api";

interface Company {
  id: string;
  name: string;
  description?: string | null;
  website?: string | null;
  location?: string | null;
  createdAt: string;
  userId: string;
  _count?: {
    jobs: number;
  };
}

interface CompaniesResponse {
  success: boolean;
  message?: string;
  count?: number;
  data: Company[];
}

const formatDate = (value: string) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export default function Companies() {
  const { setHeader } = useHeader();

  const [companies, setCompanies] = useState<Company[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCompany, setSelectedCompany] = useState<string | null>(
    null
  );
  const [notice, setNotice] = useState("");

  useEffect(() => {
    setHeader("Companies", "Review and manage company profiles");
  }, [setHeader]);

  const fetchCompanies = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Please log in again to manage companies.");
      }

      const response = await api.get<CompaniesResponse>("/admin/companies", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const result = response.data;

      if (!result.success) {
        throw new Error(
          result.message || "Unable to fetch companies."
        );
      }

      setCompanies(Array.isArray(result.data) ? result.data : []);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while loading companies."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchCompanies();
  }, [fetchCompanies]);

  const filteredCompanies = useMemo(() => {
    const value = search.toLowerCase().trim();

    if (!value) return companies;

    return companies.filter((company) => {
      return (
        company.name.toLowerCase().includes(value) ||
        (company.location ?? "").toLowerCase().includes(value) ||
        (company.description ?? "").toLowerCase().includes(value) ||
        (company.website ?? "").toLowerCase().includes(value)
      );
    });
  }, [companies, search]);

  const handleAddCompany = () => {
    setNotice(
      "Company creation form and API are not connected yet."
    );
  };

  return (
    <main className="min-h-screen bg-[#F7F8FC]">
      <section className="px-6 pb-10 pt-[54px] sm:px-8">
        {/* Search + Add Company */}
        <div className="mb-8 flex items-start justify-between gap-5">
          <div className="w-full max-w-[430px]">
            <div className="flex h-[47px] items-center rounded-[9px] bg-white px-[14px] ring-1 ring-[#E5E8EF]">
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search companies by name or location"
                aria-label="Search companies"
                className="w-full bg-transparent text-[14px] text-[#26334A] outline-none placeholder:text-[#71809A]"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddCompany}
            className="flex h-[43px] w-[150px] shrink-0 items-center justify-center rounded-[8px] bg-[#5B5CE2] text-[14px] font-semibold text-white transition-colors hover:bg-[#5051D5] active:scale-[0.99] max-sm:w-auto max-sm:px-3"
          >
            Add company
          </button>
        </div>

        {notice && (
          <div
            role="status"
            className="mb-5 flex items-center justify-between gap-3 rounded-lg border border-[#DDE0FF] bg-[#F0F1FF] px-4 py-3 text-sm text-[#4545B8]"
          >
            <span>{notice}</span>
            <button
              type="button"
              onClick={() => setNotice("")}
              aria-label="Dismiss message"
              className="font-semibold"
            >
              ✕
            </button>
          </div>
        )}

        {/* Table controls */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-[#697791]">
            {loading
              ? "Loading companies..."
              : `${filteredCompanies.length} of ${companies.length} companies`}
          </p>

          <button
            type="button"
            onClick={() => void fetchCompanies()}
            disabled={loading}
            className="rounded-lg px-3 py-2 text-sm font-semibold text-[#5B5CE2] transition hover:bg-[#EEF0FF] disabled:opacity-50"
          >
            {loading ? "Loading..." : "Refresh"}
          </button>
        </div>

        {error && (
          <div
            role="alert"
            className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
          >
            <span>{error}</span>
            <button
              type="button"
              onClick={() => void fetchCompanies()}
              className="font-semibold underline"
            >
              Try again
            </button>
          </div>
        )}

        {/* Company Table */}
        <div className="overflow-visible rounded-[16px] bg-white px-[22px] py-[18px] shadow-sm ring-1 ring-[#EEF0F5]">
          <div className="hidden grid-cols-[2fr_1.3fr_0.7fr_1.2fr_0.6fr] items-center border-b border-[#E1E5EC] px-[6px] pb-[15px] md:grid">
            <div className="text-[12px] font-semibold text-[#687690]">
              Company
            </div>
            <div className="text-[12px] font-semibold text-[#687690]">
              Location
            </div>
            <div className="text-[12px] font-semibold text-[#687690]">
              Jobs
            </div>
            <div className="text-[12px] font-semibold text-[#687690]">
              Joined
            </div>
            <div className="text-[12px] font-semibold text-[#687690]">
              Actions
            </div>
          </div>

          {loading ? (
            <div className="flex h-[150px] items-center justify-center text-sm text-[#697791]">
              Loading companies...
            </div>
          ) : !error && filteredCompanies.length > 0 ? (
            filteredCompanies.map((company) => (
              <div
                key={company.id}
                className="relative border-b border-[#E1E5EC] last:border-b-0"
              >
                {/* Desktop Row */}
                <div className="hidden min-h-[82px] grid-cols-[2fr_1.3fr_0.7fr_1.2fr_0.6fr] items-center px-[6px] md:grid">
                  <div className="flex min-w-0 items-center gap-[14px] pr-3">
                    <CompanyLogo name={company.name} />

                    <div className="min-w-0">
                      <p className="truncate text-[14px] font-semibold text-[#1D293D]">
                        {company.name}
                      </p>
                      {company.website && (
                        <p className="mt-1 truncate text-[11px] text-[#71809A]">
                          {company.website}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="truncate pr-2 text-[13px] text-[#66758F]">
                    {company.location || "Not specified"}
                  </div>

                  <div className="text-[13px] text-[#66758F]">
                    {company._count?.jobs ?? "—"}
                  </div>

                  <div className="text-[13px] text-[#66758F]">
                    {formatDate(company.createdAt)}
                  </div>

                  <div className="relative">
                    <ActionButton
                      company={company}
                      selected={selectedCompany === company.id}
                      onClick={() =>
                        setSelectedCompany((current) =>
                          current === company.id ? null : company.id
                        )
                      }
                    />
                  </div>
                </div>

                {/* Mobile Row */}
                <div className="flex items-center justify-between gap-4 px-2 py-5 md:hidden">
                  <div className="flex min-w-0 items-center gap-3">
                    <CompanyLogo name={company.name} />

                    <div className="min-w-0">
                      <p className="truncate text-[14px] font-semibold text-[#1D293D]">
                        {company.name}
                      </p>

                      <p className="mt-1 text-[12px] text-[#66758F]">
                        {company.location || "Location not specified"}
                      </p>

                      <p className="mt-1 text-[12px] text-[#66758F]">
                        {company._count?.jobs ?? "—"} jobs · Joined{" "}
                        {formatDate(company.createdAt)}
                      </p>
                    </div>
                  </div>

                  <div className="relative">
                    <ActionButton
                      company={company}
                      selected={selectedCompany === company.id}
                      onClick={() =>
                        setSelectedCompany((current) =>
                          current === company.id ? null : company.id
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex h-[150px] items-center justify-center text-sm text-[#697791]">
              {error ? "Companies could not be loaded." : "No companies found"}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function CompanyLogo({ name }: { name: string }) {
  return (
    <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[9px] bg-[#EEF0FF] text-sm font-bold text-[#5B5CE2]">
      {name.trim().charAt(0).toUpperCase() || "C"}
    </div>
  );
}

function ActionButton({
  company,
  selected,
  onClick,
}: {
  company: Company;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <div className="relative">
      <button
        type="button"
        onClick={onClick}
        aria-label={`Actions for ${company.name}`}
        aria-expanded={selected}
        className="flex h-8 w-8 items-center justify-center rounded-md text-[#172238] transition hover:bg-[#F4F5F8]"
      >
        <span className="flex items-center gap-[3px]">
          <span className="h-[5px] w-[5px] rounded-full bg-current" />
          <span className="h-[5px] w-[5px] rounded-full bg-current" />
          <span className="h-[5px] w-[5px] rounded-full bg-current" />
        </span>
      </button>

      {selected && (
        <div className="absolute right-0 top-9 z-30 w-[230px] rounded-xl bg-white p-4 shadow-[0_10px_35px_rgba(20,30,50,0.12)] ring-1 ring-[#E5E8EF]">
          <p className="break-words text-sm font-semibold text-[#1D293D]">
            {company.name}
          </p>

          <p className="mt-2 text-xs text-[#66758F]">
            Location: {company.location || "Not specified"}
          </p>

          <p className="mt-1 text-xs text-[#66758F]">
            Jobs: {company._count?.jobs ?? "—"}
          </p>

          <p className="mt-1 text-xs text-[#66758F]">
            Created: {formatDate(company.createdAt)}
          </p>

          {company.website && (
            <a
              href={
                company.website.startsWith("http")
                  ? company.website
                  : `https://${company.website}`
              }
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block break-all text-xs font-semibold text-[#5B5CE2] hover:underline"
            >
              Visit website
            </a>
          )}
        </div>
      )}
    </div>
  );
}
