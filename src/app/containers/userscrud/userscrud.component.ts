import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApiserviceService } from 'src/services/apiservice.service';


@Component({
  selector: 'app-userscrud',
  templateUrl: './userscrud.component.html',
  styleUrls: ['./userscrud.component.scss']
})
export class UserscrudComponent implements OnInit, OnDestroy {

  usersForm!: FormGroup;
  submitted = false;
  userID: number = 0;
  user: any;
  private ngUnsubscribe = new Subject<void>();
  isEdit: boolean = false;

  constructor(private ApiService: ApiserviceService, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private _snackBar: MatSnackBar) { }

  public handleError = (control: string, error: string) => {
    return this.usersForm.controls[control].hasError(error);
  }

  ngOnInit(): void {
    //get id from param
    this.userID = Number(this.route?.snapshot?.paramMap?.get('id'));
    this.isEdit = this.route?.snapshot?.paramMap?.get('action') !== 'create';

    //build a form
    this.buildForm();

    //get user details if param has id
    if (this.userID) {
      this.getUserByID();
    }
  };

  buildForm = () => {
    this.usersForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      contact: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  getUserByID = () => {
    this.ApiService.getUserDetails(this.userID)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(userData => {
        this.user = userData;

        //setting values to form after getting user data
        this.usersForm.controls['firstname'].setValue(this.user.firstname);
        this.usersForm.controls['lastname'].setValue(this.user.lastname);
        this.usersForm.controls['email'].setValue(this.user.email);
        this.usersForm.controls['contact'].setValue(this.user.contact);
      });
  }

  onUserFormSubmit = () => {
    this.submitted = true;
    // stop here if form is invalid
    if (this.usersForm.invalid) {
      return;
    }

    if (!this.isEdit) {
      this.ApiService.createUser(this.usersForm.value).subscribe((data) => {
        this._snackBar.open('User created successfully...', '', {
          duration: 2000,
        });
        this.router.navigateByUrl('/users')
      }, (error) => {
        console.log(error);
      });
    } else {
      this.ApiService.updateUser(this.userID, this.usersForm.value).subscribe((data) => {
        this._snackBar.open('User update successfully...', '', {
          duration: 2000,
        });
        this.router.navigateByUrl('/users')
      }, (error) => {
        console.log(error);
      });
    }


  }
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
