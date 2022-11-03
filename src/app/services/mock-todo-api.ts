import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class MockTodoApi implements InMemoryDbService {

  createDb(): {} {
    const todos: Todo[] = [
      { id: 0, title: 'todo in memory 1', description: 'A first description', isClosed: false },
      { id: 1, title: 'todo in memory 2', description: 'A second description', isClosed: false },
      { id: 2, title: 'todo in memory 3', description: 'A third description', isClosed: true },
      { id: 3, title: 'todo in memory 4', description: 'A fourth description', isClosed: false },
    ];
    return { todos };
  }

}
