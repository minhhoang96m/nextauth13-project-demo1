import {verifyJwtAccessToken} from '@/lib/jwt'

export async function GET (request: Request) {
    const access_token = request.headers.get('Authorization')
    if (access_token) {
        const token = access_token.split(' ')[1]
        const tokenResult = verifyJwtAccessToken(token)
        if (tokenResult) {
            return new Response(
                JSON.stringify({
                    token: 'authorized',
                }),
                {
                    status: 200,
                }
            )
        } else {
            return new Response(
                JSON.stringify({
                    error: 'unauthorized',
                }),
                {
                    status: 403,
                }
            )
        }
    }
}
