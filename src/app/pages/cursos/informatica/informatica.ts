import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../components/header/header';
import { FooterComponent } from '../../../components/footer/footer';
import { CoursesService, Course } from '../../../service/courses/courses';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-informatica',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './informatica.html',
  styleUrls: ['./informatica.css']
})
export class InformaticaComponent implements OnInit {

  staticCourses: Course[] = [
    { title: "PowerPoint", level: "Avançado", duration: "80h", img: "assets/foto-cursos/powerpoint.png", color: "powerpoint" } as Course,
    { title: "Excel", level: "Básico", duration: "50h", img: "assets/foto-cursos/excel.png", color: "excel" } as Course,
    { title: "PowerBI", level: "Básico", duration: "40h", img: "assets/foto-cursos/powerbi.png", color: "powerbi" } as Course,
    { title: "Word", level: "Intermediário", duration: "60h", img: "assets/foto-cursos/word.png", color: "word" } as Course,
  ];

  infoCourses: Course[] = [];
  allCourses: Course[] = []; // ✅ nova array combinada

  constructor(private coursesService: CoursesService) { }

  async ngOnInit(): Promise<void> {
    try {
      const cursos = await firstValueFrom(this.coursesService.getCourses());
      const fetched = cursos
        .filter(c => c.category === 'info')
        .map(c => ({ ...c, color: this.getColorForTitle(c.title) } as Course));
      this.infoCourses = fetched;

      // Combina estáticos + do backend e remove duplicados
      this.allCourses = this.dedupeByTitle([...this.staticCourses, ...this.infoCourses]);
    } catch (error) {
      console.error("Erro ao carregar cursos:", error);
    }
  }

  private getColorForTitle(title: string): string {
    const t = (title || '').toLowerCase();
    if (t.includes('powerpoint')) return 'powerpoint';
    if (t.includes('excel')) return 'excel';
    if (t.includes('power bi') || t.includes('powerbi')) return 'powerbi';
    if (t.includes('word')) return 'word';
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
