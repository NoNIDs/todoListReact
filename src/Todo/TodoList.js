import React, { Component } from "react";
import TodoItem from "./TodoItem";

class TodoList extends Component {
  render() {
    const { todos, removeCharacter, checked } = this.props;
    return (
      <ul className="todo_list">
        {todos.map((todo, index) => {
          return (
            <TodoItem
              key={todo.id}
              todo={todo}
              removeCharacter={removeCharacter}
              checked={checked}
            ></TodoItem>
          );
        })}
      </ul>
    );
  }
}
export default TodoList;
