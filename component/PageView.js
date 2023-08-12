import React , {useState , useEffect} from 'react';
import { WebView } from "react-native-webview";
import DeviceInfo from 'react-native-device-info';

import {
  StyleSheet,
  BackHandler,
  Alert,
} from 'react-native';

const INJECTED_JAVASCRIPT = `
//줌 확대 고정
const meta = document.createElement('meta'); 
meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0'); 
meta.setAttribute('name', 'viewport');
document.getElementsByTagName('head')[0].appendChild(meta);

//뒤로가기 버튼 
  (function () { 
    window.ReactNativeWebView.postMessage(history.length)   
  })()
`

const PageView = ({refViewObj}) => {
  const [isCanGoBack , setIsCanGoBack] = useState(false);

//android os 페이지 뒤로가기
  const onPressHardwareBackBtn = _ => {
    isCanGoBack
      ? refViewObj.current.goBack()
      : Alert.alert("are you sure?", "Do you want to exit the app", [
          { text: "NO", onPress: _ => null},
          { text: "YES", onPress: _ => BackHandler.exitApp() }
        ]);

    return true
  }

  useEffect( _ => {
    BackHandler.addEventListener('hardwareBackPress',onPressHardwareBackBtn) 
    return _ => {
      BackHandler.removeEventListener('hardwareBackPress',onPressHardwareBackBtn)
    }
  },[isCanGoBack])

  const onMsgFn = ({nativeEvent : state}) => {
    setIsCanGoBack(state.canGoBack);
  }
  //##-->fin.

  //에러처리 
  const printError = _ => {
    Alert.alert("ERROR","Please check your internet connection status and restart the app"
    , [
      { text: "OK", onPress: _ => BackHandler.exitApp() }
    ])
  }

  return (
    <WebView
      injectedJavaScript={INJECTED_JAVASCRIPT}
      ref={refViewObj}
      userAgent={DeviceInfo.getUserAgent()["_z"] + '/-webview-'}
      style={styles.ViewSize} 
      source={{uri : 'https://zezeya.com',}}
      setBuiltInZoomControls={false}
      onError={printError}
      onMessage={onMsgFn}
    />
  )
}

const styles = StyleSheet.create({
  ViewSize : {
    flex : 1,
    alignItems: 'center',
  }
});

export default PageView;