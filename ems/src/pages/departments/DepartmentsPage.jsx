import React, { useEffect, useState } from 'react';
import PageHeaders from '../../components/ui/PageHeaders';
import DepartmentTable from '../../components/department/DepartmentTable';

export const DepartmentsPage = () => {



  return (
    <div>
    <PageHeaders
      title="Departments Page"
      subtitle="List of Departments"
      description="Create, View, Edit departments of the Company"
    />
    <DepartmentTable/>

    </div>
  );
};

