import { View, Text, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import { BlurView } from 'expo-blur'
import tw from 'twrnc'
import { Ionicons } from '@expo/vector-icons'
import Animated, { FadeIn } from 'react-native-reanimated'
import { guestsGroups, places } from '@/assets/data/places'
//@ts-ignore
import DatePicker from 'react-native-modern-datepicker';
const Booking = () => {
  const [openCard,setOpenCard]=useState(0)
  const [selectedPlace,setSelectedPlace]=useState(0)
  const [selectedDate, setSelectedDate] = useState('');
  const currentDate = new Date();
  const [groups, setGroups] = useState(guestsGroups);
  // Extract the components of the date (year, month, day)
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Months are zero-indexed
  const day = currentDate.getDate();

  // Format the date as a string (optional)
  const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
  return (
    <BlurView intensity={0} tint='light' style={tw`flex-1 relative`} >
      <Animated.View entering={FadeIn.duration(200)} style={tw` bg-white p-4 m-3 mx-4 rounded-xl `}>
        {openCard !=0 && (
          <TouchableOpacity onPress={()=>setOpenCard(0)} style={tw`flex-row justify-between items-center`}>
            <Text style={tw` text-sm`}>Where</Text>
            <Text style={tw`font-bold text-md`}>Any place</Text>
        </TouchableOpacity>
        ) }
        {openCard ===0 && (
          <>
            <TouchableOpacity>
              <Text style={tw`text-xl font-bold`}>where you go</Text>
            </TouchableOpacity>
            <Animated.View >
              <View style={tw`mt-2 flex-row items-center justify-start gap-2 border-2 border-gray-300 p-2 rounded-lg`}>
                <Ionicons name='search-outline' size={20}/>
                <TextInput placeholder='i am flexible ' placeholderTextColor={'black'}/>
              </View>
              <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{gap:14 }}
              style={tw`mt-4 `}
              >
                {places.map((place,index) =>(
                  <TouchableOpacity style={tw`flex-col gap-1`} onPress={()=>setSelectedPlace(index)}>
                    <Image source={place.img} style={{...tw`rounded-lg ${index===selectedPlace ?'border-2 border-gray-500 ' : ''}`,width:100,height:100}}/>
                    <Text style={tw`${index===selectedPlace ? 'font-bold':''} text-base`}>{place.title}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </Animated.View>
          </>
        )}
      </Animated.View>
      <Animated.View entering={FadeIn.duration(200) }style={tw` bg-white p-4 m-3 mx-4 rounded-xl `}>
        {openCard !=1 && (
          <TouchableOpacity onPress={()=>setOpenCard(1)} style={tw`flex-row justify-between items-center`}>
            <Text style={tw` text-sm`}>When</Text>
            <Text style={tw`font-bold text-md`}>Any Week</Text>
        </TouchableOpacity>
        ) }
        {openCard ===1 && (
          <>
            <TouchableOpacity>
              <Text style={tw`text-xl font-bold`}>when is your trip</Text>
            </TouchableOpacity>
            <DatePicker
              current={formattedDate}
              selected={formattedDate}
              mode={'calendar'}
              onSelectedChange={(date:any) => setSelectedDate(date)}
              options={{mainColor:'red'}}
            />
          </>
        )}
      </Animated.View>
      <Animated.View entering={FadeIn.duration(500) } style={tw` bg-white p-4 m-3 mx-4 rounded-xl `}>
        {openCard !=2 && (
          <TouchableOpacity onPress={()=>setOpenCard(2)} style={tw`flex-row justify-between items-center`}>
            <Text style={tw` text-sm`}>who's</Text>
            <Text style={tw`font-bold text-md`}>Any Guest</Text>
        </TouchableOpacity>
        
        ) }
        {openCard ===2 && (
          <>
            <TouchableOpacity>
              <Text style={tw`text-xl font-bold`}>who's coming</Text>
            </TouchableOpacity>
            <Animated.View style={tw`flex-col gap-1 mt-2`}>
              {guestsGroups.map((group,index)=>(
                <>
                  <View key={group.name} style={tw`flex-row justify-between items-center ${index+1 < guestsGroups.length ? 'border-b border-gray-400 py-3' : ''}`}>
                    <View>
                      <Text style={tw`text-base font-bold`}>{group.name}</Text>
                      <Text style={tw`text-sm text-gray-500 `}>{group.text}</Text>
                    </View>
                    <View style={tw`flex-row gap-3 items-center`}>
                      <TouchableOpacity  onPress={()=>{
                        const groups = [...guestsGroups]
                        groups[index].count=groups[index].count > 0 ? groups[index].count - 1:0;
                        setGroups(groups)
                      }}>
                        <Ionicons name='remove-circle-outline' size={28} color={`${guestsGroups[index].count > 0 ? 'black':'gray'}`}/>
                      </TouchableOpacity>
                      <Text style={tw`text-base font-bold`}>{group.count}</Text>
                      <TouchableOpacity  onPress={()=>{
                        const groups = [...guestsGroups]
                        groups[index].count++;
                        setGroups(groups)
                      }}>
                        <Ionicons name='add-circle-outline' size={28}/>
                      </TouchableOpacity>
                    </View>
                </View>
                <View style={tw``}/>
                </>
              ))}
            </Animated.View>
          </>
        )}
      </Animated.View>

      <Animated.View style={{...tw`absolute w-full h-22 bg-white`,bottom:0}}>
        <View style={tw`flex-row mx-4 justify-between items-center my-auto`}>
          <TouchableOpacity onPress={()=>{
            setOpenCard(0)
            setSelectedPlace(0)
          }}>
            <Text style={tw`underline font-bold text-lg `}>Clear all </Text>
          </TouchableOpacity>
          <TouchableOpacity  style={tw`flex-row-reverse gap-3 justify-center items-center bg-red-500 p-2 rounded-xl`}>
            <Text style={tw`font-bold text-lg text-white`}>Search</Text>
            <Ionicons name='search-outline' size={20} color={'white'}/>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </BlurView>
  )
}

export default Booking