import { View, Text, StyleSheet, ScrollView, FlatList, RefreshControl, Image, TouchableOpacity, Linking } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import jala from "utils/JalaUtils"
import { base_uri_profile, url_link_shimp_price } from 'constants/BASE_URL';
import { currencyFloat } from 'constants/functionGlobals';
import moment from 'moment';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import Icon3 from 'react-native-vector-icons/Ionicons';
import { Container, HeaderApp } from 'components';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import call from 'react-native-phone-call'
import Share from 'react-native-share';


function DetailPriceEbbie({route}) {

    const focused = useIsFocused()
    const navigation = useNavigation()

    const {id} = route.params

    const [loading, setLoading] = useState(false)
    const [detail, setDetail] = useState([])

    const handleNavigationAppBar = (val) => {
        if (val == 0) {
            navigation.goBack()
        }
        else {
          shareNews()
        }
    }

    const getDetailPriceEbbie = async () => {
        setLoading(true)

        let params = {
            id: id
        }

        const res = await jala.DetailPriceEbbie(params)

        var data = res.data
        data.size = [
            {
                id: 20,
                value: data.size_20
              },
              {
                id: 30,
                value: data.size_30
              },
              {
                id: 40,
                value: data.size_40
              },
              {
                id: 50,
                value: data.size_50
              },
              {
                id: 60,
                value: data.size_60
              },
              {
                id: 70,
                value: data.size_70
              },
              {
                id: 80,
                value: data.size_80
              },
              {
                id: 90,
                value: data.size_90
              },
              {
                id: 100,
                value: data.size_100
              },
              {
                id: 110,
                value: data.size_110
              },
              {
                id: 120,
                value: data.size_120
              },
              {
                id: 130,
                value: data.size_130
              },
              {
                id: 140,
                value: data.size_140
              },
              {
                id: 150,
                value: data.size_150
              },
              {
                id: 160,
                value: data.size_160
              },
              {
                id: 170,
                value: data.size_170
              },
              {
                id: 180,
                value: data.size_180
              },
              {
                id: 190,
                value: data.size_190
              },
              {
                id: 200,
                value: data.size_200
              },
        ]

        setDetail(data)

        setTimeout(() => {
            setLoading(false)
        }, 500)
    }

    useEffect(() => {
        getDetailPriceEbbie()
    }, [focused])

    const callPhone = () => {

        let  phone_number = detail?.creator?.phone?.split("+")

        const arg = {
            number: phone_number[1],
            prompt: true
        }

        call(arg).catch(console.error)
    }

    const shareNews = async() => {
      let options = {
        url: `${url_link_shimp_price}${id}`,
      }
  
      Share.open(options)
    }

    return (
        <Container barStyle={'dark-content'} backgroundColor="#145DA0">
            <HeaderApp tittle="Harga Udang" onPress={(val) => handleNavigationAppBar(val)} share/>
            <ScrollView backgroundColor="white" refreshControl={<RefreshControl refreshing={loading} onRefresh={getDetailPriceEbbie}/>}>
                <View style={styles.container}>
                    <View style={{paddingHorizontal: RFValue(15)}}>
                        <Text style={styles.textHead}>{detail?.region?.province_name}{'\n'}<Text style={{color: '#6c757d'}}>{detail?.region?.regency_name}</Text></Text>
                    </View>
                    <View style={styles.line}/>
                    <View style={{paddingHorizontal: RFValue(15), paddingVertical: RFValue(10)}}>
                        <View style={[styles.row, {justifyContent: 'space-between', marginBottom: RFValue(10)}]}>
                            <Text style={styles.tittle}>{moment(detail.created_at).format('DD MMM YYYY')}</Text>
                            <View style={styles.border}>
                                <Icon name='star' size={20} color="white" style={{marginRight: RFValue(3)}}/>
                                <Text style={[styles.text, {color: 'white', fontSize: RFValue(11)}]}>{detail.creator?.email_verified == true ? "Terverivikasi" : "Tidak Terverivikasi"}</Text>
                            </View>
                        </View>
                        <View style={[styles.row, {marginBottom: RFValue(15)}]}>
                            <Image source={{uri :`${base_uri_profile}${detail.creator?.avatar}`}} style={{width: RFValue(34), height: RFValue(34), borderRadius: RFValue(50)}}/>
                            <View style={{marginLeft: RFValue(10)}}>
                                <Text style={[styles.text, {color: '#6c757d'}]}>{detail.creator?.role_id == 2 ? "Suplier" : "Pembeli"}</Text>
                                <Text style={styles.tittle}>{detail.creator?.name}</Text>
                            </View>
                        </View>
                        <View style={[styles.row, {justifyContent: 'space-between', marginBottom: RFValue(15)}]}>
                            <View>
                                <Text style={[styles.text, {color: '#6c757d', marginBottom:RFValue(3)}]}>Kontak</Text>
                                <Text style={[styles.tittle, {fontWeight: '600', fontSize: RFValue(14)}]}>{detail.creator?.phone}</Text>
                            </View>
                            <TouchableOpacity style={styles.btn} onPress={() => callPhone()}>
                                <Text style={[styles.tittle, {color: 'white', fontWeight: '600'}]}>Hubungi</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{marginBottom: RFValue(10)}}>
                            <Text style={[styles.textHead, {marginBottom: RFValue(10)}]}>Daftar Harga</Text>
                            {detail?.size?.map(x => (
                              <>
                                {x.value > 0 &&
                                <View style={[styles.row, {marginBottom: RFValue(5)}]}>
                                    <Text style={[styles.tittle, {width: RFValue(80)}]}>Size {x.id}</Text>
                                    <Text style={styles.tittle}>Rp {currencyFloat(x.value)}</Text>
                                </View>
                                }
                              </>
                            ))}
                        </View>
                        <View>
                            <Text style={[styles.textHead, {marginBottom: RFValue(10)}]}>Catatan</Text>
                            <Text style={[styles.tittle, {marginRight: RFValue(15)}]}>{detail.remark}</Text>
                        </View>
                    </View>
                    <View style={{marginBottom: RFPercentage(15)}}/>
                </View>
            </ScrollView>
            <View style={{marginBottom: RFPercentage(-15)}}/>
        </Container>
    )
}

export default DetailPriceEbbie;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: RFValue(20),
  },
  textHead: {
    fontSize: RFValue(18),
    color: 'black',
    fontWeight: '600',
    lineHeight: RFValue(25)
  },
  card: {
    width: '100%',
    height: RFValue(165),
    borderWidth: 1,
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
    padding: RFValue(10)
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  line: {
    width: '100%',
    height: RFValue(4),
    backgroundColor: '#dee2e6',
    marginVertical: RFValue(10)
  },
  text: {
    fontSize: RFValue(13),
    color: '#145DA0',
    fontWeight: '400',
  },
  tittle: {
    fontSize: RFValue(13),
    fontWeight: '300',
  },
  border: {
    minWidth: RFValue(95),
    height: RFValue(25),
    backgroundColor: 'rgba(234, 179, 8, 0.8)',
    paddingHorizontal: RFValue(5),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: RFValue(10)
  },
  btn: {
    width: RFValue(80),
    height: RFValue(35),
    backgroundColor: '#0E86D4',
    borderRadius: RFValue(5),
    justifyContent: 'center',
    alignItems: 'center'
  },

  cardAbsolute: {
    width: '95%',
    height: RFValue(50),
    borderRadius: RFValue(20),
    backgroundColor: '#0E86D4',
    position: 'absolute',
    top: RFPercentage(76),
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },

  borderBtn: {
    width: '45%',
    height: RFValue(50),
    borderTopLeftRadius: RFValue(20),
    borderBottomLeftRadius: RFValue(20),
    backgroundColor: '#145DA0',
    justifyContent: 'center',
    paddingLeft: RFValue(15)
  }
})

