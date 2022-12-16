import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { IUsers } from 'src/models/users';
import { ApiserviceService } from 'src/services/apiservice.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  isLoading: Boolean = false;
  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'email', 'contact', 'Action'];
  dataSource: any;
  searchOptions = [
    { key: 'firstname', value: 'First Name' },
    { key: 'lastname', value: 'Last Name' },
    { key: 'email', value: 'Email' },
    { key: 'contact', value: 'Contact' },
  ];

  constructor(private ApiSerice: ApiserviceService, private router: Router, private _snackBar: MatSnackBar, private ApiService: ApiserviceService) { }

  getUsersList = () => {
    this.isLoading = true;
    this.ApiSerice.getUsersList().subscribe((data: any) => {
      this.isLoading = false;
      this.dataSource = data || [];
    }, (error) => {
      this.isLoading = false;
      console.log(error);
    });
  }

  ngOnInit(): void {
    this.getUsersList();
  }

  handleEdit = (row: IUsers) => {
    this.router.navigateByUrl('users/edit/' + row.id);
  }

  handleDelete = (row: IUsers) => {
    this.ApiService.deleteUser(row.id).subscribe((data) => {
      this._snackBar.open('User deleted successfully...', '', {
        duration: 2000,
      });
      this.getUsersList();
    }, (error) => {
      console.log(error);
    });
  }

  handleCreateUserClick = () => {
    this.router.navigateByUrl('/users/create');
  }

  onSearchHandler = (payloadString: any) => {
    this.isLoading = true;
    this.ApiSerice.filterUserList(payloadString).subscribe((data) => {
      this.dataSource = data || [];
      this.isLoading = false;
    }, (error) => {
      this.isLoading = false;
      console.log(error);
    })
  }

  onClearHandler = () => {
    this.getUsersList();
  }
}
