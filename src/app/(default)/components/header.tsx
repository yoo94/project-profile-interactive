'use client'
import React from "react";
import { HeartPulse, SquareMenu } from "lucide-react";
import { motion, useAnimationControls } from "framer-motion"

const Header = () => {
  const SubMenuNames = ["Carrer", "Group", "Personal", "Skill"];
  const menuControl = useAnimationControls();
  
  const openMenuAnimation = () => {
      menuControl.start({opacity:0, height:0});
  }
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
                  <a 
                  key={index}
                  className="hidden min-[835px]:flex text-[#ceccce] hover:text-white font-bold p-3 pr-5 cursor-pointer"
                  onMouseEnter={()=>{openMenuAnimation()}}
                  >
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
        <div className="bg-[#ldldlf] absolute w-full overflow-hidden left-0 top-0 z-10"
          >
            <h1>dafsasfsafdd</h1>
        </div>
        <motion.div className="bg-[#ldldlf] absolute w-full overflow-hidden left-0 top-0 z-10"
          initial={{opacity:0, height:0}}
          animate={menuControl}
          transition={{duration:0.4, delayChildren:0.5}}
          >
            <h1>dafsasfsafdd</h1>
        </motion.div>
      </div>

      <div className="flex items-center min-[835px]:hidden cursor-pointer p-3 pr-20">
        <SquareMenu />
      </div>
    </div>
  );
};

export default Header;
