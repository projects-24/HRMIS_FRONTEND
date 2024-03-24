import React from 'react'
import Nav from '../components/Nav'
import Text from 'funuicss/ui/text/Text'
import Link from 'next/link'
import Header from '../components/Header'


export default function Configurations() {
  return (
    <div>
        <Nav active={2}/>
        <div className="content">
            <Header title={"Organization configuration"} sub_title={"Create and configure organizational settings."}/>
            <div className="row">
            <div className="col sm-12 md-6 lg-6 padding">
           <Link href={'/admin/create/region'}>
           <div className="_card hover-up">
                  <Text
                  text='Add & Manage'
                  block
                  />
                  <Text
                  text='Region'
                  heading='h3'
                  lighter
                  color='dark300'
                  />
              </div>
           </Link>
          </div>
      
            <div className="col sm-12 md-6 lg-6 padding">
           <Link href={'/admin/create/directorate'}>
           <div className="_card hover-up">
                  <Text
                  text='Add & Manage'
                  block
                  />
                  <Text
                  text='Directorate'
                  heading='h3'
                  lighter
                  color='dark300'
                  />
              </div>
           </Link>
          </div>
            <div className="col sm-12 md-4 lg-4 padding">
           <Link href={'/admin/create/section'}>
           <div className="_card hover-up">
                  <Text
                  text='Add & Manage'
                  block
                  />
                  <Text
                  text='Section'
                  heading='h3'
                  lighter
                  color='dark300'
                  />
              </div>
           </Link>
          </div>
            <div className="col sm-12 md-4 lg-4 padding">
           <Link href={'/admin/create/job'}>
           <div className="_card hover-up">
                  <Text
                  text='Add & Manage'
                  block
                  />
                  <Text
                  text='Job'
                  heading='h3'
                  lighter
                  color='dark300'
                  />
              </div>
           </Link>
          </div>
            <div className="col sm-12 md-4 lg-4 padding">
           <Link href={'/admin/create/position'}>
           <div className="_card hover-up">
                  <Text
                  text='Add & Manage'
                  block
                  />
                  <Text
                  text='Position'
                  heading='h3'
                  lighter
                  color='dark300'
                  />
              </div>
           </Link>
          </div>
            </div>
        </div>
    </div>
  )
}
