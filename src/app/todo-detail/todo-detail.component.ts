import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss']
})
export class TodoDetailComponent implements OnInit {

  todo: Todo | undefined;
  constructor(
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: Todo
  ) { }

  ngOnInit(): void {
    this.todo = this.data;
    this.router.navigate(['/detail/' + this.data.id]);
  }

}
