using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CSM.Models
{
    public class CheckToken
    {
        public int user_id { get; set; }
        public string token { get; set; }

        public int role_id { get; set; }
    }
}