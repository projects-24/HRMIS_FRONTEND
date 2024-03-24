import Link from 'next/link'
import React from 'react'
import Nav from '../../components/Nav'

export default function Parents() {
  return (
    <div className='edgeDesign'>
        <Nav />
        <div className="content">
            <div className="row-flex">
                <div className="dash active"></div>
                <div className="dash active"></div>
                <div className="dash active"></div>

            </div>
            <div>
                <div className="row">
                <div className="col sm-12 md-12 lg-12 padding">
                <div className="h4">School</div>
            </div>
            <div className="col sm-12 md-6 lg-6 padding">
            <input type="text" name='school' className='input' placeholder='School' />
            </div>
            <div className="col sm-12 md-3 lg-3 padding">
            <input type="text" name='from1' className='input' placeholder='From' />
            </div>
            <div className="col sm-12 md-3 lg-3 padding">
            <input type="text" name='to1' className='input' placeholder='To' />
            </div>
            <div className="col sm-12 md-6 lg-6 padding">
            <input type="text" name='school' className='input' placeholder='School' />
            </div>
            <div className="col sm-12 md-3 lg-3 padding">
            <input type="text" name='from1' className='input' placeholder='From' />
            </div>
            <div className="col sm-12 md-3 lg-3 padding">
            <input type="text" name='to1' className='input' placeholder='To' />
            </div>
            <div className="col sm-12 md-6 lg-6 padding">
            <input type="text" name='school' className='input' placeholder='School' />
            </div>
            <div className="col sm-12 md-3 lg-3 padding">
            <input type="text" name='from1' className='input' placeholder='From' />
            </div>
            <div className="col sm-12 md-3 lg-3 padding">
            <input type="text" name='to1' className='input' placeholder='To' />
            </div>

            <div className="col sm-12 md-6 lg-6 padding">
              <Link href="/staff/profiling">
              <button className="btn primaryBtn full-width">Submit</button>
              </Link>
            </div>
            <div className="col sm-12 md-6 lg-6 padding">
          <Link href="/form/parents" className='text-bold p-text'>
           <i className="icon-arrow-left"></i> BACK TO PARENTS 
          </Link>

            </div>
                </div>
            </div>
        </div>
    </div>
  )
}
