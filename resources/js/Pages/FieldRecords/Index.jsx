import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ fieldRecords, auth }) {
    return (
        <AuthenticatedLayout
                    user={auth.user}
                    header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">My Field Records</h2>}
                >
                    <Head title="Field Records" />
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">My Field Records</h1>
                <Link href={route('field-records.create')} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">+ New Field Record</Link>
            </div>
            
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Date</th>
                        <th className="py-2 px-4 border-b">Hours</th>
                        <th className="py-2 px-4 border-b">Bible Studies</th>
                        <th className="py-2 px-4 border-b">Placements</th>
                    </tr>
                </thead>
                <tbody>
                    {fieldRecords.length === 0 ? (
                        <tr>
                            <td colSpan="4" className="text-center py-4">No records found.</td>
                        </tr>
                    ) : (
                        fieldRecords.map(record => (
                            <tr key={record.id}>
                                <td className="py-2 px-4 border-b">{record.date}</td>
                                <td className="py-2 px-4 border-b">{record.hours}</td>
                                <td className="py-2 px-4 border-b">{record.bible_studies ?? '-'}</td>
                                <td className="py-2 px-4 border-b">{record.placements ?? '-'}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
        </AuthenticatedLayout>
    );
}
