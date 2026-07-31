// src/pages/auth/Register.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { GiWheat as Wheat } from "react-icons/gi";
import axios from "axios";

const Register = () => {
  const { register, updateUserProfile, googleLogin, githubLogin } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "", role: "farmer" });
  const [loading, setLoading] = useState(false);

  // Save user to MongoDB after Firebase registration
  const saveUserToDB = async (user, role) => {
    await axios.post(`${import.meta.env.VITE_API_URL}/users`, {
      name: user.displayName,
      email: user.email,
      photo: user.photoURL || "",
      role,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) return toast.error("Password must be at least 6 characters.");
    setLoading(true);
    try {
      const result = await register(form.email, form.password);
      await updateUserProfile(form.name, "");
      await saveUserToDB({ ...result.user, displayName: form.name }, form.role);
      toast.success("Registration successful!");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
    setLoading(false);
  };

  const handleSocialLogin = async (loginFn) => {
    try {
      const result = await loginFn();
      await saveUserToDB(result.user, "farmer");
      toast.success("Logged in!");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center py-12 px-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 w-full max-w-md p-8">
        {/* Logo */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 text-green-700 font-bold text-xl mb-1">
            <Wheat className="text-2xl" />
            কৃষি সেবা
          </div>
          <p className="text-gray-500 text-sm">নতুন অ্যাকাউন্ট তৈরি করুন</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">পূর্ণ নাম</label>
            <input type="text" required className="input" placeholder="আপনার নাম"
              value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">ইমেইল</label>
            <input type="email" required className="input" placeholder="email@example.com"
              value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">পাসওয়ার্ড</label>
            <input type="password" required className="input" placeholder="কমপক্ষে ৬ অক্ষর"
              value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          </div>
          {/* Role selection */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">আপনি কে?</label>
            <div className="grid grid-cols-2 gap-3">
              {[{ value: "farmer", label: "🌾 কৃষক (Farmer)" }, { value: "expert", label: "👨‍🔬 বিশেষজ্ঞ (Expert)" }].map((r) => (
                <label
                  key={r.value}
                  className={`flex items-center justify-center gap-2 border rounded-lg py-2.5 cursor-pointer text-sm transition-colors ${
                    form.role === r.value
                      ? "border-green-500 bg-green-50 text-green-700 font-medium"
                      : "border-gray-200 text-gray-600 hover:border-green-300"
                  }`}
                >
                  <input type="radio" name="role" value={r.value} className="hidden"
                    checked={form.role === r.value}
                    onChange={() => setForm({ ...form, role: r.value })} />
                  {r.label}
                </label>
              ))}
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full mt-2">
            {loading ? "লোড হচ্ছে..." : "Register করুন"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-gray-100" />
          <span className="text-xs text-gray-400">অথবা</span>
          <div className="flex-1 h-px bg-gray-100" />
        </div>

        {/* Social Login */}
        <div className="space-y-3">
          <button
            onClick={() => handleSocialLogin(googleLogin)}
            className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-lg py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <FaGoogle className="text-red-500" /> Google দিয়ে Login করুন
          </button>
          <button
            onClick={() => handleSocialLogin(githubLogin)}
            className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-lg py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <FaGithub /> GitHub দিয়ে Login করুন
          </button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-5">
          ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
          <Link to="/login" className="text-green-600 font-medium hover:underline">Login করুন</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
