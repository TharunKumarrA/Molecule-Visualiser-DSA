import { SiMoleculer } from "react-icons/si";

export default function NavBar() {
  return (
    <div className="flex flex-row w-screen overflow-hidden h-24 text-white font-inter">
      <div className="flex flex-row w-1/2 items-center font-light text-2xl ">
        <SiMoleculer className="flex justify-center items-center text-[#2ABD91] mx-4 text-4xl" />
        <div>MOLECULE VISUALIZER</div>
      </div>
      <div className="flex flex-row w-1/2 justify-end items-center font-light">
        <div className="flex mx-8 cursor-pointer">HOME</div>
        <div className="flex mx-8 cursor-pointer">VISUALIZER</div>
        <div className="flex mx-8 cursor-pointer">ABOUT</div>
        <div className="flex mx-8 cursor-pointer">TEAM</div>
      </div>
    </div>
  );
}
