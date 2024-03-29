import React, { useEffect, useState } from 'react'
import Nav from '../../components/Nav'
import { GetToken } from '../../components/Functions'
import Loader from '../../components/loader'
import RowFlex from 'funuicss/ui/specials/RowFlex'
import Grid from "funuicss/ui/grid/Grid"
import Col from "funuicss/ui/grid/Col"
import Section from "funuicss/ui/specials/Section"
import Text from 'funuicss/ui/text/Text'
import Button from 'funuicss/ui/button/Button'
import { PiChecks, PiShareNetwork, PiSignOut } from 'react-icons/pi'
export default function Account() {
    const [user, setuser] = useState("")
    useEffect(() => {
        GetToken()
            .then(res => {
                setuser(res.user)
                console.log(res.user)
            })
    }, [])
    return (
        <div>
            <Nav active={6} />
            <div className="content">
                {
                    user ?
                        <div className='dark900 roundEdgeSmall padding-20 text-dark'>
                            <RowFlex gap={2}>
                                <div>
                                    <img src='/avatar.svg' className='width-100' />
                                </div>
                                <div className='col fit'>
                                    <div >
                                        <Text text={user.first_name  + " " + user.last_name} heading='h4' bold color="dark300"/>
                                       <RowFlex>
                                        <div>
                                        <Button 
                                        smaller  
                                        text={user.sleave ? "On Leave" : user.spost ? "On Post" : user.sfield ? "On Field" : ""}
                                        bg={user.sleave ? "error" : user.spost ? "success" : user.sfield ? "primary" : ""}
                                        startIcon={user.sleave ? <PiSignOut /> : user.spost ? <PiChecks /> : user.sfield ? <PiShareNetwork />: ""}
                                        bold
                                        raised
                                        disabled
                                          />
                                        </div>
                                       </RowFlex>
                                    </div>
                                    <Section gap={2} />
                                    <RowFlex gap={3}>
                                        <div>
                                            <Text size='small' bold color="primary" text="Staff Id" block />
                                            <Text size='minified' text={user.staff_id} block />
                                        </div>
                                        <div>
                                            <Text size='small' bold color="primary" text="Email" block />
                                            <Text size='minified' text={user.email} block />
                                        </div>
                                        <div>
                                            <Text size='small' bold color="primary" text="Employment Status" block />
                                            <Text size='minified' text={user.employment_status} block />
                                        </div>
                                        <div>
                                            <Text size='small' bold color="primary" text="Contact" block />
                                            <Text size='minified' text={user.contact_number} block />
                                        </div>
                                    </RowFlex>
                                    <Grid>

                                    </Grid>
                                </div>
                            </RowFlex>
                        </div>
                        : <Loader />
                }
            </div>
        </div>
    )
}
