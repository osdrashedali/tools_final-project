// src/pages/dashboard/admin/AdminDashboard.jsx
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { FaUsers, FaBoxOpen, FaSeedling, FaShoppingCart, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import toast from "react-hot-toast";

// ── Demo data (replace with real API calls via axios) ──────────────
const initUsers = [
  { id: 1, name: "Rahim Khan", email: "rahim@example.com", role: "farmer" },
  { id: 2, name: "Dr. Sultana", email: "sultana@example.com", role: "expert" },
  { id: 3, name: "Karim Ali", email: "karim@example.com", role: "farmer" },
];

const initProducts = [
  { id: 1, name: "ইউরিয়া সার", price: 320, category: "সার", stock: 200 },
  { id: 2, name: "উফশী ধানের বীজ", price: 180, category: "বীজ", stock: 500 },
  { id: 3, name: "পাওয়ার টিলার", price: 45000, category: "যন্ত্রপাতি", stock: 10 },
];

const stats = [
  { label: "Total Users", value: "1,253", icon: <FaUsers />, color: "text-blue-500" },
  { label: "Products", value: "87", icon: <FaBoxOpen />, color: "text-green-500" },
  { label: "Problems", value: "342", icon: <FaSeedling />, color: "text-amber-500" },
  { label: "Orders", value: "519", icon: <FaShoppingCart />, color: "text-purple-500" },
];

// ── Admin Dashboard ────────────────────────────────────────────────
const AdminDashboard = () => {
  const { user } = useAuth();
  const [tab, setTab] = useState("overview");
  const [users, setUsers] = useState(initUsers);
  const [products, setProducts] = useState(initProducts);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [productForm, setProductForm] = useState({ name: "", price: "", category: "সার", stock: "" });

  // ── Product CRUD ──
  const handleSaveProduct = () => {
    if (!productForm.name || !productForm.price) return toast.error("সব তথ্য পূরণ করুন।");
    if (editProduct) {
      setProducts(products.map((p) => p.id === editProduct.id ? { ...editProduct, ...productForm } : p));
      toast.success("পণ্য আপডেট হয়েছে!");
    } else {
      setProducts([...products, { id: Date.now(), ...productForm }]);
      toast.success("নতুন পণ্য যোগ করা হয়েছে!");
    }
    setShowProductForm(false);
    setEditProduct(null);
    setProductForm({ name: "", price: "", category: "সার", stock: "" });
  };

  const handleEdit = (p) => {
    setEditProduct(p);
    setProductForm({ name: p.name, price: p.price, category: p.category, stock: p.stock });
    setShowProductForm(true);
  };

  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
    toast.success("পণ্য মুছে ফেলা হয়েছে।");
  };

  const makeAdmin = (id) => {
    setUsers(users.map((u) => u.id === id ? { ...u, role: "admin" } : u));
    toast.success("ব্যবহারকারীকে Admin করা হয়েছে!");
  };

  const tabClass = (t) => `px-4 py-2 text-sm font-medium rounded-lg transition-colors ${tab === t ? "bg-green-600 text-white" : "text-gray-600 hover:bg-gray-100"}`;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-5 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-sm text-gray-500">স্বাগতম, {user?.displayName || "Admin"}</p>
        </div>
        <span className="badge-green">Admin</span>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {[["overview", "Overview"], ["users", "Users"], ["products", "Products"], ["orders", "Orders"]].map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)} className={tabClass(key)}>{label}</button>
          ))}
        </div>

        {/* ── Overview ── */}
        {tab === "overview" && (
          <div>
            <div className="grid grid-cols-4 gap-5 mb-8">
              {stats.map((s) => (
                <div key={s.label} className="card flex items-center gap-4">
                  <div className={`text-3xl ${s.color}`}>{s.icon}</div>
                  <div>
                    <div className="text-2xl font-bold text-gray-800">{s.value}</div>
                    <div className="text-sm text-gray-500">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="card">
              <h3 className="font-semibold text-gray-800 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {["Rahim Khan একটি সমস্যা পোস্ট করেছেন", "Dr. Sultana একটি সমাধান দিয়েছেন", "৩টি নতুন অর্ডার এসেছে", "নতুন ব্যবহারকারী যোগ দিয়েছেন"].map((a, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-gray-600 py-2 border-b border-gray-50 last:border-0">
                    <span className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0"></span>
                    {a}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Users ── */}
        {tab === "users" && (
          <div className="card">
            <h3 className="font-semibold text-gray-800 mb-5">সব ব্যবহারকারী</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-gray-500 text-left">
                  <th className="pb-3 font-medium">নাম</th>
                  <th className="pb-3 font-medium">Email</th>
                  <th className="pb-3 font-medium">Role</th>
                  <th className="pb-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-3 font-medium text-gray-800">{u.name}</td>
                    <td className="py-3 text-gray-500">{u.email}</td>
                    <td className="py-3">
                      <span className={`badge-${u.role === "admin" ? "earth" : u.role === "expert" ? "green" : ""} text-xs px-2 py-1 rounded-full ${u.role === "farmer" ? "bg-gray-100 text-gray-600" : ""}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3">
                      {u.role !== "admin" && (
                        <button
                          onClick={() => makeAdmin(u.id)}
                          className="text-xs text-blue-600 border border-blue-200 px-3 py-1 rounded-lg hover:bg-blue-50 transition-colors"
                        >
                          Make Admin
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ── Products ── */}
        {tab === "products" && (
          <div>
            <div className="flex justify-between items-center mb-5">
              <h3 className="font-semibold text-gray-800">সব পণ্য</h3>
              <button
                onClick={() => { setShowProductForm(true); setEditProduct(null); setProductForm({ name: "", price: "", category: "সার", stock: "" }); }}
                className="btn-primary text-sm flex items-center gap-2"
              >
                <FaPlus className="text-xs" /> নতুন পণ্য
              </button>
            </div>

            {/* Product Form Modal */}
            {showProductForm && (
              <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
                  <h4 className="font-semibold text-gray-800 mb-4">
                    {editProduct ? "পণ্য এডিট করুন" : "নতুন পণ্য যোগ করুন"}
                  </h4>
                  <div className="space-y-3">
                    <input className="input" placeholder="পণ্যের নাম" value={productForm.name}
                      onChange={(e) => setProductForm({ ...productForm, name: e.target.value })} />
                    <input className="input" placeholder="দাম (৳)" type="number" value={productForm.price}
                      onChange={(e) => setProductForm({ ...productForm, price: e.target.value })} />
                    <select className="input" value={productForm.category}
                      onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}>
                      {["সার", "বীজ", "যন্ত্রপাতি"].map((c) => <option key={c}>{c}</option>)}
                    </select>
                    <input className="input" placeholder="স্টক পরিমাণ" type="number" value={productForm.stock}
                      onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })} />
                  </div>
                  <div className="flex gap-3 mt-4">
                    <button onClick={handleSaveProduct} className="btn-primary flex-1">Save</button>
                    <button onClick={() => setShowProductForm(false)} className="btn-outline flex-1">Cancel</button>
                  </div>
                </div>
              </div>
            )}

            <div className="card">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-500 text-left">
                    <th className="pb-3 font-medium">পণ্য</th>
                    <th className="pb-3 font-medium">Category</th>
                    <th className="pb-3 font-medium">দাম</th>
                    <th className="pb-3 font-medium">Stock</th>
                    <th className="pb-3 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="py-3 font-medium text-gray-800">{p.name}</td>
                      <td className="py-3"><span className="badge-green">{p.category}</span></td>
                      <td className="py-3 text-green-600 font-medium">৳{Number(p.price).toLocaleString()}</td>
                      <td className="py-3 text-gray-500">{p.stock}</td>
                      <td className="py-3 flex gap-2">
                        <button onClick={() => handleEdit(p)} className="text-blue-500 hover:text-blue-700 transition-colors"><FaEdit /></button>
                        <button onClick={() => handleDelete(p.id)} className="text-red-400 hover:text-red-600 transition-colors"><FaTrash /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── Orders ── */}
        {tab === "orders" && (
          <div className="card">
            <h3 className="font-semibold text-gray-800 mb-5">সব অর্ডার</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-gray-500 text-left">
                  <th className="pb-3 font-medium">Order ID</th>
                  <th className="pb-3 font-medium">পণ্য</th>
                  <th className="pb-3 font-medium">কৃষক</th>
                  <th className="pb-3 font-medium">দাম</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {[{ id: "#001", product: "ইউরিয়া সার", buyer: "Rahim", price: 960, status: "Delivered" },
                  { id: "#002", product: "ধানের বীজ", buyer: "Karim", price: 360, status: "Processing" },
                  { id: "#003", product: "পাওয়ার টিলার", buyer: "Hasan", price: 45000, status: "Pending" },
                ].map((o) => (
                  <tr key={o.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-3 text-gray-500">{o.id}</td>
                    <td className="py-3 font-medium text-gray-800">{o.product}</td>
                    <td className="py-3 text-gray-500">{o.buyer}</td>
                    <td className="py-3 text-green-600 font-medium">৳{o.price.toLocaleString()}</td>
                    <td className="py-3">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        o.status === "Delivered" ? "bg-green-100 text-green-700"
                        : o.status === "Processing" ? "bg-blue-100 text-blue-700"
                        : "bg-amber-100 text-amber-700"
                      }`}>{o.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
