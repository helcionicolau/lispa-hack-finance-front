  url: any;
  isCreating = false;
  emprestimo: any = {};

  constructor(private emprestimoService: EmprestimoService) {}

  criarEmprestimo() {
    // Valide os campos aqui, retornando se algum campo não atender aos critérios.
    if (
      !this.emprestimo.numero_conta ||
      !this.emprestimo.nome_completo ||
      !this.emprestimo.genero ||
      !this.emprestimo.estado_civil ||
      !this.emprestimo.dependentes ||
      !this.emprestimo.educacao ||
      !this.emprestimo.emprego ||
      !this.emprestimo.propriedade ||
      !this.emprestimo.credito ||
      !this.emprestimo.renda_mensal_requerente ||
      !this.emprestimo.renda_mensal_co_requerente ||
      !this.emprestimo.valor_emprestimo ||
      !this.emprestimo.duracao_emprestimo ||
      !this.emprestimo.tipo_credito ||
      !this.emprestimo.email
    ) {
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
      () => {
        // Limpa os campos do formulário após o sucesso
        this.emprestimo = {};

        // Limpa o campo de imagem (caso ainda exiba uma imagem anterior).
        this.url = null;

        // Reative o botão de "Gravar".
        this.isCreating = false;

        // Mostra um SweetAlert2 de sucesso
        Swal.fire({
          icon: 'success',
          title: 'Crédito criado com sucesso!',
          showConfirmButton: false,
          timer: 1500 // Fecha automaticamente após 1,5 segundos
        });
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
          title: 'Erro ao criar o empréstimo',
          text: errorMessage
        });
        console.error(error);
      }
    );
  }