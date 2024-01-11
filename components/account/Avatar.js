import {Image, StyleSheet, View} from 'react-native';
const Avatar = ({avatar}) => {
  const image = 'data:image/png;base64,' + avatar;

  const styles = StyleSheet.create({
    avatarContainer: {
      width: 75,
      height: 75,
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return (
    <View style={styles.avatarContainer}>
      <Image
        style={{width: 70, height: 70, borderRadius: 50}}
        source={{uri: image}}
      />
    </View>
  );
};

export default Avatar;
