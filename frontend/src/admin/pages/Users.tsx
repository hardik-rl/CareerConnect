import { useMemo, useState, useEffect } from "react";
import { useHeader } from "../context/HeaderContext";

type UserRole = "Candidate" | "Employer";
type UserStatus = "Active" | "Suspended";

interface User {
  id: number;
  name: string;
  role: UserRole;
  status: UserStatus;
  joined: string;
}

const USERS: User[] = [
  {
    id: 1,
    name: "Aarav Shah",
    role: "Candidate",
    status: "Active",
    joined: "Aug 8, 2026",
  },
  {
    id: 2,
    name: "Neha Patel",
    role: "Employer",
    status: "Active",
    joined: "Aug 9, 2026",
  },
  {
    id: 3,
    name: "Rohan Mehta",
    role: "Candidate",
    status: "Active",
    joined: "Aug 10, 2026",
  },
  {
    id: 4,
    name: "Priya Singh",
    role: "Employer",
    status: "Active",
    joined: "Aug 11, 2026",
  },
  {
    id: 5,
    name: "Dev Kumar",
    role: "Candidate",
    status: "Suspended",
    joined: "Aug 12, 2026",
  },
  {
    id: 6,
    name: "Ananya Rao",
    role: "Employer",
    status: "Active",
    joined: "Aug 13, 2026",
  },
];

export default function Users() {
  const { setHeader } = useHeader();
  const [search, setSearch] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [roleFilter, setRoleFilter] = useState<"All" | UserRole>("All");
  const [statusFilter, setStatusFilter] = useState<
    "All" | UserStatus
  >("All");

  useEffect(() => {
    setHeader("Users", "Manage candidates, employers and administrators");
  }, [setHeader]);

  const filteredUsers = useMemo(() => {
    return USERS.filter((user) => {
      const matchesSearch = user.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesRole =
        roleFilter === "All" || user.role === roleFilter;

      const matchesStatus =
        statusFilter === "All" || user.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [search, roleFilter, statusFilter]);

  return (
    <main className="bg-[#f9fafc]">

      {/* Page Content */}
      <section className="px-6 pb-10 pt-[54px] sm:px-8 lg:px-8">
        {/* Search + Filter */}
        <div className="relative mb-[52px] flex items-start justify-between gap-5">
          {/* Search */}
          <div className="w-full max-w-[420px]">
            <div className="flex h-[47px] items-center rounded-[9px] bg-white px-[14px]">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or email"
                className="w-full bg-transparent text-[14px] text-[#26334A] outline-none placeholder:text-[#71809A]"
              />
            </div>
          </div>

          {/* Filter */}
          <div className="relative">
            <button
              onClick={() => setFilterOpen((prev) => !prev)}
              className="flex h-[43px] w-[150px] items-center justify-center rounded-[9px] bg-white text-[14px] font-semibold text-[#1D293D] transition hover:bg-[#f1f3f8]"
            >
              Filter
            </button>

            {filterOpen && (
              <div className="absolute right-0 top-[52px] z-20 w-[210px] rounded-xl bg-white p-4 shadow-[0_10px_35px_rgba(20,30,50,0.12)]">
                <p className="mb-2 text-xs font-semibold text-[#697791]">
                  Role
                </p>

                <select
                  value={roleFilter}
                  onChange={(e) =>
                    setRoleFilter(
                      e.target.value as "All" | UserRole
                    )
                  }
                  className="mb-4 h-9 w-full rounded-lg border border-[#E5E8EF] px-2 text-sm outline-none"
                >
                  <option value="All">All Roles</option>
                  <option value="Candidate">Candidate</option>
                  <option value="Employer">Employer</option>
                </select>

                <p className="mb-2 text-xs font-semibold text-[#697791]">
                  Status
                </p>

                <select
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(
                      e.target.value as "All" | UserStatus
                    )
                  }
                  className="h-9 w-full rounded-lg border border-[#E5E8EF] px-2 text-sm outline-none"
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Users Table */}
        <div className="overflow-hidden rounded-[16px] bg-white px-[22px] py-[18px]">
          {/* Desktop Header */}
          <div className="hidden grid-cols-[2.15fr_1fr_1.1fr_1.4fr_0.75fr] items-center border-b border-[#E1E5EC] px-[6px] pb-[15px] md:grid">
            <div className="text-[12px] font-semibold text-[#687690]">
              User
            </div>

            <div className="text-[12px] font-semibold text-[#687690]">
              Role
            </div>

            <div className="text-[12px] font-semibold text-[#687690]">
              Status
            </div>

            <div className="text-[12px] font-semibold text-[#687690]">
              Joined
            </div>

            <div className="text-[12px] font-semibold text-[#687690]">
              Actions
            </div>
          </div>

          {/* Rows */}
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div
                key={user.id}
                className="border-b border-[#E1E5EC] last:border-b-0"
              >
                {/* Desktop */}
                <div className="hidden min-h-[78px] grid-cols-[2.15fr_1fr_1.1fr_1.4fr_0.75fr] items-center px-[6px] md:grid">
                  <div className="text-[14px] font-semibold text-[#1D293D]">
                    {user.name}
                  </div>

                  <div className="text-[13px] text-[#66758F]">
                    {user.role}
                  </div>

                  <div>
                    <StatusBadge status={user.status} />
                  </div>

                  <div className="text-[13px] text-[#66758F]">
                    {user.joined}
                  </div>

                  <ActionButton />
                </div>

                {/* Mobile */}
                <div className="flex items-center justify-between gap-4 px-2 py-5 md:hidden">
                  <div className="min-w-0">
                    <p className="truncate text-[14px] font-semibold text-[#1D293D]">
                      {user.name}
                    </p>

                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <span className="text-[12px] text-[#66758F]">
                        {user.role}
                      </span>

                      <StatusBadge status={user.status} />
                    </div>

                    <p className="mt-2 text-[12px] text-[#66758F]">
                      Joined {user.joined}
                    </p>
                  </div>

                  <ActionButton />
                </div>
              </div>
            ))
          ) : (
            <div className="flex h-[150px] items-center justify-center text-sm text-[#697791]">
              No users found
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function StatusBadge({ status }: { status: UserStatus }) {
  const active = status === "Active";

  return (
    <span
      className={`inline-flex min-w-[82px] items-center justify-center rounded-full px-3 py-[6px] text-[12px] font-medium ${
        active
          ? "bg-[#EEF0FF] text-[#00B96B]"
          : "bg-[#EEF0FF] text-[#FF2B20]"
      }`}
    >
      {status}
    </span>
  );
}

function ActionButton() {
  return (
    <button
      type="button"
      aria-label="User actions"
      className="flex h-8 w-8 items-center justify-center rounded-md text-[#172238] transition hover:bg-[#F4F5F8]"
    >
      <span className="flex items-center gap-[3px]">
        <span className="h-[5px] w-[5px] rounded-full bg-current" />
        <span className="h-[5px] w-[5px] rounded-full bg-current" />
        <span className="h-[5px] w-[5px] rounded-full bg-current" />
      </span>
    </button>
  );
}