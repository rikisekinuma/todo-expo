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
        <>
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
        </>
    )
}