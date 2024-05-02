import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import App from './App';
import User from './components/User/User';
import Admin from './components/Admin/Admin';
import HomePage from './components/Home/HomePage';
import Dashboard from './components/Admin/Content/DashBoard';
import ManageUser from './components/Admin/Content/ManageUser';
import ManageQuiz from './components/Admin/Content/Quiz/ManageQuiz';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import ListQuiz from './components/User/ListQuiz';
import DetailQuiz from './components/User/DetailQuiz';
import Questions from './components/Admin/Content/Question/Questions';
import PrivateRoute from './routes/PrivateRoute';
import { Suspense } from 'react';

const NotFound = () => {
  return <div className="container alert alert-danger mt-4">404. Not Found data with your current URL</div>;
};

const Layout = () => {
  return (
    <Suspense fallback={<div>Loading....</div>}>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route
            path="user"
            element={
              <PrivateRoute>
                <ListQuiz />
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="/quiz/:id" element={<DetailQuiz />} />

        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="manage-user" element={<ManageUser />} />
          <Route path="manage-quiz" element={<ManageQuiz />} />
          <Route path="manage-question" element={<Questions />} />
        </Route>

        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Suspense>
  );
};

export default Layout;
