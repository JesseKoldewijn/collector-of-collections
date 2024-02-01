import { Tabs } from "expo-router";
import { HomeIcon, UserIcon } from "lucide-react-native";
import { useColorScheme } from "nativewind";

import { themeConfig } from "@/config/theme";

const RootLayout = () => {
  const { colorScheme } = useColorScheme();

  const theme = colorScheme === "dark" ? themeConfig.dark : themeConfig.light;

  return (
    <Tabs
      screenOptions={{
        header: () => null,
        tabBarStyle: {
          backgroundColor: theme.background,
          borderTopColor: theme.tabBorder,
        },
        tabBarItemStyle: {
          height: 60,
          paddingBottom: 10,
          paddingTop: 15,
          display: "flex",
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
          marginHorizontal: 10,
        },
        tabBarActiveTintColor: theme.tabIconActive,
        tabBarLabelStyle: {
          color: theme.tabIcon,
          fontSize: 12,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          href: "/",
          title: "Home",
          tabBarIcon: () => {
            return <HomeIcon color={theme.tabIcon} />;
          },
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          href: "/about",
          title: "About",
          tabBarIcon: () => {
            return <UserIcon color={theme.tabIcon} />;
          },
        }}
      />
    </Tabs>
  );
};

export default RootLayout;
