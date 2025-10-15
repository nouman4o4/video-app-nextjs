import { IVideo } from "@/models/video.model"

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
    })

    if (!response.ok) {
      throw new Error(await response.text())
    }

    return response.json()
  }

  async getVideos() {
    return this.fetch("/video")
  }

  async createVideo(video: Omit<IVideo, "_id">) {
    return this.fetch("/videos", {
      method: "POST",
      body: video,
    })
  }
}

export const apiClient = new ApiClient()
