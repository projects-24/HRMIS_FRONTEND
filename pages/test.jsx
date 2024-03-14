import React from 'react'
import Loader from './../components/default/loader';
import Success from './../components/default/success';
import DataTable from './../components/DataTable';

export default function Test() {
  return (
    <div>
     {/* <Success /> */}
     {/* <Loader /> */}
     <div className="card center width-800-max">
     <DataTable />
     </div>
    </div>
  )
}
