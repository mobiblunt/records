import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { toast } from 'react-toastify';


export default function Index({ fieldRecords, auth }) {
    const { flash } = usePage().props;
    const [selectedRecord, setSelectedRecord] = React.useState(null);
    const [showModal, setShowModal] = React.useState(false);

    React.useEffect(() => {
        
        if (flash?.success) {
            toast.success(flash.success);
        }
    }, [flash?.success]);

    const handleView = (record) => {
        setSelectedRecord(record);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedRecord(null);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">My Field Records</h2>}
        >
            <Head title="Field Records" />
            
            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <button className="btn btn-outline" onClick={() => window.history.back()}>&larr; Back</button>
                    <Link href={route('field-records.create')} className="btn btn-success px-4 py-2 rounded ">+ New Field Record</Link>
                </div>
                <table className="table table-lg min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className='text-red-600'>
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
                                <tr key={record.id}
                                    className="hover:bg-gray-100 cursor-pointer"
                                    onClick={() => handleView(record)}
                                >
                                    <td className="py-2 px-4 border-b">{record.date}</td>
                                    <td className="py-2 px-4 border-b">{record.hours}</td>
                                    <td className="py-2 px-4 border-b">{record.bible_studies ?? '-'}</td>
                                    <td className="py-2 px-4 border-b">{record.placements ?? '-'}</td>
                                    <td className="py-2 px-4 border-b text-right">
                                        <Link href={route('field-records.edit', record.id)} className="btn btn-outline btn-primary mr-2" onClick={e => e.stopPropagation()}>Edit</Link>
                                        <button
                                            type="button"
                                            onClick={e => {
                                                e.stopPropagation();
                                                if (confirm('Are you sure you want to delete this record?')) {
                                                    router.delete(route('field-records.destroy', record.id));
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

            {/* Modal for viewing single item */}
            {showModal && selectedRecord && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
                        <button className="absolute top-2 right-2 btn btn-sm btn-circle btn-ghost" onClick={closeModal}>&times;</button>
                        <h2 className="text-xl font-bold mb-4">Field Record Details</h2>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                            <div><span className="font-semibold">Date:</span> {selectedRecord.date}</div>
                            <div><span className="font-semibold">Hours:</span> {selectedRecord.hours}</div>
                            <div><span className="font-semibold">Bible Studies:</span> {selectedRecord.bible_studies ?? '-'}</div>
                            <div><span className="font-semibold">Placements:</span> {selectedRecord.placements ?? '-'}</div>
                        </div>
                        <div className="mt-6 text-right">
                            <button className="btn btn-primary" onClick={closeModal}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
