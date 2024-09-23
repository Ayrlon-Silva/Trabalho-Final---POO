"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const classes_1 = require("./classes");
const erros_1 = require("./erros");
class AppRedeSocial {
    constructor() {
        this._IdUsuario = 0;
        this._IdPublicacao = 0;
        this._input = (0, prompt_sync_1.default)();
        this._RedeSocial = new classes_1.RedeSocial();
        this._input = (0, prompt_sync_1.default)();
    }
    menu() {
        this.clear_screen();
        let opcao = "";
        do {
            this.OpcoesMenuInicial(); //mostra as opcoes do menu icicial
            try {
                opcao = this._input('Escolha uma opção >> ');
                switch (opcao) {
                    case "1":
                        this.clear_screen();
                        this._cadastrarUsuario();
                        this.enter_to_continue();
                        break;
                    case "2":
                        this.clear_screen();
                        this._listarUsuarios();
                        this.enter_to_continue();
                        break;
                    case "3":
                        this.clear_screen();
                        this.excluir_Usuario();
                        this.enter_to_continue();
                        break;
                    case "4":
                        this.clear_screen();
                        this.nova_publicacao();
                        this.enter_to_continue();
                        break;
                    case "5":
                        this.clear_screen();
                        this.mostrar_publicacoes();
                        this.enter_to_continue();
                        break;
                    case "6":
                        this.clear_screen();
                        this.mostrar_publicacoes_por_usuario();
                        this.enter_to_continue();
                        break;
                    case "7":
                        this.clear_screen();
                        this.reagir_a_publicacao();
                        this.enter_to_continue();
                        break;
                    case "8":
                        this.clear_screen();
                        this.editar_publicacao();
                        this.enter_to_continue();
                        break;
                    case "9":
                        this.clear_screen();
                        this.excluir_postagem();
                        this.enter_to_continue();
                        break;
                    case "10":
                        this.clear_screen();
                        this.detalhar_publicacão();
                        this.enter_to_continue();
                        break;
                }
            }
            catch (e) {
                if (e instanceof erros_1.AplicacaoError) {
                    console.log(e.message); // "Ocorreu um erro na aplicação!"
                }
                else {
                    console.log("Erro desconhecido. Contate o administrador", e);
                }
            }
        } while (opcao != "0");
    }
    OpcoesMenuInicial() {
        console.log("\n");
        console.log("               Rede Social!                ");
        console.log("-------------------------------------------");
        console.log("|                                         |");
        console.log("| 1. Cadastrar Usuário                    |");
        console.log("| 2. Listar Usuários                      |");
        console.log("| 3. Excluir Usuário                      |");
        console.log("| 4. Criar Publicação                     |");
        console.log("| 5. Listar Publicações                   |");
        console.log("| 6. Listar Publicações por Usuário       |");
        console.log("| 7. Reagir a Publicação Avançada         |");
        console.log("| 8. Editar uma Publicação                |");
        console.log("| 9. Excluir uma Publicação               |");
        console.log("| 10. Detalhar Publicação Avançada        |");
        console.log("|                                         |");
        console.log("| 0. Sair                                 |");
        console.log("|-----------------------------------------|");
        console.log("\n");
    }
    _cadastrarUsuario() {
        console.log(`\n\n\n`);
        console.log(`                 Crie uma Conta                    `);
        console.log(`_________________________________________________\n`);
        let email = this._input("> Digite o seu email : ");
        console.log(`\n`);
        let documento = this._input("> Digite o seu CPF : ");
        console.log(`\n`);
        let apelido = this._input("> Como voce quer ser chamado : ");
        console.log("\n");
        let novo_usuario = new classes_1.Usuario(this._IdUsuario += 1, email, apelido, documento); //istancia o novo usuario com os dados fornecidos
        this._RedeSocial.Inserir_Usuario(novo_usuario); // adiciona o usuario na colecao. Se o email ou Id for repetido o metodo apresenta o erro.
        console.log(`\n\n>>>> Usuario Cadastrado com sucesso !\n\n`);
    }
    _listarUsuarios() {
        if (this._RedeSocial.Usuarios.length < 1) {
            throw new erros_1.NenhumUsuarioCadastradoError("Nenhum usuario foi Cadastrado ainda.");
        }
        console.log("               Usuarios                ");
        for (let i = 0; i < this._RedeSocial.Usuarios.length; i++) {
            console.log(`-----------------------------------------\n`);
            console.log(`>= Apelido : ${this._RedeSocial.Usuarios[i].apelido}`);
            console.log(`>= ID : ${this._RedeSocial.Usuarios[i].id}`);
            console.log(`>= Documento : ${this._RedeSocial.Usuarios[i].documento}`);
            console.log(`>= Email : ${this._RedeSocial.Usuarios[i].email}`);
            console.log(`\n-----------------------------------------`);
        }
    }
    excluir_Usuario() {
        if (this._RedeSocial.Usuarios.length < 1) {
            throw new erros_1.NenhumUsuarioCadastradoError("Nenhum usuario foi Cadastrado ainda.");
        }
        console.log("\n");
        console.log(`[                 Excluir Usuario                 ]`);
        console.log(`__________________________________________________\n`);
        let id_do_usuario = Number(this._input("> Digite o id do Usuario : "));
        this._RedeSocial.Excluir_Usuario(id_do_usuario);
    }
    nova_publicacao() {
        console.log(`                 [ Nova Publicacao ]                 `);
        console.log(`           - Simples (1) ou Avancada (2) -           `);
        console.log(`___________________________________________________\n`);
        let tipoPublicacao = Number(this._input("> Escolha uma opcao : ")); //Define o tipo de publicacao
        console.log(`\n`);
        console.log(`___________________________________________________\n`);
        let id_do_usuario = Number(this._input("> Digite o seu id : ")); //pede o id do usuario que ira publicar
        let user = this._RedeSocial.Consultar_Usuario_por_id(id_do_usuario); //procura pelo usuario e retorna erro se não encontrar
        console.log("\n");
        console.log(`                     Diga algo :                     `);
        console.log(`___________________________________________________\n`);
        let conteudo = this._input("> ");
        let nova_publicacao;
        if (tipoPublicacao == 1) { //Publicacao simples
            this._IdPublicacao++;
            let p = new classes_1.Publicacao(this._IdPublicacao, user, conteudo);
            nova_publicacao = p;
        }
        else if (tipoPublicacao == 2) { //publicacao avanacada
            this._IdPublicacao++;
            let p = new classes_1.PublicacaoAvancada(this._IdPublicacao, user, conteudo);
            nova_publicacao = p;
        }
        this._RedeSocial.Inserir_Publicacao(nova_publicacao); // insere a publicacao na colecao ou retorna erro se o id for repetido
    }
    mostrar_publicacoes() {
        if (this._RedeSocial.Publicacoes.length < 1) {
            throw new erros_1.NenhumaPublicacaoExistenteError("Nenhuma publicação foi adcionada ainda.");
        }
        let Publis = this.ordenar(this._RedeSocial.Publicacoes); //ordena as publicacoes da mais recente até a mais antiga
        console.log(`\n[              feed de publicações              ]\n\n`);
        for (let p of Publis) {
            console.log(p.toString);
        }
        console.log("\n");
    }
    mostrar_publicacoes_por_usuario() {
        if (this._RedeSocial.Publicacoes.length < 1) {
            throw new erros_1.NenhumaPublicacaoExistenteError("Nenhuma publicação foi adcionada ainda.");
        }
        console.log("\n");
        console.log(`[             Publicações por usuario             ]`);
        console.log(`__________________________________________________\n\n`);
        let email_do_usuario = this._input("> Digite o email do usuario: "); //pede o email do usuario para ver suas publicações
        let user = this._RedeSocial.Consultar_Usuario(email_do_usuario); //verfica se o usuario existe 
        if (!this.ha_publicacoes_do_usuario(email_do_usuario)) {
            throw new erros_1.NenhumaPublicacaoExistenteError("Este usuario ainda não possui publicacoes");
        }
        let Publis = this.ordenar(this._RedeSocial.Publicacoes); //ordena as publicacoes
        for (let p of Publis) {
            if (p.usuario.email == email_do_usuario) { // procura se há alguma publicacao do usuario e se houver retorna true
                console.log(p.toString);
            }
        }
        console.log("\n");
    }
    reagir_a_publicacao() {
        if (this._RedeSocial.Publicacoes.length < 1) {
            throw new erros_1.NenhumaPublicacaoExistenteError("Nenhuma publicação foi adcionada ainda.");
        }
        console.log("\n");
        console.log(`[               Reagir a publicacao                ]`);
        console.log(`___________________________________________________\n`);
        let id_da_publicacao = Number(this._input("> Digite o id da publicacao : "));
        let publicacao_desejada = this._RedeSocial.Consultar_Publicacao(id_da_publicacao); //busca a publicacao com o id fornecido ou retorna erro caso não encontre
        console.log("\n");
        if (!(publicacao_desejada instanceof classes_1.PublicacaoAvancada)) {
            throw new erros_1.NaoehPublicacaoAvancadaError("Não é possivel reagir a uma publicação simples");
        }
        let id_do_usuario = Number(this._input("> Digite o seu id : "));
        let user = this._RedeSocial.Consultar_Usuario_por_id(id_do_usuario); //busca o usuario que ira reagir ou retorna erro caso não encontre
        this.menu_reacoes();
        let reacao = Number(this._input("> ")); //Define qual é a reacao
        //insere a reacao na publicacao
        if (reacao == classes_1.TipoInteracao.curtida) {
            publicacao_desejada.inserir_reacao(new classes_1.Interacao(publicacao_desejada.Interacoes.length + 1, publicacao_desejada, classes_1.TipoInteracao.curtida, user));
        }
        else if (reacao == classes_1.TipoInteracao.naocurtir) {
            publicacao_desejada.inserir_reacao(new classes_1.Interacao(publicacao_desejada.Interacoes.length + 1, publicacao_desejada, classes_1.TipoInteracao.naocurtir, user));
        }
        else if (reacao == classes_1.TipoInteracao.riso) {
            publicacao_desejada.inserir_reacao(new classes_1.Interacao(publicacao_desejada.Interacoes.length + 1, publicacao_desejada, classes_1.TipoInteracao.riso, user));
        }
        else if (reacao == classes_1.TipoInteracao.surpresa) {
            publicacao_desejada.inserir_reacao(new classes_1.Interacao(publicacao_desejada.Interacoes.length + 1, publicacao_desejada, classes_1.TipoInteracao.surpresa, user));
        }
        else if (reacao == classes_1.TipoInteracao.triste) {
            publicacao_desejada.inserir_reacao(new classes_1.Interacao(publicacao_desejada.Interacoes.length + 1, publicacao_desejada, classes_1.TipoInteracao.triste, user));
        }
    }
    editar_publicacao() {
        if (this._RedeSocial.Publicacoes.length < 1) {
            throw new erros_1.NenhumaPublicacaoExistenteError("Nenhuma publicação foi adcionada ainda.");
        }
        console.log("\n");
        console.log(`[                 Editar publicacao                 ]`);
        console.log(`___________________________________________________\n`);
        let id_da_publicacao = Number(this._input("> Digite o id da publicacao : "));
        let publicacao_desejada = this._RedeSocial.Consultar_Publicacao(id_da_publicacao); //busca a publicacao com o id fornecido ou retorna erro caso não encontre
        console.log("\n");
        console.log(`\n>>         Publicação Encontrada         <<`);
        console.log(`--------------------------------------------`);
        console.log(publicacao_desejada.toString);
        console.log("\n");
        console.log(`                    Novo Conteudo:                    `);
        console.log(`____________________________________________________\n`);
        let novo_conteudo = this._input("> Digite aqui: ");
        for (let i = 0; i < this._RedeSocial.Publicacoes.length; i++) {
            if (this._RedeSocial.Publicacoes[i].id == publicacao_desejada.id) {
                this._RedeSocial.Publicacoes[i].conteudo = novo_conteudo;
                break;
            }
        }
        console.log(`\n\n>>>> Publicação Editada !\n\n`);
    }
    excluir_postagem() {
        if (this._RedeSocial.Publicacoes.length < 1) {
            throw new erros_1.NenhumaPublicacaoExistenteError("Nenhuma publicação foi adcionada ainda.");
        }
        console.log("\n");
        console.log(`[                 Excluir publicacao                 ]`);
        console.log(`____________________________________________________\n`);
        let id_da_publicacao = Number(this._input("> Digite o id da publicacao : "));
        let publicacao_desejada = this._RedeSocial.Consultar_Publicacao(id_da_publicacao); //busca a publicacao com o id fornecido ou retorna erro caso não encontre
        console.log("\n");
        this._RedeSocial.Excluir_publicacao(id_da_publicacao);
    }
    detalhar_publicacão() {
        if (this._RedeSocial.Publicacoes.length < 1) {
            throw new erros_1.NenhumaPublicacaoExistenteError("Nenhuma publicação foi adcionada ainda.");
        }
        console.log("\n");
        console.log(`[            Detalhar publicacao Avançada            ]`);
        console.log(`_____________________________________________________\n`);
        let id_da_publicacao = Number(this._input("> Digite o id da publicacao : "));
        let publicacao_desejada = this._RedeSocial.Consultar_Publicacao(id_da_publicacao); //busca a publicacao com o id fornecido ou retorna erro caso não encontre
        console.log("\n");
        if (!(publicacao_desejada instanceof classes_1.PublicacaoAvancada)) {
            throw new erros_1.NaoehPublicacaoAvancadaError("Não é possivel detalhar uma publicação simples");
        }
        console.log(`\n[            Interações da Publicação            ]\n`);
        console.log(publicacao_desejada.toStringInteracoes);
    }
    ha_publicacoes_do_usuario(email_do_usuario) {
        let Publis = this.ordenar(this._RedeSocial.Publicacoes); //ordena as publicacoes
        let tem = false;
        for (let p of Publis) {
            if (p.usuario.email == email_do_usuario) { // procura se há alguma publicacao do usuario e se houver retorna true
                tem = true;
                break;
            }
        }
        return tem;
    }
    clear_screen() {
        console.clear();
    }
    ordenar(lista) {
        let nova_lista = lista.sort((a, b) => b.id - a.id);
        return nova_lista;
    }
    enter_to_continue() {
        this._input("Pressione <Enter> para continuar...");
        console.clear();
    }
    menu_reacoes() {
        console.log("\n");
        console.log("============{ Reações }============");
        console.log("| - curtir     (1)             <3 |");
        console.log("| - não curtir (2)            !<3 |");
        console.log("| - riso       (3)             :) |");
        console.log("| - surpresa   (4)             :0 |");
        console.log("| - triste     (5)             :( |");
        console.log("============{=========}============");
        console.log("\n");
    }
}
let app = new AppRedeSocial();
app.menu();
