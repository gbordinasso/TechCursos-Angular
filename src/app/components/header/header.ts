import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent implements OnInit {

  usuario: any = null;
  mostrarLogout = false;
  logo = 'assets/logo/logo.png';

  constructor(private router: Router) {}

  ngOnInit(): void {
    const user = localStorage.getItem('usuarioLogado');
    if (user) this.usuario = JSON.parse(user);
  }

  toggleMenu(): void {
    this.mostrarLogout = !this.mostrarLogout;
  }

  logout(): void {
    localStorage.removeItem('usuarioLogado');
    this.usuario = null;
    this.router.navigate(['/login']);
  }

  irParaPerfil(): void {
    this.router.navigate(['/meu-perfil']);
  }

  irParaMeusCursos(): void {
    this.router.navigate(['/meus-cursos']);
  }

  @HostListener('document:click', ['$event'])
  fecharMenuAoClicarFora(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.usuario-menu')) {
      this.mostrarLogout = false;
    }
  }
}