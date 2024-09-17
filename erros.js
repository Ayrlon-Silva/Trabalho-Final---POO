"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NenhumaPublicacaoExistenteError = exports.InteracaoRepetidaError = exports.NaoehPublicacaoAvancadaError = exports.NenhumUsuarioCadastradoError = exports.PublicacaoNaoEncontradaError = exports.UsuarioNaoEncontradoError = exports.CadastroDuplicadoError = exports.AplicacaoError = void 0;
class AplicacaoError extends Error {
    constructor(mensagem) {
        super(mensagem);
    }
}
exports.AplicacaoError = AplicacaoError;
class CadastroDuplicadoError extends AplicacaoError {
    constructor(mensagem) {
        super(mensagem);
    }
}
exports.CadastroDuplicadoError = CadastroDuplicadoError;
class UsuarioNaoEncontradoError extends AplicacaoError {
    constructor(mensagem) {
        super(mensagem);
    }
}
exports.UsuarioNaoEncontradoError = UsuarioNaoEncontradoError;
class PublicacaoNaoEncontradaError extends AplicacaoError {
    constructor(mensagem) {
        super(mensagem);
    }
}
exports.PublicacaoNaoEncontradaError = PublicacaoNaoEncontradaError;
class NenhumUsuarioCadastradoError extends AplicacaoError {
    constructor(mensagem) {
        super(mensagem);
    }
}
exports.NenhumUsuarioCadastradoError = NenhumUsuarioCadastradoError;
class NenhumaPublicacaoExistenteError extends AplicacaoError {
    constructor(mensagem) {
        super(mensagem);
    }
}
exports.NenhumaPublicacaoExistenteError = NenhumaPublicacaoExistenteError;
class NaoehPublicacaoAvancadaError extends AplicacaoError {
    constructor(mensagem) {
        super(mensagem);
    }
}
exports.NaoehPublicacaoAvancadaError = NaoehPublicacaoAvancadaError;
class InteracaoRepetidaError extends AplicacaoError {
    constructor(mensagem) {
        super(mensagem);
    }
}
exports.InteracaoRepetidaError = InteracaoRepetidaError;
