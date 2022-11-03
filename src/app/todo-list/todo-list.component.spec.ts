import { ComponentFixture, TestBed } from '@angular/core/testing';
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
import { Todo } from '../models/todo';
import { DefaultProjectorFn, MemoizedSelector } from '@ngrx/store';
import { toggleTodoStatus } from '../store/actions';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { RouterTestingModule } from '@angular/router/testing';
import { TodoDetailComponent } from '../todo-detail/todo-detail.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let store: MockStore<State>;
  let mockTodosSelector: MemoizedSelector<any, any, DefaultProjectorFn<Todo[]>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TodoListComponent,
        TodoDetailComponent,
        MockComponents(
          MatCheckbox,
          MatListItem,
          MatList,
          MatCardContent,
          MatCardTitle,
          MatCard,
          MatButton
        ),
      ],
      imports: [
        MatRippleModule,
        FormsModule,
        MatDialogModule,
        MatButtonModule,
        RouterTestingModule,
        MatDialogModule,
        NoopAnimationsModule,
        RouterTestingModule.withRoutes(
          [{ path: 'detail/0', redirectTo: '' }]
        )
      ],
      providers: [
        provideMockStore(),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;

    mockTodosSelector = store.overrideSelector(selectSortedTodos, [
      { id: 0, title: 'todo 1', description: 'some description', isClosed: false },
      { id: 1, title: 'todo 2', description: 'some description', isClosed: true },
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

  it('should dispatch an action', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    TestBed.createComponent(TodoListComponent);
    const todo = { id: 0, title: 'todo 1', description: 'some description', isClosed: false };

    component.toggleStatus(todo);

    expect(dispatchSpy).toHaveBeenCalledWith(toggleTodoStatus({ todo: todo }));
  });

  it('should call openDetail', () => {
    const todo = { id: 0, title: 'todo 1', description: 'some description', isClosed: false };
    TestBed.createComponent(TodoListComponent);

    component.openDetail(todo);
    fixture.detectChanges();
    const popUpHeader = document.getElementsByTagName('h2')[0] as HTMLHeadElement;
    const popUpDescription = document.getElementsByTagName('p')[0] as HTMLHeadElement;
    expect(popUpHeader.innerText).toEqual('todo 1');
    expect(popUpDescription.innerText).toEqual('some description');
  })

});
