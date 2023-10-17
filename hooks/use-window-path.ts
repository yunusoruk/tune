import { useEffect, useState } from "react";

export const useWindowPath = () => {
  const [mounted, setMounted] = useState(false);
  const windowPath = typeof window !== 'undefined' && window.location.pathname ? window.location.pathname : '';

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return ''
  }

  return windowPath;
};