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
  styleUrls: ['./informatica.css'],
})
export class InformaticaComponent implements OnInit {

  // imagens como variáveis
  powerpointImg = 'assets/foto-cursos/powerpoint.png';
  excelImg = 'assets/foto-cursos/excel.png';
  powerbiImg = 'assets/foto-cursos/powerbi.png';
  wordImg = 'assets/foto-cursos/word.png';

  staticCourses: Course[] = [];
  infoCourses: Course[] = [];

  constructor(private coursesService: CoursesService) { }

  async ngOnInit(): Promise<void> {
    try {
      // cursos fixos
      this.staticCourses = [
        { title: "PowerPoint", level: "Avançado", duration: "80h", img: this.powerpointImg, color: "powerpoint" } as Course,
        { title: "Excel", level: "Básico", duration: "50h", img: this.excelImg, color: "excel" } as Course,
        { title: "PowerBI", level: "Básico", duration: "40h", img: this.powerbiImg, color: "powerbi" } as Course,
        { title: "Word", level: "Intermediário", duration: "60h", img: this.wordImg, color: "word" } as Course,
      ];

      const cursos = await firstValueFrom(this.coursesService.getCourses());

      // cursos vindos do backend
      const fetched = cursos
        .filter(c => c.category === 'info')
        .filter(c => c.title.toLowerCase() !== "power bi") // BLOQUEIA
        .map(c => ({
          ...c,
          img: this.normalizeImg(c.img),
          color: this.getColorForTitle(c.title),
        }) as Course);


      this.infoCourses = fetched;

    } catch (error) {
      console.error("Erro ao carregar cursos:", error);
    }
  }

  // GETTER → combina sem duplicar (mesmo padrão do BancoDeDados)
  get allCourses(): Course[] {
    const combined = [...this.staticCourses, ...this.infoCourses];
    const map = new Map<string, Course>();

    for (const c of combined) {
      const key = (c.title || '').toLowerCase().trim();
      if (!map.has(key)) map.set(key, c);
    }

    return Array.from(map.values());
  }

  private getColorForTitle(title: string): string {
    const t = (title || '').toLowerCase();

    if (t.includes('powerpoint')) return 'powerpoint';
    if (t.includes('excel')) return 'excel';
    if (t.includes('powerbi') || t.includes('power bi')) return 'powerbi';
    if (t.includes('word')) return 'word';

    return '';
  }

  private normalizeImg(img?: string): string | undefined {
    if (!img) return undefined;
    return img.replace(/^\/assets\/cursos\//, 'assets/foto-cursos/');
  }
}
