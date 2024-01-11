import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useTheme} from '../../utils/ThemeContext';

const GetPost = ({post}) => {
  const {theme} = useTheme();
  const [likes, setLikes] = useState(post.likes);
  const [heartClicked, setHeartClicked] = useState(false);
  const [commentClicked, setCommentClicked] = useState(false);
  const handleHeartClick = () => {
    //implementovat na server request
    if (heartClicked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setHeartClicked(!heartClicked);
  };
  const handleCommentClick = () => {
    setCommentClicked(!commentClicked);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    card: {
      backgroundColor: theme === 'dark' ? '#2a2a2a' : '#ffffff',
      marginVertical: 15,
    },
    cardImage: {
      width: '100%',
      height: 300,
    },
    cardHeader: {
      marginTop: 10,
      padding: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      gap: 3,
    },
    cardInteraction: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      padding: 10,
      borderWidth: 0.25,
      borderColor: theme === 'dark' ? '#ffffff' : '#000000',
    },
    cardTitle: {
      color: theme === 'dark' ? '#ffffff' : '#000000',
    },
    cardAvatar: {
      marginRight: 16,
      width: 40,
      height: 40,
    },
    cardContent: {
      padding: 10,
      borderWidth: 0.25,
      borderColor: theme === 'dark' ? '#ffffff' : '#000000',
      color: theme === 'dark' ? '#ffffff' : '#000000',
    },
  });

  return (
    // <View style={styles.container}>
    //   <Text>{item.username}</Text>
    //   <Image
    //     source={{uri: `data:image/png;base64,${item.image}`}}
    //     style={styles.image}
    //   />
    //   <Text>{item.description}</Text>
    //   <View style={styles.interaction}>
    //     <Text>{item.likes}</Text>
    //     <Text>ahoj</Text>
    //   </View>
    // </View>

    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <TouchableOpacity>
          <Image
            source={require('../../assets/background/profile.png')}
            style={styles.cardAvatar}
          />
        </TouchableOpacity>
        <Text style={styles.cardTitle}>{post.username}</Text>
      </View>
      <Image
        source={{uri: `data:image/png;base64,${post.image}`}}
        style={styles.cardImage}
      />
      <View style={styles.cardInteraction}>
        <View style={{flexDirection: 'row', gap: 12, alignItems: 'center'}}>
          <Text
            style={{
              color: theme === 'dark' ? '#ffffff' : '#000000',
              fontFamily: 'bold',
              fontSize: 15,
            }}>
            {likes}
          </Text>
          <TouchableOpacity onPress={handleHeartClick}>
            <FontAwesomeIcon
              icon={'heart'}
              color={
                heartClicked
                  ? '#EB4040'
                  : theme === 'dark'
                  ? '#ffffff'
                  : '#2a2a2a'
              }
              size={30}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleCommentClick}>
          <FontAwesomeIcon
            icon={'comment'}
            color={theme === 'dark' ? '#ffffff' : '#2a2a2a'}
            size={30}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.cardContent}>
        <Text style={{color: theme === 'dark' ? '#ffffff' : '#000000'}}>
          {post.description}
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam,
          aliquid animi commodi earum eligendi fuga fugit minus molestiae
          necessitatibus quam qui quibusdam quidem quis saepe unde!
          Exercitationem nam sint temporibus.
        </Text>
      </View>
    </View>
  );
};
export default GetPost;
