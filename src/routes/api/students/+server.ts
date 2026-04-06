import { json } from '@sveltejs/kit';
import { supabase } from '$lib/server/supabaseClient';

export async function GET() {
    const { data: students, error } = await supabase
        .from('students')
        .select('*')
        .order('id', { ascending: true });

    console.log(students);

    if (error) {
        return json({ error: error.message }, { status: 500 });
    }

    return json({ students });
}
