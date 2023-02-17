import { View, Text, StyleSheet, ScrollView, FlatList, RefreshControl, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import Modal from "react-native-modal"
import { getMultiples } from 'constants/functionGlobals';


const ModalPickSize = ({isVisible, onBackdropPress, onPress}) => {

  const size = getMultiples(10, 200).splice(1)

  return (
    <Modal style={styles.modal} isVisible={isVisible} onBackdropPress={onBackdropPress}>
      <View style={styles.contentModal}>
        <View style={[styles.row, {justifyContent: 'space-between', paddingHorizontal: RFValue(15)}]}>
          <Text style={[styles.text, {fontSize: RFValue(13), fontWeight: '600'}]}>Size</Text>
          <Text style={[styles.text, {fontSize: RFValue(12), fontWeight: '600', color: '#145DA0'}]} onPress={onBackdropPress}>Tutup</Text>
        </View>
        <View style={[styles.line, {marginVertical: RFValue(15)}]}/>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={size}
          renderItem={(({item}) => (
            <TouchableOpacity style={{paddingHorizontal: RFValue(15), marginBottom: RFValue(15)}} onPress={() => onPress(item)}>
              <Text style={[styles.text, {fontSize: RFValue(13), fontWeight: '400'}]}>{item}</Text>
            </TouchableOpacity>
          ))}
        />
      </View>
    </Modal>
  )
}

export default ModalPickSize;

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
    paddingVertical: RFValue(20)
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
})

