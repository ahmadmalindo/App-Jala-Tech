import React from 'react';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import setupInterceptor from "./src/middlewares"
import ScenesNavigation from 'navigations/ScencesNavigations';
import moment from 'moment';
import 'moment/locale/id'

moment.locale('id')
LogBox.ignoreAllLogs()

setupInterceptor()

function App(){

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <ScenesNavigation/>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;