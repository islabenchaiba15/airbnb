import { View, Text, Animated, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { airbnb } from '@/constants/data'
import tw from 'twrnc'
import { Ionicons } from '@expo/vector-icons'
const Page = () => {
    const {id}=useLocalSearchParams<{id:string}>()
    const findListingById = (id: string): any | undefined => {
        return airbnb.find(item => item.id === id);
      };
    
      // Example of using the findListingById function
      const foundListing = findListingById(id);
  return (
    <View style={tw`flex-1`}>
      <Animated.ScrollView>
        <Animated.Image source={{uri:foundListing.xl_picture_url}} style={{...tw`w-full`,height:300}}/>
        <View style={tw`flex-col mx-4 my-5`}> 
            <Text style={{...tw`text-2xl font-bold`,}}>
                {foundListing.name}
            </Text>
            <Text style={{...tw`text-base font-bold`,}}>
                {foundListing.room_type } in {foundListing.smart_location}
            </Text>
            <Text>
                {foundListing.guests_included} guests . {foundListing.bedrooms} bedrooms . {foundListing.beds} bed .
                {foundListing.bathrooms} bathrooms
            </Text>
            <View style={tw`flex-row items-center gap-1`}>
                <Ionicons name="star" size={18}/>
                <Text style={{...tw`text-base font-bold`,}}>
                    {foundListing.review_scores_rating/20} . {foundListing.number_of_reviews} reviews
                </Text>
            </View>
            <View style={tw`border-t-2 border-gray-400 my-3`}/>
            <View style={tw`flex-row gap-2 items-center`}>
                <Image source={{uri:foundListing.xl_picture_url}} style={{...tw`rounded-full `,width:60,height:60}}/>
                <View>
                    <Text style={{...tw`text-base font-bold`,}}>
                        hosted by {foundListing.host_name}      
                    </Text>
                    <Text>
                        host since {foundListing.host_since}
                    </Text>
                </View>
            </View>
            <View style={tw`border-t-2 border-gray-400 my-3`}/>
            <View>
                <Text>{foundListing.description}</Text>
            </View>
        </View>
      </Animated.ScrollView>
      <Animated.View style={{...tw`flex flex-row justify-between items-center w-full bg-white border-t-2 border-gray-200`,height:100}}>
        <TouchableOpacity style={tw`flex-col mx-5`}>
            <Text style={tw`text-xl font-bold`}>
                $ {foundListing.price} per night
            </Text>
        </TouchableOpacity>
        <TouchableOpacity style={tw`bg-red-500 mx-5 rounded-xl`}>
            <Text style={tw`p-3 text-xl font-bold text-white `}>reserver</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  )
}

export default Page