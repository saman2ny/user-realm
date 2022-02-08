/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Component, OnInit } from '@angular/core';
import { DynTable, ItemsGroup, StatusType } from 'src/app/models/user-table';
import { RouterSegments } from 'src/app/models/router-segments';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { UsersService } from 'src/app/services/api/users.service';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UtilService } from 'src/app/services/util/util.service';
import { ErrorPageService } from 'src/app/services/util/error-page.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent extends OnDestroyMixin implements OnInit {
  users!: DynTable;
  RouterSegments = RouterSegments;
  filterSubscription!: Subscription;
  dataLoading!: boolean;
  itemsGroup!: ItemsGroup;
  statusType = StatusType;
  status!: string;
  StatusType = StatusType;

  pageSize = 10;
  currentPage = 1;
  pageSizeOptions = [5, 10, 25, 100];
  totalRows!: number;
  pageDetail!: { page: any; limit: any };

  constructor(private router: Router, private usersService: UsersService, private common: UtilService,
    private errorPageService: ErrorPageService) {
    super();
  }

  ngOnInit(): void {
    this.status = this.statusType.ADD;
    this.loadUsers();
  }
  loadAllDetail(event: number): void {
    this.loadUsers(event);
  }

  loadUsers(event?: any): void {
    this.dataLoading = true;
    this.pageDetail = event ? { page: event.currentPage, limit: event.pageSize } : { page: this.currentPage, limit: this.pageSize };
    if (this.filterSubscription) {
      this.filterSubscription.unsubscribe();
    }
    this.filterSubscription = this.usersService.getUserDetails(this.pageDetail)
      .pipe(
        finalize(() => {
          this.dataLoading = false;
        }),
        untilComponentDestroyed(this))
      .subscribe(users => {
        if (users) {
          this.itemsGroup = users;
          this.totalRows = this.itemsGroup.count;
          this.users = {
            columns: [
              {
                columnDef: 'id'
              },
              {
                columnDef: 'name'
              },
              {
                columnDef: 'createdAt'
              },
              {
                columnDef: 'avatar'
              },
              {
                columnDef: 'phone'
              },
              {
                columnDef: 'email'
              },
              {
                columnDef: 'remove'
              }
            ],
            data: this.itemsGroup.items
          };

        } else {
          this.errorPageService.show404Page();
        }

      }, error => this.errorPageService.show404Page());
  }
  goToAddUser(status: string): void {
    this.common.setStatus(status);
    this.router.navigateByUrl(this.RouterSegments.ADD_USERS);
  }

}


