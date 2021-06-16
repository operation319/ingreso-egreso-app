import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  registroForm: FormGroup;

  constructor( private fb: FormBuilder,
               private authService: AuthService,
               private router: Router ) { }

  ngOnInit(): void {

    this.registroForm = this.fb.group({
      nombre:      ['',  Validators.required],
      correo:      ['', [Validators.required, Validators.email]],
      contraseña:  ['',  Validators.required],
    });

  }

  // tslint:disable-next-line: typedef
  crearUsuario() {

    if (this.registroForm.invalid) { return; }

    Swal.fire({
      title: 'Espere por favor!',
      didOpen: () => {
        Swal.showLoading();
      }
    });

    const { nombre, correo, contraseña } = this.registroForm.value;

    this.authService.crearUsuario (nombre, correo, contraseña)
      .then( credenciales => {
        console.log(credenciales);

        Swal.close();
        this.router.navigate(['/']);
      })
      .catch( err => Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message
      }));

  }

}
