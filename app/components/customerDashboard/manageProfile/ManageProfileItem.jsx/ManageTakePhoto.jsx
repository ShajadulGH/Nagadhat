"use client";

import { getProfilePicture } from "@/app/services/getProfilePicture";
import { getSyncProfilePicture } from "@/app/services/getSyncProfilePicture";
import { postManageProfilePicture } from "@/app/services/postManageProfilePicture";
import { setProfilePicture } from "@/app/store/slices/profileSlice";
import { NagadhatPublicUrl } from "@/app/utils";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState, useTransition } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const ManageTakePhoto = () => {
    const [isPending, startTransition] = useTransition();
    const [profilePic, setProfilePic] = useState("");
    const [file, setFile] = useState(null);
    const { data: session, status } = useSession();
    const dispatch = useDispatch();

    useEffect(() => {
        if (status === "authenticated") {
            const fetchProfilePicture = async () => {
                try {
                    const profilePictureData = await getProfilePicture(
                        session?.accessToken
                    );
                    const profilePictureResult =
                        profilePictureData?.results?.profile_picture || "";
                    setProfilePic(profilePictureResult);
                    dispatch(setProfilePicture(profilePictureResult));
                } catch (error) {
                    console.error("Error fetching profile picture:", error);
                }
            };
            fetchProfilePicture();
        }
    }, [session?.accessToken, profilePic]);

    const handleFileChange = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0]);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!file) {
            toast.error("Please select a file.");
            return;
        }
        try {
            startTransition(async () => {
                const result = await postManageProfilePicture(
                    file,
                    session.accessToken
                );

                if (!result?.error) {
                    toast.success(result?.message);
                    setProfilePic(result);
                    dispatch(setProfilePicture(result?.results));
                } else {
                    toast.error("Failed to update profile picture");
                }
            });
        } catch (error) {
            console.error("Error updating profile picture:", error);
            toast.error(
                "An error occurred while updating your profile picture."
            );
        }
    };

    // const handleDataSync = async () => {
    //     try {
    //         startTransition(async () => {
    //             const profilePictureData = await getSyncProfilePicture(
    //                 session?.accessToken, session?.phone
    //             );
    //             if (profilePictureData?.error) {
    //                 toast.error(profilePictureData?.message);
    //                 return;
    //             }
    //             const profilePictureResult = profilePictureData?.results?.profile_picture;
    //             setProfilePic(profilePictureResult);
    //             toast.success("Profile picture synced successfully.");
    //         });
    //     } catch (error) {
    //         console.error("Error syncing profile picture:", error);
    //         toast.error("An error occurred while syncing your profile picture.");
    //     }
    // }

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
                        {/* {(session?.phone && String(session?.phone).length > 11) && (
                            <div className="ms-auto">
                                <button className="add-to-cart-link border-0 ms-auto" onClick={handleDataSync}>
                                    sync
                                </button>
                            </div>
                        )} */}
                        <form onSubmit={handleSubmit}>
                            {profilePic || file ? (
                                <div className="mb-2">
                                    <Image
                                        src={file ? URL.createObjectURL(file) : `${NagadhatPublicUrl}/${profilePic}`}
                                        alt="Profile Picture"
                                        width={80}
                                        height={80}
                                        className="rounded-circle"
                                    />
                                </div>
                            ) : null}

                            <div className="mb-3">
                                <label className="form-label fw-bold mb-2">
                                    Upload Your Photo <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="file"
                                    className="form-control mb-3 d-none d-md-block"
                                    accept="image/*"
                                    name="photo"
                                    id="photo"
                                    onChange={handleFileChange}
                                />
                                <div className="d-flex gap-2 justify-content-center d-md-none w-auto" >
                                    <label htmlFor="photo" className="btn px-4 w-auto btn-primary">
                                        📁 Choose File
                                        <input
                                            type="file"
                                            accept="image/*"
                                            name="photo"
                                            id="photo"
                                            onChange={handleFileChange}
                                            className="d-none"
                                        />
                                    </label>
                                    <label htmlFor="takePhoto" className="btn btn-success px-4 w-auto">
                                        📷 Take Photo
                                        <input
                                            type="file"
                                            accept="image/*"
                                            capture="camera"
                                            id="takePhoto"
                                            onChange={handleFileChange}
                                            className="d-none"
                                        />
                                    </label>
                                </div>
                            </div>
                            <div>
                                <button
                                    className="add-to-cart-link border-0 mx-auto"
                                    type="submit"
                                    disabled={isPending}
                                    style={{
                                        cursor: isPending ? "not-allowed" : "pointer",
                                        opacity: isPending ? "0.6" : "1",
                                    }}
                                >
                                    {isPending ? (
                                        <div style={{ display: "inline-flex", alignItems: "center" }}>
                                            <RotatingLines
                                                visible={true}
                                                height="18"
                                                width="20"
                                                color="#ffffff"
                                                strokeWidth="5"
                                                animationDuration="0.75"
                                                ariaLabel="rotating-lines-loading"
                                            />
                                            <span className="ms-2">Updating...</span>
                                        </div>
                                    ) : (
                                        "Update Profile Picture"
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageTakePhoto;
