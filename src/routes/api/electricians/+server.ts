import { json } from '@sveltejs/kit';
import { supabase } from '$lib/server/supabaseClient';

export async function GET() {
    const { data, error } = await supabase
        .from('electricians')
        .select('*')
        .order('id', { ascending: true });

    if (error) {
        return json({ error: error.message }, { status: 500 });
    }

    return json({ electricians: data });
}

export async function POST({ request }) {
    const body = await request.json();

    const { data, error } = await supabase
        .from('electricians')
        .insert([body])
        .select();

    if (error) {
        return json({ error: error.message }, { status: 500 });
    }

    return json({ electrician: data });
}