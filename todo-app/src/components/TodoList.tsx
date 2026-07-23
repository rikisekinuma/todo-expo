import * as Device from 'expo-device';
import { Platform, StyleSheet, FlatList } from 'react-native';
import { Todo } from '@/types/Todo';
import TodoItem from '@/components/TodoItem'

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
        <FlatList<Todo>
            style={styles.container}
            data={todos}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <TodoItem 
                    todo={item}
                    checkTodo={checkTodo}
                    deleteTodo={deleteTodo}
                    update={update}
                    formatDate={formatDate}
                />
            )}
        />
    )
}
const styles = StyleSheet.create({
  // 画面全体
    container: {
    flex: 1,
    },
});
