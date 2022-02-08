import { Component, ViewChild, OnInit, Input, OnChanges, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DynTable, StatusType } from '../../models/user-table';
import { RouterSegments } from 'src/app/models/router-segments';
import { Router } from '@angular/router';
import { UtilService } from 'src/app/services/util/util.service';
import { finalize } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/services/api/users.service';


@Component({
  selector: 'app-mat-table',
  templateUrl: './mat-table.component.html',
  styleUrls: ['./mat-table.component.scss']
})
export class MatTableComponent extends OnDestroyMixin implements OnInit, OnChanges, AfterViewInit {
  @Input() users!: DynTable;
  @Input() totalRows!: number;
  @Input() pageSizeOptions!: number[];
  @Input() currentPage!: number;
  @Input() pageSize!: number;
  @Output() loadPage = new EventEmitter();


  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatTable, { static: true }) matTable!: MatTable<any>;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  RouterSegments = RouterSegments;
  StatusType = StatusType;

  displayedColumns: any;
  dataSource: any;
  status!: string;
  dataLoading!: boolean;
  filterSubscription!: Subscription;

  toastrLoading!: boolean;


  constructor(private usersService: UsersService, private router: Router, private common: UtilService) {
    super();
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.processingData();
  }

  ngAfterViewInit(): void {
    this.processingData();
  }

  processingData(): void {
    setTimeout(() => {
      this.displayedColumns = this.users.columns.map(c => c.columnDef);
      this.dataSource = new MatTableDataSource(this.users.data);
    }, 1000);


  }

  removeAt(element: string, index: number): void {
    this.dataLoading = true;
    if (this.filterSubscription) {
      this.filterSubscription.unsubscribe();
    }
    this.filterSubscription = this.usersService.deleteUserDetailsId(element)
      .pipe(
        finalize(() => {
          this.dataLoading = false;
        }),
        untilComponentDestroyed(this))
      .subscribe(result => {
        const data = this.dataSource.data;
        data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
        this.dataSource.data = data;
        const pageDetail = { currentPage: this.currentPage, pageSize: this.pageSize };
        this.toastrLoading = true;
        this.loadPage.emit(pageDetail);

      });

  }

  ViewAt(element: string, status: string): void {
    this.common.setStatus(status);
    this.common.setUserDetails(element);
    this.router.navigateByUrl(this.RouterSegments.ADD_USERS);
  }

  updateAt(element: string, status: string): void {
    this.common.setStatus(status);
    this.common.setUserDetails(element);
    this.router.navigateByUrl(this.RouterSegments.ADD_USERS);
  }

  pageChanged(event: PageEvent): void {
    this.dataLoading = true;
    this.pageSize = event.pageSize;
    if (event.pageIndex === 0) {
      this.currentPage = 1;
    } else {
      this.currentPage = event.pageIndex;
    }
    const pageDetail = { currentPage: this.currentPage, pageSize: this.pageSize };
    this.loadPage.emit(pageDetail);
    this.dataLoading = false;
  }

}
