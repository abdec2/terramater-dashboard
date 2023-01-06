import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import auth from "./auth/auth";



const ProtectedRoute = ({ children }) => {
  const isAuth = auth.getToken() !== null;
  return (
      isAuth ? children : <Navigate to="/auth/sign-in" replace />
  )
};

function App() {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard">
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>  
        } />
      </Route>
      <Route path="/auth/*" element={<Auth />} />
      
    </Routes>
  );
}

export default App;
// <Navigate to="/dashboard/home" replace />