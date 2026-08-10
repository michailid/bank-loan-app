import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { Loan } from '../../services/loan';
import { ApplicantSummary } from '../../model/loan.model';
import { DatePipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-application-list',
  imports: [DatePipe, NgClass],
  templateUrl: './application-list.html',
  styleUrl: './application-list.css',
})
export class ApplicationList implements OnInit {
  loggedUser: any;
  loanService = inject(Loan);

  loanList: WritableSignal<ApplicantSummary[]> = signal<ApplicantSummary[]>([]);

  // 'all' or 'assigned'
  viewFilter: 'all' | 'assigned' = 'assigned';

  setViewFilter(filter: 'all' | 'assigned') {
    this.viewFilter = filter;
    this.loadApplications();
  }

  loadApplications() {
    if (this.viewFilter === 'all') {
      // fetch/show all applications
      alert('all applications');
    } else {
      alert('assigned to me');
      // fetch/show only applications assigned to loggedUser
      this.loanList.set(
        this.loanList().filter((loan) => {
          return loan.assignedToBankEmployee == this.loggedUser.userName;
        }),
      );
    }
  }

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
      // banker can see all applications
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
      next: (res: any) => {
        this.loanList.set(res.data);
      },
    });
  }
}
