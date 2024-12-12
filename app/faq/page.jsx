import React from 'react';
import FAQAccordion from '../components/FAQAccordion';
import banner from "@/public/images/faq.jpg";
import Image from 'next/image';

const FAQ = () => {
    // Separate arrays for each section
    const registrationFAQs = [
        {
            id: "collapseOne",
            question: "How do I register?",
            answer: `You can register by clicking on the \"Sign-up\" link at the top right corner of the homepage. 
              Please provide the information in the form that appears. You can review the terms and conditions, 
              provide your payment mode details and submit the registration information.`,
        },
        {
            id: "collapseTwo",
            question: "Are there any charges for Registration?",
            answer: "No. Registration on NagadHat.com is absolutely free.",
        },
        {
            id: "collapseThree",
            question: "Do I have to necessarily register to shop on Nagadhat?",
            answer: `You can surf and add products to the cart without registration but only registered 
              shoppers will be able to checkout and place orders. Registered members have to be logged 
              in at the time of checking out the cart, they will be prompted to do so if they are not logged in.`,
        },
        {
            id: "collapseFour",
            question: "Can I have multiple accounts with same mobile number and email id?",
            answer: "Each email address and phone number can be associated with one Nagadhat account only.",
        },
    ];

    const customerSupportFAQs = [
        {
            id: "collapseFive",
            question: "What is My Account?",
            answer: `My Account is the section you reach after you sign-in at Nagadhat.com. My Account allows you to track 
                    your active orders, credit note details as well as see your order history and update your contact details.`,
        },
        {
            id: "collapseSix",
            question: "How do I reset my password?",
            answer: `You need to enter your Mobile number on the Sign-in page and click on forgot password. 
                    An OTP will be sent to your Mobile. With this, you can change your password. In case of any further issues please contact our customer support team.`,
        },
        {
            id: "collapseSeven",
            question: "What is My Shopping List?",
            answer: `My Shopping List is a comprehensive list of all the items previously ordered by you on nagadhat.com. 
                    This enables you to shop quickly and easily in future.`,
        },
    ];

    const paymentFAQs = [
        {
            id: "collapseEight",
            question: "What are the modes of payment?",
            answer: `You can pay for your order on nagadhat.com using the following modes of payment:
            <br/><br/>
                    a. We are accepting online payment. <br/>
                    b. Mobile Banking: Bkash | Rocket | Nagad <br/>
                    c. Cash on Delivery <br/>
        <br/>
                    * Delivery charge you have to pay in advance.`,
        },
        {
            id: "collapseNine",
            question: "What is the meaning of cash on delivery?",
            answer: `Cash on delivery means that you can pay for your order at the time of order delivery at your doorstep.`,
        },
        {
            id: "collapseTen",
            question: "If I pay by credit card how do I get the amount back for items not delivered?",
            answer: `If we are not able to deliver all the products in your order and you have already paid for them online, 
                    the balance amount will be refunded to your Cash Balance as store credit, and you can use it at any time against your future orders. 
                    Would you want it to be credited to your bank account please contact our customer support team and we will refund it back onto your card.`,
        },
    ];

    const deliveryFAQs = [
        {
            id: "collapseTwelve",
            question: "When will I receive my order?",
            answer: `Once you are done selecting your products and click on checkout, you will be prompted to select a delivery slot. 
                      Inside Dhaka your order will be delivered to you on the next day, and Outside Dhaka within 3 days.`,
        },
        {
            id: "collapseThirteen",
            question: "How will the delivery be done?",
            answer: `We have a dedicated team of delivery personnel and a fleet of vehicles operating across the city which ensures timely and accurate delivery to our customers.`,
        },
        {
            id: "collapseForteen",
            question: "How much are the delivery charges?",
            answer: `Inside Dhaka city 60 taka and outside Dhaka 150 taka.`,
        },
        {
            id: "collapse15",
            question: "What about quality?",
            answer: `We try our best to source the best quality items for you, but if you are dissatisfied, you can always send them back with the delivery person. 
                      If you forget to do that, you can call us within 24 hours and we will replace the item for free.`,
        },
        {
            id: "collapse16",
            question: "How do I check the current status of my order?",
            answer: `It’s very easy to check order status. Just click on “Order Track” and type your Order number.`,
        },
        {
            id: "collapse17",
            question: "How can I cancel an order?",
            answer: `You can cancel an order by contacting our customer support team.`,
        },
    ];

    const generalFAQs = [
        {
            id: "collapse18",
            question: "How do I contact customer service?",
            answer: `Our customer service team is available throughout the week, all seven days from 9:00 am to 9:00 pm. 
                      They can be reached at +880 9602 444 444 or via email at support@nagadhat.com.bd.`,
        },
        {
            id: "collapse19",
            question: "Do you have offline stores?",
            answer: `No, we are a purely internet-based company.`,
        },
        {
            id: "collapse20",
            question: "How will I get my money back in case of a cancellation or return?",
            answer: `The amount will be refunded to your nagadhat.com account to use as store credit in your forthcoming purchases. 
                      In case of credit card payments, we can also credit the money back to your credit card. 
                      The money will be credited back to your account in 7-10 working days. 
                      Please contact customer support for any further assistance regarding this issue.`,
        },
        {
            id: "collapse21",
            question: "Is there an expiry date to my Account Balance?",
            answer: `No, there is no expiry date on the account balance.`,
        },
    ];

    return (
        <div className='bg-light-subtle pt-1 pt-xl-2'>
            <Image
                src={banner}
                alt="About Us banner"
                style={{ aspectRatio: "9/1", width: '100%', height: "auto" }}
                width={1300}
                height={150}
            />
            <div className='container py-3 py-lg-5'>
                {/* Render each FAQAccordion separately */}
                <FAQAccordion title="Registration" faqData={registrationFAQs} />
                <FAQAccordion title="Account Related" faqData={customerSupportFAQs} />
                <FAQAccordion title="Payments" faqData={paymentFAQs} />
                <FAQAccordion title="Delivery Related" faqData={deliveryFAQs} />
                <FAQAccordion title="Customer Related" faqData={generalFAQs} />
            </div>
        </div>
    );
}

export default FAQ;
