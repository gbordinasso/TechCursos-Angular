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

  // imagens como variáveis
  pythonImg = 'assets/foto-cursos/python.png';
  javaImg = 'assets/foto-cursos/java.png';
  csharpImg = 'assets/foto-cursos/csharp.png';
  rubyImg = 'assets/foto-cursos/ruby.png';

  staticCourses: Course[] = [];
  lpCourses: Course[] = [];

  constructor(private coursesService: CoursesService) {}

  async ngOnInit(): Promise<void> {
    try {

      // cursos estáticos
      this.staticCourses = [
        { title: "Python", level: "Avançado", duration: "80h", img: this.pythonImg, color: "python" } as Course,
        { title: "Java", level: "Básico", duration: "40h", img: this.javaImg, color: "java" } as Course,
        { title: "C#", level: "Básico", duration: "40h", img: this.csharpImg, color: "csharp" } as Course,
        { title: "Ruby", level: "Básico", duration: "40h", img: this.rubyImg, color: "ruby" } as Course,
      ];

      const cursos = await firstValueFrom(this.coursesService.getCourses());

      // backend filtrado + normalizado
      const fetched = cursos
        .filter(c => c.category === 'lp')
        .map(c => ({
          ...c,
          img: this.normalizeImg(c.img),
          color: this.getColorForTitle(c.title)
        }) as Course);

      this.lpCourses = fetched;

    } catch (error) {
      console.error("Erro ao carregar cursos:", error);
    }
  }

  // mesma lógica do BancoDeDadosComponent
  get allCourses(): Course[] {
    const combined = [...this.staticCourses, ...this.lpCourses];
    const map = new Map<string, Course>();

    for (const c of combined) {
      const key = (c.title || '').toLowerCase().trim();
      if (!map.has(key)) map.set(key, c);
    }

    return Array.from(map.values());
  }

  private getColorForTitle(title: string): string {
    const t = (title || '').toLowerCase();
    if (t.includes('python')) return 'python';
    if (t.includes('java')) return 'java';
    if (t.includes('c#') || t.includes('csharp')) return 'csharp';
    if (t.includes('ruby')) return 'ruby';
    return '';
  }

  private normalizeImg(img?: string): string | undefined {
    if (!img) return undefined;
    return img.replace(/^\/assets\/cursos\//, 'assets/foto-cursos/');
  }
}
