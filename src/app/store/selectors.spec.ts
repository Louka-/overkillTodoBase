import { State } from './reducer';
import { selectDoneTodos, selectSortedTodos, selectTodos, selectUndoneTodos } from './selectors';

describe('Selectors', () => {
  const initialState: State = {
    todos: [
      { id: 0, title: 'todo1Title', description: 'some description', isClosed: true },
      { id: 1, title: 'todo2Title', description: 'some description', isClosed: false },
      { id: 2, title: 'todo3Title', description: 'some description', isClosed: true },
      { id: 3, title: 'todo4Title', description: 'some description', isClosed: true },
    ]
  };

  it('should select todos list', () => {
    const result = selectTodos.projector(initialState);
    expect(result).toEqual(initialState.todos);
  });

  it('should select only done todos from list', () => {
    const result = selectDoneTodos.projector(initialState);
    expect(result).toEqual(initialState.todos.filter(todo => todo.isClosed));
  })

  it('should select only undone todos from list', () => {
    const result = selectUndoneTodos.projector(initialState);
    expect(result).toEqual(initialState.todos.filter(todo => !todo.isClosed));
  })

  it('should select both undone/done todos sorted from list', () => {
    const undoneTodos = selectUndoneTodos.projector(initialState);
    const doneTodos = selectDoneTodos.projector(initialState);
    const result = selectSortedTodos.projector(doneTodos, undoneTodos);
    const newState: State = {
      todos: [
        { id: 1, title: 'todo2Title', description: 'some description', isClosed: false },
        { id: 0, title: 'todo1Title', description: 'some description', isClosed: true },
        { id: 2, title: 'todo3Title', description: 'some description', isClosed: true },
        { id: 3, title: 'todo4Title', description: 'some description', isClosed: true },
      ]
    }
    expect(result).toEqual(newState.todos);
  })
});
