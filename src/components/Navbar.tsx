import { prefix } from "@/consts";
import Link from "next/link";
import React from "react";
function Navbar() {

  return (
    <div className="navbar">
      <div className="navbar-content">
        <Link href={`${prefix}/`} className="navbar-logo">
          Logo
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
