using DataAccess.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Entities
{
    public class ChatEntry
    {
        public DateTime Timestamp { get; set; }
        public List<string> Informations { get; set; }
    }
}
