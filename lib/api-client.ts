import { IMediaClient } from "@/types/interfaces"

type FetchOptins = {
  method?: "GET" | "POST" | "PUT" | "DELETE"
  body?: any
  headers?: Record<string, string>
}

class ApiClient {
  private async fetch<T>(
    endpoint: string,
    options: FetchOptins = {}
  ): Promise<T> {
    const { method = "GET", body, headers = {} } = options
    const defaultHeaders = {
      "Content-Type": "application/json",
      ...headers,
    }
    const response = await fetch(`/api${endpoint}`, {
      method,
      headers: defaultHeaders,
      body: body ? JSON.stringify(body) : undefined,
      cache: "no-store",
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => null)
      const message = errorData?.error || errorData?.message || "Request failed"

      throw Error(message)
    }

    return response.json()
  }

  async getMedia() {
    return this.fetch("/media")
  }

  async createMedia(mediaInfo: IMediaClient) {
    return this.fetch("/media", {
      method: "POST",
      body: mediaInfo,
    })
  }
}

export const apiClient = new ApiClient()
