import { NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Loan } from '../../services/loan';

@Component({
  selector: 'app-new-application',
  imports: [NgFor, ReactiveFormsModule],
  templateUrl: './new-application.html',
  styleUrl: './new-application.css',
})
export class NewApplication {
  loanForm!: FormGroup;
  formBuilder = inject(FormBuilder);
  loanService = inject(Loan);
  loggedUser: any;

  constructor() {
    this.initializeForm();
    const local = localStorage.getItem('bankUser');
    if (local != null) {
      this.loggedUser = JSON.parse(local);
    }
  }

  initializeForm() {
    this.loanForm = this.formBuilder.group({
      // backend-assigned / read-only fields
      applicantID: [{ value: 0, disabled: true }],
      customerId: [{ value: 0, disabled: true }],
      dateApplied: [{ value: this.today(), disabled: true }],

      fullName: ['', [Validators.required, Validators.minLength(3)]],
      applicationStatus: ['Pending', Validators.required],

      panCard: ['', [Validators.required, Validators.pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)]],

      dateOfBirth: ['', [Validators.required, this.minimumAgeValidator(18)]],

      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],

      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],

      annualIncome: [0, [Validators.required, Validators.min(1)]],
      employmentStatus: ['', Validators.required],
      creditScore: [0, [Validators.required, Validators.min(300), Validators.max(900)]],
      assets: [''],

      loans: this.formBuilder.array([], [Validators.required, Validators.minLength(1)]),
    });
    this.addNewLoanForm();
  }

  private today(): string {
    return new Date().toISOString();
  }

  // custom validator: dateOfBirth must make the applicant at least `years` old
  private minimumAgeValidator(years: number) {
    return (control: any) => {
      if (!control.value) return null;
      const dob = new Date(control.value);
      const age = (Date.now() - dob.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
      return age >= years ? null : { minimumAge: { requiredAge: years } };
    };
  }

  get loans(): FormArray {
    return this.loanForm.get('loans') as FormArray;
  }

  createLoanDetails(): FormGroup {
    return this.formBuilder.group({
      loanID: [0],
      applicantID: [0],
      bankName: ['', Validators.required],
      loanAmount: ['', Validators.required],
      emi: ['', Validators.required],
    });
  }

  addNewLoanForm() {
    this.loans.push(this.createLoanDetails());
  }

  onSave() {
    debugger;
    // const formValue = this.loanForm.value; // silently drops disabled fields => res.result = false
    const formValue = this.loanForm.getRawValue();

    formValue.customerId = this.loggedUser.userId;
    this.loanService.onSaveLoanApplication(formValue).subscribe({
      next: (res: any) => {
        debugger;
        if (res.result) {
          debugger;
          alert('Loan Form Submitted Successfully');
        } else {
          alert(res.message);
        }
      },
      error: (error) => {
        debugger;
        alert('Error: ' + error);
      },
    });
  }
}
