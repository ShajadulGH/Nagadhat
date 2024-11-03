"use client";
import { NagadhatPublicUrl } from '@/app/utils';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';

const ResaleShippingProduct = ({ cartProduct }) => {

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
                                                    src={`${NagadhatPublicUrl}/${item.thumbnail}`}
                                                    alt={item.product_name}
                                                />
                                            </div>
                                        </td>
                                        <td>
                                            <div>
                                                <p className="product-cart-text">
                                                    <Link
                                                        href={`/resale-product-details/${item.product_id}`}
                                                    >
                                                        {item.product_name}
                                                    </Link>
                                                </p>
                                                <div className="cart-prodect-variants">
                                                    {/* Variants like size, color, etc. can be added here if available */}
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <p className="text-capitalize new-nh-product-qty">
                                                qty: {parseInt(item.product_quantity)}
                                            </p>
                                        </td>
                                        <td>
                                            <div className="d-flex gap-2 new-nh-product-price">
                                                <p>৳ {item.product_unit_price * item.product_quantity}</p>
                                                <del className="rounded-1">৳ {item.product_regular_price * item.product_quantity}</del>
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

export default ResaleShippingProduct;
