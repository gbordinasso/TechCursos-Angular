import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdvantagesComponent } from "./components/advantages/advantages";
import { HeaderAdminComponent } from "./components/header-admin/header-admin";
import { HeaderComponent } from "./components/header/header";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AdvantagesComponent, HeaderAdminComponent, HeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('TechCursos');
}
