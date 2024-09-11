import Link from 'next/link';
const MainIntro = () => {
  return (
    <section className="flex flex-col justify-between relative text-white text-center overflow-hidden"
      style={{ minHeight: "calc(100vh - 44px)" }}
    >
      <div className=' p-5 text-white text-center w-full text-xs md:text-base'>
        <video autoPlay muted loop src="/assets/video/unipost-web.mp4" className='flex md:hidden w-[376px]'/>
        <video autoPlay muted loop src="/assets/video/unipost-web.mp4" className='hidden md:flex w-full'/>
        <div className='max-w-xl mx-auto'>
          unipost에서 솔루션 개발자로 어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고
          어쩌고저쩌고어쩌고저쩌고
        </div>
        <Link href="#" className='underline text-lg'>
        View Career
        </Link>
      </div>
      
    </section>
  )
}

export default MainIntro;