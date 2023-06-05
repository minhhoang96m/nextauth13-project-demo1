'use client'

import {useSession} from 'next-auth/react'
import {useEffect} from 'react'
import {axiosAuth} from '../lib/axios'

import {useCheckToken} from './useCheckToken'
import {useRefreshToken} from './useRefreshToken'

const useAxiosAuth = () => {
    const {data: session} = useSession()
    const refreshToken = useRefreshToken()

    useEffect(() => {
        const requestIntercept = axiosAuth.interceptors.request.use(
            async (config: any) => {
                const token = session?.user.access_token as string
                const isTokenAvailable = await useCheckToken(token)

                if (isTokenAvailable) {
                    if (!config.headers.Authorization) {
                        config.headers.Authorization = `Bearer ${session?.user?.access_token}`
                        return config
                    }
                } else {
                    await refreshToken()
                    const token = session?.user?.access_token
                    if (!config.headers.Authorization) {
                        config.headers.Authorization = `Bearer ${token}`
                        return config
                    }
                }
            },
            (error) => Promise.reject(error)
        )

        // const responseIntercept = axiosAuth.interceptors.response.use(
        //     (response) => response,
        //     async (error) => {
        //         const prevRequest = error?.config
        //         if (error?.response?.status === 401 && !prevRequest?.sent) {
        //             prevRequest.sent = true
        //             await refreshToken()
        //             prevRequest.headers[
        //                 'Authorization'
        //             ] = `Bearer ${session?.user.access_token}`
        //             return axiosAuth(prevRequest)
        //         }
        //         return Promise.reject(error)
        //     }
        // )

        return () => {
            axiosAuth.interceptors.request.eject(requestIntercept)

            // axiosAuth.interceptors.response.eject(responseIntercept)
        }
    }, [session, refreshToken])

    return axiosAuth
}

export default useAxiosAuth
