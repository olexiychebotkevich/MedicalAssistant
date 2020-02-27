import React from 'react';

const PagePatient = React.lazy(() => import("../components/PagePatient"));
const WrappedDynamicFieldSet= React.lazy(() => import("../components/Add-recipe/Add-recipe"));
const WrappedDynamicFieldSetEdit=React.lazy(() => import("../components/EditRecipe/edit_recipe"));
const NormalMoreForm=React.lazy(() => import("../components/More_Recipe/index"));


const patientRoutes=[
    { path: '/patient/pagepatient', exact: true, name: 'patientpage', component: PagePatient },
    { path: '/patient/addrecipe', exact: true, name: 'addrecipe', component: WrappedDynamicFieldSet },
    { path: '/patient/editrecipe', exact: true, name: 'editrecipe', component: WrappedDynamicFieldSetEdit },
    { path: '/patient/morerecipe', exact: true, name: 'morerecipe', component: NormalMoreForm }

];

export default patientRoutes;
