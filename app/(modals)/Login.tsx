import { View, Text, ScrollView, TextInput, Button, TouchableOpacity } from 'react-native'
import React from 'react'
import useWarmUpBrowser from '@/hooks/useWarmUpBrowser'
import tw from 'twrnc'
import { Ionicons } from '@expo/vector-icons'
import { useOAuth, useSignUp } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
enum Strategy{
    Google='oauth_google',
    Facebook='oauth_facebook'
}

const Login = () => {
    const [emailAddress, setEmailAddress] = React.useState("");
    const [pendingVerification, setPendingVerification] = React.useState(false);
    const [code, setCode] = React.useState("");
    const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter()
  useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }
 
    try {
      await signUp.create({
        emailAddress,
      });
 
      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingVerification(true);
      // change the UI to our pending section.
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };
 
  // This verifies the user using email code that is delivered.

    const onPress = React.useCallback(async () => {
        try {
          const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow();
     
          if (createdSessionId) {
            setActive!({ session: createdSessionId });
            router.push("/(tabs)/Index")
          } else {
            // Use signIn or signUp for next steps such as MFA
          }
        } catch (err) {
          console.error("OAuth error", err);
        }
      }, []);
      const onPressVerify = async () => {
        if (!isLoaded) {
          return;
        }
     
        try {
          const completeSignUp = await signUp.attemptEmailAddressVerification({
            code,
          });
     
          await setActive!({ session: completeSignUp.createdSessionId });
          console.log("user createdddddddddd")
          router.push("/(tabs)/Index")
          setPendingVerification(false);
        } catch (err: any) {
          console.error(JSON.stringify(err, null, 2));
        }
      };
  return (
    <ScrollView style={tw`bg-white`}>
     {!pendingVerification && ( <View>
        <View style={tw` mx-5 my-6 border-2 rounded-md border-gray-300 flex-col gap-8 `}>
        <TextInput placeholder='email' autoCapitalize="none"
              value={emailAddress}
              onChangeText={(email) => setEmailAddress(email)} style={{...tw`p-3 text-base tracking-widest`,fontSize:16}}/>
      </View>
      <TouchableOpacity  onPress={onSignUpPress} style={tw`bg-red-500 p-4 flex justify-center items-center mx-5 rounded-xl`}>
        <Text style={{...tw`font-bold text-base tracking-widest text-white`,fontSize:16}}>Continue</Text>
      </TouchableOpacity>
     </View>)}
     {pendingVerification && (
        <View>
          <View>
            <TextInput
              value={code}
              placeholder="Code..."
              onChangeText={(code) => setCode(code)}
            />
          </View>
          <TouchableOpacity onPress={onPressVerify}>
            <Text>Verify Email</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={tw`mt-8 flex flex-row items-center gap-8 mx-5`}>
        <View style={tw`flex-1 border-t-2 border-gray-300`}/>
        <Text style={{...tw`font-bold text-base tracking-widest`,fontSize:16}}>Or</Text>
        <View style={tw`flex-1 border-t-2 border-gray-300`}/>
      </View>
      <View style={{...tw`mt-8 mx-5 flex-col gap-8`}}>
        <TouchableOpacity style={tw`flex flex-row justify-start items-center gap-10 border-2 p-3 rounded-md`}>
            <Ionicons name='call-outline' size={24}/>
            <Text style={{...tw`font-bold`,fontSize:16}}>Continue with phone</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPress} style={tw`flex flex-row justify-start items-center gap-10 border-2 p-3 rounded-md`}>
            <Ionicons name='logo-google' size={24}/>
            <Text style={{...tw`font-bold`,fontSize:16}}>Continue with google</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default Login