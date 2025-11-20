import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.html',
  styleUrls: ['./search-bar.css']
})
export class SearchBarComponent {

  query: string = "";
  suggestions: any[] = [];

  // 🔗 Lista de cursos e rotas
  courses = [
    { name: "Programação Web", path: "/programacao-web" },
    { name: "Linguagens de Programação", path: "/linguagens-de-programacao" },
    { name: "Banco de Dados", path: "/banco-de-dados" },
    { name: "Informática", path: "/informatica" },
    { name: "Assinaturas", path: "/assinaturas" },
    { name: "Sobre", path: "/sobre" },
  ];

  constructor(private router: Router) { }

  handleChange() {
    const value = this.query.trim().toLowerCase();

    if (value === "") {
      this.suggestions = [];
      return;
    }

    this.suggestions = this.courses.filter(c =>
      c.name.toLowerCase().includes(value)
    );
  }

  handleSelect(path: string) {
    this.router.navigate([path]);
    this.query = "";
    this.suggestions = [];
  }

  handleSubmit(event: Event) {
    event.preventDefault();

    const found = this.courses.find(c =>
      c.name.toLowerCase().includes(this.query.toLowerCase())
    );

    if (found) {
      this.handleSelect(found.path);
    } else {
      alert("Curso não encontrado 😕");
    }
  }
}