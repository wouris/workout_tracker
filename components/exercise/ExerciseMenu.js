import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {StackActions} from '@react-navigation/native';

export const ExerciseMenu = ({navigation}) => {
  const styles = StyleSheet.create({
    box: {
      height: 100,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      flex: 1,
      borderRadius: 10,
      margin: 5,
    },
    font: {
      fontSize: 20,
      fontWeight: 'bold',
    },
  });

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '100%',
        paddingLeft: 15,
        paddingRight: 15,
      }}>
      <TouchableOpacity
        style={styles.box}
        onPress={() =>
          navigation.dispatch(StackActions.push('ExerciseScreen'))
        }>
        <Text style={styles.font}>Exercises</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.box}
        onPress={() => navigation.dispatch(StackActions.push('RoutineScreen'))}>
        <Text style={styles.font}>Routines</Text>
      </TouchableOpacity>
    </View>
  );
};