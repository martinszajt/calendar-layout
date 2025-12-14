import axios, { AxiosResponse, GenericAbortSignal } from "axios";
import HTTP_METHODS from "../utils/httpsMethods";

const ApiRequest = async <T>(
  method: HTTP_METHODS,
  url: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: any,
  signal?: GenericAbortSignal,
) => {
  try {
    const data: AxiosResponse<T> = await axios({
      method,
      url,
      withCredentials: true,
      signal,
      data: body,
      params,
    });

    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      data: null,
      status: error.response?.status ?? 500,
      error: error.response?.data ?? error.message,
    };
  }
};

export default ApiRequest;
