import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useContext, useState } from "react";
import React from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const { backendUrl } = useContext(AppContext);
  axios.defaults.withCredentials = true;

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [otp, setOtp] = useState(0);
  const [isOtpSubmited, setIsOtpSubmited] = useState(false);
  const [loading, setLoading] = useState(false); // Spinner state

  const inputRefs = React.useRef([]);

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

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/auth/send-reset-otp`,
        { email }
      );
      data.success ? toast.success(data.message) : toast.error(data.message);
      if (data.success) setIsEmailSent(true);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const onSubmitOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const otpArray = inputRefs.current.map((e) => e.value);
      setOtp(otpArray.join(""));
      setIsOtpSubmited(true);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      toast.error(
        "Password must be at least 8 characters long, contain at least 1 uppercase letter, 1 special character, and 1 number."
      );
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/auth/reset-password`,
        {
          email,
          otp,
          newPassword,
        }
      );
      data.success ? toast.success(data.message) : toast.error(data.message);
      if (data.success) navigate("/login");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-400">
      <img
        onClick={() => navigate("/")}
        className="absolute cursor-pointer left-5 sm:left-20 top-5 w-28 sm:w-32"
        src={assets.logo}
        alt=""
      />

      {/* Reset Email form */}
      {!isEmailSent && (
        <form
          onSubmit={onSubmitEmail}
          className="p-8 text-sm rounded-lg shadow-lg bg-slate-900 w-96"
        >
          <h1 className="mb-4 text-2xl font-semibold text-center text-white">
            Reset password
          </h1>
          <p className="mb-6 text-center text-indigo-300">
            Enter your registered email address
          </p>
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.mail_icon} className="w-3 h-3" alt="" />
            <input
              type="email"
              placeholder="Email id"
              className="text-white bg-transparent outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            className="w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full mt-3 flex justify-center items-center"
            disabled={loading}
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
            ) : (
              "Submit"
            )}
          </button>
        </form>
      )}
      {/* OTP Input Form */}
      {!isOtpSubmited && isEmailSent && (
        <form
          onSubmit={onSubmitOTP}
          className="p-8 text-sm rounded-lg shadow-lg bg-slate-900 w-96"
        >
          <h1 className="mb-4 text-2xl font-semibold text-center text-white">
            Reset Password OTP
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
            className="w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full flex justify-center items-center"
            disabled={loading}
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
            ) : (
              "Submit"
            )}
          </button>
        </form>
      )}
      {/* New Password Form */}
      {isOtpSubmited && isEmailSent && (
        <form
          onSubmit={onSubmitNewPassword}
          className="p-8 text-sm rounded-lg shadow-lg bg-slate-900 w-96"
        >
          <h1 className="mb-4 text-2xl font-semibold text-center text-white">
            New password
          </h1>
          <p className="mb-6 text-center text-indigo-300">
            Enter the new password below
          </p>
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.lock_icon} className="w-3 h-3" alt="" />
            <input
              type="password"
              placeholder="Password"
              className="text-white bg-transparent outline-none"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <button
            className="w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full mt-3 flex justify-center items-center"
            disabled={loading}
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
            ) : (
              "Submit"
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
