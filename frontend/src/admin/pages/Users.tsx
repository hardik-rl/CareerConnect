import { useCallback, useEffect, useMemo, useState } from "react";
import { useHeader } from "../context/HeaderContext";
import api from "../../services/api";

type ApiRole = "ADMIN" | "JOB_SEEKER" | "EMPLOYER";

interface User {
  id: string;
  name: string;
  email: string;
  role: ApiRole;
  createdAt: string;
}

interface UsersResponse {
  success: boolean;
  message?: string;
  count?: number;
  data: User[];
}

type RoleFilter = "All" | ApiRole;

const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const formatRole = (role: ApiRole) => {
  switch (role) {
    case "JOB_SEEKER":
      return "Candidate";
    case "EMPLOYER":
      return "Employer";
    case "ADMIN":
      return "Admin";
    default:
      return role;
  }
};

export default function Users() {
  const { setHeader } = useHeader();

  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  useEffect(() => {
    setHeader("Users", "Manage candidates, employers and administrators");
  }, [setHeader]);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Please log in again to manage users.");
      }

      const response = await api.get<UsersResponse>("/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const result = response.data;

      if (!result.success) {
        throw new Error(result.message || "Unable to fetch users.");
      }

      setUsers(Array.isArray(result.data) ? result.data : []);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchUsers();
  }, [fetchUsers]);

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();

    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query);

      const matchesRole =
        roleFilter === "All" || user.role === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [users, search, roleFilter]);

  return (
    <main className="min-h-[calc(100vh-78px)] bg-[#f9fafc]">
      <section className="px-6 pb-10 pt-[54px] sm:px-8 lg:px-8">
        {/* Search + Filter */}
        <div className="relative mb-8 flex items-start justify-between gap-5">
          <div className="w-full max-w-[420px]">
            <div className="flex h-[47px] items-center rounded-[9px] bg-white px-[14px] ring-1 ring-[#E5E8EF]">
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by name or email"
                aria-label="Search users"
                className="w-full bg-transparent text-[14px] text-[#26334A] outline-none placeholder:text-[#71809A]"
              />
            </div>
          </div>

          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() => setFilterOpen((previous) => !previous)}
              aria-expanded={filterOpen}
              className="flex h-[43px] w-[120px] items-center justify-center rounded-[9px] bg-white text-[14px] font-semibold text-[#1D293D] ring-1 ring-[#E5E8EF] transition hover:bg-[#f1f3f8] sm:w-[150px]"
            >
              Filter
              <span className="ml-2 text-xs">▾</span>
            </button>

            {filterOpen && (
              <div className="absolute right-0 top-[52px] z-20 w-[210px] rounded-xl bg-white p-4 shadow-[0_10px_35px_rgba(20,30,50,0.12)] ring-1 ring-[#E5E8EF]">
                <label
                  htmlFor="role-filter"
                  className="mb-2 block text-xs font-semibold text-[#697791]"
                >
                  Role
                </label>

                <select
                  id="role-filter"
                  value={roleFilter}
                  onChange={(event) =>
                    setRoleFilter(event.target.value as RoleFilter)
                  }
                  className="h-9 w-full rounded-lg border border-[#E5E8EF] px-2 text-sm outline-none"
                >
                  <option value="All">All Roles</option>
                  <option value="JOB_SEEKER">Candidate</option>
                  <option value="EMPLOYER">Employer</option>
                  <option value="ADMIN">Admin</option>
                </select>

                <button
                  type="button"
                  onClick={() => {
                    setRoleFilter("All");
                    setSearch("");
                  }}
                  className="mt-3 text-xs font-semibold text-[#5C5BE2] hover:underline"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Result count */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm text-[#71809A]">
            {loading
              ? "Loading users..."
              : `${filteredUsers.length} of ${users.length} users`}
          </p>

          <button
            type="button"
            onClick={() => void fetchUsers()}
            disabled={loading}
            className="rounded-lg px-3 py-2 text-sm font-semibold text-[#5C5BE2] hover:bg-[#EEF0FF] disabled:opacity-50"
          >
            {loading ? "Loading..." : "Refresh"}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div
            role="alert"
            className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
          >
            <span>{error}</span>
            <button
              type="button"
              onClick={() => void fetchUsers()}
              className="font-semibold underline"
            >
              Try again
            </button>
          </div>
        )}

        {/* Users Table */}
        <div className="overflow-visible rounded-[16px] bg-white px-[22px] py-[18px] shadow-sm ring-1 ring-[#EEF0F5]">
          {/* Desktop Header */}
          <div className="hidden grid-cols-[2fr_1.2fr_1.5fr_1.2fr_0.6fr] items-center border-b border-[#E1E5EC] px-[6px] pb-[15px] md:grid">
            <div className="text-[12px] font-semibold text-[#687690]">
              User
            </div>
            <div className="text-[12px] font-semibold text-[#687690]">
              Role
            </div>
            <div className="text-[12px] font-semibold text-[#687690]">
              Email
            </div>
            <div className="text-[12px] font-semibold text-[#687690]">
              Joined
            </div>
            <div className="text-[12px] font-semibold text-[#687690]">
              Actions
            </div>
          </div>

          {loading ? (
            <div className="flex h-[180px] items-center justify-center text-sm text-[#697791]">
              Loading users...
            </div>
          ) : !error && filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div
                key={user.id}
                className="relative border-b border-[#E1E5EC] last:border-b-0"
              >
                {/* Desktop row */}
                <div className="hidden min-h-[78px] grid-cols-[2fr_1.2fr_1.5fr_1.2fr_0.6fr] items-center px-[6px] md:grid">
                  <div className="min-w-0 pr-3">
                    <p className="truncate text-[14px] font-semibold text-[#1D293D]">
                      {user.name}
                    </p>
                  </div>

                  <div>
                    <RoleBadge role={user.role} />
                  </div>

                  <div className="truncate pr-3 text-[13px] text-[#66758F]">
                    {user.email}
                  </div>

                  <div className="text-[13px] text-[#66758F]">
                    {formatDate(user.createdAt)}
                  </div>

                  <ActionButton
                    user={user}
                    selected={selectedUser === user.id}
                    onClick={() =>
                      setSelectedUser((current) =>
                        current === user.id ? null : user.id
                      )
                    }
                  />
                </div>

                {/* Mobile row */}
                <div className="flex items-center justify-between gap-4 px-2 py-5 md:hidden">
                  <div className="min-w-0">
                    <p className="truncate text-[14px] font-semibold text-[#1D293D]">
                      {user.name}
                    </p>

                    <p className="mt-1 break-all text-[12px] text-[#66758F]">
                      {user.email}
                    </p>

                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <RoleBadge role={user.role} />
                    </div>

                    <p className="mt-2 text-[12px] text-[#66758F]">
                      Joined {formatDate(user.createdAt)}
                    </p>
                  </div>

                  <ActionButton
                    user={user}
                    selected={selectedUser === user.id}
                    onClick={() =>
                      setSelectedUser((current) =>
                        current === user.id ? null : user.id
                      )
                    }
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="flex min-h-[150px] items-center justify-center px-4 text-center text-sm text-[#697791]">
              {error ? "Users could not be loaded." : "No users found"}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function RoleBadge({ role }: { role: ApiRole }) {
  const styles: Record<ApiRole, string> = {
    ADMIN: "bg-[#F3E8FF] text-[#7E22CE]",
    JOB_SEEKER: "bg-[#EEF0FF] text-[#5C5BE2]",
    EMPLOYER: "bg-[#E8F8EF] text-[#008B57]",
  };

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full px-3 py-[6px] text-[12px] font-medium ${styles[role]}`}
    >
      {formatRole(role)}
    </span>
  );
}

function ActionButton({
  user,
  selected,
  onClick,
}: {
  user: User;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <div className="relative flex justify-start">
      <button
        type="button"
        aria-label={`Actions for ${user.name}`}
        aria-expanded={selected}
        onClick={onClick}
        className="flex h-8 w-8 items-center justify-center rounded-md text-[#172238] transition hover:bg-[#F4F5F8]"
      >
        <span className="flex items-center gap-[3px]">
          <span className="h-[5px] w-[5px] rounded-full bg-current" />
          <span className="h-[5px] w-[5px] rounded-full bg-current" />
          <span className="h-[5px] w-[5px] rounded-full bg-current" />
        </span>
      </button>

      {selected && (
        <div className="absolute right-0 top-9 z-30 w-[220px] rounded-xl bg-white p-4 shadow-[0_10px_35px_rgba(20,30,50,0.12)] ring-1 ring-[#E5E8EF]">
          <p className="text-sm font-semibold text-[#1D293D]">
            {user.name}
          </p>
          <p className="mt-1 break-all text-xs text-[#71809A]">
            {user.email}
          </p>
          <p className="mt-3 text-xs text-[#66758F]">
            Role: {formatRole(user.role)}
          </p>
          <p className="mt-1 text-xs text-[#66758F]">
            Joined: {formatDate(user.createdAt)}
          </p>
        </div>
      )}
    </div>
  );
}
