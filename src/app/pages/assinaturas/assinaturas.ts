import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header';
import { FooterComponent } from '../../components/footer/footer';

interface Plano {
  titulo: string;
  preco: string;
  detalhe: string;
  lista: string[];
  cor?: string;
}

@Component({
  selector: 'app-pagamento',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './assinaturas.html',
  styleUrls: ['./assinaturas.css']
})
export class AssinaturaComponent {
  planos: Plano[] = [
    {
      titulo: 'ASSINATURA MENSAL',
      preco: 'R$ 28,90',
      detalhe: '1 crédito mensal para certificados',
      lista: ['Suporte ao aluno', 'Navegação sem anúncios', 'Aulas exclusivas']
    },
    {
      titulo: 'ASSINATURA ANUAL',
      preco: 'R$ 29,90',
      detalhe: 'ou R$ 289,90 à vista',
      lista: ['12 créditos ativados imediatamente', 'Suporte ao aluno', 'Navegação sem anúncios', 'Acesso vitalício'],
      cor: 'anual'
    },
    {
      titulo: 'ASSINATURA PREMIUM',
      preco: 'R$ 49,90',
      detalhe: 'ou R$ 588 à vista',
      lista: ['Certificados ilimitados', 'Suporte ao aluno', 'Navegação sem anúncios', 'Acesso vitalício', 'Materiais extras exclusivos'],
      cor: 'premium'
    }
  ];
}