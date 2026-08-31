import { useEffect } from "react";
import { useHeader } from "../context/HeaderContext";
import { ExternalLink } from "lucide-react";

interface Application {
  id: number;
  name: string;
  position: string;
  company: string;
  status: "Reviewing" | "Shortlisted" | "Rejected" | "Pending";
}

const APPLICATIONS: Application[] = [
  {
    id: 1,
    name: "Aarav Shah",
    position: "Senior Frontend Engineer",
    company: "NovaLabs",
    status: "Reviewing",
  },
  {
    id: 2,
    name: "Neha Patel",
    position: "Product Designer",
    company: "PixelCraft",
    status: "Shortlisted",
  },
  {
    id: 3,
    name: "Rohan Mehta",
    position: "Backend Engineer",
    company: "Orbit Systems",
    status: "Rejected",
  },
  {
    id: 4,
    name: "Priya Singh",
    position: "QA Engineer",
    company: "CloudNest",
    status: "Pending",
  },
];

const statusStyles = {
  Reviewing: "bg-[#d1fae5] text-[#065f46]",
  Shortlisted: "bg-[#dbeafe] text-[#0c2d6b]",
  Rejected: "bg-[#fee2e2] text-[#7f1d1d]",
  Pending: "bg-[#fef3c7] text-[#78350f]",
};

const ApplicationsPage = () => {
  const { setHeader } = useHeader();

  useEffect(() => {
    setHeader("Applications", "Review application activity across the platform");
  }, [setHeader]);

  return (
    <main className="bg-[#f9fafc] px-6 py-8 sm:px-8 min-h-screen">
      {/* Applications Table */}
      <div className="rounded-xl bg-white shadow-sm ring-1 ring-[#e5e7eb] overflow-hidden">
        {/* Table Wrapper */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            {/* Table Header */}
            <thead>
              <tr className="border-b border-[#e5e7eb] bg-[#f9fafb]">
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#6b7280] uppercase tracking-wide">
                  Applicant Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#6b7280] uppercase tracking-wide">
                  Position
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#6b7280] uppercase tracking-wide">
                  Company
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#6b7280] uppercase tracking-wide">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#6b7280] uppercase tracking-wide">
                  Action
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {APPLICATIONS.map((app, index) => (
                <tr
                  key={app.id}
                  className={`${
                    index !== APPLICATIONS.length - 1 ? "border-b border-[#e5e7eb]" : ""
                  } hover:bg-[#f9fafb] transition-colors`}
                >
                  {/* Applicant Name */}
                  <td className="px-6 py-5 text-sm font-semibold text-[#1f2937]">
                    {app.name}
                  </td>

                  {/* Position */}
                  <td className="px-6 py-5 text-sm text-[#6b7280]">
                    {app.position}
                  </td>

                  {/* Company */}
                  <td className="px-6 py-5 text-sm text-[#6b7280]">
                    {app.company}
                  </td>

                  {/* Status Badge */}
                  <td className="px-6 py-5">
                    <span
                      className={`inline-block px-3 py-1.5 text-xs font-semibold rounded-full ${
                        statusStyles[app.status]
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>

                  {/* View Button */}
                  <td className="px-6 py-5">
                    <button
                      className="inline-flex items-center gap-1 text-sm font-semibold text-[#3b82f6] hover:text-[#2563eb] transition-colors"
                    >
                      View
                      <ExternalLink className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default ApplicationsPage;


