import { View, Text, Button, Image, TextInput ,TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth, useUser } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import tw from 'twrnc'
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import * as ImagePicker from 'expo-image-picker';

const Profile = () => {
  const {signOut,isSignedIn} = useAuth()
  const {user} =useUser()
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [email, setEmail] = useState(user?.emailAddresses[0].emailAddress);
  const [edit, setEdit] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState('');

  // Load user data on mount
  useEffect(() => {
    if (!user) {
      return;
    }

    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.emailAddresses[0].emailAddress);
  }, [user]);
  const onSaveUser = async () => {
    try {
      await user?.update({
        firstName: firstName!,
        lastName: lastName!,
      });
    } catch (err: any) {
      setErrorMessage(err.errors[0].longMessage);
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setEdit(false);
    }
  };
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      const base64 = `data:image/png;base64,${result.assets[0].base64}`;
      user?.setProfileImage({
        file: base64,
      });
    }
  };
const router = useRouter()
  return (
     (
      <GestureHandlerRootView>
        <SafeAreaView>
          <View style={tw`flex-row items-center justify-between mx-4 my-4`}>
            <Text style={tw`text-3xl font-bold `}>Profile</Text>
            <Ionicons name='notifications-outline' size={28}/>
          </View>
          {user && <View style={tw`bg-white mx-4 rounded-2xl shadow-xl p-6 my-10 flex-col gap-2 items-center`}>
            <TouchableOpacity onPress={pickImage}>
              <Image source={{uri:user?.imageUrl }} style={{...tw`rounded-full`,width:100,height:100}}/>
            </TouchableOpacity>
            {edit ? (
              <View style={tw`flex-row gap-4 items-center `}>
                <TextInput style={tw`border-2 border-gray-500/50 text-base rounded-lg font-bold py-1 px-2`} 
                placeholder='firstname' 
                value={firstName || ''}
                onChangeText={setFirstName}/>
                <TextInput placeholder='lastName'
                 style={tw`border-2 border-gray-500/50 text-base font-bold rounded-lg py-1 px-2`} 
                 value={lastName || ''}
                  onChangeText={setLastName}/>
                <TouchableOpacity onPress={onSaveUser}>
                  <Ionicons name='checkmark-outline' size={30 }/>
                </TouchableOpacity>
              </View>
            ):(
              <View style={tw`flex-col items-center justify-center gap-3`}>
                <View style={tw`flex-row-reverse items-center gap-2`}>
                  <TouchableOpacity onPress={()=>setEdit(true)}>
                    <Ionicons name='create-outline' size={24 }/>
                  </TouchableOpacity>
                  <Text style={tw`font-bold text-lg`}>{user?.firstName} {user?.lastName}</Text>
                </View>
                <Text>
                    {user?.emailAddresses[0].emailAddress}
                </Text>
                <Text style={tw`font-bold text-md`}>
                    Since {user?.createdAt?.toLocaleDateString()}
                </Text>
              </View>
            )}
          </View>}
          {isSignedIn && <TouchableOpacity style={tw`my-4 flex-row items-center justify-center`}>
            <Text style={tw`font-bold text-xl`}>Logout</Text>
          </TouchableOpacity>
        }
        {!isSignedIn && <TouchableOpacity style={tw`my-4 flex-row items-center justify-center`} onPress={()=>router.push('/(modals)/Login')}>
            <Text style={tw`font-bold text-xl`}>Login</Text>
          </TouchableOpacity>
        }
      </SafeAreaView>
    </GestureHandlerRootView>
    )
  )
}

export default Profile