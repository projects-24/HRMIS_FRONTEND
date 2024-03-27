import React from 'react'
import Button from 'funuicss/ui/button/Button'
import RowFlex from 'funuicss/ui/specials/RowFlex'
import BreadCrumb from 'funuicss/ui/breadcrumb/BreadCrumb'
import { PiCheck, PiHouse } from 'react-icons/pi'
import Text from 'funuicss/ui/text/Text'
import Link from 'next/link'
export default function Header({title , sub_title , sub_dir , sub_dir_route}) {
  return (
    <p className='padding-20 round-edge dark200  margin-bottom-40'>
    <div className='margin-bottom-20'>
      <RowFlex alignItems='center'>
      <Link href="#" legacyBehavior>
<Button bold rounded bg="light400" startIcon={<PiHouse />} smaller>
Home
</Button>
</Link>
{
  sub_dir &&
  <>
  <BreadCrumb type={"greater"} />
      <Link href={sub_dir_route} legacyBehavior>
<Button bold rounded bg="light500" raised startIcon={<PiHouse />} smaller>
{sub_dir}
</Button>
</Link>
  </>
}
<BreadCrumb type={"greater"} />
<Link href="#" legacyBehavior>
<Button bold rounded bg="gradient" raised startIcon={<PiCheck />} smaller>
{title.slice(0 ,30)}
</Button>
</Link>
      </RowFlex>
    </div>
    <Text
    text={title}
    heading='h2'
    bold
    block
    />
    <Text
    text={sub_title}
    article
    bold 
    color="dark700"
    size="minified"
    />
</p>
  )
}
