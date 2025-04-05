import { apiService } from "./apiService";
import { EmailVerificationRequest, PasswordResetRequest, ResendVerificationRequest, ResetPasswordRequest, UpdatePasswordRequest } from "./model/auth/Auth";
import { REQUEST_PASSWORD_RESET_PATH, RESEND_EMAIL_CODE_PATH, RESET_PASSWORD_PATH, UPDATE_PASSWORD_PATH, VERIFY_EMAIL_PATH, VERIFY_PHONE_PATH } from "@utils/constants";


export const verificationService = {
    verifyEmail: async (emailVerificationrequest: EmailVerificationRequest): Promise<any> => {
        try {
            const response = await apiService.post(VERIFY_EMAIL_PATH, emailVerificationrequest);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    
    verifyPhone: async (phoneVerificationRequest: PhoneVerificationRequest) => {
        try{
            const resp = await apiService.post(VERIFY_PHONE_PATH, phoneVerificationRequest);
            return resp.data
        }catch(error){
            throw error;
        }
       
    },

    resendCode: async (resendReq: ResendVerificationRequest):Promise<any> => {
        try{
            const resp =  await apiService.post(RESEND_EMAIL_CODE_PATH, resendReq);
            return resp.data;
        }catch(error){
            throw error;
        }
    }
};
