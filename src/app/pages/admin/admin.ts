import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderAdminComponent } from '../../components/header-admin/header-admin';
import { FooterComponent } from '../../components/footer/footer';
import { CadastrarCursoComponent } from '../../components/cadastrar-cursos/cadastrar-cursos';

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [CommonModule, HeaderAdminComponent, CadastrarCursoComponent, FooterComponent],
  templateUrl: './admin.html',
  styleUrls: ['./admin.css']
})
export class DashboardAdminComponent { }