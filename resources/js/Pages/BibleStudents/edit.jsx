import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Edit({ bibleStudent, auth }) {
    const { data, setData, put, processing, errors } = useForm({
        name: bibleStudent.name || '',
        address: bibleStudent.address || '',
        mobile: bibleStudent.mobile || '',
        preferred_days: bibleStudent.preferred_days || '',
        last_study_date: bibleStudent.last_study_date || '',
        next_study_date: bibleStudent.next_study_date || '',
        notes: bibleStudent.notes || '',
        is_active: bibleStudent.is_active ?? true,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('bible-students.update', bibleStudent.id));
    };

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Bible Student</h2>}>
            <Head title="Edit Bible Student" />
            <div className="max-w-xl mx-auto mt-2 p-6 bg-white rounded shadow">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-1">Name</label>
                        <input type="text" className="w-full border rounded px-3 py-2" value={data.name} onChange={e => setData('name', e.target.value)} required />
                        {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Address <span className="text-gray-400 text-xs">(optional)</span></label>
                        <input type="text" className="w-full border rounded px-3 py-2" value={data.address} onChange={e => setData('address', e.target.value)} placeholder="Enter address (optional)" />
                        {errors.address && <div className="text-red-500 text-sm">{errors.address}</div>}
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Mobile <span className="text-gray-400 text-xs">(optional)</span></label>
                        <input type="text" className="w-full border rounded px-3 py-2" value={data.mobile} onChange={e => setData('mobile', e.target.value)} placeholder="Enter mobile (optional)" />
                        {errors.mobile && <div className="text-red-500 text-sm">{errors.mobile}</div>}
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Preferred Days <span className="text-gray-400 text-xs">(optional)</span></label>
                        <input type="text" className="w-full border rounded px-3 py-2" value={data.preferred_days} onChange={e => setData('preferred_days', e.target.value)} placeholder="e.g. Monday, Friday" />
                        {errors.preferred_days && <div className="text-red-500 text-sm">{errors.preferred_days}</div>}
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Last Study Date <span className="text-gray-400 text-xs">(optional)</span></label>
                        <input type="date" className="w-full border rounded px-3 py-2" value={data.last_study_date} onChange={e => setData('last_study_date', e.target.value)} />
                        {errors.last_study_date && <div className="text-red-500 text-sm">{errors.last_study_date}</div>}
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Next Study Date <span className="text-gray-400 text-xs">(optional)</span></label>
                        <input type="date" className="w-full border rounded px-3 py-2" value={data.next_study_date} onChange={e => setData('next_study_date', e.target.value)} />
                        {errors.next_study_date && <div className="text-red-500 text-sm">{errors.next_study_date}</div>}
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Notes <span className="text-gray-400 text-xs">(optional)</span></label>
                        <textarea className="w-full border rounded px-3 py-2" value={data.notes} onChange={e => setData('notes', e.target.value)} placeholder="Enter notes (optional)" />
                        {errors.notes && <div className="text-red-500 text-sm">{errors.notes}</div>}
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Is Active</label>
                        <input type="checkbox" checked={data.is_active} onChange={e => setData('is_active', e.target.checked)} />
                    </div>
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={processing}>Update</button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
