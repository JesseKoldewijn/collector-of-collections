import { Tabs } from "expo-router";

const RootLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          href: "/",
          title: "Home",
        }}
      />
    </Tabs>
  );
};

export default RootLayout;
