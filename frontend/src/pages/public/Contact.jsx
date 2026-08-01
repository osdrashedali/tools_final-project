// src/pages/public/Contact.jsx
import { useState } from "react";
import toast from "react-hot-toast";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Connect to backend POST /contact
    toast.success("বার্তা পাঠানো হয়েছে! আমরা শীঘ্রই যোগাযোগ করব।");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div>
      {/* Header */}
      <section className="bg-green-700 text-white py-20 px-6 text-center">
        <h1 className="text-4xl font-bold mb-3">যোগাযোগ করুন</h1>
        <p className="text-green-200">আমাদের সাথে যেকোনো প্রশ্ন বা পরামর্শের জন্য যোগাযোগ করুন</p>
      </section>

      <section className="section">
        <div className="grid grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">আমাদের তথ্য</h2>
            <div className="space-y-5">
              {[
                { icon: <FaEnvelope className="text-green-600" />, label: "Email", value: "info@krishiseba.com" },
                { icon: <FaPhone className="text-green-600" />, label: "Phone", value: "+880 1800-000000" },
                { icon: <FaMapMarkerAlt className="text-green-600" />, label: "Address", value: "Farmgate, Dhaka-1215, Bangladesh" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="mt-1 text-xl">{item.icon}</div>
                  <div>
                    <div className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">{item.label}</div>
                    <div className="text-gray-700 font-medium">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-800 mb-5">বার্তা পাঠান</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">আপনার নাম</label>
                <input
                  type="text" required
                  className="input"
                  placeholder="পূর্ণ নাম লিখুন"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">ইমেইল</label>
                <input
                  type="email" required
                  className="input"
                  placeholder="email@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">বার্তা</label>
                <textarea
                  required rows={4}
                  className="input resize-none"
                  placeholder="আপনার বার্তা লিখুন..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </div>
              <button type="submit" className="btn-primary w-full">পাঠান</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
