import { json } from '@sveltejs/kit';
import { supabase } from '$lib/server/supabaseClient';

export async function GET() {
    const { data, error } = await supabase
        .from('quotation_items')
        .select(`
            *,
            materials(name)
        `);

    if (error) {
        return json({ error: error.message }, { status: 500 });
    }

    return json({ items: data });
}

export async function POST({ request }) {
    console.log(request);
    const body = await request.json();

    const { data, error } = await supabase
        .from('quotation_items')
        .insert([body])
        .select();

    if (error) {
        return json({ error: error.message }, { status: 500 });
    }

    return json({ item: data });
}