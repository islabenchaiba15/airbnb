import { View, Text } from 'react-native'
import React, { useMemo, useState } from 'react'
import { Link, Stack } from 'expo-router'
import tw from 'twrnc'
import { Header } from 'react-native/Libraries/NewAppScreen'
import CustomHeader from '@/Components/CustomHeader'
import { SafeAreaView } from 'react-native-safe-area-context'
import Listing from '@/Components/Listing'
import { airbnb } from '@/constants/data'
import ListingMap from '@/Components/ListingMap'
import {Geo} from '@/constants/Geo'
import LidtingSheet from '@/Components/LidtingSheet'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import 'react-native-gesture-handler';
const Page = () => {
  const [category,setCategory]=useState('Homes')
  const onDataChanged=(category:string)=>{
    setCategory(category)
  }
  const items = useMemo(()=>airbnb as any,[])
  return (
        <GestureHandlerRootView style={tw`-mt-10`}>
            <Stack.Screen options={{
              header:()=><CustomHeader onCategoryChanged={onDataChanged}/>
              
            }}/>
            <ListingMap listingDataGeo={Geo}/>
            <LidtingSheet listing={items} category={category}/>
      </GestureHandlerRootView>
  )
}

export default Page