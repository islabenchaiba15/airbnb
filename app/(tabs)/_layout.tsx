import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { FontAwesome, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'

const Layout = () => {
  return (
    <Tabs screenOptions={{tabBarActiveTintColor:"red",tabBarLabelStyle:{
      fontSize: 12,
      fontWeight: "bold",
      paddingTop: 5,
      paddingBottom: 5,

    }}}>
      <Tabs.Screen  name="Index" options={{tabBarLabel:"Explore",tabBarIcon:({color,size})=><Ionicons name='search' size={size} color={color}/>}} />
      <Tabs.Screen  name="Wishlist" options={{tabBarLabel:"WishList",tabBarIcon:({color,size})=><Ionicons name='heart-outline' size={size} color={color}/>}} />
      <Tabs.Screen  name="Explore" options={{tabBarLabel:"Trips",tabBarIcon:({color,size})=><FontAwesome5 name='airbnb' size={size} color={color}/>}} />
      <Tabs.Screen  name="Inbox" options={{tabBarLabel:"Inbox",tabBarIcon:({color,size})=><MaterialCommunityIcons name='message-outline' size={size} color={color}/>}} />
      <Tabs.Screen  name="Profile" options={{headerShown:false, tabBarLabel:"Profile",tabBarIcon:({color,size})=><Ionicons name='person-circle-outline' size={size} color={color}/>}} />

    </Tabs>
  )
}

export default Layout