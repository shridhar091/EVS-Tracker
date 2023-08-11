import React from "react"
import Station from "./Station"
const DashBoard=(props)=>{
    return(
        <div className="container">
            <h1>Admin DashBoard</h1>
        <div className="row">
        <div className="col-md-2">  
            </div>
            <div className="col-md-8">  
            <Station />
            </div>
            <div className="col-md-2">  
            
            </div>
        </div>
    </div>
    )
}

export default DashBoard