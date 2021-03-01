import React from "react";
import { connect } from "react-redux";
import { Todo, fetchTodos, deleteTodo } from "./store/actions";
import { StoreState } from "./store/reducers";
import "./App.css";

interface AppProps {
  todos: Todo[];
  fetchTodos: Function;
  deleteTodo: Function;
}

interface AppState {
  fetching: boolean;
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = { fetching: false };
  }

  componentDidUpdate(prevProps: AppProps): void {
    if (!prevProps.todos.length && this.props.todos.length) {
      this.setState({ fetching: false });
    }
  }

  onButtonClick = (): void => {
    setTimeout(() => {
      this.props.fetchTodos();
    }, 300);
    this.setState({ fetching: true });
  };

  renderList(): JSX.Element[] {
    return this.props.todos.map((todo: Todo) => {
      return <div key={todo.id}>{todo.title}</div>;
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.onButtonClick}>Fetch todos</button>
        {this.state.fetching && "LOADING"}
        {this.renderList()}
      </div>
    );
  }
}

const mapStateProps = ({ todos }: StoreState): { todos: Todo[] } => {
  return { todos };
};

export default connect(mapStateProps, { fetchTodos, deleteTodo })(App);
