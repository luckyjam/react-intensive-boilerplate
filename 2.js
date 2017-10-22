import React, { Component } from 'react';

export default class ToDoList extends Component {
    constructor () {
        super();

        this.handleChange = ::this._handleChange;
        this.addTodo = ::this._addTodo;
        this.deleteTodo = ::this._deleteTodo;
    }

    state = {
        currentTodo: '',
        todos:       []
    };

    _handleChange (event) {
        this.setState(() => ({
            currentTodo: event.target.value
        }));
    }

    _addTodo () {
        const { currentTodo } = this.state;

        if (currentTodo) {
            this.setState(({ todos }) => ({
                currentTodo: '',
                todos:       [currentTodo, ...todos]
            }));
        }
    }

    _deleteTodo (toDo) {
        const { todos } = this.state;

        this.setState(() => ({
            todos: todos.splice(todos.indexOf(toDo), 1)
        }));
    }

    render () {
        const { currentTodo, todos } = this.state;

        const todoList = todos.map((toDo, index) => (
            <li key = { index }>
                {toDo}
                <button
                    className = 'deleteTodo'
                    onClick = { () => this.deleteTodo(toDo) }>
                    Done!
                </button>
            </li>
        ));

        return (
            <section>
                <input value = { currentTodo } onChange = { this.handleChange } />
                <button className = 'addTodo' onClick = { this.addTodo }>
                    Add todo
                </button>
                <ul>{todoList}</ul>
            </section>
        );
    }
}
