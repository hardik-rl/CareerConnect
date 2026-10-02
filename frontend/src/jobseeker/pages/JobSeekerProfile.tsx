import { useEffect, useState, type FormEvent } from "react";
import { Check, FileText, Link, MapPin, Upload, UserRound } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

type ProfileData = {
  name: string;
  email: string;
  headline: string;
  location: string;
  experience: string;
  bio: string;
  skills: string;
  resumeUrl: string;
  linkedinUrl: string;
  githubUrl: string;
};

type ProfileResponse = {
  data: {
    user: {
      id: string;
      name: string;
      email: string;
      role: "JOB_SEEKER";
      createdAt?: string;
    };
    profile: {
      headline: string | null;
      bio: string | null;
      skills: string[];
      experience: number | null;
      location: string | null;
      resumeUrl: string | null;
      linkedinUrl: string | null;
      githubUrl: string | null;
    } | null;
  };
};

const initialProfile: ProfileData = {
  name: "",
  email: "",
  headline: "",
  location: "",
  experience: "",
  bio: "",
  skills: "",
  resumeUrl: "",
  linkedinUrl: "",
  githubUrl: "",
};

const fieldClassName =
  "mt-2 h-12 w-full rounded-xl border border-[#e2e8f0] bg-white px-4 text-sm text-[#182336] outline-none transition placeholder:text-[#9aa6b8] focus:border-[#2954f2] focus:ring-4 focus:ring-[#2954f2]/10";

const JobSeekerProfile = () => {
  const { user, login, token } = useAuth();
  const [profile, setProfile] = useState<ProfileData>(initialProfile);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setError("");
        const response = await api.get<ProfileResponse>("/api/profile/me");
        const { user: profileUser, profile: details } = response.data.data;

        setProfile({
          name: profileUser.name,
          email: profileUser.email,
          headline: details?.headline ?? "",
          location: details?.location ?? "",
          experience: details?.experience?.toString() ?? "",
          bio: details?.bio ?? "",
          skills: details?.skills.join(", ") ?? "",
          resumeUrl: details?.resumeUrl ?? "",
          linkedinUrl: details?.linkedinUrl ?? "",
          githubUrl: details?.githubUrl ?? "",
        });
      } catch (loadError) {
        console.error("Failed to load job seeker profile:", loadError);
        setError("We couldn't load your profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    void loadProfile();
  }, []);

  const updateField = (field: keyof ProfileData, value: string) => {
    setProfile((current) => ({ ...current, [field]: value }));
    setSuccess("");
  };

  const saveProfile = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    const experience = profile.experience.trim()
      ? Number(profile.experience)
      : null;
    if (
      experience !== null &&
      (!Number.isInteger(experience) || experience < 0)
    ) {
      setError("Enter a valid number of years of experience.");
      return;
    }

    try {
      setSaving(true);
      const response = await api.put<ProfileResponse>("/api/profile/me", {
        name: profile.name.trim(),
        email: profile.email.trim(),
        headline: profile.headline.trim(),
        location: profile.location.trim(),
        experience,
        bio: profile.bio.trim(),
        skills: profile.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
        resumeUrl: profile.resumeUrl.trim(),
        linkedinUrl: profile.linkedinUrl.trim(),
        githubUrl: profile.githubUrl.trim(),
      });

      const updatedUser = response.data.data.user;
      if (token) {
        login(updatedUser, token);
      }

      setSuccess("Your profile has been saved.");
    } catch (saveError) {
      console.error("Failed to save job seeker profile:", saveError);
      setError("We couldn't save your profile. Check your details and try again.");
    } finally {
      setSaving(false);
    }
  };

  const initials = (profile.name || user?.name || "JS")
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();

  return (
    <main className="min-h-[calc(100vh-72px)] bg-[#f6f8fc] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-7">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#2954f2]">
            Job seeker
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-[-0.04em] text-[#172033]">
            My profile
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#71809a]">
            Keep your professional details up to date so employers can get to know you.
          </p>
        </div>

        {error && (
          <div
            role="alert"
            className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {error}
          </div>
        )}
        {success && (
          <div
            role="status"
            className="mb-5 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
          >
            <Check className="h-4 w-4" />
            {success}
          </div>
        )}

        {loading ? (
          <div className="rounded-2xl border border-[#e8edf5] bg-white p-8 text-sm text-[#71809a] shadow-sm">
            Loading your profile…
          </div>
        ) : (
          <form onSubmit={saveProfile} className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
            <aside className="space-y-5">
              <section className="rounded-2xl border border-[#e8edf5] bg-white p-6 text-center shadow-[0_12px_36px_rgba(15,23,42,0.04)]">
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#eaf0ff] text-2xl font-bold text-[#2954f2] ring-4 ring-[#f5f7ff]">
                  {initials}
                </div>
                <h2 className="mt-4 text-lg font-semibold text-[#172033]">
                  {profile.name || user?.name || "Your name"}
                </h2>
                <p className="mt-1 break-all text-sm text-[#71809a]">
                  {profile.email || user?.email}
                </p>
                <div className="mt-5 flex items-center justify-center gap-2 text-sm text-[#71809a]">
                  <MapPin className="h-4 w-4" />
                  {profile.location || "Add your location"}
                </div>
              </section>

              <section className="rounded-2xl border border-[#e8edf5] bg-white p-5 shadow-[0_12px_36px_rgba(15,23,42,0.04)]">
                <h2 className="font-semibold text-[#172033]">Profile sections</h2>
                <nav className="mt-3 space-y-1 text-sm">
                  <a href="#personal-details" className="flex items-center gap-3 rounded-lg bg-[#eef3ff] px-3 py-2.5 font-medium text-[#2954f2]">
                    <UserRound className="h-4 w-4" />
                    Personal details
                  </a>
                  <a href="#professional-details" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-[#64748b] transition hover:bg-[#f8fafc]">
                    <FileText className="h-4 w-4" />
                    Professional details
                  </a>
                </nav>
              </section>
            </aside>

            <div className="space-y-6">
              <section id="personal-details" className="scroll-mt-24 rounded-2xl border border-[#e8edf5] bg-white p-5 shadow-[0_12px_36px_rgba(15,23,42,0.04)] sm:p-7">
                <div className="mb-6">
                  <h2 className="text-xl font-bold tracking-[-0.03em] text-[#172033]">Personal details</h2>
                  <p className="mt-1 text-sm text-[#71809a]">The basics recruiters use to contact you.</p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="text-sm font-medium text-[#374151]">
                    Full name
                    <input
                      required
                      value={profile.name}
                      onChange={(event) => updateField("name", event.target.value)}
                      placeholder="Your full name"
                      className={fieldClassName}
                    />
                  </label>
                  <label className="text-sm font-medium text-[#374151]">
                    Email address
                    <input
                      required
                      type="email"
                      value={profile.email}
                      onChange={(event) => updateField("email", event.target.value)}
                      placeholder="you@example.com"
                      className={fieldClassName}
                    />
                  </label>
                  <label className="text-sm font-medium text-[#374151] sm:col-span-2">
                    Professional headline
                    <input
                      value={profile.headline}
                      onChange={(event) => updateField("headline", event.target.value)}
                      placeholder="e.g. Frontend Developer | React & TypeScript"
                      className={fieldClassName}
                    />
                  </label>
                  <label className="text-sm font-medium text-[#374151]">
                    Location
                    <input
                      value={profile.location}
                      onChange={(event) => updateField("location", event.target.value)}
                      placeholder="City, country"
                      className={fieldClassName}
                    />
                  </label>
                  <label className="text-sm font-medium text-[#374151]">
                    Years of experience
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={profile.experience}
                      onChange={(event) => updateField("experience", event.target.value)}
                      placeholder="0"
                      className={fieldClassName}
                    />
                  </label>
                </div>
              </section>

              <section id="professional-details" className="scroll-mt-24 rounded-2xl border border-[#e8edf5] bg-white p-5 shadow-[0_12px_36px_rgba(15,23,42,0.04)] sm:p-7">
                <div className="mb-6">
                  <h2 className="text-xl font-bold tracking-[-0.03em] text-[#172033]">Professional details</h2>
                  <p className="mt-1 text-sm text-[#71809a]">Share your background, skills, and work links.</p>
                </div>

                <div className="space-y-5">
                  <label className="block text-sm font-medium text-[#374151]">
                    About you
                    <textarea
                      rows={5}
                      value={profile.bio}
                      onChange={(event) => updateField("bio", event.target.value)}
                      placeholder="Write a short introduction about your experience and career goals."
                      className="mt-2 w-full resize-y rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm leading-6 text-[#182336] outline-none transition placeholder:text-[#9aa6b8] focus:border-[#2954f2] focus:ring-4 focus:ring-[#2954f2]/10"
                    />
                  </label>
                  <label className="block text-sm font-medium text-[#374151]">
                    Skills
                    <input
                      value={profile.skills}
                      onChange={(event) => updateField("skills", event.target.value)}
                      placeholder="React, TypeScript, UI design"
                      className={fieldClassName}
                    />
                    <span className="mt-1 block text-xs font-normal text-[#8a97aa]">Separate each skill with a comma.</span>
                  </label>
                  <label className="block text-sm font-medium text-[#374151]">
                    Resume URL
                    <div className="relative">
                      <Upload className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8a97aa]" />
                      <input
                        type="url"
                        value={profile.resumeUrl}
                        onChange={(event) => updateField("resumeUrl", event.target.value)}
                        placeholder="https://..."
                        className={`${fieldClassName} pl-11`}
                      />
                    </div>
                  </label>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="text-sm font-medium text-[#374151]">
                      LinkedIn
                      <div className="relative">
                        <Link className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8a97aa]" />
                        <input
                          type="url"
                          value={profile.linkedinUrl}
                          onChange={(event) => updateField("linkedinUrl", event.target.value)}
                          placeholder="https://linkedin.com/in/..."
                          className={`${fieldClassName} pl-11`}
                        />
                      </div>
                    </label>
                    <label className="text-sm font-medium text-[#374151]">
                      GitHub
                      <div className="relative">
                        <Link className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8a97aa]" />
                        <input
                          type="url"
                          value={profile.githubUrl}
                          onChange={(event) => updateField("githubUrl", event.target.value)}
                          placeholder="https://github.com/..."
                          className={`${fieldClassName} pl-11`}
                        />
                      </div>
                    </label>
                  </div>
                </div>
              </section>

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="h-11 rounded-xl border border-[#dce3ed] bg-white px-5 text-sm font-semibold text-[#475569] transition hover:bg-[#f8fafc]"
                >
                  Discard changes
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="h-11 rounded-xl bg-[#2954f2] px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-[#2149d5] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? "Saving..." : "Save profile"}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </main>
  );
};

export default JobSeekerProfile;
