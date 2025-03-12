import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center space-y-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              <span className="bg-gradient-to-l from-blue-800 to-blue-600 bg-clip-text text-transparent">
                Study anywhere.
                <br />
                Anytime.
                <br />
                Across all devices.
              </span>
            </h1>

            <p className="mt-6 text-xl md:text-2xl text-gray-700 font-medium leading-relaxed">
              Empowering learners worldwide with personalized, affordable and
              high-quality education for anyone, anywhere.
            </p>
          </div>

          <div className="mt-10">
            <button
              className="bg-black hover:bg-gray-900 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
              onClick={() => navigate("/welcome")}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
