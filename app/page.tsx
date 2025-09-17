import {Sun} from 'lucide-react';
import Image from "next/image";
import logo from "@/public/logo.png";

export default function Home() {
  return (
      <div className="min-h-screen poke-bg">
          <div className="text-4xl justify-center items-center h-[334px] px-4 pt-12 relative">
              <Image src={logo} width={1021} height={334} alt={"logo"} className="w-full max-w-[800px] h-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"/>
              <Sun
                  width={64}
                  height={64}
                  color={"#f4f702"}
                  fill={"#f7d802"}
                  className={
                      "cursor-pointer hover:rotate-90 hover:scale-110 transition-all duration-500 absolute right-4 top-4"
                  }
              />
          </div>
      </div>
  );
}
