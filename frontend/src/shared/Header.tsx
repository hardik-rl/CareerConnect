import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ProfileMenuButton from "./ProfileMenuButton";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const { user, isAuthenticated, logout } = useAuth();
  const profilePath =
    user?.role === "EMPLOYER"
      ? "/employer/profile"
      : user?.role === "ADMIN"
        ? "/admin/profile"
        : "/job-seeker/profile";

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/login");
  };

  const handleNavigate = (path: string) => {
    setMenuOpen(false);
    navigate(path);
  };

  const getRoleLabel = () => {
    switch (user?.role) {
      case "ADMIN":
        return "Admin";
      case "EMPLOYER":
        return "Employer";
      case "JOB_SEEKER":
        return "Job Seeker";
      default:
        return "User";
    }
  };

  return (
    <header className="h-[72px] border-b border-[#eef1f5] bg-white">
      <div className="mx-auto flex h-full max-w-[1240px] items-center justify-between px-5 xl:px-0">
        {/* ================= LOGO ================= */}
        <Link
          to="/"
          className="text-[22px] font-bold tracking-[-0.5px] text-[#131925]"
        >
          CareerConnect
        </Link>

        {/* ================= DESKTOP NAVIGATION ================= */}
        <nav className="hidden items-center gap-[54px] md:flex">
          <Link
            to="/job-list"
            className="text-[14px] text-[#616b7a] transition hover:text-[#2954f2]"
          >
            Find Jobs
          </Link>

          <Link
            to="/companies"
            className="text-[14px] text-[#616b7a] transition hover:text-[#2954f2]"
          >
            Companies
          </Link>

          <Link
            to="/career-advice"
            className="text-[14px] text-[#616b7a] transition hover:text-[#2954f2]"
          >
            Career Advice
          </Link>
        </nav>

        {/* ================= DESKTOP AUTH ================= */}
        <div className="hidden items-center gap-[10px] md:flex">
          {!isAuthenticated ? (
            <>
              {/* LOGIN */}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="h-[46px] rounded-[10px] border border-[#e0e5ed] bg-white px-[25px] text-[14px] font-semibold text-[#131925] transition hover:bg-[#f5f7fa]"
              >
                Log in
              </button>

              {/* REGISTER */}
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="h-[46px] rounded-[10px] bg-[#2954f2] px-[25px] text-[14px] font-semibold text-white transition hover:bg-[#1f46d6]"
              >
                Register
              </button>
            </>
          ) : (
            /* ================= USER DROPDOWN ================= */
            <div className="group relative">
              {/* User Button */}
              <button
                type="button"
                className="flex items-center gap-3 rounded-[10px] border border-[#e0e5ed] bg-white px-4 py-2.5 transition hover:bg-[#f5f7fa]"
              >
                {/* Avatar */}
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#eaf0ff] text-sm font-bold text-[#2954f2]">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>

                {/* Name + Role */}
                <div className="text-left">
                  <p className="max-w-[120px] truncate text-[14px] font-semibold text-[#131925]">
                    {user?.name}
                  </p>

                  <p className="text-[11px] text-[#6b7280]">
                    {getRoleLabel()}
                  </p>
                </div>

                {/* Arrow */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              {/* ================= DROPDOWN ================= */}
              <div className="invisible absolute right-0 top-full z-50 mt-2 w-[230px] translate-y-2 rounded-[12px] border border-[#e5e7eb] bg-white p-2 opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                {/* User Info */}
                <div className="border-b border-[#eef1f5] px-3 py-3">
                  <p className="text-[14px] font-semibold text-[#131925]">
                    {user?.name}
                  </p>

                  <p className="mt-0.5 truncate text-[12px] text-[#6b7280]">
                    {user?.email}
                  </p>

                  <span className="mt-2 inline-block rounded-full bg-[#eaf0ff] px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#2954f2]">
                    {getRoleLabel()}
                  </span>
                </div>

                {/* ================= PROFILE ================= */}
                <ProfileMenuButton onClick={() => navigate(profilePath)} />

                {/* ================= JOB SEEKER ================= */}
                {user?.role === "JOB_SEEKER" && (
                  <>
                    <button
                      type="button"
                      onClick={() => navigate("/job-seeker/dashboard")}
                      className="flex w-full items-center gap-3 rounded-[8px] px-3 py-2.5 text-left text-[14px] text-[#374151] transition hover:bg-[#f5f7fa]"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        height="17"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="3" y="3" width="7" height="7" />
                        <rect x="14" y="3" width="7" height="7" />
                        <rect x="3" y="14" width="7" height="7" />
                        <rect x="14" y="14" width="7" height="7" />
                      </svg>

                      Dashboard
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate("/job-seeker/applications")}
                      className="flex w-full items-center gap-3 rounded-[8px] px-3 py-2.5 text-left text-[14px] text-[#374151] transition hover:bg-[#f5f7fa]"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        height="17"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="3" y="4" width="18" height="16" rx="2" />
                        <path d="M7 8h10" />
                        <path d="M7 12h6" />
                      </svg>

                      Applications
                    </button>
                  </>
                )}

                {/* ================= EMPLOYER ================= */}
                {user?.role === "EMPLOYER" && (
                  <>
                    <button
                      type="button"
                      onClick={() => navigate("/employer/jobs")}
                      className="flex w-full items-center gap-3 rounded-[8px] px-3 py-2.5 text-left text-[14px] text-[#374151] transition hover:bg-[#f5f7fa]"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        height="17"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="3" y="7" width="18" height="13" rx="2" />
                        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>

                      My Jobs
                    </button>

                    <button
                      type="button"
                      onClick={() => navigate("/employer/applications")}
                      className="flex w-full items-center gap-3 rounded-[8px] px-3 py-2.5 text-left text-[14px] text-[#374151] transition hover:bg-[#f5f7fa]"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        height="17"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M4 4h16v16H4z" />
                        <path d="M8 8h8" />
                        <path d="M8 12h8" />
                        <path d="M8 16h5" />
                      </svg>

                      Applications
                    </button>
                  </>
                )}

                {/* ================= ADMIN ================= */}
                {user?.role === "ADMIN" && (
                  <button
                    type="button"
                    onClick={() => navigate("/admin")}
                    className="flex w-full items-center gap-3 rounded-[8px] px-3 py-2.5 text-left text-[14px] text-[#374151] transition hover:bg-[#f5f7fa]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="3" width="7" height="7" />
                      <rect x="14" y="3" width="7" height="7" />
                      <rect x="3" y="14" width="7" height="7" />
                      <rect x="14" y="14" width="7" height="7" />
                    </svg>

                    Admin Dashboard
                  </button>
                )}

                {/* Divider */}
                <div className="my-1 border-t border-[#eef1f5]" />

                {/* ================= LOGOUT ================= */}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-[8px] px-3 py-2.5 text-left text-[14px] font-medium text-red-600 transition hover:bg-red-50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <path d="m16 17 5-5-5-5" />
                    <path d="M21 12H9" />
                  </svg>

                  Log out
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ================= MOBILE MENU BUTTON ================= */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#e0e5ed] md:hidden"
          aria-label="Toggle menu"
        >
          <span className="text-xl">{menuOpen ? "×" : "☰"}</span>
        </button>
      </div>

      {/* ================= MOBILE MENU ================= */}
      {menuOpen && (
        <div className="absolute left-0 right-0 top-[72px] z-50 border-b border-[#e0e5ed] bg-white px-5 py-6 shadow-lg md:hidden">
          <nav className="flex flex-col gap-4">
            {/* Public Links */}
            <Link
              to="/job-list"
              className="text-[#616b7a]"
              onClick={() => setMenuOpen(false)}
            >
              Find Jobs
            </Link>

            <Link
              to="/companies"
              className="text-[#616b7a]"
              onClick={() => setMenuOpen(false)}
            >
              Companies
            </Link>

            <Link
              to="/career-advice"
              className="text-[#616b7a]"
              onClick={() => setMenuOpen(false)}
            >
              Career Advice
            </Link>

            <div className="my-1 border-t border-[#eef1f5]" />

            {/* ================= MOBILE LOGGED OUT ================= */}
            {!isAuthenticated ? (
              <>
                <button
                  type="button"
                  onClick={() => handleNavigate("/login")}
                  className="h-[46px] rounded-[10px] border border-[#e0e5ed]"
                >
                  Log in
                </button>

                <button
                  type="button"
                  onClick={() => handleNavigate("/register")}
                  className="h-[46px] rounded-[10px] bg-[#2954f2] text-white"
                >
                  Register
                </button>
              </>
            ) : (
              <>
                {/* User Info */}
                <div className="rounded-[10px] bg-[#f5f7fa] px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#eaf0ff] text-sm font-bold text-[#2954f2]">
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-[#131925]">
                        {user?.name}
                      </p>

                      <p className="text-xs text-[#6b7280]">
                        {getRoleLabel()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* ================= PROFILE ================= */}
                <ProfileMenuButton
                  mobile
                  onClick={() => handleNavigate(profilePath)}
                />

                {/* ================= JOB SEEKER ================= */}
                {user?.role === "JOB_SEEKER" && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleNavigate("/dashboard")}
                      className="rounded-[10px] border border-[#e0e5ed] px-4 py-3 text-left text-sm font-medium text-[#374151]"
                    >
                      Dashboard
                    </button>
                    <button
                      type="button"
                      onClick={() => handleNavigate("/applications")}
                      className="rounded-[10px] border border-[#e0e5ed] px-4 py-3 text-left text-sm font-medium text-[#374151]"
                    >
                      Applications
                    </button>
                  </>
                )}

                {/* ================= EMPLOYER ================= */}
                {user?.role === "EMPLOYER" && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleNavigate("/employer/jobs")}
                      className="rounded-[10px] border border-[#e0e5ed] px-4 py-3 text-left text-sm font-medium text-[#374151]"
                    >
                      My Jobs
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleNavigate("/employer/applications")
                      }
                      className="rounded-[10px] border border-[#e0e5ed] px-4 py-3 text-left text-sm font-medium text-[#374151]"
                    >
                      Applications
                    </button>
                  </>
                )}

                {/* ================= ADMIN ================= */}
                {user?.role === "ADMIN" && (
                  <button
                    type="button"
                    onClick={() => handleNavigate("/admin")}
                    className="rounded-[10px] border border-[#e0e5ed] px-4 py-3 text-left text-sm font-medium text-[#374151]"
                  >
                    Admin Dashboard
                  </button>
                )}

                {/* ================= LOGOUT ================= */}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-[10px] border border-red-200 px-4 py-3 text-left text-sm font-medium text-red-600"
                >
                  Log out
                </button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;