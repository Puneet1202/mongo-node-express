require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
const supabaseAdmin = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SECRET_KEY);
const bucketName = "google-drive"; // bucket name check dashboard

module.exports = { supabase, supabaseAdmin, bucketName };
