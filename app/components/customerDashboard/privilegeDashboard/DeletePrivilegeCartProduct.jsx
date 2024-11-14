"use client";
import { TfiClose } from "react-icons/tfi";
import { useSession } from "next-auth/react";
import { deleteCartProduct } from "@/app/services/getDeleteCartProduct";
import { toast } from "react-toastify";
import { useTransition } from "react";
import { RotatingLines } from "react-loader-spinner";

const DeletePrivilegeCartProduct = ({
    cartItem,
    rendaringPrice,
    setRendaringPrice,
}) => {
    const [isPending, startTransition] = useTransition();
    const { data: session, status } = useSession();

    const handleDeleteProduct = async (cartID) => {
        if (!cartID) {
            toast.error("Invalid Cart ID");
            return;
        }

        try {
            startTransition(async () => {
                const response = await deleteCartProduct(
                    cartID,
                    session?.accessToken
                );

                if (!response.error) {
                    toast.success(
                        response.message || "Product deleted successfully"
                    );
                    setRendaringPrice(!rendaringPrice);
                } else {
                    toast.error(response.message || "Failed to delete product");
                }
            });
        } catch (error) {
            console.error("Error deleting product:", error);
            toast.error("An unexpected error occurred. Please try again.");
        }
    };
    return (
        <>
            <button
                onClick={() => handleDeleteProduct(cartItem?.cart_id)}
                className="btn btn-danger"
            >
                {isPending ? (
                    <div
                        className="flex items-center justify-center"
                        style={{ height: "21px", width: "20px" }}
                    >
                        <RotatingLines
                            visible={true}
                            height="18"
                            width="15"
                            color="#ffffff"
                            strokeWidth="5"
                            animationDuration="0.75"
                            ariaLabel="rotating-lines-loading"
                            wrapperStyle={{}}
                            wrapperClass="w-25"
                        />
                    </div>
                ) : (
                    <TfiClose />
                )}
            </button>
        </>
    );
};

export default DeletePrivilegeCartProduct;
