import React from 'react';

const PagePatient = React.lazy(() => import("../components/PagePatient"));
const NormalMoreForm=React.lazy(() => import("../components/More_Recipe"));
const WrappedDynamicFieldSetEdit=React.lazy(() => import("../components/EditRecipe/edit_recipe"));


const patientRoutes=[
    { path: '/patient/pagepatient', exact: true, name: 'patientpage', component: PagePatient },
    { path: '/patient/morerecipe', exact: true, name: 'morerecipe', component: NormalMoreForm },
    { path: '/patient/editrecipe', exact: true, name: 'editrecipe', component: WrappedDynamicFieldSetEdit }

];

export default patientRoutes;
