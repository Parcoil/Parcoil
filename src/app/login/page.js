"use client"
import React, { useEffect, useState } from 'react';
import { auth, provider } from '@/components/component/fireconf';
import { signInWithPopup, signOut } from "firebase/auth";
import { Button } from '@/components/ui/button';

function Page() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userEmailFromLocalStorage = localStorage.getItem("email");
        if (userEmailFromLocalStorage) {
            const photoURLFromLocalStorage = localStorage.getItem("photoURL");
            setUser({ email: userEmailFromLocalStorage, photoURL: photoURLFromLocalStorage });
        }
    }, []);

    const handleSignIn = () => {
        signInWithPopup(auth, provider).then((result) => {
            const user = result.user;
            const photoURL = user.photoURL;
            setUser({ email: user.email, photoURL });
            localStorage.setItem("email", user.email);
            localStorage.setItem("photoURL", photoURL);
        }).catch((error) => {
            console.error('Sign in error:', error);
        });
    };

    const handleSignOut = () => {
        signOut(auth).then(() => {
            setUser(null);
            localStorage.removeItem("email");
            localStorage.removeItem("photoURL");
        }).catch((error) => {
            console.error('Sign out error:', error);
        });
    };

    return (
        <div>
            {user ? (
                <div>
                    <img src={user.photoURL} alt="User" style={{ width: '100px', borderRadius: '50%' }} />
                    <p>Welcome, {user.email}</p>
                    <Button onClick={handleSignOut}>Logout</Button>
                </div>
            ) : (
                <Button onClick={handleSignIn}>Sign in with Google</Button>
            )}
        </div>
    );
}

export default Page;

