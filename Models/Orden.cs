using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Examen.Models
{
    public class Orden
    {
        public int ordenesPendientes { get; set; } 
        public int ordenesAtendidas { get; set; } 
        public int ordenenesCanceladas { get; set; } 
    }
}