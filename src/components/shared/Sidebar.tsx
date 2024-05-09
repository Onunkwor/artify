import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-[288px] h-screen shadow-xl">
      <Link to="/auth">
        <button className="bg-[#6756FF]">Login</button>
      </Link>
    </div>
  );
};

export default Sidebar;
