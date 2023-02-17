import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    DetailPriceEbbie,
    DetailNewsEbbie,
    DetailDiseasesEbbie
} from "scenes"
import TabNavigation from './TabNavigations';

function ScenesNavigation() {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Home">
            <Stack.Screen name='Home' component={TabNavigation}/>
            <Stack.Screen name='DetailPriceEbbie' component={DetailPriceEbbie}/>
            <Stack.Screen name='DetailNewsEbbie' component={DetailNewsEbbie}/>
            <Stack.Screen name='DetailDiseasesEbbie' component={DetailDiseasesEbbie}/>
        </Stack.Navigator>
    )
}

export default ScenesNavigation;