import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HeaderAdminComponent } from '../header-admin/header-admin';
import { FooterComponent } from '../footer/footer';

interface Curso {
  id?: string | number;
  img: string;
  title: string;
  description?: string;
  level: string;
  duration?: string | number;
  category: string;
}

@Component({
  selector: 'app-cadastrar-curso',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderAdminComponent, FooterComponent],
  templateUrl: './cadastrar-cursos.html',
  styleUrls: ['./cadastrar-cursos.css']
})
export class CadastrarCursoComponent implements OnInit {

  apiUrl = 'http://localhost:3000/courses';

  curso: Curso = {
    img: '',
    title: '',
    description: '',
    level: '',
    duration: '',
    category: ''
  };

  cursos: Curso[] = [];
  enviando = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.carregarCursos();
  }

  carregarCursos(): void {
    this.http.get<Curso[]>(this.apiUrl).subscribe({
      next: (res) => this.cursos = res,
      error: (err) => {
        console.error(err);
        window.alert('Erro ao carregar cursos!');
      }
    });
  }

  handleChangeField(field: keyof Curso, value: any) {
    (this.curso as any)[field] = value;
  }

  async handleSubmit(event: Event) {
    event.preventDefault();
    if (!this.curso.title || !this.curso.level || !this.curso.img || !this.curso.category) {
      window.alert('Preencha todos os campos!');
      return;
    }

    this.enviando = true;

    this.http.post<Curso>(this.apiUrl, this.curso).subscribe({
      next: () => {
        window.alert('Curso cadastrado com sucesso!');
        this.curso = {
          img: '',
          title: '',
          description: '',
          level: '',
          duration: '',
          category: ''
        };
        this.carregarCursos();
      },
      error: (err) => {
        console.error(err);
        window.alert('Erro ao cadastrar curso!');
      },
      complete: () => {
        this.enviando = false;
      }
    });
  }

  handleDelete(id: string | number) {
    if (!confirm('Tem certeza que deseja excluir este curso?')) return;

    this.http.delete(`${this.apiUrl}/${id}`).subscribe({
      next: () => {
        window.alert('Curso removido!');
        this.carregarCursos();
      },
      error: (err) => {
        console.error(err);
        window.alert('Erro ao excluir curso!');
      }
    });
  }
}