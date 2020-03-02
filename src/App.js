import React, { Component } from "react";
import TodoList from "./Todo/TodoList";
import AddTodo from "./Todo/AddTodo";
import Pagination from "./Todo/Pagination";

class App extends Component {
  state = {
    //JSON parsing to retrieve state
    todos: JSON.parse(localStorage.getItem("allTodos")) || [],
    currentTodos: [],
    currentPage: 1,
    totalPages: 1,
    pageLimit: 5
  };

  //save state to localStorage in JSON format
  componentDidUpdate() {
    localStorage.setItem("allTodos", JSON.stringify(this.state.todos));
  }

  onPageChanged = data => {
    const { todos, pageLimit, totalPages } = this.state;
    const { currentPage } = data;

    const offset = (currentPage - 1) * pageLimit;
    const currentTodos = todos.slice(offset, offset + pageLimit);

    this.setState({ currentPage, currentTodos, totalPages });
  };

  checked = id => {
    const { todos } = this.state;

    this.setState({
      todos: todos.map(todo => {
        if (todo.id === id) todo.completed = !todo.completed;
        return todo;
      })
    });
  };

  removeCharacter = id => {
    const { todos, currentPage, pageLimit } = this.state;
    const offset = (currentPage - 1) * pageLimit;
    this.setState({
      todos: todos.filter(todo => {
        return todo.id !== id;
      }),
      currentTodos: todos.slice(offset, offset + pageLimit),
      totalPages: Math.ceil(todos.length / pageLimit)
    });
  };

  handleSubmit = todo => {
    this.setState({
      todos: [...this.state.todos, todo],
      totalPages: Math.ceil(this.state.todos.length / this.state.pageLimit)
    });
  };

  render() {
    const {
      todos,
      currentPage,
      totalPages,
      currentTodos,
      pageLimit
    } = this.state;

    const totalTodos = todos.length;

    const headerClass = [
      "text-dark py-2 pr-4 m-0",
      currentPage ? "border-gray border-right" : ""
    ]
      .join(" ")
      .trim();

    return (
      <div className="app_wrapper">
        <h1> TODO List - Class components</h1>

        <div className="d-flex flex-row align-items-center">
          <h2 className={headerClass}>
            <strong className="text-secondary">{totalTodos}</strong> TODOS
          </h2>
          {currentPage && (
            <span className="current-page d-inline-block h-100 pl-4 text-secondary">
              Page <span className="font-weight-bold">{currentPage}</span> /{" "}
              <span className="font-weight-bold">{totalPages}</span>
            </span>
          )}
        </div>
        <div className="d-flex flex-row py-4 align-items-center">
          <Pagination
            totalPages={totalPages}
            pageLimit={pageLimit}
            pageNeighbours={2}
            onPageChanged={this.onPageChanged}
          />
        </div>

        <AddTodo handleSubmit={this.handleSubmit}></AddTodo>
        <TodoList
          todos={currentTodos}
          removeCharacter={this.removeCharacter}
          checked={this.checked}
        ></TodoList>
      </div>
    );
  }
}
export default App;
