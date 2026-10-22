import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { MoveLeft } from "lucide-react";

type JobFormData = {
  jobTitle: string;
  company: string;
  location: string;
  employmentType: string;
  experience: string;
  salaryRange: string;
  skills: string;
  jobDescription: string;
  responsibilities: string;
};

const initialFormData: JobFormData = {
  jobTitle: "",
  company: "",
  location: "",
  employmentType: "",
  experience: "",
  salaryRange: "",
  skills: "",
  jobDescription:
    "",
  responsibilities:
    "",
};

const inputClass =
  "w-full rounded-lg border border-transparent bg-[#F8F9FB] px-4 py-3 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-1 focus:ring-indigo-500";

const labelClass =
  "block text-xs font-semibold text-slate-500";

function parseSalaryRange(value: string) {
  const numbers = value.match(/\d+(?:\.\d+)?/g);

  if (!numbers || numbers.length === 0) {
    return { salaryMin: null, salaryMax: null };
  }

  // Salary is entered in LPA and stored as annual INR.
  const values = numbers.map((number) =>
    Math.round(Number(number) * 100000),
  );

  return {
    salaryMin: values[0],
    salaryMax: values[1] ?? values[0],
  };
}

export default function PostNewJob() {
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState<JobFormData>(initialFormData);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const submitJob = async (
    event: FormEvent<HTMLFormElement>,
    isDraft: boolean,
  ) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!formData.jobTitle.trim() || !formData.location.trim()) {
      setError("Please enter a job title and location.");
      return;
    }

    if (!formData.jobDescription.trim()) {
      setError("Please enter a job description.");
      return;
    }

    const { salaryMin, salaryMax } = parseSalaryRange(
      formData.salaryRange,
    );

    const payload = {
      title: formData.jobTitle.trim(),
      location: formData.location.trim(),
      description: formData.jobDescription.trim(),
      // requirements: [
      //   `Required skills: ${formData.skills.trim()}`,
      //   `Responsibilities:\n${formData.responsibilities.trim()}`,
      // ]
      //   .filter(Boolean)
      //   .join("\n\n"),
      requirements: [
        ...formData.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
        ...formData.responsibilities
          .split("\n")
          .map((item) => item.replace(/^•\s*/, "").trim())
          .filter(Boolean),
      ],
      jobType: formData.employmentType,
      // experienceLevel: getExperienceLevel(formData.experience),
      experienceLevel: formData.experience,
      salaryMin,
      salaryMax,
      isActive: !isDraft,
    };

    try {
      setSubmitting(true);

      await api.post("/jobs", payload);

      if (isDraft) {
        setMessage("Job draft saved successfully.");
      } else {
        setMessage("Job published successfully!");
      }

      // Navigate to Manage Jobs after a successful API response.
      navigate("/employer/managejobs", {
        state: {
          message: isDraft
            ? "Job draft saved successfully."
            : "Job published successfully!",
        },
      });
    } catch (err: unknown) {
      const apiError = err as {
        response?: {
          data?: { message?: string };
          status?: number;
        };
      };

      setError(
        apiError.response?.data?.message ||
        "Unable to save this job. Please check your details and try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] px-4 py-8 font-sans text-slate-900 md:py-10">
      <div className="space-y-8">
        <div className="space-y-1">
          <button className="flex items-center gap-2 cursor-pointer mb-3 text-md font-medium text-indigo-600 hover:text-indigo-700" onClick={() => navigate("/employer/managejobs")}>
            <MoveLeft  size={20}/> Back to Manage Jobs
          </button>
          <h1 className="text-2xl font-bold tracking-tight text-[#0F172A] md:text-3xl">
            Post a Job
          </h1>
          <p className="text-sm text-slate-500">
            Create a complete job listing and publish it to candidates.
          </p>
        </div>

        <div className="space-y-8 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm md:p-10">
          <div>
            <h2 className="text-lg font-semibold text-[#0F172A]">
              Job information
            </h2>
          </div>

          {error && (
            <div
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {error}
            </div>
          )}

          {message && (
            <div
              role="status"
              className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
            >
              {message}
            </div>
          )}

          <form
            onSubmit={(event) => void submitJob(event, false)}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="jobTitle" className={labelClass}>
                  Job title *
                </label>
                <input
                  required
                  id="jobTitle"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="e.g. Senior React Developer"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="company" className={labelClass}>
                  Company
                </label>
                <input
                  id="company"
                  name="company"
                  value={formData.company}
                  readOnly
                  className={`${inputClass} cursor-not-allowed text-slate-500`}
                />
                <p className="text-xs text-slate-400">
                  Company is linked to your employer account.
                </p>
              </div>

              <div className="space-y-2">
                <label htmlFor="location" className={labelClass}>
                  Location *
                </label>
                <input
                  required
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="e.g. Ahmedabad / Remote India"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="employmentType" className={labelClass}>
                  Employment type *
                </label>
                <select
                  id="employmentType"
                  name="employmentType"
                  value={formData.employmentType}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="FULL_TIME">Full-time</option>
                  <option value="PART_TIME">Part-time</option>
                  <option value="CONTRACT">Contract</option>
                  <option value="INTERNSHIP">Internship</option>
                  <option value="FREELANCE">Freelance</option>
                </select>
              </div>


              <div className="space-y-2">
                <label htmlFor="experience" className="block text-xs font-semibold text-slate-500">
                  Experience level *
                </label>
                <select
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-transparent bg-[#F8F9FB] px-4 py-3 text-sm text-slate-800 outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="ENTRY">Entry level</option>
                  <option value="JUNIOR">Junior</option>
                  <option value="MID">Mid level</option>
                  <option value="SENIOR">Senior</option>
                  <option value="LEAD">Lead</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="salaryRange" className={labelClass}>
                  Salary range (LPA)
                </label>
                <input
                  id="salaryRange"
                  name="salaryRange"
                  value={formData.salaryRange}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="e.g. 12-18"
                />
                <p className="text-xs text-slate-400">
                  Enter annual salary in lakhs, e.g. 12-18.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="skills" className={labelClass}>
                Required skills
              </label>
              <input
                id="skills"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                className={inputClass}
                placeholder="React, TypeScript, JavaScript"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="jobDescription" className={labelClass}>
                Job description *
              </label>
              <textarea
                required
                id="jobDescription"
                name="jobDescription"
                rows={4}
                value={formData.jobDescription}
                onChange={handleChange}
                className={`${inputClass} resize-y leading-relaxed`}
                placeholder="Describe this role..."
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="responsibilities" className={labelClass}>
                Responsibilities
              </label>
              <textarea
                id="responsibilities"
                name="responsibilities"
                rows={4}
                value={formData.responsibilities}
                onChange={handleChange}
                className={`${inputClass} resize-y leading-relaxed`}
                placeholder="Describe key responsibilities..."
              />
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
              <button
                type="button"
                disabled={submitting}
                onClick={(event) => {
                  const form = event.currentTarget.form;
                  if (form) void submitJob(
                    {
                      ...({ preventDefault: () => { } } as FormEvent<HTMLFormElement>),
                      currentTarget: form,
                    } as FormEvent<HTMLFormElement>,
                    true,
                  );
                }}
                className="rounded-lg bg-[#0F172A] px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Saving..." : "Save Draft"}
              </button>

              <button
                type="submit"
                disabled={submitting}
                className="rounded-lg bg-[#5C5CFF] px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Publishing..." : "Publish Job"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
