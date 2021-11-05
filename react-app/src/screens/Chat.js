import { TouchableOpacity, ScrollView, ImageBackground, Text } from "react-native";
import React, { useEffect, useState, useReducer } from "react";
import { ListItem, Avatar } from 'react-native-elements'

export default function Chat({ navigation, route }) {
	const socket = route.params.socket;
	const loginState = route.params.loginState;

	const [messages, setMessages] = useState([]);

	socket.on('newMessage', (response) => {
		for(let i = 0; i < messages.length; i++) {
			if(messages[i]._id == response.mid) {
				let msgs = messages;
				msgs[i].messages.push(response.message);
				setMessages(msgs);
			}
		}
	});

	useEffect(() => {
		if (loginState.signInType == 'HOST') {
			socket.emit("retreiveHostInfo", { hid: loginState.id }, (err, res) => {
				if (err) {
					return;
				}

				if (res.length != 0) { setMessages(res.messages) }
			});
		} else {
			socket.emit("retreiveStudentInfo", { sid: loginState.id }, (err, res) => {
				if (err) {
					return;
				}

				if (res.length != 0) { setMessages(res.messages) }
			});
		}
	}, []);

	return (
		<ScrollView style={{ width: '100%', height: '100%' }}>
			{
				messages.map((item, index) => {
					return (
						<TouchableOpacity
							activeOpacity={1}
							containerStyle={{
								width: '100%',
								margin: 0
							}}
							style={{
								borderColor: '#cccccc',
								borderBottomWidth: 0.5
							}}
							key={index}
							onPress={() => {
								if (loginState.signInType == 'HOST') {
									navigation.navigate('Message',
										{
											rid: item.firstId._id == loginState.id ? item.secondId._id : item.firstId._id,
											createChat: false
										});
										return;
								}
								navigation.navigate('StudentMiscStack',
									{
										screen: 'Message',
										params: {
											rid: item.firstId._id == loginState.id ? item.secondId._id : item.firstId._id,
											createChat: false
										}
									});
							}}
						>
							<ListItem
								key={index}
								containerStyle={{
									width: '100%',
									margin: 0
								}}
							>
								<ImageBackground
									source={{ uri: item.firstId._id == loginState.id ? item.secondId.imageURL : item.firstId.imageURL }}
									resizeMode={'cover'}
									style={{
										width: 45,
										height: 45,
										borderRadius: 22.5,
										justifyContent: 'center',
										alignItems: 'center',
										backgroundColor: '#e3e3e3',
									}}
									imageStyle={{
										width: 45,
										height: 45,
										borderRadius: 22.5
									}}
								>
									<Text style={{
										color: '#a8a8a8',
										fontSize: 18,
										fontWeight: '500',
										zIndex: -1
									}}>{(item.firstId._id == loginState.id ? item.secondId.hostName : item.firstId.fullName.firstName).charAt(0)}</Text>
								</ImageBackground>
								<ListItem.Content style={{ alignItems: 'flex-start' }}>
									<ListItem.Title style={{ fontSize: 16, fontWeight: 'bold' }}>
										{
											item.firstId._id == loginState.id ?
												item.secondId.hostName :
												`${item.firstId.fullName.firstName} ${item.firstId.fullName.lastName}`
										}
									</ListItem.Title>
									<ListItem.Subtitle style={{ color: '#525252' }}>{item.messages[item.messages.length - 1].text}</ListItem.Subtitle>
								</ListItem.Content>

								<ListItem.Chevron />
							</ListItem>
						</TouchableOpacity>
					);
				})
			}
		</ScrollView>
	);
};