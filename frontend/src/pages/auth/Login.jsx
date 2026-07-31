// src/pages/auth/Login.jsx
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { GiWheat } from "react-icons/gi";

const Login = () => {
  const { login, googleLogin, githubLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success("স্বাগতম!");
      navigate(from, { replace: true });
    } catch {
      toast.error("Email বা Password ভুল।");
    }
    setLoading(false);
  };

  const handleSocial = async (loginFn) => {
    try {
      await loginFn();
      toast.success("স্বাগতম!");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center py-12 px-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 w-full max-w-md p-8">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 text-green-700 font-bold text-xl mb-1">
            <GiWheat className="text-2xl" />
            কৃষি সেবা
          </div>
          <p className="text-gray-500 text-sm">আপনার অ্যাকাউন্টে প্রবেশ করুন</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">ইমেইল</label>
            <input type="email" required className="input" placeholder="email@example.com"
              value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">পাসওয়ার্ড</label>
            <input type="password" required className="input" placeholder="••••••"
              value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? "লোড হচ্ছে..." : "Login করুন"}
          </button>
        </form>

        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-gray-100" />
          <span className="text-xs text-gray-400">অথবা</span>
          <div className="flex-1 h-px bg-gray-100" />
        </div>

        <div className="space-y-3">
          <button
            onClick={() => handleSocial(googleLogin)}
            className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-lg py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <FaGoogle className="text-red-500" /> Google দিয়ে Login করুন
          </button>
          <button
            onClick={() => handleSocial(githubLogin)}
            className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-lg py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <FaGithub /> GitHub দিয়ে Login করুন
          </button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-5">
          অ্যাকাউন্ট নেই?{" "}
          <Link to="/register" className="text-green-600 font-medium hover:underline">Register করুন</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
