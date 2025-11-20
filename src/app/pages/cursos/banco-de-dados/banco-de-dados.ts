import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../components/header/header';
import { FooterComponent } from '../../../components/footer/footer';
import { CoursesService, Course } from '../../../service/courses/courses';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-banco-de-dados',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './banco-de-dados.html',
  styleUrls: ['./banco-de-dados.css'],
  encapsulation: ViewEncapsulation.None
})
export class BancoDeDadosComponent implements OnInit {

  staticCourses: Course[] = [
    { title: "MySQL", level: "Avançado", duration: "80h", img: "assets/foto-cursos/mysql.png", color: "mysql" } as Course,
    { title: "Oracle", level: "Básico", duration: "40h", img: "assets/foto-cursos/oracle.png", color: "oracle" } as Course,
    { title: "PostgreSQL", level: "Básico", duration: "40h", img: "assets/foto-cursos/postgre.png", color: "postgresql" } as Course,
    { title: "MongoDB", level: "Intermediário", duration: "60h", img: "assets/foto-cursos/mongodb.png", color: "mongodb" } as Course,
  ];

  dbCourses: Course[] = [];
  constructor(private coursesService: CoursesService) { }

  

  async ngOnInit(): Promise<void> {
    try {
      const cursos = await firstValueFrom(this.coursesService.getCourses());
      // obtiene do backend somente cursos de BD e assegura campo `color`
      const fetched = cursos
        .filter(c => c.category === 'bd')
        .map(c => ({ ...c, color: this.getColorForTitle(c.title) } as Course));
      this.dbCourses = fetched;
    } catch (error) {
      console.error("Erro ao carregar cursos:", error);
    }
  }

  // Retorna a lista combinada sem duplicatas (por título)
  get allCourses(): Course[] {
    const combined = [...this.staticCourses, ...this.dbCourses];
    const map = new Map<string, Course>();
    for (const c of combined) {
      const key = (c.title || '').toLowerCase().trim();
      if (!map.has(key)) map.set(key, c);
    }
    return Array.from(map.values());
  }

  private getColorForTitle(title: string): string {
    const t = (title || '').toLowerCase();
    if (t.includes('mysql')) return 'mysql';
    if (t.includes('oracle')) return 'oracle';
    if (t.includes('post') || t.includes('postgres')) return 'postgresql';
    if (t.includes('mongo')) return 'mongodb';
    return '';
  }
}
