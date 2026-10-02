import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: "JOB_SEEKER" | "EMPLOYER";
}

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState<RegisterForm>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "JOB_SEEKER",
  });

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");

    // Validation
    if (!form.name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!form.email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!form.password) {
      setError("Please enter a password.");
      return;
    }

    if (!form.confirmPassword) {
      setError("Please confirm your password.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!termsAccepted) {
      setError("Please accept the terms and privacy policy.");
      return;
    }

    try {
      setLoading(true);

      const apiUrl =
        import.meta.env.VITE_API_URL || "http://localhost:5000";

      const response = await fetch(
        `${apiUrl}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: form.name.trim(),
            email: form.email.trim(),
            password: form.password,
            role: form.role,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Registration failed."
        );
      }

      // Registration successful
      navigate("/login", {
        replace: true,
        state: {
          message: "Account created successfully. Please sign in.",
        },
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4 py-8 sm:py-10">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <Link
          to="/"
          className="block text-center text-3xl font-bold text-[#111827] mb-8"
        >
          Career<span className="text-[#2563EB]">Connect</span>
        </Link>

        {/* Card */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm p-6 sm:p-8">
          {/* Heading */}
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#111827]">
              Create your account
            </h1>

            <p className="mt-2 text-sm text-[#6B7280]">
              Join CareerConnect and take the next step in your career
            </p>
          </div>

          {/* Error */}
          {error && (
            <div
              role="alert"
              className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-[#374151] mb-2"
              >
                Full name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full h-12 rounded-lg border border-[#D1D5DB] px-4 text-sm outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100"
              />
            </div>

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
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full h-12 rounded-lg border border-[#D1D5DB] px-4 text-sm outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Role */}
            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-[#374151] mb-2"
              >
                I am signing up as
              </label>

              <select
                id="role"
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full h-12 rounded-lg border border-[#D1D5DB] px-4 text-sm bg-white outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100"
              >
                <option value="JOB_SEEKER">Job seeker</option>
                <option value="EMPLOYER">Employer</option>
              </select>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[#374151] mb-2"
              >
                Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                value={form.password}
                onChange={handleChange}
                placeholder="Create a password"
                className="w-full h-12 rounded-lg border border-[#D1D5DB] px-4 text-sm outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-[#374151] mb-2"
              >
                Confirm password
              </label>

              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="w-full h-12 rounded-lg border border-[#D1D5DB] px-4 text-sm outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3">
              <input
                id="terms"
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) =>
                  setTermsAccepted(e.target.checked)
                }
                className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />

              <label
                htmlFor="terms"
                className="text-sm leading-5 text-[#6B7280]"
              >
                I agree to the CareerConnect terms and privacy policy.
              </label>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-lg bg-[#2563EB] text-white font-semibold text-sm transition hover:bg-[#1D4ED8] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Creating account..."
                : "Create account"}
            </button>
          </form>

          {/* Login */}
          <div className="mt-7 text-center text-sm text-[#6B7280]">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-[#2563EB] hover:underline"
            >
              Sign in
            </Link>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-[#9CA3AF] mt-6">
          © {new Date().getFullYear()} CareerConnect. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Register;