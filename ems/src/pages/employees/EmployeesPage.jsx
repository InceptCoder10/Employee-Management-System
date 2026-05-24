import React from 'react'
import PageHeaders from '../../components/ui/PageHeaders'
import EmployeeTable from '../../components/employees/EmployeeTable'

const EmployeesPage = () => {
  return (
    <>
    <PageHeaders title='Employees' subtitle='List of employees' description='This is the list of employees'/>
    <EmployeeTable/>
    </>
  )
}
export default EmployeesPage
