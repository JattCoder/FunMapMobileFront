import React,{ useEffect } from 'react'
import { Provider } from 'react-redux'
import Store from './store/store'
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import firebase from 'firebase'
import Login from './JS/Login/login'
import Recover from './JS/Login/recover'
import PassReset from './JS/Login/passreset'
import Register from './JS/Register/register'
import Email from './JS/Confirm/email'
import Home from './JS/Home/home'

const Stack = createStackNavigator()
const store = Store()

const App = () => {

  useEffect(()=>{
    if (!firebase.apps.length) {
        firebase.initializeApp({
          authDomain: "maps-8a2af.firebaseapp.com",
          databaseURL: "https://maps-8a2af.firebaseio.com",
          projectId: "maps-8a2af",
          appId: "1:626824452588:web:6db65e228561fca36108c9",
          apiKey: "AIzaSyCubEvuePYKjY1LbFOA0Dief0endEF0SY8",
        });
      }
    })

  return(
    <Provider store={store}>
      <NavigationContainer>{
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Recover" component={Recover} />
          <Stack.Screen name="PassReset" component={PassReset} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="ConfirmEmail" component={Email} options={{ gestureEnabled: false}}/>
          <Stack.Screen name="Home" component={Home} options={{ gestureEnabled: false }}/>
        </Stack.Navigator>
      }</NavigationContainer>
    </Provider>
  )
}

export default App