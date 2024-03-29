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
  Animated,
} from 'react-native';
import axios, {options} from 'axios';
import {BASE_URL} from '../../utils/Constants';
import {err} from 'react-native-svg/lib/typescript/xml';
import {getItem} from '../../utils/Storage';
import {useTheme} from '../../utils/ThemeContext';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faComment, faHeart} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import GetPost from '../posts/GetPost';

library.add(faHeart, faComment);

const PAGE_SIZE = 5;
const HomePage = ({navigation}) => {
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

  const renderItem = ({item}) => {
    return <GetPost post={item} />;
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
