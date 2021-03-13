import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Todo, fetchTodos, deleteTodo } from "./store/actions";
import "./App.css";

interface AppProps {
  todos: Todo[];
}

// interface AppState {
//   fetching: boolean;
// }

const App = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state: AppProps) => state.todos);
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);
  const todosItems: JSX.Element[] = todos.map((todo: Todo) => (
    <div key={todo.id}>{todo.title}</div>
  ));
  return <div>{todosItems}</div>;
};

export default App;
