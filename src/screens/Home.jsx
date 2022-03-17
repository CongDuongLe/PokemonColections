import { View, Text, Flatlist } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import React from 'react'
import Header from '../components/Header'
import CategorySwipe from '../components/CategorySwipe'
import Data from '../components/Dummy'
import Pokemon from '../components/Pokemon'
import {SafeAreaView} from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  // receive navigation props from Pokemon.jsx
  const navigation = useNavigation()



  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: '#FDEFF4',
    }}>
        <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="dark-content" />
    <Header/>
    {/* <Recommended/> */}
    {/* <CategorySwipe/> */}
    <Pokemon 
      navigation={navigation}
     />
    </SafeAreaView>
  )
}

