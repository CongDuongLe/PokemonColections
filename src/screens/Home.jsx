import { View, Text, Flatlist } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import Recommended from '../components/Recommended'
import CategorySwipe from '../components/CategorySwipe'
import Data from '../components/Dummy'
import Pokemon from '../components/Pokemon'

export default function Home(){
  return (
    <View>
    <Header/>
    {/* <Recommended/> */}
      {/* <CategorySwipe/> */}
      <Pokemon/>
    </View>
  )
}

