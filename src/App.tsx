import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { Todo, fetchTodos, deleteTodo } from "./store/actions";

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Pagination from "@material-ui/lab/Pagination";

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

const pageSize = 10;

const App = () => {
  const [currentPage, setCurrentPage] = useState(0);
  //let todosItems;
  const classes = useStyles();
  const dispatch = useDispatch();
  const todos = useSelector((state: AppProps) => state.todos);
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleChange = (event: any, value: any): void => {
    setCurrentPage(value);
  };

  const pageCount = Math.ceil(todos.length / pageSize);
  const displayData = _.chunk(todos, pageSize)[currentPage];

  const todosItems: JSX.Element[] =
    displayData &&
    displayData.map((todo: Todo) => (
      <ListItem key={todo.id} button>
        <ListItemText primary={`Line item ${todo.title}`} />
      </ListItem>
    ));

  return (
    <>
      <List className={classes.root}>{todosItems}</List>
      <Pagination
        count={pageCount}
        onChange={handleChange}
        variant="outlined"
        shape="rounded"
      />
    </>
  );
};

export default App;
