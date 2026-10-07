import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import api from "../services/api";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!token) {
      setError("Invalid or missing reset token.");
      return;
    }

    if (!password || !confirmPassword) {
      setError("Please enter both passwords.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/api/auth/reset-password", {
        token,
        password,
      });

      setMessage(response.data.message);

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          "Unable to reset password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-[460px]">
        {/* Card */}
        <div className="rounded-2xl border border-[#E5E7EB] bg-white px-6 py-8 shadow-sm sm:px-10 sm:py-10">
          {/* Logo */}
          <div className="mb-8 text-center">
            <Link
              to="/"
              className="inline-block text-[28px] font-bold tracking-[-0.5px] text-[#2563EB]"
            >
              CareerConnect
            </Link>
          </div>

          {/* Heading */}
          <div className="mb-8 text-center">
            <h1 className="text-[28px] font-bold leading-tight text-[#111827]">
              Reset Password
            </h1>

            <p className="mt-3 text-[15px] leading-6 text-[#6B7280]">
              Create a new password for your CareerConnect account.
            </p>
          </div>

          {/* Success */}
          {message && (
            <div className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm leading-5 text-green-700">
              {message}
              <p className="mt-1 text-xs">
                Redirecting to login...
              </p>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-5 text-red-600">
              {error}
            </div>
          )}

          {!token && (
            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              This password reset link is invalid or incomplete.
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* New Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-[#374151]"
              >
                New Password
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                autoComplete="new-password"
                className="h-12 w-full rounded-xl border border-[#D1D5DB] bg-white px-4 text-sm text-[#111827] outline-none transition placeholder:text-[#9CA3AF] focus:border-[#2563EB] focus:ring-4 focus:ring-blue-100"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-medium text-[#374151]"
              >
                Confirm Password
              </label>

              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                placeholder="Confirm new password"
                autoComplete="new-password"
                className="h-12 w-full rounded-xl border border-[#D1D5DB] bg-white px-4 text-sm text-[#111827] outline-none transition placeholder:text-[#9CA3AF] focus:border-[#2563EB] focus:ring-4 focus:ring-blue-100"
              />
            </div>

            {/* Password requirement */}
            <p className="text-xs text-[#6B7280]">
              Password must contain at least 8 characters.
            </p>

            <button
              type="submit"
              disabled={loading || !token}
              className="h-12 w-full rounded-xl bg-[#2563EB] px-4 text-sm font-semibold text-white transition hover:bg-[#1D4ED8] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>

          {/* Login */}
          <div className="mt-7 text-center">
            <Link
              to="/login"
              className="text-sm font-medium text-[#2563EB] transition hover:text-[#1D4ED8]"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
