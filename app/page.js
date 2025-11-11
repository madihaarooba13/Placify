import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div>
        <main className="min-h-screen flex flex-col mt-18">
          {/* Hero Section */}
          <section className="bg-gradient-to-r from-sky-400 to-sky-600 text-white py-32 px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Welcome to Placify!
            </h1>
            <p className="text-lg md:text-2xl mb-8">
              Your ultimate platform for placement guidance, AI support, and learning resources.
            </p>
            <Link href="/placement">
              <button className="bg-white text-sky-600 font-semibold px-8 py-3 rounded-full shadow-lg hover:scale-105 transition-transform duration-300 hover:cursor-pointer">
                Explore Placements
              </button>
            </Link>
          </section>

          {/* Features Section */}
          <section className="py-20 px-6 bg-sky-200 text-black">
            <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
              {/* AI Chatbot */}
              <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:scale-105 transition-transform duration-300">
                <div className="text-5xl mb-4">🤖</div>
                <h2 className="text-xl font-semibold mb-2">AI Chatbot</h2>
                <p className="text-gray-700">
                  Get instant answers to your placement questions and interview preparation tips.
                </p>
              </div>

              {/* Teacher Guidance */}
              <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:scale-105 transition-transform duration-300">
                <div className="text-5xl mb-4">🎓</div>
                <h2 className="text-xl font-semibold mb-2">Teacher Guidance</h2>
                <p className="text-gray-700">
                  Personalized guidance from experienced mentors to shape your career path.
                </p>
              </div>

              {/* Support */}
              <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:scale-105 transition-transform duration-300">
                <div className="text-5xl mb-4">🛠️</div>
                <h2 className="text-xl font-semibold mb-2">Support</h2>
                <p className="text-gray-700">
                  Dedicated support to solve your doubts, technical or career-related.
                </p>
              </div>

              {/* 🌟 Student Dashboard */}
              <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:scale-105 transition-transform duration-300">
                <div className="text-5xl mb-4">🎯</div>
                <h2 className="text-xl font-semibold mb-2">Student Dashboard</h2>
                <p className="text-gray-700">
                  Track your performance, practice questions, and get personalized placement insights.
                </p>
              </div>

              {/* 👩‍🏫 Teacher Panel */}
              <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:scale-105 transition-transform duration-300">
                <div className="text-5xl mb-4">👩‍🏫</div>
                <h2 className="text-xl font-semibold mb-2">Teacher Panel</h2>
                <p className="text-gray-700">
                  Manage student progress, assign tasks, and provide feedback through an intuitive interface.
                </p>
              </div>

              {/* 📊 Placement Insights */}
              <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:scale-105 transition-transform duration-300">
                <div className="text-5xl mb-4">📈</div>
                <h2 className="text-xl font-semibold mb-2">Placement Insights</h2>
                <p className="text-gray-700">
                  Explore trends, company requirements, and analytics to stay ahead in placement preparation.
                </p>
              </div>
            </div>
          </section>

          {/* Call to Action Section */}
          <section className="py-20 px-6 bg-gradient-to-r from-sky-600 to-sky-400 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to step into your dream career?
            </h2>
            <p className="text-lg md:text-xl mb-8">
              Placify helps you prepare, practice, and achieve your placement goals.
            </p>
            <Link href="/placement">
              <button className="bg-white text-sky-600 font-semibold px-8 py-3 rounded-full shadow-lg hover:scale-105 transition-transform duration-300 hover:cursor-pointer">
                Start Your Journey
              </button>
            </Link>
          </section>

          {/* Footer Placeholder */}
          {/* <Footer /> */}
        </main>
      </div>
    </>
  );
}
