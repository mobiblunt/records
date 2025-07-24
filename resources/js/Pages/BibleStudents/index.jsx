import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { toast } from 'react-toastify';

const Index = ({ bibleStudents, auth }) => {
    const { flash } = usePage().props;
    const [selectedStudent, setSelectedStudent] = React.useState(null);
    const [showModal, setShowModal] = React.useState(false);

    React.useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
    }, [flash?.success]);

    const handleView = (student) => {
        setSelectedStudent(student);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedStudent(null);
    };

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">My Bible Students</h2>}>
            <Head title="My Bible Students" />
            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <button className="btn btn-outline" onClick={() => window.history.back()}>&larr; Back</button>
                    <Link href={route('bible-students.create')} className="btn btn-success px-4 py-2 rounded ">+ New Bible Student</Link>
                </div>
                <div className="overflow-x-auto">
                <table className="table table-sm min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className='text-red-600'>
                            <th className="py-2 px-4 border-b">Name</th>
                            <th className="py-2 px-4 border-b">Address</th>
                            <th className="py-2 px-4 border-b">Mobile</th>
                            <th className="py-2 px-4 border-b">Preferred Days</th>
                            <th className="py-2 px-4 border-b">Last Study</th>
                            <th className="py-2 px-4 border-b">Next Study</th>
                            <th className="py-2 px-4 border-b">Active</th>
                            <th className="py-2 px-4 border-b">Notes</th>
                            <th className="py-2 px-4 border-b text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bibleStudents.length === 0 ? (
                            <tr>
                                <td colSpan="9" className="text-center py-4">No records found.</td>
                            </tr>
                        ) : (
                            bibleStudents.map(student => (
                                <tr key={student.id}
                                    className="hover:bg-gray-100 cursor-pointer"
                                    onClick={() => handleView(student)}
                                >
                                    <td className="py-2 px-4 border-b">{student.name}</td>
                                    <td className="py-2 px-4 border-b">{student.address ?? '-'}</td>
                                    <td className="py-2 px-4 border-b">{student.mobile ?? '-'}</td>
                                    <td className="py-2 px-4 border-b">{student.preferred_days ?? '-'}</td>
                                    <td className="py-2 px-4 border-b">{student.last_study_date ?? '-'}</td>
                                    <td className="py-2 px-4 border-b">{student.next_study_date ?? '-'}</td>
                                    <td className="py-2 px-4 border-b">{student.is_active ? 'Yes' : 'No'}</td>
                                    <td className="py-2 px-4 border-b">{student.notes ?? '-'}</td>
                                    <td className="py-2 px-4 border-b text-right">
                                        <Link href={route('bible-students.edit', student.id)} className="btn btn-outline btn-primary mr-2 mb-2 md:mb-0 btn-sm md:btn-md" onClick={e => e.stopPropagation()}>Edit</Link>
                                        <button
                                            type="button"
                                            onClick={e => {
                                                e.stopPropagation();
                                                if (confirm('Are you sure you want to delete this record?')) {
                                                    router.delete(route('bible-students.destroy', student.id));
                                                }
                                            }}
                                            className="btn btn-outline btn-error btn-sm md:btn-md"
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
            {showModal && selectedStudent && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
                        <button className="absolute top-2 right-2 btn btn-sm btn-circle btn-ghost" onClick={closeModal}>&times;</button>
                        <h2 className="text-xl font-bold mb-4">Bible Student Details</h2>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                            <div><span className="font-semibold">Name:</span> {selectedStudent.name}</div>
                            <div><span className="font-semibold">Address:</span> {selectedStudent.address ?? '-'}</div>
                            <div><span className="font-semibold">Mobile:</span> {selectedStudent.mobile ?? '-'}</div>
                            <div><span className="font-semibold">Preferred Days:</span> {selectedStudent.preferred_days ?? '-'}</div>
                            <div><span className="font-semibold">Last Study:</span> {selectedStudent.last_study_date ?? '-'}</div>
                            <div><span className="font-semibold">Next Study:</span> {selectedStudent.next_study_date ?? '-'}</div>
                            <div><span className="font-semibold">Active:</span> {selectedStudent.is_active ? 'Yes' : 'No'}</div>
                            <div className="col-span-2"><span className="font-semibold">Notes:</span> {selectedStudent.notes ?? '-'}</div>
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
