/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import type {Node} from 'react';

import jwtAxios from './axios';

import * as WeChat from 'react-native-wechat-lib';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';




const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    WeChat.registerApp('wx8079a3ed40a3f69f', 'universalLink');

    // console.log("check: ", WeChat.pay({

    // }));
  }, []);
  onPressPay = ()=>{
    jwtAxios.post('api/res/pay/payordersnap', {
      orderid: 21,
      ismobile:true,
      iswechatbrowser:false,
      isapp:true,
      paymentmethod:{
        id: 3,
        title: 'Wechat'
      }
    }).then(res =>{
      // console.log('pay', res.data.data);
      let wechatReturn = res.data.data;
      let payload = {
        appId: wechatReturn.appid,
        partnerId: wechatReturn.partnerid,
        prepayId:  wechatReturn.prepayid,
        nonceStr: wechatReturn.noncestr,
        timeStamp: wechatReturn.timestamp,
        package: wechatReturn.package,
        sign: wechatReturn.sign,
      }
      WeChat.pay(payload).then(res =>{
        console.log("支付成功", res);
      })
      .catch(err =>{
        console.log('支付失敗', err );
      })
    }).catch(err =>{
      console.log('Error: ', err);
    })
  }
  return (
    <SafeAreaView style={backgroundStyle}>
     <Button
  onPress={onPressPay}
  title="Pay"
  color="#841584"
  accessibilityLabel="Learn more about this purple button"
/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
