import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { toast } from 'react-toastify';
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/Components/ui/table";

const Index = ({ bibleStudies, auth }) => {
    const { flash } = usePage().props;
    const [selectedStudy, setSelectedStudy] = React.useState(null);
    const [showModal, setShowModal] = React.useState(false);

    React.useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
    }, [flash?.success]);

    const handleView = (study) => {
        setSelectedStudy(study);
        setShowModal(true);
    };
    const closeModal = () => {
        setShowModal(false);
        setSelectedStudy(null);
    };

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">My Bible Studies</h2>}>
            <Head title="My Bible Studies" />
            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <button className="btn btn-outline" onClick={() => window.history.back()}>&larr; Back</button>
                    <Link href={route('bible-studies.create')} className="btn btn-success px-4 py-2 rounded ">+ New Bible Study</Link>
                </div>
                <div className="overflow-x-auto">
                    <Table className="min-w-full bg-white border border-gray-200">
                        <TableHeader>
                            <TableRow className='text-red-600'>
                                <TableHead className="py-2 px-4 border-b">Name</TableHead>
                                <TableHead className="py-2 px-4 border-b">Date</TableHead>
                                <TableHead className="py-2 px-4 border-b">Publication</TableHead>
                                <TableHead className="py-2 px-4 border-b">Notes</TableHead>
                                <TableHead className="py-2 px-4 border-b text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {bibleStudies.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-4">No records found.</TableCell>
                                </TableRow>
                            ) : (
                                bibleStudies.map(study => (
                                    <TableRow key={study.id}
                                        className="hover:bg-gray-100 cursor-pointer"
                                        onClick={() => handleView(study)}
                                    >
                                        <TableCell className="py-2 px-4 border-b">{study.name}</TableCell>
                                        <TableCell className="py-2 px-4 border-b">{study.date}</TableCell>
                                        <TableCell className="py-2 px-4 border-b">{study.publication}</TableCell>
                                        <TableCell className=" py-2 px-4 border-b">{study.notes ?? '-'}</TableCell>
                                        <TableCell className="py-2 px-4 border-b text-right">
                                            <Link href={route('bible-studies.edit', study.id)} className="btn btn-outline btn-primary mr-2 mb-2 md:mb-0 btn-sm md:btn-md" onClick={e => e.stopPropagation()}>Edit</Link>
                                            <button
                                                type="button"
                                                onClick={e => {
                                                    e.stopPropagation();
                                                    if (confirm('Are you sure you want to delete this record?')) {
                                                        router.delete(route('bible-studies.destroy', study.id));
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
            {showModal && selectedStudy && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
                        <button className="absolute top-2 right-2 btn btn-sm btn-circle btn-ghost" onClick={closeModal}>&times;</button>
                        <h2 className="text-xl font-bold mb-4">Bible Study Details</h2>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                            <div><span className="font-semibold">Name:</span> {selectedStudy.name}</div>
                            <div><span className="font-semibold">Date:</span> {selectedStudy.date}</div>
                            <div><span className="font-semibold">Publication:</span> {selectedStudy.publication}</div>
                            <div className="col-span-2"><span className="font-semibold">Notes:</span> {selectedStudy.notes ?? '-'}</div>
                        </div>
                        <div className="mt-6 text-right">
                            <button className="btn btn-primary" onClick={closeModal}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
};

export default Index;
