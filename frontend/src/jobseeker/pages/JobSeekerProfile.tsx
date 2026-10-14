import React, { useEffect, useMemo, useState } from "react";
import api from "../../services/api";

interface User {
  id: string;
  name: string;
  email: string;
  role: "JOB_SEEKER" | "EMPLOYER" | "ADMIN";
  createdAt: string;
}

interface Profile {
  headline: string;
  bio: string;
  skills: string[];
  experience: number | null;
  location: string;
  resumeUrl: string;
  linkedinUrl: string;
  githubUrl: string;
}

interface ProfileResponse {
  success: boolean;
  data: {
    user: User;
    profile: Profile | null;
  };
}

const JobSeekerProfile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isEditOpen, setIsEditOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    headline: "",
    bio: "",
    experience: "",
    location: "",
    skills: "",
    resumeUrl: "",
    linkedinUrl: "",
    githubUrl: "",
  });


  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get<ProfileResponse>("/profile/me");

      if (!response.data?.success) {
        throw new Error("Unable to load profile.");
      }

      setUser(response.data.data.user);
      setProfile(response.data.data.profile);

      setFormData({
        name: response.data.data.user.name || "",
        email: response.data.data.user.email || "",
        headline: response.data.data.profile?.headline || "",
        bio: response.data.data.profile?.bio || "",
        experience:
          response.data.data.profile?.experience !== null &&
            response.data.data.profile?.experience !== undefined
            ? String(response.data.data.profile.experience)
            : "",
        location: response.data.data.profile?.location || "",
        skills: response.data.data.profile?.skills?.join(", ") || "",
        resumeUrl: response.data.data.profile?.resumeUrl || "",
        linkedinUrl: response.data.data.profile?.linkedinUrl || "",
        githubUrl: response.data.data.profile?.githubUrl || "",
      });

      // setUser(response.data.data.user);
      // setProfile(response.data.data.profile);
    } catch (err: any) {
      console.error("PROFILE ERROR:", err);

      setError(
        err?.response?.data?.message ||
        err?.message ||
        "Unable to load your profile."
      );
    } finally {
      setLoading(false);
    }
  };


  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  const handleSaveProfile = async () => {
    try {
      setIsSaving(true);
      setSaveError("");

      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        headline: formData.headline.trim(),
        bio: formData.bio.trim(),
        skills: formData.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
        experience:
          formData.experience.trim() === ""
            ? null
            : Number(formData.experience),
        location: formData.location.trim(),
        resumeUrl: formData.resumeUrl.trim(),
        linkedinUrl: formData.linkedinUrl.trim(),
        githubUrl: formData.githubUrl.trim(),
      };

      const response = await api.put("/profile/me", payload);

      if (response.data.success) {
        const updatedUser = response.data.data.user;
        const updatedProfile = response.data.data.profile;

        setUser(updatedUser);
        setProfile(updatedProfile);

        setFormData({
          name: updatedUser.name || "",
          email: updatedUser.email || "",
          headline: updatedProfile?.headline || "",
          bio: updatedProfile?.bio || "",
          experience:
            updatedProfile?.experience !== null &&
              updatedProfile?.experience !== undefined
              ? String(updatedProfile.experience)
              : "",
          location: updatedProfile?.location || "",
          skills: updatedProfile?.skills?.join(", ") || "",
          resumeUrl: updatedProfile?.resumeUrl || "",
          linkedinUrl: updatedProfile?.linkedinUrl || "",
          githubUrl: updatedProfile?.githubUrl || "",
        });

        setIsEditOpen(false);
      }
    } catch (error: any) {
      console.error("Update profile error:", error);

      setSaveError(
        error?.response?.data?.message ||
        "Unable to save profile. Please try again."
      );
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const completeness = useMemo(() => {
    if (!profile || !user) return 0;

    const fields = [
      user.name,
      user.email,
      user.role,
      profile.headline,
      profile.bio,
      profile.skills?.length ? profile.skills : "",
      profile.experience !== null ? profile.experience : "",
      profile.location,
      profile.resumeUrl,
      profile.linkedinUrl,
      profile.githubUrl,
    ];

    const completedFields = fields.filter((field) => {
      if (Array.isArray(field)) {
        return field.length > 0;
      }

      return String(field).trim().length > 0;
    }).length;

    return Math.round((completedFields / fields.length) * 100);
  }, [user, profile]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F8FA] px-4 pb-16 pt-8 sm:px-8 sm:pt-12">
        <div className="mx-auto max-w-[1280px] animate-pulse">
          <div className="h-9 w-48 rounded bg-gray-200" />
          <div className="mt-3 h-5 w-80 rounded bg-gray-200" />

          <div className="mt-8 h-[175px] rounded-[14px] bg-white" />

          <div className="mt-[30px] grid grid-cols-1 gap-[30px] xl:grid-cols-[minmax(0,820px)_430px]">
            <div className="h-[650px] rounded-[14px] bg-white" />
            <div className="h-[460px] rounded-[14px] bg-white" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F7F8FA] px-4 pb-16 pt-8 sm:px-8 sm:pt-12">
        <div className="mx-auto max-w-[1280px]">
          <div className="rounded-[14px] border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-600">
            {error}
          </div>

          <button
            type="button"
            onClick={fetchProfile}
            className="mt-4 h-10 rounded-lg bg-[#111722] px-5 text-sm font-semibold text-white"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const displayName = user?.name || "Your Name";
  const headline = profile?.headline || "Add your professional headline";
  const location = profile?.location || "Add your location";

  const bio =
    profile?.bio ||
    "Add a professional summary to help employers understand your experience and skills.";

  const skills =
    profile?.skills && profile.skills.length > 0
      ? profile.skills
      : ["Add your skills"];

  const initials = displayName
    .split(" ")
    .map((name) => name.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const profileItems = [
    {
      label: "Personal information",
      completed: Boolean(user?.name && user?.email),
    },
    {
      label: "Professional summary",
      completed: Boolean(profile?.bio),
    },
    {
      label: "Experience",
      completed: profile?.experience !== null,
    },
    {
      label: "Skills",
      completed: Boolean(profile?.skills?.length),
    },
    {
      label: "Resume",
      completed: Boolean(profile?.resumeUrl),
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F8FA] text-[#171D2B]">
      <main className="mx-auto px-4 pb-16 pt-8 sm:px-8 sm:pt-12 lg:pb-[84px]">
        {/* Page Heading */}
        <section className="mb-8">
          <h1 className="m-0 text-[26px] font-bold leading-[36px] tracking-[-0.4px] sm:text-[30px] sm:leading-[42px]">
            My Profile
          </h1>

          <p className="mt-1.5 text-[13px] leading-6 text-[#64708A] sm:text-[14px]">
            Build a strong profile so employers can discover you.
          </p>
        </section>

        {/* Profile Header */}
        <section className="mb-[30px] flex min-h-[175px] flex-col justify-between gap-6 rounded-[14px] bg-white p-6 sm:p-8 md:flex-row md:items-center">
          <div className="flex items-center">
            <div className="flex h-[68px] w-[68px] shrink-0 items-center justify-center rounded-full bg-[#F0EFFF] text-[12px] font-medium text-[#5B5BE7] sm:h-[82px] sm:w-[82px]">
              {initials}
            </div>

            <div className="ml-4 sm:ml-[26px]">
              <h2 className="m-0 text-[20px] font-bold leading-[30px] sm:text-[23px]">
                {displayName}
              </h2>

              <p className="mb-3 mt-1 text-[12px] leading-[22px] text-[#64708A] sm:mb-[18px] sm:text-[14px]">
                {headline} · {location}
              </p>

              <span className="inline-flex h-7 items-center justify-center rounded-full bg-[#DEF7EB] px-6 text-[11px] font-semibold text-[#0CAF63]">
                Open to work
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsEditOpen(true)}

            className="h-[42px] w-full shrink-0 rounded-lg bg-[#111722] text-[12px] font-semibold text-white transition hover:bg-[#202735] md:w-[150px]"
          >
            Edit Profile
          </button>
        </section>

        {/* Main Grid */}
        <section className="grid grid-cols-1 gap-[30px] xl:grid-cols-[minmax(0,820px)_430px]">
          {/* Left */}
          <div className="rounded-[14px] bg-white p-6 sm:p-8">
            {/* Personal Information */}
            <div>
              <h3 className="m-0 text-[18px] font-semibold leading-[26px]">
                Personal Information
              </h3>

              <div className="mt-[25px] grid grid-cols-1 gap-5 sm:grid-cols-2">
                {/* Email */}
                <div>
                  <p className="m-0 text-[11px] font-medium uppercase tracking-wide text-[#8A93A5]">
                    Email
                  </p>

                  <p className="mt-1.5 break-all text-[13px] font-medium text-[#303746]">
                    {user?.email || "Not added"}
                  </p>
                </div>

                {/* Role */}
                <div>
                  <p className="m-0 text-[11px] font-medium uppercase tracking-wide text-[#8A93A5]">
                    Role
                  </p>

                  <p className="mt-1.5 text-[13px] font-medium text-[#303746]">
                    {user?.role === "JOB_SEEKER"
                      ? "Job Seeker"
                      : user?.role || "Not available"}
                  </p>
                </div>

                {/* Experience */}
                <div>
                  <p className="m-0 text-[11px] font-medium uppercase tracking-wide text-[#8A93A5]">
                    Experience
                  </p>

                  <p className="mt-1.5 text-[13px] font-medium text-[#303746]">
                    {profile?.experience !== null &&
                      profile?.experience !== undefined
                      ? `${profile.experience} ${profile.experience === 1 ? "year" : "years"
                      }`
                      : "Not added"}
                  </p>
                </div>

                {/* Location */}
                <div>
                  <p className="m-0 text-[11px] font-medium uppercase tracking-wide text-[#8A93A5]">
                    Location
                  </p>

                  <p className="mt-1.5 text-[13px] font-medium text-[#303746]">
                    {location}
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-[42px]">
              <h3 className="m-0 text-[18px] font-semibold leading-[26px]">
                Professional Links
              </h3>

              <div className="mt-[22px] grid grid-cols-1 gap-5 sm:grid-cols-2">
                {/* LinkedIn */}
                <div>
                  <p className="m-0 text-[11px] font-medium uppercase tracking-wide text-[#8A93A5]">
                    LinkedIn
                  </p>

                  {profile?.linkedinUrl ? (
                    <a
                      href={profile.linkedinUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1.5 block break-all text-[13px] font-medium text-[#2563EB] hover:underline"
                    >
                      {profile.linkedinUrl}
                    </a>
                  ) : (
                    <p className="mt-1.5 text-[13px] font-medium text-[#64708A]">
                      Not added
                    </p>
                  )}
                </div>

                {/* GitHub */}
                <div>
                  <p className="m-0 text-[11px] font-medium uppercase tracking-wide text-[#8A93A5]">
                    GitHub
                  </p>

                  {profile?.githubUrl ? (
                    <a
                      href={profile.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1.5 block break-all text-[13px] font-medium text-[#2563EB] hover:underline"
                    >
                      {profile.githubUrl}
                    </a>
                  ) : (
                    <p className="mt-1.5 text-[13px] font-medium text-[#64708A]">
                      Not added
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Professional Summary */}
            <div className="mt-[50px]">
              <h3 className="m-0 text-[18px] font-semibold leading-[26px]">
                Professional Summary
              </h3>

              <p className="mt-[25px] max-w-[740px] text-[13px] leading-[20px] text-[#64708A]">
                {bio}
              </p>
            </div>

            {/* Skills */}
            <div className="mt-[50px]">
              <h3 className="m-0 text-[18px] font-semibold leading-[26px]">
                Skills
              </h3>

              <div className="mt-[15px] grid grid-cols-2 gap-[15px] sm:grid-cols-3 md:grid-cols-4">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="flex h-[30px] w-full items-center justify-center rounded-[18px] bg-[#EFEFFF] px-2 text-[11px] font-medium text-[#5454E8]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Resume */}
            <div className="mt-[50px]">
              <h3 className="m-0 text-[18px] font-semibold leading-[26px]">
                Resume
              </h3>

              <div className="mt-[18px] flex flex-col gap-[13px] sm:flex-row">
                <button
                  type="button"
                  disabled={!profile?.resumeUrl}
                  onClick={() => {
                    if (profile?.resumeUrl) {
                      window.open(profile.resumeUrl, "_blank");
                    }
                  }}
                  className="h-[38px] w-full rounded-[7px] bg-[#111722] text-[12px] font-semibold text-white transition hover:bg-[#202735] disabled:cursor-not-allowed disabled:opacity-40 sm:w-[180px]"
                >
                  View Resume
                </button>

                <button
                  type="button"
                  disabled={!profile?.resumeUrl}
                  onClick={() => {
                    if (profile?.resumeUrl) {
                      window.open(profile.resumeUrl, "_blank");
                    }
                  }}
                  className="h-[38px] w-full rounded-[7px] bg-[#5B57E8] text-[12px] font-semibold text-white transition hover:bg-[#4E4AD7] disabled:cursor-not-allowed disabled:opacity-40 sm:w-[180px]"
                >
                  Download Resume
                </button>
              </div>
            </div>
          </div>

          {/* Right */}
          <aside className="min-h-[460px] rounded-[14px] bg-white p-6 sm:p-[30px]">
            <h3 className="m-0 text-[18px] font-semibold leading-[26px]">
              Profile completeness
            </h3>

            <div className="mt-[17px] text-[21px] font-bold leading-[30px]">
              {completeness}% complete
            </div>

            <div className="mt-[15px] h-[10px] w-full overflow-hidden rounded-full bg-[#DFE3EA]">
              <div
                className="h-full rounded-full bg-[#11B96C] transition-all duration-500"
                style={{ width: `${completeness}%` }}
              />
            </div>

            <div className="mt-[35px] flex flex-col gap-[27px]">
              {profileItems.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2 text-[13px] leading-[22px] text-[#303746]"
                >
                  <span
                    className={
                      item.completed
                        ? "text-[12px] text-[#0CAF63]"
                        : "text-[12px] text-[#9CA3AF]"
                    }
                  >
                    {item.completed ? "✓" : "○"}
                  </span>

                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </aside>
        </section>


        {isEditOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">
            <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Edit Profile
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Update your professional information
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-xl text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
                >
                  ×
                </button>
              </div>

              {/* Form */}
              <div className="space-y-6 px-6 py-6">
                {/* Personal Information */}
                <div>
                  <h3 className="mb-4 text-base font-semibold text-gray-900">
                    Personal Information
                  </h3>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {/* Name */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Full Name
                      </label>

                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        placeholder="Enter your name"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Email
                      </label>

                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        placeholder="Enter your email"
                      />
                    </div>

                    {/* Experience */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Experience (Years)
                      </label>

                      <input
                        type="number"
                        name="experience"
                        min="0"
                        value={formData.experience}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        placeholder="e.g. 4"
                      />
                    </div>

                    {/* Location */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Location
                      </label>

                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        placeholder="Ahmedabad, India"
                      />
                    </div>
                  </div>
                </div>

                {/* Professional Information */}
                <div>
                  <h3 className="mb-4 text-base font-semibold text-gray-900">
                    Professional Information
                  </h3>

                  <div className="space-y-4">
                    {/* Headline */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Professional Headline
                      </label>

                      <input
                        type="text"
                        name="headline"
                        value={formData.headline}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        placeholder="Frontend Developer"
                      />
                    </div>

                    {/* Bio */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Professional Summary
                      </label>

                      <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        rows={5}
                        className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        placeholder="Tell employers about yourself..."
                      />
                    </div>

                    {/* Skills */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Skills
                      </label>

                      <input
                        type="text"
                        name="skills"
                        value={formData.skills}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        placeholder="React, JavaScript, TypeScript, Tailwind CSS"
                      />

                      <p className="mt-1.5 text-xs text-gray-500">
                        Separate skills with commas
                      </p>
                    </div>
                  </div>
                </div>

                {/* Professional Links */}
                <div>
                  <h3 className="mb-4 text-base font-semibold text-gray-900">
                    Professional Links
                  </h3>

                  <div className="space-y-4">
                    {/* LinkedIn */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        LinkedIn URL
                      </label>

                      <input
                        type="url"
                        name="linkedinUrl"
                        value={formData.linkedinUrl}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        placeholder="https://linkedin.com/in/your-profile"
                      />
                    </div>

                    {/* GitHub */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        GitHub URL
                      </label>

                      <input
                        type="url"
                        name="githubUrl"
                        value={formData.githubUrl}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        placeholder="https://github.com/username"
                      />
                    </div>

                    {/* Resume */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Resume URL
                      </label>

                      <input
                        type="url"
                        name="resumeUrl"
                        value={formData.resumeUrl}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        placeholder="https://example.com/resume.pdf"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex flex-col-reverse gap-3 border-t border-gray-200 px-6 py-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSaveProfile}
                  disabled={isSaving}

                  type="button"
                  className="rounded-lg bg-[#2563EB] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1D4ED8]"
                >
                  {isSaving ? "Saving..." : "Save Changes"}

                </button>
              </div>

              {saveError && (
                <div className="mx-6 mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {saveError}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default JobSeekerProfile;