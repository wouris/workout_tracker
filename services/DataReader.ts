import * as data from './data.json';
import {useInfiniteQuery} from "@tanstack/react-query";
import {ExerciseGroup} from "../models/ExerciseGroup";

interface Exercise {
    bodyPart: string,
    equipment: string,
    gifUrl: string,
    id: string,
    name: string,
    target: string,
    secondaryMuscles: string[],
    instructions: string[]
}

const getAllExercises = () => {
    const readData = async ({pageParam = 0}) => {
        const exercises: ExerciseGroup[] = [];

        Object.values(data).forEach((exercise: Exercise) => {
            if (exercise.name) {
                const firstLetter = exercise.name.charAt(0).toLowerCase();
                const groupIndex = exercises.findIndex(group => group.letter === firstLetter);

                if (groupIndex === -1) {
                    exercises.push({letter: firstLetter, exercises: [exercise]});
                } else {
                    exercises[groupIndex].exercises.push(exercise);
                }
            }
        });

        return {
            data: exercises,
            nextPage: pageParam + 1,
        };
    }

    return useInfiniteQuery({
        queryKey: ['exercises'],
        queryFn: readData,
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            if (lastPage.data.length < 10) return undefined;
            return lastPage.nextPage;
        }
    });
}

const getExerciseById = async (id) => {
    return data.find((exercise) => exercise.id === id);
}

export {getAllExercises, getExerciseById};