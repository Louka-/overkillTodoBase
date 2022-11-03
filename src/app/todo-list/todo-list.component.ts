import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo';
import { Store } from '@ngrx/store';
import { selectSortedTodos } from '../store/selectors';
import { loadTodos, toggleTodoStatus } from '../store/actions';
import { MatDialog } from '@angular/material/dialog';
import { TodoDetailComponent } from '../todo-detail/todo-detail.component';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  selectedId: number | undefined;
  todos$: Observable<ReadonlyArray<Todo>>;
  constructor(
    private store: Store,
    public dialog: MatDialog,
    private route: ActivatedRoute,
  ) {
    this.todos$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.selectedId = Number(params.get('id'));
        return this.store.select(selectSortedTodos);
      })
    );
  }

  ngOnInit(): void {
    this.store.dispatch(loadTodos());
  }

  toggleStatus(todo: Todo): void {
    this.store.dispatch(toggleTodoStatus({ todo: todo }));
  }

  openDetail(todo: Todo): void {
    this.dialog.open(TodoDetailComponent, { data: todo });
  }

}
