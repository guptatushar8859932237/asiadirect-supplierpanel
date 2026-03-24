import { useNavigate } from "react-router-dom"

export default function Profilemain() {
  const navigaet = useNavigate()
  return (

    <div class="wpWrapper">
      <div className="container-fluid">
        <div class="row g-4">
          <div class="col-xl-3 col-lg-4 col-md-4 col-sm-6"
            onClick={() => { navigaet('/supplier/Attendancemanagement') }}
          >
            <div class="cardDash">
              <h4 className="hd_dash">Leave</h4>
              <div class="iconParent">
                <div class="cardContent">
                  <p className="para_dash">
                    {/* <CountUp end={countdata?.no_of_clients} /> */}
                  </p>
                </div>
                <div class="iconGrad">
                  <i className="fa fa-user"></i>
                </div>
              </div>
              <div class="cardBottom bg1">
                <p>View More</p>
                <i class="fi fi-rr-angle-double-small-right"></i>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-lg-4 col-md-4 col-sm-6"
          //  onClick={() => { navigaet('/Admin/managefreight') }}
          >
            <div class="cardDash">
              <h4 className="hd_dash">Conversion</h4>
              <div class="iconParent">
                <div class="cardContent">
                  <p className="para_dash">
                    {/* <CountUp end={countdata?.no_of_freights} /> */}
                  </p>
                </div>
                <div class="iconGrad">
                  <i className="fa fa-plane"></i>
                </div>
              </div>
              <div class="cardBottom bg2">
                <p>View More</p>
                <i class="fi fi-rr-angle-double-small-right"></i>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-lg-4 col-md-4 col-sm-6"
          // onClick={() => { navigaet('/Admin/order') }}
          >
            <div class="cardDash">
              <h4 className="hd_dash">FeedBack</h4>
              <div class="iconParent">
                <div class="cardContent">
                  <p className="para_dash">
                    {/* <CountUp end={countdata?.no_of_orders} /> */}
                  </p>
                </div>
                <div class="iconGrad">
                  <i className="fa fa-truck"></i>
                </div>
              </div>
              <div class="cardBottom bg3">
                <p>View More</p>
                <i class="fi fi-rr-angle-double-small-right"></i>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-lg-4 col-md-4 col-sm-6"
          // onClick={() => { navigaet('/Admin/custom-clearance-order') }}
          >
            <div class="cardDash">
              <h4 className="hd_dash">Rating</h4>
              <div class="iconParent">
                <div class="cardContent">
                  <p className="para_dash">
                  </p>
                </div>
                <div class="iconGrad">
                  <i className="fa fa-bars"></i>
                </div>
              </div>
              <div class="cardBottom bg4">
                <p>View More</p>
                <i class="fi fi-rr-angle-double-small-right"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}