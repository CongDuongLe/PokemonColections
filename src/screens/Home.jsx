import { View, Text, Flatlist } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import React from 'react'
import Header from '../components/Header'
import CategorySwipe from '../components/CategorySwipe'
import Data from '../components/Dummy'
import Pokemon from '../components/Pokemon'
import {SafeAreaView} from 'react-native-safe-area-context';

export default function Home() {

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: '#FDEFF4',
    }}>
        <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="dark-content" />
    <Header/>
    {/* <Recommended/> */}
    {/* <CategorySwipe/> */}
    <Pokemon/>
    </SafeAreaView>
  )
}

