const API_BASE = import.meta.env.VITE_API_URL || ""

export function apiUrl(path: string): string {
  const base = API_BASE.replace(/\/$/, "")
  const p = path.startsWith("/") ? path : `/${path}`
  return base + p
}

export async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const url = apiUrl(`/api${endpoint}`)
  const token = localStorage.getItem("admin_token")
  return fetch(url, {
    ...options,
    credentials: "include",
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  })
}

const api = {
  async post(endpoint: string, data: any) {
    const response = await fetch(apiUrl(`/api${endpoint}`), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: "Request failed" }))
      throw new Error(error.error || "Request failed")
    }

    return response.json()
  },

  async get(endpoint: string) {
    const response = await fetch(apiUrl(`/api${endpoint}`), {
      method: "GET",
      credentials: "include",
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: "Request failed" }))
      throw new Error(error.error || "Request failed")
    }

    return response.json()
  },

  async delete(endpoint: string) {
    const response = await fetch(apiUrl(`/api${endpoint}`), {
      method: "DELETE",
      credentials: "include",
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: "Request failed" }))
      throw new Error(error.error || "Request failed")
    }

    return response.json()
  },
}

export default api
