import { styled } from "nativewind";
import { Text } from "react-native";

import { cn } from "@/util/cn";

type TwComponentText = React.ComponentProps<typeof Text>;

export const TwText = (props: TwComponentText) => {
  const StyledText = styled(Text);
  const { className, children, ...rest } = props;

  return (
    <StyledText
      className={cn("text-neutral-950 dark:text-neutral-200", className)}
      {...rest}
    >
      {children}
    </StyledText>
  );
};
