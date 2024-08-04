import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import { signUp, confirmSignUp } from 'aws-amplify/auth';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AmplifyAuthenticatorModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  applyForm = new FormGroup({
    password: new FormControl(''),
    role: new FormControl(''),
    email: new FormControl(''),
    confirmationCode: new FormControl(''),
  });

  verifyForm = new FormGroup({
    email: new FormControl(''),
    confirmationCode: new FormControl(''),
  });

  signup = false;

  async submitApplication() {
    const data = {
      username: this.applyForm.value.email ?? '',
      role: this.applyForm.value.role ?? '',
      password: this.applyForm.value.password ?? '',
    };

    console.log('the role is =>', data);

    try {
      const { isSignUpComplete, userId, nextStep } = await signUp(data);
      console.log('after signup...');
      console.log(
        'signup is complete ? =>',
        isSignUpComplete,
        userId,
        nextStep
      );

      if (nextStep.signUpStep == 'CONFIRM_SIGN_UP') {
        this.signup = true;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async submitVerification() {
    const verify = {
      username: this.verifyForm.value.email ?? '',
      confirmationCode: this.verifyForm.value.confirmationCode ?? '',
    };

    try {
      const { isSignUpComplete, nextStep } = await confirmSignUp(verify);
      console.log('after verification...');
      console.log('verification complete', isSignUpComplete, nextStep);
    } catch (error) {
      console.error(error);
    }
  }
  constructor() {}
}
