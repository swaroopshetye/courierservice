using CSM.Models;
using System;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;

namespace CSM.Controllers
{
    public class DispatcherController : ApiController
    {
        CSMEntities1 db = new CSMEntities1();
        JWTTokenizer tokenizer = new JWTTokenizer();

/*
        [HttpGet]
        [Route("api/Dispatcher/GetEmployees")]
        public async Task<IHttpActionResult> GetEmployees()
        {
            try
            {
                var employeeDetails = await Task.Run(() => db.User_Info.ToList()
                                       .Where(User_Info => User_Info.role_id == 3 && User_Info.address == "Satara")
                                       .Select(User_Info => User_Info)
                                       .FirstOrDefault());
                return Ok(employeeDetails);
            }
            catch (Exception ex)
            {
                // Log the exception for debugging purposes
                Console.WriteLine(ex + "An error occurred while processing the request.");
                return InternalServerError(ex);
            }
        }
*/


        [HttpPost]
        [Route("api/Dispatcher/GetOrders")]
        public async Task<IHttpActionResult> GetOrders([FromBody] CheckToken token)
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
                    var orders = await Task.Run(() => (from Order in db.Orders
                                                      join Tracking in db.Trackings on Order.order_id equals Tracking.order_id
                                                      join Dispatcher in db.Dispatchers on Tracking.departed_from equals Dispatcher.hub_location
                                                      where Dispatcher.dispatcher_id == token.user_id
                                                      select new OrdersToDisplay {
                                                        order_id = Order.order_id,
                                                        receiver_name = Order.receiver_name,
                                                        receiver_email = Order.receiver_email,
                                                        receiver_mobile = Order.receiver_mobile,
                                                        receiver_address = Order.receiver_address,
                                                        package_count = Order.package_count,
                                                        amount = Order.amount,
                                                        status = Order.status,
                                                        customer_id = Order.customer_id,
                                                        personnel_id = Order.personnel_id,
                                                        tracking_id = Tracking.tracking_id,
                                                        departed_from = Tracking.departed_from,
                                                        destination = Tracking.destination,
                                                        reached_at = Tracking.reached_at,
                                                        updated_at= Tracking.updated_at,
                                                      }).ToList()); 
                    return Ok(orders);
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




        [HttpPost]
        [Route("api/Dispatcher/GetPackageType")]
        public async Task<IHttpActionResult> GetPackageType([FromBody] CheckToken data)
        {
            try
            {
                var user = await Task.Run(() => db.User_Info.ToList()
                        .Where(u => u.user_Id == data.user_id && u.token == data.token)
                        .FirstOrDefault());

                if (user == null)
                    return Ok("INVALID");

                string result = tokenizer.validateToken(data.token);
                if (result == "VALID")
                {
                    var type = await Task.Run(() => db.Package_Price.ToList()
                    .Select(Package => Package)
                    .ToList());
                    return Ok(type);
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



        [HttpPost]
        [Route("api/Dispatcher/GetReceiverAddress")]
        public async Task<IHttpActionResult> GetReceiverAddress([FromBody] CheckToken data)
        {
            try
            {
                var user = await Task.Run(() => db.User_Info.ToList()
                        .Where(u => u.user_Id == data.user_id && u.token == data.token)
                        .FirstOrDefault());

                if (user == null)
                    return Ok("INVALID");

                string result = tokenizer.validateToken(data.token);
                if (result == "VALID")
                {
                    var location = await Task.Run(() => db.Dispatchers.ToList()
                    .Select(Dispatcher => Dispatcher.hub_location)
                    .ToList());
                    return Ok(location);
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
        [Route("api/Dispatcher/GetAmount/{id}")]
        public async Task<IHttpActionResult> GetPackageType(string id, [FromBody] CheckToken data)
        {
            try
            {
                var user = await Task.Run(() => db.User_Info.ToList()
                        .Where(u => u.user_Id == data.user_id && u.token == data.token)
                        .FirstOrDefault());

                if (user == null)
                    return Ok("INVALID");

                string result = tokenizer.validateToken(data.token);
                if (result == "VALID")
                {
                    var type = await Task.Run(() => db.Package_Price.ToList()
                    .Where(Package => Package.package_type == id)
                    .Select(Package => Package.package_price1)
                    .FirstOrDefault());
                    return Ok(type);
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


        [HttpPost]
        [Route("api/Dispatcher/AddOrder")]
        public async Task<IHttpActionResult> AddOrder([FromBody] EmployeeData data)
        {
            try
            {
                var user = await Task.Run(() => db.User_Info.ToList()
                        .Where(u => u.user_Id == data.data.user_id && u.token == data.data.token)
                        .FirstOrDefault());

                if (user == null)
                    return Ok("INVALID");

                string result = tokenizer.validateToken(data.data.token);
                if (result == "VALID")
                {
                    data.order.customer_id = data.data.user_id;
                    data.order.status = "In Transit";
                    data.order.personnel_id = (from Delivery in db.Delivery_Personnel.ToList()
                                               where Delivery.location.ToUpper() == data.order.receiver_address.ToUpper()
                                               select Delivery.personnel_id).FirstOrDefault();
                    db.Orders.Add(data.order);
                    db.SaveChanges();

                    var tracking = new Tracking
                    {
                        departed_from = data.order.User_Info.address,
                        reached_at = data.order.User_Info.address,
                        destination = data.order.receiver_address,
                        updated_at = DateTime.UtcNow    ,
                        status = data.order.status,
                        order_id = data.order.order_id,
                    };

                    db.Trackings.Add(tracking);
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
        [Route("api/Dispatcher/GetEmployees")]
        public async Task<IHttpActionResult> GetEmployees([FromBody] CheckToken token)
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


                    var employees = await Task.Run( () => (from Dispatcher in db.Dispatchers.ToList()
                                    join DeliveryPersonnal in db.Delivery_Personnel on Dispatcher.hub_location equals DeliveryPersonnal.location
                                    where Dispatcher.dispatcher_id == token.user_id
                                    select DeliveryPersonnal).ToList());;
                    return Ok(employees);
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
        [Route("api/Dispatcher/GetComplaints/{id}")]
        public async Task<IHttpActionResult> GetComplaints(int id, [FromBody] CheckToken data)
        {
            try
            {
                var user = await Task.Run(() => db.User_Info.ToList()
                                    .Where(u => u.user_Id == data.user_id && u.token == data.token)
                                    .FirstOrDefault());

                if (user == null)
                    return Ok("INVALID");

                string result = tokenizer.validateToken(data.token);
                if (result == "VALID")
                {
                    var complaintDetails = await Task.Run(() => db.Complaints.ToList()
                                       .Where(Complaint => Complaint.role_id == id)
                                       .Select(Complaint => Complaint));
 
                    return Ok(complaintDetails);
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

        [HttpPost]
        [Route("api/Dispatcher/GetMyProfile")]
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
        [Route("api/Dispatcher/SaveMyProfile/{id}")]
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
        [Route("api/Dispatcher/ResetPassword/{id}")]
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
