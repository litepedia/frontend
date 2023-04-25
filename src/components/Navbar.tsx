import Link from "next/link";
import React from "react";
function Navbar() {

  return (
    <div className="navbar">
      <div className="navbar-content">
        <Link href="/" className="navbar-logo">
          Logo
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
