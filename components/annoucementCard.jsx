import React from 'react'

export default function AnnoucementCard({doc, key}) {
return (
<div className="card section" key={key}>
<div className="row-flex">
<div>
<img src="/favicon.png" className='width-100' alt="" />
</div>
<div>
<div className="h4 padding annouceHeader ">
Annoucement for {doc.target}
</div>
<div className=" padding width-600-max" dangerouslySetInnerHTML={{__html:`${doc.message}`}}>

</div>
<div className="row-flex space-between">
<div>
<span className='text-bold'>Posted on:</span> <span className="p-text text-bold">{doc.start_date}</span> 
</div>
<div className="text-bold">
<span>End Date:</span> <span className="p-text">{doc.end_date}</span>
</div>
</div>

</div>
</div>
</div>
)
}
