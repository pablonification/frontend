import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Auth helpers
export const auth = {
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  },

  async signOut() {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser()
    return { user, error }
  },

  async getSession() {
    const { data: { session }, error } = await supabase.auth.getSession()
    return { session, error }
  },

  onAuthStateChange(callback: (event: string, session: any) => void) {
    return supabase.auth.onAuthStateChange(callback)
  }
}

// Storage helpers
export const storage = {
  async uploadFile(bucket: string, path: string, file: File) {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file)
    return { data, error }
  },

  async downloadFile(bucket: string, path: string) {
    const { data, error } = await supabase.storage
      .from(bucket)
      .download(path)
    return { data, error }
  },

  async getPublicUrl(bucket: string, path: string) {
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(path)
    return data
  },

  async deleteFile(bucket: string, path: string) {
    const { data, error } = await supabase.storage
      .from(bucket)
      .remove([path])
    return { data, error }
  }
}

// Database helpers
export const db = {
  async getSliders() {
    const { data, error } = await supabase
      .from('sliders')
      .select('*')
      .order('order', { ascending: true })
    return { data, error }
  },

  async getAnnouncements(limit?: number) {
    let query = supabase
      .from('announcements')
      .select('*')
      .order('published_at', { ascending: false })
    
    if (limit) {
      query = query.limit(limit)
    }
    
    const { data, error } = await query
    return { data, error }
  },

  async getAnnouncement(id: number) {
    const { data, error } = await supabase
      .from('announcements')
      .select('*')
      .eq('id', id)
      .single()
    return { data, error }
  },

  async getModules() {
    const { data, error } = await supabase
      .from('praktikum_modules')
      .select('*')
      .order('created_at', { ascending: false })
    return { data, error }
  },

  async getFiles() {
    const { data, error } = await supabase
      .from('files')
      .select('*')
      .eq('visibility', 'public')
      .order('created_at', { ascending: false })
    return { data, error }
  },

  async getNilaiFiles() {
    const { data, error } = await supabase
      .from('nilai_files')
      .select('*')
      .order('created_at', { ascending: false })
    return { data, error }
  },

  async searchContent(query: string) {
    const { data, error } = await supabase
      .from('announcements')
      .select('id, title, content, published_at')
      .textSearch('title,content', query)
    return { data, error }
  }
}

export default supabase
