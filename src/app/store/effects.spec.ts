import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { Effects } from './effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { Actions } from '@ngrx/effects';
import { todosReducer } from './reducer';
import { TodoService } from '../services/todo.service';
import { cold, hot } from 'jasmine-marbles';
import { createTodo, createTodoFailed, createTodoSuccess, loadTodos, loadTodosFailed, loadTodosSuccess } from './actions';
import { Todo } from '../models/todo';

describe('Effects', () => {
  let effects: Effects;
  let actions: Observable<Actions>;
  const todoService = jasmine.createSpyObj<TodoService>('TodoService', ['list', 'createTodo']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({ todosStore: todosReducer }),
      ],
      providers: [
        Effects,
        provideMockActions(() => actions),
        {
          provide: TodoService,
          useValue: todoService,
        },
      ],
    });
    effects = TestBed.inject(Effects);
  });

  describe('loadTodos$', () => {
    it('should dispatch loadTodosSuccess action when todoService.list return a result', () => {
      const mockedTodos: Todo[] = [{ id: 0, title: 'aTitle', description: 'some description', isClosed: true }];
      todoService.list.and.returnValue(of(mockedTodos));

      actions = hot('-a-', {
        a: loadTodos(),
      });
      const expected = cold('-b-', {
        b: loadTodosSuccess({ todos: mockedTodos }),
      });

      expect(effects.loadTodos$).toBeObservable(expected);
    });

    it('should dispatch loadTodosFailed action when todoService.list fails', () => {
      todoService.list.and.returnValue(cold('#'));

      actions = hot('-a-', {
        a: loadTodos(),
      });
      const expected = cold('-b-', {
        b: loadTodosFailed(),
      });

      expect(effects.loadTodos$).toBeObservable(expected);
    });
  });

  describe('createTodo$', () => {
    it('should dispatch createTodoSuccess action when todoService.createTodo return a result', () => {
      const mockedTodo: Todo = { id: 0, title: 'aTitle', description: 'some description', isClosed: true };
      todoService.createTodo.and.returnValue(of(mockedTodo));

      actions = hot('-a-', {
        a: createTodo({ todo: mockedTodo }),
      });
      const expected = cold('-b-', {
        b: createTodoSuccess({ todo: mockedTodo }),
      });

      expect(effects.createTodo$).toBeObservable(expected);
    });

    it('should dispatch createTodosFailed action when todoService.createTodo fails', () => {
      const mockedTodo: Todo = { id: 0, title: 'aTitle', description: 'some description', isClosed: true };
      todoService.createTodo.and.returnValue(cold('#'));

      actions = hot('-a-', {
        a: createTodo({ todo: mockedTodo }),
      });
      const expected = cold('-b-', {
        b: createTodoFailed(),
      });

      expect(effects.createTodo$).toBeObservable(expected);
    });
  });
});
