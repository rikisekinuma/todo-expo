import React from 'react';
import {View, Text, TextInput, StyleSheet, Pressable} from 'react-native';
import type { Todo } from '@/types/Todo';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function Form({
    inputTodo,
    setInputTodo,
    addTodo,
    deleteTodos,
    changeCheckedAll,
    isCheckedAll,
    sortByCreated,
    sortByDueDate,
}:{
    inputTodo: Todo; 
    setInputTodo: React.Dispatch<React.SetStateAction<Todo>>; 
    addTodo: () => void;
    deleteTodos: () => void;
    changeCheckedAll: (checked: boolean) => void;
    isCheckedAll: boolean;
    sortByCreated: () => void;
    sortByDueDate: () => void;
}) {

    return (
        <View
            style={styles.container}
        >   
            <View
                style={styles.header}
            >
                <TextInput
                    value={inputTodo.text}
                    placeholder="タスクを入力"
                    onChangeText={(text) =>
                        setInputTodo({
                            ...inputTodo,
                            text,
                        })
                    }
                    style={styles.input}
                ></TextInput>
                <View
                    style={styles.dueDateContainer}
                >
                    <Text 
                        style={styles.label}
                    >期日</Text>
                    <DateTimePicker
                        value={inputTodo.dueDate}
                        mode="date"
                        is24Hour={true}
                        locale="ja-JP"
                        onValueChange={(_, selectedDate) => {

                            if (!selectedDate) return;

                            setInputTodo({
                                ...inputTodo,
                                dueDate: selectedDate,
                            });
                        }}
                    />
                </View>
                <Pressable
                    style={styles.addButton}
                    onPress={() => addTodo()}
                >
                    <Text
                    style={styles.addButtonText}
                    >追加</Text>
                </Pressable>
            </View>
            <View
                style={styles.row}
            >
                {isCheckedAll ? (
                    <Pressable
                        style={styles.primaryButton}
                        onPress={() => changeCheckedAll(false)}
                    >
                        <Text style={styles.primaryButtonText}>選択解除</Text>
                    </Pressable>
                ) : (
                    <Pressable
                        style={styles.primaryButton}
                        onPress={() => changeCheckedAll(true)}
                    >
                        <Text style={styles.primaryButtonText}>全選択</Text>
                    </Pressable>
                )}
                <Pressable
                    style={styles.primaryButton}
                    onPress={() => deleteTodos()}
                >
                    <Text style={styles.primaryButtonText}>選択行削除</Text>
                </Pressable>
                <Pressable
                    style={styles.sortButton}
                    onPress={() => sortByCreated()}
                >
                    <Text style={styles.primaryButtonText}>作成日順</Text>
                </Pressable>
                <Pressable
                    style={styles.sortButton}
                    onPress={() => sortByDueDate()}
                >
                    <Text style={styles.primaryButtonText}>期日順</Text>
                </Pressable>
            </View>

        </View>
    );
    
};

const styles = StyleSheet.create({
  // 画面全体
    container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    padding: 16,
    },

    // ヘッダー/フォーム部分
    header: {
    backgroundColor: "#fcfcfc",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 40,
    marginBottom: 16,
    width: "110%",
    height: 220,
    },

    dueDateContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    marginBottom: 10,
    marginTop: 10,
    },

    label: {
    color: "#000000",
    fontSize: 14,
    fontWeight: "semibold",
    marginBottom: 8,
    width: 80,
    textAlign: "center",
    },

    // 入力欄
    input: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#D1D1D6",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 10,
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
    marginBottom: 10,
    marginTop: 10,
    width: 100,
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
    width: 95,
    alignItems: "center",
    paddingVertical: 3,
    justifyContent: "center",
    marginTop: 5,
    marginBottom: 5,
    },

    sortButton: {
    backgroundColor: "#6652ff",
    borderRadius: 10,
    height: 30,
    width: 75,
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

    addButton: {
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

    addButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    justifyContent: "center",
    alignItems: "center",
    },

    row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    },
});


