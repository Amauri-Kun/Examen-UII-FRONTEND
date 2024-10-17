using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Examen.Models;

namespace Examen.Services
{
    public class Transacciones : ITransacciones
    {
        List<Cliente> clientes;
        private int ultimoId = 0;

        public Transacciones()
        {
            clientes = new List<Cliente>();
        }

        public int ActualizarCliente(Cliente c)
        {
            Cliente temp = clientes.FirstOrDefault(x => x.id == c.id)!;
            if (temp != null)
            {
                temp.estatus = c.estatus;
                return clientes.IndexOf(temp);
            }
            return -1;
        }

        public void Agregar(Cliente c)
        {
            // ultimoId++;
            // c.id = ultimoId;
            clientes.Add(c);
        }

        public Cliente ConsultarCliente(int id)
        {
            return clientes.FirstOrDefault(x => x.id == id)!;
        }

        public List<Cliente> ConsultarClientes()
        {
            return clientes;
        }

        public bool EliminarCliente(int id)
        {
            Cliente cliente = clientes.FirstOrDefault(x => x.id == id)!;
            if (cliente != null)
            {
                clientes.Remove(cliente);
                return true;
            }
            return false;
        }


    }
}