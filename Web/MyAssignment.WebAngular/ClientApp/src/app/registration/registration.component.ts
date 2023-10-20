import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
})
export class RegistrationComponent implements OnInit, OnDestroy {

  form: any | null;
  model = new User();
  emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  alphanumericRegex = /^[a-zA-Z0-9]*$/;
  numericPattern = /^\d+$/;

  constructor(
    private fb: FormBuilder,
    private service: UserService,
    private router: Router) {
  }

  //registrationForm = new FormGroup({
  //  userId: new FormControl("", [Validators.required, Validators.maxLength(20)]),
  //  name: new FormControl("", [Validators.required, Validators.maxLength(200)]),
  //  emailId: new FormControl(""),
  //  mobileNumber: new FormControl(""),
  //  password: new FormControl("", [Validators.required]),
  //})

  //getControl(name: any): AbstractControl | null {
  //  return this.registrationForm.get(name);
  //}

  ngOnInit(): void {

    this.form = this.fb.group({
      userId: ['', [Validators.required, Validators.maxLength(20), Validators.pattern(this.alphanumericRegex)]],
      name: ['', [Validators.required, Validators.maxLength(200)]],
      emailId: ['', [Validators.pattern(this.emailRegex)]],
      mobileNumber: ['', Validators.pattern(this.numericPattern)],
      password: ['', [Validators.required]],
    }, {
    });

  }

  onRegistration() {

    //this.model.userId = "Taif123";
    //this.model.name = "Mohammad Irfanul Haque";
    //this.model.emailId = "taif@gmail.com";
    //this.model.mobileNumber = "01912159377";
    //this.model.password = "123456";

    Object.assign(this.model, this.form.value);
    debugger
    this.service.registration(this.model).subscribe(data => this.saveSuccessHelper(data), error => this.saveFailedHelper(error));

  }

  private saveSuccessHelper(data: any) {
    alert('Registration Success!');
    this.router.navigate(['/login']);
  }

  private saveFailedHelper(error: any) {
    alert('Registration Failed!');
  }

  ngOnDestroy(): void {
  }

}
