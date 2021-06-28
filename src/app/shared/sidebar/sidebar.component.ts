import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {

  nombre = '';
  userSubs: Subscription;

  constructor( private authService: AuthService,
               private router: Router,
               private store: Store<AppState> ) { }

  ngOnInit(): void {
    this.userSubs = this.store.select('user')
                      .subscribe( ({ user }) => this.nombre = user?.nombre );
  }

  ngOnDestroy(): void {
    this.userSubs.unsubscribe();
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
