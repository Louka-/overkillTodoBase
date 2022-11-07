import { selectTodos } from './../store/selectors';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Action, Store } from '@ngrx/store';
import { Todo } from '../models/todo';
import { createTodo } from '../store/actions';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {
  todoForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl(''),
  })
  newTodoId?: number;

  constructor(
    public dialogRef: MatDialogRef<AddTodoComponent>,
    private store: Store,
  ) { }
  get f() { return this.todoForm.controls; }

  ngOnInit(): void {
    this.store.select(selectTodos).pipe(
      map(todos => this.newTodoId = todos.length),
    )
  }

  validate(form: FormGroup) {
    if (form.invalid) {
      return;
    }
    const newTodo: Todo = {
      id: this.newTodoId || 0,
      title: form.controls['title'].value,
      description: form.controls['description'].value,
      isClosed: false,
    }
    this.store.dispatch(createTodo({
      todo: newTodo
    }));
    this.dialogRef.close();
  }

  cancel(): void {
    this.dialogRef.close();
  }

}
