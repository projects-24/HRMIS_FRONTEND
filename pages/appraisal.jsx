import React from 'react'
import Nav from '../components/Nav'
import {useState, useEffect} from 'react';
import { TextField , MenuItem} from '@mui/material';

export default function Appraisal() {
    const [token, settoken] = useState("")
    const [user, setuser] = useState("")  
    useEffect(() => {
        if(localStorage.getItem("token")  && !token ){
            settoken(
                JSON.parse(
                    localStorage.getItem("token")
                )
            )
            setuser(
                JSON.parse(
                    localStorage.getItem("user")
                )
            )
        }
    })
    const [message, setmessage] = useState("")
    const Submit  =  ()=>{
    }
  return (
    <div>
        <Nav />
        <div className="content">
            <div className="padding">
            <div className="h1">Performance and Apprasal</div>
            <div className="section text-bold">
            Dashboard <i className="lni lni-chevron-right"></i> appraisal
            </div>
            </div>

            {
                user.position === "Government Statistician (CEO)" ?
                <div className="m-section">
                <form>
                    <div className="row">
                    <p className="h4 col sm-12 md-12 lg-12 padding">
                    Chief Executive Officer (CEO)
                    </p>
                      
                        <div className="col sm-12 md-6 lg-6 padding">
                            <TextField 
                            variant='outlined' 
                            type="text" 
                            label="key performance indicator" 
                            fullWidth
                            />
                        </div>
                        <div className="col sm-12 md-6 lg-6 padding">
                        <TextField variant='outlined' select label="Annual or mid-year" fullWidth>
                                <MenuItem value="annual">Annual</MenuItem>
                                <MenuItem value="mid-year">Mid-Year</MenuItem>
                            </TextField>
                        </div>
                        <div className="col sm-12 md-12 lg-12 padding">
                            <TextField 
                            variant='outlined' 
                            multiline
                            rows={3}
                            type="text" 
                            label="Objective" 
                            fullWidth
                            />
                        </div>
                
                        <div className="col sm-12 md-12 lg-12 padding">
                        <button onClick={Submit} className="btn primaryBtn">Submit Request <i className="icon-paper-plane"></i></button>
                        </div>
                    </div>
                    </form>
                </div>

                : user.position === "Deputy Gov Statistician (DGS)" ?
                <div className="m-section">
                <form>
                    <div className="row">
                    <p className="h4 col sm-12 md-12 lg-12 padding">
                   Deputy Chief Executive Officer (CEO)
                    </p>
                      
                        <div className="col sm-12 md-6 lg-6 padding">
                            <TextField 
                            variant='outlined' 
                            type="text" 
                            label="key performance indicator" 
                            fullWidth
                            />
                        </div>
                        <div className="col sm-12 md-6 lg-6 padding">
                        <TextField variant='outlined' select label="Annual or mid-year" fullWidth>
                                <MenuItem value="annual">Annual</MenuItem>
                                <MenuItem value="mid-year">Mid-Year</MenuItem>
                            </TextField>
                        </div>
                        <div className="col sm-12 md-12 lg-12 padding">
                            <TextField 
                            variant='outlined' 
                            multiline
                            rows={3}
                            type="text" 
                            label="Objective" 
                            fullWidth
                            />
                        </div>
                
                        <div className="col sm-12 md-12 lg-12 padding">
                        <button onClick={Submit} className="btn primaryBtn">Submit Request <i className="icon-paper-plane"></i></button>
                        </div>
                    </div>
                    </form>
                </div>
           
                : user.position === "Director" ?
<div className="m-section">
            <form>
                <div className="row">
                <p className="h4 col sm-12 md-12 lg-12 padding">
                Directorate Heads
                </p>
                  
                    <div className="col sm-12 md-6 lg-6 padding">
                        <TextField 
                        variant='outlined' 
                        type="text" 
                        label="key performance indicator" 
                        fullWidth
                        />
                    </div>
                    <div className="col sm-12 md-6 lg-6 padding">
                    <TextField variant='outlined' select label="Annual or mid-year" fullWidth>
                            <MenuItem value="annual">Annual</MenuItem>
                            <MenuItem value="mid-year">Mid-Year</MenuItem>
                        </TextField>
                    </div>
                    <div className="col sm-12 md-6 lg-6 padding">
                        <TextField 
                        variant='outlined' 
                        type="text" 
                        label="Resource Required" 
                        fullWidth
                        />
                    </div>
                    <div className="col sm-12 md-6 lg-6 padding">
                        <TextField 
                        variant='outlined' 
                        type="text" 
                        label="Training Needs" 
                        fullWidth
                        />
                    </div>
                    <div className="col sm-12 md-12 lg-12 padding">
                        <TextField 
                        variant='outlined' 
                        multiline
                        rows={3}
                        type="text" 
                        label="Objective" 
                        fullWidth
                        />
                    </div>
            
                    <div className="col sm-12 md-12 lg-12 padding">
                    <button onClick={Submit} className="btn primaryBtn">Submit Request <i className="icon-paper-plane"></i></button>
                    </div>
                </div>
                </form>
            </div>
                : user.position === "Deputy Director" ?
                <div className="m-section">
                <form>
                    <div className="row">
                    <p className="h4 col sm-12 md-12 lg-12 padding">
                   Deputy Directorate Heads
                    </p>
                      
                        <div className="col sm-12 md-6 lg-6 padding">
                            <TextField 
                            variant='outlined' 
                            type="text" 
                            label="key performance indicator" 
                            fullWidth
                            />
                        </div>
                        <div className="col sm-12 md-6 lg-6 padding">
                        <TextField variant='outlined' select label="Annual or mid-year" fullWidth>
                                <MenuItem value="annual">Annual</MenuItem>
                                <MenuItem value="mid-year">Mid-Year</MenuItem>
                            </TextField>
                        </div>
                        <div className="col sm-12 md-6 lg-6 padding">
                            <TextField 
                            variant='outlined' 
                            type="text" 
                            label="Resource Required" 
                            fullWidth
                            />
                        </div>
                        <div className="col sm-12 md-6 lg-6 padding">
                            <TextField 
                            variant='outlined' 
                            type="text" 
                            label="Training Needs" 
                            fullWidth
                            />
                        </div>
                        <div className="col sm-12 md-12 lg-12 padding">
                            <TextField 
                            variant='outlined' 
                            multiline
                            rows={3}
                            type="text" 
                            label="Objective" 
                            fullWidth
                            />
                        </div>
                
                        <div className="col sm-12 md-12 lg-12 padding">
                        <button onClick={Submit} className="btn primaryBtn">Submit Request <i className="icon-paper-plane"></i></button>
                        </div>
                    </div>
                    </form>
                </div>
                : user.position === "Sectional Head" ?
                   
            <div className="m-section">
            <form>
                <div className="row">
                <p className="h4 col sm-12 md-12 lg-12 padding">
                Section Heads
                </p>
                  
                    <div className="col sm-12 md-6 lg-6 padding">
                        <TextField 
                        variant='outlined' 
                        type="text" 
                        label="key performance indicator" 
                        fullWidth
                        />
                    </div>
                    <div className="col sm-12 md-6 lg-6 padding">
                    <TextField variant='outlined' select label="Annual or mid-year" fullWidth>
                            <MenuItem value="annual">Annual</MenuItem>
                            <MenuItem value="mid-year">Mid-Year</MenuItem>
                        </TextField>
                    </div>
                    <div className="col sm-12 md-6 lg-6 padding">
                        <TextField 
                        variant='outlined' 
                        type="text" 
                        label="Resource Required" 
                        fullWidth
                        />
                    </div>
                    <div className="col sm-12 md-6 lg-6 padding">
                        <TextField 
                        variant='outlined' 
                        type="text" 
                        label="Training Needs" 
                        fullWidth
                        />
                    </div>
                    <div className="col sm-12 md-12 lg-12 padding">
                        <TextField 
                        variant='outlined' 
                        multiline
                        rows={3}
                        type="text" 
                        label="Objective" 
                        fullWidth
                        />
                    </div>
            
                    <div className="col sm-12 md-12 lg-12 padding">
                    <button onClick={Submit} className="btn primaryBtn">Submit Request <i className="icon-paper-plane"></i></button>
                    </div>
                </div>
                </form>
            </div>
            :
            <div className="m-section">
            <form>
                <div className="row">
                <p className="h4 col sm-12 md-12 lg-12 padding">
                Individuals
                </p>
                  
                    <div className="col sm-12 md-6 lg-6 padding">
                        <TextField 
                        variant='outlined' 
                        type="text" 
                        label="key performance indicator" 
                        fullWidth
                        />
                    </div>
                    <div className="col sm-12 md-6 lg-6 padding">
                    <TextField variant='outlined' select label="Annual or mid-year" fullWidth>
                            <MenuItem value="annual">Annual</MenuItem>
                            <MenuItem value="mid-year">Mid-Year</MenuItem>
                        </TextField>
                    </div>
                    <div className="col sm-12 md-6 lg-6 padding">
                        <TextField 
                        variant='outlined' 
                        type="text" 
                        label="Resource Required" 
                        fullWidth
                        />
                    </div>
                    <div className="col sm-12 md-6 lg-6 padding">
                        <TextField 
                        variant='outlined' 
                        type="text" 
                        label="Training Needs" 
                        fullWidth
                        />
                    </div>
                    <div className="col sm-12 md-12 lg-12 padding">
                        <TextField 
                        variant='outlined' 
                        multiline
                        rows={3}
                        type="text" 
                        label="Objective" 
                        fullWidth
                        />
                    </div>
            
                    <div className="col sm-12 md-12 lg-12 padding">
                    <button onClick={Submit} className="btn primaryBtn">Submit Request <i className="icon-paper-plane"></i></button>
                    </div>
                </div>
                </form>
            </div>
            
            }
           
                
            
          
         
            
         


        </div>
    </div>
  )
}
