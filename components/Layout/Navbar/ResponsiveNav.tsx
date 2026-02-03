"use client";

import React, { useState } from "react";
import Navbar from "./Navbar";
import MobileNav from "./MobileNav";

// Type Props nhận User
type Props = {
  currentUser?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string;
  } | null;
};

const ResponsiveNav = ({ currentUser }: Props) => {
  const [showNav, setShowNav] = useState(false);
  const openNavHandler = () => setShowNav(true);
  const closeNavHandler = () => setShowNav(false);

  return (
    <div>
      {/* Truyền currentUser xuống Navbar */}
      <Navbar openNav={openNavHandler} currentUser={currentUser} />
      
      {/* Truyền currentUser xuống MobileNav */}
      <MobileNav 
        showNav={showNav} 
        closeNav={closeNavHandler} 
        currentUser={currentUser} 
      />
    </div>
  );
};

export default ResponsiveNav;