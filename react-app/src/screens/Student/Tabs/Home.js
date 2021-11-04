import { StyleSheet, Image } from "react-native";
import React from "react";
import { defaultOptions } from '../../../components/Header';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Explore from "./Explore";
import Profile from "./Profile";
import CardSwipe from "../../../components/CardSwipe/index";
import Chat from "../../Chat";

const Tabs = createBottomTabNavigator();

export default function Home({ route }) {
  const socket = route.params.socket;
  const loginState = route.params.loginState;

  return (
    <Tabs.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          position: "absolute",
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: "#ffffff",
          borderRadius: 15,
          height: 90,
          ...styles.shadow,
        },
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let filePath;
          switch (route.name) {
            case "Swipe":
              filePath = require("../../../../assets/up-arrow.png");
              break;
            case "Explore":
              filePath = require("../../../../assets/menu.png");
              break;
            case "Chat":
              filePath = require("../../../../assets/chat.png");
              break;
            case "Profile":
              filePath = require("../../../../assets/user.png");
              break;
            default:
              iconName = focused
                ? "ios-information-circle"
                : "ios-information-circle-outline";
          }
          return (
            <Image
              source={filePath}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? "#51b375" : "#748c94",
              }}
            />
          );
        },
      })}
    >
      <Tabs.Screen
        name="Swipe"
        component={CardSwipe}
        initialParams={{ socket: socket, loginState: loginState }}
        options={{ headerShown: false }}
        listeners={({ navigation }) => ({
          blur: () => navigation.setParams({ screen: undefined }),
        })}
      />
      <Tabs.Screen
        name="Explore"
        component={Explore}
        initialParams={{ socket: socket, loginState: loginState }}
        options={{ headerShown: false }}
        listeners={({ navigation }) => ({
          blur: () => navigation.setParams({ screen: undefined }),
        })}
      />
      <Tabs.Screen
        name="Chat"
        component={Chat}
        options={defaultOptions('Chat', 'white', '#cccccc')}
      />
      <Tabs.Screen
        name="Profile"
        options={defaultOptions('Profile', 'white', '#cccccc')}
        component={Profile}
        initialParams={{ socket: socket, loginState: loginState }}
      />
    </Tabs.Navigator>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
