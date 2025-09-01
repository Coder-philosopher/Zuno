"use client";
import Hero from "@/components/hero";
// import Comingsoon from "@/components/comingsoon";
import Navbar from "@/components/navbar";
import ScrollWrapper from "@/components/scrollwrapper";
// Tomorrow font for logo
// import ComingSoon from "@/components/comingsoon"

export default function Home() {
 
 

  return (
    <div className="h-[1000px] bg-white ">
      <ScrollWrapper>
    {/* <ComingSoon /> */}

    <Navbar />
    <Hero />


    
    </ScrollWrapper>
    </div>
  );
}
