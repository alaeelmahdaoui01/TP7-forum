import { ref } from 'vue';
import { projectFirestore, projectAuth } from "@/Firebase/Config";
import { updateProfile, updateEmail } from "firebase/auth";

const user = ref(projectAuth.currentUser);
let authInitialized = false;
let authResolve;

const authReady = new Promise(resolve => {
    authResolve = resolve;
});

projectAuth.onAuthStateChanged(_user => {
    console.log('User state change. Current user is:', _user);
    user.value = _user;
    authInitialized = true;
    authResolve();
});

const getUser = () => {
    return user.value;
}

const isLogged = () => {
    return !!user.value;
}

const waitForAuthInit = () => {
    if (authInitialized) {
        return Promise.resolve();
    }
    return authReady;
}

const getUserById = async(uid) => {
    const res = await projectFirestore.collection('users').doc(uid).get();
    return res.data();
};

// ✅ Add this
const updateUserProfile = async(userId, { displayName, email }) => {
    const currentUser = projectAuth.currentUser;
    if (!currentUser || currentUser.uid !== userId) {
        throw new Error("Unauthorized or invalid user.");
    }

    if (displayName && currentUser.displayName !== displayName) {
        await updateProfile(currentUser, { displayName });
    }

    if (email && currentUser.email !== email) {
        await updateEmail(currentUser, email);
    }

    // Optionally update Firestore too:
    await projectFirestore.collection('users').doc(userId).update({
        displayName,
        email
    });
};

export {
    getUser,
    isLogged,
    waitForAuthInit,
    getUserById,
    updateUserProfile // ✅ make sure it's exported!
};