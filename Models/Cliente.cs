using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Examen.Models
{
    public class Cliente
    {
        public int id { get; set; }
        public string? name { get; set; }
        public string? latitud { get; set; }
        public string? longitud { get; set; } 
        public string? fechaInicio { get; set; } 
        public string? horaInicio { get; set; } 
        public string? fechaFin { get; set; } 
        public string? horaFin { get; set; } 
        public string? estatus { get; set; } 

    }
}