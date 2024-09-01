import { View, Text, StatusBar, TouchableOpacity, ScrollView } from 'react-native'
import React, { useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar'
import tw from 'twrnc'
import { Ionicons } from '@expo/vector-icons'
import { Link } from 'expo-router'
import * as Haptics from 'expo-haptics';
import { airbnbCategories } from '@/constants/categories'
interface Props{
    onCategoryChanged:(category:string) => void
}
const CustomHeader = ({onCategoryChanged}:Props) => {
    const ITEM_WIDTH = 71
    const scrollViewRef = useRef<ScrollView>(null);
    const [activeCategory,setActiveCategory]=useState('Homes')
    const selectCtegory=(categoryName:string,index:number)=>{
        setActiveCategory(categoryName)
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
        scrollViewRef.current?.scrollTo({ x: index * ITEM_WIDTH, animated: true });
        onCategoryChanged(categoryName)
    }
  return (
    <SafeAreaView style={tw`bg-white`}>
      <ExpoStatusBar style="dark" />
      <View style={{...tw`flex-row-reverse items-center justify-between mx-5 gap-6 py-3`}} >
        <TouchableOpacity style={{...tw`border-2 rounded-full p-2 border-gray-500`}}>
            <Ionicons name='options-outline' size={24} />
        </TouchableOpacity>
        <Link href={"/(modals)/Booking"} asChild>
            <TouchableOpacity style={{...tw`flex-row items-center gap-1 bg-white border-2 border-gray-300 shadow-lg shadow-indigo-500/40   p-2 rounded-full flex-1 `,elevation:2}}>
                <Ionicons name='search-outline' size={24}/>
                <View style={tw`flex-col `}>
                    <Text style={tw`font-bold`}>Where to ?</Text>
                    <Text style={{...tw`text-gray-700 text-base tracking-widest`,fontSize:12}}>Anywhere - any week</Text>
                </View>
            </TouchableOpacity>
        </Link>
      </View>
      <ScrollView 
        ref={scrollViewRef}
         horizontal showsHorizontalScrollIndicator={false} style={tw`ml-5 pt-2 `}>
        {airbnbCategories.map((category,index)=>{
            let isActive=category.name===activeCategory
            let activeButton=isActive ? 'bg-amber-500' :'bg-gray-500'
            return(
            <TouchableOpacity
                style={tw`mx-2 flex-col items-center gap-1 ${isActive ? 'border-b-4 border-gray-500 pb-2' : ''}`}
                key={category.name}
                onPress={() => selectCtegory(category.name,index)}
            >                
                <Ionicons name={category.icon as any} size={24}/>
                <Text>{category.name}</Text>
            </TouchableOpacity>
        )})}
      </ScrollView>
    </SafeAreaView>
  )
}

export default CustomHeader