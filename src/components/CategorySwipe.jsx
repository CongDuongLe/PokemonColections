import { View, Text, FlatList,TouchableOpacity, Image } from 'react-native'
import React,{useState} from 'react'
import {Data} from "./Dummy"; // cái này ở chỗ nào thế sai ở thằng này d
//refresh app giup minh
import { AntDesign } from '@expo/vector-icons';

export default function CategorySwipe(){
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(false);

    //filter flatlist with search
    const filterData = (text) => {
        const newData = Data.filter(item => {
            const itemData = `${item.name.toUpperCase()}`;
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        return newData;
    }

   const handleOpen = () => {
      setOpen(!open);
   }
   const handleSelected = () => {
        setSelected(!selected);
   }

   // show selected item with another backgorund color
   
    const renderItems = ({ item, id, selected, active }) => {
        return (

            <TouchableOpacity onPress={handleSelected} style={{ 
                backgroundColor: selected ? '#e4e6eb' : '#fff',
                alignItems: 'center', justifyContent: 'center' ,
                marginLeft : id=== selected ? 20: 10,  
                marginRight : id=== selected ? 10: 20,
                borderRadius : 25,
                elevation : 5,
                marginVertical : 10,
                height: 100, width:70, borderRadius: 20,
            }}>
            
                    <Image source={item.image} style={{ width: 30, height: 30, 
                        paddingVertical : 20,  
                        paddingHorizontal : 20 ,
                    
                    }} />
                    <View style={{ marginTop: 5 }}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{item.name}</Text>
                    </View>
            </TouchableOpacity>
        )
    }
    return(
        <View>
            <View style={{
               flexDirection: 'row', alignItems : 'center', 
               marginHorizontal : 18,
               marginVertical : 20
            
            }}>
                <AntDesign name="filter" size={20} color="black" />
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft:5 }}>Category</Text>
                <TouchableOpacity onPress={handleOpen} style={{ 
                 marginLeft: 10, 
                }}>
                    <AntDesign name="down" size={18} color="black" />
                </TouchableOpacity>
            </View>
            {open ?
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={Data}
                    renderItem={renderItems}
                    keyExtractor={item => item.id.toString()}
                    extraData={selected}

                />
                : null}
        </View>
    )
}

 