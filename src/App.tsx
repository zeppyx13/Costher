import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
const stack = createNativeStackNavigator();
import HomeScreen from "./screen/HomeScreen";
const App = () => {
  return (
    <NavigationContainer>
      <stack.Navigator>
        <stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
      </stack.Navigator>
    </NavigationContainer>
  );
};

export default App;