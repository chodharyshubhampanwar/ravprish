import { useAuthStore } from "../store/AuthStore";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const { signInWithGoogle, loading, user } = useAuthStore();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle(() => {
        navigate("/home");
      });
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {user ? `Welcome back, ${user.name}!` : "Sign in to your account"}
          </h2>
        </div>
        <div className="mt-8 space-y-6">
          {!user && (
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 border-gray-300"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <FcGoogle className="h-5 w-5" />
              </span>
              {loading ? "Signing in..." : "Sign in with Google"}
            </button>
          )}
          {user && (
            <button
              onClick={() => navigate("/home")}
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Go to Dashboard
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
