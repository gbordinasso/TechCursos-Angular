import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../components/header/header';
import { FooterComponent } from '../../../components/footer/footer';
import { CoursesService, Course } from '../../../service/courses/courses';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-linguagens-programacao',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './linguagem-programacao.html',
  styleUrls: ['./linguagem-programacao.css']
})
export class LinguagensProgramacaoComponent implements OnInit {

  staticCourses: Course[] = [
    { title: "Python", level: "Avançado", duration: "80h", img: "assets/foto-cursos/python.png", color: "python" } as Course,
    { title: "Java", level: "Básico", duration: "40h", img: "assets/foto-cursos/java.png", color: "java" } as Course,
    { title: "C#", level: "Básico", duration: "40h", img: "assets/foto-cursos/csharp.png", color: "csharp" } as Course,
    { title: "Ruby", level: "Básico", duration: "40h", img: "assets/foto-cursos/ruby.png", color: "ruby" } as Course,
  ];

  lpCourses: Course[] = [];
  allCourses: Course[] = [];

  constructor(private coursesService: CoursesService) { }

  async ngOnInit(): Promise<void> {
    try {
      const cursos = await firstValueFrom(this.coursesService.getCourses());
      const fetched = cursos
        .filter(c => c.category === 'lp')
        .map(c => ({ ...c, color: this.getColorForTitle(c.title) } as Course));
      this.lpCourses = fetched;
      this.allCourses = this.dedupeByTitle([...this.staticCourses, ...this.lpCourses]);
    } catch (error) {
      console.error("Erro ao carregar cursos:", error);
    }
  }

  private getColorForTitle(title: string): string {
    const t = (title || '').toLowerCase();
    if (t.includes('python')) return 'python';
    if (t.includes('java')) return 'java';
    if (t.includes('c#') || t.includes('csharp')) return 'csharp';
    if (t.includes('ruby')) return 'ruby';
    return '';
  }

  private dedupeByTitle(list: Course[]): Course[] {
    const map = new Map<string, Course>();
    for (const c of list) {
      const key = (c.title || '').toLowerCase().trim();
      if (!map.has(key)) map.set(key, c);
    }
    return Array.from(map.values());
  }
}