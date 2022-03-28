import { View, Text, Image, TouchableOpacity, StyleSheet, ToastAndroid} from 'react-native'
import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react'
import {SafeAreaView} from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DetailPoke = (params) => {
    const navigation = useNavigation();
    const route = useRoute();
    const { id, name, image, type, height, weight,abilities, stats} = route.params;
    const [isFavorite, setIsFavorite] = useState(false);
    // async storage favorite pokemons
    const getFavoritePoke = async () => {
        try {
            const value = await AsyncStorage.getItem('favoritePokemons');
            if (value !== null) {
                const favoritePokemons = JSON.parse(value);
                const isFavorite = favoritePokemons.find(pokemon => pokemon.id === id);
                setIsFavorite(!!isFavorite);
            }
        } catch (error) {
            console.log(error);
        }
    }
    const addFavoritePoke = async () => {
        try {
            const value = await AsyncStorage.getItem('favoritePokemons');
            if (value !== null) {
                const favoritePokemons = JSON.parse(value);
                const isFavorite = favoritePokemons.find(pokemon => pokemon.id === id);
                if (!isFavorite) {
                    favoritePokemons.push({
                        id,
                        name,
                        image,
                        type,
                        height,
                        weight,
                        abilities,
                        stats : [...stats]
                    });
                    await AsyncStorage.setItem('favoritePokemons', JSON.stringify(favoritePokemons));
                    setIsFavorite(true);
                }
            } else {
                const favoritePokemons = [{
                    id,
                    name,
                    image,
                    type,
                    height,
                    weight,
                    abilities,
                    stats : [...stats]
                }];
                await AsyncStorage.setItem('favoritePokemons', JSON.stringify(favoritePokemons));
                setIsFavorite(true);
            }
        } catch (error) {
            console.log(error);
        }
    }
    const removeFavoritePoke = async () => {
        try {
            const value = await AsyncStorage.getItem('favoritePokemons');
            if (value !== null) { 
                const favoritePokemons = JSON.parse(value);
                const isFavorite = favoritePokemons.find(pokemon => pokemon.id === id);
                if (isFavorite) {
                    const newFavoritePokemons = favoritePokemons.filter(pokemon => pokemon.id !== id);
                    await AsyncStorage.setItem('favoritePokemons', JSON.stringify(newFavoritePokemons));
                    setIsFavorite(false);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getFavoritePoke();
    }, []);
    // useEffect(() => {
    //     removeFavoritePoke();
    // }, []);

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: '#FDEFF4',
    }}>
      <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="dark-content" />

      {/* start button like pokemon */}
      <View
        style={{
          height: '5%',
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          marginTop: 5
        }}>
        {/* go back home Screen */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >
         <Ionicons name="ios-chevron-back" size={24} color="black" />
        </TouchableOpacity>
         {/* go back home Screen */}
         {/* button to set like pokemon */}
        <Text style={{ fontSize: 22, fontWeight: 'bold', letterSpacing: 3 }}>{name}</Text>
        <TouchableOpacity
          onPress={() => {
            if (isFavorite) {
              removeFavoritePoke();
              ToastAndroid.show('Pokemon removed from favorites', ToastAndroid.SHORT);
            } else {
              addFavoritePoke();
              ToastAndroid.show('Added to favorite', ToastAndroid.SHORT);
            }
          }}

        >
          <FontAwesome name="heart" size={24} style={{
            color: isFavorite ? 'red' : 'black',
          }} />
        </TouchableOpacity>
      </View>
      {/* end button like pokemon */}
      <View style={{
        flex: 1,
        alignItems: 'center',
      }}>
        {/* show pokemon image */}
        <View style={{
          width: '94%',
          height: '60%',
          borderRadius: 20,
          overflow: 'hidden',
          marginTop: 15,
          backgroundColor: '#474F85',
          alignItems: 'center',
        }}>
          <Image source={{ uri: image }} style={{ width: "80%", height: "80%" }} resizeMode="contain" />
          <Text style={{ fontSize: 28, fontWeight: '700', letterSpacing: 7, color: 'white', marginTop:10 }}>#{id}: {name.toUpperCase()}</Text>
        </View>
        <View style={{
          width: '94%',
          height: '35%',
          backgroundColor: '#474F85',
          borderRadius: 20,
          overflow: 'hidden',
          marginTop: 10
        }}>
          <View style={{
            flexDirection: 'row', justifyContent: 'space-around',
            marginTop: 10, paddingVertical: 10, marginHorizontal: 4
          }}>
            <Text style={styles.poketext2}>Type: {type} |</Text>
            <Text style={styles.poketext2}>Height: {height} cm |</Text>
            <Text style={styles.poketext2}>Weight: {weight} kg </Text>
          </View>
          <View style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10,
            paddingHorizontal: 5
          }}>
            <Text style={styles.poketext1}>Abilities : {abilities}</Text>
            <View>
              <Text style={{
                fontSize: 22,
                fontWeight: 'bold',
                marginTop: 10,
                marginBottom :5,
                textAlign: 'center',
                color: 'white',
                letterSpacing: 2
              }}>Pokemon Stats</Text>
              <View style={{        
               flex :1,
              }}> 
                {stats.map(stat => (
                  <View key={stat.stat.name} style={{
                    flexDirection: 'row',
                    backgroundColor: '#474F85',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    overflow: 'hidden',
                  
                  }}>
                    <Text style={styles.poketext}>{stat.stat.name}:</Text>
                    <Text style={styles.poketext}>{stat.base_stat}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
              
    
export default DetailPoke

const styles = StyleSheet.create({
  poketext1 :{
    fontSize : 15,
    fontWeight : '700',
    color : 'white',
    letterSpacing : 1.2
  },
  poketext2 :{
    fontSize : 15,
    fontWeight : '700',
    color : 'white',
  },
  poketext :{
    fontSize : 15,
    fontWeight : '500',
    color : 'white',
  }
})