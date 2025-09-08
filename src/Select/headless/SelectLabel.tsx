import type { ComponentProps } from "react";
import { useIdFor } from "./ids";

export const SelectLabel = (props: ComponentProps<"div">) => {
  const id = useIdFor("label");

  return <div id={id} {...props} />;
};
