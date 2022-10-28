import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo';
import { Store } from '@ngrx/store';
import { selectSortedTodos, selectTodos } from '../store/selectors';
import { loadTodos, toggleTodoStatus } from '../store/actions';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  todos$: Observable<ReadonlyArray<Todo>>;

  constructor(private store: Store) {
    this.todos$ = this.store.select(selectSortedTodos);
  }

  ngOnInit(): void {
    this.store.dispatch(loadTodos());
  }

  toggleStatus(todo: Todo): void {
    this.store.dispatch(toggleTodoStatus({ todo: todo }));
  }

}
