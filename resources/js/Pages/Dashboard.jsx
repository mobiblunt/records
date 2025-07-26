import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useState } from 'react';
import { FaRegClock, FaRedo, FaUserGraduate, FaBookOpen } from 'react-icons/fa';

export default function Dashboard({ auth, analytics, monthlyReports, upcomingVisitsList = [] }) {
    const reports = Array.isArray(monthlyReports) ? monthlyReports : [];
    const [modalReport, setModalReport] = useState(null);
    const [showUpcomingModal, setShowUpcomingModal] = useState(false);
    const closeModal = () => setModalReport(null);
    const handleUpcomingClick = () => {
        setShowUpcomingModal(true);
    };
    const closeUpcomingModal = () => setShowUpcomingModal(false);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />
            <div className="md:py-12 py-6 md:px-0 px-4">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Main analytics grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="stats shadow bg-base-100 bg-white/80 dark:bg-white/90">
                            <div className="stat">
                                <div className="stat-title flex items-center gap-2"><FaRegClock /> Field Records</div>
                                <div className="stat-value text-primary cursor-pointer hover:underline"
                                    onClick={() => {
                                        window.location.href = '/field-records';
                                    }}
                                    title="View All Field Records"
                                >
                                    {analytics.fieldRecords.count}
                                </div>
                                <div className="stat-desc">Hours: <span className="font-bold">{analytics.fieldRecords.hours}</span></div>
                            </div>
                        </div>
                        <div className="stats shadow bg-base-100 bg-white/80 dark:bg-white/90">
                            <div className="stat">
                                <div className="stat-title flex items-center gap-2"><FaRedo /> Return Visits</div>
                                <div className="stat-value text-primary cursor-pointer hover:underline"
                                    onClick={() => {
                                        window.location.href = '/return-visits';
                                    }}
                                    title="View All Return Visits"
                                >
                                    {analytics.returnVisits.count}
                                </div>
                                <div className="stat-desc">Active: <span className="font-bold">{analytics.returnVisits.active}</span></div>
                            </div>
                        </div>
                        
                        <div className="stats shadow bg-base-100 bg-white/80 dark:bg-white/90">
                            <div className="stat">
                                <div className="stat-title flex items-center gap-2"><FaBookOpen /> Bible Studies</div>
                                <div className="stat-value text-primary cursor-pointer hover:underline"
                                    onClick={() => {
                                        window.location.href = '/bible-studies';
                                    }}
                                    title="View All Bible Studies"
                                >
                                    {analytics.bibleStudies.count}
                                </div>
                                <div className="stat-desc">This Month</div>
                            </div>
                        </div>
                        <div className="stats shadow bg-base-100 bg-white/80 dark:bg-white/90">
                            <div className="stat">
                                <div className="stat-title flex items-center gap-2"><FaUserGraduate /> Bible Students</div>
                                <div className="stat-value text-primary cursor-pointer hover:underline"
                                    onClick={() => {
                                        window.location.href = '/bible-students';
                                    }}
                                    title="View All Bible Students"
                                >
                                    {analytics.bibleStudents.count}
                                </div>
                                <div className="stat-desc">Active: <span className="font-bold">{analytics.bibleStudents.active}</span></div>
                            </div>
                        </div>
                        <div className="stats shadow bg-base-100 bg-white/80 dark:bg-white/90">
                            <div className="stat">
                                <div className="stat-title flex items-center gap-2"><FaRegClock /> Upcoming Visits</div>
                                <div className="stat-value text-primary cursor-pointer hover:underline"
                                    onClick={handleUpcomingClick}
                                    title="View Upcoming Visits"
                                >
                                    {analytics.upcomingVisits}
                                </div>
                                <div className="stat-desc">Scheduled this month</div>
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
                                                <th>Placements</th>
                                                <th>Notes</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {reports.map(report => (
                                                <tr key={report.month}>
                                                    <td className="text-blue-700 hover:underline cursor-pointer" onClick={() => setModalReport(report)}>
                                                        {(() => {
                                                            const [year, month] = report.month.split('-');
                                                            const date = new Date(year, month - 1);
                                                            return date.toLocaleString('default', { month: 'long', year: 'numeric' });
                                                        })()}
                                                    </td>
                                                    <td>{report.field_hours}</td>
                                                    <td>{report.return_visits}</td>
                                                    <td>{report.bible_studies}</td>
                                                    <td>{report.placements}</td>
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
            {modalReport && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
                        <button className="absolute top-2 right-2 btn btn-sm btn-circle btn-ghost" onClick={closeModal}>&times;</button>
                        <h4 className="text-lg font-bold mb-4">Monthly Report: {(() => {
                            const [year, month] = modalReport.month.split('-');
                            const date = new Date(year, month - 1);
                            return date.toLocaleString('default', { month: 'long', year: 'numeric' });
                        })()}</h4>
                        <ul className="space-y-2">
                            <li><span className="font-semibold">Field Hours:</span> {modalReport.field_hours}</li>
                            <li><span className="font-semibold">Return Visits:</span> {modalReport.return_visits}</li>
                            <li><span className="font-semibold">Bible Studies:</span> {modalReport.bible_studies}</li>
                            <li><span className="font-semibold">Placements:</span> {modalReport.placements}</li>
                            <li><span className="font-semibold">Bible Students:</span> {modalReport.bible_students}</li>
                            <li><span className="font-semibold">Notes:</span> {modalReport.notes ?? '-'}</li>
                        </ul>
                    </div>
                </div>
            )}
            {showUpcomingModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
                        <button className="absolute top-2 right-2 btn btn-sm btn-circle btn-ghost" onClick={closeUpcomingModal}>&times;</button>
                        <h4 className="text-lg font-bold mb-4">Upcoming Visits This Month</h4>
                        {upcomingVisitsList.length === 0 ? (
                            <div className="text-gray-500">No upcoming visits or studies scheduled for this month.</div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="table table-sm w-full">
                                    <thead>
                                        <tr>
                                            <th>Type</th>
                                            <th>Name</th>
                                            <th>Date</th>
                                            <th>Address</th>
                                            <th>Mobile</th>
                                            <th>Notes</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {upcomingVisitsList
                                            .sort((a, b) => new Date(a.date) - new Date(b.date))
                                            .map((item, idx) => (
                                                <tr key={item.type + '-' + item.id + '-' + idx}>
                                                    <td>{item.type}</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.date}</td>
                                                    <td>{item.address ?? '-'}</td>
                                                    <td>{item.mobile ?? '-'}</td>
                                                    <td className="line-clamp-4 max-w-xs whitespace-pre-line">{item.notes ?? '-'}</td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                        <div className="mt-6 text-right">
                            <button className="btn btn-primary" onClick={closeUpcomingModal}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
