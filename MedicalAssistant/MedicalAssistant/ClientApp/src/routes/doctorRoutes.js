import React from 'react';

const PageDoctor = React.lazy(() => import("../components/DoctorPage"));
const WrappedDynamicFieldSet = React.lazy(() => import("../components/Add-recipe/Add-recipe"));
const NormalMorePatientForm=React.lazy(() => import("../components/More_patient/index"));

const doctorRoutes=[
    { path: '/doctor/pagedoctor', exact: true, name: 'pagedoctor', component: PageDoctor },
    { path: '/doctor/addrecipe', exact: true, name: 'addrecipepage', component: WrappedDynamicFieldSet},
    { path: '/doctor/morepatient', exact: true, name: 'morepatient', component: NormalMorePatientForm }

  
];

export default doctorRoutes;
