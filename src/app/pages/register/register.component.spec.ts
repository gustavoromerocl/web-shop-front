import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { RegisterComponent } from './register.component';
import { UserService } from '../../services/user/user.service';
import { Store } from '@ngrx/store';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let userServiceMock: jasmine.SpyObj<UserService>;
  let routerMock: jasmine.SpyObj<Router>;
  let storeMock: jasmine.SpyObj<Store>;

  beforeEach(async () => {
    userServiceMock = jasmine.createSpyObj('UserService', ['registerUser']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);
    storeMock = jasmine.createSpyObj('Store', ['dispatch', 'select']);

    await TestBed.configureTestingModule({
      imports: [RegisterComponent, ReactiveFormsModule],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: Store, useValue: storeMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.registerForm.value).toEqual({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  });

  it('should mark form as invalid if passwords do not match', () => {
    component.registerForm.setValue({
      name: 'Test User',
      email: 'test@example.com',
      password: 'Password123!',
      confirmPassword: 'Mismatch123!',
    });

    expect(component.registerForm.valid).toBeFalse();
    expect(component.registerForm.errors).toEqual({ mismatch: true });
  });

  it('should validate password with custom validators', () => {
    const passwordControl = component.registerForm.get('password');

    passwordControl?.setValue('password');
    expect(passwordControl?.errors).toEqual({
      uppercase: true,
      number: true,
      specialCharacter: true,
    });

    passwordControl?.setValue('Password123!');
    expect(passwordControl?.errors).toBeNull();
  });

  it('should call registerUser and navigate to login on successful registration', () => {
    userServiceMock.registerUser.and.returnValue(of({ status: 201 }));
    component.registerForm.setValue({
      name: 'Test User',
      email: 'test@example.com',
      password: 'Password123!',
      confirmPassword: 'Password123!',
    });

    component.onSubmit();

    expect(userServiceMock.registerUser).toHaveBeenCalledWith({
      username: 'Test User',
      email: 'test@example.com',
      password: 'Password123!',
    });
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should show alert and log error on registration failure', () => {
    spyOn(window, 'alert');
    userServiceMock.registerUser.and.returnValue(
      throwError(() => new Error('Registration failed'))
    );

    component.registerForm.setValue({
      name: 'Test User',
      email: 'test@example.com',
      password: 'Password123!',
      confirmPassword: 'Password123!',
    });

    component.onSubmit();

    expect(userServiceMock.registerUser).toHaveBeenCalledWith({
      username: 'Test User',
      email: 'test@example.com',
      password: 'Password123!',
    });
    expect(window.alert).toHaveBeenCalledWith('Registration failed. Please try again.');
  });
});
