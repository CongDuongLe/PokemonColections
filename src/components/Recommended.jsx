import { View, TextInput } from 'react-native'
import React,{useState} from 'react'
import { FontAwesome } from '@expo/vector-icons';

const Recommended = () => {
  // const {pokemons} = props
    
   // get Pokemon from Pokemon.jsx and filter it by name
 


    



    const onChangeSearch = (text) => {
        setSearch(text);
    }
    // // end editing and save to state and filter data on flatlist
    // const onEndEditing = () => {
    //     setSearch(search);
    // }


  return (
    <View style={{
      backgroundColor: '#fff',
      paddingHorizontal: 16,
      paddingVertical: 10,
      marginTop: 16,
      borderRadius : 20,
      marginHorizontal :45, 
      flexDirection : 'row',
      alignItems : 'center', 
      elevation : 5
    }}>
      <FontAwesome name="search" size={22} color="#1a1b17" style={{ 
        marginRight : 10,
      }} />
      <TextInput placeholder="Search Pokemon, Animal..."
      style={{
        fontSize: 16,
        color: '#1a1b17',
      }}
      // onChangeText={handleSearch}
      // onEndEditing={onEndEditing}
      
      />
    </View>
  )
}

export default Recommended