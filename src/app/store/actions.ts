import { createAction, props } from '@ngrx/store';
import { Todo } from '../models/todo';

export const loadTodos = createAction('[Todos] Load todos');

export const loadTodosSuccess = createAction('[Todos] Load todos success', props<{ todos: Todo[] }>());

export const loadTodosFailed = createAction('[Todos] Load todos failed');

export const toggleTodoStatus = createAction('[Todo] toggle todo status', props<{ todo: Todo }>());

export const createTodo = createAction('[Todo] create todo', props<{ todo: Todo }>());

export const createTodoSuccess = createAction('[Todo] create todo success', props<{ todo: Todo }>());

export const createTodoFailed = createAction('[Todo] create todo failed');
