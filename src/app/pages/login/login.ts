import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../components/header/header';
import { FooterComponent } from '../../components/footer/footer';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  meninaImg = 'assets/menina.png';

  credentials = {
    email: '',
    senha: ''
  };

  submitting = false;

  apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient, private router: Router) {}

  handleSubmit(event: Event) {
    event.preventDefault(); // evita reload
    this.login();
  }

  login() {
    this.submitting = true;

    this.http.get<any[]>(`${this.apiUrl}?email=${this.credentials.email}&senha=${this.credentials.senha}`)
      .subscribe({
        next: (res) => {
          if (res.length > 0) {
            const user = res[0];

            // salva ID e usuário completo
            localStorage.setItem('userId', user.id);
            localStorage.setItem('usuarioLogado', JSON.stringify(user));

            // redireciona para Meu Perfil
            this.router.navigate(['/']);
          } else {
            alert('E-mail ou senha incorretos!');
          }
        },
        error: () => {
          alert('Erro ao tentar fazer login.');
        },
        complete: () => {
          this.submitting = false;
        }
      });
  }

}
