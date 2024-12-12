"use client";

import { getProfilePicture } from "@/app/services/getProfilePicture";
import { postManageProfilePicture } from "@/app/services/postManageProfilePicture";
import { NagadhatPublicUrl } from "@/app/utils";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ManageTakePhoto = () => {
    const [profilePicture, setProfilePicture] = useState("");
    const [file, setFile] = useState(null);
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === "authenticated") {
            const fetchProfilePicture = async () => {
                try {
                    const profilePictureData = await getProfilePicture(
                        session?.accessToken
                    );
                    const profilePictureResult =
                        profilePictureData?.results?.profile_picture || "";
                    setProfilePicture(profilePictureResult);
                } catch (error) {
                    console.error("Error fetching profile picture:", error);
                }
            };
            fetchProfilePicture();
        }
    }, [session, status, profilePicture]);

    const handleFileChange = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0]);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!file) return;

        try {
            const result = await postManageProfilePicture(
                file,
                session.accessToken
            );

            if (!result?.error) {
                toast.success(result?.message);
                setProfilePicture(result);
            } else {
                toast.error("Failed to update profile picture");
            }
        } catch (error) {
            console.error("Error updating profile picture:", error);
            toast.error(
                "An error occurred while updating your profile picture."
            );
        }
    };

    return (
        <div className="accordion-item rounded border-0 mb-4">
            <h2 className="accordion-header">
                <button
                    className="accordion-button collapsed bg-white rounded customer-dashboard-subtitle"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseFour"
                    aria-expanded="false"
                    aria-controls="flush-collapseFour"
                >
                    Take a photo
                </button>
            </h2>
            <div
                id="flush-collapseFour"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
            >
                <div className="accordion-body border-top">
                    <div className="customer-manage-profile-from-area">
                        <form onSubmit={handleSubmit}>
                            {profilePicture && (
                                <div className="mb-2">
                                    <Image
                                        src={`${NagadhatPublicUrl}/${profilePicture}`}
                                        alt="Profile Picture"
                                        width={80}
                                        height={80}
                                        className="rounded-circle"
                                    />
                                </div>
                            )}
                            <div className="mb-3">
                                <label htmlFor="photo" className="form-label">
                                    Uplod Your Photo
                                    <span className="text-danger fw-bold">
                                        *
                                    </span>
                                </label>
                                <input
                                    className="form-control"
                                    type="file"
                                    accept="image/*"
                                    name="photo"
                                    // capture
                                    id="photo"
                                    onChange={handleFileChange}
                                />
                            </div>
                            <div>
                                <input
                                    className="add-to-cart-link border-0 mx-auto"
                                    type="submit"
                                    value="Update Profile Picture"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageTakePhoto;
