import React, { useState } from 'react';
import { mockData } from '../data/mockData';
import JobDetailModal from '../components/CompanyJobs/JobDetailModal';
import ResumeSelectionModal from '../components/CompanyJobs/ResumeSelectionModal';

const CompanyJobsPage = () => {
  const { companyJobs } = mockData;
  const [selectedJob, setSelectedJob] = useState(null);
  const [isJobDetailModalOpen, setIsJobDetailModalOpen] = useState(false);
  const [isResumeSelectionModalOpen, setIsResumeSelectionModalOpen] = useState(false);

  console.log('CompanyJobsPage rendering with data:', companyJobs.title);

  const handleJobClick = (job) => {
    console.log('Job clicked:', job.company, job.position);
    setSelectedJob(job);
    setIsJobDetailModalOpen(true);
  };

  const handleApplyClick = (job) => {
    console.log('Apply button clicked for:', job.position);
    setSelectedJob(job);
    setIsResumeSelectionModalOpen(true);
  };

  const handleJobDetailModalClose = () => {
    setIsJobDetailModalOpen(false);
    setSelectedJob(null);
  };

  const handleResumeSelectionModalClose = () => {
    setIsResumeSelectionModalOpen(false);
    setSelectedJob(null);
  };

  const handleResumeSubmit = (resumeId) => {
    console.log('简历投递成功:', { jobId: selectedJob.id, resumeId });
    // 这里可以添加投递成功后的逻辑，比如更新投递记录等
  };

  const getStepStatusClass = (status) => {
    switch (status) {
      case 'completed': return 'step-completed';
      case 'current': return 'step-current';
      case 'pending': return 'step-pending';
      default: return 'step-pending';
    }
  };

  const getStepColor = (color) => {
    return `step-${color}`;
  };

  return (
    <div className="company-jobs-page">
      {/* 页面标题 */}
      <div className="page-header">
        <h1 className="page-title">{companyJobs.title}</h1>
        <p className="page-subtitle">{companyJobs.subtitle}</p>
      </div>

      {/* 主要内容区域 */}
      <div className="jobs-content">
        {/* 左侧 - 企业内推岗位库 */}
        <div className="company-positions-section">
          <div className="section-card">
            <div className="section-header">
              <h2 className="section-title">企业内推岗位库</h2>
            </div>
            <div className="positions-list">
              {companyJobs.companyPositions.map((job) => (
                <div 
                  key={job.id} 
                  className={`position-card ${job.isRecommended ? 'recommended' : ''}`}
                  onClick={() => handleJobClick(job)}
                >
                  <div className="position-header">
                    <div className="company-info">
                      <div className="company-name">{job.company}</div>
                      <div className="position-type">{job.type}</div>
                    </div>
                    {job.isRecommended && (
                      <div className="recommended-badge">推荐</div>
                    )}
                  </div>
                  <div className="position-details">
                    <div className="position-title">{job.position}</div>
                    <div className="position-salary">{job.salary}</div>
                    <div className="position-deadline">{job.deadline}</div>
                  </div>
                  <div className="position-tags">
                    {job.tags.map((tag, index) => (
                      <span key={index} className="position-tag">{tag}</span>
                    ))}
                  </div>
                  <div className="position-actions">
                    <button 
                      className="apply-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleApplyClick(job);
                      }}
                    >
                      投递
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 右侧上方 - 内推岗位面试 */}
        <div className="internal-positions-section">
          <div className="section-card">
            <div className="section-header">
              <h2 className="section-title">内推岗位面试</h2>
            </div>
            <div className="internal-positions-list">
              {companyJobs.internalPositions.map((job) => (
                <div key={job.id} className="internal-position-card">
                  <div className="internal-position-info">
                    <div className="position-company">{job.position}</div>
                    <div className="position-details">
                      <span className="position-salary">{job.salary}</span>
                    </div>
                    <div className="interview-time">{job.interviewTime}</div>
                  </div>
                  <div className="internal-position-actions">
                    <span className={`position-status ${job.status}`}>{job.statusText}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 右侧下方 - 岗位陪跑流程 */}
        <div className="job-flow-section">
          <div className="section-card">
            <div className="section-header">
              <h2 className="section-title">岗位陪跑流程</h2>
            </div>
            <div className="flow-container">
              <div className="flow-steps">
                {companyJobs.jobFlow.steps.map((step, index) => (
                  <div key={step.id} className="flow-step-wrapper">
                    <div className={`flow-step ${getStepStatusClass(step.status)} ${getStepColor(step.color)}`}>
                      <div className="step-circle">
                        <div className="step-icon"></div>
                      </div>
                      <div className="step-name">{step.name}</div>
                    </div>
                    {index < companyJobs.jobFlow.steps.length - 1 && (
                      <div className="flow-connector"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 岗位详情弹窗 */}
      <JobDetailModal
        job={selectedJob}
        isOpen={isJobDetailModalOpen}
        onClose={handleJobDetailModalClose}
        onApply={handleApplyClick}
      />

      {/* 简历选择弹窗 */}
      <ResumeSelectionModal
        job={selectedJob}
        isOpen={isResumeSelectionModalOpen}
        onClose={handleResumeSelectionModalClose}
        onSubmit={handleResumeSubmit}
      />
    </div>
  );
};

export default CompanyJobsPage; 