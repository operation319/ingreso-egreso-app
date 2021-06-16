import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;


  constructor( private fb: FormBuilder,
               private authService: AuthService,
               private router: Router ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      contraseña: ['', Validators.required]
    });
  }

  login(): void {

    if  ( this.loginForm.invalid ) { return; }

    Swal.fire({
      title: 'Espere por favor!',
      didOpen: () => {
        Swal.showLoading();
      }
    });

    const { email, contraseña } = this.loginForm.value;

    this.authService.loginUsuario (email, contraseña)
    .then( credenciales => {
      console.log(credenciales);

      Swal.close();

      this.router.navigate(['/']);
    })
    .catch( err => Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: err.message,
    }));

  }

}
