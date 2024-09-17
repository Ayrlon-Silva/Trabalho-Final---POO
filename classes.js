"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedeSocial = exports.TipoInteracao = exports.Interacao = exports.PublicacaoAvancada = exports.Publicacao = exports.Usuario = void 0;
const erros_1 = require("./erros");
class Usuario {
    constructor(id, email, apelido, documento) {
        this._id = id;
        this._email = email;
        this._apelido = apelido;
        this._documento = documento;
    }
    //Metodos de leitura
    get id() {
        return this._id;
    }
    get email() {
        return this._email;
    }
    get apelido() {
        return this._apelido;
    }
    get documento() {
        return this._documento;
    }
}
exports.Usuario = Usuario;
class Publicacao {
    constructor(id, usuario, conteudo) {
        this._id = id;
        this._usuario = usuario;
        this._conteudo = conteudo;
        this._dataHora = new Date();
    }
    //Metodos de leitura
    get id() {
        return this._id;
    }
    get usuario() {
        return this._usuario;
    }
    get conteudo() {
        return this._conteudo;
    }
    get dataHora() {
        let hora = this._dataHora.getHours();
        let min = this._dataHora.getMinutes();
        let seg = this._dataHora.getSeconds();
        return `${hora}:${min}:${seg}`;
    }
    get toString() {
        return `\n
    _________________________________________________
    => Usuario: ${this._usuario.apelido}
    => Post id: ${this._id} 
    _________________________________________________
    > : ${this._conteudo}
    _________________________________________________
    ${this.dataHora}                                 `;
    }
}
exports.Publicacao = Publicacao;
class PublicacaoAvancada extends Publicacao {
    constructor(id, usuario, conteudo) {
        super(id, usuario, conteudo); //contrutor da superclasse
        this._Interacoes = [];
    }
    inserir_reacao(nova_Interacao) {
        for (let interacao of this._Interacoes) {
            if (nova_Interacao.usuario.id == interacao.usuario.id) { //verifica se o usuario ja interagiu com essa publicacao
                throw new erros_1.InteracaoRepetidaError("Você já interagiu com essa publicação antes.");
            }
        }
        this._Interacoes.push(nova_Interacao); //adiciona a reacao na colecao de reacoes da publicacao
    }
    get Interacoes() {
        return this._Interacoes;
    }
    get toString() {
        return `\n
    _________________________________________________
    => Usuario: ${this.usuario.apelido}
    => Post id: ${this.id} 
    _________________________________________________
    > : ${this.conteudo}
    _________________________________________________
    ${this.dataHora}
    - Reações : ${this.Interacoes.length}                                 `;
    }
}
exports.PublicacaoAvancada = PublicacaoAvancada;
//Tipos enumerados 
var TipoInteracao;
(function (TipoInteracao) {
    TipoInteracao[TipoInteracao["curtir"] = 1] = "curtir";
    TipoInteracao[TipoInteracao["naocurtir"] = 2] = "naocurtir";
    TipoInteracao[TipoInteracao["riso"] = 3] = "riso";
    TipoInteracao[TipoInteracao["surpresa"] = 4] = "surpresa";
    TipoInteracao[TipoInteracao["triste"] = 5] = "triste";
})(TipoInteracao || (exports.TipoInteracao = TipoInteracao = {}));
class Interacao {
    constructor(id, P, T, U) {
        this._id = id;
        this._publicacao = P;
        this._tipoInteracao = T;
        this._usuario = U;
        this._dataHora = new Date;
    }
    //metodos de leitura
    get id() {
        return this._id;
    }
    get publicacao() {
        return this._publicacao;
    }
    get tipo() {
        return this._tipoInteracao;
    }
    get usuario() {
        return this._usuario;
    }
    get dataHora() {
        return this._dataHora;
    }
}
exports.Interacao = Interacao;
class RedeSocial {
    constructor() {
        this._Usuarios = [];
        this._Publicações = [];
    }
    get Usuarios() {
        return this._Usuarios;
    }
    get Publicacoes() {
        return this._Publicações;
    }
    //metodos de inclusao e consulta de usuarios
    Inserir_Usuario(newUser) {
        for (let Usuario of this._Usuarios) {
            if (Usuario.id == newUser.id) {
                throw new erros_1.CadastroDuplicadoError("Não é possivel adicionar Usuarios com o mesmo Id.");
            }
            if (Usuario.email == newUser.email) {
                throw new erros_1.CadastroDuplicadoError("Não é possivel adicionar Usuarios com o mesmo email.");
            }
        }
        this._Usuarios.push(newUser);
    }
    Consultar_Usuario(email) {
        let Usuario_procurado;
        for (let i = 0; i < this._Usuarios.length; i++) {
            if (this._Usuarios[i].email == email) {
                Usuario_procurado = this._Usuarios[i];
                break;
            }
        }
        if (Usuario_procurado == null) {
            throw new erros_1.UsuarioNaoEncontradoError("Nenhum usuario encontrado com esse email: " + email);
        }
        return Usuario_procurado;
    }
    Consultar_Usuario_por_id(id) {
        let Usuario_procurado;
        for (let i = 0; i < this._Usuarios.length; i++) {
            if (this._Usuarios[i].id == id) {
                Usuario_procurado = this._Usuarios[i];
                break;
            }
        }
        if (Usuario_procurado == null) {
            throw new erros_1.UsuarioNaoEncontradoError("Nenhum usuario encontrado com esse id: " + id);
        }
        return Usuario_procurado;
    }
    //metodos de inclusao e consulta de publicacoes
    Inserir_Publicacao(newPublicacao) {
        for (let Publi of this._Publicações) {
            if (newPublicacao.id == Publi.id) {
                throw new erros_1.CadastroDuplicadoError("Não é possivel adicionar Publicacoes com o mesmo Id.");
            }
        }
        this._Publicações.push(newPublicacao);
    }
    Consultar_Publicacao(id) {
        let Publicacao_procurada;
        for (let i = 0; i < this._Publicações.length; i++) {
            if (this._Publicações[i].id == id) {
                Publicacao_procurada = this._Publicações[i];
                break;
            }
        }
        if (Publicacao_procurada == null) {
            throw new erros_1.PublicacaoNaoEncontradaError("Nenhuma publicacao encontrada com esse id: " + id);
        }
        return Publicacao_procurada;
    }
}
exports.RedeSocial = RedeSocial;
