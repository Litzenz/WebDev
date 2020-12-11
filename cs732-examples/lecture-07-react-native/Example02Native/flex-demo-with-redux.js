import React from 'react';
import { View, Text, StyleSheet, Picker } from 'react-native';
import { connect } from 'react-redux';
import { setAlignItems, setFlexDirection, setJustifyContent } from './redux/actions';

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

function FlexDemoWithRedux({ aiIndex, fdIndex, jcIndex, setAlignItems, setFlexDirection, setJustifyContent }) {
    return (
        <>
            <Text style={styles.title}>Controls:</Text>

            <Text style={styles.subtitle}>Flex direction:</Text>
            <Picker
                selectedValue={fdIndex}
                onValueChange={v => setFlexDirection(v)}>

                {FLEX_DIRECTIONS.map((item, index) => (
                    <Picker.Item key={index} label={item} value={index} />
                ))}
            </Picker>

            <Text style={styles.subtitle}>Justify contents:</Text>
            <Picker
                selectedValue={jcIndex}
                onValueChange={v => setJustifyContent(v)}>

                {JUSTIFY_CONTENTS.map((item, index) => (
                    <Picker.Item key={index} label={item} value={index} />
                ))}
            </Picker>

            <Text style={styles.subtitle}>Align items:</Text>
            <Picker
                selectedValue={aiIndex}
                onValueChange={v => setAlignItems(v)}>

                {ALIGN_ITEMS.map((item, index) => (
                    <Picker.Item key={index} label={item} value={index} />
                ))}
            </Picker>

            <Text style={styles.title}>Demo:</Text>
            <View style={[styles.demo, {
                flexDirection: FLEX_DIRECTIONS[fdIndex],
                alignItems: ALIGN_ITEMS[aiIndex],
                justifyContent: JUSTIFY_CONTENTS[jcIndex]
            }]}>
                <View style={[styles.box, { backgroundColor: 'powderblue' }]} />
                <View style={[styles.box, { backgroundColor: 'skyblue' }]} />
                <View style={[styles.box, { backgroundColor: 'steelblue' }]} />
            </View>
        </>
    )
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

function mapStateToProps(state) {
    return {
        jcIndex: state.flexDemo.jcIndex,
        aiIndex: state.flexDemo.aiIndex,
        fdIndex: state.flexDemo.fdIndex
    }
}

const mapDispatchToProps = {
    setAlignItems,
    setFlexDirection,
    setJustifyContent
}

export default connect(mapStateToProps, mapDispatchToProps)(FlexDemoWithRedux);