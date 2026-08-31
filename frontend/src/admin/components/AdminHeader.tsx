interface AdminHeaderProps {
  onMenuClick: () => void;
  title?: string;
  subtitle?: string;
}

const AdminHeader = ({
  onMenuClick,
  title = "Overview",
  subtitle = "Monitor your platform activity and performance",
}: AdminHeaderProps) => {
  return (
    <header
      className="
        flex h-20 items-center justify-between
        border-b border-[#e5e7eb]
        bg-white
        px-6 sm:px-8
        sticky top-0 z-30
      "
    >
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Mobile menu button */}
        <button
          onClick={onMenuClick}
          aria-label="Open sidebar"
          className="
            lg:hidden
            flex h-10 w-10
            items-center justify-center
            rounded-lg
            text-[#1b2638]
            hover:bg-[#f3f4f6]
            transition-colors
          "
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Header Title */}
        <div>
          <h1
            className="
              text-xl sm:text-2xl
              font-bold
              leading-tight
              text-[#1b2638]
            "
          >
            {title}
          </h1>

          <p
            className="
              hidden sm:block
              mt-1
              text-xs sm:text-sm
              text-[#6b7280]
            "
          >
            {subtitle}
          </p>
        </div>
      </div>

      {/* Avatar */}
      <div
        className="
          flex h-10 w-10 sm:h-12 sm:w-12
          shrink-0
          items-center justify-center
          rounded-full
          bg-[#eef0ff]
          text-[#273247]
        "
      >
        <span className="text-xs sm:text-sm font-semibold">
          HP
        </span>
      </div>
    </header>
  );
};

export default AdminHeader;

// // For Companies page
// <AdminHeader 
//   onMenuClick={() => setSidebarOpen(true)}
//   title="Companies"
//   subtitle="Manage all companies on your platform"
// />

// // For Jobs page
// <AdminHeader 
//   onMenuClick={() => setSidebarOpen(true)}
//   title="Jobs"
//   subtitle="View and manage all job listings"
// />

// // For Applications page
// <AdminHeader 
//   onMenuClick={() => setSidebarOpen(true)}
//   title="Applications"
//   subtitle="Review and process job applications"
// />