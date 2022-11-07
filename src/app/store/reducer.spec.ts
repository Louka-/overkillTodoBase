import * as fromReducer from './reducer';
import { State } from './reducer';
import { createTodo, loadTodosSuccess, toggleTodoStatus } from './actions';

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
      const newState: State = { todos: [{ id: 0, title: 'aTitle', description: 'some description', isClosed: false }] };
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
      const initialState: State = { todos: [{ id: 0, title: 'aTitle', description: 'some description', isClosed: true }] };
      const action = toggleTodoStatus({
        todo: initialState.todos[0],
      });
      const state = fromReducer.todosReducer(initialState, action);

      expect(state.todos[0].isClosed).toBeFalse();
      expect(state).not.toBe(initialState);
    });
  });

  describe('createTodo action', () => {
    it('should create a new todo and update the state', () => {
      const initialState: State = { todos: [{ id: 0, title: 'aTitle', description: 'some description', isClosed: true }] };
      const action = createTodo({
        todo: { id: 1, title: 'aSecondTitle', description: 'some other description', isClosed: false },
      });
      const state = fromReducer.todosReducer(initialState, action);

      expect(state.todos.length).toEqual(2);
      expect(state.todos[0].id).toEqual(0);
      expect(state.todos[0].title).toBe('aTitle');
      expect(state.todos[0].description).toBe('some description');
      expect(state.todos[0].isClosed).toBeTrue();

      expect(state.todos[1].id).toEqual(1);
      expect(state.todos[1].title).toBe('aSecondTitle');
      expect(state.todos[1].description).toBe('some other description');
      expect(state.todos[1].isClosed).toBeFalse();
    })
  })
});
