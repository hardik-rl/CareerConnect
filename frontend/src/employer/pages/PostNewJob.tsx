import { useState } from "react";

export default function PostNewJob() {
  const [formData, setFormData] = useState({
    jobTitle: 'Senior React Developer',
    company: 'TechForge',
    location: 'Remote India',
    employmentType: 'Full-time',
    experience: '4–7 years',
    salaryRange: '₹12–18 LPA',
    skills: 'React.js, TypeScript, JavaScript, HTML5, CSS3',
    jobDescription:
      'We are looking for a Senior React Developer to join our product team and build high-quality user experiences.',
    responsibilities:
      '• Build reusable components  • Collaborate with design and backend teams  • Improve performance and accessibility',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveDraft = () => {
    console.log('Saving Draft:', formData);
  };

  const handlePublish = (e: any) => {
    e.preventDefault();
    console.log('Publishing Job:', formData);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] px-4 py-8 md:px-4 md:py-10 text-slate-900 font-sans">
      <div className="space-y-8">
        
        {/* Page Title Header */}
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold text-[#0F172A] tracking-tight">
            Post a Job
          </h1>
          <p className="text-sm text-slate-500">
            Create a complete job listing and publish it to candidates.
          </p>
        </div>

        {/* Main Card Container */}
        <div className="bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-slate-100 space-y-8">
          
          {/* Section Header */}
          <div>
            <h2 className="text-lg font-semibold text-[#0F172A]">
              Job information
            </h2>
          </div>

          {/* Form */}
          <form onSubmit={handlePublish} className="space-y-6">
            
            {/* Grid for 2-column fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              
              {/* Job Title */}
              <div className="space-y-2">
                <label htmlFor="jobTitle" className="block text-xs font-semibold text-slate-500">
                  Job title
                </label>
                <input
                  type="text"
                  id="jobTitle"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#F8F9FB] border border-transparent rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all"
                />
              </div>

              {/* Company */}
              <div className="space-y-2">
                <label htmlFor="company" className="block text-xs font-semibold text-slate-500">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#F8F9FB] border border-transparent rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all"
                />
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label htmlFor="location" className="block text-xs font-semibold text-slate-500">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#F8F9FB] border border-transparent rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:border-indigo-500 focus:outline-none transition-all"
                />
              </div>

              {/* Employment Type */}
              <div className="space-y-2">
                <label htmlFor="employmentType" className="block text-xs font-semibold text-slate-500">
                  Employment type
                </label>
                <input
                  type="text"
                  id="employmentType"
                  name="employmentType"
                  value={formData.employmentType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#F8F9FB] border border-transparent rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all"
                />
              </div>

              {/* Experience */}
              <div className="space-y-2">
                <label htmlFor="experience" className="block text-xs font-semibold text-slate-500">
                  Experience
                </label>
                <input
                  type="text"
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#F8F9FB] border border-transparent rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all"
                />
              </div>

              {/* Salary Range */}
              <div className="space-y-2">
                <label htmlFor="salaryRange" className="block text-xs font-semibold text-slate-500">
                  Salary range
                </label>
                <input
                  type="text"
                  id="salaryRange"
                  name="salaryRange"
                  value={formData.salaryRange}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#F8F9FB] border border-transparent rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Skills (Full Width) */}
            <div className="space-y-2">
              <label htmlFor="skills" className="block text-xs font-semibold text-slate-500">
                Skills
              </label>
              <input
                type="text"
                id="skills"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#F8F9FB] border border-transparent rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all"
              />
            </div>

            {/* Job Description */}
            <div className="space-y-2">
              <label htmlFor="jobDescription" className="block text-xs font-semibold text-slate-500">
                Job description
              </label>
              <textarea
                id="jobDescription"
                name="jobDescription"
                rows={3}
                value={formData.jobDescription}
                onChange={handleChange}
                className="w-full p-4 bg-[#F8F9FB] border border-transparent rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all resize-none leading-relaxed"
              />
            </div>

            {/* Responsibilities */}
            <div className="space-y-2">
              <label htmlFor="responsibilities" className="block text-xs font-semibold text-slate-500">
                Responsibilities
              </label>
              <textarea
                id="responsibilities"
                name="responsibilities"
                rows={3}
                value={formData.responsibilities}
                onChange={handleChange}
                className="w-full p-4 bg-[#F8F9FB] border border-transparent rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all resize-none leading-relaxed"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={handleSaveDraft}
                className="px-6 py-2.5 rounded-lg bg-[#0F172A] hover:bg-slate-800 text-white text-sm font-medium transition-colors shadow-sm focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 focus:outline-none"
              >
                Save Draft
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-lg bg-[#5C5CFF] hover:bg-indigo-600 text-white text-sm font-medium transition-colors shadow-sm focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
              >
                Publish Job
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}