import { Suspense, useEffect, useState } from "react";

import { TwText, TwView } from "@/tw";

const Home = () => {
  const [testData, setTestData] = useState<string>("loading...");

  const getTestData = async () => {
    setTestData("And welcome!");
  };

  useEffect(() => {
    getTestData();
  }, []);

  return (
    <TwView className="flex h-full items-center justify-center">
      <TwText>hello world - about page</TwText>
      <Suspense>
        <TwText>{testData}</TwText>
      </Suspense>
    </TwView>
  );
};

export default Home;
