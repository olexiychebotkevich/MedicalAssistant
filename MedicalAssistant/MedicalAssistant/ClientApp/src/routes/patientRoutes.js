import React from 'react';

const PagePatient = React.lazy(() => import("../components/PagePatient"));
const NormalMoreForm=React.lazy(() => import("../components/More_Recipe/index"));


const patientRoutes=[
    { path: '/patient/pagepatient', exact: true, name: 'patientpage', component: PagePatient },
    { path: '/patient/morerecipe', exact: true, name: 'morerecipe', component: NormalMoreForm }

];

export default patientRoutes;
