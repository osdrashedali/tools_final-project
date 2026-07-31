// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/public/Home";
import About from "./pages/public/About";
import Contact from "./pages/public/Contact";
import CropTips from "./pages/public/CropTips";
import Marketplace from "./pages/public/Marketplace";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AdminDashboard from "./pages/dashboard/admin/AdminDashboard";
import FarmerDashboard from "./pages/dashboard/farmer/FarmerDashboard";
import ExpertDashboard from "./pages/dashboard/expert/ExpertDashboard";

const MainLayout = ({ children }) => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-1">{children}</main>
    <Footer />
  </div>
);

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
        <Routes>
          <Route path="/" element={<MainLayout><Home /></MainLayout>} />
          <Route path="/about" element={<MainLayout><About /></MainLayout>} />
          <Route path="/contact" element={<MainLayout><Contact /></MainLayout>} />
          <Route path="/crop-tips" element={<MainLayout><CropTips /></MainLayout>} />
          <Route path="/marketplace" element={<MainLayout><Marketplace /></MainLayout>} />
          <Route path="/login" element={<><Navbar /><Login /></>} />
          <Route path="/register" element={<><Navbar /><Register /></>} />
          <Route path="/dashboard/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
          <Route path="/dashboard/farmer" element={<PrivateRoute><FarmerDashboard /></PrivateRoute>} />
          <Route path="/dashboard/expert" element={<PrivateRoute><ExpertDashboard /></PrivateRoute>} />
          <Route path="*" element={<MainLayout><div className="flex items-center justify-center min-h-96 text-center"><div><div className="text-6xl mb-4">🌾</div><h2 className="text-2xl font-bold text-gray-800 mb-2">পেজ পাওয়া যায়নি</h2></div></div></MainLayout>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
