// interface TimelineItem {
//   stage: string;
//   date: string;
// }

// const skillsList = [
//   "React",
//   "TypeScript",
//   "JavaScript",
//   "Next.js",
//   "HTML/CSS",
//   "Figma",
// ];

// const timelineData: TimelineItem[] = [
//   { stage: "Applied", date: "Sep 24" },
//   { stage: "Shortlisted", date: "Sep 25" },
//   { stage: "Interview", date: "Oct 02" },
// ];

// const EmployerProfile = () => {
//   return (
//     <main className="min-h-screen bg-[#F8F9FB] text-[#1E293B]">
//       <div className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6 lg:px-8">
        
//         {/* Page Title / Heading Section */}
//         <section className="mb-8">
//           <h1 className="text-3xl font-bold tracking-tight text-[#0F172A]">
//             Candidate Profile
//           </h1>
//           <p className="mt-1.5 text-sm text-[#64748B]">
//             Review candidate profile, resume and hiring history.
//           </p>
//         </section>

//         {/* Candidate Profile Header Card */}
//         <section className="mb-6 rounded-2xl bg-white p-6 shadow-sm sm:p-8">
//           <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
//             <div className="flex items-center gap-5">
//               {/* Avatar Placeholder */}
//               <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#EEF2FF] text-lg font-semibold text-[#4F46E5]">
//                 PS
//               </div>
              
//               <div>
//                 <h2 className="text-2xl font-bold text-[#0F172A]">Priya Shah</h2>
//                 <p className="mt-1 text-sm font-normal text-[#64748B]">
//                   Senior React Developer &bull; Applied Sep 24
//                 </p>
//                 <div className="mt-3">
//                   <span className="inline-block rounded-full bg-[#FEF3C7] px-3 py-1 text-xs font-semibold text-[#D97706]">
//                     Interview
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Action Button */}
//             <div className="shrink-0">
//               <button
//                 type="button"
//                 className="w-full rounded-xl bg-[#5B57D9] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#4C48C2] focus:outline-none focus:ring-2 focus:ring-[#5B57D9] focus:ring-offset-2 sm:w-auto"
//               >
//                 Schedule Interview
//               </button>
//             </div>
//           </div>
//         </section>

//         {/* Main Grid Content */}
//         <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr]">
          
//           {/* Left Column - Details */}
//           <div className="space-y-6">
//             <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
//               {/* Professional Summary */}
//               <section className="mb-8">
//                 <h3 className="text-lg font-bold text-[#0F172A]">
//                   Professional Summary
//                 </h3>
//                 <p className="mt-4 text-sm leading-relaxed text-[#475569]">
//                   Frontend developer with strong React and TypeScript experience,
//                   focused on accessible and scalable UI.
//                 </p>
//               </section>

//               {/* Skills */}
//               <section className="mb-8">
//                 <h3 className="text-lg font-bold text-[#0F172A]">Skills</h3>
//                 <div className="mt-4 flex flex-wrap gap-2.5">
//                   {skillsList.map((skill) => (
//                     <span
//                       key={skill}
//                       className="rounded-xl bg-[#F1F5F9] px-4 py-2 text-xs font-medium text-[#475569]"
//                     >
//                       {skill}
//                     </span>
//                   ))}
//                 </div>
//               </section>

//               {/* Application Timeline */}
//               <section>
//                 <h3 className="mb-4 text-lg font-bold text-[#0F172A]">
//                   Application timeline
//                 </h3>
//                 <div className="divide-y divide-slate-100">
//                   {timelineData.map((item) => (
//                     <div
//                       key={item.stage}
//                       className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0"
//                     >
//                       <span className="text-sm font-semibold text-[#0F172A]">
//                         {item.stage}
//                       </span>
//                       <span className="text-xs font-medium text-[#64748B]">
//                         {item.date}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </section>
//             </div>
//           </div>

//           {/* Right Column - Actions & Hiring Notes */}
//           <div className="space-y-6">
//             <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
//               <h3 className="text-lg font-bold text-[#0F172A]">Hiring Notes</h3>
              
//               {/* Notes Container */}
//               <div className="mt-4 rounded-xl bg-[#F8FAFC] p-4 text-xs leading-relaxed text-[#475569]">
//                 <ul className="space-y-1.5 list-disc list-inside">
//                   <li>Strong communication</li>
//                   <li>Good React fundamentals</li>
//                   <li>Ask about accessibility projects</li>
//                   <li>Discuss notice period</li>
//                 </ul>
//               </div>

//               {/* Action Buttons */}
//               <div className="mt-6 flex flex-col gap-3">
//                 <button
//                   type="button"
//                   className="w-full rounded-xl bg-[#0F172A] py-3 text-sm font-medium text-white transition hover:bg-[#1E293B]"
//                 >
//                   Download Resume
//                 </button>

//                 <div className="grid grid-cols-2 gap-3">
//                   <button
//                     type="button"
//                     className="w-full rounded-xl bg-[#10B981] py-3 text-sm font-medium text-white transition hover:bg-[#059669]"
//                   >
//                     Shortlist
//                   </button>
//                   <button
//                     type="button"
//                     className="w-full rounded-xl bg-[#EF4444] py-3 text-sm font-medium text-white transition hover:bg-[#DC2626]"
//                   >
//                     Reject
//                   </button>
//                 </div>

//                 <button
//                   type="button"
//                   className="w-full rounded-xl bg-[#5B57D9] py-3 text-sm font-medium text-white transition hover:bg-[#4C48C2]"
//                 >
//                   Move to Interview
//                 </button>
//               </div>
//             </div>
//           </div>

//         </div>
//       </div>
//     </main>
//   );
// };

// export default EmployerProfile;


import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../services/api";

type ApplicationStatus =
  | "PENDING"
  | "REVIEWED"
  | "SHORTLISTED"
  | "REJECTED"
  | "ACCEPTED";

interface CandidateProfile {
  headline: string | null;
  bio: string | null;
  skills: string[];
  experience: number | null;
  location: string | null;
  resumeUrl: string | null;
  linkedinUrl: string | null;
  githubUrl: string | null;
}

interface CandidateApplication {
  id: string;
  status: ApplicationStatus;
  createdAt: string;
  user: {
    id: string;
    name: string;
    email: string;
    profile: CandidateProfile | null;
  };
  job: {
    id: string;
    title: string;
    location: string | null;
    company: { name: string };
  };
}

const statusLabels: Record<ApplicationStatus, string> = {
  PENDING: "Applied",
  REVIEWED: "Reviewed",
  SHORTLISTED: "Shortlisted",
  REJECTED: "Rejected",
  ACCEPTED: "Accepted",
};

const statusColors: Record<ApplicationStatus, string> = {
  PENDING: "bg-blue-50 text-blue-700",
  REVIEWED: "bg-purple-50 text-purple-700",
  SHORTLISTED: "bg-emerald-50 text-emerald-700",
  REJECTED: "bg-red-50 text-red-700",
  ACCEPTED: "bg-green-50 text-green-700",
};

const EmployerProfile = () => {
  const { id } = useParams<{ id: string }>();

  const [application, setApplication] =
    useState<CandidateApplication | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const loadApplication = async () => {
    if (!id) {
      setError("Application ID is missing.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await api.get(
        `/applications/employer/${id}`,
      );

      setApplication(response.data.data);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Unable to load candidate profile.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadApplication();
  }, [id]);

  const updateStatus = async (status: ApplicationStatus) => {
    if (!application) return;

    try {
      setSaving(true);
      setError("");
      setMessage("");

      const response = await api.patch(
        `/applications/${application.id}/status`,
        { status },
      );

      setApplication((current) =>
        current
          ? { ...current, ...response.data.data }
          : current,
      );

      setMessage(
        `Application status updated to ${statusLabels[status]}.`,
      );
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Unable to update application status.",
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F8F9FB] p-8">
        <div className="mx-auto max-w-[1280px] animate-pulse rounded-2xl bg-white p-8">
          Loading candidate profile...
        </div>
      </main>
    );
  }

  if (error && !application) {
    return (
      <main className="min-h-screen bg-[#F8F9FB] p-6">
        <div className="mx-auto max-w-[1280px]">
          <p className="rounded-xl bg-red-50 p-4 text-sm text-red-700">
            {error}
          </p>
          <button
            onClick={() => void loadApplication()}
            className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-white"
          >
            Try Again
          </button>
          <Link
            to="/employer/applications"
            className="ml-3 text-sm text-indigo-600"
          >
            Back to Applications
          </Link>
        </div>
      </main>
    );
  }

  if (!application) return null;

  const candidate = application.user;
  const profile = candidate.profile;
  const initials = candidate.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const appliedDate = new Date(
    application.createdAt,
  ).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <main className="min-h-screen bg-[#F8F9FB] text-[#1E293B]">
      <div className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 lg:px-8">
        <Link
          to="/employer/applications"
          className="mb-5 inline-flex text-sm font-medium text-indigo-600 hover:text-indigo-800"
        >
          ← Back to Applications
        </Link>

        <section className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-[#0F172A]">
            Candidate Profile
          </h1>
          <p className="mt-1.5 text-sm text-[#64748B]">
            Review candidate details, resume and application status.
          </p>
        </section>

        {error && (
          <p className="mb-4 rounded-xl bg-red-50 p-4 text-sm text-red-700">
            {error}
          </p>
        )}

        {message && (
          <p className="mb-4 rounded-xl bg-green-50 p-4 text-sm text-green-700">
            {message}
          </p>
        )}

        <section className="mb-6 rounded-2xl bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#EEF2FF] text-lg font-semibold text-[#4F46E5]">
                {initials}
              </div>

              <div className="min-w-0">
                <h2 className="text-2xl font-bold text-[#0F172A]">
                  {candidate.name}
                </h2>
                <p className="mt-1 text-sm text-[#64748B]">
                  {profile?.headline || application.job.title}
                </p>
                <p className="mt-1 break-all text-sm text-[#64748B]">
                  {candidate.email}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColors[application.status]}`}
                  >
                    {statusLabels[application.status]}
                  </span>
                  <span className="text-xs text-[#64748B]">
                    Applied {appliedDate}
                  </span>
                </div>
              </div>
            </div>

            <div className="text-sm text-[#64748B]">
              <p className="font-semibold text-[#0F172A]">
                {application.job.title}
              </p>
              <p>{application.job.company.name}</p>
              {application.job.location && (
                <p className="mt-1">{application.job.location}</p>
              )}
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr]">
          <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
            <section className="mb-8">
              <h3 className="text-lg font-bold text-[#0F172A]">
                Professional Summary
              </h3>
              <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-[#475569]">
                {profile?.bio || "No professional summary provided."}
              </p>
            </section>

            <section className="mb-8">
              <h3 className="text-lg font-bold text-[#0F172A]">
                Skills
              </h3>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {profile?.skills?.length ? (
                  profile.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-xl bg-[#F1F5F9] px-4 py-2 text-xs font-medium text-[#475569]"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-slate-500">
                    No skills added yet.
                  </p>
                )}
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-lg font-bold text-[#0F172A]">
                Candidate Details
              </h3>
              <div className="mt-4 space-y-3 text-sm">
                <p>
                  <span className="font-medium text-slate-800">
                    Experience:{" "}
                  </span>
                  <span className="text-slate-600">
                    {profile?.experience != null
                      ? `${profile.experience} years`
                      : "Not provided"}
                  </span>
                </p>
                <p>
                  <span className="font-medium text-slate-800">
                    Location:{" "}
                  </span>
                  <span className="text-slate-600">
                    {profile?.location || "Not provided"}
                  </span>
                </p>

                {profile?.linkedinUrl && (
                  <p>
                    <a
                      href={profile.linkedinUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-indigo-600 hover:underline"
                    >
                      LinkedIn Profile ↗
                    </a>
                  </p>
                )}

                {profile?.githubUrl && (
                  <p>
                    <a
                      href={profile.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-indigo-600 hover:underline"
                    >
                      GitHub Profile ↗
                    </a>
                  </p>
                )}
              </div>
            </section>

            <section>
              <h3 className="mb-4 text-lg font-bold text-[#0F172A]">
                Application Timeline
              </h3>
              <div className="divide-y divide-slate-100">
                <div className="flex items-center justify-between py-3.5">
                  <span className="text-sm font-semibold">
                    Applied
                  </span>
                  <span className="text-xs text-slate-500">
                    {appliedDate}
                  </span>
                </div>
                <div className="flex items-center justify-between py-3.5">
                  <span className="text-sm font-semibold">
                    Current status
                  </span>
                  <span className="text-xs text-slate-500">
                    {statusLabels[application.status]}
                  </span>
                </div>
              </div>
              <p className="mt-3 text-xs text-slate-400">
                Previous status change dates are not available from the
                current API.
              </p>
            </section>
          </div>

          <aside className="space-y-6">
            <section className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
              <h3 className="text-lg font-bold text-[#0F172A]">
                Hiring Actions
              </h3>

              <div className="mt-5 flex flex-col gap-3">
                {profile?.resumeUrl ? (
                  <a
                    href={profile.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full rounded-xl bg-[#0F172A] py-3 text-center text-sm font-medium text-white hover:bg-[#1E293B]"
                  >
                    View / Download Resume
                  </a>
                ) : (
                  <p className="rounded-xl bg-slate-50 p-3 text-sm text-slate-500">
                    Resume not provided.
                  </p>
                )}

                <button
                  type="button"
                  disabled={saving || application.status === "SHORTLISTED"}
                  onClick={() => void updateStatus("SHORTLISTED")}
                  className="w-full rounded-xl bg-[#10B981] py-3 text-sm font-medium text-white transition hover:bg-[#059669] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {saving ? "Updating..." : "Shortlist Candidate"}
                </button>

                <button
                  type="button"
                  disabled={saving || application.status === "REJECTED"}
                  onClick={() => void updateStatus("REJECTED")}
                  className="w-full rounded-xl bg-[#EF4444] py-3 text-sm font-medium text-white transition hover:bg-[#DC2626] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Reject Candidate
                </button>

                <button
                  type="button"
                  disabled={saving || application.status === "REVIEWED"}
                  onClick={() => void updateStatus("REVIEWED")}
                  className="w-full rounded-xl bg-[#5B57D9] py-3 text-sm font-medium text-white transition hover:bg-[#4C48C2] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Mark as Reviewed
                </button>
              </div>
            </section>

            <section className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
              <h3 className="text-lg font-bold text-[#0F172A]">
                Application Details
              </h3>
              <div className="mt-4 space-y-3 text-sm">
                <div>
                  <p className="text-slate-500">Application ID</p>
                  <p className="mt-1 break-all font-medium text-slate-800">
                    {application.id}
                  </p>
                </div>
                <div>
                  <p className="text-slate-500">Applied for</p>
                  <p className="mt-1 font-medium text-slate-800">
                    {application.job.title}
                  </p>
                </div>
                <div>
                  <p className="text-slate-500">Applied on</p>
                  <p className="mt-1 font-medium text-slate-800">
                    {appliedDate}
                  </p>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default EmployerProfile;
