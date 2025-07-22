import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth, analytics, monthlyReports }) {
    const reports = Array.isArray(monthlyReports) ? monthlyReports : [];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Main analytics grid */}
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
                    {/* Monthly report history below analytics grid */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mt-8">
                        <div className="p-6">
                            <h3 className="text-lg font-bold mb-4">Monthly Reports History</h3>
                            {reports.length === 0 ? (
                                <div className="text-gray-500">No reports found.</div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="table table-sm w-full">
                                        <thead>
                                            <tr>
                                                <th>Month</th>
                                                <th>Field Hours</th>
                                                <th>Return Visits</th>
                                                <th>Bible Studies</th>
                                                <th>Bible Students</th>
                                                <th>Notes</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {reports.map(report => (
                                                <tr key={report.month}>
                                                    <td>{report.month}</td>
                                                    <td>{report.field_hours}</td>
                                                    <td>{report.return_visits}</td>
                                                    <td>{report.bible_studies}</td>
                                                    <td>{report.bible_students}</td>
                                                    <td>{report.notes ?? '-'}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
