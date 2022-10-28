import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Todo } from '../models/todo';
import { featureKey, State } from './reducer';

export const getState = createFeatureSelector<State>(featureKey);

export const selectTodos = createSelector(
  getState,
  (state: State) => state.todos,
);

export const selectDoneTodos = createSelector(
  getState,
  (state: State) => state.todos.filter(todo => todo.isClosed),
);

export const selectUndoneTodos = createSelector(
  getState,
  (state: State) => state.todos.filter(todo => !todo.isClosed),
);

export const selectSortedTodos = createSelector(
  selectDoneTodos,
  selectUndoneTodos,
  (doneTodos: Todo[], undoneTodos: Todo[]) => {
    return undoneTodos.concat(doneTodos);
  },
);
