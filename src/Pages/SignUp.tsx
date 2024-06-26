/* eslint-disable no-control-regex */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { auth, eyeClose, eyeOpen } from "../assets/icons";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { cn } from "../utils/cn";
import { Link, useNavigate } from "react-router-dom";
import { ChangeEvent, useReducer, useState } from "react";
import { toast } from "sonner";
import { sendSignUpOtp } from "../lib/Api/api";
export type State = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};
type Action =
  | { type: "FIRST_NAME"; payload: string }
  | { type: "LAST_NAME"; payload: string }
  | { type: "EMAIL"; payload: string }
  | { type: "PASSWORD"; payload: string }
  | { type: "CONFIRM_PASSWORD"; payload: string }
  | { type: "RESET" };

const SignUp = () => {
  const navigate = useNavigate();
  const InitialState: State = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const reducer = (state: State, action: Action) => {
    switch (action.type) {
      case "FIRST_NAME":
        return { ...state, firstName: action.payload };
      case "LAST_NAME":
        return { ...state, lastName: action.payload };
      case "EMAIL":
        return { ...state, email: action.payload };
      case "PASSWORD":
        return { ...state, password: action.payload };
      case "CONFIRM_PASSWORD":
        return { ...state, confirmPassword: action.payload };
      case "RESET":
        return InitialState;
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, InitialState);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    type: Action["type"]
  ) => {
    dispatch({ type, payload: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const regex =
      /(?:[a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    if (!state.email.match(regex)) {
      toast.error("Please enter a valid email address");
    }
    if (state.password.length !== 8 && state.confirmPassword.length !== 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    if (state.password !== state.confirmPassword) {
      toast.error("Please check the password");
      return;
    }
    toast.message("Sending Otp...", { duration: 3000 });

    try {
      // Show success toast
      const response = await sendSignUpOtp({
        email: state.email.toLowerCase(),
        subject: "Email verification",
        duration: 1,
        message: "Verify your email with the code below",
      });
      if (response) {
        toast.success(
          "OTP sent successfully. Check your email for verification code."
        );
        dispatch({ type: "RESET" });

        navigate(
          `/sign-up/otp?details=${encodeURIComponent(JSON.stringify(state))}`
        );
      }
    } catch (error) {
      toast.error("Failed to send OTP. Please try again later.");
    }
  };
  return (
    <div className="overflow-hidden">
      <div className="flex justify-center items-center h-screen">
        <img
          src={auth}
          alt="auth"
          className="h-screen hidden lg:flex w-1/2 overflow-hidden"
        />

        <div className="max-w-lg mx-auto p-4 md:p-8 bg-white mt-10">
          <h2 className="font-bold text-xl text-neutral-800">
            Welcome to Artify
          </h2>
          <p className="text-neutral-600 text-sm max-w-sm mt-2 ">
            SignUp to artify to continue to enjoy its amazing features
          </p>

          <form className="my-4" onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
              <LabelInputContainer>
                <Label htmlFor="firstname">First name</Label>
                <Input
                  id="firstname"
                  placeholder="Tyler"
                  type="text"
                  value={state.firstName}
                  onChange={(e) => handleChange(e, "FIRST_NAME")}
                />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="lastname">Last name</Label>
                <Input
                  id="lastname"
                  placeholder="Durden"
                  type="text"
                  value={state.lastName}
                  onChange={(e) => handleChange(e, "LAST_NAME")}
                />
              </LabelInputContainer>
            </div>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                placeholder="projectmayhem@fc.com"
                type="email"
                value={state.email}
                onChange={(e) => handleChange(e, "EMAIL")}
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4 relative">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="••••••••"
                type={showPassword ? "text" : "password"}
                value={state.password}
                onChange={(e) => handleChange(e, "PASSWORD")}
              />
              <button
                className="absolute right-3 top-6"
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPassword((prev) => !prev);
                }}
              >
                <img src={showPassword ? eyeOpen : eyeClose} alt="eye" />
              </button>
            </LabelInputContainer>
            <LabelInputContainer className="mb-8 relative">
              <Label htmlFor="repeatpassword">Repeat password</Label>
              <Input
                id="repeatpassword"
                placeholder="••••••••"
                type={showConfirmPassword ? "text" : "password"}
                value={state.confirmPassword}
                onChange={(e) => handleChange(e, "CONFIRM_PASSWORD")}
              />
              <button
                className="absolute right-3 top-6"
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowConfirmPassword((prev) => !prev);
                }}
              >
                <img src={showConfirmPassword ? eyeOpen : eyeClose} alt="eye" />
              </button>
              <p className="text-sm opacity-[0.6]">Minimum of 8 characters.</p>
            </LabelInputContainer>
            <button
              className="bg-[#6757ff] relative group/btn w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="submit"
            >
              Sign up &rarr;
              <BottomGradient />
            </button>
            <p>
              <span className="opacity-[0.7] text-sm">
                Already have an account?{" "}
              </span>
              <Link to="/sign-in" className="text-sm text-[#6757ff]">
                Sign-in
              </Link>
            </p>
            <div className="bg-gradient-to-r from-transparent via-[#6757ff] dark:via-[#6757ff] to-transparent my-8 h-[1px] w-full" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
