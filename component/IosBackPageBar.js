import React , {useState} from 'react';
import BackBtnIcon from 'react-native-vector-icons/SimpleLineIcons'
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';


const IosBackPageBar = ({os , refViewObj}) => {
  const [parentHeight, setParentHeight] = useState(0);

  //부모 컴포넌트 높이값 
  const onLayout = evnt => {
    const {height} = evnt.nativeEvent.layout;
    setParentHeight(height) 
  }

  //ios 뒤로가기 버튼 
  const onIosBackBtn = _ => {
    if (!refViewObj.current) return;
    refViewObj.current.goBack();
  }


  return (
    os === 'ios' 
      ? <View style={styles.barContain}>
          <TouchableOpacity 
            style={dStyles(parentHeight).backBtn} 
            onPress={onIosBackBtn} 
            onLayout={onLayout}>          
            <BackBtnIcon 
              style={styles.backBtnIcon} 
              name='arrow-left' 
              size={parentHeight * 0.68} 
              color='#fff'/>
          </TouchableOpacity>
        </View>
      : null
  )
}

const styles = StyleSheet.create({
  barContain : {
    backgroundColor : '#000',
    flex: 0.062,
  },
})

const dStyles = (height) => StyleSheet.create({
  backBtn :{
    width : height,
    justifyContent: 'center',
    alignItems : 'center',
    flexDirection : 'row',
    flex : 1,
  },
})

export default IosBackPageBar;