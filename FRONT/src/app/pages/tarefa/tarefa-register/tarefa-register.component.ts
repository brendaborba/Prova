import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Categoria } from "src/app/models/categoria.model";
import { Tarefa } from "src/app/models/tarefa.model";

@Component({
    selector: "app-tarefa-register",
    templateUrl: "./tarefa-register.component.html",
    styleUrls: ["./tarefa-register.component.css"],
})
export class TarefaRegisterComponent {
    titulo: string = "";
    descricao: string = "";
    status: string = "";
    categoriaId: number = 0;
    categorias: Categoria[] = [];

    constructor(
        private client: HttpClient,
        private router: Router,
        private snackBar: MatSnackBar,
    ) {}

    ngOnInit(): void {
    this.client
        .get<Categoria[]>("https://localhost:7015/api/categoria/listar")
        .subscribe({
        next: (categorias) => {
          this.categorias = categorias;
        },
        error: (erro) => {
          console.log(erro);
          this.snackBar.open('Erro ao obter dados do servidor', '', {
            duration: 3000,
          });
        },
      });
  }

    cadastrar(): void {
        let tarefas: Tarefa = {
            titulo: this.titulo,
            descricao: this.descricao,
            categoriaId: this.categoriaId,
            status: this.status
        };
        console.log(tarefas);
    this.client
        .post<Tarefa>("https://localhost:7015/api/tarefa/cadastrar", tarefas)
        .subscribe({
            next: (tarefa) => {
                console.log(tarefa)
                this.snackBar.open( "Tarefa cadastrada com sucesso!!", "TAREFA",
                {
                    duration: 1500,
                    horizontalPosition: "right",
                    verticalPosition: "top",
                }
          );
          this.router.navigate(["pages/tarefa/tarefa-list"]);
        },
        error: (erro) => {
          console.log(erro);
        },
      });
  }

  public voltar(){
    this.router.navigate(['pages/tarefa/tarefa-list'])
  }
}
