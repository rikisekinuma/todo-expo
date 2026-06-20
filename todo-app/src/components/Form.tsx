import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, GestureResponderEvent} from 'react-native';

type Props = {
  placeholder?: string;
  onSubmit: (text: string) => void;
};

const Form: React.FC<Props> = ({placeholder = 'Add item...', onSubmit}) => {
  const [text, setText] = useState('');

  const handlePress = (e: GestureResponderEvent) => {
    if (!text.trim()) return;
    onSubmit(text.trim());
    setText('');
  };

  return (
    <View>
        <Text></Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  input: {
    flex: 1,
    marginRight: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
});

export default Form;
