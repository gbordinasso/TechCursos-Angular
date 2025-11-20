import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../components/header/header';
import { FooterComponent } from '../../../components/footer/footer';
import { CoursesService, Course } from '../../../service/courses/courses';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-programacao-web',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './programacao-web.html',
  styleUrls: ['./programacao-web.css']
})
export class ProgramacaoWebComponent implements OnInit {

  staticCourses: Course[] = [
    { title: "HTML5", level: "Avançado", duration: "60h", img: "assets/foto-cursos/html5.png", color: "html" } as Course,
    { title: "CSS3", level: "Básico", duration: "50h", img: "assets/foto-cursos/css3.png", color: "css" } as Course,
    { title: "JavaScript", level: "Avançado", duration: "90h", img: "assets/foto-cursos/javascript.png", color: "javascript" } as Course,
    { title: "React", level: "Básico", duration: "40h", img: "assets/foto-cursos/react.png", color: "react" } as Course,
  ];

  pwCourses: Course[] = [];
  allCourses: Course[] = [];

  constructor(private coursesService: CoursesService) { }

  async ngOnInit(): Promise<void> {
    try {
      const cursos = await firstValueFrom(this.coursesService.getCourses());
      const fetched = cursos
        .filter(c => c.category === 'pw')
        .map(c => ({ ...c, color: this.getColorForTitle(c.title) } as Course));
      this.pwCourses = fetched;
      // dedupe por título
      this.allCourses = this.dedupeByTitle([...this.staticCourses, ...this.pwCourses]);
    } catch (error) {
      console.error("Erro ao carregar cursos:", error);
    }

  }

  private getColorForTitle(title: string): string {
    const t = (title || '').toLowerCase();
    if (t.includes('html')) return 'html';
    if (t.includes('css')) return 'css';
    if (t.includes('javascript') || t.includes('js')) return 'javascript';
    if (t.includes('react')) return 'react';
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