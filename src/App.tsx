import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
const stack = createNativeStackNavigator();
import HomeScreen from "./screen/HomeScreen";
import RoomsScreen from './screen/RoomScreen';
import LoginScreen from './screen/LoginScreen';
const App = () => {
  return (
    <NavigationContainer>
      <stack.Navigator>
        <stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
        <stack.Screen options={{ headerShown: false }} name="Room" component={RoomsScreen} />
        <stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
      </stack.Navigator>
    </NavigationContainer>
  );
};

export default App;