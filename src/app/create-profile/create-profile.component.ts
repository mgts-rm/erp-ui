import {Component, inject} from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule, AbstractControl, ValidatorFn, ValidationErrors} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

export const passwordMatchValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  const passwordControl = group.get('password');
  const confirmPasswordControl = group.get('confirmPassword');

  if (!passwordControl || !confirmPasswordControl) {
    return null;
  }

  const password = passwordControl.value;
  const confirmPassword = confirmPasswordControl.value;

  // If confirmPassword is empty, do not show the mismatch error yet.
  if (!confirmPassword) {
    return null;
  }

  const error = password === confirmPassword ? null : { passwordMismatch: true };

  // update confirmPassword field state so Angular detects changes.
  confirmPasswordControl.setErrors(error ? { ...confirmPasswordControl.errors, ...error } : null);

  return error;
};

/**
 * @title Stepper that displays errors in the steps
 */
@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrl: './create-profile.component.scss',
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ],
  imports: [
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatCardModule
  ],
})
export class CreateProfileComponent{
  private _formBuilder = inject(FormBuilder);

  userDetailsFormGroup = this._formBuilder.group({
    firstName: ['', Validators.required],
    middleName: [''],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', Validators.required],
  }, { validators: passwordMatchValidator });

  organizationDetailsFormGroup = this._formBuilder.group({
    orgName: ['', Validators.required],
    orgId: ['', Validators.required],
    orgPhone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    street1: ['', Validators.required],
    street2: [''],
    street3: [''],
    city: ['', Validators.required],
    state: ['', Validators.required],
    country: ['', Validators.required],
  });

  passwordVisible = false;
  confirmPasswordVisible = false;
  
}
