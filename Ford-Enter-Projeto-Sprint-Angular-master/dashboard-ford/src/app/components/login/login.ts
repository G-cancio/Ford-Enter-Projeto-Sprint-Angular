import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})

export class Login implements OnInit {
  private router = inject(Router);

  usuarioInput: string = '';
  senhaInput: string = '';
  lembrarMeInput: boolean = false;
  mensagemErro: string = '';

  ngOnInit(): void {
    const logadoLocal = localStorage.getItem('usuarioLogado');
    const logadoSessao = sessionStorage.getItem('usuarioLogado');
  
    if (logadoLocal === 'true' || logadoSessao === 'true') {
      this.mensagemErro = '';
      this.router.navigate(['/home']);
    }
  }

  fazerLogin(event: Event) {
    event.preventDefault();

    if (this.usuarioInput === 'admin' && this.senhaInput === '123456') {
      this.mensagemErro = '';

      if (this.lembrarMeInput) {
        localStorage.setItem('usuarioLogado', 'true');
      } else {
        sessionStorage.setItem('usuarioLogado', 'true');
      }

      this.router.navigate(['/home']);
    } else {
      this.mensagemErro = 'Usuário ou senha incorretos!';
    }
  }
}