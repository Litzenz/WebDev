import React from 'react';
import { View, Text, StyleSheet, Picker } from 'react-native';

export function BorderPaddingDemo() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'stretch' }}>
            <View style={{ height: 50, backgroundColor: 'powderblue', alignSelf: 'stretch' }} />
            <Text style={{
                backgroundColor: 'skyblue',
                padding: 10,
                borderWidth: 1,
                borderColor: 'red',
                margin: 20
            }}>Hello, World!</Text>
            <View style={{ height: 50, backgroundColor: 'steelblue', alignSelf: 'stretch' }} />
        </View>
    );
}

export function FlexProportionDemo() {
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 3, backgroundColor: 'powderblue' }}/>
            <View style={{ flex: 2, backgroundColor: 'skyblue' }}/>
            <View style={{ flex: 1, backgroundColor: 'steelblue' }}/>
        </View>
    );
}

const FLEX_DIRECTIONS = [
    'column', 'row', 'row-reverse', 'column-reverse'
];

const JUSTIFY_CONTENTS = [
    'flex-start', 'flex-end', 'center',
    'space-between', 'space-around', 'space-evenly'
];

const ALIGN_ITEMS = [
    'stretch', 'flex-start', 'flex-end',
    'center', 'baseline'
];

export class FlexDemo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fdIndex: 0,
            jcIndex: 0,
            aiIndex: 0
        }
    }

    render() {
        return (
            <>
                <Text style={styles.title}>Controls:</Text>

                <Text style={styles.subtitle}>Flex direction:</Text>
                <Picker
                    selectedValue={this.state.fdIndex}
                    onValueChange={v => this.setState({ fdIndex: v })}>

                    {FLEX_DIRECTIONS.map((item, index) => (
                        <Picker.Item key={index} label={item} value={index} />
                    ))}
                </Picker>

                <Text style={styles.subtitle}>Justify contents:</Text>
                <Picker
                    selectedValue={this.state.jcIndex}
                    onValueChange={v => this.setState({ jcIndex: v })}>

                    {JUSTIFY_CONTENTS.map((item, index) => (
                        <Picker.Item key={index} label={item} value={index} />
                    ))}
                </Picker>

                <Text style={styles.subtitle}>Align items:</Text>
                <Picker
                    selectedValue={this.state.aiIndex}
                    onValueChange={v => this.setState({ aiIndex: v })}>

                    {ALIGN_ITEMS.map((item, index) => (
                        <Picker.Item key={index} label={item} value={index} />
                    ))}
                </Picker>

                <Text style={styles.title}>Demo:</Text>
                <View style={[styles.demo, {
                    flexDirection: FLEX_DIRECTIONS[this.state.fdIndex],
                    alignItems: ALIGN_ITEMS[this.state.aiIndex],
                    justifyContent: JUSTIFY_CONTENTS[this.state.jcIndex]
                }]}>
                    <View style={[styles.box, { backgroundColor: 'powderblue' }]} />
                    <View style={[styles.box, { backgroundColor: 'skyblue' }]} />
                    <View style={[styles.box, { backgroundColor: 'steelblue' }]} />
                </View>
            </>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24
    },
    subtitle: {
        fontSize: 16
    },

    demo: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'darkblue',
        margin: 10
    },

    box: {
        width: 50,
        height: 50
    }
});