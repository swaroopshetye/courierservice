using CSM.Models;
using System;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;


namespace CSM.Controllers
{
    public class AdminController : ApiController
    {
        CSMEntities1 db = new CSMEntities1();
        JWTTokenizer tokenizer = new JWTTokenizer();


        [HttpPut]
        [Route("api/Admin/GetOrders")]
        public async Task<IHttpActionResult> GetOrders([FromBody] CheckToken token)
        {
            try
            {
                var user = await Task.Run(() =>db.User_Info
                    .Where(u => u.user_Id == token.user_id && u.token == token.token)
                    .FirstOrDefault());

                if (user == null)
                    return Ok("INVALID");

                string result = tokenizer.validateToken(token.token);

                if (result == "VALID")
                {
                    var orders = await Task.Run(() => db.Orders.ToList());
                    return Ok(orders);
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex + " An error occurred while processing the request.");
                return InternalServerError(ex);
            }
        }


        [HttpPost]
        [Route("api/Admin/GetCities")]
        public async Task<IHttpActionResult> GetCities([FromBody] CheckToken token)
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
                    var cities = await Task.Run(() => db.Dispatchers.Select(d => d.hub_location).Distinct().ToList());
                    return Ok(cities);
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex + "An error occurred while processing the request.");
                return InternalServerError(ex);
            }
        }


        [HttpPut]
        [Route("api/Admin/GetOrders/{id}")]
        public async Task<IHttpActionResult> GetOrders(string id, [FromBody] CheckToken token )
        {
            try{

                var user = await Task.Run(() => db.User_Info.ToList()
                         .Where(u => u.user_Id == token.user_id && u.token == token.token)
                         .FirstOrDefault());

                if (user == null)
                    return Ok("INVALID");


                string result = tokenizer.validateToken(token.token);

                if (result == "VALID")
                {
                    var orders = await Task.Run(()=>db.Orders.ToList()
                                    .Where(Orders => id == Orders.receiver_address)
                                    .Select(Orders => Orders)
                                    .ToList());
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


        [HttpPut]
        [Route("api/Admin/GetEmployees/{id}")]
        public async Task<IHttpActionResult> GetEmployees(string id, [FromBody] CheckToken token)
        {
            try{

                var user = await Task.Run(() => db.User_Info.ToList()
                                     .Where(u => u.user_Id == token.user_id && u.token == token.token)
                                     .FirstOrDefault());

                if (user == null)
                    return Ok("INVALID");


                string result = tokenizer.validateToken(token.token);

                if (result == "VALID")
                {
                    var roleId = await Task.Run((() => db.Roles.ToList()
                              .Where(Roles => Roles.role_name == id)
                              .Select(Roles => Roles.role_id).FirstOrDefault()));

                    var employees = await Task.Run(() => db.User_Info.ToList()
                             .Where(User_Info => User_Info.role_id == roleId)
                             .Select(User_Info => User_Info).ToList());

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

        [HttpPost]
        [Route("api/Admin/GetRoles")]
        public async Task<IHttpActionResult> GetRoles([FromBody] CheckToken token)
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
                    var roles = await Task.Run(() => db.Roles
                            .Where(role => role.role_id != 4)
                            .Select(role => role.role_name)
                            .Distinct()
                            .ToList());
                        return Ok(roles);
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
        [Route("api/Admin/DeleteEmployee/{id}")]
        public async Task<IHttpActionResult> DeleteEmployee(int id, [FromBody] CheckToken token)
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
                    var employeeToUpdate = await Task.Run(() => db.User_Info.ToList()
                                            .Where(User_Info => User_Info.user_Id == id)
                                            .Select(User_Info => User_Info)
                                            .FirstOrDefault());
                    employeeToUpdate.status = "INACTIVE";
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
        [Route("api/Admin/GetEmployeeDetails/{id}")]
        public async Task<IHttpActionResult> GetEmployeeDetails(int id,[FromBody] CheckToken token)
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
                    var employeeDetails = await Task.Run(() => db.User_Info.ToList()
                                               .Where(User_Info => User_Info.user_Id == id)
                                               .Select(User_Info => User_Info)
                                               .FirstOrDefault());
                        return Ok(employeeDetails);
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
        [Route("api/Admin/UpdateEmployeeDetails/{id}")]
        public async Task<IHttpActionResult> UpdateEmployeeDetails(int id, [FromBody] UpdateEmployee employee)
        {
            try
            {
                var user = await Task.Run(() => db.User_Info.ToList()
                     .Where(u => u.user_Id == employee.data.user_id && u.token == employee.data.token)
                     .FirstOrDefault());

                if (user == null)
                    return Ok("INVALID");


                string result = tokenizer.validateToken(employee.data.token);

                if (result == "VALID")
                {
                    var employeeToUpdate = await Task.Run(() => db.User_Info.ToList()
                                                    .Where(User_Info => User_Info.user_Id == id)
                                                    .FirstOrDefault());
                    employeeToUpdate.first_name = employee.user.first_name;
                    employeeToUpdate.last_name = employee.user.last_name;
                    employeeToUpdate.address = employee.user.address;
                    employeeToUpdate.mobile = employee.user.mobile;
                    employeeToUpdate.status = employee.user.status;
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

        [HttpPost]
        [Route("api/Admin/AddEmployeeDetails")]
        public async Task<IHttpActionResult> AddEmployeeDetails([FromBody] EmployeeData emp)
        {
            try
            {

                var user = await Task.Run(() => db.User_Info.ToList()
                                     .Where(u => u.user_Id == emp.data.user_id && u.token == emp.data.token)
                                     .FirstOrDefault());

                if (user == null)
                    return Ok("INVALID");

                string result = tokenizer.validateToken(emp.data.token);

                if (result == "VALID")
                {
                    User_Info newUser = new User_Info();
                    newUser = emp.user;
                    SHA512Encryption sha512 = new SHA512Encryption();
                    string encrypt = sha512.Encode(emp.user.password);
                    newUser.password = encrypt;
                    newUser.status = "ACTIVE";
                    newUser.role_id = await Task.Run(() => db.Roles.ToList()
                                            .Where(Roles => Roles.role_name == emp.role_name)
                                            .Select(Roles => Roles.role_id)
                                            .FirstOrDefault());
                    db.User_Info.Add(newUser);
                    if (newUser.role_id == 2)
                    {
                        Dispatcher dispatcher = new Dispatcher();
                        dispatcher.dispatcher_id = newUser.user_Id;
                        dispatcher.hub_location = newUser.address;
                        db.Dispatchers.Add(dispatcher);
                    }
                    else if (newUser.role_id == 3)
                    {
                        Delivery_Personnel delivery_Personnel = new Delivery_Personnel();
                        delivery_Personnel.personnel_id = newUser.user_Id;
                        delivery_Personnel.location = newUser.address;
                        db.Delivery_Personnel.Add(delivery_Personnel);
                    }
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

        [HttpPost]
        [Route("api/Admin/GetCustomerCities")]
        public async Task<IHttpActionResult> GetCustomerCities([FromBody]CheckToken token)
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
                    var cities = await Task.Run(() => db.User_Info.ToList()
                                        .Where(User => User.role_id == 4)
                                        .Select(User => User.address)
                                        .Distinct());
                    return Ok(cities);

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
        [Route("api/Admin/GetAllCustomers")]
        public async Task<IHttpActionResult> GetCustomers([FromBody] CheckToken token)
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
                    var customers = await Task.Run(() => db.User_Info.ToList()
                                               .Where(User => User.role_id == 4)
                                               .Select(User => User));
                    return Ok(customers);
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
        [Route("api/Admin/GetCustomers/{id}")]
        public async Task<IHttpActionResult> GetCustomers(string id, [FromBody] CheckToken token)
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
                var customers = await Task.Run(() => db.User_Info.ToList()
                                    .Where(User => id == User.address && User.role_id == 4)
                                    .Select(User => User)
                                    .ToList());
                    return Ok(customers);

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
        [Route("api/Admin/GetMyProfile")]
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
        [Route("api/Admin/SaveMyProfile/{id}")]
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
        [Route("api/Admin/ResetPassword/{id}")]
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
