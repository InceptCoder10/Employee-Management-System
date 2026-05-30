import React, { useState,useEffect } from 'react'
import { departmentService } from '../../services/departmentService'
import Loader from '../ui/Loader'
import DepartmentRow from './DepartmentRow'

const TABLE_HEADERS = [
    "Dept-ID",
    "Dept-Name",
    "Dept-head",
    "Budget",
    "Description",
    "Actions" 
  ]

const DepartmentTable = () => {
    const [loading, setLoading] = useState(true)
    const [data, setdata] = useState([])

    const fetchDept = async () => {
        try {
            const row = await departmentService.getAllDepartments();
            setdata(row)
            console.log(row)
        } catch (error) {
            console.error("Error fetching data ", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchDept()
    }, [])

    if (loading) {
    return (
        <tr>
            <td colSpan={6}>
                <Loader />
            </td>
        </tr>
    )
}
  return (
    <div className='space-y-4'>
      <table className='w-full'>
        <thead>
          <tr>
          {TABLE_HEADERS.map((header) => {
            return (
              <th
            key={header}
            className='px-4 py-3 text-left text-[11px] font-medium text-zinc-600 uppercase tracking-widest whitespace-nowrap border-t border-b border-gray-200'>
              {header}
            </th>
            )
          })}
          </tr>
        </thead>
        <tbody>
          {
            data.map((data) => {
              return <DepartmentRow 
              key={data._id}
              data={data}/>
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default DepartmentTable