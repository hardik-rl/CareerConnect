import { useEffect } from "react";
import { useHeader } from "../context/HeaderContext";

const SettingsPage = () => {
  const { setHeader } = useHeader();

  useEffect(() => {
    setHeader("Settings", "Manage platform settings and configurations");
  }, [setHeader]);

  return (
    <main className="bg-[#f9fafc] px-6 py-8 sm:px-8">
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-[#1f2937]">Settings</h2>
        <p className="mt-2 text-[#6b7280]">Add content here for settings.</p>
      </div>
    </main>
  );
};

export default SettingsPage;
