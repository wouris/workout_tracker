import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ExerciseGroup} from '../models/ExerciseGroup';
import exercisesData from '../services/data.json';
import FastImage from 'react-native-fast-image';
import ImageURI from '../utils/ImageURI';
import {useTheme} from '../utils/ThemeContext';

const PAGE_SIZE = 3; // Set an appropriate page size

const ExercisesScreen = () => {
  const {theme, toggleTheme} = useTheme();
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
      marginTop: 1,
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      font: {
        fontSize: 16,
        fontWeight: 'monospace',
      },
    },
  });

  const renderItem = ({item}: {item: ExerciseGroup}) => {
    return (
      <View>
        <Text
          style={{
            color: theme === 'dark' ? '#ffffff' : '#000000',
            textAlign: 'center',
            fontSize: 16,
            fontWeight: 'mono',
          }}>
          {item.letter}
        </Text>
        <FlatList
          data={item.exercises}
          keyExtractor={exercise => exercise.id}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.1}
          renderItem={({item: exercise}) => {
            return (
              <View style={styles.container}>
                <Text style={styles.container.font}>{exercise.bodyPart}</Text>
                <Text style={styles.container.font}>{exercise.name}</Text>
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
