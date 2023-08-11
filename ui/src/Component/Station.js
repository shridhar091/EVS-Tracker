
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { StartEditStation, startRegisterStation } from '../Actions/stationAction'
import Location from './Location'

const Station = (props) => {
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [landmark, setLandmark] = useState('')
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [chargingOptions, setChargingOptions] = useState([{ portType: '',price:'' }])
    const [staff, setStaff] = useState('')
    const [chargingOptionId, setChargingOptionIds] = useState('')
    const [showMap, setShowMap] = useState(false)
    const [errors, setErrors] = useState({});
    
    useEffect(() => {
        if (props.data) {
            setName(props.data.name || "")
            setAddress(props.data.address || "")
            setLandmark(props.data.landmark || "")
            setLatitude(props.data.geo.latitude || "")
            setLongitude(props.data.geo.longitude || "")
            setChargingOptions(props.data.chargingOptions || [{ portType: "",price:"" }])
            setStaff(props.data.staff || "")
            // Extract chargingOptions IDs
            const chargingOptionIds = props.data.chargingOptions.map((option) => option._id)
            setChargingOptionIds(chargingOptionIds)
        }
    }, [props.data])

    const dispatch = useDispatch()

    const handleChangeOption = (index,field,value) => {
            console.log(value);
            const options = [...chargingOptions]
            options[index][field]= value
            setChargingOptions(options)
        }
    const handleAddOption = () => {
        setChargingOptions([...chargingOptions, { portType: '',price:'' }])
    }

    const handleRemoveOption = (index) => {
        const options = [...chargingOptions]
        options.splice(index, 1)
        setChargingOptions(options)
    }

    const formValidation = () => {
        const error = {};
    
        if (name.trim().length === 0) {
          error.name = 'Please enter a name';
        }
        if (address.trim().length === 0) {
          error.address = 'Please enter an address';
        }
        if (landmark.trim().length === 0) {
          error.landmark = 'Please enter a landmark';
        }
        if (!latitude || !longitude) {
          error.location = 'Please select the location on the map';
        }
    
        const validChargingOptions = chargingOptions.filter((option) => option.portType.trim() !== '');
        if (validChargingOptions.length === 0) {
          error.chargingOptions = 'Please provide at least one charging option';
        }
    
        setErrors(error);
        return Object.keys(error).length === 0;
      };
      

    const handleSubmit = (e) => {
        e.preventDefault()
        
        if (formValidation()) {
            
            //Create  object with the form data
            const formData = {
              name,
              address,
              landmark,
              geo: {
                latitude,
                longitude,
              },
              chargingOptions,
              staff,
            };
           
        // Reset the form
        const resetForm = () => {
            setName('')
            setAddress('')
            setLandmark('')
            setLatitude('')
            setLongitude('')
            setChargingOptions([{ portType: '', price: '' }])
            setStaff('')
        }

        // send it to a server
        if (props.data) {
            dispatch(StartEditStation(props.data._id, chargingOptionId, formData))
            props.toggle()
        } else {
            dispatch(startRegisterStation(formData, resetForm))
        }
    }
}

    // //LOCATION 
    const location = (latitude, longitude) => {
        setLatitude(latitude)
        setLongitude(longitude)

    }
    return (
        <div className="container">
            <div className="card shodow" >
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name" className="form-label text-left" >Name</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                className="form-control inputBorder"
                                onChange={(e) => setName(e.target.value)}
                            />
                            {errors.name && <div className="text-danger">{errors.name}</div>}
                        </div>
                        
                        <div>
                            <label htmlFor="address">Address</label>
                            <input
                                type="text"
                                id="address"
                                value={address}
                                className="form-control"
                                onChange={(e) => setAddress(e.target.value)}   
                            />
                            {errors.address && <div className="text-danger">{errors.address}</div>}
                        </div>
                        <div>
                            <label htmlFor="landmark">Landmark</label>
                            <input
                                type="text"
                                id="landmark"
                                value={landmark}
                                className="form-control"
                                onChange={(e) => setLandmark(e.target.value)}
                                
                            />
                            {errors.landmark && <div className="text-danger">{errors.landmark}</div>}
                        </div>
                        {showMap ?
                            <div className='card shodow'>
                                <div className='card-body'>
                                    <button className='btn btn-success' onClick={(() => { setShowMap(!showMap) })}>Ok</button>
                                    <Location geo={location} />
                                </div>
                            </div>
                            : <button className='btn btn-primary' onClick={() => { setShowMap(!showMap) }}>Location</button>

                        }
                        {latitude && longitude && <h5>Latitude:{latitude},Longitude:{longitude}  </h5>}
                        {errors.location && <div className="text-danger">{errors.location}</div>}
                        <div>
                            <label className="form-label labelFont" >ChargingOptions(portTypes)</label>
                            {chargingOptions.map((option, index) => (
                                <div key={index} className="input-group mb-3">
                                     <input
                                     placeholder='Port'
                                        type="text"
                                        className="form-control"
                                        value={option.portType}
                                        onChange={(e) => handleChangeOption(index, 'portType', e.target.value)}
                                    />
                                    <input
                                    placeholder='Price'
                                        type="text"
                                        className="form-control"
                                        value={option.price}
                                        onChange={(e) => handleChangeOption(index, 'price', e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={() => handleRemoveOption(index)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                            <button type="button" className="btn btn-primary" onClick={handleAddOption}>
                                Add Option
                            </button>
 
                                    
                            {errors.chargingOptions && <div className="text-danger">{errors.chargingOptions}</div>}
                        </div>
                           
                        <div>
                            <label htmlFor="staff">Staff</label>
                            <input
                                type="text"
                                id="staff"
                                value={staff}
                                className="form-control"
                                onChange={(e) => setStaff(e.target.value)}
                            />
                        </div>

                        <button type="submit" className='btn btn-primary'>{props.data ? 'Edit' : "Submit"}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Station