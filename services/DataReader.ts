import * as data from './data.json';
import {useInfiniteQuery} from '@tanstack/react-query';
import {ExerciseGroup} from '../models/ExerciseGroup';
import * as fs from 'fs';

interface Exercise {
  bodyPart: string;
  equipment: string;
  gifUrl: string;
  id: string;
  name: string;
  target: string;
  secondaryMuscles: string[];
  instructions: string[];
}

const getAllExercises = () => {
  const readData = async ({pageParam = 0}) => {
    const exercises: ExerciseGroup[] = [];

    // map exercises from file to ExerciseGroup
    data.forEach((exercise: ExerciseGroup) => {
      exercises.push(exercise);
    });

    return {
      data: exercises,
      nextPage: pageParam + 1,
    };
  };

  return useInfiniteQuery({
    queryKey: ['exercises'],
    queryFn: readData,
    initialPageParam: 0,
    getNextPageParam: lastPage => {
      if (lastPage.data.length < 10) return undefined;
      return lastPage.nextPage;
    },
  });
};

// const getExerciseById = async (id: string) => {
//   return data.find(exercise => exercise.id === id);
// };

export {getAllExercises};