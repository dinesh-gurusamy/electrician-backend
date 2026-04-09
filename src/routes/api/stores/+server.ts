import { json } from '@sveltejs/kit';
import { supabase } from '$lib/server/supabaseClient';

export async function GET() {
    const { data, error } = await supabase
        .from('stores')
        .select('*')
        .order('id');
    if (error) {
        return json({ error: error.message }, { status: 500 });
    }
    return json({ stores: data });
}

export async function POST({ request }) {
    const body = await request.json();

    const { data, error } = await supabase.from('stores').insert([body]).select();

    if (error) {
        return json({ error: error.message }, { status: 500 });
    }

    return json({ store: data });
}