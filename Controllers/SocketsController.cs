using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Examen.Hubs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace Examen.Controllers
{
    public class SocketsController : Controller
    {

        private readonly IHubContext<MensajesHub> hubContext;
        public SocketsController(IHubContext<MensajesHub> hubContext){
            this.hubContext = hubContext;
        }
        public IActionResult Home(){
            return View();
        }

        public IActionResult Form(){
            return View();
        }

        public IActionResult Dashboard(){
            return View();
        }

        public IActionResult Logistics(){
            return View();
        }
    }
}