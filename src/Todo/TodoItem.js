import React, { Component } from "react";
import PropTypes from "prop-types";

class TodoItem extends Component {
  render() {
    const { todo, removeCharacter, checked } = this.props;
    const cls = ["todo_item"];

    if (todo.completed) {
      cls.push("checked");
    }

    return (
      <li className={cls.join(" ")}>
        <span>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => checked(todo.id)}
          ></input>
          {todo.title}
        </span>
        <button type="submit" onClick={removeCharacter.bind(null, todo.id)}>
          &times;
        </button>
      </li>
    );
  }
}

TodoItem.propTypes = {
  removeCharacter: PropTypes.func.isRequired
};

export default TodoItem;
