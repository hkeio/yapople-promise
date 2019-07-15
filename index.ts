import * as yapople from 'yapople'

export interface YapopleConnectionOptions {
    hostname: string,
    port: 110 | 995,
    tls: boolean,
    mailparser: boolean,
    username: string,
    password: string
}

export interface MailAttachment {
    contentType: string
    fileName: string
    contentDisposition: string
    transferEncoding: string
    generatedFileName: string
    contentId: string
    checksum: string
    length: number
    content: Buffer
}

export interface Sender {
    address: string
    name: string
}

export interface Receiver {
    address: string
    name: string
}

export interface Message {
    text: string
    html: string
    headers: any
    subject: string
    messageId: string
    priority: string
    from: Sender[]
    to: Receiver[]
    date: Date
    receivedDate: Date
    attachments: MailAttachment[]
}

export class Client {
    private _client: yapople.Client
    private _connected = false

    constructor(options: YapopleConnectionOptions) {
        this._client = new yapople.Client(options);
    }

    get connected() {
        return this._connected
    }

    get client() {
        return this._client
    }

    connect(): Promise<void> {
        return new Promise((resolve, reject) => {
            this._client.connect((error) => {
                if (!error) {
                    this._connected = true
                    return resolve()
                }
                reject(error)
            })
        })
    }

    count(): Promise<number> {
        return new Promise((resolve, reject) => this._client.count((error, count) => error ? reject(error) : resolve(count)))
    }

    retrieve(what: number | number[]): Promise<Message[]> {
        return new Promise((resolve, reject) => this._client.retrieve(what, (error, messages: Message[]) => error ? reject(error) : resolve(messages)))
    }

    retrieveAll(): Promise<Message[]> {
        return new Promise((resolve, reject) => this._client.retrieveAll((error, messages: Message[]) => error ? reject(error) : resolve(messages)))
    }

    delete(what: number | number[]): Promise<Message[]> {
        return new Promise((resolve, reject) => this._client.delete(what, (error, messages) => error ? reject(error) : resolve(messages)))
    }

    deleteAll(): Promise<any> {
        return new Promise((resolve, reject) => this._client.deleteAll((error, statuses) => error ? reject(error) : resolve(statuses)))
    }

    retrieveAndDeleteAll(): Promise<Message[]> {
        return new Promise((resolve, reject) => this._client.retrieveAndDeleteAll((error, messages: Message[]) => error ? reject(error) : resolve(messages)))
    }

    list(number?: number | number[]): Promise<any> {
        return new Promise((resolve, reject) => this._client.list(number, (error, info) => error ? reject(error) : resolve(info)))
    }

    quit(): Promise<void> {
        return new Promise((resolve, reject) => {
            return this._client.quit((error) => {
                if (!error) {
                    this._connected = false
                    return resolve()
                }
                reject(error)
            })
        })
    }
}
