import { backendHostname } from "@/config/constants";
import { TwText, TwView } from "@/tw";

const Home = () => {
  return (
    <TwView className="flex h-full items-center justify-center">
      <TwText>hello world</TwText>
      <TwText>{backendHostname}</TwText>
    </TwView>
  );
};

export default Home;
