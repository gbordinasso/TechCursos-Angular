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
  
  // imagens fixas
  html5Img = 'assets/foto-cursos/html5.png';
  css3Img = 'assets/foto-cursos/css3.png';
  jsImg = 'assets/foto-cursos/javascript.png';
  reactImg = 'assets/foto-cursos/react.png';

  staticCourses: Course[] = [];
  pwCourses: Course[] = [];

  constructor(private coursesService: CoursesService) {}

  async ngOnInit(): Promise<void> {
    try {
      // cursos fixos
      this.staticCourses = [
        { title: "HTML5", level: "Avançado", duration: "60h", img: this.html5Img, color: "html" } as Course,
        { title: "CSS3", level: "Básico", duration: "50h", img: this.css3Img, color: "css" } as Course,
        { title: "JavaScript", level: "Avançado", duration: "90h", img: this.jsImg, color: "javascript" } as Course,
        { title: "React", level: "Básico", duration: "40h", img: this.reactImg, color: "react" } as Course,
      ];

      const cursos = await firstValueFrom(this.coursesService.getCourses());

      // pega só cursos PW do backend
      const fetched = cursos
        .filter(c => c.category === 'pw')
        .map(c => ({
          ...c,
          img: this.normalizeImg(c.img),
          color: this.getColorForTitle(c.title)
        }));

      this.pwCourses = fetched;

    } catch (error) {
      console.error("Erro ao carregar cursos:", error);
    }
  }

  // Lista final: estáticos + backend, sem duplicatas
  get allCourses(): Course[] {
    const combined = [...this.staticCourses, ...this.pwCourses];
    const map = new Map<string, Course>();

    for (const c of combined) {
      const key = (c.title || '').toLowerCase().trim();
      if (!map.has(key)) map.set(key, c);
    }

    return Array.from(map.values());
  }

  private getColorForTitle(title: string): string {
    const t = (title || '').toLowerCase();
    if (t.includes('html')) return 'html';
    if (t.includes('css')) return 'css';
    if (t.includes('javascript') || t.includes('js')) return 'javascript';
    if (t.includes('react')) return 'react';
    return '';
  }

  private normalizeImg(img?: string): string | undefined {
    if (!img) return undefined;
    return img.replace(/^\/assets\/cursos\//, 'assets/foto-cursos/');
  }
}
