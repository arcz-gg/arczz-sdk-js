import axios, {
  RawAxiosRequestHeaders
} from 'axios'

interface RequestOptions {

  accessToken: string
  timeoutMs: number
  path: string
  method: 'get'
  | 'post'
  | 'put'
  | 'delete'
  | 'patch'
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

    const url = new URL(path ?? "", this.baseUrl)

    const headers: RawAxiosRequestHeaders = {
      ...authorizationHeader,
      'User-Agent': 'arczz-sdk-js/1.0'
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
  
  /**
   * get
   */
  public get<T>(
    route: string,
    options: Partial<RequestOptions> = {
      method: 'get'
    }
  ): Promise<T> {
    return this.req<T>({
      path: route,
      ...options
    }) 
  }

  /**
   * post
   */
  public post<T>(
    route: string,
    options: Partial<RequestOptions> = {
      method: 'post'
    }
  ): Promise<T> {
    return this.req<T>({
      path: route,
      ...options
    })
  }

  /**
   * put 
   */
  public put<T>(
    route: string,
    options: Partial<RequestOptions> = {
      method: 'put'
    }
  ): Promise<T> {
    return this.req<T>({
      path: route,
      ...options
    })
  } 

  /**
   * patch
   */
  public patch<T>(
    route: string,
    options: Partial<RequestOptions> = {
      method: 'patch'
    }
  ): Promise<T> {
   
    return this.req<T>({
      path: route,
      ...options
    });
  }
}

export default HttpClient;
export { 
  RequestOptions
}
