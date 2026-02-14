import { ShieldCheck, Sparkles, Target } from "lucide-react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

const About = () => (
  <div className="min-h-screen bg-white text-gray-800">
    <Header />
    <main className="container mx-auto px-4 py-14 md:py-20">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <p className="inline-flex items-center gap-2 text-sm font-medium text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
          <Sparkles className="w-4 h-4" />
          About Money Manager
        </p>
        <h1 className="mt-4 text-3xl md:text-5xl font-bold text-gray-900">Helping you make better money decisions daily</h1>
        <p className="mt-4 text-lg text-gray-600">
          Money Manager is designed to simplify personal finance. Track spending, monitor income, and stay on top of lending and borrowing with confidence.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <Target className="w-8 h-8 text-purple-600 mb-3" />
          <h3 className="font-semibold text-gray-900 mb-2">Our Mission</h3>
          <p className="text-sm text-gray-600">Provide clear visibility into personal finances so people can plan smarter and reduce stress.</p>
        </div>
        <div className="card">
          <ShieldCheck className="w-8 h-8 text-emerald-600 mb-3" />
          <h3 className="font-semibold text-gray-900 mb-2">Built for Trust</h3>
          <p className="text-sm text-gray-600">Security-first architecture and authenticated access keep your financial data private.</p>
        </div>
        <div className="card">
          <Sparkles className="w-8 h-8 text-indigo-600 mb-3" />
          <h3 className="font-semibold text-gray-900 mb-2">User-Centric UX</h3>
          <p className="text-sm text-gray-600">A clean and responsive interface that works smoothly across desktop and mobile.</p>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default About;
