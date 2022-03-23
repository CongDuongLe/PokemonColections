import { View, Text, Flatlist } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import React from 'react'
import Header from '../components/Header'
import Pokemon from '../components/Pokemon'
import {SafeAreaView} from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useRoute, useIsFocused } from '@react-navigation/native';

export default function Home({navigation,}) {
  // receive navigation props from Pokemon.jsx
  const route = useRoute();
  // const { id, name, image, type,} = route.params;





  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: '#FDEFF4',
    }}>
        <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="dark-content" />
    <Header/>

    <Pokemon 
      navigation={navigation}
     />
    </SafeAreaView>
  )
}

