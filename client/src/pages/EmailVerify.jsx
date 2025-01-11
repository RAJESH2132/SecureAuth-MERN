import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const EmailVerify = () => {
  axios.defaults.withCredentials = true;
  const { backendUrl, isLoggedin, userData, getUserData } =
    useContext(AppContext);
  const navigate = useNavigate();
  const inputRefs = React.useRef([]);
  const [loading, setLoading] = React.useState(false); // Spinner state

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("");
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true); // Start the spinner

      const otpArray = inputRefs.current.map((e) => e.value);
      const otp = otpArray.join("");
      const { data } = await axios.post(
        `${backendUrl}/api/auth/verify-account`,
        { otp }
      );

      if (data.success) {
        toast.success(data.message);
        getUserData();
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false); // Stop the spinner
    }
  };

  useEffect(() => {
    isLoggedin && userData && userData.isAccountVerified && navigate("/");
  }, [isLoggedin, userData]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-400">
      <img
        onClick={() => navigate("/")}
        className="absolute cursor-pointer left-5 sm:left-20 top-5 w-28 sm:w-32"
        src={assets.logo}
        alt=""
      />
      <form
        onSubmit={onSubmitHandler}
        className="p-8 text-sm rounded-lg shadow-lg bg-slate-900 w-96"
      >
        <h1 className="mb-4 text-2xl font-semibold text-center text-white">
          Email Verify OTP
        </h1>
        <p className="mb-6 text-center text-indigo-300">
          Enter the 6-digit code sent to your email id.
        </p>
        <div className="flex justify-between mb-8" onPaste={handlePaste}>
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <input
                type="text"
                maxLength="1"
                key={index}
                required
                ref={(e) => (inputRefs.current[index] = e)}
                onInput={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md"
              />
            ))}
        </div>
        <button
          className="flex items-center justify-center w-full py-3 text-white rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900"
          disabled={loading} // Disable button while loading
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
          ) : (
            "Verify email"
          )}
        </button>
      </form>
    </div>
  );
};

export default EmailVerify;
