import { View, Text, Image } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import React from 'react'
import {SafeAreaView} from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';



const DetailPoke = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { id, name, image, type, height, weight, abilities, stats, description } = route.params;


  return (
    <SafeAreaView style={{
        flex: 1,
        backgroundColor: '#FDEFF4',
    }}>
        <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="dark-content" />
      <Text>DetailPoke</Text>
        <Text>{id}</Text>
        <Text>{name}</Text>
        <Image 
            source={{uri: image}} 
        />
    
        <Text>{type}</Text>
        <Text>{height}</Text>
        <Text>{weight}</Text>
        <Text>{abilities}</Text>
        <Text>{stats}</Text>
        <Text>{description}</Text>


    </SafeAreaView>
  )
}

export default DetailPoke