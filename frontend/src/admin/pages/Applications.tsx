
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, RefreshCw } from "lucide-react";
import { useHeader } from "../context/HeaderContext";
import api from "../../services/api";

type ApplicationStatus =
  | "PENDING"
  | "REVIEWED"
  | "SHORTLISTED"
  | "REJECTED"
  | "ACCEPTED";

interface Application {
  id: string;
  status: ApplicationStatus;
  createdAt: string;
  coverLetter?: string | null;
  user: {
    id: string;
    name: string;
    email: string;
  };
  job: {
    id: string;
    title: string;
    location: string;
    jobType: string;
    company: {
      id: string;
      name: string;
    };
  };
}

const STATUS_OPTIONS: {
  label: string;
  value: ApplicationStatus;
}[] = [
  { label: "Pending", value: "PENDING" },
  { label: "Reviewing", value: "REVIEWED" },
  { label: "Shortlisted", value: "SHORTLISTED" },
  { label: "Rejected", value: "REJECTED" },
  { label: "Accepted", value: "ACCEPTED" },
];

const statusLabels: Record<ApplicationStatus, string> = {
  PENDING: "Pending",
  REVIEWED: "Reviewing",
  SHORTLISTED: "Shortlisted",
  REJECTED: "Rejected",
  ACCEPTED: "Accepted",
};

const statusStyles: Record<ApplicationStatus, string> = {
  PENDING: "bg-[#fef3c7] text-[#78350f]",
  REVIEWED: "bg-[#d1fae5] text-[#065f46]",
  SHORTLISTED: "bg-[#dbeafe] text-[#0c2d6b]",
  REJECTED: "bg-[#fee2e2] text-[#7f1d1d]",
  ACCEPTED: "bg-[#dcfce7] text-[#166534]",
};

const formatDate = (value: string) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatJobType = (value: string) =>
  value
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const ApplicationsPage = () => {
  const { setHeader } = useHeader();

  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [updateError, setUpdateError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    setHeader(
      "Applications",
      "Review application activity across the platform"
    );
  }, [setHeader]);

  const fetchApplications = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/applications/admin");
      const data = response.data.data;

      if (!Array.isArray(data)) {
        throw new Error("Invalid applications response");
      }

      setApplications(data);
    } catch (err) {
      console.error("Failed to load admin applications:", err);
      setError("Unable to load applications. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchApplications();
  }, [fetchApplications]);

  const handleStatusChange = async (
    applicationId: string,
    newStatus: ApplicationStatus
  ) => {
    const currentApplication = applications.find(
      (application) => application.id === applicationId
    );

    if (!currentApplication || currentApplication.status === newStatus) {
      return;
    }

    try {
      setUpdatingId(applicationId);
      setUpdateError("");
      setSuccessMessage("");

      const response = await api.patch(
        `/applications/admin/${applicationId}/status`,
        { status: newStatus }
      );

      const updatedApplication: Application = response.data.data;

      setApplications((current) =>
        current.map((application) =>
          application.id === applicationId
            ? { ...application, ...updatedApplication }
            : application
        )
      );

      setSuccessMessage("Application status updated successfully.");
    } catch (err) {
      console.error("Failed to update application status:", err);
      setUpdateError(
        "Unable to update status. Please check your access and try again."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <main className="min-h-screen bg-[#f9fafc] px-4 py-6 sm:px-8 sm:py-8">
      {/* Page summary */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-[#1f2937]">
            All Applications
          </h2>
          <p className="mt-1 text-sm text-[#6b7280]">
            Total applications: {applications.length}
          </p>
        </div>

        <button
          type="button"
          onClick={() => void fetchApplications()}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#e5e7eb] bg-white px-4 py-2.5 text-sm font-semibold text-[#374151] transition hover:bg-[#f9fafb] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <RefreshCw
            className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
          />
          Refresh
        </button>
      </div>

      {/* Feedback messages */}
      {successMessage && (
        <div
          role="status"
          className="mb-4 rounded-lg border border-[#bbf7d0] bg-[#f0fdf4] px-4 py-3 text-sm text-[#166534]"
        >
          {successMessage}
        </div>
      )}

      {updateError && (
        <div
          role="alert"
          className="mb-4 rounded-lg border border-[#fecaca] bg-[#fef2f2] px-4 py-3 text-sm text-[#b91c1c]"
        >
          {updateError}
        </div>
      )}

      {/* Applications table */}
      <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-[#e5e7eb]">
        {loading ? (
          <div
            className="flex min-h-[240px] flex-col items-center justify-center px-6 py-12"
            role="status"
          >
            <RefreshCw className="h-7 w-7 animate-spin text-[#3b82f6]" />
            <p className="mt-3 text-sm text-[#6b7280]">
              Loading applications...
            </p>
          </div>
        ) : error ? (
          <div className="px-6 py-16 text-center">
            <p className="text-sm text-red-600">{error}</p>
            <button
              type="button"
              onClick={() => void fetchApplications()}
              className="mt-4 rounded-lg bg-[#111827] px-4 py-2 text-sm font-semibold text-white hover:bg-[#374151]"
            >
              Try Again
            </button>
          </div>
        ) : applications.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <p className="text-sm font-semibold text-[#1f2937]">
              No applications found
            </p>
            <p className="mt-2 text-sm text-[#6b7280]">
              Applications submitted by job seekers will appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] border-collapse">
              <thead>
                <tr className="border-b border-[#e5e7eb] bg-[#f9fafb]">
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#6b7280]">
                    Applicant
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#6b7280]">
                    Position
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#6b7280]">
                    Company
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#6b7280]">
                    Applied On
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#6b7280]">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#6b7280]">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {applications.map((app, index) => (
                  <tr
                    key={app.id}
                    className={`transition-colors hover:bg-[#f9fafb] ${
                      index !== applications.length - 1
                        ? "border-b border-[#e5e7eb]"
                        : ""
                    }`}
                  >
                    {/* Applicant */}
                    <td className="px-6 py-5">
                      <p className="text-sm font-semibold text-[#1f2937]">
                        {app.user?.name ?? "Unknown applicant"}
                      </p>
                      <p className="mt-1 text-xs text-[#6b7280]">
                        {app.user?.email ?? "No email available"}
                      </p>
                    </td>

                    {/* Job position */}
                    <td className="px-6 py-5">
                      <p className="text-sm font-medium text-[#374151]">
                        {app.job?.title ?? "Unknown job"}
                      </p>
                      <p className="mt-1 text-xs text-[#6b7280]">
                        {app.job?.location ?? "Location not specified"}
                      </p>
                    </td>

                    {/* Company */}
                    <td className="px-6 py-5 text-sm text-[#6b7280]">
                      {app.job?.company?.name ?? "Unknown company"}
                    </td>

                    {/* Applied date */}
                    <td className="whitespace-nowrap px-6 py-5 text-sm text-[#6b7280]">
                      {formatDate(app.createdAt)}
                    </td>

                    {/* Status badge + dropdown */}
                    <td className="px-6 py-5">
                      <div className="flex flex-col items-start gap-2">
                        <span
                          className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${
                            statusStyles[app.status]
                          }`}
                        >
                          {statusLabels[app.status]}
                        </span>

                        <label
                          className="sr-only"
                          htmlFor={`status-${app.id}`}
                        >
                          Update status for {app.user?.name ?? "applicant"}
                        </label>

                        <select
                          id={`status-${app.id}`}
                          value={app.status}
                          disabled={updatingId === app.id}
                          onChange={(event) =>
                            void handleStatusChange(
                              app.id,
                              event.target.value as ApplicationStatus
                            )
                          }
                          className="max-w-[155px] rounded-lg border border-[#d1d5db] bg-white px-2 py-1.5 text-xs text-[#374151] outline-none focus:border-[#3b82f6] focus:ring-2 focus:ring-[#dbeafe] disabled:cursor-wait disabled:opacity-60"
                        >
                          {STATUS_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>

                        {updatingId === app.id && (
                          <span className="text-xs text-[#6b7280]">
                            Updating...
                          </span>
                        )}
                      </div>
                    </td>

                    {/* View job */}
                    <td className="px-6 py-5">
                      <Link
                        to={`/jobs/${app.job?.id}`}
                        className="inline-flex items-center gap-1 text-sm font-semibold text-[#3b82f6] transition-colors hover:text-[#2563eb]"
                      >
                        View Job
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
};

export default ApplicationsPage;
