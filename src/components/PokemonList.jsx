import { View, Text, FlatList, TouchableOpacity, Image,TextInput} from 'react-native'
import React,{useState, useEffect,useCallback} from 'react'
import axios from 'axios'
import { SafeAreaView} from 'react-native-safe-area-context'
//navigation
import { useRoute, useNavigation } from '@react-navigation/native';


const PokemonList = () => {
    const navigation = useNavigation();
    const route = useRoute();
    

    // state loading pokemon
    const [loading, setLoading] = useState(true);
    // state pokemon
    const [pokemons, setPokemons] = useState([]);
    // state search
    const [search, setSearch] = useState('');
    // state filtered pokemon
    const [filteredPokemon, setFilteredPokemon] = useState([]);
    //  get Pokemon List from API
    const getPokemonList = useCallback(async () => {
        try {   
            const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
            setPokemons(response.data.results);
            setFilteredPokemon(response.data.results);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }, []);
    //
    useEffect(() => {
        getPokemonList();
    }, [getPokemonList]);
    //
    const handleSearch = (text) => {
        setSearch(text);
        const newPokemon = pokemons.filter(pokemon => {
            return pokemon.name.toLowerCase().includes(text.toLowerCase());
        });
        setFilteredPokemon(newPokemon);
    };
    //
    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('DetailPoke', {
                        name: item.name,
                        url: item.url,
                    });
                }}
            >
                <View style={{ flexDirection: 'row', margin: 10 }}>
                    <Image

                        style={{ width: 50, height: 50, borderRadius: 25 }} 
                        source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.url.split('/')[6]}.png` }}
                    />
                    <Text style={{ marginLeft: 10, fontSize: 20 }}>{item.name}</Text>
                </View>
            </TouchableOpacity>
        );
    };
    //
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', margin: 10 }}>
                <TextInput
                    placeholder="Search"
                    onChangeText={handleSearch}
                    value={search}
                    style={{ width: '80%', borderColor: '#000', borderWidth: 1, padding: 10, borderRadius: 25, alignItems: 'center', alignSelf: 'center' }}
                />
            </View>
            {loading ? (
                <Text>Loading...</Text>
            ) : (
                    <FlatList
                        data={filteredPokemon}
                        renderItem={renderItem}
                        keyExtractor={item => item.name}
                        showsVerticalScrollIndicator={false}
                    />
                )}
        </SafeAreaView>
    );
};




export default PokemonList