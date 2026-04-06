import { json } from '@sveltejs/kit';
import { supabase } from '$lib/server/supabaseClient';

export async function GET() {
    const { data, error } = await supabase
        .from('materials')
        .select('*')
        .order('id');

    if (error) {
        return json({ error: error.message }, { status: 500 });
    }

    return json({ materials: data });
}

export async function POST({ request }) {
    const body = await request.json();

    const { data, error } = await supabase
        .from('materials')
        .insert([body])
        .select();

    if (error) {
        return json({ error: error.message }, { status: 500 });
    }

    return json({ material: data });
}