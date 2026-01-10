import Link from "next/link";
// import { useState } from "react";
export default function Home() {
  // const [name, setName] = useState("");

  // const startPuzzle = async () => {
  //   const res = await fetch("http://localhost:8000/api/start/", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ name }),
  //   });

  //   const data = await res.json();

  //   // save contestant id
  //   localStorage.setItem("contestantId", data.id);

  //   // go to puzzle page
  //   window.location.href = "/puzzle";
  // };

  return (
    <main>
      <div className="mt-12 absolute bottom-36 left-1/2 transform -translate-x-1/2">
        <Link href="/rules" className="group">
          <button className="btn-tech px-8 py-4 text-2xl md:text-3xl font-orbitron font-bold rounded-sm cursor-pointer">
            Let's Go
          </button>
        </Link>
      </div>
    </main>
  );
}
