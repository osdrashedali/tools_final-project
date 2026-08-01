// src/pages/dashboard/farmer/FarmerDashboard.jsx
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { FaSeedling, FaShoppingCart, FaUser, FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";

const initProblems = [
  { id: 1, crop: "ধান", title: "পাতা হলুদ হয়ে যাচ্ছে", desc: "ধানের পাতার রঙ হলুদ হয়ে ঝরে পড়ছে।", status: "Solved", date: "২৫ জুলাই" },
  { id: 2, crop: "সবজি", title: "পোকামাকড়ের আক্রমণ", desc: "মরিচ গাছে সাদা পোকার আক্রমণ।", status: "Pending", date: "২৮ জুলাই" },
];

const initOrders = [
  { id: "#O01", product: "ইউরিয়া সার", qty: 3, total: 960, status: "Delivered" },
  { id: "#O02", product: "ধানের বীজ", qty: 2, total: 360, status: "Processing" },
];

const FarmerDashboard = () => {
  const { user } = useAuth();
  const [tab, setTab] = useState("problems");
  const [problems, setProblems] = useState(initProblems);
  const [orders] = useState(initOrders);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({ crop: "ধান", title: "", desc: "" });

  const crops = ["ধান", "গম", "সবজি", "ফল", "মশলা", "অন্যান্য"];

  const handleSave = () => {
    if (!form.title || !form.desc) return toast.error("সব তথ্য পূরণ করুন।");
    if (editItem) {
      setProblems(problems.map((p) => p.id === editItem.id ? { ...editItem, ...form } : p));
      toast.success("সমস্যা আপডেট হয়েছে!");
    } else {
      setProblems([...problems, { id: Date.now(), ...form, status: "Pending", date: "আজ" }]);
      toast.success("সমস্যা পোস্ট করা হয়েছে!");
    }
    setShowForm(false); setEditItem(null);
    setForm({ crop: "ধান", title: "", desc: "" });
  };

  const handleDelete = (id) => {
    setProblems(problems.filter((p) => p.id !== id));
    toast.success("মুছে ফেলা হয়েছে।");
  };

  const tabClass = (t) => `px-4 py-2 text-sm font-medium rounded-lg transition-colors ${tab === t ? "bg-green-600 text-white" : "text-gray-600 hover:bg-gray-100"}`;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-8 py-5 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Farmer Dashboard</h1>
          <p className="text-sm text-gray-500">স্বাগতম, {user?.displayName || "Farmer"}</p>
        </div>
        <span className="badge-green">🌾 Farmer</span>
      </div>

      <div className="max-w-5xl mx-auto px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-5 mb-8">
          {[
            { label: "আমার সমস্যা", value: problems.length, icon: <FaSeedling />, color: "text-green-500" },
            { label: "অর্ডার", value: orders.length, icon: <FaShoppingCart />, color: "text-blue-500" },
            { label: "Solved", value: problems.filter((p) => p.status === "Solved").length, icon: <FaUser />, color: "text-amber-500" },
          ].map((s) => (
            <div key={s.label} className="card flex items-center gap-4">
              <div className={`text-3xl ${s.color}`}>{s.icon}</div>
              <div>
                <div className="text-2xl font-bold text-gray-800">{s.value}</div>
                <div className="text-sm text-gray-500">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {[["problems", "আমার সমস্যা"], ["orders", "আমার অর্ডার"], ["profile", "প্রোফাইল"]].map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)} className={tabClass(key)}>{label}</button>
          ))}
        </div>

        {/* ── Problems Tab ── */}
        {tab === "problems" && (
          <div>
            <div className="flex justify-between items-center mb-5">
              <h3 className="font-semibold text-gray-800">আমার সমস্যাসমূহ</h3>
              <button onClick={() => { setShowForm(true); setEditItem(null); }} className="btn-primary text-sm flex items-center gap-2">
                <FaPlus className="text-xs" /> সমস্যা পোস্ট করুন
              </button>
            </div>

            {/* Form Modal */}
            {showForm && (
              <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
                  <h4 className="font-semibold text-gray-800 mb-4">{editItem ? "সমস্যা এডিট" : "নতুন সমস্যা পোস্ট"}</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-gray-600 mb-1 block">ফসলের ধরন</label>
                      <select className="input" value={form.crop} onChange={(e) => setForm({ ...form, crop: e.target.value })}>
                        {crops.map((c) => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                    <input className="input" placeholder="সমস্যার শিরোনাম" value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })} />
                    <textarea className="input resize-none" rows={3} placeholder="বিস্তারিত বিবরণ লিখুন..."
                      value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} />
                  </div>
                  <div className="flex gap-3 mt-4">
                    <button onClick={handleSave} className="btn-primary flex-1">পোস্ট করুন</button>
                    <button onClick={() => setShowForm(false)} className="btn-outline flex-1">বাতিল</button>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {problems.map((p) => (
                <div key={p.id} className="card">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="badge-green">{p.crop}</span>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${p.status === "Solved" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                          {p.status}
                        </span>
                        <span className="text-xs text-gray-400">{p.date}</span>
                      </div>
                      <h4 className="font-semibold text-gray-800">{p.title}</h4>
                      <p className="text-sm text-gray-500 mt-1">{p.desc}</p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button onClick={() => { setEditItem(p); setForm({ crop: p.crop, title: p.title, desc: p.desc }); setShowForm(true); }}
                        className="text-blue-400 hover:text-blue-600 transition-colors"><FaEdit /></button>
                      <button onClick={() => handleDelete(p.id)} className="text-red-400 hover:text-red-600 transition-colors"><FaTrash /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Orders Tab ── */}
        {tab === "orders" && (
          <div className="card">
            <h3 className="font-semibold text-gray-800 mb-5">আমার অর্ডারসমূহ</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-gray-500 text-left">
                  <th className="pb-3 font-medium">Order ID</th>
                  <th className="pb-3 font-medium">পণ্য</th>
                  <th className="pb-3 font-medium">পরিমাণ</th>
                  <th className="pb-3 font-medium">মোট</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-3 text-gray-500">{o.id}</td>
                    <td className="py-3 font-medium text-gray-800">{o.product}</td>
                    <td className="py-3 text-gray-500">{o.qty}</td>
                    <td className="py-3 text-green-600 font-medium">৳{o.total}</td>
                    <td className="py-3">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${o.status === "Delivered" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}>
                        {o.status}
                      </span>
                    </td>
                    <td className="py-3">
                      {o.status !== "Delivered" && (
                        <button onClick={() => toast("অর্ডার বাতিল করা হয়েছে")} className="text-xs text-red-500 hover:underline">বাতিল</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ── Profile Tab ── */}
        {tab === "profile" && (
          <div className="card max-w-md">
            <h3 className="font-semibold text-gray-800 mb-5">আমার প্রোফাইল</h3>
            <div className="flex items-center gap-4 mb-6 pb-5 border-b border-gray-100">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-3xl">
                {user?.photoURL ? <img src={user.photoURL} className="w-16 h-16 rounded-full" alt="" /> : "👨‍🌾"}
              </div>
              <div>
                <div className="font-semibold text-gray-800">{user?.displayName || "Farmer"}</div>
                <div className="text-sm text-gray-500">{user?.email}</div>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-600 mb-1 block">নাম</label>
                <input className="input" defaultValue={user?.displayName || ""} placeholder="আপনার নাম" />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">এলাকা</label>
                <input className="input" placeholder="আপনার জেলা/উপজেলা" />
              </div>
              <button onClick={() => toast.success("প্রোফাইল আপডেট হয়েছে!")} className="btn-primary w-full mt-2">
                আপডেট করুন
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmerDashboard;
