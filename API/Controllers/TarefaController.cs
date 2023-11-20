using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Data;
using API.Models;

namespace API.Controllers;

[Route("api/tarefa")]
[ApiController]
public class TarefaController : ControllerBase
{
    private readonly AppDataContext _context;

    public TarefaController(AppDataContext context) =>
        _context = context;

    // GET: api/tarefa/listar
    [HttpGet]
    [Route("listar")]
    public IActionResult Listar()
    {
        try
        {
            List<Tarefa> tarefas = _context.Tarefas.Include(x => x.Categoria).ToList();
            return Ok(tarefas);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    // POST: api/tarefa/cadastrar
    [HttpPost]
    [Route("cadastrar")]
    public IActionResult Cadastrar([FromBody] Tarefa tarefa)
    {
        try
        {
            Categoria? categoria = _context.Categorias.Find(tarefa.CategoriaId);
            if (categoria == null)
            {
                return NotFound();
            }
            tarefa.Status = "Nao iniciada";
            tarefa.Categoria = categoria;
            _context.Tarefas.Add(tarefa);
            _context.SaveChanges();
            return Created("", tarefa);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    // PATCH: api/tarefa/alterar
    [HttpPatch]
    [Route("alterar/{id}")]
    public IActionResult Alterar([FromRoute] int id, [FromBody] Tarefa tarefa)
    {
        try
        {
            Categoria categoria = _context.Categorias.Find(tarefa.CategoriaId);

            if (categoria == null)
            {
                return NotFound("Categoria não encontrada.");
            }

            Tarefa tarefaDb = _context.Tarefas.FirstOrDefault(x => x.TarefaId == id);

            string newStatus = string.Empty;

            if (tarefaDb.Status == "Nao iniciada") {
                newStatus = "Em andamento";

            } else if (tarefaDb.Status == "Em andamento") {
                newStatus = "Concluido";
            }

            if (tarefaDb != null)
            {
                tarefaDb.Titulo = tarefa.Titulo;
                tarefaDb.Descricao = tarefa.Descricao;
                tarefaDb.Status = newStatus;

                tarefaDb.Categoria = categoria;

                _context.Tarefas.Update(tarefaDb);
                _context.SaveChanges();

                return Ok($"Tarefa atualizada com sucesso! Status alterado para '{newStatus}'");
            }

            return NotFound($"Tarefa com ID '{id}' não encontrado.");
        }
        catch (Exception e)
        {
            return BadRequest($"Erro ao atualizar tarefa: {e.Message}");
        }
    }

    // GET: api/tarefa/naoconcluidas
    [HttpGet]
    [Route("naoconcluidas")]
    public IActionResult ListarNaoConcluidas()
    {
        try
        {
            List<Tarefa> tarefas = _context.Tarefas
                .Include(x => x.Categoria)
                .Where(x => x.Status == "Nao iniciada" || x.Status == "Em andamento")
                .ToList();

            return Ok(tarefas);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    // GET: api/tarefa/concluidas
    [HttpGet]
    [Route("concluidas")]
    public IActionResult ListarConcluidas()
    {
        try
        {
            List<Tarefa> tarefas = _context.Tarefas
                .Include(x => x.Categoria)
                .Where(x => x.Status == "Concluido")
                .ToList();

            return Ok(tarefas);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}
