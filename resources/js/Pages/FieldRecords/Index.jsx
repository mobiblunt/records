import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { toast } from 'react-toastify';
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/Components/ui/table";
import { saveDraft, getDrafts } from '../../db';

export default function Index({ fieldRecords: serverRecords, auth }) {
    const { flash } = usePage().props;
    const [selectedRecord, setSelectedRecord] = React.useState(null);
    const [showModal, setShowModal] = React.useState(false);
    const [fieldRecords, setFieldRecords] = React.useState(serverRecords);

    React.useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
    }, [flash?.success]);

    // Load cached field records if offline, otherwise use server records and cache them
    React.useEffect(() => {
        if (navigator.onLine) {
            saveDraft('fieldRecordsList', serverRecords);
            setFieldRecords(serverRecords);
        } else {
            getDrafts('fieldRecordsList').then((drafts) => {
                if (drafts && drafts.length > 0) {
                    // Get the most recent draft
                    const latest = drafts.reduce((a, b) => new Date(a.updatedAt) > new Date(b.updatedAt) ? a : b);
                    setFieldRecords(latest.data);
                }
            });
        }
    }, [serverRecords]);

    const handleView = (record) => {
        setSelectedRecord(record);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedRecord(null);
    };

    // Persist field records list to IndexedDB for offline viewing
    React.useEffect(() => {
        if (navigator.onLine) {
            saveDraft('fieldRecordsList', fieldRecords);
        }
    }, [fieldRecords]);

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
                <div className="overflow-x-auto">
                    <Table className="min-w-full bg-white border border-gray-200">
                        <TableHeader>
                            <TableRow className='text-red-600'>
                                <TableHead className="py-2 px-4 border-b">Date</TableHead>
                                <TableHead className="py-2 px-4 border-b">Hours</TableHead>
                                <TableHead className="py-2 px-4 border-b">Bible Studies</TableHead>
                                <TableHead className="py-2 px-4 border-b">Placements</TableHead>
                                <TableHead className="py-2 px-4 border-b text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {fieldRecords.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-4">No records found.</TableCell>
                                </TableRow>
                            ) : (
                                fieldRecords.map(record => (
                                    <TableRow key={record.id}
                                        className="hover:bg-gray-100 cursor-pointer"
                                        onClick={() => handleView(record)}
                                    >
                                        <TableCell className="py-2 px-4 border-b">{record.date}</TableCell>
                                        <TableCell className="py-2 px-4 border-b">{record.hours}</TableCell>
                                        <TableCell className="py-2 px-4 border-b">{record.bible_studies ?? '-'}</TableCell>
                                        <TableCell className="py-2 px-4 border-b">{record.placements ?? '-'}</TableCell>
                                        <TableCell className="py-2 px-4 border-b text-right">
                                            <Link href={route('field-records.edit', record.id)} className="btn btn-outline btn-primary mr-2 mb-2 md:mb-0 btn-sm md:btn-md" onClick={e => e.stopPropagation()}>Edit</Link>
                                            <button
                                                type="button"
                                                onClick={e => {
                                                    e.stopPropagation();
                                                    if (confirm('Are you sure you want to delete this record?')) {
                                                        router.delete(route('field-records.destroy', record.id));
                                                    }
                                                }}
                                                className="btn btn-outline btn-error btn-sm md:btn-md"
                                            >
                                                Delete
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
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
