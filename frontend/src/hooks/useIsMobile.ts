import { useEffect, useState } from "react";

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia("(max-width: 1024px)").matches,
  );

  useEffect(function () {
    const mediaQuery = window.matchMedia("(max-width: 1024px)");

    function handleChange() {
      setIsMobile(mediaQuery.matches);
    }

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return isMobile;
}
