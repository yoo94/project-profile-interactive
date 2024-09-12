import MainCareer from "./components/main-career";
// import MainPersonal from "./components/main-personal";
import MainTitle from "./components/main-title";
import MainUnipost from "./components/main-unipost";

export default function Home() {
  return (
    <>
      <MainTitle />
      <MainUnipost />
      <MainCareer />
      {/* <MainPersonal /> */}
    </>
  );
}
