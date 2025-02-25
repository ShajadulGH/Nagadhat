const RebateClaimedDropdown = () => {
    return (
        <ul className="dropdown-menu">
            <li>
                <button
                    data-bs-toggle="modal"
                    data-bs-target="#rebate-listed-choose-modal"
                    className="dropdown-item text-capitalize"
                >
                    Choose Listed Products
                </button>
            </li>
            <li>
                <button
                    className="dropdown-item  text-capitalize"
                    data-bs-toggle="modal"
                    data-bs-target="#rebate-own-choose-modal"
                >
                    Choose Own Choice Shopping
                </button>
            </li>
        </ul>
    );
};

export default RebateClaimedDropdown;
