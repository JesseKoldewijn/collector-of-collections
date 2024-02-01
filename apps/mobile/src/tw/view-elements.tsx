import { styled } from "nativewind";
import { View } from "react-native";

import { cn } from "@/util/cn";

type TwComponentView = React.ComponentProps<typeof View>;

export const TwView = (props: TwComponentView) => {
  const StyledView = styled(View);
  const { className, ...rest } = props;

  return (
    <StyledView
      className={cn("bg-neutral-200 dark:bg-neutral-950", className)}
      {...rest}
    ></StyledView>
  );
};
