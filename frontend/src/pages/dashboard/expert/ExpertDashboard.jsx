// src/pages/dashboard/expert/ExpertDashboard.jsx
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { FaSeedling, FaCheckCircle, FaStar } from "react-icons/fa";
import toast from "react-hot-toast";

const problems = [
  { id: 1, crop: "ধান", farmer: "Rahim Khan", area: "রাজশাহী", title: "পাতা হলুদ হয়ে যাচ্ছে", desc: "ধানের পাতার রঙ হলুদ হয়ে ঝরে পড়ছে। জমিতে সার দেওয়া হয়েছে।", date: "২৫ জুলাই", solved: false },
  { id: 2, crop: "সবজি", farmer: "Karim Ali", area: "ময়মনসিংহ", title: "মরিচে পোকার আক্রমণ", desc: "মরিচ গাছের পাতায় সাদা পোকা দেখা যাচ্ছে। গাছ মরে যাচ্ছে।", date: "২৭ জুলাই", solved: false },
  { id: 3, crop: "গম", farmer: "Hasan Mia", area: "দিনাজপুর", title: "গমে শিষ বের হচ্ছে না", desc: "গম গাছ বড় হয়েছে কিন্তু শিষ বের হচ্ছে না। কারণ কী?", date: "২৯ জুলাই", solved: true },
];

const ExpertDashboard = () => {
  const { user } = useAuth();
  const [tab, setTab] = useState("problems");
  const [selected, setSelected] = useState(null);
  const [solutionText, setSolutionText] = useState("");
  const [localProblems, setLocalProblems] = useState(problems);
  const [mySolutions] = useState([
    { id: 1, problemTitle: "গমে শিষ বের হচ্ছে না", solution: "পটাশ সার প্রয়োগ করুন এবং সেচ নিশ্চিত করুন।", rating: 4.5, date: "৩০ জুলাই" },
  ]);

  const handleSubmitSolution = (problemId) => {
    if (!solutionText.trim()) return toast.error("সমাধান লিখুন।");
    setLocalProblems(localProblems.map((p) => p.id === problemId ? { ...p, solved: true } : p));
    toast.success("সমাধান পাঠানো হয়েছে!");
    setSelected(null); setSolutionText("");
  };

  const tabClass = (t) => `px-4 py-2 text-sm font-medium rounded-lg transition-colors ${tab === t ? "bg-green-600 text-white" : "text-gray-600 hover:bg-gray-100"}`;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-8 py-5 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Expert Dashboard</h1>
          <p className="text-sm text-gray-500">স্বাগতম, {user?.displayName || "Expert"}</p>
        </div>
        <span className="badge-earth">👨‍🔬 Expert</span>
      </div>

      <div className="max-w-5xl mx-auto px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-5 mb-8">
          {[
            { label: "মোট সমস্যা", value: localProblems.length, icon: <FaSeedling />, color: "text-green-500" },
            { label: "সমাধান দেওয়া", value: localProblems.filter((p) => p.solved).length, icon: <FaCheckCircle />, color: "text-blue-500" },
            { label: "গড় রেটিং", value: "4.5 ⭐", icon: <FaStar />, color: "text-amber-500" },
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
          {[["problems", "সমস্যার তালিকা"], ["solutions", "আমার সমাধান"], ["profile", "প্রোফাইল"]].map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)} className={tabClass(key)}>{label}</button>
          ))}
        </div>

        {/* ── Problems ── */}
        {tab === "problems" && (
          <div>
            <h3 className="font-semibold text-gray-800 mb-5">কৃষকদের সমস্যাসমূহ</h3>
            <div className="space-y-4">
              {localProblems.map((p) => (
                <div key={p.id} className="card">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="badge-green">{p.crop}</span>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${p.solved ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                          {p.solved ? "✓ Solved" : "Pending"}
                        </span>
                        <span className="text-xs text-gray-400">📍 {p.area} • {p.date}</span>
                      </div>
                      <h4 className="font-semibold text-gray-800">{p.title}</h4>
                      <p className="text-sm text-gray-500 mt-1 mb-1">{p.desc}</p>
                      <span className="text-xs text-gray-400">👨‍🌾 {p.farmer}</span>
                    </div>
                    {!p.solved && (
                      <button
                        onClick={() => setSelected(selected === p.id ? null : p.id)}
                        className="btn-primary text-xs ml-4 whitespace-nowrap"
                      >
                        সমাধান দিন
                      </button>
                    )}
                  </div>

                  {/* Solution input */}
                  {selected === p.id && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <textarea
                        className="input resize-none mb-3"
                        rows={3}
                        placeholder="এখানে সমাধান লিখুন..."
                        value={solutionText}
                        onChange={(e) => setSolutionText(e.target.value)}
                      />
                      <div className="flex gap-2">
                        <button onClick={() => handleSubmitSolution(p.id)} className="btn-primary text-sm">পাঠান</button>
                        <button onClick={() => setSelected(null)} className="btn-outline text-sm">বাতিল</button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── My Solutions ── */}
        {tab === "solutions" && (
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800 mb-2">আমার দেওয়া সমাধান</h3>
            {mySolutions.map((s) => (
              <div key={s.id} className="card">
                <h4 className="font-semibold text-gray-800 mb-2">{s.problemTitle}</h4>
                <p className="text-sm text-gray-600 mb-3">{s.solution}</p>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <div className="flex items-center gap-1 text-amber-500">
                    <FaStar /> {s.rating} রেটিং পেয়েছেন
                  </div>
                  <span>{s.date}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Profile ── */}
        {tab === "profile" && (
          <div className="card max-w-md">
            <h3 className="font-semibold text-gray-800 mb-5">আমার প্রোফাইল</h3>
            <div className="flex items-center gap-4 mb-6 pb-5 border-b border-gray-100">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center text-3xl">
                {user?.photoURL ? <img src={user.photoURL} className="w-16 h-16 rounded-full" alt="" /> : "👨‍🔬"}
              </div>
              <div>
                <div className="font-semibold text-gray-800">{user?.displayName || "Expert"}</div>
                <div className="text-sm text-gray-500">{user?.email}</div>
              </div>
            </div>
            <div className="space-y-3">
              <input className="input" defaultValue={user?.displayName || ""} placeholder="আপনার নাম" />
              <input className="input" placeholder="বিশেষজ্ঞতার ক্ষেত্র (যেমন: ধান, সবজি)" />
              <input className="input" placeholder="প্রতিষ্ঠান / ডিগ্রি" />
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

export default ExpertDashboard;
