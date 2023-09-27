using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CSM.Models
{
    public class MyOrder
    {
        public int Id { get ; set; }

        public CheckToken data { get; set; }
        public string Status { get; set; }
    }
}