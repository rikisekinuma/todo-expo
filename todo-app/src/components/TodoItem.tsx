import * as Device from 'expo-device';
import { useState } from 'react';
import { Platform, StyleSheet, View, Text, TextInput, Pressable, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Todo } from '@/types/Todo';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import DateTimePicker from '@react-native-community/datetimepicker';
import Checkbox from 'expo-checkbox';

type Props = {
    todo: Todo;
    checkTodo: (id: number, checked: boolean) => void;
    deleteTodo:  (id: number) => void;
    update: (id: number, text: string, dueDate: Date) => void;
    formatDate: (date: Date) => string;
}

export default function ({
    todo,
    checkTodo,
    deleteTodo,
    update,
    formatDate
}:Props){
    const [editingText, setEditingText] = useState(todo.text);
    const [editingDueDate, setEditingDueDate] = useState(todo.dueDate);
    const [showDatePicker, setShowDatePicker] = useState(false);

    return(
        <>
            <View>
                <Checkbox
                    value={todo.completed}
                    onValueChange={(checked) => checkTodo(todo.id, checked)}
                ></Checkbox>
            </View>
            <TextInput 
                value={editingText}
                onChangeText={(text) => setEditingText(text)}
                onBlur={() => update(todo.id, editingText, editingDueDate)}
            ></TextInput>
            <Pressable 
                style={styles.dateInput}
                onPress={() => setShowDatePicker(true)}
            >
                <Text>期日: {formatDate(editingDueDate)}</Text>
            </Pressable>
            {showDatePicker && (
                <DateTimePicker
                    value={editingDueDate}
                    onChange={(_, selectedDate) => {
                        if (!selectedDate) {
                            return;
                        }
                        setEditingDueDate(selectedDate);
                        // この時点ではeditingDueDateはまだ更新されていないため、
                        // selectedDateを直接使用してupdate関数を呼び出す
                        update(todo.id, editingText, selectedDate);
                    }}
                    mode="date"
                />
            )}
            <Button
                title="削除"
                onPress={() => deleteTodo(todo.id)}
            ></Button>
        </>
    )
}

const styles = StyleSheet.create({
  dateInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
});