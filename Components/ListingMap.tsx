import { View, Text } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
interface Props{
    listingDataGeo:any
}
const ListingMap = ({listingDataGeo}:Props) => {
    const router = useRouter();
    const onMarkerSelected=(item:any)=>{
        router.push(`/listing/${item.properties.id}`);
    }
  return (
    <View style={tw` -mt-10`}>
      <MapView style={tw`w-full h-full`} provider={PROVIDER_GOOGLE} showsUserLocation={true} showsMyLocationButton={true}>
        {
            listingDataGeo.features.map((item:any)=>(
                <Marker
                key={item.properties.id}
                coordinate={{
                    latitude:+item.properties.latitude,
                    longitude:+item.properties.longitude!,
                }}
                onPress={()=>onMarkerSelected(item)}
                >
                    <View style={{...tw`bg-white rounded-md p-1 shadow-lg shadow-indigo-500/40`,elevation:1}}>
                        <Text style={tw`text-xs font-bold`}>$ {item.properties.price}</Text>
                    </View>
                </Marker>
            ))
        }
       </MapView>
    </View>
  )
}

export default ListingMap