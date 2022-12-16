import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { ISearch } from 'src/models/search';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input('searchOptions') options: ISearch[] = [];
  @Output() onSearchSubmit = new EventEmitter<Object>();
  @Output() onClearSubmit = new EventEmitter<any>();

  searchString: any;
  searchColumn: any;
  showError: Boolean = false;
  constructor() {
  }

  ngOnInit(): void {
  }


  handleSearch = () => {
    let payloadString = this.searchColumn + "=" + this.searchString;
    this.showError = !this.searchColumn || !this.searchString
    if (!this.showError) {
      this.onSearchSubmit.emit(payloadString);
    }
  }

  clearSearch = () => {
    this.searchColumn = null;
    this.searchString = '';
    this.onClearSubmit.emit();
  }

}
