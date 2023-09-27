using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CSM.Models
{
    public class ComplaintData
    {
        public int id { get; set; }
        public string complaint { get; set; }

        public CheckToken data { get; set; }

        public int order_id { get; set; }
    }
}
