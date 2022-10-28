import * as fromReducer from './reducer';
import { State } from './reducer';
import { loadTodosSuccess, toggleTodoStatus } from './actions';

describe('Reducer', () => {
  describe('unknown action', () => {
    it('should return the default state', () => {
      const { initialState } = fromReducer;
      const action = {
        type: 'Unknown',
      };
      const state = fromReducer.todosReducer(initialState, action);

      expect(state).toBe(initialState);
    });
  });

  describe('loadTodosSuccess action', () => {
    it('should retrieve all todos and update the state', () => {
      const { initialState } = fromReducer;
      const newState: State = { todos: [{ id: 0, title: 'aTitle', isClosed: false }] };
      const action = loadTodosSuccess({
        todos: [...newState.todos],
      });

      const state = fromReducer.todosReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });

  describe('toggleTodoStatus action', () => {
    it('should trigger a todo, toggle isClosed value and update the state', () => {
      const initialState: State = { todos: [{ id: 0, title: 'aTitle', isClosed: true }] };
      const action = toggleTodoStatus({
        todo: initialState.todos[0],
      });

      const state = fromReducer.todosReducer(initialState, action);

      expect(state.todos[0].isClosed).toBeFalse();
      expect(state).not.toBe(initialState);
    })
  })
});
