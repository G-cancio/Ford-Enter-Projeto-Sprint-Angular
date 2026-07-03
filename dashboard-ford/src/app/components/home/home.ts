import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  private router = inject(Router);

  toggleSidebar() {
    const sidebar = document.getElementById('sidebarMenu');
    if (sidebar) {
      sidebar.classList.toggle('fechada');
    }
  }

  irParaHome() {
    this.router.navigate(['/home']);
  }

  irParaDashboard() {
    this.router.navigate(['/dashboard']);
  }

  logout() {
    localStorage.removeItem('usuarioLogado');
    sessionStorage.removeItem('usuarioLogado');
    this.router.navigate(['/login']);
  }
}