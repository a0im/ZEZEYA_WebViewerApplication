/*
  todo 
  1. 기종별 사이즈 호환   !!
  2. 뒤로가기 버튼 구현   !!
  3. 크로스 브라우징  
  4.페이지 리프레쉬
  5.키보드팝업          !!
  6. 에러 핸들링
  7. 버튼 이미지 삽입 //public folder 찾기
  8. 앱 로고 변경 
  9. 앱 실행(로딩환경) 설정 
*/

import React, {useMemo , useRef} from 'react';
import PageView from "./component/PageView";
import IosBackPageBar from "./component/IosBackPageBar";
import {
  SafeAreaView,
  StyleSheet,
  Platform,
  ScrollView,
} from 'react-native';


const App = _ => {
  const memoOsEnviroment = useMemo( _ => Platform.OS,[])
  const refViewObj = useRef(); //WebView 객체 변수저장

  return (
    <SafeAreaView style={styles.contain}>
        <IosBackPageBar os={memoOsEnviroment} refViewObj={refViewObj}/>
        <PageView refViewObj={refViewObj}/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contain : {
    flex : 1,
    backgroundColor : '#fff'

  }
});

export default App;
