/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useRef, useMemo, useCallback } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions,
  ImageBackground,
  TouchableWithoutFeedback
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import { Head } from './components/Head.js';
import { Prototype } from './components/Prototype.js';
import { Monitoring, Timer } from './components/DisplayPanel.js';
import { Charts, Alarm } from './components/BottomSheet.js';
// import { Login } from './components/login.js';

import Swiper from 'react-native-swiper';
import BottomSheet from '@gorhom/bottom-sheet';
import {
  GestureHandlerRootView,
  RectButton,
} from 'react-native-gesture-handler';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  // ref
  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['5%', '100%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    // console.log('handleSheetChanges', index);
  }, []);
  const [display, setDisplay] = useState("alarm");

  const SwiperDisplay = () => {
    const changeDisplay = (index: number) => {
      switch (index) {
        case 0:
          setDisplay("monitoring");
          break;
        case 1:
          setDisplay("alarm")
          break;
        default:
          setDisplay("monitoring");
          break;
      }
    };

    const { width, height } = Dimensions.get('window');
    return (
      <View style={{
        flex: 1,
        backgroundColor: '#c4c4c48f',
        height: height * 0.6,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopEndRadius: 200,
        borderTopStartRadius: 200,
      }}>
        <Swiper
          onIndexChanged={changeDisplay}>
          <Monitoring />
          <Timer />
        </Swiper>
      </View>
    )
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <TouchableWithoutFeedback>
          <ImageBackground source={require('./background_image.jpg')} resizeMode="cover">
            <GestureHandlerRootView style={{ flex: 1 }}>
              <Head />
              <Prototype />
              <SwiperDisplay />
              <BottomSheet
                ref={bottomSheetRef}
                index={1}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
              >
                {display == "monitoring" ? <Charts /> : <Alarm />}
              </BottomSheet>
            </GestureHandlerRootView>
          </ImageBackground>
        </TouchableWithoutFeedback>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default App;