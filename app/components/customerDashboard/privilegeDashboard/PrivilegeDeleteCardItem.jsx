"use client";
import { deleteCartProduct } from "@/app/services/getDeleteCartProduct";
import { useSession } from "next-auth/react";
import { useTransition } from "react";
import { MdClose } from "react-icons/md";
import { RotatingLines } from "react-loader-spinner";
import { toast, ToastContainer } from "react-toastify";
const PrivilegeDeleteCardItem = ({
    setRendaringCartPrice,
    rendaringCartPrice,
    cartId,
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
                    setRendaringCartPrice(!rendaringCartPrice);
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
            <ToastContainer />
            <button
                onClick={() => handleDeleteProduct(cartId)}
                className="border-0 add-to-cart-link rounded-2 px-3 py-2 flex items-center justify-center bg-danger"
            >
                {isPending ? (
                    <div
                        className="flex items-center justify-center"
                        style={{ height: "21px", width: "20px" }}
                    >
                        <RotatingLines
                            visible={true}
                            height="18"
                            width="20"
                            color="#ffffff"
                            strokeWidth="5"
                            animationDuration="0.75"
                            ariaLabel="rotating-lines-loading"
                            wrapperStyle={{}}
                            wrapperClass="w-25"
                        />
                    </div>
                ) : (
                    <MdClose />
                )}
            </button>
        </>
    );
};

export default PrivilegeDeleteCardItem;
