
import { useCallback, useEffect, useState, type FormEvent, type ReactNode } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Download,
  ExternalLink,
  FileText,
  // Github,
  // Linkedin,
  LoaderCircle,
  Mail,
  MapPin,
  RefreshCw,
  UserRound,
  XCircle,
  type LucideIcon,
} from "lucide-react";
import api from "../../services/api";

// Adjust this import if your existing API client has a different path.

/* ----------------------------------
   Types
---------------------------------- */

type ApplicationStatus =
  | "PENDING"
  | "REVIEWED"
  | "REVIEWING"
  | "SHORTLISTED"
  | "REJECTED"
  | "ACCEPTED"
  | "HIRED";

interface CandidateProfile {
  headline?: string | null;
  bio?: string | null;
  location?: string | null;
  experience?: number | null;
  skills?: string[] | null;
  resumeUrl?: string | null;
  linkedinUrl?: string | null;
  githubUrl?: string | null;
}

interface Candidate {
  id?: string;
  name?: string | null;
  email?: string | null;
  profile?: CandidateProfile | null;
  jobSeekerProfile?: CandidateProfile | null;
  location?: string | null;
  resumeUrl?: string | null;
  linkedinUrl?: string | null;
  githubUrl?: string | null;
}

interface Company {
  id?: string;
  name?: string | null;
}

interface Job {
  id?: string;
  title?: string | null;
  description?: string | null;
  location?: string | null;
  jobType?: string | null;
  company?: Company | null;
}

interface Application {
  id: string;
  status: ApplicationStatus | string;
  coverLetter?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  user?: Candidate | null;
  candidate?: Candidate | null;
  job?: Job | null;
}

interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: string;
}

interface DetailItemProps {
  icon: LucideIcon;
  label: string;
  children?: ReactNode;
}

interface StatusOption {
  value: ApplicationStatus;
  label: string;
}

const STATUS_OPTIONS: StatusOption[] = [
  { value: "PENDING", label: "Pending" },
  { value: "REVIEWED", label: "Reviewed" },
  { value: "REVIEWING", label: "Reviewing" },
  { value: "SHORTLISTED", label: "Shortlisted" },
  { value: "REJECTED", label: "Rejected" },
  { value: "ACCEPTED", label: "Accepted / Hired" },
  { value: "HIRED", label: "Hired" },
];

const STATUS_STYLES: Record<string, string> = {
  PENDING: "bg-amber-50 text-amber-700 ring-amber-200",
  REVIEWED: "bg-blue-50 text-blue-700 ring-blue-200",
  REVIEWING: "bg-blue-50 text-blue-700 ring-blue-200",
  SHORTLISTED: "bg-violet-50 text-violet-700 ring-violet-200",
  REJECTED: "bg-red-50 text-red-700 ring-red-200",
  ACCEPTED: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  HIRED: "bg-emerald-50 text-emerald-700 ring-emerald-200",
};

/* ----------------------------------
   Helpers
---------------------------------- */

function formatDate(value?: string | null): string {
  if (!value) return "Not available";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Not available";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function formatStatus(status?: string): string {
  if (!status) return "Unknown";

  const option = STATUS_OPTIONS.find(
    (item) => item.value === status
  );

  if (option) return option.label;

  return status
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function getErrorMessage(error: unknown): string {
  const err = error as {
    response?: {
      data?: {
        message?: string;
        error?: string;
      };
    };
    message?: string;
  };

  return (
    err.response?.data?.message ||
    err.response?.data?.error ||
    err.message ||
    "Something went wrong. Please try again."
  );
}

function unwrapResponse<T>(responseData: T | ApiResponse<T>): T {
  const result = responseData as ApiResponse<T>;

  if (
    result &&
    typeof result === "object" &&
    "data" in result &&
    result.data !== undefined
  ) {
    return result.data;
  }

  return responseData as T;
}

/* ----------------------------------
   Reusable components
---------------------------------- */

function DetailItem({
  icon: Icon,
  label,
  children,
}: DetailItemProps) {
  return (
    <div className="flex min-w-0 items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-500">
        <Icon size={19} />
      </div>

      <div className="min-w-0">
        <p className="text-xs font-medium text-slate-500">
          {label}
        </p>

        <div className="mt-1 break-words text-sm font-semibold text-slate-800">
          {children || "Not provided"}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ring-inset ${
        STATUS_STYLES[status || ""] ||
        "bg-slate-100 text-slate-700 ring-slate-200"
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {formatStatus(status)}
    </span>
  );
}

function SectionHeading({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
        <Icon size={21} />
      </div>

      <div>
        <h2 className="text-lg font-bold text-slate-900">
          {title}
        </h2>

        {subtitle && (
          <p className="mt-0.5 text-sm text-slate-500">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

/* ----------------------------------
   Main page
---------------------------------- */

export default function EmployerApplicationsDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [application, setApplication] =
    useState<Application | null>(null);

  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [selectedStatus, setSelectedStatus] =
    useState<ApplicationStatus | "">("");
  const [updating, setUpdating] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [updateError, setUpdateError] = useState("");

  /* Load application details */

  const loadApplication = useCallback(async () => {
    if (!id) {
      setLoadError("Application ID is missing.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setLoadError("");

      const response = await api.get<
        Application | ApiResponse<Application>
      >(`/applications/employer/${id}`);

      const result = unwrapResponse(response.data);

      if (!result || !result.id) {
        throw new Error("Application details were not found.");
      }

      setApplication(result);
      setSelectedStatus(
        result.status as ApplicationStatus
      );
    } catch (error: unknown) {
      setLoadError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    void loadApplication();
  }, [loadApplication]);

  /* Update application status */

  const handleStatusUpdate = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!application || !selectedStatus) return;

    if (selectedStatus === application.status) {
      setUpdateError("Please select a different status.");
      return;
    }

    try {
      setUpdating(true);
      setUpdateError("");
      setSuccessMessage("");

      const response = await api.patch<
        Application | ApiResponse<Application>
      >(`/applications/${application.id}/status`, {
        status: selectedStatus,
      });

      const result = unwrapResponse(response.data);

      const newStatus =
        result?.status || selectedStatus;

      setApplication((current) =>
        current
          ? {
              ...current,
              ...(result && typeof result === "object"
                ? result
                : {}),
              status: newStatus,
            }
          : current
      );

      setSelectedStatus(newStatus as ApplicationStatus);
      setSuccessMessage(
        "Application status updated successfully."
      );
    } catch (error: unknown) {
      setUpdateError(getErrorMessage(error));
    } finally {
      setUpdating(false);
    }
  };

  /* Loading state */

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <LoaderCircle
            className="animate-spin text-indigo-600"
            size={36}
          />

          <p className="text-sm text-slate-500">
            Loading application details...
          </p>
        </div>
      </div>
    );
  }

  /* Error state */

  if (loadError || !application) {
    return (
      <div className="min-h-[60vh] bg-slate-50 px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <button
            type="button"
            onClick={() =>
              navigate("/employer/applications")
            }
            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-indigo-600"
          >
            <ArrowLeft size={17} />
            Back to Applications
          </button>

          <div className="rounded-2xl border border-red-100 bg-white p-8 text-center shadow-sm">
            <XCircle
              className="mx-auto text-red-500"
              size={40}
            />

            <h2 className="mt-4 text-xl font-bold text-slate-900">
              Unable to load application
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              {loadError || "Application not found."}
            </p>

            <button
              type="button"
              onClick={() => void loadApplication()}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              <RefreshCw size={16} />
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* Safely read nested API data */

  const candidate =
    application.user || application.candidate || {};

  const profile =
    candidate.profile ||
    candidate.jobSeekerProfile ||
    {};

  const job = application.job || {};
  const company = job.company || {};

  const candidateName = candidate.name || "Candidate";

  const initials = candidateName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");

  const resumeUrl =
    profile.resumeUrl || candidate.resumeUrl;

  // const linkedinUrl =
  //   profile.linkedinUrl || candidate.linkedinUrl;

  // const githubUrl =
  //   profile.githubUrl || candidate.githubUrl;

  const skills = Array.isArray(profile.skills)
    ? profile.skills
    : [];

  const coverLetter = application.coverLetter?.trim();

  return (
    <div className="min-h-full bg-slate-50/80 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Page heading */}

        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <button
              type="button"
              onClick={() =>
                navigate("/employer/applications")
              }
              className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-indigo-600"
            >
              <ArrowLeft size={17} />
              Back to Applications
            </button>

            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Application Details
              </h1>

              <StatusBadge status={application.status} />
            </div>

            <p className="mt-2 text-sm text-slate-500">
              Review candidate information and manage the hiring process.
            </p>
          </div>

          <button
            type="button"
            onClick={() => void loadApplication()}
            className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 sm:self-auto"
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>

        {/* Responsive page layout */}

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">

          {/* Left content */}

          <div className="space-y-6 lg:col-span-2">

            {/* Candidate profile */}

            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="h-1.5 bg-gradient-to-r from-indigo-600 via-violet-500 to-blue-400" />

              <div className="p-5 sm:p-7">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-2xl font-bold text-indigo-700 ring-1 ring-indigo-100">
                    {initials || <UserRound size={30} />}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-indigo-600">
                      Candidate Profile
                    </p>

                    <h2 className="mt-2 break-words text-xl font-bold text-slate-900 sm:text-2xl">
                      {candidateName}
                    </h2>

                    <p className="mt-1 break-words text-sm leading-6 text-slate-500">
                      {profile.headline ||
                        profile.bio ||
                        "Professional candidate"}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-3">
                      {candidate.email && (
                        <a
                          href={`mailto:${candidate.email}`}
                          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-indigo-200 hover:text-indigo-600"
                        >
                          <Mail size={16} />
                          Email Candidate
                        </a>
                      )}

                      {resumeUrl && (
                        <a
                          href={resumeUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
                        >
                          <Download size={16} />
                          View Resume
                          <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="my-6 border-t border-slate-100" />

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <DetailItem
                    icon={Mail}
                    label="Email Address"
                  >
                    {candidate.email ? (
                      <a
                        href={`mailto:${candidate.email}`}
                        className="text-indigo-600 hover:underline"
                      >
                        {candidate.email}
                      </a>
                    ) : null}
                  </DetailItem>

                  <DetailItem
                    icon={MapPin}
                    label="Location"
                  >
                    {profile.location || candidate.location}
                  </DetailItem>

                  <DetailItem
                    icon={BriefcaseBusiness}
                    label="Experience"
                  >
                    {profile.experience != null
                      ? `${profile.experience} years`
                      : null}
                  </DetailItem>

                  <DetailItem
                    icon={CalendarDays}
                    label="Applied On"
                  >
                    {formatDate(application.createdAt)}
                  </DetailItem>
                </div>

                {/* Professional links */}

                {/* {(linkedinUrl || githubUrl) && (
                  <>
                    <div className="my-6 border-t border-slate-100" />

                    <h3 className="mb-3 text-sm font-bold text-slate-900">
                      Professional Links
                    </h3>

                    <div className="flex flex-wrap gap-3">
                      {linkedinUrl && (
                        <a
                          href={linkedinUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:border-indigo-200 hover:text-indigo-600"
                        >
                          <Linkedin size={17} />
                          LinkedIn
                          <ExternalLink size={13} />
                        </a>
                      )}

                      {githubUrl && (
                        <a
                          href={githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:border-indigo-200 hover:text-indigo-600"
                        >
                          <Github size={17} />
                          GitHub
                          <ExternalLink size={13} />
                        </a>
                      )}
                    </div>
                  </>
                )} */}

                {/* Skills */}

                {skills.length > 0 && (
                  <>
                    <div className="my-6 border-t border-slate-100" />

                    <h3 className="mb-3 text-sm font-bold text-slate-900">
                      Skills
                    </h3>

                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill, index) => (
                        <span
                          key={`${skill}-${index}`}
                          className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </section>

            {/* Job information */}

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
              <SectionHeading
                icon={BriefcaseBusiness}
                title="Applied Job"
                subtitle="Position linked to this application"
              />

              <h3 className="text-xl font-bold text-slate-900">
                {job.title || "Job title unavailable"}
              </h3>

              <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-slate-500">
                <span>{company.name || "Company"}</span>

                {job.location && (
                  <>
                    <span>·</span>
                    <span>{job.location}</span>
                  </>
                )}

                {job.jobType && (
                  <>
                    <span>·</span>
                    <span>{job.jobType.replace(/_/g, " ")}</span>
                  </>
                )}
              </p>

              {job.description && (
                <div className="mt-5 border-t border-slate-100 pt-5">
                  <h4 className="mb-2 text-sm font-bold text-slate-800">
                    Job Description
                  </h4>

                  <p className="whitespace-pre-line text-sm leading-7 text-slate-600">
                    {job.description}
                  </p>
                </div>
              )}

              {job.id && (
                <Link
                  to={`/employer/jobs/${job.id}/edit`}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                >
                  View Job Details
                  <ExternalLink size={15} />
                </Link>
              )}
            </section>

            {/* Cover letter */}

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
              <SectionHeading
                icon={FileText}
                title="Cover Letter"
                subtitle="Candidate's application message"
              />

              {coverLetter ? (
                <div className="rounded-xl bg-slate-50 p-4 sm:p-5">
                  <p className="whitespace-pre-line text-sm leading-7 text-slate-600">
                    {coverLetter}
                  </p>
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-slate-200 px-4 py-8 text-center">
                  <FileText
                    className="mx-auto text-slate-400"
                    size={28}
                  />

                  <p className="mt-3 text-sm font-medium text-slate-600">
                    No cover letter provided
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    The candidate did not submit a cover letter.
                  </p>
                </div>
              )}
            </section>
          </div>

          {/* Right sidebar */}

          <aside className="space-y-6 lg:sticky lg:top-6">

            {/* Status management */}

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <SectionHeading
                icon={CheckCircle2}
                title="Hiring Decision"
                subtitle="Manage candidate status"
              />

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="mb-2 text-xs font-medium text-slate-500">
                  Current Status
                </p>

                <StatusBadge status={application.status} />
              </div>

              <form
                onSubmit={handleStatusUpdate}
                className="mt-5 space-y-4"
              >
                <div>
                  <label
                    htmlFor="application-status"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Change Status
                  </label>

                  <select
                    id="application-status"
                    value={selectedStatus}
                    onChange={(event) => {
                      setSelectedStatus(
                        event.target.value as ApplicationStatus
                      );
                      setUpdateError("");
                      setSuccessMessage("");
                    }}
                    disabled={updating}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 disabled:cursor-not-allowed disabled:bg-slate-50"
                  >
                    {STATUS_OPTIONS.map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {updateError && (
                  <div
                    role="alert"
                    className="rounded-xl bg-red-50 p-3 text-sm text-red-700"
                  >
                    {updateError}
                  </div>
                )}

                {successMessage && (
                  <div
                    role="status"
                    className="flex items-start gap-2 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-700"
                  >
                    <CheckCircle2
                      className="mt-0.5 shrink-0"
                      size={17}
                    />
                    <span>{successMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={
                    updating ||
                    !selectedStatus ||
                    selectedStatus === application.status
                  }
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {updating ? (
                    <>
                      <LoaderCircle
                        className="animate-spin"
                        size={17}
                      />
                      Updating Status...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={17} />
                      Update Status
                    </>
                  )}
                </button>
              </form>
            </section>

            {/* Application timeline */}

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <SectionHeading
                icon={Clock3}
                title="Application Timeline"
                subtitle="Application activity"
              />

              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <span className="mt-1 h-3 w-3 rounded-full bg-indigo-500 ring-4 ring-indigo-50" />
                  <span className="mt-2 min-h-8 w-px bg-slate-200" />
                </div>

                <div className="pb-4">
                  <p className="text-sm font-semibold text-slate-800">
                    Application submitted
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {formatDate(application.createdAt)}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="mt-1 h-3 w-3 shrink-0 rounded-full bg-emerald-500 ring-4 ring-emerald-50" />

                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Current status
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {formatStatus(application.status)}
                  </p>

                  {application.updatedAt && (
                    <p className="mt-1 text-xs text-slate-400">
                      Last updated: {formatDate(application.updatedAt)}
                    </p>
                  )}
                </div>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
