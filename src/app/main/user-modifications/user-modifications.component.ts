/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { Observable, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { RouterSegments } from 'src/app/models/router-segments';
import { UsersService } from 'src/app/services/api/users.service';
import { UtilService } from 'src/app/services/util/util.service';
import { StatusType, ItemsGroup } from '../../models/user-table';


@Component({
  selector: 'app-user-modifications',
  templateUrl: './user-modifications.component.html',
  styleUrls: ['./user-modifications.component.scss']
})
export class UserModificationsComponent extends OnDestroyMixin implements OnInit {
  RouterSegments = RouterSegments;
  userForm!: FormGroup;
  userObjModel: any = {};
  StatusType = StatusType;
  status: any = {};

  filterSubscription!: Subscription;
  dataLoading!: boolean;
  toastrLoading!: boolean;

  selectedFileName: any = {};
  readonly maxSize = 104857600;

  constructor(private formBuilder: FormBuilder, private common: UtilService,
    private router: Router, private usersService: UsersService) {
    super();
  }

  ngOnInit(): void {
    this.buildForm();
    this.checkUserType();
  }

  checkUserType(): void {
    const userCheck = this.common.getUserDetails();
    const userStatus = this.common.getStatus();
    if (userStatus === this.StatusType.VIEW) {
      this.userObjModel = userCheck;
      this.userForm.disable();
      this.status = userStatus;
      this.dataLoading = false;
    } else if (userStatus === this.StatusType.EDIT) {
      this.userObjModel = userCheck;
      this.userForm.controls.email.disable();
      this.status = userStatus;
      this.dataLoading = false;
    }
    else if (userStatus === this.StatusType.ADD) {
      this.status = userStatus;
      this.userForm.controls.email.enable();
      this.dataLoading = false;
    }
    else {
      this.userList();
    }
  }

  userList(): void {
    this.router.navigateByUrl('/');
  }

  resetUser(): void {
    this.selectedFileName = {};
    this.userForm.reset();
  }

  configUser(status?: string): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    } else {

      if (status === this.StatusType.EDIT) {
        const httpUrl = this.usersService.updateUserDetailsId(this.userObjModel);
        this.callSubsricption(httpUrl);
      }

      if (status === this.StatusType.ADD) {
        const httpUrl = this.usersService.postUserDetails(this.userObjModel);
        this.callSubsricption(httpUrl);
      }

    }
  }
  callSubsricption(url: Observable<ItemsGroup>): void {
    if (this.filterSubscription) {
      this.filterSubscription.unsubscribe();
    }
    this.filterSubscription = url
      .pipe(
        finalize(() => {
          this.dataLoading = false;
        }),
        untilComponentDestroyed(this))
      .subscribe(result => {
        this.toastrLoading = true;
        this.dataLoading = true;
        setTimeout(() => {
          this.userList();
        }, 2000);

      });
  }
  private buildForm(): void {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.pattern(/^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/)])],
      phone: ['', Validators.required],
      avatar: ['', Validators.required],
      createdAt: ['', Validators.required],
    });
  }

}
