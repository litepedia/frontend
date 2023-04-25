import React from 'react'

function loading() {
  return (
    <div className="main-page-loader container">
      <div style={{ width: "30%" }} className="skeleton"></div>
      <div style={{ width: "50%" }} className="skeleton"></div>
      <div style={{ width: "70%" }} className="skeleton"></div>
    </div>
  );
}

export default loading