"use client";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { FaSignOutAlt } from "react-icons/fa";

const SignoutBtn = () => {
    return (
        <span
            className="text-capitalize d-flex align-items-center"
            onClick={(e) => {
                e.preventDefault();
                signOut({ callbackUrl: "/" });
            }}
            style={{ padding: "10px 28px" }}
        >
            <FaSignOutAlt className="nav-icon me-2" />
            Logout
        </span>
    );
};

export default SignoutBtn;
