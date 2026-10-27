import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";
import { useState } from "react";
import { useHeader } from "../context/HeaderContext";
import AdminDashboard from "../components/AdminDashboard";

const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { title, subtitle } = useHeader();

    return (
        <div className="min-h-screen bg-[#f9fafc]">
            <AdminSidebar isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            <div className="lg:ml-[250px] min-h-screen">
                <AdminHeader
                    onMenuClick={() => setSidebarOpen(true)}
                    title={title}
                    subtitle={subtitle}
                />

                <main className="bg-[#f9fafc]">
                    <AdminDashboard />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;