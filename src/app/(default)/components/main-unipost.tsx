'use client'
import { motion, useAnimationControls, useScroll } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
const MainUnipost = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll({
    target: videoRef,
    offset: ["start end", "end start"]
  })
  const Control = useAnimationControls();
  const Control2 = useAnimationControls();
  useEffect(() => {
    const onScrollChange = (yProgress: number) => {
      if (!videoRef.current) return;
      if (yProgress < 0.2) {
        Control.start({ opacity: 0, y: 20 })
      } else if (yProgress < 0.3) {
        Control.start({ opacity: 1, y: 0 })
        Control2.start({ opacity: 0, y: 20 })
      } else if (yProgress < 0.4) {
        videoRef.current.play();
        Control2.start({ opacity: 1, y: 0 })
      }
    }
    const unsubScriveY = scrollYProgress.on("change", onScrollChange)
    return () => { unsubScriveY() }
  }, [])
  return (
    <section className="bg-[#101010] flex flex-col items-center justify-between relative text-white text-center overflow-hidden"
      style={{ minHeight: "calc(100vh - 44px)" }}
    >
      <div className=' p-5 text-white text-center w-full text-xs md:text-base bg-[#ldldlf]'>
        <motion.div className='font-light'
          initial={{ opacity: 0 }}
          animate={Control}
          transition={{ duration: 1 }}
        >
          <h1 className='mb-2 md:mb-4 md:top-1 md:text-4xl text-[#0077ed]  w-full text-center tracking-tighter'>UNIPOST</h1>
          <div className='max-w-xl mx-auto'>
            unipost에서 솔루션 개발자로 어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고
            어쩌고저쩌고어쩌고저쩌고
          </div>
        </motion.div>
        <div className='w-full relative'>
          <video ref={videoRef} muted loop src="/assets/video/unipost-web.mp4" className='flex md:hidden w-[376px]'>
            <source src="/assets/video/unipost-web.webm" type='video/mp4' />
            브라우저에서 해당 video tag를 지원하지 않습니다.
          </video>
          <video ref={videoRef} muted loop src="/assets/video/unipost-web.mp4" className='hidden md:flex w-full' >
            <source src="/assets/video/unipost-web.webm" type='video/mp4' />
          </video>
        </div>
        <motion.div className='font-light'
          initial={{ opacity: 0, y: 20 }}
          animate={Control}
          transition={{ duration: 1 }}
        >
          <motion.button className='mt-3 bg-[#0071e3] hover:bg-[#0077ed] py-2.5 w-24 text-center rounded-full'
            initial={{ opacity: 0, y: 20 }}
            animate={Control2}
            transition={{ duration: 1 }}
          >
            <Link href="#" className='underline text-sm relative flex items-center justify-center cursor-pointer bg-[#0071e3] hover:bg-[#0077ed] text-center rounded-full'>
              View project
            </Link>
          </motion.button>
        </motion.div>

      </div>

    </section>
  )
}

export default MainUnipost;
