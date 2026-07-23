import * as Device from 'expo-device';
import { useState } from 'react';
import { Platform, StyleSheet, View, Text, Pressable, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Todo } from '@/types/Todo';
import TodoItem from '@/components/TodoItem'
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';

function getDevMenuHint() {
  if (Platform.OS === 'web') {
    return ;
  }
  if (Device.isDevice) {
    return ;
  }
  const shortcut = Platform.OS === 'android' ? 'cmd+m (or ctrl+m)' : 'cmd+d';
  return ;
}
type Props = {
    todos: Todo[];
    checkTodo: (id: number, checked: boolean) => void;
    deleteTodo:  (id: number) => void;
    update: (id: number, text: string, dueDate: Date) => void;
    formatDate: (date: Date) => string;
}

export default function TodoList({ 
    todos,
    checkTodo,
    deleteTodo,
    update,
    formatDate
 }:Props ) {
    return (
        <View style={styles.container}>
            {todos.map((todo) => (
                <TodoItem 
                    key={todo.id}
                    todo={todo}
                    checkTodo={checkTodo}
                    deleteTodo={deleteTodo}
                    update={update}
                    formatDate={formatDate}
                />
            ))}
        </View>
    )
}
const styles = StyleSheet.create({
  // 画面全体
    container: {
    flex: 1,
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
    marginBottom: 10,
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
    paddingVertical: 10,
    alignItems: "center",
    },

    primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
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
});
