import { json } from '@sveltejs/kit';
import { supabase } from '$lib/server/supabaseClient';

export async function GET() {
    const { data, error } = await supabase
        .from('quotations')
        .select(`
            *,
            customers(name),
            stores(name),
            electricians(name)
        `)
        .order('id', { ascending: false });

    if (error) {
        return json({ error: error.message }, { status: 500 });
    }

    return json({ quotations: data });
}

export async function POST({ request }) {
    const body = await request.json();

    const { data, error } = await supabase
        .from('quotations')
        .insert([body])
        .select();

    if (error) {
        return json({ error: error.message }, { status: 500 });
    }

    return json({ quotation: data });
}