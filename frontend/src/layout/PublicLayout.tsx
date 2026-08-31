
import { Outlet } from "react-router-dom";
import Header from "../shared/Header";

const PublicLayout = () => {
    return (
        <div className="min-h-screen bg-[#f9fafc]">
            <Header />
            <main className="bg-[#f9fafc]">
                <Outlet />
            </main>
        </div>
    );
};

export default PublicLayout;