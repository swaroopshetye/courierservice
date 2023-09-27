import "../../css/style.css"

function DpDashboard (){
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
        <h1>Delivery Personnel</h1>
        <i class="fas fa-user-cog"></i>
      </div>
      <center>
      <div class="users">
        <div class="card">
          <h4>Sham Patil</h4>
          <h6>Today's Data</h6>
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
      </center>

      <section class="attendance">
        <div class="attendance-list">
          <h1>Pending Deliveries</h1>
          <table class="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Package Type</th>
                <th>Delivery Date</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>01</td>
                <td>Sameer Mujawar</td>
                <td>Small Delicate</td>
                <td>31-08-23</td>
              
                <td><button>View</button></td>
              </tr>
              <tr >
                <td>02</td>
                <td>Aniket Kadam</td>
                <td>Medium Non-Delicate</td>
                <td>31-08-23</td>
                
                <td><button>View</button></td>
              </tr>
              <tr>
                <td>03</td>
                <td>Nidhi Bhingarde</td>
                <td>Large-Delicate</td>
                <td>31-08-23</td>
                
                <td><button>View</button></td>
              </tr>
              <tr>
                <td>04</td>
                <td>Swaroop Shetye</td>
                <td>Delicate</td>
                <td>01-09-23</td>
               
                <td><button>View</button></td>
              </tr>
               <tr >
                <td>05</td>
                <td>Rashmi Kulkarni</td>
                <td>small Non-Delicate</td>
                <td>01-09-23</td>
               
                <td><button>View</button></td>
              </tr>
              <tr >
                <td>06</td>
                <td>Tejas Bandbe</td>
                <td>Medium Non-Delicate</td>
                <td>01-09-23</td>
                
                <td><button>View</button></td>
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

export default DpDashboard;