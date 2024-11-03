import { MdClose } from "react-icons/md";
const PrivilegeDeleteCardItem = ({
    setRendaringCartPrice,
    rendaringCartPrice,
}) => {
    return (
        <>
            <button className="border-0 add-to-cart-link rounded-2 flex items-center justify-center bg-danger">
                {/* {isPending ? (
                    <div
                        className="flex items-center justify-center"
                        style={{ height: "21px", width: "30px" }}
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
                    </div> */}
                <MdClose />
            </button>
        </>
    );
};

export default PrivilegeDeleteCardItem;
