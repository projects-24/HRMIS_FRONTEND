import Link from 'next/link'
import React from 'react'
import Nav from '../../components/Nav'

export default function Parents() {
  return (
    <div className='edgeDesign'>
        <div className="content">
            <div className="row-flex">
                <div className="dash active"></div>
                <div className="dash active"></div>
                <div className="dash"></div>
            </div>
            <div>
                <div className="row">
                <div className="col sm-12 md-12 lg-12 padding">
                <div className="h4">Father</div>
            </div>
            <div className="col sm-12 md-6 lg-6 padding">
            <input type="text" name='fullname' className='input' placeholder='Fullname' />
            </div>
            <div className="col sm-12 md-6 lg-6 padding">
            <input type="text" name='occupation' className='input' placeholder='Occupation' />
            </div>
            <div className="col sm-12 md-6 lg-6 padding">
            <input type="text" name='nationality' className='input' placeholder='Nationality' />
            </div>
            <div className="col sm-12 md-6 lg-6 padding">
            <input type="date" name='date' className='input' placeholder='Date Of Birth' />
            </div>
                <div className="col sm-12 md-12 lg-12 padding-top-20">
                <div className="h4 padding">Mother</div>
            </div>
            <div className="col sm-12 md-6 lg-6 padding">
            <input type="text" name='fullname' className='input' placeholder='Fullname' />
            </div>
            <div className="col sm-12 md-6 lg-6 padding">
            <input type="text" name='occupation' className='input' placeholder='Occupation' />
            </div>
            <div className="col sm-12 md-6 lg-6 padding">
            <input type="text" name='nationality' className='input' placeholder='Nationality' />
            </div>
            <div className="col sm-12 md-6 lg-6 padding">
            <input type="date" name='date' className='input' placeholder='Date Of Birth' />
            </div>
            <div className="col sm-12 md-6 lg-6 padding">
             <button className="btn primaryBtn full-width" onClick={()=>window.location.assign("/form/school")}>Next Step</button>
            </div>
            <div className="col sm-12 md-6 lg-6 padding">
          <Link href="/form/personal" className='text-bold p-text'>
           <i className="icon-arrow-left"></i> BACK TO PERSONAL 
          </Link>

            </div>
                </div>
            </div>
        </div>
    </div>
  )
}
