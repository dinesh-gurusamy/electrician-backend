import { json } from '@sveltejs/kit';
import { supabase } from '$lib/server/supabaseClient';

export async function PUT({ request, params }) {
    const id = params.id;  
    console.log("Updating store with ID:", id);
    const body = await request.json();

    const { data, error } = await supabase
        .from('stores')
        .update(body)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        return json({ error: error.message }, { status: 500 });
    }
    return json({ store: data });
}