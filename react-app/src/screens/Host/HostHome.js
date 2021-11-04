import { StyleSheet, Image } from "react-native";

import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HostManage from "./HostManage";
import HostChat from "./HostChat";
import HostProfile from "./HostProfile";

import {defaultOptions} from "../../components/Header";

const Tabs = createBottomTabNavigator();

export default function HostHome({ navigation, route }) {
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
						case "HostManage":
							filePath = require("../../../assets/menu.png");
							break;
						case "HostChat":
							filePath = require("../../../assets/chat.png");
							break;
						case "HostProfile":
							filePath = require("../../../assets/user.png");
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
				name="HostManage"
				component={HostManage}
				initialParams={{ socket: socket, loginState: loginState }}
				options={defaultOptions('Manage', 'white', '#cccccc')}
				listeners={({ navigation }) => ({
					blur: () => navigation.setParams({ screen: undefined }),
				})}
			/>
			<Tabs.Screen
				name="HostChat"
				component={HostChat}
				initialParams={{ socket: socket, loginState: loginState }}
				options={defaultOptions('Chat', 'white', '#cccccc')}
				listeners={({ navigation }) => ({
					blur: () => navigation.setParams({ screen: undefined }),
				})}
			/>
			<Tabs.Screen
				name="HostProfile"
				component={HostProfile}
				initialParams={{ socket: socket, loginState: loginState }}
				options={defaultOptions('Profile', 'white', '#cccccc')}
				listeners={({ navigation }) => ({
					blur: () => navigation.setParams({ screen: undefined }),
				})}
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
	}
});
