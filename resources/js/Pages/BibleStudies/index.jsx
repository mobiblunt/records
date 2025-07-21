import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { toast } from 'react-toastify';

const Index = ({ bibleStudies, auth }) => {
    const { flash } = usePage().props;
    React.useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
    }, [flash?.success]);
    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">My Bible Studies</h2>}>
            <Head title="My Bible Studies" />
            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">My Bible Studies</h1>
                    <Link href={route('bible-studies.create')} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">+ New Bible Study</Link>
                </div>
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Name</th>
                            <th className="py-2 px-4 border-b">Date</th>
                            <th className="py-2 px-4 border-b">Publication</th>
                            <th className="py-2 px-4 border-b">Notes</th>
                            <th className="py-2 px-4 border-b text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bibleStudies.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center py-4">No records found.</td>
                            </tr>
                        ) : (
                            bibleStudies.map(study => (
                                <tr key={study.id}>
                                    <td className="py-2 px-4 border-b">{study.name}</td>
                                    <td className="py-2 px-4 border-b">{study.date}</td>
                                    <td className="py-2 px-4 border-b">{study.publication}</td>
                                    <td className="py-2 px-4 border-b">{study.notes ?? '-'}</td>
                                    <td className="py-2 px-4 border-b text-right">
                                        <Link href={route('bible-studies.edit', study.id)} className="text-blue-600 hover:underline mr-2">Edit</Link>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                if (confirm('Are you sure you want to delete this record?')) {
                                                    router.delete(route('bible-studies.destroy', study.id));
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
