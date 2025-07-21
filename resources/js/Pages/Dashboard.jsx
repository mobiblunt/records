import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function Dashboard({ auth, analytics }) {
    // Optionally, you can add animation or loading state here
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="stats shadow bg-base-100">
                            <div className="stat">
                                <div className="stat-title">Field Records</div>
                                <div className="stat-value text-primary">{analytics.fieldRecords.count}</div>
                                <div className="stat-desc">Hours: <span className="font-bold">{analytics.fieldRecords.hours}</span></div>
                            </div>
                        </div>
                        <div className="stats shadow bg-base-100">
                            <div className="stat">
                                <div className="stat-title">Return Visits</div>
                                <div className="stat-value text-secondary">{analytics.returnVisits.count}</div>
                                <div className="stat-desc">Active: <span className="font-bold">{analytics.returnVisits.active}</span></div>
                            </div>
                        </div>
                        <div className="stats shadow bg-base-100">
                            <div className="stat">
                                <div className="stat-title">Bible Students</div>
                                <div className="stat-value text-accent">{analytics.bibleStudents.count}</div>
                                <div className="stat-desc">Active: <span className="font-bold">{analytics.bibleStudents.active}</span></div>
                            </div>
                        </div>
                        <div className="stats shadow bg-base-100">
                            <div className="stat">
                                <div className="stat-title">Bible Studies</div>
                                <div className="stat-value text-info">{analytics.bibleStudies.count}</div>
                                <div className="stat-desc">This Month</div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">Welcome! Here is your ministry summary for <span className="font-bold">{analytics.monthName}</span>.</div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
