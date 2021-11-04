import { Text, View } from "react-native";

import React from "react";

import LottieView from "lottie-react-native";

function HostChat() {
  return (
    <View style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
      <Text style={{ margin: 90, fontSize: 28 }}>Host Chat</Text>
      <LottieView source={require("../../../assets/Lottie/Chat.json")} autoPlay />
    </View>
  );
}

export default HostChat;
