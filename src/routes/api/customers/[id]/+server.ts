import { json } from '@sveltejs/kit';
import { supabase } from '$lib/server/supabaseClient';

export async function PUT({ request, params }) {
    const id = params.id;  
    const body = await request.json();

    const { data, error } = await supabase
        .from('customers')
        .update(body)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        return json({ error: error.message }, { status: 500 });
    }
    return json({ customer: data });
}