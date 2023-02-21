import { View, Text, StyleSheet, ScrollView, FlatList, RefreshControl, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import Modal from "react-native-modal"
import Icon from 'react-native-vector-icons/Ionicons'
import SearchInput, {createFilter} from 'react-native-search-filter';
const KEY_TO_SEARCH = ["full_name"]

const ModalPickRegion = ({isVisible, onBackdropPress, onPress, data}) => {

  const [input, setInput] = useState("")

  const filtered = data?.filter(createFilter(input, KEY_TO_SEARCH))

  return (
    <Modal style={styles.modal} isVisible={isVisible} onBackdropPress={onBackdropPress}>
      <View style={styles.contentModal}>
        <View style={[styles.row, {justifyContent: 'space-between', marginBottom: RFValue(10)}]}>
          <Text style={[styles.text, {fontSize: RFValue(13), fontWeight: '600', color:'#454646'}]}>Size</Text>
          <Text style={[styles.text, {fontSize: RFValue(13), fontWeight: '600', color: '#1B77DF'}]} onPress={onBackdropPress}>Tutup</Text>
        </View>
        <View style={[styles.row, {justifyContent: 'space-between'}]}>
          <View style={styles.boxSearch}>
            <Icon name='search' size={20} color="#A09E9E" style={{position: 'absolute', top: RFValue(10), left: RFValue(10)}}/>
            <SearchInput
              placeholder='Cari Alamat'
              style={styles.input}
              onChangeText={(val) => setInput(val)}
            />
          </View>
          <Icon name='close-circle-sharp' size={25} color="#A09E9E"/>
        </View>
        <View style={[styles.line, {marginVertical: RFValue(15)}]}/>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={filtered}
          renderItem={(({ item }) => (
            <TouchableOpacity style={{paddingHorizontal: RFValue(15), marginBottom: RFValue(15)}} onPress={() => onPress(item)}>
              <Text style={[styles.text, {fontSize: RFValue(13), fontWeight: '400', color: '#454646'}]}>{item.full_name}</Text>
            </TouchableOpacity>
          ))}
        />
      </View>
    </Modal>
  )
}

export default ModalPickRegion;

export const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-end'
  },
  contentModal: {
    width: '100%',
    height: RFPercentage(95),
    backgroundColor: 'white',
    borderTopRightRadius: RFValue(15),
    borderTopLeftRadius: RFValue(15),
    paddingVertical: RFValue(20),
    paddingHorizontal: RFValue(15)
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  line: {
    width: '100%',
    height: RFValue(1),
    backgroundColor: '#BEBEBE'
  },
  boxSearch: {
    width: '90%',
    height: RFValue(40),
    backgroundColor: '#F5F6F7',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: RFValue(5)
  },
  input: {
    height: RFValue(40),
    justifyContent: 'center',
    paddingLeft: RFValue(30),
    color: '#A09E9E'
  }
})

