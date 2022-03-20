import { View, Text, FlatList,Image } from 'react-native'
import React,{useState, useEffect} from 'react'
import {SafeAreaView} from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LikedPokemon = () => {
  const navigation = useNavigation();
  navigation={navigation}   
  const route = useRoute();
  // route params from local storage
  const { id, name, image, type,} = route.params;
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

  return (
    <SafeAreaView>
       <FlatList
        data={[
          {
            id: id,
            name: name,
            image: image,
            type: type,
          },
        ]}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{
            flex: 1,
            flexDirection: 'row',
            margin: 10,
            borderRadius: 10,
            backgroundColor: '#fff',
            elevation: 5,
          }}>
            <View style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              margin: 10,
            }}>
              <Image
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 10,
                  margin: 10,
                }}
                source={{ uri: item.image }}
              />
              <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 10,
              }}>
                <Text style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: '#000',
                }}>{item.name}</Text>
                <Text style={{
                  fontSize: 15,
                  color: '#000',
                }}>{item.type}</Text>
              </View>
            </View>
            <View style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              margin: 10,
            }}>
              <View style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 10,
              }}>
                <Ionicons
                  name={isFavorite ? 'ios-heart' : 'ios-heart-empty'}
                  size={30}
                  color={isFavorite ? 'red' : '#000'}
                  onPress={() => {
                    isFavorite ? removeFavoritePoke() : addFavoritePoke();
                  }}
                />
                <FontAwesome

                  name={isFavorite ? 'trash' : 'plus'}  
                  size={30}
                  color={isFavorite ? 'red' : '#000'}
                  onPress={() => {
                    navigation.navigate('Home');
                  }}
                />
              </View>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}


export default LikedPokemon