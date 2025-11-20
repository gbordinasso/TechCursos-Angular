import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-admin',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header-admin.html',
  styleUrls: ['./header-admin.css']
})
export class HeaderAdminComponent implements OnInit {

  usuario: any = null;
  mostrarLogout = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const user = localStorage.getItem('usuarioLogado');
    if (user) {
      this.usuario = JSON.parse(user);
    }
  }

  toggleMenu() {
    this.mostrarLogout = !this.mostrarLogout;
  }

  handleLogout() {
    localStorage.removeItem('usuarioLogado');
    this.usuario = null;
    this.router.navigate(['/login']);
  }

  @HostListener('document:click', ['$event'])
  fecharMenuAoClicarFora(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.usuario-menu')) {
      this.mostrarLogout = false;
    }
  }

  irParaPerfil() {
    this.router.navigate(['/meu-perfil']);
  }

  irParaCadastrarCurso() {
    this.router.navigate(['/cadastrar-cursos']);
  }
}