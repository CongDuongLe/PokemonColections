import { View, Text, FlatList,Image, TouchableOpacity } from 'react-native'
import React,{useState, useEffect} from 'react'
import {SafeAreaView} from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
//lai di
const LikedPokemon = () => {
  const navigation = useNavigation();
  // console.log('xxx', navigation)
  // navigation={navigation} 
  //em đang gán giá trị cho 1 hằng số nên nó báo sai
  // const không thể thay đổi giá trị còn let var thì có thể thay đổi  
  const route = useRoute();
  // route params from local storage
  const { id, name, image, type, height, weight,abilities, stats} = route.params || {};
  const [lstPokemon, setLstPokemon] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  // async storage favorite pokemons
  const getFavoritePoke = async () => {
    try {
      const value = await AsyncStorage.getItem('favoritePokemons');
      console.log(value);
      if (value) {
        const favoritePokemons = JSON.parse(value);
        setLstPokemon(favoritePokemons)
      console.log('favoritePokemons',favoritePokemons);
        const isFavorite = favoritePokemons.find(pokemon => pokemon.id === id);
        setIsFavorite(!!isFavorite);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getFavoritePoke();
  }, []);

  const addFavoritePoke = async () => {
    try {
      const value = await AsyncStorage.getItem('favoritePokemons');
      if (value) {
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
  

  // delete favorite pokemon
  const deleteFavoritePoke = async (id) => {
    try {
      const value = await AsyncStorage.getItem('favoritePokemons');
      if (value) {
        const favoritePokemons = JSON.parse(value);
        setLstPokemon(favoritePokemons)
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
    deleteFavoritePoke();
  }, []);
  
  // navigate to detail pokemon
  const navigateToDetail = (id, name, image, type, height, weight,abilities, stats) => {
    navigation.navigate('DetailPoke', {
      id : id,
      name : name,
      image : image,
      type : type,
      height: height,
      weight: weight,
      abilities: abilities,
      stats : [...stats]
    });
  };
  // Main Here
  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: '#FDEFF4',
      paddingHorizontal: 10,
    }}>
      <TouchableOpacity onPress={
        () => navigation.goBack()
      }
        style={{
          paddingHorizontal: 10,
          paddingBottom: 10,
          marginTop:10, 
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Ionicons name="ios-arrow-back" size={30} color="#000" />
        <Text style={{ 
          fontSize: 20,
          fontWeight: 'bold',
          marginLeft: '22%',
          color: '#000',
          letterSpacing: 2,
        }}>Liked Pokemon </Text>
      </TouchableOpacity>
      {/* check if have pokemon like then show flatlist or show empty  */}
      {lstPokemon.length > 0 ? (
        <FlatList
          //còn đoạn này e lấy trong storage ra mà không setState đẩy vào list nên nó không hiện list ra thôi
          data={lstPokemon}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              // Navigator.navigate(routeName, params)
              onPress={() => navigateToDetail(item.id, item.name, item.image, item.type, item.height, item.weight, item.abilities, item.stats)
              }
              
              style={{
                flex: 1,
                flexDirection: 'row',
                margin: 10,
                borderRadius: 10,
                backgroundColor: '#fff',
                elevation: 5,
                justifyContent: 'space-around',
              }}>
              <View style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical :8,

              }}>
                <Image
                  style={{
                    flex: 2 / 7,
                    width: 90,
                    height: 90,
                  }}
                  source={{ uri: item.image }}
                />
                <View style={{
                  flex: 4 / 7,
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: '#000',
                    letterSpacing: 1.5
                  }}>{item.name}</Text>
                  <Text style={{
                    fontSize: 15,
                    color: '#000',
                  }}>{item.type}</Text>
                </View>
              </View>
              <View style={{
                flex: 1 / 7,
                justifyContent: 'center',
                alignItems: 'center',
                paddingRight: 20
              }}>
                <TouchableOpacity
                  onPress={deleteFavoritePoke.bind(this, item.id)}
                  style={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Ionicons
                    name='heart-dislike-outline'
                    size={26}
                    color='red'
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Ionicons name="heart-dislike" size={150} color="#d1d1d1" />
          <Text style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: '#D1D1D1',
            marginTop: 20,
          }}>
            You have no favorite pokemon yet
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};


export default LikedPokemon