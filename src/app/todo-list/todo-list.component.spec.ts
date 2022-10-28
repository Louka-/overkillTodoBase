import { loadTodos } from './../store/actions';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { TodoListComponent } from './todo-list.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { State } from '../store/reducer';
import { selectSortedTodos } from '../store/selectors';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatList, MatListItem } from '@angular/material/list';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { MockComponents, MockedComponent } from 'ng-mocks';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Todo } from '../models/todo';
import { DefaultProjectorFn, MemoizedSelector } from '@ngrx/store';
import { map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { toggleTodoStatus } from '../store/actions';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let store: MockStore<State>;
  let mockTodosSelector: MemoizedSelector<any, any, DefaultProjectorFn<Todo[]>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TodoListComponent,
        MockComponents(
          MatCheckbox,
          MatListItem,
          MatList,
          MatCardContent,
          MatCardTitle,
          MatCard
        ),
      ],
      imports: [MatRippleModule, FormsModule],
      providers: [provideMockStore()],
    }).compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;

    mockTodosSelector = store.overrideSelector(selectSortedTodos, [
      { id: 0, title: 'todo 1', isClosed: false },
      { id: 1, title: 'todo 2', isClosed: true },
    ]);


    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a title', () => {
    expect(fixture.debugElement.query(By.css('mat-card-title')).nativeElement.innerText).toEqual(
      'Todos'
    );
  });

  it('should display todos', () => {
    const todoElements = fixture.debugElement.queryAll(By.css('mat-list mat-list-item'));
    expect(todoElements.length).toEqual(2);
    expect(todoElements[0].query(By.css('h4')).nativeElement.innerText).toContain('todo 1');
    expect(todoElements[1].query(By.css('h4')).nativeElement.innerText).toContain('todo 2');
    const todoCheckboxes: MockedComponent<MatCheckbox>[] =
      todoElements.map(item => item.query(By.css('mat-checkbox'))).map(item => item.componentInstance);
    expect(todoCheckboxes[0].checked).toBeFalse();
    expect(todoCheckboxes[1].checked).toBeTrue();
  });

  it('should apply .done class when todo isClosed', () => {
    const todoElements = fixture.debugElement.queryAll(By.css('mat-list mat-list-item'));
    expect(todoElements[0].query(By.css('h4')).classes.done).toBeUndefined();
    expect(todoElements[1].query(By.css('h4')).classes.done).toBeTrue();
  });

  it('toggleStatus method should dispatch an action', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    TestBed.createComponent(TodoListComponent);
    const todo = { id: 0, title: 'todo 1', isClosed: false };

    component.toggleStatus(todo);

    expect(dispatchSpy).toHaveBeenCalledWith(toggleTodoStatus({ todo: todo }));
  })

});
