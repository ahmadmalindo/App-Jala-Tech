import { View, Text, StyleSheet, ScrollView, FlatList, RefreshControl, Image, TouchableOpacity, Platform } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import jala from "utils/JalaUtils"
import { base_uri_profile } from 'constants/BASE_URL';
import { currencyFloat } from 'constants/functionGlobals';
import moment from 'moment';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import Icon3 from 'react-native-vector-icons/Ionicons';
import { ModalPickSize, ModalPickRegion } from 'components';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

function PriceEbbie() {

  const focused = useIsFocused()
  const navigation = useNavigation()

  const [loading, setLoading] = useState(false)
  const [listPrice, setListPrice] = useState([])
  const [modalSize, setModalSize] = useState(false)
  const [selectSize, setSelectSize] = useState(100)
  const [modalAddress, setModalAddress] = useState(false)
  const [listAddress, setListAddress] = useState([])
  const [nameAddress, setNameAddress] = useState("")
  const [selectAddress, setSelectAddress] = useState("")

  const scrollViewReff = useRef()

  const getDataPriceEbbie = async () => {
    setLoading(true)

    let paramsList = {
      per_page: 25,
      page: 1
    }

    let paramsAddress = {
      search: ''
    }

    const res_list_price = jala.ListPriceEbbie(paramsList)
    const res_address = jala.FilterByRegion(paramsAddress)
    
    const [list_res, address_res] = await Promise.all([
      res_list_price,
      res_address
    ])

    const newArray = list_res?.data.map(x => {
      return ({
        ...x, size: [
          {
            id: 20,
            value: x.size_20
          },
          {
            id: 30,
            value: x.size_30
          },
          {
            id: 40,
            value: x.size_40
          },
          {
            id: 50,
            value: x.size_50
          },
          {
            id: 60,
            value: x.size_60
          },
          {
            id: 70,
            value: x.size_70
          },
          {
            id: 80,
            value: x.size_80
          },
          {
            id: 90,
            value: x.size_90
          },
          {
            id: 100,
            value: x.size_100
          },
          {
            id: 110,
            value: x.size_110
          },
          {
            id: 120,
            value: x.size_120
          },
          {
            id: 130,
            value: x.size_130
          },
          {
            id: 140,
            value: x.size_140
          },
          {
            id: 150,
            value: x.size_150
          },
          {
            id: 160,
            value: x.size_160
          },
          {
            id: 170,
            value: x.size_170
          },
          {
            id: 180,
            value: x.size_180
          },
          {
            id: 190,
            value: x.size_190
          },
          {
            id: 200,
            value: x.size_200
          },
        ]
      })
    })
    
    setListPrice(newArray)


    setListAddress([{id: "", full_name: "Indonesia"}, ...address_res.data])

    setTimeout(() => {
      setLoading(false)
    }, 500)
  }

  useEffect(() => {
    getDataPriceEbbie()
  }, [focused])

  useEffect(() => {
    scrollViewReff.current?.scrollTo({
      y : 0,
      animated : true
    })
  }, [selectAddress, selectSize])

  const filteredListPrice = listPrice.filter(x => x.size.find(i => i.id === selectSize && i.value !== null && i.value !== 0))
  const filterdByAddress = filteredListPrice.filter(x => selectAddress == "" ? x.regency_id !== "" : x.regency_id === selectAddress)

  return (
    <>
    <ScrollView backgroundColor='white' refreshControl={<RefreshControl refreshing={loading} onRefresh={getDataPriceEbbie}/>} ref={scrollViewReff}>
        <View style={styles.container}>
          <Text style={[styles.textHead, {alignSelf: 'center', marginBottom: RFValue(10)}]}>Harga Terbaru</Text>
          <View style={{marginBottom: RFPercentage(20)}}>
            <FlatList
              data={filterdByAddress}
              renderItem={(({item}) => {

                let date_region = item.date_region_full_name?.split("-")
                let region = date_region[3].split(",")

                return (
                  <View style={[styles.card,{marginBottom: RFValue(8)}]}>
                    <View style={[styles.row, {justifyContent: 'space-between', marginBottom: RFValue(10)}]}>
                      <View style={styles.row}>
                        <Image source={{uri :`${base_uri_profile}${item.creator?.avatar}`}} style={{width: RFValue(34), height: RFValue(34), borderRadius: RFValue(50)}}/>
                        <View style={{marginLeft: RFValue(10)}}>
                          <Text style={styles.text}>{item.creator?.role_id == 2 ? "Suplier" : "Pembeli"}</Text>
                          <Text style={styles.tittle}>{item.creator?.name}</Text>
                        </View>
                      </View>
                      <View style={[styles.border, {backgroundColor: item.creator?.email_verified == true ? '#FFF8E7' : '#E5E5E5'}]}>
                        {item.creator.email_verified == true &&
                        <LinearGradient colors={['#FFD233', '#F6A62C']} style={[styles.circle, {marginRight: RFValue(3)}]}>
                          <Icon name='star' size={14} color="white"/>
                        </LinearGradient>
                        }
                        <Text style={[styles.text, {color: '#454646', fontSize: RFValue(11)}]}>{item.creator?.email_verified == true ? "Terverivikasi" : "belum terverivikasi"}</Text>
                      </View>
                    </View>
                    <View style={{marginBottom: RFValue(8)}}>
                      <Text style={[styles.tittle, {color: '#859ED1', marginBottom: RFValue(5)}]}>{moment(item.created_at).format('DD MMM YYYY')}</Text>
                      <Text style={[styles.text, {color: 'black', fontSize: RFValue(10), marginBottom: RFValue(3)}]}>{region[0]}</Text>
                      <Text style={[styles.tittle, {fontWeight: '700', fontSize: RFValue(15)}]}>{region[1]}</Text>
                    </View>
                    <View style={[styles.row, {justifyContent: 'space-between'}]}>
                      <View>
                        <Text style={styles.text}>size: {selectSize}</Text>
                        {item.size?.map(x => {
                          if (x.id === selectSize) {
                            return (
                              <Text style={[styles.tittle, {fontSize: RFValue(21), fontWeight: '700'}]}>{item.currency_id} {currencyFloat(x.value)}</Text>
                            )
                          }
                        })}
                      </View>
                    <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("DetailPriceEbbie", {id: item.id})}>
                      <Text style={[styles.tittle, {color: 'white', fontWeight: '700'}]}>LIHAT DETAIL</Text>
                    </TouchableOpacity>
                    </View>
                  </View>
                )
              })}
            />
          </View>
        </View>
    </ScrollView>
    <View style={styles.cardAbsolute}>
        <TouchableOpacity style={styles.borderBtn} onPress={() => setModalSize(true)}>
            <View style={styles.row}>
              <Image source={require ('assets/Icon/biomass.png')} style={styles.icon}/>
              {/* <Icon2 name='balance-scale-right' size={23} color="white" style={{marginRight: RFValue(8)}}/> */}
              <View>
                <Text style={[styles.text, {color: 'white'}]}>Size</Text>
                <Text style={[styles.text, {color: 'white', fontSize: RFValue(16), fontWeight: '600'}]}>{selectSize}</Text>
              </View>
            </View>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.row, {marginLeft: RFValue(10)}]} onPress={() => setModalAddress(true)}>
            <Icon3 name='md-location-sharp' size={25} color="white" style={{marginRight: RFValue(10)}}/>
            <Text style={[styles.tittle, {color: 'white', fontSize: RFValue(14), fontWeight: '700', width: RFValue(110)}]} numberOfLines={2}>{nameAddress == "" ? 'Indonesia' : nameAddress}</Text>
        </TouchableOpacity>
    </View>
    <ModalPickSize
      isVisible={modalSize}
      onBackdropPress={() => setModalSize(false)}
      onPress={(item) => {setSelectSize(item), setModalSize(false)}}
    />
    <ModalPickRegion
      isVisible={modalAddress}
      onBackdropPress={() => setModalAddress(false)}
      data={listAddress}
      onPress={(item) => {setSelectAddress(item.id), setNameAddress(item.full_name), setModalAddress(false)}}
    />
    </>
  )
}

export default PriceEbbie;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: RFValue(20),
    paddingHorizontal: RFValue(15)
  },
  textHead: {
    fontSize: RFValue(18),
    color: '#004492',
    fontWeight: '600',
  },
  card: {
    width: '100%',
    height: Platform.OS == "android" ? RFValue(175) : RFValue(175),
    borderWidth: Platform.OS == 'android' ? 1 : 1,
    borderRadius: RFValue(5),
    borderColor: '#E5E5E5',
    shadowColor: "#E5E5E5",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1.00,
    elevation: 4,
    padding: RFValue(10)
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  text: {
    fontSize: RFValue(12),
    color: '#859ED1',
    fontWeight: '400',
  },
  tittle: {
    fontSize: RFValue(13),
    fontWeight: '300',
    color: '#454646'
  },
  border: {
    minWidth: RFValue(95),
    height: RFValue(22),
    backgroundColor: '#FFF8E7',
    paddingHorizontal: RFValue(5),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: RFValue(20)
  },
  btn: {
    width: RFValue(110),
    height: RFValue(35),
    backgroundColor: '#1B77DF',
    borderRadius: RFValue(5),
    justifyContent: 'center',
    alignItems: 'center'
  },

  cardAbsolute: {
    width: '95%',
    height: RFValue(50),
    borderRadius: RFValue(20),
    backgroundColor: '#1B77DF',
    position: 'absolute',
    top: Platform.OS == "android" ? RFPercentage(74) : RFPercentage(76),
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },

  borderBtn: {
    width: '45%',
    height: RFValue(50),
    borderTopLeftRadius: RFValue(20),
    borderBottomLeftRadius: RFValue(20),
    backgroundColor: '#004492',
    justifyContent: 'center',
    paddingLeft: RFValue(15)
  },

  circle: {
    width: RFValue(16),
    height: RFValue(16),
    borderRadius: RFValue(50),
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    width: RFValue(23),
    height: RFValue(23),
    marginRight: RFValue(10)
  }
})

