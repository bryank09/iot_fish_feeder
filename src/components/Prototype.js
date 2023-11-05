import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { Text, View, StyleSheet, Dimensions, Image } from 'react-native';
const { width, height } = Dimensions.get('window');

export const Prototype = () => {
    return (
        <View style={[
            styles.container,
            {
                flexDirection: 'row',
            },
        ]}>
            <Image source={require('./aqua_feeder.png')} />
            
            {/* <Icon name="fast-food" size={30} /> */}
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: height * 0.32,
    },
    fish_feeder:{
        width: "100%",
        height: "100%",
    }
});