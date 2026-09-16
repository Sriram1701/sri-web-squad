import { createClient } from "@supabase/supabase-js"

// Supabase Environment variables or localStorage fallback
const getSupabaseConfig = () => {
  if (typeof window !== "undefined") {
    const savedUrl = localStorage.getItem("sws_supabase_url")
    const savedKey = localStorage.getItem("sws_supabase_anon_key")
    if (savedUrl && savedKey) {
      return { url: savedUrl, key: savedKey }
    }
  }
  return {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
  }
}

export const isSupabaseConfigured = () => {
  const { url, key } = getSupabaseConfig()
  return Boolean(url && key && url.startsWith("https://"))
}

export const getSupabaseClient = () => {
  const { url, key } = getSupabaseConfig()
  if (!url || !key) {
    return null
  }
  try {
    return createClient(url, key)
  } catch (err) {
    console.error("Supabase initialization error:", err)
    return null
  }
}
