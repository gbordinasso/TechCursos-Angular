import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = () => {
  const router = inject(Router);

  const usuarioJson = localStorage.getItem('usuarioLogado');
  if (!usuarioJson) {
    router.navigate(['/']);
    return false;
  }

  try {
    const usuario = JSON.parse(usuarioJson);
    if (usuario?.role === 'admin') {
      return true;
    }
  } catch {
    // JSON inválido — redireciona
  }

  router.navigate(['/']);
  return false;
};