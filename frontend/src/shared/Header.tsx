import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Header() {
      const [menuOpen, setMenuOpen] = useState(false);
      const navigate = useNavigate();
      const { user, isAuthenticated, logout } = useAuth();

      const handleLogout = () => {
          logout();
          navigate("/login");
      };

      return (
     <header className="h-[72px] border-b border-[#eef1f5] bg-white">
                <div className="mx-auto flex h-full max-w-[1240px] items-center justify-between px-5 xl:px-0">
                    {/* Logo */}
                    <Link to="/" className="text-[22px] font-bold tracking-[-0.5px] text-[#131925]">
                        CareerConnect
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden items-center gap-[54px] md:flex">
                        <Link to="/job-list" className="text-[14px] text-[#616b7a] transition hover:text-[#2954f2]">
                            Find Jobs
                        </Link>

                        <Link to="/companies" className="text-[14px] text-[#616b7a] transition hover:text-[#2954f2]">
                            Companies
                        </Link>

                        <Link to="/career-advice" className="text-[14px] text-[#616b7a] transition hover:text-[#2954f2]">
                            Career Advice
                        </Link>
                    </nav>

                    {/* Desktop Actions */}
                    <div className="hidden items-center gap-[10px] md:flex">
                        {!isAuthenticated ? (
                            <>
                                <button
                                    type="button"
                                    onClick={() => navigate("/login")}
                                    className="h-[46px] rounded-[10px] border border-[#e0e5ed] bg-white px-[25px] text-[14px] font-semibold text-[#131925] transition hover:bg-[#f5f7fa]"
                                >
                                    Log in
                                </button>

                                <button
                                    type="button"
                                    onClick={() => navigate("/register")}
                                    className="h-[46px] rounded-[10px] bg-[#2954f2] px-[25px] text-[14px] font-semibold text-white transition hover:bg-[#1f46d6]"
                                >
                                    Register
                                </button>
                            </>
                        ) : (
                            <>
                                {user?.name && (
                                    <div className="mr-2 flex items-center gap-2">
                                        <span className="text-[14px] font-medium text-[#131925]">
                                            {user.name}
                                        </span>
                                    </div>
                                )}

                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="inline-flex items-center gap-2 rounded-[10px] border border-[#e0e5ed] bg-white px-[18px] py-[11px] text-[14px] font-semibold text-[#131925] transition hover:bg-[#f5f7fa]"
                                >
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
                                        aria-hidden="true"
                                    >
                                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                        <path d="M16 17l5-5-5-5" />
                                        <path d="M21 12H9" />
                                    </svg>
                                    Log out
                                </button>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#e0e5ed] md:hidden"
                        aria-label="Toggle menu"
                    >
                        <span className="text-xl">{menuOpen ? "×" : "☰"}</span>
                    </button>
                </div>

                {/* Mobile Menu */}
                {menuOpen && (
                    <div className="absolute left-0 right-0 top-[72px] z-50 border-b border-[#e0e5ed] bg-white px-5 py-6 shadow-lg md:hidden">
                        <nav className="flex flex-col gap-5">
                            <Link to="/job-list" className="text-[#616b7a]" onClick={() => setMenuOpen(false)}>
                                Find Jobs
                            </Link>

                            <Link to="/companies" className="text-[#616b7a]" onClick={() => setMenuOpen(false)}>
                                Companies
                            </Link>

                            <Link to="/career-advice" className="text-[#616b7a]" onClick={() => setMenuOpen(false)}>
                                Career Advice
                            </Link>

                            <hr className="border-[#e0e5ed]" />

                            {!isAuthenticated ? (
                                <>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setMenuOpen(false);
                                            navigate("/login");
                                        }}
                                        className="h-[46px] rounded-[10px] border border-[#e0e5ed]"
                                    >
                                        Log in
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setMenuOpen(false);
                                            navigate("/register");
                                        }}
                                        className="h-[46px] rounded-[10px] bg-[#2954f2] text-white"
                                    >
                                        Get Started
                                    </button>
                                </>
                            ) : (
                                <>
                                    <div className="flex items-center justify-between rounded-[10px] bg-[#f5f7fa] px-3 py-2">
                                        <span className="text-sm font-medium text-[#131925]">
                                            {user?.name || "Admin"}
                                        </span>
                                        <span className="ml-2 rounded-full bg-[#eaf0ff] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#2954f2]">
                                            Admin
                                        </span>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setMenuOpen(false);
                                            handleLogout();
                                        }}
                                        className="inline-flex items-center justify-center gap-2 rounded-[10px] border border-[#e0e5ed] px-4 py-3 text-sm font-medium"
                                    >
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
                                            aria-hidden="true"
                                        >
                                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                            <path d="M16 17l5-5-5-5" />
                                            <path d="M21 12H9" />
                                        </svg>
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