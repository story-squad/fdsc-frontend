import { AxiosResponse } from 'axios';
import { axiosWithoutAuth } from '../axiosWithConfig';

export const getResetEmail = (
  email: string,
): Promise<AxiosResponse<ResetResponse>> => {
  return axiosWithoutAuth().get(`/reset?email=${email}`);
};

export const updatePassword = (
  body: NewPasswordBody,
): Promise<AxiosResponse<ResetResponse>> => {
  return axiosWithoutAuth().post('/reset', body);
};

export interface NewPasswordBody {
  email: string;
  code: string;
  password: string;
}

interface ResetResponse {
  message: string;
}
