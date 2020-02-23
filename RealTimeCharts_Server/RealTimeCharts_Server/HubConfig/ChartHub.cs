using Microsoft.AspNetCore.SignalR;
using RealTimeCharts_Server.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RealTimeCharts_Server.HubConfig
{
    public class ChartHub: Hub
    {
        /// <summary>
        /// Fetches data from client and broadcast it to all clients
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public async Task BroadcastChartData(List<ChartModel> data) => await Clients.All.SendAsync("broadcastchartdata", data);


    }
}
