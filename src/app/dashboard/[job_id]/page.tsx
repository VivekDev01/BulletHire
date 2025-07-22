import React from 'react';

interface DashboardPageProps {
    params: {
        job_id: string;
    };
}

const DashboardPage: React.FC<DashboardPageProps> = ({ params }) => {
    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Job Dashboard</h1>
            <p className="text-gray-700">Viewing dashboard for Job ID: <span className="font-mono">{params.job_id}</span></p>
        </main>
    );
};

export default DashboardPage;