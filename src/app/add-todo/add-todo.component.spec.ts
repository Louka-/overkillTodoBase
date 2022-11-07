import { selectTodos } from './../store/selectors';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { createTodo } from '../store/actions';
import { State } from '../store/reducer';
import { AddTodoComponent } from './add-todo.component';
import { map, tap } from 'rxjs/operators';

describe('AddTodoComponent', () => {
  let component: AddTodoComponent;
  let fixture: ComponentFixture<AddTodoComponent>;
  let store: MockStore<State>;
  let dialogMock = {
    close: () => { }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AddTodoComponent,
      ],
      imports: [
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        NoopAnimationsModule
      ],
      providers: [
        provideMockStore(),
        { provide: MatDialogRef, useValue: dialogMock },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(AddTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return if formGroup.invalid', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    const todo = { id: 0, title: 'todo 1', description: 'some description', isClosed: false };
    const formGroup: FormGroup = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl(todo.description),
    })

    component.validate(formGroup);

    expect(dispatchSpy).not.toHaveBeenCalled();
  })

  it('should dispatch an action', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    const todo = { id: 0, title: 'todo 1', description: 'some description', isClosed: false };
    const formGroup: FormGroup = new FormGroup({
      title: new FormControl(todo.title, [Validators.required]),
      description: new FormControl(todo.description),
    })

    component.validate(formGroup);

    expect(dispatchSpy).toHaveBeenCalledWith(createTodo({ todo: todo }));
  });

  it('should close dialog after cancel()', () => {
    let spyCancel = spyOn(component.dialogRef, 'close').and.callThrough();
    component.cancel();
    expect(spyCancel).toHaveBeenCalled();
  })
});
