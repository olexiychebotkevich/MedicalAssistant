import React from 'react';

const PagePatient = React.lazy(() => import("../components/PatientPage"));
const NormalMoreForm=React.lazy(() => import("../components/MoreRecipePage"));


const patientRoutes=[
    { path: '/patient/pagepatient', exact: true, name: 'patientpage', component: PagePatient },
    { path: '/patient/morerecipe', exact: true, name: 'morerecipe', component: NormalMoreForm }
];

export default patientRoutes;
