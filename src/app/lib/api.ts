const API_BASE = '/api'

export async function apiFetch(endpoint: string, options: RequestInit = {}): Promise<Response> {
  const token = localStorage.getItem('bb_admin_token')
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers as Record<string, string> ?? {}),
  }
  const response = await fetch(`${API_BASE}${endpoint}`, { ...options, headers })
  if (response.status === 401) {
    localStorage.removeItem('bb_admin_token')
    window.location.href = '/admin/login'
    throw new Error('Sesie verlopen – log opnieuw in')
  }
  return response
}
