import React from "react";

import StaffStations from "./StaffStations";

const StaffDashBoard=(props)=>{

    return(
        <div className="container-fluid">
        <div className="row">   
            <div className="col-md-6 divPadding ">
                <StaffStations />
            </div>
            
        </div>
    </div>
    )
}
export default StaffDashBoard