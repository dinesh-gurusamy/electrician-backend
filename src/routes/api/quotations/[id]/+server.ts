import { json } from '@sveltejs/kit';
import { supabase } from '$lib/server/supabaseClient';

export async function GET({ params }) {
    const id = params.id;

    const { data, error } = await supabase
        .from('quotations')
        .select(`
            *,
            electricians (*),
            customers (*),
            stores (*),
            quotation_items (
                id,
                quantity,
                materials (*)
            )
        `)
        .eq('id', id)
        .single();

    if (error) {
        return json({ error: error.message }, { status: 500 });
    }
    
    return json({ quotation: data });
}

