/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { State } from "./SignUp";
import { useLocation, useNavigate } from "react-router-dom";
import { sendSignUpOtp, signUserUp, verifyOtp } from "../lib/Api/api";
import { toast } from "sonner";

const Otp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [seconds, setSeconds] = useState(60);
  const [user, setUser] = useState<State>();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const detailsParams = searchParams.get("details");
    if (detailsParams) {
      const details = JSON.parse(decodeURIComponent(detailsParams));
      setUser(details);
    }
  }, []);
  const handleClick = (e: any) => {
    e.preventDefault;

    const sendOtp = new Promise((resolve, reject) => {
      sendSignUpOtp({
        email: user?.email || "",
        subject: "Email verification",
        duration: 1,
        message: "Verify your email with the code below",
      })
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });

    toast.promise(sendOtp, {
      loading: "Sending otp...",
      success: () => {
        return "Check Email for Otp";
      },
    });
    setSeconds(60);
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (seconds === 0) return;
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    // Cleanup function to clear the interval when component unmounts
    return () => clearInterval(intervalId);
  }, [seconds]);
  useEffect(() => {
    if (otp.length === 4) {
      const signUpProcess = async () => {
        const isMatch = await verifyOtp({ email: user?.email || "", otp });
        if (isMatch.valid === true) {
          const signUp = await signUserUp({
            firstName: user?.firstName || "",
            lastName: user?.lastName || "",
            email: user?.email || "",
            password: user?.password || "",
          });
          if (signUp) {
            toast.success("Your account has been created");
            navigate("/sign-in");
          }
        } else {
          toast.error("Please enter correct Otp");
        }
      };
      signUpProcess();
    }
  }, [otp]);

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
        onClick={handleClick}
      >
        Resend ({seconds}s)
      </button>
    </div>
  );
};

export default Otp;
