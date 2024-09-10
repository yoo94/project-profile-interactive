import React from "react";
import { HeartPulse, SquareMenu } from "lucide-react";

const Header = () => {
  const SubMenuNames = ["Carrer", "Group", "Personal", "Skill"];

  return (
    <div className="flex justify-between items-center bg-black text-white px-1.5">
      <div className="flex items-center pl-5">
        <HeartPulse color="red" />
      </div>

      <div className="flex-grow flex justify-center">
        <nav className="flex items-center">
          <div className="max-w-screen-lg mx-auto px-4">
            <ul className="flex items-center text-xs justify-center gap-20">
              {SubMenuNames.map((item, index) => (
                <li key={index}>
                  <a className="hidden min-[835px]:flex text-[#ceccce] hover:text-white font-bold p-3 pr-5 cursor-pointer">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
            <div className="text-2xl min-[835px]:hidden text-center text-white font-bold">
                Project Profile
              </div>
          </div>
        </nav>
      </div>

      <div className="flex items-center min-[835px]:hidden cursor-pointer p-3 pr-20">
        <SquareMenu />
      </div>
    </div>
  );
};

export default Header;
