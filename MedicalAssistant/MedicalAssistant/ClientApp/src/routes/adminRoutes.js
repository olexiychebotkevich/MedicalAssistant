import React from 'react';

const RegistrDoctorPage = React.lazy(() => import("../components/RegistrDoctorPagee"));


const adminRoutes=[
    { path: '/admin/registrdoctor', exact: true, name: 'registrdoctor', component: RegistrDoctorPage  },
];

export default adminRoutes;