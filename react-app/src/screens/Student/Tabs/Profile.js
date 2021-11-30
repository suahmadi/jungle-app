import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
} from "react-native";
import React from "react";
import { ListItem, Avatar } from "react-native-elements";

import { AuthContext } from "../../../utils/context";

import HostData from "../../../../assets/events-data/HostData";
import eventsData from "../../../../assets/events-data/eventsData";
import users from "../../../../assets/events-data/users";
import { List } from "native-base";
import { Icon } from "react-native-elements";
import { fontWeight, paddingBottom, style } from "styled-system";

export default function Profile({ navigation, route }) {
  const socket = route.params.socket;
  const loginState = route.params.loginState;
  const { signOut } = React.useContext(AuthContext);
  const onSignout = () => {
    signOut();
  };

  const onPref = () => {
    navigation.navigate("StudentMiscStack", {
      screen: "ChangePref",
      params: {
        users: users[0],
        socket: socket,
        loginState: loginState,
      },
    });
  };

  const onFollowing = () => {
    navigation.navigate("StudentMiscStack", {
      screen: "FollowedHosts",
      params: {
        HostData: HostData[0],
        eventsData: eventsData,
        socket: socket,
        loginState: loginState,
      },
    });
  };

  const list = [
    {
      name: "Amy Farha",
      avatar_url:
        "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
      subtitle: "Vice President",
      key: 1,
    },
    {
      name: "Chris Jackson",
      avatar_url:
        "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
      subtitle: "Vice Chairman",
      key: 2,
    },
  ];

  const pressed = (direction) => {
    console.log(direction);
    navigation.navigate("StudentMiscStack", {
      screen: direction,
    });
  };
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        alignItems: "center",
        backgroundColor: "white"
      }}
    >
      {/*
      <Avatar
        rounded
        size='xlarge'
        containerStyle={{ marginTop: "3%" }}
        source={{
          uri: "https://i.insider.com/5dcc135ce94e86714253af21?width=1000&format=jpeg&auto=webp",
        }}
      />
      <Text style={{ fontWeight: "bold", fontSize: 25 }}>John Doe</Text>
      <Text style={{ fontWeight: "bold", fontSize: 15 }}>Followed: 0</Text>
      */}
      <Text style={styles.settingsTitle}>
        Settings
      </Text>
      <ListItem
        bottomDivider
        containerStyle={{ width: "100%", paddingHorizontal: 20, paddingTop: 10 }}
        onPress={() => pressed("AccountInfo")}
      >
        {/*<Icon
          type={"material-icons"}
          name={"info"}
          size={20}
          color='black'
          containerStyle={{
            marginRight: "1%",
          }}
        />*/}
        <ListItem.Content>
          <ListItem.Title>
            <Text style={styles.listTitle}>Account Info</Text>
          </ListItem.Title>
          <ListItem.Subtitle>
            <Text style={styles.listSubtitle}>Update your account information</Text>
          </ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron color="black" />
      </ListItem>

      <ListItem
        bottomDivider
        containerStyle={{ width: "100%", paddingHorizontal: 20 }}
        onPress={() => pressed("ChangePref")}
      >
        {/*<Icon
          type={"material-icons"}
          name={"favorite"}
          size={20}
          color='black'
          containerStyle={{
            marginRight: "1%",
          }}
        />*/}
        <ListItem.Content>
          <ListItem.Title>
            <Text style={styles.listTitle}>Preferences</Text>
          </ListItem.Title>
          <ListItem.Subtitle>
            <Text style={styles.listSubtitle}>Change your event preferences</Text>
          </ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron color="black" />
      </ListItem>

      <ListItem
        bottomDivider
        containerStyle={{ width: "100%", paddingHorizontal: 20, }}
        onPress={() => pressed("FollowedHosts")}
      >
        {/*<Icon
          type={"material-icons"}
          name={"bookmark"}
          size={20}
          color='black'
          containerStyle={{
            marginRight: "1%",
          }}
        />*/}
        <ListItem.Content>
          <ListItem.Title>
            <Text style={styles.listTitle}>FollowedHosts</Text>
          </ListItem.Title>
          <ListItem.Subtitle>
            <Text style={styles.listSubtitle}>View the hosts you follow</Text>
          </ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron color="black" />
      </ListItem>

      <ListItem
        bottomDivider
        containerStyle={{ width: "100%", paddingHorizontal: 20 }}
        onPress={() => pressed("Notifications")}
      >
        {/*<Icon
          type={"material-icons"}
          name={"receipt"}
          size={20}
          color='black'
          containerStyle={{
            marginRight: "1%",
          }}
        />*/}
        <ListItem.Content>
          <ListItem.Title>
            <Text style={styles.listTitle}>Notifications</Text>
          </ListItem.Title>
          <ListItem.Subtitle>
            <Text style={styles.listSubtitle}>Manage event and message notifications</Text>
          </ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron color="black" />
      </ListItem>

      <ListItem
        bottomDivider
        containerStyle={{ width: "100%", paddingHorizontal: 20 }}
        onPress={() => pressed("Help")}
      >
        {/*<Icon
          type={"material-icons"}
          name={"help"}
          size={20}
          color='black'
          containerStyle={{
            marginRight: "1%",
          }}
        />*/}
        <ListItem.Content>
          <ListItem.Title>
            <Text style={styles.listTitle}>Help</Text>
          </ListItem.Title>
          <ListItem.Subtitle>
            <Text style={styles.listSubtitle}>Contact the developers</Text>
          </ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron color="black" />
      </ListItem>

      <ListItem
        bottomDivider
        containerStyle={{ width: "100%", paddingHorizontal: 20 }}
        onPress={() => pressed("About")}
      >
        {/*<Icon
          type={"material-icons"}
          name={"pending"}
          size={20}
          color='black'
          containerStyle={{
            marginRight: "1%",
          }}
        />*/}
        <ListItem.Content>
          <ListItem.Title>
            <Text style={styles.listTitle}>
              About
            </Text>
          </ListItem.Title>
          <ListItem.Subtitle>
            <Text style={styles.listSubtitle}>
              Learn more about the developers
            </Text>
          </ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron color="black" />
      </ListItem>

      <ListItem
        bottomDivider
        containerStyle={{ width: "100%", paddingHorizontal: 20 }}
        onPress={() => pressed("About")}
      >
        <ListItem.Content>
          <ListItem.Title>
            <Text style={styles.listTitle}>Sign Out</Text>
          </ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron color="black" />
      </ListItem>

      <TouchableOpacity style={styles.signOutBtn} onPress={onSignout}>
        <Text style={styles.signOutBtnText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  signOutBtn: {
    top: 560,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    opacity: 0.8,
    width: "50%",
    backgroundColor: "#85ba7f",
    padding: 15,
    borderRadius: 10,
    position: "absolute",
  },
  signOutBtnText: {
    alignSelf: "center",
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: 12,
    color: "#2f402d",
  },
  settingsTitle: {
    alignSelf: "flex-start",
    paddingBottom: 10,
    paddingTop: 20,
    paddingHorizontal: 20,
    fontWeight: "bold",
    fontSize: 24
  },
  listTitle: {
    fontSize: 17
  },
  listSubtitle: {
    fontSize: 13
  },
  listItemContainer: {
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10
  }
});
