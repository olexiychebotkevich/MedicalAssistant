import React from 'react';

const PageDoctor = React.lazy(() => import("../components/PageDoctor"));


const doctorRoutes=[
    { path: '/doctor/pagedoctor', exact: true, name: 'pagedoctor', component: PageDoctor },
  
];

export default doctorRoutes;
