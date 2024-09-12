'use client';
import { motion, AnimationControls } from 'framer-motion';
import Link from 'next/link';

interface FloatingNavigateProps {
  floatingNavigateControl: AnimationControls;
}

const FloatingNavigate: React.FC<FloatingNavigateProps> = ({ floatingNavigateControl }) => {
  return (
    <motion.div
      className="flex items-center text-white h-[52px] top-0 z-30 border-b-2 border-[#424245] fixed w-full"
      style={{ backdropFilter: "saturate(180%) blur(20px)" }}
      initial={{ y: "-100px" }}
      animate={floatingNavigateControl}
    >
      <div className="max-w-screen-lg w-full mx-auto px-4 flex items-end gap-4 text-[10px] font-semibold">
        <Link href="#" className="ml-auto">
          <h1 className="opacity-50">제목</h1>
        </Link>
        <Link href="#" className="ml-auto">
          <h1 className="opacity-50">맨위로가기</h1>
        </Link>
        <Link href="#" className="ml-auto">
          <h1 className="opacity-50">뒤로가기</h1>
        </Link>
      </div>
    </motion.div>
  );
};

export default FloatingNavigate;
