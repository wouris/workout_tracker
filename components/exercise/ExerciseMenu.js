import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import {StackActions} from '@react-navigation/native';

export const ExerciseMenu = ({navigation}) => {
  const styles = StyleSheet.create({
    box: {
      height: 100,
      backgroundColor: 'transparent',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      margin: 5,
      borderWidth: 2,
      borderColor: 'white',
      borderRadius: 10,
    },
    font: {
      fontSize: 25,
      fontWeight: 'bold',
      color: 'white',
    },
  });

  return (
    <ImageBackground
      source={require('../../assets/background/curl.png')}
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15,
      }}>
      <View
        style={{
          position: 'absolute',
          top: 80,
          width: '100%',
          alignItems: 'center',
          margin: 20,
        }}>
        <Image
          source={require('../../assets/background/fitfusionW.png')}
          style={{width: 400, height: 200}}
        />
      </View>

      <TouchableOpacity
        style={styles.box}
        onPress={() =>
          navigation.dispatch(StackActions.push('ExerciseScreen'))
        }>
        <Text style={styles.font}>EXERCISES</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.box}
        onPress={() => navigation.dispatch(StackActions.push('RoutineScreen'))}>
        <Text style={styles.font}>ROUTINES</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};
