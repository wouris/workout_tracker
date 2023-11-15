import {View, Text, StyleSheet} from 'react-native';
import {useTheme} from '../../utils/ThemeContext';
export const Routines = ({navigation}) => {
  const {theme, toggleTheme} = useTheme();

  const styles = StyleSheet.create({
    container: {
      margin: 10,
      padding: 12,
      backgroundColor: theme === 'dark' ? '#2a2a2a' : '#ffffff',
      color: theme === 'dark' ? '#ffffff' : '#000000',
      borderRadius: 10,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      text: {
        fontSize: 20,
        fontFamily: 'Roboto-Medium',
        color: theme === 'dark' ? '#c5c5c5' : '#696969',
      },
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.container.text}>Routines</Text>
    </View>
  );
};

export default Routines;
