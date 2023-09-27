using CSM.Models;
using System;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Razor.Tokenizer;

namespace CSM.Controllers
{
    public class TrackingController : ApiController
    {

        [HttpGet]
        [Route("api/Tracking/GetShipmentsDetails/{id}")]
        public async Task<IHttpActionResult> GetShipmentDetails(int id)
        {
            CSMEntities1 db = new CSMEntities1 ();

            try
            {

                    var shipment = await Task.Run(() => db.Trackings.ToList()
                                             .Where(Track => Track.tracking_id == id)
                                             .FirstOrDefault());
                    return Ok(shipment);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex + " An error occurred while processing the request.");
                return InternalServerError(ex);
            }
        }
    }
}
