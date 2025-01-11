import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContext);

  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Spinner state

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true); // Start the spinner

      // Validation logic
      if (state === "Sign Up") {
        // Name validation
        if (name.length <= 3) {
          toast.error("Name must be greater than 3 characters.");
          setLoading(false); // Stop the spinner
          return;
        }

        // Password validation
        const passwordRegex =
          /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
        if (!passwordRegex.test(password)) {
          toast.error(
            "Password must be at least 8 characters long, contain at least 1 uppercase letter, 1 special character, and 1 number."
          );
          setLoading(false); // Stop the spinner
          return;
        }

        // Proceed with Sign Up request
        const { data } = await axios.post(`${backendUrl}/api/auth/register`, {
          name,
          email,
          password,
        });
        if (data.success) {
          setIsLoggedin(true);
          getUserData();
          navigate("/");
        } else {
          toast.error(data.message);
        }
      } else {
        // Proceed with Login request
        const { data } = await axios.post(`${backendUrl}/api/auth/login`, {
          email,
          password,
        });
        if (data.success) {
          setIsLoggedin(true);
          getUserData();
          navigate("/");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false); // Stop the spinner
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
      <img
        onClick={() => navigate("/")}
        className="absolute cursor-pointer left-5 sm:left-20 top-5 w-28 sm:w-32"
        src={assets.logo}
        alt=""
      />
      <div className="w-full p-10 text-sm text-indigo-300 rounded-lg shadow-lg bg-slate-900 sm:w-96">
        <h2 className="mb-3 text-3xl font-semibold text-center text-white">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </h2>
        <p className="mb-6 text-sm text-center">
          {state === "Sign Up"
            ? "Create your account"
            : "Login to your account!"}
        </p>

        <form onSubmit={onSubmitHandler}>
          {state === "Sign Up" && (
            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
              <img src={assets.person_icon} alt="" />
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="bg-transparent outline-none"
                type="text"
                placeholder="Full Name"
                required
              />
            </div>
          )}

          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.mail_icon} alt="" />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="bg-transparent outline-none"
              type="email"
              placeholder="Email id"
              required
            />
          </div>
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.lock_icon} alt="" />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="bg-transparent outline-none"
              type="password"
              placeholder="Password"
              required
            />
          </div>
          <p
            onClick={() => navigate("/reset-password")}
            className="mb-4 text-indigo-500 cursor-pointer"
          >
            Forgot password?
          </p>
          <button
            className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium flex justify-center items-center"
            disabled={loading} // Disable button while loading
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"></div> // Spinner
            ) : (
              state
            )}
          </button>
        </form>

        {state === "Sign Up" ? (
          <p className="mt-4 text-xs text-center text-gray-400 ">
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-blue-400 underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="mt-4 text-xs text-center text-gray-400 ">
            Don&apos;t have an account?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="text-blue-400 underline cursor-pointer"
            >
              Sign up
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
