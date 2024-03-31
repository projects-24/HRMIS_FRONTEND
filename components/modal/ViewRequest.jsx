import React from 'react'
import StepContainer from 'funuicss/ui/step/Container'
import Step from 'funuicss/ui/step/Step'
import StepHeader from 'funuicss/ui/step/Header'
import StepLine from 'funuicss/ui/step/Line'
import Grid from "funuicss/ui/grid/Grid"
import Col from "funuicss/ui/grid/Col"
import Section from "funuicss/ui/specials/Section"
import Button from 'funuicss/ui/button/Button'
import Modal from 'funuicss/ui/modal/Modal'
import Text from 'funuicss/ui/text/Text'
import { PiX } from 'react-icons/pi'
import RowFlex from 'funuicss/ui/specials/RowFlex'
import Circle from 'funuicss/ui/specials/Circle'

export default function ViewRequest({selected_data , open , close , current_user}) {
  return (
    <Modal 
    open={open}
    maxWidth='1000px'
    animation='SlideDown'
    flat
    close={close}
    title={
<>
<Text heading='h5' bold text={selected_data.firstName + " " + selected_data.lastName} block/>
  <Text bold text={selected_data.leaveTypeName} size='small' color="primary"/>
</>
  }
    body={<>
<StepContainer responsiveMedium  >

<Step>
<StepHeader>
    <RowFlex gap={1}>
    <Circle bg={selected_data.hrApproval ? "success" : "error"} size={2} funcss="raised">
    {selected_data.hrApproval ? <PiCheck /> : <PiX />}
</Circle>
<div>
<Text text={"HR"} heading="h5"/>
<div />
<Text text={"Approval"} size="small" color={"dark200"} bold/>
</div>
    </RowFlex>
</StepHeader>
</Step>
<StepLine />
<Step>
<StepHeader>
    <RowFlex gap={1}>
    <Circle bg={selected_data.sectionalHeadApproval ? "success" : "error"} size={2} funcss="raised">
    {selected_data.sectionalHeadApproval ? <PiCheck /> : <PiX />}
</Circle>
<div>
<Text text={"Section"} heading="h5"/>
<div />
<Text text={"Approval"} size="small" color={"dark200"} bold/>
</div>
    </RowFlex>
</StepHeader>
</Step>
<StepLine />

{
     current_user.position_id === 1 || current_user.position_id === 2 || current_user.position_id === 3 ? 
     <>
     <Step>
<StepHeader>
    <RowFlex gap={1}>
    <Circle bg={selected_data.gsApproval ? "success" : "error"} size={2} funcss="raised">
    {selected_data.gsApproval ? <PiCheck /> : <PiX />}
</Circle>
<div>
<Text text={"GS"} heading="h5"/>
<div />
<Text text={"Approval"} size="small" color={"dark200"} bold/>
</div>
    </RowFlex>
</StepHeader>
</Step>
<StepLine />
     </>
     : <></>
}
<Step>
<StepHeader>
    <RowFlex gap={1}>
    <Circle bg={selected_data.directorApproval ? "success" : "error"} size={2} funcss="raised">
    {selected_data.directorApproval ? <PiCheck /> : <PiX />}
</Circle>
<div>
<Text text={"Director"} heading="h5"/>
<div />
<Text text={"Approval"} size="small" color={"dark200"} bold/>
</div>
    </RowFlex>
</StepHeader>
</Step>

</StepContainer>
<Section gap={2} funcss='bb'/>
<div>
  <Grid>
    <Col sm={6} md={4} lg={4} funcss='padding'>
      <Text size='small' bold color="primary" text="Staff Id" block/>
      <Text size='minified'  text={selected_data.staffId} block/>
    </Col>
    <Col sm={6} md={4} lg={4} funcss='padding'>
      <Text size='small' bold color="primary" text="Email" block/>
      <Text size='minified'  text={selected_data.addedEmail} block/>
    </Col>
    <Col sm={6} md={4} lg={4} funcss='padding'>
      <Text size='small' bold color="primary" text="Leave Address" block/>
      <Text size='minified'  text={selected_data.leaveAddress} block/>
    </Col>
    </Grid>
    <Section gap={1} funcss='bb'/>
    <Grid>
    <Col sm={6} md={4} lg={4} funcss='padding'>
      <Text size='small' bold color="primary" text="Max number of Days" block/>
      <Text size='minified'  text={selected_data.maximumNumberDays} block/>
    </Col>
    <Col sm={6} md={4} lg={4} funcss='padding'>
      <Text size='small' bold color="primary" text="Days Remaining" block/>
      <Text size='minified'  text={selected_data.numberOfDaysRemaining} block/>
    </Col>
    <Col sm={6} md={4} lg={4} funcss='padding'>
      <Text size='small' bold color="primary" text="Requested days" block/>
      <Text size='minified'  text={selected_data.requestedDays} block/>
    </Col>
  </Grid>
</div>
    </>}
    />
  )
}
