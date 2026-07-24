import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Pressable} from 'react-native';
import { Todo } from '@/types/Todo';
import DateTimePicker from '@react-native-community/datetimepicker';
import Checkbox from 'expo-checkbox';

type Props = {
    todo: Todo;
    checkTodo: (id: number, checked: boolean) => void;
    deleteTodo:  (id: number) => void;
    update: (id: number, text: string, dueDate: Date) => void;
}

export default function ({
    todo,
    checkTodo,
    deleteTodo,
    update,
}:Props){
    const [editingText, setEditingText] = useState(todo.text);
    const [editingDueDate, setEditingDueDate] = useState(todo.dueDate);

    return(
        <>
            <View
                style={styles.row}
            >
                <Checkbox
                    value={todo.completed}
                    onValueChange={(checked) => checkTodo(todo.id, checked)}
                ></Checkbox>
                <TextInput 
                    value={editingText}
                    onChangeText={(text) => setEditingText(text)}
                    onBlur={() => update(todo.id, editingText, editingDueDate)}
                    style={styles.input}
                ></TextInput>
            </View>
            <View
                style={styles.deleteButtonContainer}
            >

                <View
                    style={styles.dateRow}
                >
                    <Text
                        style={{color : "#FFFFFF"}}
                    >期日：</Text>
                    <DateTimePicker
                        value={editingDueDate}
                        mode="date"
                        is24Hour={true}
                        locale="ja-JP"
                        onValueChange={(_, selectedDate) => {

                            if (!selectedDate) return;
                            setEditingDueDate(selectedDate);
                            update(todo.id, editingText, selectedDate);
                        }}
                    />
                </View>
                <Pressable
                    style={styles.deleteButton}
                    onPress={() => deleteTodo(todo.id)}
                >
                    <Text
                        style={styles.primaryButtonText}
                    >削除</Text>
                </Pressable>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
  // 画面全体
    container: {
    
    },

    // ヘッダー/フォーム部分
    header: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    },

    // 入力欄
    input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1D1D6",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    width: 200,
    },

    // 日付入力っぽいPressable
    dateInput: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1D1D6",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    width: 100,
    },

    // TodoItem
    todoItem: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    },

    // Todo本文
    todoTextInput: {
    flex: 1,
    fontSize: 16,
    },

    // 通常ボタン
    primaryButton: {
    backgroundColor: "#007AFF",
    borderRadius: 10,
    height: 30,
    width: 90,
    alignItems: "center",
    paddingVertical: 3,
    justifyContent: "center",
    marginTop: 5,
    marginBottom: 5,
    },

    primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    justifyContent: "center",
    alignItems: "center",
    },

    // 小さい操作ボタン
    textButton: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    },

    textButtonText: {
    color: "#007AFF",
    fontSize: 14,
    },

    deleteText: {
    color: "#FF3B30",
    fontSize: 14,
    },

    deleteButtonContainer: {
        flexDirection: "row",
        marginTop: 10,
        marginBottom: 10,
        alignItems: "center",
    },

    deleteButton: {
        backgroundColor: "#007AFF",
        borderRadius: 10,
        height: 30,
        width: 120,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 70,
    },

    dateTimePicker: {
        backgroundColor: "#FFFFFF",
    },

    row: {
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 10,
    marginBottom: 10,
    },

    dateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 1,
    },
});
