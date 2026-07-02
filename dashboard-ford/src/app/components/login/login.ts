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
  lembrarMeInput: boolean = false; // Guarda o estado do checkbox
  mensagemErro: string = '';

  ngOnInit(): void {
    // Verifica se a opção "Logar automaticamente" foi ativada em um login anterior
    const loginAutomatico = localStorage.getItem('usuarioLogado');
    
    if (loginAutomatico === 'true') {
      this.mensagemErro = '';
      this.router.navigate(['/home']);
    }
  }

  fazerLogin(event: Event) {
    event.preventDefault();

    if (this.usuarioInput === 'admin' && this.senhaInput === '123456') {
      this.mensagemErro = '';

      if (this.lembrarMeInput) {
        // Guarda no localStorage (permanece salvo mesmo se fechar o navegador)
        localStorage.setItem('usuarioLogado', 'true');
      } else {
        // Guarda apenas na sessão atual (apaga se fechar a aba ou navegador)
        sessionStorage.setItem('usuarioLogado', 'true');
      }

      this.router.navigate(['/home']);
    } else {
      this.mensagemErro = 'Usuário ou senha incorretos!';
    }
  }
}