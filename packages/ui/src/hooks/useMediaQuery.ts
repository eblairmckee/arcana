import { useCallback, useEffect, useState } from "react";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useEffect : () => {};

export const useMediaQuery = (query: string): boolean => {
  // Initialize with null to prevent hydration mismatch
  const [matches, setMatches] = useState<boolean | null>(null);

  const getMatches = useCallback((query: string): boolean => {
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches;
    }
    return false;
  }, []);

  // Update matches after mount to prevent hydration mismatch
  useIsomorphicLayoutEffect(() => {
    setMatches(getMatches(query));
  }, [query, getMatches]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia(query);

      const handleChange = () => {
        setMatches(getMatches(query));
      };

      mediaQuery.addEventListener("change", handleChange);

      return () => {
        mediaQuery.removeEventListener("change", handleChange);
      };
    }
  }, [query, getMatches]);

  // Return false during SSR, actual value after hydration
  return matches ?? false;
};
