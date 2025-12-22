import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="mt-12 absolute bottom-36 left-1/2 transform -translate-x-1/2">
        <Link href="/puzzle" className="group">
          <button className="btn-tech px-8 py-4 text-2xl md:text-3xl font-orbitron font-bold rounded-sm cursor-pointer">
            Let's Go
          </button>
        </Link>
      </div>
    </main>
  );
}
