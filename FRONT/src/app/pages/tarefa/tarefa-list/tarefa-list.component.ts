import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Tarefa } from "src/app/models/tarefa.model";
 
@Component({
  selector: "app-tarefa-list",
  templateUrl: "./tarefa-list.component.html",
  styleUrls: ["./tarefa-list.component.css"],
})
export class TarefaListComponent {
    columnsTable: string [] = [
        "id",
        "titulo",
        "descricao",
        "status",
        "criadoEm",
    ];

    tarefas: Tarefa[] = []; 

    constructor(
        private readonly client: HttpClient,
        private readonly snackBar: MatSnackBar,
        private readonly router: Router
    ) {}

  public ngOnInit(): void {
    this.client
        .get<Tarefa[]>("https://localhost:7015/api/tarefa/listar")
        .subscribe({
            next: (tarefas) => {
                console.table(tarefas);
                this.tarefas = tarefas;
            },
            error: (erro) => {
                console.log(erro);
                this.snackBar.open('Erro ao obter dados do servidor', '', {
                duration: 3000, 
                });
            },
        });
    }

    public openForm(){
        this.router.navigate(['pages/tarefa/tarefa-register'])
    }
}