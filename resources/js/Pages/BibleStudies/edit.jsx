import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Edit({ bibleStudy, bibleStudents, auth }) {
    const { data, setData, put, processing, errors } = useForm({
        bible_student_id: bibleStudy.bible_student_id || '',
        name: bibleStudy.name || '',
        date: bibleStudy.date || '',
        publication: bibleStudy.publication || '',
        notes: bibleStudy.notes || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('bible-studies.update', bibleStudy.id));
    };

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Bible Study</h2>}>
            <Head title="Edit Bible Study" />
            <div className="max-w-xl mx-auto mt-2 p-6 bg-white rounded shadow">
                <div className="flex justify-between items-center mb-4">
                    <button className="btn btn-outline" onClick={() => window.history.back()}>&larr; Back</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-1">Bible Student <span className="text-gray-400 text-xs">(optional)</span></label>
                        <select className="w-full border rounded px-3 py-2" value={data.bible_student_id} onChange={e => setData('bible_student_id', e.target.value)}>
                            <option value="">-- None --</option>
                            {bibleStudents && bibleStudents.map(student => (
                                <option key={student.id} value={student.id}>{student.name}</option>
                            ))}
                        </select>
                        {errors.bible_student_id && <div className="text-red-500 text-sm">{errors.bible_student_id}</div>}
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Name</label>
                        <input type="text" className="w-full border rounded px-3 py-2" value={data.name} onChange={e => setData('name', e.target.value)} required />
                        {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Date</label>
                        <input type="date" className="w-full border rounded px-3 py-2" value={data.date} onChange={e => setData('date', e.target.value)} required />
                        {errors.date && <div className="text-red-500 text-sm">{errors.date}</div>}
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Publication</label>
                        <input type="text" className="w-full border rounded px-3 py-2" value={data.publication} onChange={e => setData('publication', e.target.value)} required />
                        {errors.publication && <div className="text-red-500 text-sm">{errors.publication}</div>}
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Notes <span className="text-gray-400 text-xs">(optional)</span></label>
                        <textarea className="w-full border rounded px-3 py-2" value={data.notes} onChange={e => setData('notes', e.target.value)} placeholder="Enter notes (optional)" />
                        {errors.notes && <div className="text-red-500 text-sm">{errors.notes}</div>}
                    </div>
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={processing}>Update</button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
