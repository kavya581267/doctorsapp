import { apiService } from "./apiService";
import { PasswordResetRequest, ResetPasswordRequest, UpdatePasswordRequest } from "./model/auth/Auth";
import { REQUEST_PASSWORD_RESET_PATH, RESET_PASSWORD_PATH, UPDATE_PASSWORD_PATH } from "@utils/constants";
import { PasswordResetResponse } from "./model/passwordManagement/PasswordResetResponse";


export const passwordManagementService = {
    requestPasswordReset: async (passwordResetRequest: PasswordResetRequest): Promise<PasswordResetResponse> => {
        try {
            const response = await apiService.post(REQUEST_PASSWORD_RESET_PATH, passwordResetRequest);
            return response;
        } catch (error) {
            throw error;
        }
    },
    
    resetPassword: async (resetPasswordRequest: ResetPasswordRequest) => {
        try{
            const resp = await apiService.post(RESET_PASSWORD_PATH, resetPasswordRequest);
            return resp.data
        }catch(error){
            throw error;
        }
       
    },

    updatePassword: async (updatePassword: UpdatePasswordRequest):Promise<any> => {
        try{
            const resp =  await apiService.post(UPDATE_PASSWORD_PATH, updatePassword);
            return resp.data;
        }catch(error){
            throw error;
        }
    }
};
