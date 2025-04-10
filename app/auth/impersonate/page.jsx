'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from "next-auth/react";

export default function ImpersonatePage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const [error, setError] = useState();

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const result = await signIn("magic", {
                    token: token,
                    redirect: false,
                });

                if (result.error) {
                    setError("Invalid Credentials");
                    return;
                }
                router.refresh();
                router.push("/dashboard");
            } catch (error) {
                console.error('Authentication failed:', error);
                setError(error instanceof Error ? error.message : 'Authentication failed');
                setTimeout(() => router.push('/login'), 3000);
            }
        };

        if (token) {
            verifyToken();
        } else {
            setError('No token provided');
            setTimeout(() => router.push('/login'), 3000);
        }
    }, [token, router]);

    return (
        <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 gap-4">
            {error ? (
                <div className="text-danger text-center">
                    Error: {error}
                    <p className="small">Redirecting to login...</p>
                </div>
            ) : (
                <div className="d-flex flex-column align-items-center justify-content-center">
                    <div className="spinner-border p-3" role="status">
                        <span className="sr-only"></span>
                    </div>
                    <p className="text-center">Authenticating...</p>
                </div>
            )}
        </div>
    );
}