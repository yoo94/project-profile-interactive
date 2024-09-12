'use client';
import React, { useEffect, useState } from "react";
import { HeartPulse, SquareMenu } from "lucide-react";
import { motion, useAnimationControls } from "framer-motion";
import Link from 'next/link';
import Backdrop from './backdrop';
import FloatingNavigate from './floating-navigate';

const Header: React.FC = () => {
  const menuControl = useAnimationControls();
  const backdropControl = useAnimationControls();
  const floatingNavigateControl = useAnimationControls();

  const openMenuAnimation = () => {
    menuControl.start({ opacity: 1, height: "auto" });
    backdropControl.start({ backdropFilter: "blur(8px)", height: "100%" });
  };
  const closeMenuAnimation = () => {
    menuControl.start({ opacity: 0, height: 0 });
    backdropControl.start({ backdropFilter: "none", height: 0 });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      scrollTop > 150 ? floatingNavigateControl.start({ y: 0 }) : floatingNavigateControl.start({ y: "-100px" });
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const SubMenuNames = ["Carrer", "Group", "Personal", "Skill"];
  const [menuIdx, setMenuIdx] = useState(0);

  const renderSubMenu = () => {
    switch (menuIdx) {
      case 0:
        return (
          <motion.div className="flex flex-row gap-14 justify-center w-full mx-auto text-center">
            <div className="flex flex-col gap-3 ">
              <h2>회사프로젝트</h2>
              <ul className="flex flex-col gap-2 font-semibold text-[#eBeBed] text-2xl">
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
              </ul>
            </div>
          </motion.div>
        );
      case 1:
        return (
          <motion.div className="w-full mx-auto text-center">
            <div className="flex flex-col gap-3 ">
              <h2>그룹프로젝트</h2>
              <ul className="flex flex-col gap-2 font-semibold text-[#eBeBed] text-2xl">
                <li>1</li>
                <li>2</li>
                <li>3</li>
              </ul>
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div className="w-full mx-auto text-center">
            <div className="flex flex-col gap-3 ">
              <h2>개인프로젝트</h2>
              <ul className="flex flex-col gap-2 font-semibold text-[#eBeBed] text-2xl">
                <li>1</li>
                <li>2</li>
                <li>3</li>
              </ul>
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div className="w-full mx-auto text-center">
            <div className="flex flex-col gap-3 ">
              <h2>기술</h2>
              <ul className="flex flex-col gap-2 font-semibold text-[#eBeBed] text-2xl">
                <li>1</li>
                <li>2</li>
                <li>3</li>
              </ul>
            </div>
          </motion.div>
        );
      default:
        return <div className="text-2xl">coming soon</div>;
    }
  };

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
                  <Link
                    href="#"
                    key={index}
                    className="hidden min-[835px]:flex text-[#ceccce] hover:text-white font-bold p-3 pr-5 cursor-pointer text-base"
                    onMouseEnter={() => {
                      setMenuIdx(index);
                      openMenuAnimation();
                    }}
                    onMouseLeave={() => {
                      closeMenuAnimation();
                    }}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="text-2xl min-[835px]:hidden text-center text-white font-bold">
              Project Profile
            </div>
          </div>
        </nav>
        <motion.div className="bg-[#111112] absolute w-full overflow-hidden left-0 z-10 top-16"
          initial={{ opacity: 0, height: 0 }}
          animate={menuControl}
          transition={{ duration: 0.4, delayChildren: 0.5 }}
        >
          <div>{renderSubMenu()}</div>
        </motion.div>
      </div>
      <div className="flex items-center min-[835px]:hidden cursor-pointer p-3 pr-20">
        <SquareMenu />
      </div>
      <Backdrop backdropControl={backdropControl} />
      <FloatingNavigate floatingNavigateControl={floatingNavigateControl} />
    </div>
  );
};

export default Header;
