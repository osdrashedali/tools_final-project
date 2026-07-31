// src/pages/public/About.jsx
import { GiFarmer } from "react-icons/gi";
import { FaUserTie, FaShieldAlt, FaLeaf } from "react-icons/fa";

const team = [
  { name: "Md. Rafiq Islam", role: "Lead Developer", img: null },
  { name: "Sumaiya Akter", role: "Frontend Developer", img: null },
  { name: "Tanvir Hossain", role: "Backend Developer", img: null },
];

const About = () => {
  return (
    <div>
      {/* Hero */}
      <section className="bg-green-700 text-white py-20 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">আমাদের সম্পর্কে</h1>
        <p className="text-green-200 text-lg max-w-2xl mx-auto">
          কৃষি সেবা একটি স্মার্ট ডিজিটাল প্ল্যাটফর্ম যা বাংলাদেশের কৃষকদের
          আধুনিক কৃষি জ্ঞান ও বাজারের সাথে সংযুক্ত করে।
        </p>
      </section>

      {/* Mission */}
      <section className="section">
        <div className="grid grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">আমাদের লক্ষ্য</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              বাংলাদেশের কোটি কৃষককে ডিজিটাল প্রযুক্তির মাধ্যমে সঠিক কৃষি
              পরামর্শ, বাজারদর এবং পণ্য সহজলভ্য করে তোলাই আমাদের মূল লক্ষ্য।
            </p>
            <p className="text-gray-600 leading-relaxed">
              আমরা বিশ্বাস করি প্রযুক্তি ও কৃষির মিলনে বাংলাদেশের কৃষি খাত
              আরও সমৃদ্ধ হবে।
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: <GiFarmer />, title: "কৃষক প্রথম", desc: "কৃষকদের চাহিদাই আমাদের প্রাধান্য।" },
              { icon: <FaUserTie />, title: "বিশেষজ্ঞ নেটওয়ার্ক", desc: "দেশের সেরা কৃষিবিদদের নেটওয়ার্ক।" },
              { icon: <FaLeaf />, title: "টেকসই কৃষি", desc: "পরিবেশবান্ধব চাষাবাদের প্রসার।" },
              { icon: <FaShieldAlt />, title: "বিশ্বস্ত প্ল্যাটফর্ম", desc: "নিরাপদ ও নির্ভরযোগ্য সেবা।" },
            ].map((item) => (
              <div key={item.title} className="card">
                <div className="text-green-600 text-2xl mb-2">{item.icon}</div>
                <h4 className="font-semibold text-gray-800 mb-1">{item.title}</h4>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-green-50 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">আমাদের টিম</h2>
          <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto">
            {team.map((member) => (
              <div key={member.name} className="card text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <GiFarmer className="text-3xl text-green-500" />
                </div>
                <h4 className="font-semibold text-gray-800">{member.name}</h4>
                <p className="text-sm text-green-600 mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
