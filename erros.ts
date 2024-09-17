class AplicacaoError extends Error{

    constructor(mensagem: string){
        super(mensagem)
    }
}

class CadastroDuplicadoError extends AplicacaoError {
    constructor(mensagem: string){
        super(mensagem)
    }
}

class UsuarioNaoEncontradoError extends AplicacaoError {
    constructor(mensagem: string){
        super(mensagem)
    }
}

class PublicacaoNaoEncontradaError extends AplicacaoError {
    constructor(mensagem: string){
        super(mensagem)
    }
}

class NenhumUsuarioCadastradoError extends AplicacaoError {
    constructor(mensagem: string){
        super(mensagem)
    }
}

class NaoehPublicacaoAvancadaError extends AplicacaoError {
    constructor(mensagem: string){
        super(mensagem)
    }
}

class InteracaoRepetidaError extends AplicacaoError {
    constructor(mensagem: string){
        super(mensagem)
    }
}


export{AplicacaoError, CadastroDuplicadoError, UsuarioNaoEncontradoError, PublicacaoNaoEncontradaError, NenhumUsuarioCadastradoError, NaoehPublicacaoAvancadaError, InteracaoRepetidaError}