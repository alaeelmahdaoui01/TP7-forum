import { projectAuth } from "@/Firebase/Config.js";
import { ref } from "vue";

const error = ref(null);

const forgotPassword = async(email) => {
    error.value = null;
    try {
        await projectAuth.sendPasswordResetEmail(email);
        console.log('Password reset email sent successfully.');
    } catch (err) {
        console.error('Error during password reset:', err);

        let errorMessage = 'An error occurred. Please try again later.';

        try {
            const parsedError = JSON.parse(err.message);
            if (parsedError && parsedError.error && parsedError.error.message) {
                if (parsedError.error.message === 'EMAIL_NOT_FOUND') {
                    errorMessage = 'No account found with this email. Please check and try again.';
                }
            }
        } catch (e) {
            console.error('Failed to parse error message:', e);
        }

        error.value = errorMessage;
        throw err;
    }
};

const useForgotPassword = () => {
    return { error, forgotPassword };
};

export default useForgotPassword;