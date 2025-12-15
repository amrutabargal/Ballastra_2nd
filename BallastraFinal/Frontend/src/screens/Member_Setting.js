import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Member_Setting() {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>Member settings coming soon</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#050B18' },
	text: { color: '#fff', fontSize: 16 },
});