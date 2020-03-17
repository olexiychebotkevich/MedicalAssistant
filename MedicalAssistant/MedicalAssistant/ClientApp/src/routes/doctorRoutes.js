import React from 'react';

const PageDoctor = React.lazy(() => import("../components/DoctorPage"));
const WrappedDynamicFieldSet = React.lazy(() => import("../components/Add-MedicalSession/Add-MedicalSession"));
const NormalSessionForm=React.lazy(() => import("../components/More_session"));
const WrappedDynamicFieldSetEdit=React.lazy(() => import("../components/EditRecipe/edit_recipe"));

const doctorRoutes=[
    { path: '/doctor/pagedoctor', exact: true, name: 'pagedoctor', component: PageDoctor },
    { path: '/doctor/addmedicalsession', exact: true, name: 'addmedicalsessionpage', component: WrappedDynamicFieldSet},
    { path: '/doctor/moresession', exact: true, name: 'moresession', component: NormalSessionForm },
    { path: '/patient/editrecipe', exact: true, name: 'editrecipe', component: WrappedDynamicFieldSetEdit }
];

export default doctorRoutes;
