import { View, Text, ImageBackground } from 'react-native'
import React from 'react'
import { useRoute, useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';


const Spash = () => {
    const background = { uri:'https://www.wallpapersun.com/wp-content/uploads/2020/06/Pikachu-Wallpaper-36.jpg' };
    // navigate to Home Screen after 3 seconds
    const navigation = useNavigation();
    setTimeout(() => {
        navigation.replace('Home');
    }, 2500);

  return (
    <View style={{
        flex: 1,

    }}>
         <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="light-content" />
        <ImageBackground
            source={background}
            style={{
                flex: 1,
                resizeMode: 'cover',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        />
    </View>
  )
}

export default Spash