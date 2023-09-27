using CSM.Models;
using System.Web.Http;
using System.Linq;
using System.Web.Http.Cors;
using System.Threading.Tasks;
using System;
using System.Security.Cryptography;
using System.Text;
using System.Data.Entity.Migrations;

namespace CSM.Controllers
{
    [RoutePrefix("api/Login")]
    public class LoginController : ApiController
    {
        CSMEntities1 db = new CSMEntities1();

        [HttpPost]
        [Route("Login")]
        public async Task<IHttpActionResult> Login([FromBody] Login login)
        {
            SHA512Encryption sha512 = new SHA512Encryption();
            string encrypt = sha512.Encode(login.password);
            JWTTokenizer tokenizer = new JWTTokenizer();
            User_Info user = await Task.Run(() => db.User_Info.ToList()
                                .Where(User_Info => User_Info.email == login.email && (User_Info.password == encrypt || User_Info.password == login.password) && User_Info.status != "INACTIVE")
                                .Select(User_Info => User_Info)
                                .FirstOrDefault());
            if (user != null)
            {
                string data = user.first_name;
                TimeSpan expirationTime = TimeSpan.FromMinutes(10);
                user.token = tokenizer.GenerateToken(data,expirationTime);
                var result = new { first_name = user.first_name, user_id =  user.user_Id, role_id = user.role_id, token = user.token};
                db.SaveChanges();
                return Ok(result);

            }
            else
            {
                return Ok(0);
            }
        }


        [HttpPost]
        [Route("SignUp")]
        public async Task<IHttpActionResult> SignUp([FromBody] User_Info user)
        {
            user.role_id = 4;
            user.status = "ACTIVE";
            SHA512Encryption sha512 = new SHA512Encryption();
            string encrypt = sha512.Encode(user.password);
            user.password = encrypt;
            await Task.Run(() => db.User_Info.Add(user));       
            int result = await Task.Run(() => db.SaveChanges());
            return Ok(result);
        }
    }
}