import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import MainLayout from '@/layouts/MainLayout';
import LoadingDots from '@/components/LoadingDots';
import LoginForm from '@/features/auth/LoginForm';
import ProtectedRoute from './ProtectedRoute';

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
        <Route path="/login" element={<LoginForm />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          {/* Redirect root path to /jobs/list */}
          <Route index element={<Navigate to="/jobs/list" replace />} />

          <Route path="jobs">
            <Route path="list" element={<JobList />} />
            <Route path="create" element={<JobCreate />} />
            <Route path=":jobId" element={<JobDetails />} />
          </Route>

          <Route path="candidates">
            <Route index element={<CandidatePortal />} />
            <Route path=":id" element={<CandidateDetails />} />
            <Route path=":id/call-insights" element={<CallInsightView />} />
          </Route>
        </Route>

        {/* Catch-all: Redirect unknown paths to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </React.Suspense>
  </BrowserRouter>
);

export default AppRoutes;
