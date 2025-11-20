import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HeaderComponent } from '../../components/header/header';
import { FooterComponent } from '../../components/footer/footer';
import { UserService, UserPayload } from '../../service/user/user';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent, FooterComponent],
  templateUrl: './cadastro.html',
  styleUrls: ['./cadastro.css']
})

export class CadastroComponent {

  meninaImg = 'assets/menina.png';

  form: FormGroup;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.form = this.fb.group({
      id: [''],
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      emailConfirm: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      senhaConfirm: ['', Validators.required]
    });
  }

  enviar() {
    if (this.form.invalid) {
      alert("Preencha todos os campos corretamente.");
      return;
    }

    const { email, emailConfirm, senha, senhaConfirm } = this.form.value;

    if (email !== emailConfirm) {
      alert("Os e-mails não coincidem!");
      return;
    }

    if (senha !== senhaConfirm) {
      alert("As senhas não coincidem!");
      return;
    }

    this.submitting = true;

    const novoUsuario: UserPayload = {
      nome: this.form.value.nome,
      sobrenome: this.form.value.sobrenome,
      email: this.form.value.email,
      senha: this.form.value.senha
    };

    const id = this.form.value.id;

    const request$ = id
      ? this.userService.updateUser(id, novoUsuario)
      : this.userService.createUser(novoUsuario);

    request$.subscribe({
      next: (resp) => {
        alert(id ? "Usuário atualizado com sucesso!" : "Usuário criado com sucesso! ID: " + (resp as any).id);
        this.form.reset();
      },
      error: () => alert(id ? "Erro ao atualizar usuário." : "Erro ao cadastrar usuário."),
      complete: () => this.submitting = false
    });
  }
}