import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HeaderComponent } from '../../components/header/header';
import { HeaderAdminComponent } from '../../components/header-admin/header-admin';
import { FooterComponent } from '../../components/footer/footer';

interface User {
  id?: string | number;
  nome: string;
  sobrenome?: string;
  email: string;
  senha: string;
  role: string;
}

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, HeaderAdminComponent, FooterComponent],
  templateUrl: './meu-perfil.html',
  styleUrls: ['./meu-perfil.css']
})
export class PerfilComponent implements OnInit {
  user: User | null = null;
  activeSection = 'visaoGeral';
  isLoading = true;
  userId = localStorage.getItem('userId');
  apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchUser();
  }

  fetchUser(): void {
    if (!this.userId) {
      console.warn('Nenhum userId encontrado no localStorage');
      this.isLoading = false;
      return;
    }

    this.http.get<User[]>(`${this.apiUrl}?id=${this.userId}`).subscribe({
      next: (res) => {
        if (res && res.length > 0) this.user = res[0];
        else console.warn('Usuário não encontrado.');
      },
      error: (err) => console.error('Erro ao carregar usuário:', err),
      complete: () => (this.isLoading = false)
    });
  }

  handleSave(): void {
    if (!this.user || !this.user.id) return;

    this.http.put(`${this.apiUrl}/${this.user.id}`, this.user).subscribe({
      next: () => alert('✅ Dados atualizados com sucesso!'),
      error: (err) => {
        console.error('Erro ao salvar dados:', err);
        alert('❌ Erro ao atualizar. Tente novamente.');
      }
    });
  }
}