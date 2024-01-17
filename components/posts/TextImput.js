import React from 'react';
import {View, TextInput} from 'react-native';
import { useTheme } from "../../utils/ThemeContext";

const MultilineTextInputExample = ({onTextChange, value}) => {
  const {theme, toggleTheme} = useTheme();

  const handleTextChange = (text) => {
    onTextChange(text);
  };

  return (
    <View
      style={{
        borderRadius: 10,
        width: '90%',
        margin: 10,
        backgroundColor: theme === 'dark' ? '#2a2a2a' : '#ffffff',
        borderColor:theme === 'dark' ? '#424242' : '#050505',
        borderWidth: 1,
        textAlignVertical: 'top', // Align text to the top
        height: 150, // Adjust the height as needed
      }}>
      <TextInput
        editable
        multiline
        numberOfLines={3}
        maxLength={40}
        onChangeText={handleTextChange}
        style={{paddingLeft: 10}}
        value={value}
      />
    </View>
  );
};

export default MultilineTextInputExample;
