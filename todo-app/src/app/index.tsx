import * as Device from 'expo-device';
import { useState } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { Todo } from '@/types/Todo';
import Form from '@/components/Form';
import TodoList from '@/components/TodoList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';

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

export default function HomeScreen() {
  const [todos, setTodos] = useState<Todo[]>([]);
  // 入力されたタスクを管理するための状態
  const [inputTodo, setInputTodo] = useState<Todo>({ id: 0, text: "", completed: false, dueDate: new Date() });
  // 全選択状態を取得
  const isCheckedAll = todos.length > 0 && todos.every((todo) => todo.completed);
  // 作成日のソートフラグ
  const [sortedByCreated, setSortedByCreated] = useState<boolean>(true);
  // 期日順ソートフラグ
  const [sortedByDueDate, setSortedByDueDate] = useState<boolean>(false);

  const STORAGE_KEY = 'todos';
  type StoredTodo = Omit<Todo, 'dueDate'> & {
    dueDate: string;
  }

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function loadTodos() {
      try {
        const savedTodos = await AsyncStorage.getItem(STORAGE_KEY);

        if (savedTodos) {
          const parsedTodos: StoredTodo[] = JSON.parse(savedTodos);
          const restoredTodos: Todo[] = parsedTodos.map((todo) => ({
            ...todo,
            dueDate: new Date(todo.dueDate),
          }));

          setTodos(restoredTodos);
        }
      } catch (error) {
        console.error('読み込み失敗:', error);
      } finally {
        setIsLoaded(true);
      }
    }
    loadTodos();
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    async function saveTodos() {
      try {
        await AsyncStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(todos)
        );
      } catch (error) {
        console.error('保存失敗:', error);
      }
    }

    saveTodos();
  }, [todos]);

  // 選択されたタスクをリストから削除する関数
  function deleteTodos(){
    setTodos(todos.filter((todo) => !todo.completed));
  }
  // Todoリストから個別にタスクを削除する関数
  function deleteTodo(id: number) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  // 入力したタスクをリストに追加する関数
  function addTodo() {
    if (inputTodo.text.trim() === "") return;

    setTodos([...todos, { ...inputTodo, id: Date.now() }]);
    setInputTodo({ id: 0, text: "", completed: false, dueDate: new Date() });
  }

  // チェックボックスの状態を変更する関数
  function checkTodo( id: number, checked: boolean) {
    setTodos(todos.map((todo) =>
      todo.id === id ? { ...todo, completed: checked } : todo
    ))
  }

  // タスクを編集モードにする関数
  function update(id: number, text: string, dueDate: Date) {
    setTodos(todos.map((todo) =>
      todo.id === id ? { ...todo, text, dueDate } : todo
    ))
  }

  // 全選択する関数
  function changeCheckedAll(checked: boolean) {
    setTodos(todos.map((todo) => (
      { ...todo, completed: checked }
    )));
  }

  // 作成日昇順ソート関数
  function sortByCreatedAsc() {
    setTodos([...todos].sort((a, b) => a.id - b.id));
  }

  // 作成日降順ソート関数
  function sortByCreatedDesc() {
    setTodos([...todos].sort((a, b) => b.id - a.id));
  }

  // 作成日ソート関数
  function sortByCreated() {
    if(!sortedByCreated) {
      sortByCreatedAsc();
    } else {
      sortByCreatedDesc();
    }
    setSortedByCreated(!sortedByCreated);
  }

  // 期日順昇順ソート関数
  function sortByDueDateAsc() {
    setTodos(
      [...todos].sort((a, b) => {
        if (!a.dueDate) return -1;
        if (!b.dueDate) return 1;

        return a.dueDate.getTime() - b.dueDate.getTime();
      })
    );
  }

  // 期日順降順ソート関数
  function sortByDueDateDesc() {
    setTodos(
      [...todos].sort((a, b) => {
        if (!b.dueDate) return -1;
        if (!a.dueDate) return 1;

        return b.dueDate.getTime() - a.dueDate.getTime();
      })
    );
  }

  // 期日順ソート関数
  function sortByDueDate() {
    if(!sortedByDueDate) {
      sortByDueDateAsc();
    } else {
      sortByDueDateDesc();
    }
    setSortedByDueDate(!sortedByDueDate);
  }

  // 日付をフォーマットする関数
  function formatDate(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}/${month}/${day}`;
  }

  return (
    <>
      <SafeAreaView
        style={styles.container}
      >
        <Form
          inputTodo={inputTodo} 
          setInputTodo={setInputTodo} 
          addTodo={addTodo}
          deleteTodos={deleteTodos} 
          changeCheckedAll={changeCheckedAll}
          isCheckedAll={isCheckedAll}
          sortByCreated={sortByCreated}
          sortByDueDate={sortByDueDate}
          formatDate={formatDate}
        />
        <TodoList 
        todos={todos}
        checkTodo={checkTodo}
        deleteTodo={deleteTodo} 
        update={update}
        formatDate={formatDate}
        />
      </SafeAreaView>
    </>
  );
}
const styles = StyleSheet.create({
  // 画面全体
    container: {
    flex: 1,
    backgroundColor: "#383838",
    padding: 16,
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


