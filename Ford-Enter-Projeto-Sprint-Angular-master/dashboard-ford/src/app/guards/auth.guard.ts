import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  
  const logadoLocal = localStorage.getItem('usuarioLogado');
  const logadoSessao = sessionStorage.getItem('usuarioLogado');

  if (logadoLocal === 'true' || logadoSessao === 'true') {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};