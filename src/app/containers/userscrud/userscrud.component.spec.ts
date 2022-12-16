import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';

import { UserscrudComponent } from './userscrud.component';

class MockRouter {
  navigateByUrl(url: string): string { return url; }
}

describe('UserscrudComponent', () => {
  let component: UserscrudComponent;
  let fixture: ComponentFixture<UserscrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserscrudComponent],
      imports: [BrowserAnimationsModule, HttpClientModule, ReactiveFormsModule, FormsModule, MatSnackBarModule],
      providers: [{ provide: Router, useClass: MockRouter }],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserscrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Users form invalid when empty', () => {
    expect(component.usersForm.valid).toBeFalsy();
  });

  it('Submit Login form data with Invalid email and password', () => {
    component.usersForm.get('firstname')?.setValue('Jiten');
    component.usersForm.get('lastname')?.setValue('Jani');
    component.usersForm.get('email')?.setValue('jiten@irobot.com');
    component.usersForm.get('contact')?.setValue('9898785862');

    component.onUserFormSubmit();

  });
});
