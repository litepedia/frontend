import React from 'react'

function loading() {
  return (
    <div className="search-page-loader container">
      <div style={{ width: "30%" }} className="skeleton"></div>
      <div className='flex'>
        <div style={{ width: "40%" }} className="skeleton"></div>
        <div style={{ width: "60%" }} className="skeleton"></div>
        <div style={{ width: "65%" }} className="skeleton"></div>
        <div style={{ width: "75%" }} className="skeleton"></div>
      </div>
    </div>
  );
}

export default loading

