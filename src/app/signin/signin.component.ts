import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular5-social-login';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
  
})
export class SigninComponent implements OnInit {
  SignInForm: FormGroup;
  RegisterForm: FormGroup;
  loginError: boolean = false;
  errorMsg: string = '';
  registerErrorMsg: string = '';
  loginMode: boolean = true;
  constructor( private socialAuthService: AuthService,
    private apiService: ApiserviceService) {}
  
  public socialSignIn(socialPlatform : string) {
    let socialPlatformProvider;
    if(socialPlatform == "facebook"){
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if(socialPlatform == "google"){
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform+" sign in data : " , userData);
        localStorage.setItem('auth', JSON.stringify(userData));        
        this.apiService.setLogin();
        location.reload();
      }
    );
    
  }

  ngOnInit() {
    this.SignInForm = new FormGroup({
      'email' : new FormControl('', [Validators.required, Validators.email]),
      'password' : new FormControl('', Validators.required)
    });
    this.RegisterForm = new FormGroup({
      'name' : new FormControl('', [Validators.required]),
      'email' : new FormControl('', [Validators.required, Validators.email]),
      'password' : new FormControl('', [Validators.required,Validators.minLength(8),Validators.maxLength(50)]),
      'password2' : new FormControl('', Validators.required)
    });
  }
  registerUser() {
    console.log("started");
    if (this.RegisterForm.valid) {
        this.apiService.registerUser({name: this.RegisterForm.value.name,
          email: this.RegisterForm.value.email,
          password: this.RegisterForm.value.password
        }).subscribe(res => {
          if (res['status'] === 200) {
            this.registerErrorMsg = 'Registration successfull';
          }
          if (res['status'] === 400) {
            this.registerErrorMsg = 'email already registered';
          }
        });
    } else {
      this.RegisterForm.controls.email.markAsTouched();
      this.RegisterForm.controls.name.markAsTouched();
      this.RegisterForm.controls.password.markAsTouched();
      this.RegisterForm.controls.password2.markAsTouched();
    }
  }
  localLogin() {
    let status;
    this.loginError = false;
    if (this.SignInForm.valid) {
      let data = this.apiService.localLogin(this.SignInForm.value.email,this.SignInForm.value.password).toPromise().then(val=>{
        status = val['status']; 
        if (status === 200) {
          val['user']['image'] = '';
          localStorage.setItem('auth',JSON.stringify(val['user']));
          location.reload();
        } else {
          this.loginError = true;
          console.log(status, status === 401);
          if (status === 402) {
            this.errorMsg = 'username or password is incorrect';
          }
          if (status === 401 ) {
            this.errorMsg = "email is not registered";
          }
        }
        
      });
    } else {
        
      
      this.SignInForm.controls.email.markAsTouched();
      this.SignInForm.controls.password.markAsTouched();
    }
  }
}
