// import {Image, StyleSheet, Text, View} from 'react-native';
// import {useEffect, useState} from 'react';
// import {getItem} from '../../utils/Storage';
// import {BASE_URL} from '../../utils/Constants';
// import axios from 'axios';

// export const HomePage = ({navigation}) => {
//   const [posts, setPosts] = useState(null);
//   useEffect(() => {
//     const FetchPost = async () => {
//       const options = {
//         method: 'POST',
//         url: BASE_URL + 'api/social/post/get',
//         headers: {
//           Authorization: await getItem('Authorization'),
//           USER_ID: await getItem('USER_ID'),
//           'Content-Type': 'application/json',
//           Accept: 'application/json',
//         },
//         data: {pageSize: 0, pageOffset: 0},
//       };
//
//       try {
//         const {data} = await axios.request(options);
//         console.log(data);
//         setPosts(data);
//         console.log('ahojda' + posts);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     FetchPost();
//   }, []);
//
//   const styles = StyleSheet.create({
//     picContainer: {
//       height: 300, // Set a fixed height or adjust as needed
//       margin: 10,
//       borderWidth: 1,
//       borderColor: '#e0e0e0',
//       borderRadius: 10,
//       overflow: 'hidden',
//     },
//     imagePlaceholder: {
//       width: '100%',
//       height: '100%',
//       resizeMode: 'cover',
//       backgroundColor: '#f0f0f0', // Placeholder background color
//     },
//     font: {
//       fontSize: 25,
//       fontFamily: 'monospace',
//       fontWeight: 'bold',
//       color: 'white',
//     },
//   });
//
//
//
//   return (
//     <View style={styles.picContainer}>
//       posts && posts.map(data =>
//       <RenderPost post={data} key={data.id} />)
//     </View>
//   );
// };
//
// const RenderPost = post => {
//   const image = 'data:image/jpg;base64,' + post.image;
//   return (
//     <View style={styles.picContainer}>
//       <Image source={{uri: image}} style={{width: '100%', height: '100%'}} />
//     </View>
//   );
// };

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import axios, {options} from 'axios';
import {BASE_URL} from '../../utils/Constants';
import {err} from 'react-native-svg/lib/typescript/xml';
import {getItem} from '../../utils/Storage';
import {useTheme} from '../../utils/ThemeContext';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faComment, faHeart} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

library.add(faHeart, faComment);

const PAGE_SIZE = 3;
const HomePage = ({navigation}) => {
  const {theme, toggleTheme} = useTheme();
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const response = await axios.post(
          BASE_URL + '/api/social/post/get',
          {
            pageOffset: page,
            pageSize: PAGE_SIZE,
          },
          {
            headers: {
              Authorization: await getItem('Authorization'),
              USER_ID: await getItem('USER_ID'),
              // Add other headers if needed
            },
          },
        );

        console.log(response.data);

        setPosts(prevPosts => [...prevPosts, ...response.data]);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    loadPosts();
  }, [page]);

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

  const renderItem = ({item}) => {
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
          <Text style={styles.cardTitle}>{item.username}</Text>
        </View>
        <Image
          source={{uri: `data:image/png;base64,${item.image}`}}
          style={styles.cardImage}
        />
        <View style={styles.cardInteraction}>
          <FontAwesomeIcon
            icon={'heart'}
            color={theme === 'dark' ? '#ffffff' : '#2a2a2a'}
            size={30}
          />
          <FontAwesomeIcon
            icon={'comment'}
            color={theme === 'dark' ? '#ffffff' : '#2a2a2a'}
            size={30}
          />
        </View>
        <View style={styles.cardContent}>
          <Text style={{color: theme === 'dark' ? '#ffffff' : '#000000'}}>
            {item.description}
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam,
            aliquid animi commodi earum eligendi fuga fugit minus molestiae
            necessitatibus quam qui quibusdam quidem quis saepe unde!
            Exercitationem nam sint temporibus.
          </Text>
        </View>
      </View>
    );
  };

  const handleEndReached = () => {
    // Load more posts when the user reaches the end of the list
    // setPage(prevPage => prevPage + 1);
  };

  return (
    <FlatList
      data={posts}
      keyExtractor={post => post.id.toString()}
      renderItem={renderItem}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.1}
    />
  );
};

export default HomePage;
