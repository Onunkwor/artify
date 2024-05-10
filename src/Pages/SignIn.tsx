import { auth } from "../assets/icons";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { cn } from "../utils/cn";
import { ChangeEvent, useReducer } from "react";
import { signUserIn } from "../lib/Api/api";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
type State = {
  email: string;
  password: string;
};
type Action =
  | { type: "EMAIL"; payload: string }
  | { type: "PASSWORD"; payload: string };
const SignIn = () => {
  const navigate = useNavigate();
  const InitialState: State = {
    email: "",
    password: "",
  };
  const reducer = (state: State, action: Action) => {
    switch (action.type) {
      case "EMAIL":
        return { ...state, email: action.payload };
      case "PASSWORD":
        return { ...state, password: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, InitialState);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    type: Action["type"]
  ) => {
    dispatch({ type, payload: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const login = await signUserIn({
      email: state.email,
      password: state.password,
    });
    if (login) {
      toast.success(`Welcome ${login.firstName}`);
      localStorage.setItem("Artify-token", login.token);
      navigate("/");
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

        <div className="max-w-lg w-full mx-auto p-4 md:p-8 bg-white ">
          <h2 className="font-bold text-xl text-neutral-800">
            Welcome to Artify
          </h2>
          <p className="text-neutral-600 text-sm max-w-sm mt-2 ">
            Login to artify to continue to enjoy its amazing features
          </p>

          <form className="my-8" onSubmit={handleSubmit}>
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
            <LabelInputContainer className="mb-4">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="••••••••"
                type="password"
                value={state.password}
                onChange={(e) => handleChange(e, "PASSWORD")}
              />
            </LabelInputContainer>

            <button
              className="bg-[#6757ff] relative group/btn w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="submit"
            >
              Sign in &rarr;
              <BottomGradient />
            </button>
            <p>
              <span className="opacity-[0.7] text-sm">
                Don't have an account?{" "}
              </span>
              <Link to="/sign-up" className="text-sm text-[#6757ff]">
                Sign-Up
              </Link>
            </p>
            <div className="bg-gradient-to-r from-transparent via-[#6757ff] dark:via-[#6757ff] to-transparent my-8 h-[1px] w-full" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

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
