import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Todo, fetchTodos, deleteTodo } from "./store/actions";

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

interface AppProps {
  todos: Todo[];
}

// interface AppState {
//   fetching: boolean;
// }

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const App = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const todos = useSelector((state: AppProps) => state.todos);
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);
  const todosItems: JSX.Element[] = todos.map((todo: Todo) => (
    <ListItem key={todo.id} button>
      <ListItemText primary={`Line item ${todo.title}`} />
    </ListItem>
  ));
  return <List className={classes.root}>{todosItems}</List>;
};

export default App;
