import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, GestureResponderEvent, Pressable} from 'react-native';
import type { Todo } from '@/types/Todo';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import DateTimePicker from '@react-native-community/datetimepicker';

type Props = {
  placeholder?: string;
  onSubmit: (text: string) => void;
};

export default function Form({
    inputTodo,
    setInputTodo,
    addTodo,
    deleteTodos,
    changeCheckedAll,
    isCheckedAll,
    sortByCreated,
    sortByDueDate,
    formatDate
}:{
    inputTodo: Todo; 
    setInputTodo: React.Dispatch<React.SetStateAction<Todo>>; 
    addTodo: () => void;
    deleteTodos: () => void;
    changeCheckedAll: (checked: boolean) => void;
    isCheckedAll: boolean;
    sortByCreated: () => void;
    sortByDueDate: () => void;
    formatDate: (date: Date) => string;
}) {
    const [showDatePicker, setShowDatePicker] = useState(false);

    return (
        <View>
            <TextInput
                value={inputTodo.text}
                onChangeText={(text) =>
                    setInputTodo({
                        ...inputTodo,
                        text,
                    })
                }
            ></TextInput>
            <Pressable 
                style={styles.dateInput}
                onPress={() => setShowDatePicker(true)}>
                <Text>期日: {formatDate(inputTodo.dueDate)}</Text>
            </Pressable>
            {showDatePicker && (
                <DateTimePicker
                    value={inputTodo.dueDate}
                    mode="date"
                    onChange={(_, selectedDate) => {
                    setShowDatePicker(false);

                    if (!selectedDate) return;

                    setInputTodo({
                        ...inputTodo,
                        dueDate: selectedDate,
                    });
                    }}
                />
            )}
            <Button
                title="追加"
                onPress={addTodo}
            ></Button>
            <Button
                title="選択行削除"
                onPress={deleteTodos}
            ></Button>
            {isCheckedAll ? (
                <Button 
                    title="選択解除"
                    onPress={() => changeCheckedAll(false)}
                ></Button>
            ) : (
                <Button 
                    title="全選択"
                    onPress={() => changeCheckedAll(true)}
                ></Button>
            )}
            <View>
                <Button 
                    title="作成日順"
                    onPress={sortByCreated}
                ></Button>
                <Button 
                    title="期日順"
                    onPress={sortByDueDate}
                ></Button>
            </View>

        </View>
    );
    
};

const styles = StyleSheet.create({
  dateInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
});


