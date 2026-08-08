import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { Loan } from '../../services/loan';
import { ApplicantSummary } from '../../model/loan.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-application-list',
  imports: [DatePipe],
  templateUrl: './application-list.html',
  styleUrl: './application-list.css',
})
export class ApplicationList implements OnInit {
  loggedUser: any;
  loanService = inject(Loan);

  loanList: WritableSignal<ApplicantSummary[]> = signal<ApplicantSummary[]>([]);

  constructor() {
    const local = localStorage.getItem('bankUser');
    if (local != null) {
      this.loggedUser = JSON.parse(local);
    }
  }

  ngOnInit(): void {
    if (this.loggedUser.role == 'Customer') {
      this.getMyApplications();
    } else {
      this.getAllApplications();
    }
  }

  getAllApplications() {
    this.loanService.getAllApplications().subscribe({
      next: (res: any) => {
        this.loanList.set(res.data);
      },
    });
  }

  getMyApplications() {
    this.loanService.getMyApplications(this.loggedUser.userId).subscribe({
      next: (res) => {},
    });
  }
}
