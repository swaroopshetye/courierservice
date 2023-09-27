import "../../css/style.css"

function Dashboard (){
    return(
        
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title></title>

</head>
<body>
  <div class="container">
    <section class="main">
      <div class="main-top">
        <h1>Dispatcher's Details:</h1>
        <i class="fas fa-user-cog"></i>
      </div>
      <div class="users">
        <div class="card">
          <h4>Renu Khawate</h4>
          <h6>Location:Sangli</h6>
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
          <h4>Manas Patil</h4>
          <h6>Location:Pune</h6>

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
        

        <div class="card">
          <h4>Sammed Chavan</h4>
          <h6>Location:Kolhapur</h6>
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
          <h4>Sachin Perke</h4>
          <h6>Location:Satara</h6>
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
        
        
      </div>

      <section class="attendance">
        <div class="attendance-list">
          <h1>Delivery Personnel Issues:</h1>
          <table class="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Location</th>
                <th>Date</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
            <tr >
                <td>01</td>
                <td>Rajesh Jadhav</td>
                <td>Pune</td>
                <td>31-08-23</td>
               
                <td><button>View Issue</button></td>
              </tr>
              <tr  >
                <td>02</td>
                <td>Swaroop Shetye</td>
                <td>Sangli</td>
                <td>30-08-23</td>
                <td><button>View Issue</button></td>
              </tr>
              <tr>
                <td>03</td>
                <td>Manoj Shinde</td>
                <td>Kolhapur</td>
                <td>29-08-23</td>
                
                <td><button>View Issue</button></td>
              </tr>
              <tr>
                <td>04</td>
                <td>Pragati More</td>
                <td>Satara</td>
                <td>28-08-23</td>
              
                <td><button>View Issue</button></td>
              </tr>
               <tr >
                <td>05</td>
                <td>Ashish Kale</td>
                <td>Pune</td>
                <td>28-08-23</td>
                
                <td><button>View Issue</button></td>
              </tr>
               
            </tbody>
          </table>
        </div>
      </section>
    </section>
  </div>

</body>
</html>

    );
}

export default Dashboard;