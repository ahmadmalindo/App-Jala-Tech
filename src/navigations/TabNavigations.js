import React from 'react';
import { Text, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {
    PriceEbbie,
    NewsEbbie,
    DiseasesEbbie
} from "scenes"
import { Container, HeaderApp } from 'components'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

const Tab = createMaterialTopTabNavigator();


function TabNavigation() {
    return (
        <Container barStyle={'dark-content'} backgroundColor="#145DA0">
            <HeaderApp tittle="Jala Media" onPress={() => alert("kembali")}/>
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <Tab.Navigator initialRouteName='PriceEbbie' sceneContainerStyle={{borderTopWidth: 1, borderTopColor: '#E8E8E8'}} style={{marginTop: RFValue(5)}}>
                    <Tab.Screen name="PriceEbbie" component={PriceEbbie} options={{
                        tabBarLabel: ({focused}) => (
                            <Text style={{color: focused ? '#145DA0' : '#BEBEBE', fontWeight: '600', fontSize: RFValue(13)}}>Harga Udang</Text>
                        ),
                        tabBarIndicatorStyle: {backgroundColor: '#145DA0'}
                    }} />
                    <Tab.Screen name="NewsEbbie" component={NewsEbbie} options={{
                        tabBarLabel: ({focused}) => (
                            <Text style={{color: focused ? '#145DA0' : '#BEBEBE', fontWeight: '600', fontSize: RFValue(13)}}>Kabar Udang</Text>
                        ),
                        tabBarIndicatorStyle: {backgroundColor: '#145DA0'}
                    }} />
                    <Tab.Screen name="DiseasesEbbie" component={DiseasesEbbie}options={{
                        tabBarLabel: ({focused}) => (
                            <Text style={{color: focused ? '#145DA0' : '#BEBEBE', fontWeight: '600', fontSize: RFValue(13)}}>Penyakit</Text>
                        ),
                        tabBarIndicatorStyle: {backgroundColor: '#145DA0'}
                    }}  />
                </Tab.Navigator>
            </View>
            <View style={{marginBottom: RFPercentage(-15)}}/>
        </Container>
    );
}

export default TabNavigation;


