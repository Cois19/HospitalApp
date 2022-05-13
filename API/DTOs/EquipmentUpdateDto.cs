using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class EquipmentUpdateDto
    {
        public string Description { get; set; }
        public string HowToUse { get; set; }
        public string Category { get; set; }
        public string Hospital { get; set; }
    }
}