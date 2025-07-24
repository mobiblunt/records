import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head,Link, useForm } from '@inertiajs/react';

export default function Create({ auth }) {
    const today = new Date().toISOString().split('T')[0];
    const { data, setData, post, processing, errors } = useForm({
        date: today,
        hours: '',
        bible_studies: '',
        placements: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('field-records.store'));
    };

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">New Field Record</h2>}>
            <Head title="Create Field Record" />
            <div className="max-w-xl mx-auto mt-2 p-6 bg-white rounded shadow">
                <div className="flex justify-between items-center mb-4">
                    <button className="btn btn-outline" onClick={() => window.history.back()}>&larr; Back</button>
                    
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-1">Date</label>
                        <input type="date" className="w-full border rounded px-3 py-2" value={data.date} onChange={e => setData('date', e.target.value)} required />
                        {errors.date && <div className="text-red-500 text-sm">{errors.date}</div>}
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Hours</label>
                        <input type="number" className="w-full border rounded px-3 py-2" value={data.hours} onChange={e => setData('hours', e.target.value)} required />
                        {errors.hours && <div className="text-red-500 text-sm">{errors.hours}</div>}
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Bible Studies</label>
                        <input type="number" className="w-full border rounded px-3 py-2" value={data.bible_studies} onChange={e => setData('bible_studies', e.target.value)} />
                        {errors.bible_studies && <div className="text-red-500 text-sm">{errors.bible_studies}</div>}
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Placements</label>
                        <input type="text" className="w-full border rounded px-3 py-2" value={data.placements} onChange={e => setData('placements', e.target.value)} />
                        {errors.placements && <div className="text-red-500 text-sm">{errors.placements}</div>}
                    </div>
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={processing}>Create</button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
