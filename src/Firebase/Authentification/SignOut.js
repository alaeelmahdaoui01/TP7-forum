import { projectAuth } from "@/Firebase/Config"

const signOut = () => {
    return projectAuth.signOut().then(() => {
        console.log('User signed out');
    }).catch(error => {
        console.error('Error signing out:', error);
    });
}

export default signOut;