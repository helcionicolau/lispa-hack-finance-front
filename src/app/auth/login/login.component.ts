import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = {
    email: 'visita@gmail.com', // Coloque o email desejado para simulação
    senha: 'senha123' // Coloque a senha desejada para simulação
  };
  isLoading = false;

  numeroTelefone = '+244924423890';

  abrirWhatsApp() {
    const linkWhatsApp = `https://wa.me/${this.numeroTelefone}`;
    window.open(linkWhatsApp, '_blank');
  }

  constructor(private router: Router) {}

  async login(): Promise<void> {
    this.isLoading = true;

    try {
      // Simulação de login estático
      const loginSuccessful = this.simulateStaticLogin();

      this.isLoading = false;

      if (loginSuccessful) {
        Swal.fire({
          icon: 'success',
          title: 'Login bem-sucedido',
          text: 'Você foi autenticado com sucesso!',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/app']);
      } else {
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

  // Função para simular o login estático
  private simulateStaticLogin(): boolean {
    // Comparar as credenciais com as credenciais estáticas
    return (
      this.credentials.email.toLowerCase() === 'visita@gmail.com' &&
      this.credentials.senha === 'senha123'
    );
  }
}