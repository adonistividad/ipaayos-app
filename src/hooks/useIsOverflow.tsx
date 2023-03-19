// https://www.robinwieruch.de/react-custom-hook-check-if-overflow/
import * as React from "react";

export const useIsOverflow = (ref: any, callback: any= undefined) => {
  const [isOverflow, setIsOverflow] = React.useState<any>(undefined);

  React.useLayoutEffect(() => {
    const { current } = ref;

    const trigger = () => {
      const hasOverflow: any = current.scrollHeight > current.clientHeight;

      setIsOverflow(hasOverflow);

      if (callback) callback(hasOverflow);
    };

    if (current) {
      if ("ResizeObserver" in window) {
        new ResizeObserver(trigger).observe(current);
      }

      trigger();
    }
  }, [callback, ref]);

  return isOverflow;
};
