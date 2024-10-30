'use client'

import { useEffect } from 'react'

export default function Error({ error, reset }) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="container py-5">
            <div className="row">
                <div className="col-md-12">
                    <h2>Something went wrong!</h2>
                    <button
                        onClick={
                            () => reset()
                        }
                    >
                        Try again
                    </button>
                </div>
            </div>
        </div>
    )
}