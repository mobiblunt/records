import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        address: '',
        mobile: '',
        placement: '',
        last_visit_date: '',
        notes: '',
        is_active: true,
        next_visit_date: '',
        visit_count: 0,
        preferred_days: '',
        status: 'pending',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('return-visits.store'));
    };

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">New Return Visit</h2>}>
            <Head title="Create Return Visit" />
            <div className="max-w-xl mx-auto mt-2 p-6 bg-white rounded shadow">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-1">Name</label>
                        <input type="text" className="w-full border rounded px-3 py-2" value={data.name} onChange={e => setData('name', e.target.value)} required />
                        {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Address </label>
                        <input type="text" className="w-full border rounded px-3 py-2" value={data.address} onChange={e => setData('address', e.target.value)} placeholder="Enter address (optional)" />
                        {errors.address && <div className="text-red-500 text-sm">{errors.address}</div>}
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Mobile <span className="text-gray-400 text-xs">(optional)</span></label>
                        <input type="text" className="w-full border rounded px-3 py-2" value={data.mobile} onChange={e => setData('mobile', e.target.value)} placeholder="Enter mobile (optional)" />
                        {errors.mobile && <div className="text-red-500 text-sm">{errors.mobile}</div>}
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Placement <span className="text-gray-400 text-xs">(optional)</span></label>
                        <input type="text" className="w-full border rounded px-3 py-2" value={data.placement} onChange={e => setData('placement', e.target.value)} placeholder="Enter placement (optional)" />
                        {errors.placement && <div className="text-red-500 text-sm">{errors.placement}</div>}
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Last Visit Date</label>
                        <input type="date" className="w-full border rounded px-3 py-2" value={data.last_visit_date} onChange={e => setData('last_visit_date', e.target.value)}  />
                        {errors.last_visit_date && <div className="text-red-500 text-sm">{errors.last_visit_date}</div>}
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
                    <div className="mb-4">
                        <label className="block mb-1">Next Visit Date <span className="text-gray-400 text-xs">(optional)</span></label>
                        <input type="date" className="w-full border rounded px-3 py-2" value={data.next_visit_date} onChange={e => setData('next_visit_date', e.target.value)} />
                        {errors.next_visit_date && <div className="text-red-500 text-sm">{errors.next_visit_date}</div>}
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Visit Count</label>
                        <input type="number" className="w-full border rounded px-3 py-2" value={data.visit_count} onChange={e => setData('visit_count', e.target.value)} min="0" />
                        {errors.visit_count && <div className="text-red-500 text-sm">{errors.visit_count}</div>}
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Preferred Days <span className="text-gray-400 text-xs">(optional)</span></label>
                        <input type="text" className="w-full border rounded px-3 py-2" value={data.preferred_days} onChange={e => setData('preferred_days', e.target.value)} placeholder="e.g. Monday, Friday" />
                        {errors.preferred_days && <div className="text-red-500 text-sm">{errors.preferred_days}</div>}
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Status</label>
                        <select className="w-full border rounded px-3 py-2" value={data.status} onChange={e => setData('status', e.target.value)}>
                            <option value="pending">Pending</option>
                            <option value="completed">Completed</option>
                        </select>
                        {errors.status && <div className="text-red-500 text-sm">{errors.status}</div>}
                    </div>
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={processing}>Create</button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
