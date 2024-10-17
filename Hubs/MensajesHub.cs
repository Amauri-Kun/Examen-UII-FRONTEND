using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace Examen.Hubs
{
    public class MensajesHub : Hub
    {
        public async Task EnviarMensaje(String name, String date, String time){
            await Clients.All.SendAsync("EnviarMensajeTodos", name, date, time);
        }
    }
}