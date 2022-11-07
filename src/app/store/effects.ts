import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadTodos, loadTodosFailed, loadTodosSuccess, createTodo, createTodoSuccess, createTodoFailed } from './actions';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { TodoService } from '../services/todo.service';
import { of } from 'rxjs';

@Injectable()
export class Effects {
  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTodos),
      mergeMap(() =>
        this.todoService.list().pipe(
          map((todos) => loadTodosSuccess({ todos })),
          catchError(() => [loadTodosFailed()])
        )
      )
    )
  );
  createTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createTodo),
      mergeMap(action => this.todoService.createTodo(action.todo).pipe(
        map(todo => createTodoSuccess({ todo })),
        catchError(() => [createTodoFailed()])
      ))
    )
  )

  constructor(private actions$: Actions, private todoService: TodoService) { }
}
