import { Outlet } from "react-router-dom";
import Header from "../../shared/Header";

const JobSeekerLayout = () => {
    return (
        <div className="min-h-screen bg-[#f9fafc]">
            <Header />
            <main className="bg-[#f9fafc] mx-auto h-full max-w-[1240px] px-1 xl:px-0">
                <Outlet />
            </main>
        </div>
    );
};

export default JobSeekerLayout;