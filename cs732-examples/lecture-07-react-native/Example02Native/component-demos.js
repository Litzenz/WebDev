import React from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    ScrollView,
    RefreshControl,
    FlatList,
    Dimensions,
    Picker,
    Platform
} from 'react-native';
import Image from 'react-native-scalable-image';
import { wordToFood } from './food';
import meowCat from './Meowcat.png';
import { loadAllArticlesInRandomOrder } from './articles';

const message = Platform.select({
    android: 'Android is WAY better than iOS!',
    ios: 'Ewwww, your phone sucks!'
})

export function TextDemo() {
    return (
        <View>
            <Text style={styles.boldText}>
                This is some bold text.
                <Text style={styles.italicText}>
                    This is some bold and italic text.
                </Text>
            </Text>
            <Text>I'm running on {Platform.OS}!</Text>
            <Text>{message}</Text>
        </View>
    );
}

export function ImageDemo() {
    return (
        <View>
            <Image width={Dimensions.get('window').width} source={meowCat} />
            <Image width={100} source={{ uri: 'http://placekitten.com/100/100' }} />
        </View>
    );
}

export class TextInputDemo extends React.Component {

    constructor(props) {
        super(props);
        this.state = { text: '' };
    }

    render() {
        return (
            <View style={styles.form}>
                <Text>Your text:</Text>
                <TextInput
                    placeholder="Type here to translate!"
                    onChangeText={(text) => this.setState({ text })}
                    style={styles.textInput}
                />
                <Text>Translation:</Text>
                <Text style={styles.foodBox}>
                    {this.state.text.split(' ').map((word) => wordToFood(word)).join(' ')}
                </Text>
            </View>
        );
    }
}

export class PickerDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = { selected: 'value1' }
    }

    render() {
        return (
            <View>
                <Text>Select something:</Text>
                <Picker
                    selectedValue={this.state.selected}
                    onValueChange={v => this.setState({ selected: v })}
                    style={{ marginTop: 30, marginBottom: 30 }}>

                    <Picker.Item label="Value One" value="value1" />
                    <Picker.Item label="Value Two" value="value2" />
                    <Picker.Item label="Value Three" value="value3" />
                </Picker>
                <Text>Selected value: {this.state.selected}</Text>
            </View>
        );
    }
}

export class ScrollViewDemo extends React.Component {

    constructor(props) {
        super(props);
        this.state = { articles: [], refreshing: false }
    }

    componentDidMount() {
        this.populate();
    }

    populate() {

        this.setState(oldState => {
            return { refreshing: true }
        });

        loadAllArticlesInRandomOrder()
            .then(articles => this.setState(oldState => {
                return { articles, refreshing: false }
            }));
    }

    render() {
        return (
            <ScrollView
                refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.populate()} />}>

                {this.state.articles && this.state.articles.map((article, index) =>
                    <View key={index} style={styles.articleContainer}>
                        <Text style={styles.sectionTitle}>{article.title}</Text>
                        <Text style={styles.textContent}>{article.content}</Text>
                    </View>)}

            </ScrollView>
        );
    }
}

export class FlatListDemo extends ScrollViewDemo {
    render() {
        return (
            <FlatList
                data={this.state.articles}
                keyExtractor={article => article.id.toString()}
                refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.populate()} />}
                renderItem={({ item }) => {
                    return <View style={styles.articleContainer}>
                        <Text style={styles.sectionTitle}>{item.title}</Text>
                        <Text style={styles.textContent}>{item.content}</Text>
                    </View>
                }}
            />
        );
    }
}

const styles = StyleSheet.create({

    boldText: { fontWeight: 'bold' },

    italicText: { fontStyle: 'italic' },

    textInput: { borderWidth: 1, borderColor: 'skyblue' },

    foodBox: { borderWidth: 1, borderColor: 'skyblue', fontSize: 24 },

    form: { padding: 10, flex: 1, justifyContent: 'center' },

    articleContainer: {
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20
    },

    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: 'black'
    },

    textContent: {
        fontSize: 16,
        color: 'darkslategray',
        textAlign: 'justify'
    }
});