import "../../css/style.css"

function DispatcherDashboard (){
    return(<>
    <div class="container">
    <section class="main">
      <div class="main-top">
        <h1>Delivery Personnel Details:</h1>
        <i class="fas fa-user-cog"></i>
      </div>
      <div class="users" >
        <div class="card">
          <h4>Sham Pawar</h4>
          <p>Today's Data</p>
          <div class="per">
            <table>
              <tr>
                <td><span>65%</span></td>
                <td><span>35%</span></td>
              </tr>
              <tr>
                <td>Delivered</td>
                <td>Undelivered</td>
              </tr>
            </table>
          </div>
          <button>Click For Details</button>
        </div>
        
        <div class="card">
          <h4>Satyam Patil</h4>

          <p>Today's Data</p>
          <div class="per">
            <table>
              <tr>
                <td><span>45%</span></td>
                <td><span>55%</span></td>
              </tr>
              <tr>
                <td>Delivered</td>
                <td>Undelivered</td>
              </tr>
            </table>
          </div>
          <button>Click For Details</button>
        </div>       
      </div>
      <section class="attendance">
        <div class="attendance-list">
          <h1>Sham Pawar's Orders:</h1>
          <table class="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Delivery Date</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
            <tr >
                <td>01</td>
                <td>Rushi Patel</td>
                <td>29-08-23</td>
               
                <td><button>View Details</button></td>
              </tr>
              <tr  >
                <td>02</td>
                <td>Mrunal Khapre</td>
                <td>30-08-23</td>
                <td><button>View Details</button></td>
              </tr>
              <tr>
                <td>03</td>
                <td>Manoj Shinde</td>
                <td>29-08-23</td>
                
                <td><button>View Details</button></td>
              </tr>
              <tr>
                <td>04</td>
                <td>Apurva More</td>
                <td>29-08-23</td>
              
                <td><button>View Details</button></td>
              </tr>
   
            </tbody>
          </table>
        </div>
      </section>



      <section class="attendance">
        <div class="attendance-list">
          <h1>Satyam Patils's Orders:</h1>
          <table class="table">
            <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Delivery Date</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
            <tr >
                <td>01</td>
                <td>Mahesh Tiwari</td>
                <td>29-08-23</td>
               
                <td><button>View Details</button></td>
              </tr>
              <tr  >
                <td>02</td>
                <td>Tushar Mali</td>
                <td>29-08-23</td>
                <td><button>View Details</button></td>
              </tr>
              <tr>
                <td>03</td>
                <td>Guru Kore</td>
                <td>30-08-23</td>
                
                <td><button>View Details</button></td>
              </tr>
              <tr>
                <td>04</td>
                <td>Avdhut Jamdade</td>
                <td>30-08-23</td>
              
                <td><button>View Details</button></td>
              </tr>

              <tr>
                <td>05</td>
                <td>Tejashree Patil</td>
                <td>31-08-23</td>
              
                <td><button>View Details</button></td>
              </tr>

              <tr>
                <td>06</td>
                <td>Roshani Mohite</td>
                <td>01-09-23</td>
              
                <td><button>View Details</button></td>
              </tr>
               
            </tbody>
          </table>
        </div>
      </section>
    </section>
  </div>
    </>);
}

export default DispatcherDashboard;