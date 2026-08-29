import { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
      const [menuOpen, setMenuOpen] = useState(false);
  
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
                        <button className="h-[46px] rounded-[10px] border border-[#e0e5ed] bg-white px-[25px] text-[14px] font-semibold text-[#131925] transition hover:bg-[#f5f7fa]">
                            Log in
                        </button>

                        <button className="h-[46px] rounded-[10px] bg-[#2954f2] px-[25px] text-[14px] font-semibold text-white transition hover:bg-[#1f46d6]">
                            Get Started
                        </button>
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

                            <button className="h-[46px] rounded-[10px] border border-[#e0e5ed]">Log in</button>

                            <button className="h-[46px] rounded-[10px] bg-[#2954f2] text-white">Get Started</button>
                        </nav>
                    </div>
                )}
            </header>
  );
}

export default Header;