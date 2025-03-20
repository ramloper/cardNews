import axios, { AxiosRequestConfig } from "axios";
import { toast } from "react-toastify";

export const privateApi = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}`,
    headers: {
        Authorization: `${localStorage.getItem('accessToken')}`,
    },
});

privateApi.interceptors.request.use((config) => {
    config.headers.Authorization = localStorage.getItem('accessToken')
    return config
})
privateApi.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (error.response?.status === 401) {
            await getAccessToken()
            error.config.headers = {
                'Content-Type': 'application/json',
                Authorization: `${localStorage.getItem('accessToken')}`,
            }
            const response = await axios.request(error.config);
            return response

        }
        return Promise.reject(error)
    }
)

export const sendPrivateRequestWithToast = async (requestConfig: AxiosRequestConfig<any>, { pending, success, error }: { pending: string, success: string, error: string }) => {
    return toast.promise(
        privateApi(requestConfig), // Axios 요청
        {
            pending: pending, // 로딩 상태
            success: success, // 성공 메시지
            error: error, // 실패 메시지
        },
        {
            autoClose: 1000, // 3초 후 자동 닫힘
        }
    );
};

export const sendPublicRequestWithToast = async (requestConfig: AxiosRequestConfig<any>, { pending, success, error }: { pending: string, success: string, error: string }) => {
    return toast.promise(
        publicApi(requestConfig), // Axios 요청
        {
            pending: pending, // 로딩 상태
            success: success, // 성공 메시지
            error: error, // 실패 메시지
        },
        {
            autoClose: 1000, // 3초 후 자동 닫힘
        }
    );
};

export const publicApi = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}`
});
publicApi.interceptors.request.use((config) => {
    return config
})
publicApi.interceptors.response.use(null, (error) => {
    if (error.response?.status === 401) {
        if (confirm("로그인이 필요합니다. 로그인을 하러 가시겠습니까?"))
            window.location.href = '/login'
    }
    return Promise.reject(error)
})
const getAccessToken = async () => {
    try {
        const res = await publicApi.post('/refresh', {}, {
            withCredentials: true
        })
        localStorage.setItem("accessToken", res.data.data)
    } catch (error) {
        console.log(error);

    }


}