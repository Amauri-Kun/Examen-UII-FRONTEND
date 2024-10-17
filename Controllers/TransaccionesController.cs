using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Examen.Models;
using Examen.Services;
using Microsoft.AspNetCore.Mvc;

namespace Examen.Controllers
{
    public class TransaccionesController : Controller
    {
        private readonly ITransacciones db;

        public TransaccionesController(ITransacciones db)
        {
            this.db = db;
        }

        [HttpGet]
        public IActionResult GetClientes()
        {
            return Json(db.ConsultarClientes());
        }

        [HttpGet]
        public IActionResult GetCliente(int id)
        {
            return Json(db.ConsultarCliente(id));
        }

        // [HttpPost]
        // public IActionResult AddCliente([FromBody] Cliente c)
        // {
        //     db.Agregar(c);
        //     return Json(new { Mensaje = "Insertado correctamente" });
        // }

        [HttpPost]
        public IActionResult AddCliente([FromBody] Cliente c)
        {
            var estatusPermitidos = new List<string> { "Pendiente", "Atendida", "Cancelada" };
            if (string.IsNullOrEmpty(c.estatus) || !estatusPermitidos.Contains(c.estatus))
            {
                return Json(new { Mensaje = "Estatus inválido. Debe ser 'Pendiente', 'Atendida' o 'Cancelada'" });
            }

            db.Agregar(c); 
            return Json(new { Mensaje = "Insertado correctamente" });
        }



        [HttpPost]
        public IActionResult UpdateCliente([FromBody] Cliente c)
        {
            int result = db.ActualizarCliente(c);
            if (result == -1)
            {
                return Json(new { Mensaje = "No se pudo actualizar" });
            }
            return Json(new { Mensaje = "Actualizado correctamente" });
        }

        [HttpDelete]
        public IActionResult DeleteCliente(int id)
        {
            bool eliminar = db.EliminarCliente(id);
            if (eliminar)
            {
                return Json(new { Mensaje = "Eliminado" });
            }
            return Json(new { Mensaje = "No se encontró" });
        }


        [HttpGet]
        public IActionResult GetClientesPorEstatus(string estatus)
        {
            var clientes = db.ConsultarClientes(); // Obtener todos los clientes
            var clientesFiltrados = clientes.Where(c => c.estatus == estatus).ToList(); // Filtrar por estatus
            if (clientesFiltrados.Count == 0)
            {
                return Json(new { Mensaje = "No se encontraron clientes con ese estatus" });
            }
            return Json(clientesFiltrados);
        }
    }
}