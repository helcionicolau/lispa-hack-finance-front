import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Credentials } from 'src/app/models/usuario.model';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials: Credentials = {
    email: '',
    senha: ''
  };
  isLoading = false;

  constructor(private authService: LoginService, private router: Router) {}

  async login(): Promise<void> {
    this.isLoading = true;

    try {
      console.log('Antes de chamar authService.login');
      const loginSuccessful = await this.authService.login(this.credentials);
      console.log('Depois de chamar authService.login');
      
      this.isLoading = false;

      if (loginSuccessful) {
        console.log('Login bem-sucedido. Navegando para /app');
        Swal.fire({
          icon: 'success',
          title: 'Login bem-sucedido',
          text: 'Você foi autenticado com sucesso!',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/app']);
      } else {
        console.log('Erro no login. Navegando para /login');
        Swal.fire({
          icon: 'error',
          title: 'Erro no login',
          text: 'Credenciais inválidas. Verifique seu email e senha.'
        });
        this.router.navigate(['/login']);
      }
    } catch (error) {
      console.log('Erro durante o login:', error);
      this.isLoading = false;
      console.error(error);
    }
  }
}