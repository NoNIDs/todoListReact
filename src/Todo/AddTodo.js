import React, { Component } from "react";

class AddTodo extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      title: "",
      id: Date.now(),
      compeleted: false
    };

    this.state = this.initialState;
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      id: Date.now()
    });
  };

  submitForm = event => {
    event.preventDefault();
    if (this.state.title.trim()) {
      this.props.handleSubmit(this.state);
      this.setState(this.initialState);
    }
  };

  render() {
    const { title } = this.state;
    return (
      <form onSubmit={this.submitForm}>
        <input
          type="text"
          name="title"
          value={title}
          onChange={this.handleChange}
        ></input>
        <button type="submit" className="todo_add_button">
          Add todo
        </button>
      </form>
    );
  }
}

export default AddTodo;
