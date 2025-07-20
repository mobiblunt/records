import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { toast } from 'react-toastify';

const index = ({ returnVisits, auth }) => {
    const { flash } = usePage().props;
        React.useEffect(() => {
            
            if (flash?.success) {
                toast.success(flash.success);
            }
        }, [flash?.success]);
  return (
    <AuthenticatedLayout
                user={auth.user}
                header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">My Return Visits</h2>}
            >
                <Head title="My Return Visits" />
                <div className="p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h1 className="text-2xl font-bold">My Return Visits</h1>
                                    <Link href={route('return-visits.create')} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">+ New Return Visit</Link>
                                </div>
                                <table className="min-w-full bg-white border border-gray-200">
                                    <thead>
                                        <tr>
                                            <th className="py-2 px-4 border-b">Name</th>
                                            <th className="py-2 px-4 border-b">Address</th>
                                            <th className="py-2 px-4 border-b">Mobile</th>
                                            <th className="py-2 px-4 border-b">Placement</th>
                                            <th className="py-2 px-4 border-b">Last Visit</th>
                                            <th className="py-2 px-4 border-b">Next Visit</th>
                                            <th className="py-2 px-4 border-b">Visit Count</th>
                                            <th className="py-2 px-4 border-b">Preferred Days</th>
                                            <th className="py-2 px-4 border-b">Status</th>
                                            <th className="py-2 px-4 border-b">Active</th>
                                            <th className="py-2 px-4 border-b">Notes</th>
                                            <th className="py-2 px-4 border-b text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {returnVisits.length === 0 ? (
                                            <tr>
                                                <td colSpan="12" className="text-center py-4">No records found.</td>
                                            </tr>
                                        ) : (
                                            returnVisits.map(visit => (
                                                <tr key={visit.id}>
                                                    <td className="py-2 px-4 border-b">{visit.name}</td>
                                                    <td className="py-2 px-4 border-b">{visit.address}</td>
                                                    <td className="py-2 px-4 border-b">{visit.mobile ?? '-'}</td>
                                                    <td className="py-2 px-4 border-b">{visit.placement ?? '-'}</td>
                                                    <td className="py-2 px-4 border-b">{visit.last_visit_date ?? '-'}</td>
                                                    <td className="py-2 px-4 border-b">{visit.next_visit_date ?? '-'}</td>
                                                    <td className="py-2 px-4 border-b">{visit.visit_count ?? 0}</td>
                                                    <td className="py-2 px-4 border-b">{visit.preferred_days ?? '-'}</td>
                                                    <td className="py-2 px-4 border-b">{visit.status ?? '-'}</td>
                                                    <td className="py-2 px-4 border-b">{visit.is_active ? 'Yes' : 'No'}</td>
                                                    <td className="py-2 px-4 border-b">{visit.notes ?? '-'}</td>
                                                    <td className="py-2 px-4 border-b text-right">
                                                        <Link href={route('return-visits.edit', visit.id)} className="text-blue-600 hover:underline mr-2">Edit</Link>
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                if (confirm('Are you sure you want to delete this record?')) {
                                                                    router.delete(route('return-visits.destroy', visit.id));
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
  )
}

export default index