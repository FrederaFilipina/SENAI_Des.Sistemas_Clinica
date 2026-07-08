import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { AuthProvider } from './context/AuthContext.jsx';
import PrivateRoute from './router/Private.Route.jsx';
import { ToastContainer } from 'react-toastify';
import Login from './pages/Login/Login.jsx'
import DashboardLayout from './layout/DashboardLayout.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import MedicalRecordList from './components/MedicalRecordList/MedicalRecordList.jsx';
import RegisterFormPatient from './components/RegisterFormPatient/RegisterFormPatient.jsx';
import ConsultationForm from './components/ConsultationForm/ConsultationForm.jsx';
import ExamsForm from './components/ExamForm/ExamForm.jsx';
import PatientDetails from './components/PatientsDetails/PatientsDetails.jsx';
import ExamsList from './components/examList/examList.jsx';
import Medicamentos from './components/Medicamentos/Medicamentos.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },
  {
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children:[
      {path: '/dashboard', element: <Dashboard />},
      {path: '/prontuarios', element: <MedicalRecordList />},
      {path: '/pacientes', element: <RegisterFormPatient />},
      {path: '/consultas', element: <ConsultationForm /> },
      {path: '/exames', element: <ExamsForm />},
      { path: "/exames-list", element: <ExamsList /> },
      {path: '/medicamentos', element: <Medicamentos />},
      {path: '/pacientes/:id', element: <PatientDetails />}
    ]
  }
  
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ToastContainer />
        <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
