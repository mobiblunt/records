import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { toast } from 'react-toastify';

const Index = ({ bibleStudents, auth }) => {
    const { flash } = usePage().props;
    React.useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
    }, [flash?.success]);
    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">My Bible Students</h2>}>
            <Head title="My Bible Students" />
            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">My Bible Students</h1>
                    <Link href={route('bible-students.create')} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">+ New Bible Student</Link>
                </div>
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr>
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
                                <tr key={student.id}>
                                    <td className="py-2 px-4 border-b">{student.name}</td>
                                    <td className="py-2 px-4 border-b">{student.address ?? '-'}</td>
                                    <td className="py-2 px-4 border-b">{student.mobile ?? '-'}</td>
                                    <td className="py-2 px-4 border-b">{student.preferred_days ?? '-'}</td>
                                    <td className="py-2 px-4 border-b">{student.last_study_date ?? '-'}</td>
                                    <td className="py-2 px-4 border-b">{student.next_study_date ?? '-'}</td>
                                    <td className="py-2 px-4 border-b">{student.is_active ? 'Yes' : 'No'}</td>
                                    <td className="py-2 px-4 border-b">{student.notes ?? '-'}</td>
                                    <td className="py-2 px-4 border-b text-right">
                                        <Link href={route('bible-students.edit', student.id)} className="text-blue-600 hover:underline mr-2">Edit</Link>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                if (confirm('Are you sure you want to delete this record?')) {
                                                    router.delete(route('bible-students.destroy', student.id));
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
};

export default Index;
