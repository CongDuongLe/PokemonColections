import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,} from 'react-native';
import Home from './src/screens/Home';
import {SafeAreaView} from 'react-native-safe-area-context';



export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="dark-content" />
     <Home/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDEFF4',
  
  },
});
