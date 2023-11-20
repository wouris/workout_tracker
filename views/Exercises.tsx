import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ExerciseGroup} from '../models/ExerciseGroup';
import exercisesData from '../services/data.json';
import FastImage from 'react-native-fast-image';
import ImageURI from '../utils/ImageURI';

const PAGE_SIZE = 3; // Set an appropriate page size

const ExercisesScreen = () => {
  const [exerciseGroups, setExerciseGroups] = useState<ExerciseGroup[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const loadExerciseGroups = () => {
      const startIndex = (page - 1) * PAGE_SIZE;
      const endIndex = startIndex + PAGE_SIZE;

      const newExerciseGroups = exercisesData.slice(startIndex, endIndex);

      setExerciseGroups(prevExerciseGroups => [
        ...prevExerciseGroups,
        ...newExerciseGroups,
      ]);
    };

    loadExerciseGroups();
  }, [page]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
    },
  });

  const renderItem = ({item}: {item: ExerciseGroup}) => {
    return (
      <View>
        <Text>{item.letter}</Text>
        <FlatList
          data={item.exercises}
          keyExtractor={exercise => exercise.id}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.1}
          renderItem={({item: exercise}) => {
            return (
              <View style={styles.container}>
                <Text>{exercise.id}</Text>
                <Text>{exercise.bodyPart}</Text>
                <Text>{exercise.name}</Text>
                <FastImage
                  source={ImageURI[exercise.bodyPart][exercise.id]}
                  style={{width: 100, height: 100}}
                />
              </View>
            );
          }}
        />
      </View>
    );
  };

  const handleEndReached = () => {
    // Load more exercise groups when the user reaches the end of the list
    setPage(prevPage => prevPage + 1);
  };

  return (
    <FlatList
      data={exerciseGroups}
      keyExtractor={group => group.letter}
      renderItem={renderItem}
    />
  );
};

export default ExercisesScreen;
