
import { StyleSheet, Text, View,} from 'react-native';
import Home from './src/screens/Home';
import DetailPoke from './src/screens/DetailPoke';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
   <NavigationContainer>
       <Stack.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
         
          })}
          // 
          
       >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="DetailPoke" component={DetailPoke} />
      </Stack.Navigator>
   </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDEFF4',
  
  },
});
