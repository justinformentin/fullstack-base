import { useEffect, useRef } from "react";

export default function usePrevious(val) {
  const ref = useRef();

  useEffect(() => {
    ref.current = val;
  }, [val]);

  return ref.current;
}
