import { default as HttpClient } from './http-client'

interface ClientOptions {

  auth?: string
  baseUrl?: string
  apiVersion?: string
}

class Client {
  private readonly httpClient: HttpClient

  public readonly accessToken?: string
  public readonly baseUrl: string
  public readonly apiVersion?: string

  constructor (clientOptions: Partial<ClientOptions>) {
    this.accessToken = clientOptions.auth
    this.apiVersion = (clientOptions?.apiVersion ?? 'v1')
    this.baseUrl = (
      clientOptions?.baseUrl ?? 'https://api.arczz.com'
    ) + this.apiVersion

    this.httpClient = new HttpClient(
      this.accessToken,
      this.baseUrl
    )
  }
}

export default Client

export {
  ClientOptions
}
