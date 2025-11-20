// src/app/app.routes.ts

import { Routes } from '@angular/router';
import { CadastrarCursoComponent } from './components/cadastrar-cursos/cadastrar-cursos';
import { adminGuard } from './components/admin-guard/admin-guard';
import { LoginComponent } from './pages/login/login';
import { CadastroComponent } from './pages/cadastro/cadastro';
import { BancoDeDadosComponent } from './pages/cursos/banco-de-dados/banco-de-dados';
import { InformaticaComponent } from './pages/cursos/informatica/informatica';
import { LinguagensProgramacaoComponent } from './pages/cursos/linguagem-programacao/linguagem-programacao';
import { ProgramacaoWebComponent } from './pages/cursos/programacao-web/programacao-web';
import { SobreComponent } from './pages/sobre/sobre';
import { AssinaturaComponent } from './pages/assinaturas/assinaturas';
import { DashboardAdminComponent } from './pages/admin/admin';
import { ErrorPageComponent } from './pages/error/error';
import { HomeComponent } from './pages/home/home';
import { PerfilComponent } from './pages/meu-perfil/meu-perfil';


export const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'login', component: LoginComponent },
    { path: 'cadastro', component: CadastroComponent },
    { path: 'cursos/banco-de-dados', component: BancoDeDadosComponent },
    { path: 'cursos/informatica', component: InformaticaComponent },
    { path: 'cursos/linguagem-programacao', component: LinguagensProgramacaoComponent },
    { path: 'cursos/programacao-web', component: ProgramacaoWebComponent },
    { path: 'sobre', component: SobreComponent },
    { path: 'assinaturas', component: AssinaturaComponent },
    { path: 'admin', component: DashboardAdminComponent, canActivate: [adminGuard]},
    { path: 'cadastrar-cursos', component: CadastrarCursoComponent, canActivate: [adminGuard] },
    { path: 'meu-perfil', component: PerfilComponent},
    { path: '**', component: ErrorPageComponent }
];