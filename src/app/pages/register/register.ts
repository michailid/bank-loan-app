import { NgClass } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule, NgClass, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  http = inject(HttpClient);
  router = inject(Router);

  newAppForm: any = {
    userId: 0,
    userName: '',
    emailId: '',
    fullName: '',
    password: '',
  };

  loginObj: any = {
    userName: '',
    password: '',
  };

  confirmPwd: string = '';
  role: string = '';
  isLoginFormVisible = signal(false);

  setRole(role: string) {
    this.role = role;
  }

  toggleForms() {
    this.isLoginFormVisible.set(!this.isLoginFormVisible());
  }

  getApiUrlAsPerRole() {
    debugger;
    return this.role == 'Banker'
      ? 'https://api.freeprojectapi.com/api/BankLoan/RegisterAsBankUser'
      : 'https://api.freeprojectapi.com/api/BankLoan/RegisterCustomer';
  }

  onRegisterUser() {
    debugger;
    const url = this.getApiUrlAsPerRole();
    this.http.post(url, this.newAppForm).subscribe({
      next: (res: any) => {
        debugger;
        alert(res.message);
      },
      error: (error) => {
        debugger;
        alert('API error');
      },
    });
  }

  onLogin() {
    debugger;
    this.http.post('https://api.freeprojectapi.com/api/BankLoan/login', this.loginObj).subscribe({
      next: (res: any) => {
        debugger;
        if (res.result) {
          alert(res.message);
          localStorage.setItem('bankUser', JSON.stringify(res.data));
          this.router.navigateByUrl('home');
        } else {
          alert(res.message);
        }
      },
      error: (error) => {
        debugger;
        alert('API error');
      },
    });
  }
}
