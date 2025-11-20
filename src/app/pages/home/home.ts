import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '../../components/search-bar/search-bar';
import { CategoriesComponent } from '../../components/categories/categories';
import { AdvantagesComponent } from '../../components/advantages/advantages';
import { FooterComponent } from "../../components/footer/footer";
import { HeaderComponent } from "../../components/header/header";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SearchBarComponent, CategoriesComponent, AdvantagesComponent, FooterComponent, HeaderComponent],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent {}
