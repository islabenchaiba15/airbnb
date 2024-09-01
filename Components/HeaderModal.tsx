import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import tw from 'twrnc'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import Animated from 'react-native-reanimated'
const HeaderModal = () => {
  const router=useRouter()
  const [active,setActive]=useState(0)
  return (
    <View style={tw``}> 
      <SafeAreaView style={tw`flex-row gap-14 items-center justify-start mx-4 py-3 relative`}>
       <StatusBar style='dark'/>
       <TouchableOpacity onPress={()=>router.back()}>
          <Ionicons name='close-outline' size={24} color={'dark'}/>
        </TouchableOpacity>
        <View style={tw`flex-row items-center gap-3`}>
            <TouchableOpacity style={tw``} onPress={()=>setActive(0)}>
              <Text style={tw`font-bold ${active===0 ? 'text-red-500 underline' : ''} text-lg tracking-widest`}>Stays</Text>
            </TouchableOpacity>
            <TouchableOpacity style={tw``} onPress={()=>setActive(1)}>
              <Text style={tw`font-bold ${active===1 ? 'text-red-500 underline' : ''} text-lg tracking-widest`}>Experience</Text>
            </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  )
}

export default HeaderModal