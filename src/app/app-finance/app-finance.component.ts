import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { EmprestimoService } from '../services/emprestimo.service';
import { Emprestimo } from '../models/emprestimo.model';

@Component({
  selector: 'app-app-finance',
  templateUrl: './app-finance.component.html',
  styleUrls: ['./app-finance.component.css']
})
export class AppFinanceComponent {
  isCreating = false;
  
  emprestimo: Emprestimo = {
    numero_conta: '',
    nome_completo: '',
    genero: 'Female', // ou 'Male' dependendo do valor padrão desejado
    estado_civil: 'Yes', // ou 'No' dependendo do valor padrão desejado
    dependentes: 'No', // ou outro valor padrão
    educacao: 'Not Graduate', // ou 'Graduate' dependendo do valor padrão desejado
    emprego: 'Job', // ou 'Business' dependendo do valor padrão desejado
    duracao_emprestimo: 2, // ou outro valor padrão
    propriedade: 'Rural', // ou 'Semi-Urban', 'Urban' dependendo do valor padrão desejado
    credito: 'Between 300 to 500', // ou 'Above 500' dependendo do valor padrão desejado
    renda_mensal_requerente: 0,
    renda_mensal_co_requerente: 0,
    valor_emprestimo: 0,
    tipo_credito: 'Salario', // ou 'Pessoal', 'Automovel', 'Particular', 'Habitacao', 'Seguro' dependendo do valor padrão desejado
    email: ''
  };

  constructor(private emprestimoService: EmprestimoService) { }

  mostrarDadosModal() {
    Swal.fire({
      icon: 'info',
      title: 'Detalhes do Empréstimo',
      html: `
        <p><strong>Número da Conta:</strong> ${this.emprestimo.numero_conta}</p>
        <p><strong>Nome Completo:</strong> ${this.emprestimo.nome_completo}</p>
        <p><strong>Resultado da Predição:</strong> ${this.emprestimo.resultado_predicao === 0
          ? 'Crédito não aprovado'
          : 'Crédito aprovado'
        }</p>
        <hr>
        <p><strong>Resultado enviado no E-mail:</strong> ${this.emprestimo.email}</p>
      `,
    });
  }

  criarEmprestimo() {
    // Valide os campos aqui, retornando se algum campo não atender aos critérios.
    if (!this.emprestimo.numero_conta) {
      // Pelo menos um dos campos (numero_conta, nome_completo, email) deve ser preenchido
      Swal.fire({
        icon: 'error',
        title: 'Campos obrigatórios',
        text: 'Preencha pelo menos os campos obrigatórios.',
      });
      return;
    }
  
    // Desative o botão de "Gravar" para evitar envios duplicados.
    this.isCreating = true;
  
    // Chama o serviço para criar um novo empréstimo
    this.emprestimoService.criarEmprestimo(this.emprestimo).subscribe(
      (novoEmprestimo) => {
        // Mostra um SweetAlert2 de sucesso
        Swal.fire({
          icon: 'success',
          title: 'Crédito analisado com sucesso!',
          showConfirmButton: false,
          timer: 1500 // Fecha automaticamente após 1,5 segundos
        });
  
        // Atualiza o objeto empréstimo local com os dados do novo empréstimo
        this.emprestimo = novoEmprestimo;
  
        // Chama o método para mostrar os detalhes do empréstimo
        this.mostrarDadosModal();
      },
      (error) => {
        // Reative o botão de "Gravar" em caso de erro.
        this.isCreating = false;
  
        // Em caso de erro, mostra um SweetAlert2 de erro
        let errorMessage = 'Ocorreu um erro ao tentar criar o empréstimo. Por favor, tente novamente mais tarde.';
  
        if (error.status === 400) {
          // Possível tratamento para erros específicos de validação do servidor.
          errorMessage = 'Verifique os campos do formulário e tente novamente.';
        }
  
        Swal.fire({
          icon: 'error',
          title: 'Erro ao criar o crédito',
          text: errorMessage
        });
        console.error(error);
      }
    );
  }
  
}
