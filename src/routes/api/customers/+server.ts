import { json } from '@sveltejs/kit';
import { supabase } from '$lib/server/supabaseClient';

export async function GET() {
    const { data, error } = await supabase
        .from('customers')
        .select('*')
        .order('id');

    if (error) {
        return json({ error: error.message }, { status: 500 });
    }

    return json({ customers: data });
}

export async function POST({ request }) {
    const body = await request.json();

    const { data, error } = await supabase
        .from('customers')
        .insert([body])
        .select();

    if (error) {
        return json({ error: error.message }, { status: 500 });
    }
    return json({ customer: data });
}


export async function PUT({ request }) {
    const id=await request.params.id;
    console.log(id);
    const body = await request.json();

    const { data, error } = await supabase
        .from('customers')
        .insert([body])
        .select();

    if (error) {
        return json({ error: error.message }, { status: 500 });
    }
    return json({ customer: data });
}

// {
//     "customers": [{ "id": 1, "name": "Arun", "phone": "9000011111", "address": "Erode", "created_at": "2026-04-06T07:22:01.205177" },
//     { "id": 2, "name": "Vijay", "phone": "9000022222", "address": "Chennimalai", "created_at": "2026-04-06T07:22:01.205177" },
//     { "id": 3, "name": "Prakash", "phone": "9000033333", "address": "Perundurai", "created_at": "2026-04-06T07:22:01.205177" }]
// }