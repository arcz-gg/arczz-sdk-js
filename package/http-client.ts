import axios, {
  RawAxiosRequestHeaders
} from 'axios'

interface RequestOptions {

  accessToken: string
  timeoutMs: number
  baseUrl: string
  path: string
  method: 'get'
  | 'post'
  | 'put'
  | 'delete'
  body?: Record<string, unknown>
}

class HttpClient {
  public constructor (
    private readonly accessToken: string | undefined,
    private readonly baseUrl: string
  ) {}

  /*
  * Response Body isn't certain yet
  **/
  private async req<T>({
    body,
    method,
    path
  }: Partial<RequestOptions>
  ): Promise<T> {
    const authorizationHeader = this.accessToken !== undefined
      ? { Authorization: `Bearer: ${this.accessToken}` }
      : {}

    const data =
      (body == null) || Object.entries(body).length === 0
        ? undefined
        : JSON.stringify(body)

    const url = new URL(path, this.baseUrl)

    const headers: RawAxiosRequestHeaders = {
      ...authorizationHeader,
      'User-Agent': 'arczz-sdk/1.0'
    }

    if (data != undefined) { headers['content-type'] = 'application/json' }

    const response = await axios.request<T>({
      method,
      url: url.href,
      headers,
      data
    })

    return response.data
  }

  public async ping<T>(url: URL): Promise<T> {
    const reqOptions: Partial<RequestOptions> = {
      method: 'get',
      baseUrl: url
    }

    return await this.req(reqOptions)
  }
}

export default HttpClient
