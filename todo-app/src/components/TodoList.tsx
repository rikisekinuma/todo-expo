import { StyleSheet, FlatList } from 'react-native';
import { Todo } from '@/types/Todo';
import TodoItem from '@/components/TodoItem'

type Props = {
    todos: Todo[];
    checkTodo: (id: number, checked: boolean) => void;
    deleteTodo:  (id: number) => void;
    update: (id: number, text: string, dueDate: Date) => void;
}

export default function TodoList({ 
    todos,
    checkTodo,
    deleteTodo,
    update,
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
