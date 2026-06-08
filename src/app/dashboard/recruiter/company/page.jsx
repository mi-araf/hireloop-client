import React from 'react';
import CompanyProfile from './CompanyProfile';
import { getUserSession } from '@/lib/core/session';

const CompanyPage = async () => {

    const user = await getUserSession();
    console.log("Session data in CompanyPage:", user);

    return (
        <div>
            <CompanyProfile recruiter={user} ></CompanyProfile>
        </div>
    );
};

export default CompanyPage;