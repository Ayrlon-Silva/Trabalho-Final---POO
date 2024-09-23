import prompt from 'prompt-sync';
import {Usuario, Publicacao, PublicacaoAvancada, Interacao, TipoInteracao, RedeSocial} from "./classes"
import { AplicacaoError, NaoehPublicacaoAvancadaError, NenhumaPublicacaoExistenteError, NenhumUsuarioCadastradoError } from "./erros"


class AppRedeSocial {
    private _RedeSocial : RedeSocial;
    private _IdUsuario = 0;
    private _IdPublicacao = 0;

    private _input: prompt.Prompt  = prompt();

    constructor () {
        this._RedeSocial = new RedeSocial();
        this._input = prompt();
    }


    
    menu(){
        this.clear_screen();
        let opcao: string = "";
        
        do {
            this.OpcoesMenuInicial(); //mostra as opcoes do menu icicial
            try {
            opcao = this._input('Escolha uma opção >> ');

            switch (opcao) {
                case "1":
                    this.clear_screen()
                    this._cadastrarUsuario()  
                    this.enter_to_continue()
                    break;
    
                case "2":
                    this.clear_screen()
                    this._listarUsuarios()  
                    this.enter_to_continue()
                    break;

                case "3": 
                    this.clear_screen()
                    this.excluir_Usuario() 
                    this.enter_to_continue()
                    break;

                case "4":
                    this.clear_screen()
                    this.nova_publicacao() 
                    this.enter_to_continue()
                    break;

                case "5":
                    this.clear_screen()
                    this.mostrar_publicacoes() 
                    this.enter_to_continue()
                    break;

                case "6":
                    this.clear_screen()
                    this.mostrar_publicacoes_por_usuario() 
                    this.enter_to_continue()
                    break;

                case "7":
                    this.clear_screen();
                    this.reagir_a_publicacao() 
                    this.enter_to_continue()
                    break;

                case "8":
                    this.clear_screen()
                    this.editar_publicacao()
                    this.enter_to_continue()
                    break;
                
                case "9":
                    this.clear_screen()
                    this.excluir_postagem()
                    this.enter_to_continue()

                    break;
                case "10":
                    this.clear_screen()
                    this.detalhar_publicacão()
                    this.enter_to_continue()
                    break;
                }
            }catch (e) {
                if (e instanceof AplicacaoError) {
                    console.log(e.message); // "Ocorreu um erro na aplicação!"
                } else {
                    console.log("Erro desconhecido. Contate o administrador", e);
                }
            }
            
        } while (opcao != "0");
    }

    private OpcoesMenuInicial() {
        console.log("\n")
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
        console.log("\n")
    }

    private _cadastrarUsuario(){
        console.log(`\n\n\n`)
        console.log(`                 Crie uma Conta                    `)
        console.log(`_________________________________________________\n`)
        let email: string = this._input("> Digite o seu email : ")
        console.log(`\n`)
        let documento: string = this._input("> Digite o seu CPF : ")
        console.log(`\n`)
        let apelido: string = this._input("> Como voce quer ser chamado : ")
        console.log("\n")

        let novo_usuario : Usuario = new Usuario(this._IdUsuario +=1, email, apelido, documento); //istancia o novo usuario com os dados fornecidos

        this._RedeSocial.Inserir_Usuario(novo_usuario); // adiciona o usuario na colecao. Se o email ou Id for repetido o metodo apresenta o erro.

        console.log(`\n\n>>>> Usuario Cadastrado com sucesso !\n\n`)
    }

    private _listarUsuarios() {
        if(this._RedeSocial.Usuarios.length < 1){
            throw new NenhumUsuarioCadastradoError("Nenhum usuario foi Cadastrado ainda.")
        }

        console.log("               Usuarios                ");
        for(let i = 0; i < this._RedeSocial.Usuarios.length; i++){ 
            console.log(`-----------------------------------------\n`)
            console.log(`>= Apelido : ${this._RedeSocial.Usuarios[i].apelido}`)
            console.log(`>= ID : ${this._RedeSocial.Usuarios[i].id}`)
            console.log(`>= Documento : ${this._RedeSocial.Usuarios[i].documento}`)
            console.log(`>= Email : ${this._RedeSocial.Usuarios[i].email}`)
            console.log(`\n-----------------------------------------`)
        }
    }

    private excluir_Usuario(){
        if(this._RedeSocial.Usuarios.length < 1){
            throw new NenhumUsuarioCadastradoError("Nenhum usuario foi Cadastrado ainda.")
        }

        console.log("\n")
        console.log(`[                 Excluir Usuario                 ]`)
        console.log(`__________________________________________________\n`)
        let id_do_usuario: number = Number(this._input("> Digite o id do Usuario : "))

        this._RedeSocial.Excluir_Usuario(id_do_usuario)
    }

    
    private nova_publicacao(){
        console.log(`                 [ Nova Publicacao ]                 `)
        console.log(`           - Simples (1) ou Avancada (2) -           `)
        console.log(`___________________________________________________\n`)
        let tipoPublicacao: number = Number(this._input("> Escolha uma opcao : ")) //Define o tipo de publicacao

        console.log(`\n`)
        console.log(`___________________________________________________\n`)
        let id_do_usuario: number = Number(this._input("> Digite o seu id : ")) //pede o id do usuario que ira publicar

        let user : Usuario = this._RedeSocial.Consultar_Usuario_por_id(id_do_usuario); //procura pelo usuario e retorna erro se não encontrar

        console.log("\n")
        console.log(`                     Diga algo :                     `)
        console.log(`___________________________________________________\n`)
        let conteudo: string = this._input("> ")

        let nova_publicacao! : Publicacao; 

        if(tipoPublicacao == 1){ //Publicacao simples
            this._IdPublicacao++
            let p : Publicacao = new Publicacao(this._IdPublicacao, user, conteudo);
            nova_publicacao = p;
        }
        else if(tipoPublicacao == 2){ //publicacao avanacada
            this._IdPublicacao++
            let p : PublicacaoAvancada = new PublicacaoAvancada(this._IdPublicacao, user, conteudo);
            nova_publicacao = p;
        }

        this._RedeSocial.Inserir_Publicacao(nova_publicacao) // insere a publicacao na colecao ou retorna erro se o id for repetido
    }

    private mostrar_publicacoes(){
        if(this._RedeSocial.Publicacoes.length < 1){
            throw new NenhumaPublicacaoExistenteError("Nenhuma publicação foi adcionada ainda.")
        }

        let Publis : Publicacao [] = this.ordenar(this._RedeSocial.Publicacoes) //ordena as publicacoes da mais recente até a mais antiga
        
        console.log(`\n[              feed de publicações              ]\n\n`)
        for(let p of Publis){ 
            console.log(p.toString)
        }
        
        console.log("\n")
    }

    private mostrar_publicacoes_por_usuario(){
        if(this._RedeSocial.Publicacoes.length < 1){
            throw new NenhumaPublicacaoExistenteError("Nenhuma publicação foi adcionada ainda.")
        }
        console.log("\n")
        console.log(`[             Publicações por usuario             ]`)
        console.log(`__________________________________________________\n\n`)
        let email_do_usuario: string = this._input("> Digite o email do usuario: ") //pede o email do usuario para ver suas publicações
        let user : Usuario = this._RedeSocial.Consultar_Usuario(email_do_usuario) //verfica se o usuario existe 

        if(!this.ha_publicacoes_do_usuario(email_do_usuario)){ 
            throw new NenhumaPublicacaoExistenteError("Este usuario ainda não possui publicacoes")
        }

        let Publis : Publicacao [] = this.ordenar(this._RedeSocial.Publicacoes) //ordena as publicacoes

        for(let p of Publis){
            if(p.usuario.email == email_do_usuario){ // procura se há alguma publicacao do usuario e se houver retorna true
                console.log(p.toString)
            }
        }

        console.log("\n")
    }

    private reagir_a_publicacao(){
        if(this._RedeSocial.Publicacoes.length < 1){
            throw new NenhumaPublicacaoExistenteError("Nenhuma publicação foi adcionada ainda.")
        }

        console.log("\n")
        console.log(`[               Reagir a publicacao                ]`)
        console.log(`___________________________________________________\n`)
        let id_da_publicacao: number = Number(this._input("> Digite o id da publicacao : "))
        let publicacao_desejada = this._RedeSocial.Consultar_Publicacao(id_da_publicacao) //busca a publicacao com o id fornecido ou retorna erro caso não encontre
        console.log("\n")

        if(!(publicacao_desejada instanceof PublicacaoAvancada)){
            throw new NaoehPublicacaoAvancadaError("Não é possivel reagir a uma publicação simples")
        }

        let id_do_usuario: number = Number(this._input("> Digite o seu id : "))
        let user = this._RedeSocial.Consultar_Usuario_por_id(id_do_usuario) //busca o usuario que ira reagir ou retorna erro caso não encontre

        this.menu_reacoes();
        let reacao: number = Number(this._input("> ")) //Define qual é a reacao


        //insere a reacao na publicacao
        if(reacao == TipoInteracao.curtida){
            publicacao_desejada.inserir_reacao(new Interacao(publicacao_desejada.Interacoes.length + 1, publicacao_desejada, TipoInteracao.curtida, user))
        }
        else if(reacao == TipoInteracao.naocurtir){
            publicacao_desejada.inserir_reacao(new Interacao(publicacao_desejada.Interacoes.length + 1, publicacao_desejada, TipoInteracao.naocurtir, user))
        }
        else if(reacao == TipoInteracao.riso){
            publicacao_desejada.inserir_reacao(new Interacao(publicacao_desejada.Interacoes.length + 1, publicacao_desejada, TipoInteracao.riso, user))
        }
        else if(reacao == TipoInteracao.surpresa){
            publicacao_desejada.inserir_reacao(new Interacao(publicacao_desejada.Interacoes.length + 1, publicacao_desejada, TipoInteracao.surpresa, user))
        }
        else if(reacao == TipoInteracao.triste){
            publicacao_desejada.inserir_reacao(new Interacao(publicacao_desejada.Interacoes.length + 1, publicacao_desejada, TipoInteracao.triste, user))
        }
    }

    private editar_publicacao(){
        if(this._RedeSocial.Publicacoes.length < 1){
            throw new NenhumaPublicacaoExistenteError("Nenhuma publicação foi adcionada ainda.")
        }

        console.log("\n")
        console.log(`[                 Editar publicacao                 ]`)
        console.log(`___________________________________________________\n`)
        let id_da_publicacao: number = Number(this._input("> Digite o id da publicacao : "))
        let publicacao_desejada = this._RedeSocial.Consultar_Publicacao(id_da_publicacao) //busca a publicacao com o id fornecido ou retorna erro caso não encontre
        console.log("\n")

        console.log(`\n>>         Publicação Encontrada         <<`)
        console.log(`--------------------------------------------`)
        console.log(publicacao_desejada.toString)

        console.log("\n")
        console.log(`                    Novo Conteudo:                    `)
        console.log(`____________________________________________________\n`)
        let novo_conteudo: string = this._input("> Digite aqui: ")

        for(let i : number = 0; i < this._RedeSocial.Publicacoes.length; i++){
            if(this._RedeSocial.Publicacoes[i].id == publicacao_desejada.id){
                this._RedeSocial.Publicacoes[i].conteudo = novo_conteudo
                break;
            }
        }

        console.log(`\n\n>>>> Publicação Editada !\n\n`)    
    }

    private excluir_postagem(){
        if(this._RedeSocial.Publicacoes.length < 1){
            throw new NenhumaPublicacaoExistenteError("Nenhuma publicação foi adcionada ainda.")
        }

        console.log("\n")
        console.log(`[                 Excluir publicacao                 ]`)
        console.log(`____________________________________________________\n`)
        let id_da_publicacao: number = Number(this._input("> Digite o id da publicacao : "))
        let publicacao_desejada = this._RedeSocial.Consultar_Publicacao(id_da_publicacao) //busca a publicacao com o id fornecido ou retorna erro caso não encontre
        console.log("\n")
        

        this._RedeSocial.Excluir_publicacao(id_da_publicacao)
    }

    private detalhar_publicacão(){
        if(this._RedeSocial.Publicacoes.length < 1){
            throw new NenhumaPublicacaoExistenteError("Nenhuma publicação foi adcionada ainda.")
        }

        console.log("\n")
        console.log(`[            Detalhar publicacao Avançada            ]`)
        console.log(`_____________________________________________________\n`)
        let id_da_publicacao: number = Number(this._input("> Digite o id da publicacao : "))
        let publicacao_desejada = this._RedeSocial.Consultar_Publicacao(id_da_publicacao) //busca a publicacao com o id fornecido ou retorna erro caso não encontre
        console.log("\n")

        if(!(publicacao_desejada instanceof PublicacaoAvancada)){
            throw new NaoehPublicacaoAvancadaError("Não é possivel detalhar uma publicação simples")
        }
        
        console.log(`\n[            Interações da Publicação            ]\n`)
        console.log(publicacao_desejada.toStringInteracoes)
        
    }

    private ha_publicacoes_do_usuario(email_do_usuario : string): boolean{
        let Publis : Publicacao [] = this.ordenar(this._RedeSocial.Publicacoes) //ordena as publicacoes

        let tem : boolean = false
        for(let p of Publis){
            if(p.usuario.email == email_do_usuario){ // procura se há alguma publicacao do usuario e se houver retorna true
                tem = true
                break
            }
        }

        return tem;
    }

    private clear_screen(){
        console.clear()
    }

    private ordenar(lista : Publicacao[]) : Publicacao []{
        let nova_lista = lista.sort((a, b) => b.id - a.id)

        return nova_lista;
    }

    private enter_to_continue(){
        this._input("Pressione <Enter> para continuar...");
        console.clear();
    }

    private menu_reacoes(){
        console.log("\n")
        console.log("============{ Reações }============")
        console.log("| - curtir     (1)             <3 |")
        console.log("| - não curtir (2)            !<3 |")
        console.log("| - riso       (3)             :) |")
        console.log("| - surpresa   (4)             :0 |")
        console.log("| - triste     (5)             :( |")
        console.log("============{=========}============")
        console.log("\n")
    }
}

let app = new AppRedeSocial()

app.menu()