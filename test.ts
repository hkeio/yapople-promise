import * as yapople from './index'

test('should have methods', () => {
    const client = new yapople.Client({
        hostname: 'pop.domain.com',
        port: 995,
        tls: true,
        mailparser: true,
        username: 'username',
        password: 'password'
    })
    expect(client).toHaveProperty('client')
    expect(client).toHaveProperty('connected')
    expect(client).toHaveProperty('connect')
    expect(client).toHaveProperty('count')
    expect(client).toHaveProperty('retrieve')
    expect(client).toHaveProperty('retrieveAll')
    expect(client).toHaveProperty('delete')
    expect(client).toHaveProperty('deleteAll')
    expect(client).toHaveProperty('retrieveAndDeleteAll')
    expect(client).toHaveProperty('list')
    expect(client).toHaveProperty('quit')
});