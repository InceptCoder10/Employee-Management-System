import React from 'react'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import Card from '../components/ui/Card';
import PageHeaders from '../components/ui/PageHeaders';
import Badge from '../components/ui/Badge';
import Loader from '../components/ui/Loader';

function Defaultpage() {
  let label='Name';
  let placeholder='Enter your name';
  let title = 'Default Page';
  let subtitle = 'Welcome to the default page';
  let description = 'This is the default page';
  return (
    <>
    <Button>Default</Button>
    <Input label={label} placeholder={placeholder}/>
    <Card><p>This is a card</p></Card>
    <PageHeaders title={title} subtitle={subtitle} description={description}/>
    <Badge text='Active' status='active'/>
    <Loader/>
    </>
  )
}

export default Defaultpage