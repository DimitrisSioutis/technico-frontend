"use client"
import Logo from "@/components/navbar/Logo";
import Image from "next/image";

export default function Home() {
  return (
    <div className="lg:flex">
      <Image src="/hero.jpg"
            width={800}
            height={400}
            alt="Picture of renovations"
      />
      <div className="m-auto text-center text-[4rem] font-extrabold italic">
        Welcome to
        <Logo fill={"black"} height={110} width={360}/>
      </div>
    </div>
  );
}
