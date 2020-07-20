import React from 'react';

const PageDoctor = React.lazy(() => import("../components/DoctorPage"));
const AddMedicalSessionPage = React.lazy(() => import("../components/AddMedicalSessionPage"));
const NormalSessionForm=React.lazy(() => import("../components/MoreSessionPage"));
const MedicalHistory=React.lazy(() => import("../components/PatientMedicalHistory"));
const NormalMoreForm=React.lazy(() => import("../components/MoreRecipePage"));



const doctorRoutes=[
    { path: '/doctor/pagedoctor', exact: true, name: 'pagedoctor', component: PageDoctor },
    { path: '/doctor/addmedicalsession', exact: true, name: 'addmedicalsessionpage', component: AddMedicalSessionPage},
    { path: '/doctor/moresession', exact: true, name: 'moresession', component: NormalSessionForm },
    { path: '/doctor/medicalhistory', exact: true, name: 'medicalhistory', component: MedicalHistory },
    { path: '/doctor/patientdetailedsession', exact: true, name: 'detailedsession', component: NormalMoreForm },
];

export default doctorRoutes;
