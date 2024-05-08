import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
const Otp = () => {
  const [otp, setOtp] = useState("");
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (seconds === 0) return;
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    // Cleanup function to clear the interval when component unmounts
    return () => clearInterval(intervalId);
  }, [seconds]);

  return (
    <div className="flex w-full justify-center h-screen items-center flex-col lg:p-0 px-6 text-center gap-2">
      <h1 className="font-semibold text-2xl">Verification Code</h1>
      <p className="opacity-[0.8]">
        We already sent an Otp to your email. Please verify the Otp
      </p>
      <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={4}
        renderSeparator={<span> - </span>}
        renderInput={(props) => <input {...props} />}
        inputStyle={{
          width: "70px",
          border: "1px solid black",
          height: "70px",
          borderRadius: "10px",
        }}
      />
      <p className="opacity-[0.8]">You didn't receive the Otp?</p>{" "}
      <button
        className={`bg-[#6757ff] p-3 rounded-lg text-white`}
        disabled={seconds > 0}
        style={{ opacity: seconds > 0 ? 0.5 : 1 }}
      >
        Resend ({seconds}s)
      </button>
    </div>
  );
};

export default Otp;
