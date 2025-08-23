"use client";
import Hero from "@/components/hero";
// import Comingsoon from "@/components/comingsoon";
import Navbar from "@/components/navbar";
import ScrollWrapper from "@/components/scrollwrapper";
// Tomorrow font for logo

export default function Home() {
 
 

  return (
    <div className="h-[1000px] bg-white ">
      <ScrollWrapper>
    {/* <Comingsoon /> */}

    <Navbar />
    <Hero />


    
    </ScrollWrapper>
    </div>
  );
}
