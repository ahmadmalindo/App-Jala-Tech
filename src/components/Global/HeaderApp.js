import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from "react-native-vector-icons/AntDesign"
import Icon2 from "react-native-vector-icons/Ionicons"

const HeaderApp = ({tittle, onPress, share}) => {
  return (
    <View style={styles.view}>
      <View style={[styles.row, {justifyContent: 'space-between'}]}>
        <View style={styles.row}>
          <Icon name='arrowleft' color='white' size={25} style={{marginRight: RFValue(15)}} onPress={() => onPress(0)}/>
          <Text style={styles.textHead}>{tittle}</Text>
        </View>
        {share &&
        <Icon2 name='share-social-outline' size={25} color="white" onPress={() => onPress(1)}/>
        }
      </View>
    </View>
  );
};

export default HeaderApp;

export const styles = StyleSheet.create({
  view: {
    width: '100%',
    height: RFValue(60),
    backgroundColor: '#1B77DF',
    paddingHorizontal: RFValue(15),
    justifyContent: 'center'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  textHead: {
    fontSize: RFValue(18),
    color: 'white',
    fontWeight: '600'
  }
});
