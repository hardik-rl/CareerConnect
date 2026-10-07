import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    try {
      setLoading(true);
      const response = await api.post("/api/auth/forgot-password", {
        email: email.trim(),
      });

      

      setMessage(response.data.message);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          "Something went wrong. Please try again."
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
              Forgot Password?
            </h1>

            <p className="mt-3 text-[15px] leading-6 text-[#6B7280]">
              No worries! Enter your registered email address and
              we'll send you a link to reset your password.
            </p>
          </div>

          {/* Success */}
          {message && (
            <div className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm leading-5 text-green-700">
              {message}
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-5 text-red-600">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-[#374151]"
              >
                Email Address
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                autoComplete="email"
                className="h-12 w-full rounded-xl border border-[#D1D5DB] bg-white px-4 text-sm text-[#111827] outline-none transition placeholder:text-[#9CA3AF] focus:border-[#2563EB] focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="h-12 w-full rounded-xl bg-[#2563EB] px-4 text-sm font-semibold text-white transition hover:bg-[#1D4ED8] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          {/* Back to login */}
          <div className="mt-7 text-center">
            <Link
              to="/login"
              className="text-sm font-medium text-[#2563EB] transition hover:text-[#1D4ED8]"
            >
              ← Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
