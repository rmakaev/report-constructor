import { useMemo, useState } from "react";

const useBoolean = (defaultValue?: boolean) => {
  const [value, setValue] = useState(!!defaultValue);

  const controls = useMemo(
    () => ({
      setTrue: () => setValue(true),
      setFalse: () => setValue(false),
      toggle: () => setValue((x) => !x),
    }),
    []
  );

  return {
    value,
    setValue,
    ...controls,
  };
};

export default useBoolean;
