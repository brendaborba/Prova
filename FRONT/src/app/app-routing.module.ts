import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TarefaListComponent } from "./pages/tarefa/tarefa-list/tarefa-list.component";
import { TarefaRegisterComponent } from "./pages/tarefa/tarefa-register/tarefa-register.component";

const routes: Routes = [
  {
    path: "",
    component: TarefaListComponent,
  },
  {
    path: "pages/tarefa/tarefa-list",
    component: TarefaListComponent,
  },
  {
    path: "pages/tarefa/tarefa-register",
    component: TarefaRegisterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
