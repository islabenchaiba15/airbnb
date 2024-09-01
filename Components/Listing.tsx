import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useReducer, useRef } from 'react'
import tw from 'twrnc' 
import { Link } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { BottomSheetFlatList, BottomSheetFlatListMethods } from '@gorhom/bottom-sheet'
interface Props{
    items:any[],
    category:string,
    refresh:number
}
const Listing = ({items,category,refresh}:Props) => {
    useEffect(()=>{

    })
    useEffect(()=>{
        console.log('reloaaaaaaaad')
    },[category])
    useEffect(()=>{
        console.log('reloaaaaaaaad')
        if(refresh){
            listRef.current?.scrollToOffset({offset:0,animated:true})
        }
    },[refresh])
    const listRef=useRef<BottomSheetFlatListMethods>(null)
    const renderItem = ({ item }: { item: any }) => (
          <Link href={`/listing/${item.id}` }asChild>
            <TouchableOpacity style={tw`py-4 relative`}>
                <Image source={{uri:item.medium_url}} style={{...tw`w-full rounded-2xl`,height:300}}/>
                <TouchableOpacity style={{...tw`absolute mt-8 `,right:30}}>
                    <Ionicons name='heart-outline' size={28} />
                </TouchableOpacity>
                <View style={tw`flex-col mx-1 mt-1` }>
                    <View style={tw`flex-row items-center justify-between `}>
                        <Text style={tw`font-bold`}>{item.city},{item.country}</Text>
                        <View style={tw`flex-row-reverse items-center gap-1`}>
                            <Ionicons name='star'/>
                            <Text>{item.number_of_reviews}</Text>
                        </View>
                    </View>
                    <Text style={{...tw`text-gray-500 text-base tracking-widest`,fontSize:14}}>{item.property_type}</Text>
                    <View style={tw`flex-row items-center gap-1`}>
                            <Text>$ {item.price}</Text>
                            <Text style={tw`font-bold`}>per night</Text>
                    </View>
                </View>
            </TouchableOpacity>
          </Link>
      );
  return (
    <View style={tw`w-full h-full `}>
      <BottomSheetFlatList
      showsVerticalScrollIndicator={false}
      renderItem={renderItem}
      data={items}
      keyExtractor={(item) => item.id}
      style={tw`mx-4 `}
      ref={listRef}
      ListHeaderComponent={<Text style={tw`text-center font-bold `}>Homes</Text>}
      />
    </View>
  )
}

export default Listing