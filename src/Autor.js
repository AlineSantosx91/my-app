import React, { Component } from 'react';
import $ from 'jquery';
import InputCustomizado from './componentes/InputCustomizado';

export class FormularioAutor extends Component {

    constructor() {
        super();
        this.state = { lista: [], nome: '', email: '', senha: '' };
        this.enviaForm = this.enviaForm.bind(this);
        this.setNome = this.setNome.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setSenha = this.setSenha.bind(this);
    }

    render() {
        return (
            <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm.bind(this)} method="post">

                    <InputCustomizado id="nome" type="text" name="nome" value={this.state.nome} onChange={this.setNome} />
                    <InputCustomizado id="email" type="text" name="email" value={this.state.email} onChange={this.setEmail} />
                    <InputCustomizado id="senha" type="password" name="senha" value={this.state.senha} onChange={this.setSenha} />

                    <div className="pure-control-group">
                        <label></label>
                        <button type="submit" className="pure-button pure-button-primary">Gravar</button>
                    </div>
                </form>

            </div>
        );
    }


    enviaForm(evento) {
        //falar desse comportamento
        evento.preventDefault();
        $.ajax({
            url: 'http://localhost:8080/autores',
            contentType: 'application/json',
            dataType: 'json',
            type: 'post',
            data: JSON.stringify({ nome: this.state.nome, email: this.state.email, senha: this.state.senha }),
            success: function (resposta) {
                console.log("enviado com sucesso");
                this.componentDidMount();
            }.bind(this),
            error: function (resposta) {
                console.log("erro");
            }
        });
    }

    setNome(evento) {
        this.setState({ nome: evento.target.value });
    }

    setEmail(evento) {
        this.setState({ email: evento.target.value });
    }

    setSenha(evento) {
        this.setState({ senha: evento.target.value });
    }
}

export class TabelaAutores extends Component {

    constructor() {
        super();
        this.state = { lista: [] }
    }

    componentDidMount() {
        console.log("didMount");
        $.ajax({
          url: "http://localhost:8080/autores",
          dataType: 'json',
          success: function (resposta) {
            console.log("chegou a resposta");
            this.setState({ lista: resposta });
          }.bind(this)
        }
        );
      }

    render() {
        return (
            <div>
                <table className="pure-table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.lista.map(function (autor) {
                                return (
                                    <tr key={autor.id}>
                                        <td>{autor.nome}</td>
                                        <td>{autor.email}</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}
