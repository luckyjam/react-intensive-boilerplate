import React from 'react';
import { shallow } from 'enzyme';
import ToDoList from './';

const result = shallow(<ToDoList />);
const placeholder = 'Visit grandpa!';

test(`<ToDoList /> initial state contains empty string as a value of 'currentTodo' property
    and empty array as a value of 'todos' property`, () => {
        expect(result.state()).toEqual({
            currentTodo: '',
            todos:       []
        });
    });

test(`<ToDoList /> should have no elements of type 'li' initially`, () => {
    expect(result.find('li').length).toBe(0);
});

test(`<ToDoList /> should contain three base elements initially`, () => {
    expect(result.find('button').length).toBe(1);
    expect(result.find('ul').length).toBe(1);
    expect(result.find('input').length).toBe(1);
});

test(`<ToDoList /> input value should be empty initially,
    but should change the value of the 'currentTodo' property in the state if changed`, () => {
        expect(result.find('input').length).toBe(1);
        expect(result.find('input').text()).toBe('');

        result.find('input').simulate('change', {
            target: {
                value: placeholder
            }
        });

        expect(result.state().currentTodo).toEqual(placeholder);
    });

test(`<ToDoList /> should have one todo item with corresponding value
    in state after 'add todo' button is clicked`, () => {
        result.find('.addTodo').simulate('click');

        expect(result.state().todos.length).toBe(1);
        expect(result.state().todos[0]).toEqual(placeholder);
    });

test(`After todo added to a list of todos in state, the 'currentTodo'
    property value and 'input' element should be empty`, () => {
        expect(result.state().currentTodo).toBe('');
        expect(result.find('input').text()).toBe('');
    });

test(`<ToDoList /> after one todo added should have one 'li' element with
    corresponding text value`, () => {
        expect(result.find('li').length).toBe(1);
        expect(
            result
                .find('li')
                .containsAllMatchingElements([placeholder, <button>Done!</button>])
        ).toBe(true);
    });

test(`<ToDoList /> 'todo' state value should be empty after todo is completed`, () => {
    result.find('.deleteTodo').simulate('click');

    expect(result.state().todos.length).toBe(0);
    expect(result.find('li').length).toBe(0);
});

test(`<ToDoList /> should contain three base elements in the end of a test`, () => {
    expect(result.find('button').length).toBe(1);
    expect(result.find('ul').length).toBe(1);
    expect(result.find('input').length).toBe(1);
});
