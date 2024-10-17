using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Examen.Models;

namespace Examen.Services
{
    public interface ITransacciones
    {
        public void Agregar(Cliente c);
        public List<Cliente> ConsultarClientes();
        public Cliente ConsultarCliente(int id);
        public int ActualizarCliente(Cliente c);
        public bool EliminarCliente(int id); 

    }
}