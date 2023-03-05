"use client";

import { useEffect, useState } from "react";

export default function OutsideClick(ref) {
  const [isClicked, setIsClicked] = useState();

  //console.log("outside Ref", isClicked)
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsClicked(true);
      } else {
        setIsClicked(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return isClicked;
}
