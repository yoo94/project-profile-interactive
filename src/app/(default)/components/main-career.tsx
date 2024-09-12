'use client'
import { motion, useAnimationControls, useScroll } from 'framer-motion';
import { useEffect, useRef } from 'react';
import Link from 'next/link'
import LogoSwiper from './logoSwipoer';
const MainCareer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll({
    target: videoRef,
    offset: ["start end", "end start"]
  })
  const Control = useAnimationControls();
  const Control2 = useAnimationControls();

  useEffect(() => {
    const onScrollChange = (yProgress: number) => {
      console.log("yProgress", yProgress);
      if (yProgress < 0.54) {
        Control.start({ opacity: 0, y: 20 });
        Control2.start({ opacity: 0, y: 20 });
      } else {
        Control.start({ opacity: 1, y: 0 });
        Control2.start({ opacity: 1, y: 0 });
      }
    }
    const unsubScriveY = scrollYProgress.on("change", onScrollChange)
    return () => { unsubScriveY() }
  }, [])
  return (
    <section className="bg-[#101010] flex flex-col relative text-white text-center gap-4 py-10">
      <div className="max-w-[1260px] w-full mx-auto relative">
        <div className="flex flex-wrap w-full gap-6 items-center px-4 lg:px-0 pb-10">
          <motion.h1 className="font-semibold self-start w-full text-left md:w-auto text-2xl md:text-[40px] text-[#86868b]  mr-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={Control}
            transition={{ duration: 1 }}
          >
            투입 project
          </motion.h1>
          <motion.div className="md:text-xl font-semibold text-[#0071e3] cursor-pointer hover:underline"
            initial={{ opacity: 0, y: 20 }}
            animate={Control2}
            transition={{ duration: 1 }}
          >
            <Link href="https://yoo94.github.io/about/#/" target='_blank'>
              about devlp
            </Link>
          </motion.div>
        </div>
      </div>
      <div className="flex w-full">
        <div className="bg-black w-full mr-auto">
          <LogoSwiper />
        </div>
      </div>
    </section>

  )
}

export default MainCareer;
