import { Todo } from '../models/todo';
import { createReducer, on } from '@ngrx/store';
import { createTodo, loadTodosSuccess, toggleTodoStatus } from './actions';

export const featureKey = 'todosStore';

export interface State {
  todos: ReadonlyArray<Todo>;
}

export const initialState: State = {
  todos: []
};

export const todosReducer = createReducer(
  initialState,
  on(
    loadTodosSuccess,
    (state, { todos }) => ({
      ...state,
      todos
    })
  ),
  on(
    toggleTodoStatus,
    (state, action) => {
      const todo = state.todos.find(t => t.id === action.todo.id) as Todo;
      const index = state.todos.indexOf(todo);
      return ({
        ...state,
        todos: [
          ...state.todos.slice(0, index),
          { id: todo.id, title: todo.title, description: todo.description, isClosed: !todo.isClosed },
          ...state.todos.slice(index + 1),
        ]
      })
    }
  ),
  on(
    createTodo,
    (state, action) => {
      return ({
        ...state,
        todos: state.todos.concat(action.todo),
      })
    }
  )
);
