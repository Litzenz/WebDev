import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function MyFirstComponent() {
    return (
        <View style={styles.container}>
            <Text style={styles.redText}>Hello, world!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, alignItems: 'center',justifyContent: 'center'
    },
    redText: {
        color: 'red', fontSize: 30
    }
});