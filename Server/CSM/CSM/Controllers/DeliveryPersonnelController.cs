using CSM.Models;
using System;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Razor.Tokenizer;


namespace CSM.Controllers
{
    public class DeliveryPersonnelController : ApiController
    {
        CSMEntities1 db = new CSMEntities1 ();    
        JWTTokenizer tokenizer = new JWTTokenizer ();


        [HttpGet]
        [Route("api/DeliveryPersonnel/GetMyOrders/{id}")]
        public IHttpActionResult GetMyOrders(int id)
        {
            var orders = (from Order in db.Orders.ToList()
                          where Order.personnel_id == id
                          select Order).ToList();

            return Ok(orders);

        }


        [HttpPut]
        [Route("api/DeliveryPersonnel/OrderDelivered/{id}")]
        public IHttpActionResult OrderDelivered(int id)
        {
            var orders = (from Order in db.Orders.ToList()
                          where Order.order_id == id
                          select Order).FirstOrDefault();
            orders.status = "Delivered";
            int result = db.SaveChanges();  
            return Ok(result);

        }


        [HttpPut]
        [Route("api/DeliveryPersonnel/OrderUndelivered/{id}")]
        public IHttpActionResult OrderUndelivered(int id)
        {
            var orders = (from Order in db.Orders.ToList()
                          where Order.order_id == id
                          select Order).FirstOrDefault();
            if (orders.status!="Delivered")
            {
                orders.status = "Undelivered";
            }
            
            int result = db.SaveChanges();
            return Ok(result);

        }

        [HttpPost]
        [Route("api/DeliveryPersonnel/AddComplaint")]
        public IHttpActionResult AddComplaint([FromBody]ComplaintData data)
        {
            try
            {
                Complaint newComplaint = new Complaint();
                newComplaint.complaint1 = data.complaint;
                newComplaint.placed_date=DateTime.Now;  
                newComplaint.customer_id=data.id;
                newComplaint.order_id = data.order_id;
                newComplaint.status = "IN PROCESS";
                newComplaint.role_id = 3;

                db.Complaints.Add(newComplaint);
                int result = db.SaveChanges();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        [Route("api/DeliveryPersonnel/GetOrderId/{id}")]
        public async Task<IHttpActionResult> GetOrdeId(int id)
        {
            try
            {
                var OrderId = await Task.Run(() => db.Orders.ToList()
                    .Where(Order => Order.personnel_id == id)
                    .Select(Order => Order.order_id).ToList());
                return Ok(OrderId);
            }
            catch (Exception ex)
            {
                // Log the exception for debugging purposes
                Console.WriteLine(ex + "An error occurred while processing the request.");
                return InternalServerError(ex);
            }
        }

        [HttpPut]
        [Route("api/DeliveryPersonnel/GetMyProfile")]
        public async Task<IHttpActionResult> GetMyProfile([FromBody] CheckToken token)
        {
            try
            {
                var user = await Task.Run(() => db.User_Info.ToList()
                     .Where(u => u.user_Id == token.user_id && u.token == token.token)
                     .FirstOrDefault());

                if (user == null)
                    return Ok("INVALID");


                string result = tokenizer.validateToken(token.token);

                if (result == "VALID")
                {
                    return Ok(user);
                }
                return Ok(result);

            }
            catch (Exception ex)
            {
                // Log the exception for debugging purposes
                Console.WriteLine(ex + "An error occurred while processing the request.");
                return InternalServerError(ex);
            }
        }




        [HttpPut]
        [Route("api/DeliveryPersonnel/SaveMyProfile/{id}")]
        public async Task<IHttpActionResult> SaveMyProfile(int id, [FromBody] EmployeeData user)
        {
            try
            {
                var loginuser = await Task.Run(() => db.User_Info.ToList()
                     .Where(u => u.user_Id == user.data.user_id && u.token == user.data.token)
                     .FirstOrDefault());

                if (loginuser == null)
                    return Ok("INVALID");


                string result = tokenizer.validateToken(user.data.token);

                if (result == "VALID")
                {
                    var employeeToUpdate = await Task.Run(() => db.User_Info.ToList()
                                                    .Where(User_Info => User_Info.user_Id == id)
                                                    .FirstOrDefault());
                    employeeToUpdate.first_name = user.user.first_name;
                    employeeToUpdate.last_name = user.user.last_name;
                    employeeToUpdate.address = user.user.address;
                    employeeToUpdate.mobile = user.user.mobile;
                    int save = db.SaveChanges();
                    return Ok(save);
                }

                return Ok(result);

            }
            catch (Exception ex)
            {
                // Log the exception for debugging purposes
                Console.WriteLine(ex + "An error occurred while processing the request.");
                return InternalServerError(ex);
            }
        }


        [HttpPut]
        [Route("api/DeliveryPersonnel/ResetPassword/{id}")]
        public async Task<IHttpActionResult> ResetPassword(int id, [FromBody] EmployeeData user)
        {
            try
            {
                var loginuser = await Task.Run(() => db.User_Info.ToList()
                     .Where(u => u.user_Id == user.data.user_id && u.token == user.data.token)
                     .FirstOrDefault());

                if (loginuser == null)
                    return Ok("INVALID");


                string result = tokenizer.validateToken(user.data.token);

                if (result == "VALID")
                {
                    var employeeToUpdate = await Task.Run(() => db.User_Info.ToList()
                                                    .Where(User_Info => User_Info.user_Id == id && User_Info.email == user.user.email)
                                                    .FirstOrDefault());
                    SHA512Encryption sha512 = new SHA512Encryption();
                    string encrypt = sha512.Encode(user.user.password);
                    employeeToUpdate.password = encrypt;
                    int save = db.SaveChanges();
                    return Ok(save);
                }

                return Ok(result);

            }
            catch (Exception ex)
            {
                // Log the exception for debugging purposes
                Console.WriteLine(ex + "An error occurred while processing the request.");
                return InternalServerError(ex);
            }
        }


    }
}








