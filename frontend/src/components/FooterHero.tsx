import { useNavigate } from "react-router-dom";

export default function FooterHero() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-7xl px-4 py-16 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-l from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Learn.
              <br />
              Practice.
              <br />
              Succeed.
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 font-medium leading-relaxed">
            Unlock study success with a single app, featuring all the tools and
            resources you need to excel.
          </p>

          <div className="mt-10">
            <button
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
              onClick={() => navigate("/welcome")}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
