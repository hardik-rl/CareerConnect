// import { Link } from "react-router-dom";
// import {
//   Search,
//   MapPin,
//   Heart,
//   ArrowRight,
//   BriefcaseBusiness,
//   Building2,
//   Users,
// } from "lucide-react";

// const jobs = [
//   {
//     initial: "N",
//     title: "Senior Frontend Engineer",
//     company: "Nova Labs",
//     location: "Remote • India",
//     type: "Full-time",
//   },
//   {
//     initial: "O",
//     title: "Product Designer",
//     company: "Orbit Studio",
//     location: "Ahmedabad • Hybrid",
//     type: "Full-time",
//   },
//   {
//     initial: "B",
//     title: "React Developer",
//     company: "Brightside",
//     location: "Bengaluru • Remote",
//     type: "Contract",
//   },
// ];

// const categories = [
//   "Engineering",
//   "Design",
//   "Product",
//   "Marketing",
//   "Sales",
//   "Operations",
// ];

// const stats = [
//   {
//     value: "25k+",
//     label: "Jobs posted",
//     icon: BriefcaseBusiness,
//     bg: "bg-[#2954f2]",
//   },
//   {
//     value: "8k+",
//     label: "Companies",
//     icon: Building2,
//     bg: "bg-[#14a16e]",
//   },
//   {
//     value: "1.2M",
//     label: "Applications",
//     icon: Users,
//     bg: "bg-[#f58f1f]",
//   },
// ];

// function JobCard({ job }) {
//   return (
//     <div className="relative h-[228px] rounded-2xl border border-[#e0e5ed] bg-white p-6 transition duration-200 hover:-translate-y-1 hover:shadow-lg">
//       <div className="flex items-start justify-between">
//         <div className="flex h-[46px] w-[46px] items-center justify-center rounded-xl bg-[#ebf2ff] text-lg font-bold text-[#2954f2]">
//           {job.initial}
//         </div>

//         <button className="text-[#616b7a] transition hover:text-[#2954f2]">
//           <Heart size={20} />
//         </button>
//       </div>

//       <h3 className="mt-4 text-[18px] font-semibold text-[#131925]">
//         {job.title}
//       </h3>

//       <p className="mt-1 text-sm text-[#616b7a]">
//         {job.company}
//       </p>

//       <div className="mt-3 flex items-center gap-1 text-[13px] text-[#616b7a]">
//         <MapPin size={13} />
//         {job.location}
//       </div>

//       <span className="mt-3 inline-flex rounded-full bg-[#ebf2ff] px-3 py-1 text-xs font-semibold text-[#2954f2]">
//         {job.type}
//       </span>
//     </div>
//   );
// }

// function Home() {
//   return (
//     <main className="min-h-screen bg-[#f9fafc] text-[#131925]">

//       {/* ================= HEADER ================= */}

//       <header className="h-[72px] border-b border-[#eef0f4] bg-white">
//         <div className="mx-auto flex h-full w-full max-w-[1240px] items-center">

//           <Link
//             to="/"
//             className="text-[22px] font-bold tracking-[-0.4px]"
//           >
//             CareerConnect
//           </Link>

//           <nav className="ml-[210px] hidden items-center gap-[55px] md:flex">
//             <Link
//               to="/jobs"
//               className="text-sm text-[#616b7a] transition hover:text-[#2954f2]"
//             >
//               Find Jobs
//             </Link>

//             <Link
//               to="/companies"
//               className="text-sm text-[#616b7a] transition hover:text-[#2954f2]"
//             >
//               Companies
//             </Link>

//             <Link
//               to="/career-advice"
//               className="text-sm text-[#616b7a] transition hover:text-[#2954f2]"
//             >
//               Career Advice
//             </Link>
//           </nav>

//           <div className="ml-auto flex items-center gap-2.5">
//             <Link
//               to="/login"
//               className="flex h-[46px] w-[92px] items-center justify-center rounded-[10px] border border-[#e0e5ed] text-sm font-semibold text-[#131925]"
//             >
//               Log in
//             </Link>

//             <Link
//               to="/register"
//               className="flex h-[46px] w-[128px] items-center justify-center rounded-[10px] bg-[#2954f2] text-sm font-semibold text-white transition hover:bg-[#1e45d8]"
//             >
//               Get Started
//             </Link>
//           </div>

//         </div>
//       </header>


//       {/* ================= HERO ================= */}

//       <section className="overflow-hidden">
//         <div className="relative mx-auto flex min-h-[530px] w-full max-w-[1240px] justify-between">

//           {/* LEFT */}

//           <div className="pt-[100px]">

//             <p className="text-[12px] font-bold text-[#2954f2]">
//               THE SMARTER WAY TO FIND YOUR NEXT ROLE
//             </p>

//             <h1 className="mt-5 text-[58px] font-bold leading-[1.05] tracking-[-2px] text-[#131925]">
//               Find work that
//               <br />
//               fits your life.
//             </h1>

//             <p className="mt-6 text-[18px] leading-[1.4] text-[#616b7a]">
//               Discover opportunities from growing startups to global companies.
//               <br />
//               Search, save and apply — all in one place.
//             </p>


//             {/* SEARCH BOX */}

//             <div className="mt-[56px] flex h-[74px] w-[700px] items-center rounded-2xl border border-[#e0e5ed] bg-white px-3">

//               <div className="flex flex-1 items-center gap-3 px-3">
//                 <Search
//                   size={20}
//                   className="text-[#616b7a]"
//                 />

//                 <input
//                   type="text"
//                   placeholder="Job title, skills or keywords"
//                   className="w-full bg-transparent text-sm outline-none placeholder:text-[#616b7a]"
//                 />
//               </div>

//               <div className="h-[42px] w-px bg-[#e0e5ed]" />

//               <div className="flex w-[170px] items-center gap-2 px-5">
//                 <MapPin
//                   size={18}
//                   className="text-[#616b7a]"
//                 />

//                 <span className="whitespace-nowrap text-sm text-[#616b7a]">
//                   Ahmedabad, India
//                 </span>
//               </div>

//               <button className="h-[46px] w-[126px] rounded-[10px] bg-[#2954f2] text-sm font-semibold text-white transition hover:bg-[#1e45d8]">
//                 Search Jobs
//               </button>

//             </div>
//           </div>


//           {/* RIGHT HERO CARD */}

//           <div className="mt-[64px] h-[350px] w-[430px] rounded-[28px] border border-[#e0e5ed] bg-white p-9">

//             <h2 className="text-[22px] font-bold">
//               Your next opportunity
//             </h2>

//             <div className="mt-10 space-y-8">

//               <div className="flex items-center gap-4">
//                 <span className="h-3 w-3 rounded-full bg-[#2954f2]" />
//                 <span className="text-[16px] font-semibold">
//                   12,000+ active jobs
//                 </span>
//               </div>

//               <div className="flex items-center gap-4">
//                 <span className="h-3 w-3 rounded-full bg-[#14a16e]" />
//                 <span className="text-[16px] font-semibold">
//                   Top companies hiring
//                 </span>
//               </div>

//               <div className="flex items-center gap-4">
//                 <span className="h-3 w-3 rounded-full bg-[#f58f1f]" />
//                 <span className="text-[16px] font-semibold">
//                   Track every application
//                 </span>
//               </div>

//             </div>

//           </div>

//         </div>
//       </section>


//       {/* ================= FEATURED JOBS ================= */}

//       <section className="mx-auto w-full max-w-[1240px] pt-16">

//         <div className="flex items-end justify-between">

//           <div>
//             <h2 className="text-[34px] font-bold tracking-[-0.7px]">
//               Featured opportunities
//             </h2>

//             <p className="mt-2 text-[16px] text-[#616b7a]">
//               Hand-picked roles from companies actively hiring.
//             </p>
//           </div>

//           <Link
//             to="/jobs"
//             className="flex items-center gap-2 text-sm font-semibold text-[#2954f2]"
//           >
//             View all jobs
//             <ArrowRight size={16} />
//           </Link>

//         </div>


//         <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
//           {jobs.map((job) => (
//             <JobCard
//               key={job.title}
//               job={job}
//             />
//           ))}
//         </div>

//       </section>


//       {/* ================= STATS ================= */}

//       <section className="mx-auto mt-14 flex h-[170px] w-full max-w-[1240px] items-center justify-between rounded-[24px] bg-[#131925] px-[60px]">

//         {stats.map((stat, index) => {
//           const Icon = stat.icon;

//           return (
//             <div
//               key={stat.label}
//               className="flex items-center gap-5"
//             >

//               <div
//                 className={`flex h-[52px] w-[52px] items-center justify-center rounded-[14px] ${stat.bg}`}
//               >
//                 <Icon
//                   size={25}
//                   className="text-white"
//                 />
//               </div>

//               <div>
//                 <h3 className="text-[30px] font-bold text-white">
//                   {stat.value}
//                 </h3>

//                 <p className="mt-1 text-sm text-[#bfc9db]">
//                   {stat.label}
//                 </p>
//               </div>

//               {index < stats.length - 1 && (
//                 <div className="ml-[100px] h-[50px] w-px bg-[#465064]" />
//               )}

//             </div>
//           );
//         })}

//       </section>


//       {/* ================= CATEGORIES ================= */}

//       <section className="mx-auto w-full max-w-[1240px] pb-20 pt-[70px]">

//         <h2 className="text-[34px] font-bold tracking-[-0.7px]">
//           Explore by category
//         </h2>

//         <p className="mt-2 text-[16px] text-[#616b7a]">
//           Find roles that match your skills and ambitions.
//         </p>


//         <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">

//           {categories.map((category) => (
//             <Link
//               key={category}
//               to={`/jobs?category=${category}`}
//               className="flex h-[76px] items-center justify-between rounded-[14px] border border-[#e0e5ed] bg-white px-6 text-[16px] font-semibold transition hover:border-[#2954f2] hover:shadow-sm"
//             >
//               {category}

//               <ArrowRight
//                 size={20}
//                 className="text-[#2954f2]"
//               />
//             </Link>
//           ))}

//         </div>

//       </section>

//     </main>
//   );
// }

// export default Home;


import { useState } from "react";

const jobs = [
    {
        initial: "N",
        title: "Senior Frontend Engineer",
        company: "Nova Labs",
        location: "Remote • India",
        type: "Full-time",
    },
    {
        initial: "O",
        title: "Product Designer",
        company: "Orbit Studio",
        location: "Ahmedabad • Hybrid",
        type: "Full-time",
    },
    {
        initial: "B",
        title: "React Developer",
        company: "Brightside",
        location: "Bengaluru • Remote",
        type: "Contract",
    },
];

const categories = ["Engineering", "Design", "Product", "Marketing", "Sales", "Operations"];

function HomePage() {
    const [jobKeyword, setJobKeyword] = useState("");
    const [location, setLocation] = useState("Ahmedabad, India");
    const [favorites, setFavorites] = useState<number[]>([]);

    const toggleFavorite = (index) => {
        setFavorites((current) =>
            current.includes(index) ? current.filter((item) => item !== index) : [...current, index]
        );
    };

    const handleSearch = () => {
        console.log({
            jobKeyword,
            location,
        });
    };

    return (
        <main className="min-h-screen bg-[#f9fafc] font-sans text-[#131925]">
            {/* ================= HEADER ================= */}
           

            {/* ================= HERO ================= */}
            <section
                id="home"
                className="overflow-hidden bg-[#f9fafc] pb-16 pt-[70px] md:min-h-[530px] md:pb-0 md:pt-[100px]"
            >
                <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-12 px-5 xl:grid-cols-[700px_1fr] xl:gap-[100px] xl:px-0">
                    {/* Left Hero */}
                    <div>
                        <p className="mb-[22px] text-[12px] font-bold text-[#2954f2]">
                            THE SMARTER WAY TO FIND YOUR NEXT ROLE
                        </p>

                        <h1 className="max-w-[450px] text-[46px] font-bold leading-[1.18] tracking-[-1px] text-[#131925] sm:text-[58px]">
                            Find work that
                            <br />
                            fits your life.
                        </h1>

                        <p className="mt-[22px] max-w-[570px] text-[16px] leading-[1.4] text-[#616b7a] sm:text-[18px]">
                            Discover opportunities from growing startups to global companies.
                            <br className="hidden sm:block" />
                            Search, save and apply — all in one place.
                        </p>

                        {/* Search Box */}
                        <div className="mt-[38px] flex w-full max-w-[700px] flex-col rounded-[16px] border border-[#e0e5ed] bg-white p-3 sm:h-[74px] sm:flex-row sm:items-center sm:p-0">
                            <input
                                value={jobKeyword}
                                onChange={(e) => setJobKeyword(e.target.value)}
                                placeholder="Job title, skills or keywords"
                                className="h-[48px] flex-1 bg-transparent px-3 text-[14px] text-[#131925] outline-none placeholder:text-[#616b7a] sm:px-[25px] sm:text-[16px]"
                            />

                            <div className="hidden h-[42px] w-px bg-[#e0e5ed] sm:block" />

                            <input
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="h-[48px] w-full bg-transparent px-3 text-[14px] text-[#616b7a] outline-none sm:w-[150px] sm:px-[25px] sm:text-[16px]"
                            />

                            <button
                                onClick={handleSearch}
                                className="h-[46px] shrink-0 rounded-[10px] bg-[#2954f2] px-6 text-[14px] font-semibold text-white transition hover:bg-[#1f46d6] sm:mr-[12px] sm:w-[126px]"
                            >
                                Search Jobs
                            </button>
                        </div>
                    </div>

                    {/* Hero Opportunity Card */}
                    <div className="flex items-start justify-center xl:justify-end">
                        <div className="w-full max-w-[430px] rounded-[28px] border border-[#e0e5ed] bg-white px-7 py-7 sm:h-[350px] sm:px-[36px] sm:py-[34px]">
                            <h2 className="text-[20px] font-bold sm:text-[22px]">Your next opportunity</h2>

                            <div className="mt-[34px] space-y-[26px] sm:mt-[50px] sm:space-y-[28px]">
                                <div className="flex items-center gap-4">
                                    <span className="h-[12px] w-[12px] rounded-full bg-[#2954f2]" />
                                    <span className="text-[15px] font-semibold sm:text-[16px]">
                                        12,000+ active jobs
                                    </span>
                                </div>

                                <div className="flex items-center gap-4">
                                    <span className="h-[12px] w-[12px] rounded-full bg-[#14a16e]" />
                                    <span className="text-[15px] font-semibold sm:text-[16px]">
                                        Top companies hiring
                                    </span>
                                </div>

                                <div className="flex items-center gap-4">
                                    <span className="h-[12px] w-[12px] rounded-full bg-[#f58f1f]" />
                                    <span className="text-[15px] font-semibold sm:text-[16px]">
                                        Track every application
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= FEATURED JOBS ================= */}
            <section id="jobs" className="pt-[60px] md:pt-[68px]">
                <div className="mx-auto max-w-[1240px] px-5 xl:px-0">
                    <h2 className="text-[30px] font-bold tracking-[-0.5px] md:text-[34px]">Featured opportunities</h2>

                    <p className="mt-[5px] text-[15px] text-[#616b7a] md:text-[16px]">
                        Hand-picked roles from companies actively hiring.
                    </p>

                    <div className="mt-[36px] grid grid-cols-1 gap-[20px] md:grid-cols-2 xl:grid-cols-3">
                        {jobs.map((job, index) => {
                            const isFavorite = favorites.includes(index);

                            return (
                                <article
                                    key={job.title}
                                    className="relative h-[228px] rounded-[16px] border border-[#e0e5ed] bg-white p-[24px]"
                                >
                                    {/* Company Initial */}
                                    <div className="flex h-[46px] w-[46px] items-center justify-center rounded-[12px] bg-[#ebf2ff] text-[18px] font-bold text-[#2954f2]">
                                        {job.initial}
                                    </div>

                                    {/* Favorite */}
                                    <button
                                        onClick={() => toggleFavorite(index)}
                                        className={`absolute right-[20px] top-[18px] text-[25px] leading-none transition ${
                                            isFavorite ? "text-[#2954f2]" : "text-[#616b7a] hover:text-[#2954f2]"
                                        }`}
                                        aria-label="Save job"
                                    >
                                        {isFavorite ? "♥" : "♡"}
                                    </button>

                                    <h3 className="mt-[12px] text-[18px] font-semibold">{job.title}</h3>

                                    <p className="mt-[5px] text-[14px] text-[#616b7a]">{job.company}</p>

                                    <p className="mt-[13px] text-[13px] text-[#616b7a]">{job.location}</p>

                                    <span className="mt-[12px] inline-flex h-[28px] min-w-[100px] items-center rounded-full bg-[#ebf2ff] px-3 text-[12px] font-semibold text-[#2954f2]">
                                        {job.type}
                                    </span>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ================= STATS ================= */}
            <section className="pt-[62px]">
                <div className="mx-auto max-w-[1240px] px-5 xl:px-0">
                    <div className="grid min-h-[170px] grid-cols-1 gap-10 rounded-[24px] bg-[#131925] px-8 py-10 sm:grid-cols-3 sm:items-center sm:px-[90px]">
                        <div>
                            <div className="text-[32px] font-bold text-white md:text-[36px]">25k+</div>
                            <p className="mt-[4px] text-[14px] text-[#bfc9db]">Jobs posted</p>
                        </div>

                        <div>
                            <div className="text-[32px] font-bold text-white md:text-[36px]">8k+</div>
                            <p className="mt-[4px] text-[14px] text-[#bfc9db]">Companies</p>
                        </div>

                        <div>
                            <div className="text-[32px] font-bold text-white md:text-[36px]">1.2M</div>
                            <p className="mt-[4px] text-[14px] text-[#bfc9db]">Applications</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= CATEGORIES ================= */}
            <section id="companies" className="pb-[80px] pt-[74px]">
                <div className="mx-auto max-w-[1240px] px-5 xl:px-0">
                    <h2 className="text-[30px] font-bold tracking-[-0.5px] md:text-[34px]">Explore by category</h2>

                    <p className="mt-[5px] text-[15px] text-[#616b7a] md:text-[16px]">
                        Find roles that match your skills and ambitions.
                    </p>

                    <div className="mt-[38px] grid grid-cols-1 gap-[24px] sm:grid-cols-2 xl:grid-cols-3">
                        {categories.map((category) => (
                            <button
                                key={category}
                                className="flex h-[76px] items-center justify-between rounded-[14px] border border-[#e0e5ed] bg-white px-[24px] text-left transition hover:-translate-y-[2px] hover:border-[#2954f2]"
                            >
                                <span className="text-[16px] font-semibold text-[#131925]">{category}</span>

                                <span className="text-[22px] font-bold text-[#2954f2]">→</span>
                            </button>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}

export default HomePage;
