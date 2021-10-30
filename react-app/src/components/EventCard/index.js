import React from "react";
import {
	Text,
	ImageBackground,
	SafeAreaView,
	StyleSheet,
	View
} from "react-native";

const Tag = ({ tag }) => {
	return (<View style={styles.tagView}>
		<Text style={styles.tagText}>{tag.tagName}</Text>
	</View>)
};

export default function Card(props) {
	const event = props.eventData;

	return (
		<SafeAreaView style={styles.card}>
			<ImageBackground
				source={{
					uri: event.imageURL,
				}}
				style={styles.image}
			>
				<SafeAreaView style={styles.cardInner}>
					<Text style={styles.event_name}>{event.eventName} </Text>
					{
						event.evenHost &&
						<Text style={styles.event_host}>Host: {event.eventHost}</Text>
					}
					<Text style={styles.event_loc}>Loc: {event.location}</Text>
					<Text style={styles.event_loc}>Date: {event.dateTime}</Text>
					{
						typeof event.tags !== "undefined" &&
						<View>
							<Text style={styles.event_loc}>Tags:</Text>
							{
								event.tags.map(tag => {
									return <Tag tag={tag} />
								})
							}
						</View>
					}
				</SafeAreaView>
			</ImageBackground>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	tagView: {
		backgroundColor: '#fefefe',
		borderRadius: 10
	},
	card: {
		width: "92%",
		height: "96%",
		borderRadius: 20,
		backgroundColor: 'white'
	},
	image: {
		width: "100%",
		height: "100%",
		borderRadius: 10,
		overflow: "hidden",
		justifyContent: "flex-end",
	},
	cardInner: {
		padding: 10,
	},
	event_name: {
		fontSize: 30,
		color: "white",
		fontWeight: "bold",
		marginBottom: 20,
	},
	event_desc: {
		fontSize: 24,
		color: "white",
		marginBottom: 5,
	},
	event_host: {
		fontSize: 20,
		color: "white",
		marginBottom: 5,
	},
	event_loc: {
		fontSize: 18,
		color: "white",
		marginBottom: 5,
	},
});
