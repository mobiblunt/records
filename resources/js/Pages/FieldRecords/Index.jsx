import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { toast } from 'react-toastify';


export default function Index({ fieldRecords, auth }) {
    const { flash } = usePage().props;
    React.useEffect(() => {
        
        if (flash?.success) {
            toast.success(flash.success);
        }
    }, [flash?.success]);

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
                            <th className="py-2 px-4 border-b text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fieldRecords.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center py-4">No records found.</td>
                            </tr>
                        ) : (
                            fieldRecords.map(record => (
                                <tr key={record.id}>
                                    <td className="py-2 px-4 border-b">{record.date}</td>
                                    <td className="py-2 px-4 border-b">{record.hours}</td>
                                    <td className="py-2 px-4 border-b">{record.bible_studies ?? '-'}</td>
                                    <td className="py-2 px-4 border-b">{record.placements ?? '-'}</td>
                                    <td className="py-2 px-4 border-b text-right">
                                        <Link href={route('field-records.edit', record.id)} className="text-blue-600 hover:underline mr-2">Edit</Link>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                if (confirm('Are you sure you want to delete this record?')) {
                                                    router.delete(route('field-records.destroy', record.id));
                                                }
                                            }}
                                            className="text-red-600 hover:underline"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    );
}
