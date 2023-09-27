function carousel() {
    return (<>
            <div style={{width:"50%", position:"relative"}}>
            <div id="carouselBasicExample" className="carousel slide carousel-fade" data-ride="carousel">

            <div className="carousel-indicators">
                <button type="button" data-mdb-target="#carouselBasicExample" data-mdb-slide-to="0"
                    className="rounded-circle active" style={{width:"7px", height: "7px"}} aria-current="true"
                    aria-label="Slide 1"></button>
                <button type="button" data-mdb-target="#carouselBasicExample" data-mdb-slide-to="1" aria-label="Slide 2"
                    className="rounded-circle" style={{width:"7px", height: "7px"}}></button>
                <button type="button" data-mdb-target="#carouselBasicExample" data-mdb-slide-to="2" aria-label="Slide 3"
                    className="rounded-circle" style={{width:"7px", height: "7px"}}></button>
            </div>

            <div className="carousel-inner shadow-5-strong" style={{borderBottomRightRadius:"64px"}}>

                <div className="carousel-item active">
                <img src="/Images/Home_Delivery.jpg" className="d-block vh-100 object-cover"
                    alt="15 years of experience in the IT industry"  />
                </div>


                <div className="carousel-item">
                <img src="/Images/Online_tracking.jpg" className="d-block vh-100 object-cover"
                    alt="243 completed projects" width={"100%"}/>
                </div>


                <div className="carousel-item" >
                <img src="/Images/Cheapest_Courier_Service.png" className="d-block vh-100 object-cover"
                    alt="53 satisfied customers" width={"100%"}/>
                </div>
            </div>

            <button className="carousel-control-prev" type="button" data-target="#carouselBasicExample"
                data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-target="#carouselBasicExample"
                data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
            </div>
            </div>
            </>);
}

export default carousel;