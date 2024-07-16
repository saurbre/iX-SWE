import React, { useEffect } from "react";

export default function ProfilePage() {
  useEffect(() => {
    console.log("Visualizing the event loop:");
    function printHi() {
      console.log("Hi");
      printThere();
      printIX();
    }
    function printThere() {
      setTimeout(() => {
        console.log("there");
      }, 0);
    }
    function printIX() {
      console.log("iXperience 2024");
    }
    printHi();
  }, []);

  return <div>ProfilePage</div>;
}