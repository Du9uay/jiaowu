import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import CalendarPage from './pages/CalendarPage';
import LivePage from './pages/LivePage';
import HomeworkPage from './pages/HomeworkPage';
import ProjectLibraryPage from './pages/ProjectLibraryPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import PersonalProfile from './pages/PersonalProfile';
import CareerTreePage from './pages/CareerTreePage';
import CompanyJobsPage from './pages/CompanyJobsPage';
import JobStrategyPage from './pages/JobStrategyPage';
import ResumeInterviewPage from './pages/ResumeInterviewPage';
import ResumeDetailPage from './pages/ResumeDetailPage';
import InterviewQAPage from './pages/InterviewQAPage';
import InterviewSimulationPage from './pages/InterviewSimulationPage';
import ExpertSupportPage from './pages/ExpertSupportPage';

// 样式文件导入
import './styles/layout.css';
import './styles/dashboard.css';
import './styles/personal-data-display.css';
import './styles/calendar.css';
import './styles/live.css';
import './styles/homework.css';
import './styles/project-library.css';
import './styles/project-detail.css';
import './styles/profile.css';
import './styles/career-tree.css';
import './styles/company-jobs.css';
import './styles/job-strategy.css';
import './styles/resume-interview.css';
import './styles/resume-detail.css';
import './styles/interview-qa.css';
import './styles/interview-simulation.css';
import './styles/expert-support.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/live" element={<LivePage />} />
          <Route path="/homework" element={<HomeworkPage />} />
          <Route path="/project-library" element={<ProjectLibraryPage />} />
          <Route path="/project/:id" element={<ProjectDetailPage />} />
          <Route path="/profile" element={<PersonalProfile />} />
          <Route path="/career-tree" element={<CareerTreePage />} />
          <Route path="/company-jobs" element={<CompanyJobsPage />} />
          <Route path="/job-strategy" element={<JobStrategyPage />} />
          <Route path="/resume-interview" element={<ResumeInterviewPage />} />
          <Route path="/resume/:industry/:position" element={<ResumeDetailPage />} />
          <Route path="/interview-qa/:industry/:position" element={<InterviewQAPage />} />
          <Route path="/interview-simulation" element={<InterviewSimulationPage />} />
          <Route path="/expert-support" element={<ExpertSupportPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
