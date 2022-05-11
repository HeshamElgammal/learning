import { StatusBar } from 'react-native'
import React, { useState, useEffect } from 'react'
import Navigation from './src/navigations/Navigation'
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';

import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
  useTheme
} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DarkContexts } from './src/configs/context'
export const ThemeContext = React.createContext();
const App = () => {

  const [isDarkTheme, setIsDarkTheme] = React.useState(false);


  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      primary: "#192F52",
      black: "#000",
      white: "#fff",
      red: "#d00",
      button: "#192F52",
      bground: "#ffffff",
      txt: "#192F52",
      btnTxt: "#ffffff",
    }
  }

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      primary: "#192F52",
      black: "#000",
      white: "#ffff",
      red: "#a34",
      button: "#ffff",
      bground: "#192F52",
      txt: "#ffffff",
      btnTxt: "#192F52",
    }
  }

  const darkContext = React.useMemo(() => ({
    toggleTheme: async () => {
      setIsDarkTheme(isDarkTheme => !isDarkTheme);
      AsyncStorage.setItem('themes', JSON.stringify(isDarkTheme))
      console.log('d : ' + isDarkTheme)

    }
  }), []);

  
  const setTheme = async () => {
    let theme = await AsyncStorage.getItem('themes')
    if (theme) {
      setIsDarkTheme(JSON.parse(theme))
      console.log("theme : " + JSON.parse(theme))
    }
  }
  useEffect(() => {
    setTheme()
    // const themes = JSON.parse(AsyncStorage.getItem('themes'))

    // if (themes) {
    //   setIsDarkTheme(themes)
    // }
  }, [])


  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  return (
    <PaperProvider theme={theme}>
      <DarkContexts.Provider value={darkContext}>
        <NavigationContainer theme={theme}>
          <Navigation />
        </NavigationContainer>
      </DarkContexts.Provider>
    </PaperProvider>
  )
}

export default App

