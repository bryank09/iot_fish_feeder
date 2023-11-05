import React from 'react'
// import Icon from 'react-native-vector-icons/FontAwesome5'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image
} from 'react-native';
const {width, height} = Dimensions.get('window');

export const Head = () => {
  return (
    <View style={[
      styles.container,
      {
        flexDirection: 'row',
      },
    ]}>
      <Ionicon name="menu" size={25} solid/>
      <Image style={styles.icon} source={require('./myface.png')} />
      {/* <FontAwesome name="user" size={20} solid/> */}
      {/* <Text>IoT_feeder</Text> */}
      <FontAwesome name='gear' size={25} solid />
      <FontAwesome name="bell" size={25} solid />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    columnGap: 6,
    height: height * 0.08,
  },
  icon: {
    width: 30,
    height: undefined,
    aspectRatio: 1,
    borderRadius:  60
  }
});