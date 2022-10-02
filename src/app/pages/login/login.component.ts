import { loginUser, registerUser } from './../../state/user-state/user.actions';
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  showLoginForm = true;
  hide = true;
  hideConfirmPass = true;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.initLoginForm();
    this.initRegisterForm();
  }

  initLoginForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  initRegisterForm(): void {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: [
        '',
        [Validators.required, this.passwordConfirming.bind(this)],
      ],
    });
  }

  passwordConfirming(
    passwordCOntrol: FormControl
  ): { passwordMismatch: boolean } | null {
    const password = this.registerForm?.get('password')?.value;
    const confirmPassword = passwordCOntrol.value;
    if (password !== confirmPassword) {
      return {
        passwordMismatch: true,
      };
    }
    return null;
  }

  login(): void {
    if (this.loginForm.valid) {
      this.store.dispatch(loginUser({ loginData: this.loginForm.value }));
    }
  }

  register(): void {
    if (this.registerForm.valid) {
      this.store.dispatch(registerUser({ userData: this.registerForm.value }));
    }
  }

  toggleForm(showLoginForm: boolean): void {
    this.initLoginForm();
    this.initRegisterForm();
    this.hide = true;
    this.hideConfirmPass = true;
    this.showLoginForm = showLoginForm;
  }
}
