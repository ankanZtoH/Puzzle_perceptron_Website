import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-start justify-between min-h-screen text-center p-8 bg-black/40 backdrop-blur-[3px]">
      <h1 className="text-8xl md:text-8xl font-black ml-30 mt-10 tracking-tighter text-white drop-shadow-2xl">
        PERCEPTRON
      </h1>

      {/* <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-8 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] tracking-tight">
        Crack the code. <br className="hidden md:block" />
        Unlock the door.
      </h1> */}
      <Link href="/puzzle" passHref>
        <button className="group relative ml-80 mb-20 px-8 py-4 bg-yellow-400 text-black font-bold text-xl rounded-full overflow-hidden transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-black">
          <span className="relative z-10 group-hover:text-black transition-colors cursor-pointer">Let's Go</span>
        </button>
      </Link>

    </div>
  );
}
