import { View, Text, FlatList, TouchableOpacity, Image, TextInput } from 'react-native'
import React,{useState, useEffect, useCallback} from 'react'
import axios from 'axios';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
//import navigation



const Pokemon = ({navigation}) => {
    // console.log(props.navigate)
    //navigation
    // const navigation = useNavigation();
    // generate search filter
    const [search, setSearch] = useState('');
    // flatlist filter
    const [filteredPokemon, setFilteredPokemon] = useState([])
    // initial Pokemon state is an array 
    const [pokemons, setPokemons] = useState([]);
    // state loading pokemon
    const [loading, setLoading] = useState(true);
    // state Touching pokemon
    const [touching, setTouching] = useState(
        {
            id: null,
            name: null,
            image: null,
            type: null,
            height: null,
            weight: null,
            isTouching: false
        }
    );
    // fetch data from API
    const getPokemon = async () => {
        const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=10&offset=10');  
    // loop to get result from API using foreach     
        res.data.results.forEach( async (poke) => {
            const pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${poke.name}`);
            // set state for each pokemon
            setPokemons(pokemons => [...pokemons, pokemon.data]);
            setLoading(false);
            });   
    }
    // call getPokemon function
    useEffect(() => {
        getPokemon();
    }, []);
    // useCallback onFilterPokemon
    const onFilterPokemon = useCallback(search => {
        const filteredPokemon = pokemons.filter(pokemon => {
            return pokemon.name.toLowerCase().includes(search.toLowerCase());
        });
        setFilteredPokemon(filteredPokemon);
    }, [pokemons]);
    // useEffect onFilterPokemon
    useEffect(() => {
        onFilterPokemon(search);
    }, [search, onFilterPokemon]);
    // onchange search
    const onChangeSearch = (search) => {
        setSearch(search);
    }
    // load more pokemon function
    const loadMorePokemon = async () => {
        setLoading(true);
        const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=10&offset=10');
        res.data.results.forEach( async (poke) => {
            const pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${poke.name}`);
            setPokemons(pokemons => [...pokemons, pokemon.data]);
            setLoading(false);
        });
    }
    // navigation to details pokemon screens
     const navigateToDetail = (id, name, image, type, height, weight,abilities, stats, description) => { navigation.navigate('DetailPoke', {
            id: id,
            name: name,
            type: type,
            height: height,
            weight: weight,
            image: image,
            abilities :abilities,
            stats :stats,
            // description :description,

        })
    }
      // render each pokemon use flatlist
      const renderItem = ({ item,index }) => {    
        return (
            <TouchableOpacity 
            onPress={() => {
                navigateToDetail(item.id, item.name, item.sprites.front_default, item.types.map(type => type.type.name), item.height, item.weight, item.abilities.map(ability => ability.ability.name), item.stats.map(stat => stat.base_stat), )
            }}
            style={{
                backgroundColor: '#FBF8F1',
                paddingHorizontal: 10,
                paddingVertical: 10,
                margin: 20,
                borderRadius : 25,
                alignItems : 'center', 
                elevation : 5,
                height : 160,
                width : 120,
                justifyContent : 'center',
            }}>
               <Image source={{
                    uri: item.sprites.front_default
               }} style={{ width: 110, height: 110,  }} />
                <Text style={{
                    fontSize: 18,
                    color: '#1a1b17',
                    fontWeight: 'bold',
                }}>{item.name}</Text>
            </TouchableOpacity>
        )
    }
// Main Here
    return (
        <View style={{
            marginTop: 20,
            // marginLeft : 18,  
        }}>
            {/* Search pokemon */}
            <View 
            style={{
                backgroundColor: '#fff',
                paddingHorizontal: 16,
                paddingVertical: 10,
                marginVertical: 10,
                borderRadius: 20,
                marginHorizontal: 35,
                flexDirection: 'row',
                alignItems: 'center',
                elevation: 5
            }}>
                <FontAwesome name="search" size={22} color="#1a1b17" style={{
                    marginRight: 10,
                }} />
                <TextInput placeholder="Search Pokemon ..."
                    style={{
                        fontSize: 16,
                        color: '#1a1b17',
                    }}
                    onChangeText={onChangeSearch}
                    value={search}
                />
            </View>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
                marginLeft: 18,
            }}>
                <MaterialCommunityIcons name="pokemon-go" size={22} color="#1a1b17" style={{
                }} />
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 5 }}>Pokémon Collection</Text>
            </View>
            {/* Flatlist */}
            {/* render pokemon by using flatlist */}
            <View style={{
                alignItems: 'center',
                marginLeft: 6,
                height: '75%',
                width: '100%',
            }}>
                <FlatList
                    data={filteredPokemon}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={2}
                    horizontal={false}
                    showsVerticalScrollIndicator={false}
                    // onEndReached={onEndReached}
                />
            </View>
            {/* Load more pokemon */}
            <View style={{
                marginTop: 20,
                marginLeft: 18,
                alignItems: 'center',
            }}>
                <TouchableOpacity
                    onPress={loadMorePokemon}
                    style={{
                        backgroundColor: loading ? '#F4BBBB' : '#4D77FF',
                        paddingHorizontal: 10,
                        paddingVertical: 10,
                        marginVertical: 15,
                        marginHorizontal : 15,
                        borderRadius: 25,
                        alignItems: 'center',
                        elevation: 2,
                        height: 50,
                        width: 160,
                        justifyContent: 'center',
                        position: 'absolute',
                        bottom: -15,
                        right: 0,
                    }}>
                    <Text style={{
                        fontSize: 16,
                        color: '#FDEFF4',
                        fontWeight: '700',
                    }}>{
                        loading ? 'Loading...' : 'More Pokémon'
                    }</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Pokemon