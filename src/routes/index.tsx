import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';


import MainLayout from '@/layouts/MainLayout';
import LoadingDots from '@/components/LoadingDots';

const JobList = React.lazy(() => import('@/features/jobs/JobList'));
const JobCreate = React.lazy(() => import('@/features/jobs/ApplyJob'));
const CandidatePortal = React.lazy(() => import('@/features/candidates/CandidatePortal'));
const JobDetails = React.lazy(() => import('@/features/jobs/JobDetails'));

const CandidateDetails = React.lazy(() => import('@/features/candidates/CandidateDetails'));
const CallInsightView = React.lazy(() => import('@/features/candidates/CallInsightView'));

const AppRoutes: React.FC = () => (
  <BrowserRouter>
    <React.Suspense fallback={<LoadingDots />}>
      <Routes>
      
        <Route
          path="/"
          element={
            <MainLayout />
          }
        >
         
          <Route path="jobs">
            <Route path="list" element={<JobList />} />
            <Route path="create" element={<JobCreate />} />
            <Route path=":jobId" element={<JobDetails />} />
            {/* Add JobDetails here later */}
          </Route>
          <Route path="candidates">
  <Route index element={<CandidatePortal />} />
  <Route path=":id" element={<CandidateDetails />} />
  <Route path=":id/call-insights" element={<CallInsightView />} />
</Route>
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </React.Suspense>
  </BrowserRouter>
);

export default AppRoutes;