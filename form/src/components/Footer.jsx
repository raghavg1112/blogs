import React from "react";

export default function Footer() {
  return (
    <>
      <div
        className="bg-light text-dark mt-4 p-3 sticky"
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <p>© 2023</p>
        <div className="flex items-center">
          <p className="font-medium">
            Made with <span className="text-red-500">❤️</span> by Raghav.
          </p>
          <p></p>
        </div>
      </div>
    </>
  );
}
