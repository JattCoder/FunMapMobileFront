import React,{ useEffect } from 'react'
import { Provider } from 'react-redux'
import Store from './store/store'
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import firebase from 'firebase'
import Login from './JS/Login/login'

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
      <Login />
    </Provider>
  )
}

export default App