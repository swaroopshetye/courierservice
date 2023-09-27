using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CSM.Models
{
    public class OrdersToDisplay
    {
        public int order_id {get; set; }
        public string receiver_name {get; set; }
        public string receiver_email {get; set; }
        public string receiver_mobile {get; set; }
        public string receiver_address {get; set; }
        public int package_count {get; set; }
        public double amount {get; set; }
        public string status {get; set; }
        public int customer_id {get; set; }
        public int personnel_id {get; set; }
        public int tracking_id {get; set; }
        public string departed_from {get; set; }
        public string destination {get; set; }
        public string reached_at {get; set; }
        public DateTime updated_at {get; set; }
    }
}