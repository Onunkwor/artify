import { Link } from "react-router-dom";
import { TypewriterEffect } from "../components/ui/typewriter-effect";

const Authentication = () => {
  const words = [
    {
      text: "Make",
    },
    {
      text: "awesome",
    },
    {
      text: "pictures",
    },
    {
      text: "with",
    },
    {
      text: "Artify.",
      className: "text-blue-500 dark:text-[#6756ff]",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[40rem]">
      <p className="text-neutral-600 dark:text-neutral-800 text-base mb-10">
        The road to creativity starts from here
      </p>
      <TypewriterEffect words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-10">
        <Link to="/sign-in">
          <button className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm">
            Sign-in
          </button>
        </Link>
        <Link to="/sign-up">
          <button className="w-40 h-10 rounded-xl bg-white text-black border border-black  text-sm">
            Sign-up
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Authentication;
