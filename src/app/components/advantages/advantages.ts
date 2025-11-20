import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-advantages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './advantages.html',
  styleUrls: ['./advantages.css']
})
export class AdvantagesComponent {
  vantagens: string[] = [
    'Certificado de conclusão',
    'Suporte ao aluno',
    'Acesso vitalício'
  ];
}