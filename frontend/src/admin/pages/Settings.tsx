import { useEffect, useState } from "react";
import { useHeader } from "../context/HeaderContext";

const SettingsPage = () => {
  const { setHeader } = useHeader();

  // Form states
  const [platformName, setPlatformName] = useState("CareerConnect");
  const [supportEmail, setSupportEmail] = useState("support@careerconnect.com");
  const [isSaving, setIsSaving] = useState(false);

  // Notification preferences
  const [notifications, setNotifications] = useState({
    newUserRegistrations: true,
    newJobReports: false,
    dailyActivitySummary: true,
  });

  useEffect(() => {
    setHeader("Settings", "Manage platform preferences and administrator account");
  }, [setHeader]);

  const handleSaveChanges = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log("Settings saved:", { platformName, supportEmail });
    setIsSaving(false);
  };

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <main className="bg-[#f9fafc] px-6 py-8 sm:px-8 min-h-screen">
      <div className="max-w-2xl space-y-8">
        {/* Platform Settings Section */}
        <div className="rounded-lg bg-white p-6 sm:p-8 shadow-sm ring-1 ring-[#e5e7eb]">
          {/* Platform Name Field */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-[#1f2937] mb-2">
              Platform name
            </label>
            <input
              type="text"
              value={platformName}
              onChange={(e) => setPlatformName(e.target.value)}
              className="w-full rounded-lg border border-[#d1d5db] bg-white px-4 py-2.5 text-sm text-[#1f2937] placeholder-[#9ca3af] focus:border-[#3b82f6] focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/10 transition-colors"
              placeholder="Enter platform name"
            />
          </div>

          {/* Support Email Field */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-[#1f2937] mb-2">
              Support email
            </label>
            <input
              type="email"
              value={supportEmail}
              onChange={(e) => setSupportEmail(e.target.value)}
              className="w-full rounded-lg border border-[#d1d5db] bg-white px-4 py-2.5 text-sm text-[#1f2937] placeholder-[#9ca3af] focus:border-[#3b82f6] focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/10 transition-colors"
              placeholder="Enter support email"
            />
          </div>

          {/* Save Changes Button */}
          <button
            onClick={handleSaveChanges}
            disabled={isSaving}
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-[#5b5ce2] text-white font-semibold text-sm hover:bg-[#4f50d6] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {isSaving ? "Saving..." : "Save changes"}
          </button>
        </div>

        {/* Notification Preferences Section */}
        <div className="rounded-lg bg-white p-6 sm:p-8 shadow-sm ring-1 ring-[#e5e7eb]">
          <h2 className="text-lg font-bold text-[#1f2937] mb-6">
            Notification preferences
          </h2>

          {/* Notification Preference Items */}
          <div className="space-y-5">
            {/* New User Registrations */}
            <div className="flex items-center justify-between pb-5 border-b border-[#e5e7eb] last:border-b-0 last:pb-0">
              <span className="text-sm font-medium text-[#1f2937]">
                New user registrations
              </span>
              <button
                onClick={() => toggleNotification("newUserRegistrations")}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                  notifications.newUserRegistrations
                    ? "bg-[#5b5ce2]"
                    : "bg-[#d1d5db]"
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                    notifications.newUserRegistrations ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* New Job Reports */}
            <div className="flex items-center justify-between pb-5 border-b border-[#e5e7eb] last:border-b-0 last:pb-0">
              <span className="text-sm font-medium text-[#1f2937]">
                New job reports
              </span>
              <button
                onClick={() => toggleNotification("newJobReports")}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                  notifications.newJobReports ? "bg-[#5b5ce2]" : "bg-[#d1d5db]"
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                    notifications.newJobReports ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* Daily Activity Summary */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-[#1f2937]">
                Daily activity summary
              </span>
              <button
                onClick={() => toggleNotification("dailyActivitySummary")}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                  notifications.dailyActivitySummary
                    ? "bg-[#5b5ce2]"
                    : "bg-[#d1d5db]"
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                    notifications.dailyActivitySummary
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SettingsPage;
