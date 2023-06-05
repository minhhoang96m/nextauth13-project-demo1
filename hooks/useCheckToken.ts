import {axiosWeb} from '@/lib/axios'

export const useCheckToken = async (token: string) => {
    try {
        const response = await axiosWeb.get('/checktoken', {
            headers: {
                Authorization: `bearer ${token}`,
            },
        })
        if (response.status === 200) return true
    } catch (error) {
        console.error(error)
        return false
    }
}
