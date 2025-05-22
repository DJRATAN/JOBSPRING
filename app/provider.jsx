'use client'
import { UserDetailContext } from '@/context/UserDetailContext';
import { supabase } from '@/services/superbaseClient';

import React, { useContext, useEffect, useState } from 'react'

const Provider = ({ children }) => {
    const [user, setUser] = useState();
    useEffect(() => {
        CreateNewUser();
    }, [])
    const CreateNewUser = async () => {
        const {
            data: { user },
            error: userError
        } = await supabase.auth.getUser();

        if (userError) {
            console.error("Error fetching user:", userError.message);
            return;
        }

        if (!user) return;

        // Check if user already exists
        let { data: Users, error } = await supabase
            .from('Users')
            .select("*")
            .eq('email', user.email);

        if (error) {
            console.error("Error checking existing user:", error.message);
            return;
        }

        if (!Users || Users.length === 0) {
            const { error: insertError } = await supabase
                .from("Users")
                .insert([{
                    name: user.user_metadata?.name,
                    email: user.email,
                    picture: user.user_metadata?.picture,
                }]);

            if (insertError) {
                console.error("Insert error:", insertError.message);
                return;
            }

            // Re-fetch the newly inserted user
            const { data: newUsers, error: newUserError } = await supabase
                .from("Users")
                .select("*")
                .eq("email", user.email);

            if (newUserError) {
                console.error("Error fetching new user:", newUserError.message);
                return;
            }

            setUser(newUsers[0]);
            console.log("User created and fetched:", newUsers[0]);
        } else {
            setUser(Users[0]);
            console.log("Existing user:", Users[0]);
        }
    };

    return (
        <UserDetailContext.Provider value={{ user, setUser }}>
            <div>
                {children}
            </div>
        </UserDetailContext.Provider>
    )
}

export default Provider;

export const useUser = () => {
    const context = useContext(UserDetailContext)
    return context;
}
