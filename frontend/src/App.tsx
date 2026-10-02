import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './components/Home'
import JobList from './components/JobList'
import JobDetails from "./components/JobDetails";
import PublicJobSeekerJobDetails from "./jobseeker/pages/JobDetails";
import Companies from "./components/Companies";
import CompaniesDetails from "./components/CompaniesDetails";
import About from "./components/About";
import AdminLayout from "./admin/layouts/AdminLayout";
import AdminDashboard from "./admin/pages/Dashboard";
import Users from "./admin/pages/Users";
import CompaniesPage from "./admin/pages/Companies";
import JobsPage from "./admin/pages/Jobs";
import ApplicationsPage from "./admin/pages/Applications";
import ReportsPage from "./admin/pages/Reports";
import SettingsPage from "./admin/pages/Settings";
import PublicLayout from "./layout/PublicLayout";
import { HeaderProvider } from "./admin/context/HeaderContext";
import Login from "./auth/Login";
import Register from "./auth/Register";
import ProtectedRoute from "./routes/ProtectedRoute";
import Profile from "./admin/pages/Profile";
import MyApplications from "./admin/pages/MyApplications";
import JobSeekerProfile from "./jobseeker/pages/JobSeekerProfile";
import JobSeekerDashboard from "./jobseeker/pages/Dashboard";
import JobSeekerLayout from "./jobseeker/layouts/JobSeekerLayout";
import JobSeekerApplications from "./jobseeker/pages/JobSeekerApplications";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* user Routes */}

          <Route path="/" element={<PublicLayout />}>
            <Route
              index
              element={<Home />}
            />
            <Route path="/job-list" element={<JobList />} />
            <Route path="/jobs/:id" element={<JobDetails />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/companies/:id" element={<CompaniesDetails />} />
            <Route path="/career-advice" element={<About />} />


          </Route>

          {/* Auth Route */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Admin Routes */}
          {/* <Route path="/admin" element={<HeaderProvider><AdminLayout /></HeaderProvider>}>
            <Route
              index 
              element={<AdminDashboard />}
            />

            <Route path="users" element={<Users />} />
            <Route path="companies" element={<CompaniesPage />} />
            <Route path="jobs" element={<JobsPage />} />
            <Route path="applications" element={<ApplicationsPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route> */}
          <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
            <Route path="/admin" element={<HeaderProvider>
              <AdminLayout /></HeaderProvider>}>
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<Users />} />
              <Route path="companies" element={<CompaniesPage />} />
              <Route path="jobs" element={<JobsPage />} />
              <Route path="applications" element={<ApplicationsPage />} />
              <Route path="reports" element={<ReportsPage />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Route>

          {/* Job Seeker Role */}
          <Route element={<ProtectedRoute allowedRoles={["JOB_SEEKER"]} />}>
            <Route path="/job-seeker" element={<HeaderProvider>
              <JobSeekerLayout /></HeaderProvider>}>
              <Route path="/job-seeker/dashboard" element={<JobSeekerDashboard />} />
                <Route path="/job-seeker/jobs/:id" element={<PublicJobSeekerJobDetails />} />
              <Route path="/job-seeker/profile" element={<JobSeekerProfile />} />
              <Route path="/job-seeker/applications" element={<JobSeekerApplications />} />
            </Route>
            {/* <Route path="/dashboard" element={<JobSeekerDashboard />} /> */}
          </Route>

          {/* Job Seeker Role */}
          <Route element={<ProtectedRoute allowedRoles={["EMPLOYER"]} />}>
            <Route path="/employer/profile" element={<Profile />} />
            <Route path="/employer/applications" element={<MyApplications />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
