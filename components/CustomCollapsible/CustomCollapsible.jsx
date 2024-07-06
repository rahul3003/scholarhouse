import Image from "next/image";
import React, { useState } from "react";

const CustomCollapsible = ({ header, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const headerStyle = {
    backgroundColor: isOpen ? "#181059" : "#ffffff",
    color: isOpen ? "#ffffff" : "#000000",
    padding: "10px 16px",
    cursor: "pointer",
    border: "1px solid #ddd",
    borderRadius: isOpen ? "8px 8px 0 0" : "8px",
    fontWeight: "bold",
  };

  const contentStyle = {
    maxHeight: isOpen ? "500px" : "0px",
    overflow: "hidden",
    transition: "max-height 0.3s ease-out",
    backgroundColor: isOpen ? "#181059" : "#ffffff",
    color: isOpen ? "#ffffff" : "#000000",
    padding: isOpen ? "10px 16px" : "0px 16px",
    border: isOpen ? "1px solid #ddd" : "none",
    borderTop: "none",
    borderRadius: "0 0 8px 8px",
  };

  return (
    <div style={{ marginBottom: 24, borderRadius: 8, overflow: "hidden" }}>
      <div
        className="flex justify-between text-[24px] font-bold"
        onClick={toggle}
        style={headerStyle}
      >
        {header}
        {isOpen ? (
          <Image src="/dropDown.svg" width={30} height={30} alt="imag"/>
        ) : (
          <Image src="/dropDown.svg" width={30} height={30} alt="imag"/>
        )}
      </div>
      <div style={contentStyle}>{children}</div>
    </div>
  );
};

export default CustomCollapsible;
