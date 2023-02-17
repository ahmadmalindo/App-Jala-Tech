import React, { useEffect, useRef, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, FlatList, RefreshControl, Image, TouchableOpacity, Platform } from 'react-native'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import jala from "utils/JalaUtils";
import { base_uri_profile, url_link_diseases_ebbie } from 'constants/BASE_URL';
import moment from 'moment';
import Icon2 from "react-native-vector-icons/Ionicons";
import Share from 'react-native-share';

function DiseasesEbbie() {

  const focused = useIsFocused()
  const navigation = useNavigation()

  const [loading, setLoading] = useState(false)
  const [listDiseases, setListDiseases] = useState([])

  const getDataDiseases = async () => {
    setLoading(true)

    let paramsNews = {
      per_page: 15,
      page: 1
    }

    const res_news = jala.ListDiseasesEbbie(paramsNews)

    const [news_res] = await Promise.all([
      res_news
    ])

    setListDiseases(news_res.data)

    setTimeout(() => {
      setLoading(false)
    }, 500)
  }

  const shareNews = async(item) => {
    let options = {
      url: `${url_link_diseases_ebbie}${item.id}`,
      message: `${item.full_name} (${item.short_name})`
    }

    Share.open(options)
  }

  useEffect(() => {
    getDataDiseases()
  }, [focused])

  return (
    <>
    <ScrollView backgroundColor='white' refreshControl={<RefreshControl refreshing={loading} onRefresh={getDataDiseases}/>}>
        <View style={styles.container}>
          <Text style={[styles.textHead, {marginBottom: RFValue(15)}]}>Daftar Penyakit</Text>
          <FlatList
            data={listDiseases}
            renderItem={(({item}) => {
              return (
                <TouchableOpacity style={[styles.card, {marginBottom: RFValue(15)}]} onPress={() => navigation.navigate('DetailDiseasesEbbie', {id: item.id, item: item})}>
                  <Image source={{uri: `${base_uri_profile}${item.image}`}} style={[styles.img]}/>
                  <View style={{paddingVertical: RFValue(10), paddingHorizontal: RFValue(10)}}>
                    <Text style={[styles.tittle, {marginBottom: RFValue(5)}]}>{item.full_name} ({item.short_name})</Text>
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

export default DiseasesEbbie;

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

