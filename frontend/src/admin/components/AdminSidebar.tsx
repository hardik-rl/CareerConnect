import { NavLink } from "react-router-dom";

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  {
    label: "Companies",
    path: "/admin/companies",
  },
  {
    label: "Jobs",
    path: "/admin/jobs",
  },
  {
    label: "Applications",
    path: "/admin/applications",
  },
  {
    label: "Reports",
    path: "/admin/reports",
  },
  {
    label: "Settings",
    path: "/admin/settings",
  },
];

const AdminSidebar = ({
  isOpen,
  onClose,
}: AdminSidebarProps) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <button
          aria-label="Close sidebar"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}

      <aside
        className={`
          fixed left-0 top-0 z-50
          flex h-screen w-64
          flex-col
          bg-[#1f2937]
          transition-transform duration-300
          lg:translate-x-0
          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        {/* Logo/Header Area */}
        <div className="flex h-20 items-center px-6 sm:px-8 border-b border-[#374151]">
          <h2 className="text-white font-bold text-lg">CareerConnect</h2>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-4 py-8">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `
                  block px-4 py-3 rounded-lg
                  text-sm font-medium
                  transition-colors duration-200
                  ${
                    isActive
                      ? "bg-[#3b82f6] text-white"
                      : "text-[#d1d5db] hover:text-white hover:bg-[#374151]"
                  }
                `
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Bottom Profile */}
        <div className="border-t border-[#374151] px-6 py-6 sm:px-8">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#3b82f6]">
              <span className="text-xs font-semibold text-white">HP</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">
                Hardik Patel
              </p>
              <p className="text-xs text-[#9ca3af]">
                Administrator
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;