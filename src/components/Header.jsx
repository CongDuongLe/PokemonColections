import { View, Text, TouchableOpacity} from 'react-native'
import React,{useEffect, useState} from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';

function Header(){
  return (
    <View style={{ marginHorizontal : 20, justifyContent: 'center',
      flexDirection : 'row', justifyContent: 'space-between',   
      alignItems : 'center',
    
    }}>
      <View>
      <Text style={{ fontSize: 25, letterSpacing: 1.8, fontWeight:'500'}}>Who's that </Text>
      <Text style={{ fontSize: 30, fontWeight: 'bold', letterSpacing : 2.5}}>Pokémon !</Text>
      </View>
      <TouchableOpacity style={{
        alignItems : 'center',
      }}>
      <MaterialCommunityIcons name="pokeball" size={40} color="#1a1b17" style={{ 
                }} />
   
      </TouchableOpacity>
    </View>
  )
}

export default Header