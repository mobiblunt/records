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

        const [selectedVisit, setSelectedVisit] = React.useState(null);
        const [showModal, setShowModal] = React.useState(false);
      
        const handleView = (visit) => {
            setSelectedVisit(visit);
            setShowModal(true);
        };
        const closeModal = () => {
            setShowModal(false);
            setSelectedVisit(null);
        };

        const handleAddToBibleStudent = () => {
            if (!selectedVisit) return;
            router.post(route('bible-students.store'), {
                name: selectedVisit.name,
                address: selectedVisit.address,
                mobile: selectedVisit.mobile,
                preferred_days: selectedVisit.preferred_days,
                notes: selectedVisit.notes,
                // Add more fields if needed
            }, {
                onSuccess: () => {
                    // Mark this ReturnVisit as added to Bible Student
                    router.put(route('return-visits.update', selectedVisit.id), {
                        ...selectedVisit,
                        added_to_bible_student: true,
                    }, {
                        preserveScroll: true,
                        onSuccess: () => {
                            toast.success('Added to Bible Students!');
                            closeModal();
                        },
                        onError: () => {
                            toast.error('Failed to update Return Visit.');
                        }
                    });
                },
                onError: () => {
                    toast.error('Failed to add to Bible Students.');
                }
            });
        };
  return (
    <AuthenticatedLayout
                user={auth.user}
                header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">My Return Visits</h2>}
            >
                <Head title="My Return Visits" />
                <div className="p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <button className="btn btn-outline" onClick={() => window.history.back()}>&larr; Back</button>
                                    <Link href={route('return-visits.create')} className="btn btn-success px-4 py-2 rounded ">+ New Return Visit</Link>
                                </div>
                                <div className="overflow-x-auto">
                                <table className="table table-sm min-w-full bg-white border border-gray-200">
                                    <thead>
                                        <tr>
                                            <th className="text-red-600 py-2 px-4 border-b">Name</th>
                                            <th className="text-red-600 py-2 px-4 border-b">Address</th>
                                            <th className="text-red-600 py-2 px-4 border-b">Mobile</th>
                                            <th className="text-red-600 py-2 px-4 border-b">Placement</th>
                                            <th className="text-red-600 py-2 px-4 border-b">Last Visit</th>
                                            <th className="text-red-600 py-2 px-4 border-b">Next Visit</th>
                                            <th className="text-red-600 py-2 px-4 border-b">Visit Count</th>
                                            <th className="text-red-600 py-2 px-4 border-b">Preferred Days</th>
                                            <th className="text-red-600 py-2 px-4 border-b">Status</th>
                                            <th className="text-red-600 py-2 px-4 border-b">Active</th>
                                            <th className="text-red-600 py-2 px-4 border-b">Notes</th>
                                            <th className="text-red-600 py-2 px-4 border-b text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {returnVisits.length === 0 ? (
                                            <tr>
                                                <td colSpan="12" className="text-center py-4">No records found.</td>
                                            </tr>
                                        ) : (
                                            returnVisits.map(visit => (
                                                <tr key={visit.id}
                                                    className="hover:bg-gray-100 cursor-pointer"
                                                    onClick={() => handleView(visit)}
                                                >
                                                    <td className="py-2 px-4 border-b text-blue-700 hover:underline">{visit.name}</td>
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
                                                        <Link href={route('return-visits.edit', visit.id)} className="btn btn-outline btn-primary mr-2">Edit</Link>
                                                        <button
                                                            type="button"
                                                            onClick={e => {
                                                                e.stopPropagation();
                                                                if (confirm('Are you sure you want to delete this record?')) {
                                                                    router.delete(route('return-visits.destroy', visit.id));
                                                                }
                                                            }}
                                                            className="btn btn-outline btn-error"
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
                            </div>

{/* Modal for viewing single item */}
{showModal && selectedVisit && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
            <button className="absolute top-2 right-2 btn btn-sm btn-circle btn-ghost" onClick={closeModal}>&times;</button>
            <h2 className="text-xl font-bold mb-4">Return Visit Details</h2>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                <div><span className="font-semibold">Name:</span> {selectedVisit.name}</div>
                <div><span className="font-semibold">Address:</span> {selectedVisit.address}</div>
                <div><span className="font-semibold">Mobile:</span> {selectedVisit.mobile ?? '-'}</div>
                <div><span className="font-semibold">Placement:</span> {selectedVisit.placement ?? '-'}</div>
                <div><span className="font-semibold">Last Visit:</span> {selectedVisit.last_visit_date ?? '-'}</div>
                <div><span className="font-semibold">Next Visit:</span> {selectedVisit.next_visit_date ?? '-'}</div>
                <div><span className="font-semibold">Visit Count:</span> {selectedVisit.visit_count ?? 0}</div>
                <div><span className="font-semibold">Preferred Days:</span> {selectedVisit.preferred_days ?? '-'}</div>
                <div><span className="font-semibold">Status:</span> {selectedVisit.status ?? '-'}</div>
                <div><span className="font-semibold">Active:</span> {selectedVisit.is_active ? 'Yes' : 'No'}</div>
                <div className="col-span-2"><span className="font-semibold">Notes:</span> {selectedVisit.notes ?? '-'}</div>
            </div>
            <div className="mt-6 flex justify-between">
                <button className="btn btn-primary" onClick={closeModal}>Close</button>
                {selectedVisit.added_to_bible_student !== true && (
                    <button className="btn btn-success" onClick={handleAddToBibleStudent}>Add to Bible Student</button>
                )}
            </div>
        </div>
    </div>
)}

                </AuthenticatedLayout>
  )
}

export default index