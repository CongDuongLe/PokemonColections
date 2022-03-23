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
                        stats : stats.map(stat => ({
                            name: stat.stat.name,
                            base_stat: stat.base_stat
                        }))
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
                    stats : stats.map(stat => ({
                      name: stat.stat.name,
                      base_stat: stat.base_stat
                  }))
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
    
    //function get pokemon stats from api
    const getPokemonStats = async () => {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
            const responseJson = await response.json();
            const pokemonStats = responseJson.flavor_text_entries.find(flavor => flavor.language.name === 'en');
            return pokemonStats.flavor_text;
        } catch (error) {
            console.log(error);
        }
    }

   

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: '#FDEFF4',

    }}>
      <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="dark-content" />
      <View
        style={{
          height: '5%',
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          marginTop: 5
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="ios-chevron-back" size={24} color="black" />
        </TouchableOpacity>
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
            <Text style={styles.poketext}>Type: {type} |</Text>
            <Text style={styles.poketext}>Height: {height} cm |</Text>
            <Text style={styles.poketext}>Weight: {weight} kg </Text>
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
                marginTop: 20,
                textAlign: 'center',
                color: 'white',
                letterSpacing: 2
              }}>Pokemon Stats</Text>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                marginTop: 10,
               flex :1
              }}> 
                {stats.map(stat => (
                  <View key={stat.stat.name} style={{
                    overflow: 'hidden',
                    backgroundColor: '#474F85',
                    alignItems: 'center',
                  }}>
               
                    <Text style={styles.poketext}>{stat.stat.name}</Text>
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
    fontWeight : '600',
    color : 'white',
    letterSpacing : 1.2
  },
  poketext2 :{
    fontSize : 20,
    fontWeight : '600',
    color : 'white',
  },
  poketext :{
    fontSize : 14,
    fontWeight : '600',
    color : 'white',
    marginHorizontal :2
  }
})