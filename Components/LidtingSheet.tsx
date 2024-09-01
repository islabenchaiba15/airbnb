import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import tw from 'twrnc'
import Listing from './Listing';
import { Ionicons } from '@expo/vector-icons';
interface Props{
    listing:any,
    category:string
}
const LidtingSheet = ({listing,category}:Props) => {
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [refresh,setRefresh]=useState(0);
  // variables
  const snapPoints = useMemo(() => ['10%', '100%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);
  const showMap =()=>{
    bottomSheetRef.current?.collapse();
    setRefresh(refresh+1)
  }
  // renders
  return (
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <View style={tw`flex items-center font-bold relative`}>
          <Listing items={listing} category={category} refresh={refresh}/>
          <TouchableOpacity onPress={()=>showMap()} style={{...tw`flex-row items-center justify-center gap-1 bg-black/70 p-3 rounded-3xl absolute`,bottom:30}}>
            <Text style={tw`text-md font-bold text-white`} >map</Text>
            <Ionicons name='map' color={'white'} size={16} style={tw`mt-1`}/>
          </TouchableOpacity>
        </View>
      </BottomSheet> 
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'white',
    marginTop:50,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    fontWeight: 'bold',
  },
});

export default LidtingSheet;