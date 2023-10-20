import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Login } from '../models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit, OnDestroy {

    form: any | null;
    model = new Login();

    constructor(
      private fb: FormBuilder,
      private service: UserService,
      private router: Router) {
    }

    signinForm = new FormGroup({
      userId: new FormControl("", [Validators.required, Validators.maxLength(20)]),
      password: new FormControl("", [Validators.required]),
    })

    getControl(name: any): AbstractControl | null {
      return this.signinForm.get(name);
    }

    ngOnInit(): void {

      this.form = this.fb.group({
        userId: ['', [Validators.required, Validators.maxLength(20)]],
        password: ['', [Validators.required]],
      }, {
      });
      
    }

    onSignin() {

      Object.assign(this.model, this.form.value);
      this.service.login(this.model).subscribe(data => this.saveSuccessHelper(data), error => this.saveFailedHelper(error));

    }

    private saveSuccessHelper(data: any) {
      this.router.navigate(['']);
      alert('Login Success!');
    }

    private saveFailedHelper(error: any) {
      alert('Login Failed!');
    }

    ngOnDestroy(): void {
    }


}
