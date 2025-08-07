import Footer from "@/components/ui/Footer";
import Navbar from "@/components/ui/Navbar/Navbar";
import React from "react";

const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <>
    <header>
      <Navbar/>
    </header>
    <main> {children} </main>
    <Footer/>
    </>
  )
}

export default layout;