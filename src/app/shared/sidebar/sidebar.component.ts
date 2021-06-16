import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  constructor( private authService: AuthService,
               private router: Router ) { }

  ngOnInit(): void {
  }


  logout(): void {

    Swal.fire({
      title: 'Cerrando sesión!',
      timer: 500,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    this.authService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }

}
