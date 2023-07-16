import { StatusBar } from "expo-status-bar"
import { StyleSheet } from "react-native"
import Homescreen from "./screens/Homepage"
import Chatscreen from "./screens/Chatscreen"
import Messagescreen from "./screens/Messagescreen"

import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import GlobalState from "./context"
import ReactDOM from 'react-dom'


const Stack = createNativeStackNavigator()

export default function App () {
  return (
    <GlobalState>
      <NavigationContainer>
        <Stack.Navigator>
          {/* all the screens here */}
          <Stack.Screen
            name="Homescreen"
            component={Homescreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Chatscreen"
            component={Chatscreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Messagescreen" component={Messagescreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar hidden={true} />
    </GlobalState>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
})
