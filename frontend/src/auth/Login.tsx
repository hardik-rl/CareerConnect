import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setError("");

    if (!form.email || !form.password) {
      setError("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post(
        "/api/auth/login",
        form
      );

      const data = response.data;

      console.log("LOGIN RESPONSE:", data);

      const authData = data.data;

      if (!authData?.token) {
        throw new Error("Token was not returned by server.");
      }

      if (data.data?.token && data.data?.user) {
        login(data.data.user, data.data.token);

        if (data.data.user.role === "ADMIN") {
          navigate("/admin");
        } else if (data.data.user.role === "JOB_SEEKER") {
          navigate("/job-seeker/profile");
        } else if (data.data.user.role === "EMPLOYER") {
          navigate("/employer/dashboard");
        } else {
          navigate("/");
        }
      }

    } catch (err: any) {
      console.error("LOGIN ERROR:", err);

      setError(
        err?.response?.data?.message ||
        err?.message ||
        "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link
          to="/"
          className="block text-center text-3xl font-bold text-[#111827] mb-8"
        >
          Career<span className="text-[#2563EB]">Connect</span>
        </Link>

        {/* Card */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-[#111827]">
              Welcome back
            </h1>

            <p className="mt-2 text-sm text-[#6B7280]">
              Sign in to continue to CareerConnect
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#374151] mb-2"
              >
                Email address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full h-12 rounded-lg border border-[#D1D5DB] px-4 text-sm text-[#111827] outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-[#374151]"
                >
                  Password
                </label>

                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-[#2563EB] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full h-12 rounded-lg border border-[#D1D5DB] px-4 text-sm text-[#111827] outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Remember */}
            <div className="flex items-center gap-2">
              <input
                id="remember"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />

              <label
                htmlFor="remember"
                className="text-sm text-[#6B7280]"
              >
                Remember me
              </label>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-lg bg-[#2563EB] text-white font-semibold text-sm transition hover:bg-[#1D4ED8] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          {/* Register */}
          <div className="mt-7 text-center text-sm text-[#6B7280]">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-[#2563EB] hover:underline"
            >
              Create account
            </Link>
          </div>
        </div>

        <p className="text-center text-xs text-[#9CA3AF] mt-6">
          © {new Date().getFullYear()} CareerConnect. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;