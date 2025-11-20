import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router'; // Importa RouterLink para navegação

// Interface para tipar a estrutura de dados
interface Categoria {
  nome: string;
  icon: string;
  to: string | null; // Pode ser nulo, embora todos no seu exemplo tenham um caminho
}

@Component({
  selector: 'app-categories',
  imports: [CommonModule, RouterLink],
  standalone: true,
  templateUrl: './categories.html',
  styleUrls: ['./categories.css'],
})
export class CategoriesComponent {
  
  // Array de dados estáticos migrados do JSX
  categorias: Categoria[] = [
    { nome: "Linguagens de programação", icon: "💻", to: "/cursos/linguagem-programacao" },
    { nome: "Banco de dados", icon: "🗄️", to: "/cursos/banco-de-dados" },
    { nome: "Desenvolvimento web", icon: "⚙️", to: "/cursos/programacao-web" },
    { nome: "Informática", icon: "ℹ️", to: "/cursos/informatica" },
  ];

  constructor() {}
}
