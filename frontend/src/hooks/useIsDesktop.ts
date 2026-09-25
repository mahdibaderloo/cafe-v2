import { useEffect, useState } from "react";

export function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(
    () => window.matchMedia("(min-width: 1025px)").matches,
  );

  useEffect(function () {
    const mediaQuery = window.matchMedia("(min-width: 1025px)");

    function handleChange() {
      setIsDesktop(mediaQuery.matches);
    }

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return isDesktop;
}
