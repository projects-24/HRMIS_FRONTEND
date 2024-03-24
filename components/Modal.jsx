import React from 'react'
import Modal from 'funuicss/ui/modal/Modal'
import Text from 'funuicss/ui/text/Text'
import { PiX } from 'react-icons/pi'
export default function MyModal({title , sub_title , body, maxwidth ,footer ,close}) {
  return (
    <Modal
    open={true}
    maxWidth={maxwidth ? maxwidth : '500px'}
    animation='ScaleUp'
    duration={0.2}
    title={<>
    <Text text={title ? title : ''} light heading='h4' block/>
    <Text text={sub_title ? sub_title : ''} emp/>
    </>}
    body={body}
    footer={footer ? footer : ''}
    close={close}
    />
  )
}
