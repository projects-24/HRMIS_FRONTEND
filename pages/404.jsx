import React from 'react'
import NotFound from 'funuicss/ui/page/NotFound'
import Button from 'funuicss/ui/button/Button'
export default function App() {

return (

<div>
<NotFound action={<Button endIcon={<PiArrowRight />} text='Back to Profile' bold bg='primary' raised onClick={() => window.location.assign("/user/account")}/>} />
</div>

)
}