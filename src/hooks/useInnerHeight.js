import { useState, useEffect } from "react";

const useInnerHeight = (query) => {

  const [sectionHeight, setSectionHeight] = useState(`${window.innerHeight}px`);
  const mobile = window.matchMedia(query);

  useEffect(() => {
    const setHeight = () => {
      if (mobile.matches) {
        setSectionHeight(`${window.innerHeight}px`);
      }
    };

    window.addEventListener("resize", setHeight);

    return () => window.removeEventListener("resize", setHeight);
  }, [mobile.matches]);

  const innerHeight = {
    height: sectionHeight,
  };

  return [innerHeight];
};

export { useInnerHeight };
