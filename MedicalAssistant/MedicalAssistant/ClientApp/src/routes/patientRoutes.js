import React from 'react';

const PagePatient = React.lazy(() => import("../components/PagePatient"));
const WrappedDynamicFieldSet= React.lazy(() => import("../components/Add-recipe/Add-recipe"));


const patientRoutes=[
    { path: '/patient/pagepatient', exact: true, name: 'patientpage', component: PagePatient },
    { path: '/patient/addrecipe', exact: true, name: 'addrecipe', component: WrappedDynamicFieldSet }
];

export default patientRoutes;
