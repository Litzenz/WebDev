import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, StatusBar, ScrollView, TouchableOpacity } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { getStore, getPersistor } from './redux';
import {
  TextDemo,
  ImageDemo,
  TextInputDemo,
  PickerDemo,
  ScrollViewDemo,
  FlatListDemo
} from './component-demos';
import {
  BorderPaddingDemo,
  FlexDemo,
  FlexProportionDemo
} from './layout-demos';
import FlexDemoWithRedux from './flex-demo-with-redux';
import OriginalPage from './comes-with-new-rn-app';

const Stack = createStackNavigator();

function App() {

  const myStore = getStore();
  const myPersistor = getPersistor();

  return (
    <Provider store={myStore}>
      <PersistGate persistor={myPersistor}
        loading={(
          <View>
            <ActivityIndicator size="large" />
          </View>
        )}>
        <SafeAreaProvider>
          <StatusBar barStyle="light-content" />
          <NavigationContainer>
            <SafeAreaView style={{ flex: 1 }}>
              <Stack.Navigator>
                <Stack.Screen
                  key={-1}
                  name="Home"
                  component={Home}
                  options={{ title: 'React Native Demos' }}
                />

                {demos.map((demo, index) => (
                  <Stack.Screen
                    key={index}
                    name={demo.name}
                    component={demo.component}
                    options={{ title: demo.title }}
                  />
                ))}
              </Stack.Navigator>
            </SafeAreaView>
          </NavigationContainer>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

const demos = [
  { title: '<Text>', name: 'Text', component: TextDemo },
  { title: '<Image>', name: 'Image', component: ImageDemo },
  { title: '<TextInput>', name: 'TextInput', component: TextInputDemo },
  { title: '<Picker>', name: 'Picker', component: PickerDemo },
  { title: '<ScrollView>', name: 'ScrollView', component: ScrollViewDemo },
  { title: '<FlatList>', name: 'FlatList', component: FlatListDemo },
  { title: 'Borders & Padding', name: 'BP', component: BorderPaddingDemo },
  { title: 'Flex proportions', name: 'FlexProportion', component: FlexProportionDemo },
  { title: 'Flex', name: 'Flex', component: FlexDemo },
  { title: 'Flex (with Redux)', name: 'FlexRedux', component: FlexDemoWithRedux }
];

class Home extends React.Component {

  nav(index) {
    const demo = demos[index];
    this.props.navigation.navigate(demo.name);
  }

  render() {
    return (
      <ScrollView>
        {demos.map((demo, index) => (
          <TouchableOpacity key={index} style={styles.demoItem} onPress={() => this.nav(index)}>
            <Text style={styles.demoTitle}>{demo.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  demoItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'darkgray'
  },

  demoTitle: {
    fontSize: 24,
    fontFamily: 'monospace'
  },

  demoButton: {

  }
});

export default App;
