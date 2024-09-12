'use client'
import { motion, useAnimationControls, useScroll } from 'framer-motion';
import { useEffect, useRef } from 'react';
const MainUnipost = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll({
    target: videoRef,
    offset: ["start end", "end start"]
  })
  const Control = useAnimationControls();
  useEffect(() => {
    const onScrollChange = (yProgress: number) => {
      if (!videoRef.current) return;
      if (yProgress < 0.1) {
        videoRef.current.pause();
        Control.start({ opacity: 0, y: 20 })
      } else if (yProgress < 0.25) {
        Control.start({ opacity: 1, y: 0 })
      } else if (yProgress < 0.5) {
        videoRef.current.play();
      } else if (yProgress > 0.6) {
        videoRef.current.pause();
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
          <h1 className='mb-2 md:mb-4 md:top-1 md:text-4xl text-[#0077ed]  w-full text-center tracking-tighter'> UNIPOST corp.</h1>
          <div className='max-w-xl mx-auto text-left mb-10'>
            <p className='mb-3'>- 경비지출관리 모바일과 PC로 실시간 회사의 모든 영수증 처리</p>
            <p className='mb-3'>- 법인카드 , 카드사 스크래핑, 개인카트, 현금영수증, 매입세금계산서, 지출결의서</p>
            <p className='mb-3'>- 결재기능 제공 및 다양한 결재 양식, 프로세스 커스터마이징</p>
            <p className='mb-3'>- sap erp 연동</p>
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
      </div>

    </section>
  )
}

export default MainUnipost;
