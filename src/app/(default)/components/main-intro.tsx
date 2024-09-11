import Link from 'next/link';
const MainIntro = () => {
  return (
    <section className="bg-black flex flex-col justify-between relative text-white text-center overflow-hidden"
      style={{ minHeight: "calc(100vh - 44px)" }}
    >
      <div>
        unipost에서 솔루션 개발자로 어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고
        어쩌고저쩌고어쩌고저쩌고
      </div>
      <Link href="#">
        View Career
      </Link>
    </section>
  )
}

export default MainIntro;