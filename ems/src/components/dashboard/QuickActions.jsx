import 
{ UserPlus,
    FileText,
    Building2,

 } from 'lucide-react'
import Card from '../ui/Card'
import Button from '../ui/Button'
import React from 'react'

const QuickActions = ({className}) => {
    const buttonStyle = 'flex items-center justify-center gap-4 w-full  h-12';
  return (
    <Card className={className}>
        <h2
        className='text-xl font-semibold mb-5'
        >Quick Actions</h2>
        <div className='flex gap-4 flex-col items-center'>
            <Button className={buttonStyle}><UserPlus size={18}/> Add Employee</Button>
            <Button 
            className={buttonStyle}
            variant='secondary'><FileText size={18}/> Generate Report</Button>
            <Button
            className={buttonStyle}
            variant='secondary'><Building2 size={18}/> Add Department</Button>
        </div>
    </Card>
  )
}

export default QuickActions

    // <div >
    //       <h2 className="text-xl font-semibold">
    //         Employee Management
    //       </h2>

    //       <p className="text-gray-500 mt-1">
    //         Add and manage employees
    //       </p>
    //     </div>

    //     <div className="mt-4 flex gap-3 ">
    //       <Button>
    //       Add Employee
    //     </Button>
    //     <Button>
    //       Edit Employee
    //     </Button>
    //     </div>