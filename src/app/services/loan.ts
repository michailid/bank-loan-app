import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoanApplication } from '../model/loan.model';

@Injectable({
  providedIn: 'root',
})
export class Loan {
  http = inject(HttpClient);

  onSaveLoanApplication(obj: LoanApplication) {
    return this.http.post('https://api.freeprojectapi.com/api/BankLoan/AddNewApplication', obj);
  }

  getAllApplications() {
    return this.http.get('https://api.freeprojectapi.com/api/BankLoan/GetAllApplications');
  }

  getMyApplications(id: number) {
    return this.http.get(
      'https://api.freeprojectapi.com/api/BankLoan/GetMyApplications?customerId=' + id,
    );
  }
}
