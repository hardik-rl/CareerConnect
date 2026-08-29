import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './components/Home'
import JobList from './components/JobList'
import Header from "./shared/Header";
import JobDetails from "./components/JobDetails";
import Companies from "./components/Companies";
import CompaniesDetails from "./components/CompaniesDetails";
import About from "./components/About";

function App() {

  return (
    <>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/job-list" element={<JobList />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/companies/:id" element={<CompaniesDetails/>} />
        <Route path="/career-advice" element={<About />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
