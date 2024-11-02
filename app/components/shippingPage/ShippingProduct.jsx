"use client";
import { NagadhatPublicUrl } from '@/app/utils';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';

const ShippingProduct = ({ cartProduct, setTotalPrice, setSubTotal }) => {
    useEffect(() => {
        let regularPrice = 0;
        let totalPrice = 0;

        cartProduct.forEach(item => {
            const price = item.price * item.quantity;
            regularPrice += item.regular_price * item.quantity;
            totalPrice += price;
        });

        // Update parent component state
        setSubTotal(regularPrice);
        setTotalPrice(totalPrice);

    }, [cartProduct, setTotalPrice, setSubTotal]);

    

    return (
        <div className="row new-nh-shipping-product-row">
            {cartProduct?.length > 0 && (
                <div className="col-12">
                    <div className="product-cart-details-continer table-responsive rounded-2">
                        <table className="table align-middle">
                            <tbody>
                                {cartProduct?.map((item, index) => (
                                    <tr key={index}>
                                        <td>
                                            <div className="product-cart-product-img">
                                                <Image
                                                    fill={true}
                                                    className="img-fluid"
                                                    src={`${NagadhatPublicUrl}/${item.product_thumbnail}`}
                                                    alt="black-friday"
                                                />
                                            </div>
                                        </td>
                                        <td>
                                            <div>
                                                <p className="product-cart-text">
                                                    <Link
                                                        href={`/products/${item?.slug}?outlet_id=${item.outlet_id}`}
                                                    >
                                                        {item.product_name}
                                                    </Link>
                                                </p>
                                                <div className="cart-prodect-variants">
                                                    {item?.selectedVariants &&
                                                        item.selectedVariants.slice(0, 2).map((variant, inx) => {
                                                            const [key, value] = Object.entries(variant)[0];
                                                            const keyDisplay = key.split("_")[1];

                                                            return (
                                                                <React.Fragment key={inx}>
                                                                    <p>
                                                                        <span> {keyDisplay}  </span>:{" "}
                                                                        <span className="cart-prodect-variants-item">
                                                                            <label>{" "} {value} </label>
                                                                        </span>
                                                                    </p>
                                                                </React.Fragment>
                                                            );
                                                        })}
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <p className="text-capitalize new-nh-product-qty">
                                                qty: {item.quantity}
                                            </p>
                                        </td>
                                        <td>
                                            <div className="d-flex gap-2 new-nh-product-price">
                                                <p>৳ {item.price * item.quantity} </p>
                                                {(item.price != item.regular_price) && (
                                                    <del className="rounded-1">৳ {item.regular_price * item.quantity} </del>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShippingProduct;
