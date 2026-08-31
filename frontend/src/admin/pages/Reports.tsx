import { useEffect } from "react";
import { useHeader } from "../context/HeaderContext";
import { ChevronRight } from "lucide-react";

interface Report {
  id: number;
  title: string;
  description: string;
  reportedBy: string;
  status: "Open" | "In Review" | "Resolved";
}

const REPORTS: Report[] = [
  {
    id: 1,
    title: "Spam employer account",
    description: "Reported by a platform user • Awaiting administrator action",
    reportedBy: "User Report",
    status: "Open",
  },
  {
    id: 2,
    title: "Inappropriate company content",
    description: "Reported by a platform user • Awaiting administrator action",
    reportedBy: "Content Report",
    status: "Open",
  },
  {
    id: 3,
    title: "Duplicate job listing",
    description: "Reported by a platform user • Awaiting administrator action",
    reportedBy: "Listing Report",
    status: "Open",
  },
];

const statusStyles = {
  Open: "bg-[#fee2e2] text-[#dc2626]",
  "In Review": "bg-[#fef3c7] text-[#d97706]",
  Resolved: "bg-[#d1fae5] text-[#059669]",
};

const ReportsPage = () => {
  const { setHeader } = useHeader();

  useEffect(() => {
    setHeader("Reports", "Review content and user reports");
  }, [setHeader]);

  const handleReviewReport = (report: Report) => {
    console.log("Review report:", report);
  };

  return (
    <main className="bg-[#f9fafc] px-6 py-8 sm:px-8 min-h-screen">
      {/* Reports List */}
      <div className="space-y-4 max-w-4xl">
        {REPORTS.map((report) => (
          <div
            key={report.id}
            className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-[#e5e7eb] hover:shadow-md transition-shadow"
          >
            {/* Report Content */}
            <div className="flex items-start justify-between gap-4">
              {/* Left Section */}
              <div className="flex-1 min-w-0">
                {/* Status Badge */}
                <div className="mb-3 inline-block">
                  <span
                    className={`inline-block px-3 py-1 text-xs font-bold rounded ${
                      statusStyles[report.status]
                    }`}
                  >
                    {report.status}
                  </span>
                </div>

                {/* Report Title */}
                <h3 className="text-lg font-bold text-[#1f2937] mb-2">
                  {report.title}
                </h3>

                {/* Report Description */}
                <p className="text-sm text-[#6b7280] leading-relaxed">
                  {report.description}
                </p>
              </div>

              {/* Right Section - Review Button */}
              <div className="flex-shrink-0">
                <button
                  onClick={() => handleReviewReport(report)}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[#1f2937] hover:text-[#111827] hover:bg-[#f3f4f6] rounded-lg transition-colors whitespace-nowrap"
                >
                  Review report
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default ReportsPage;
