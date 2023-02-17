import React, { useEffect, useRef, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, FlatList, RefreshControl, Image, TouchableOpacity, Platform } from 'react-native'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import jala from "utils/JalaUtils";
import { base_uri_profile, url_link_news_ebbie, url_link_web_view } from 'constants/BASE_URL';
import moment from 'moment';
import Icon2 from "react-native-vector-icons/Ionicons";
import Share from 'react-native-share';
import { Container, HeaderApp } from 'components';
import { WebView } from 'react-native-webview';

function DetailNewsEbbie({route}) {

    const {id, item} = route.params

    const navigation = useNavigation()

    const [loading, setLoading] = useState(false)

    const handleNavigationAppBar = (val) => {
        if (val == 0) {
            navigation.goBack()
        }
        else {
            shareNews()
        }
    }

    const shareNews = async() => {
        let options = {
          url: `${url_link_news_ebbie}${item.id}`,
          message: `${item.seo_title}`
        }
    
        Share.open(options)
    }

    return (
        <Container barStyle={'dark-content'} backgroundColor="#145DA0">
            <HeaderApp tittle="Kabar Udang" share onPress={(val) => handleNavigationAppBar(val)}/>
            <ScrollView backgroundColor="white">
                <View style={styles.container}>
                    <View style={{height: RFPercentage(100)}}>
                        <WebView
                            source={{uri: `${url_link_web_view}${id}`}}
                            showsVerticalScrollIndicator={false}
                        />      
                    </View>
                </View>
            </ScrollView>
            <View style={{marginBottom: RFPercentage(-15)}}/>
        </Container>
    )
}

export default DetailNewsEbbie;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: RFValue(20),
    paddingHorizontal: RFValue(15)
  },
  textHead: {
    fontSize: RFValue(18),
    color: '#145DA0',
    fontWeight: '600',
  },
  card: {
    width: '100%',
    minHeight: Platform.OS == "android" ? RFValue(240) : RFValue(245),
    borderWidth: Platform.OS == 'android' ? 0 : 1,
    borderRadius: RFValue(5),
    borderColor: '#BEBEBE',
    shadowColor: "#BEBEBE",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.00,
    elevation: 1,
  },
  img: {
    width: '100%',
    height: RFPercentage(23),
    resizeMode: 'cover'
  },
  tittle: {
    fontSize: RFValue(14),
    fontWeight: '600',
  },
  text: {
    fontSize: RFValue(13),
    fontWeight: '400',
    color: '#696969'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
})

