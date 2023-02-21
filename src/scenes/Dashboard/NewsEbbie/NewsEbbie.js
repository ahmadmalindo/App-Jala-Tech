import React, { useEffect, useRef, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, FlatList, RefreshControl, Image, TouchableOpacity, Platform } from 'react-native'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import jala from "utils/JalaUtils";
import { base_uri_profile, url_link_news_ebbie } from 'constants/BASE_URL';
import moment from 'moment';
import Icon2 from "react-native-vector-icons/Ionicons";
import Share from 'react-native-share';

function NewsEbbie() {

  const focused = useIsFocused()
  const navigation = useNavigation()

  const [loading, setLoading] = useState(false)
  const [listNews, setListNews] = useState([])

  const getDataNews = async () => {
    setLoading(true)

    let paramsNews = {
      per_page: 15,
      page: 1
    }

    const res_news = jala.ListNewsEbbie(paramsNews)

    const [news_res] = await Promise.all([
      res_news
    ])

    setListNews(news_res.data)

    setTimeout(() => {
      setLoading(false)
    }, 500)
  }

  const shareNews = async(item) => {
    let options = {
      url: `${url_link_news_ebbie}${item.id}`,
      message: `${item.seo_title}`
    }

    Share.open(options)
  }

  useEffect(() => {
    getDataNews()
  }, [focused])

  return (
    <>
    <ScrollView backgroundColor='white' refreshControl={<RefreshControl refreshing={loading} onRefresh={getDataNews}/>}>
        <View style={styles.container}>
          <Text style={[styles.textHead, {marginBottom: RFValue(10)}]}>Kabar Terbaru</Text>
          <FlatList
            data={listNews}
            renderItem={(({item}) => {

              return (
                <TouchableOpacity style={[styles.card, {marginBottom: RFValue(10)}]} onPress={() => navigation.navigate('DetailNewsEbbie', {id: item.id, item: item})}>
                  <Image source={{uri: `${base_uri_profile}${item.image}`}} style={[styles.img]}/>
                  <View style={{paddingVertical: RFValue(10), paddingHorizontal: RFValue(10)}}>
                    <Text style={[styles.tittle, {marginBottom: RFValue(5)}]}>{item.seo_title}</Text>
                    <Text style={styles.text} numberOfLines={2}>{item.meta_description}</Text>
                    <View style={[styles.row, {justifyContent: 'space-between', marginTop: RFValue(13)}]}>
                      <Text style={styles.text}>{moment(item.created_at).format('DD MMM YYYY')}</Text>
                      <Icon2 name='share-social-outline' size={25} color="black" onPress={() => shareNews(item)}/>
                    </View>                    
                  </View>
                </TouchableOpacity>
              )
            })}
          />
        </View>
    </ScrollView>
    </>
  )
}

export default NewsEbbie;

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
    minHeight: Platform.OS == "android" ? RFValue(301) : RFValue(301),
    borderWidth: Platform.OS == 'android' ? 1 : 1,
    borderRadius: RFValue(5),
    borderColor: '#E5E5E5',
    shadowColor: "#E5E5E5",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1.00,
    elevation: 4,
  },
  img: {
    width: '100%',
    height: RFPercentage(26),
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

