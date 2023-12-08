import React, { useState } from 'react';
import style from './Checkout.module.css';
import { useNavigate } from 'react-router-dom';
import NavbarPayment from './navbarPayment';
import Footer from '../HomePageFooter/Footer';

const CheckoutCardDetails = () => {
  const [flag, setFlag] = useState(false);
  const [flag1, setFlag1] = useState(false);
  const [flag2, setFlag2] = useState(false);
  const navigate = useNavigate();

  const handleCardNumber = (e) => {
    let value = e.target.value;
    if (value.length >= 12) {
      setFlag(true);
    } else {
      setFlag(false);
    }
  };

  const handleCardHolderName = (e) => {
    let value = e.target.value;
    if (value.length > 5) {
      setFlag1(true);
    } else {
      setFlag1(false);
    }
  };

  const handleExpiryDate = (e) => {
    let value = e.target.value;
    if (value.length === 3) {
      setFlag2(true);
    } else {
      setFlag2(false);
    }
  };

  const handlePaymentButtonClick = () => {
    if (flag && flag1 && flag2) {
      navigate('/CaptureOtp');
    } else {
      alert('Please fill in the required fields to proceed');
    }
  };

  return (
    <>
      <div className={style.maincard}>
        <NavbarPayment />
        <div className={style.CheckoutMain}>
          <div className={style.Checkoutmain1}>
            <h1 className={style.Checkouth11}>
              <b>Choose payment method</b>
            </h1>

            <div className={style.paymentcardmain}>
              <div className={style.firesrcardpay}>
                <h1 className={style.firesrcardpay1}>
                  Credit Card/Debit Card
                </h1>
              </div>

              <div className={style.paymentCard22}>
                <label>
                  Card Number <br />
                  <input
                    type="text"
                    onChange={handleCardNumber}
                    autoComplete="off"
                    maxLength="12"
                    required
                  />
                </label>
                {flag ? null : (
                  <div className={style.error}>
                    Please enter a valid card number
                  </div>
                )}
                <br />
                <br />

                <label>
                  Card holder name <br />
                  <input
                    type="text"
                    onChange={handleCardHolderName}
                    required
                  />
                </label>
                {flag1 ? null : (
                  <div className={style.error}>
                    Please enter a valid Card Holder Name
                  </div>
                )}
                <br />
                <br />

                <label>
                  Expiry date <br />
                  <select value="select" name="Month" onChange={handleExpiryDate}>
                    {/* Options for Month */}
                  </select>

                  <select name="Year">
                    {/* Options for Year */}
                  </select>
                </label>
                <br />
                <br />

                <label>
                  CVV <br />
                  <div className={style.cvv}>
                    <input
                      type="text"
                      autoComplete="off"
                      maxLength="3"
                      onChange={handleExpiryDate}
                      required
                    />{' '}
                    <div className={style.cardpayimgdiv}>
                      <img
                        src="https://static.naukimg.com/s/7/123/i/cvv.30afa5f9.png"
                        alt="CVV Information"
                      />
                    </div>
                    <p>3 digits printed on the back of the card</p>
                  </div>
                </label>
                {flag2 ? null : (
                  <div className={style.error}>
                    Please enter a valid CVV
                  </div>
                )}
                <br />
                <br />

                <div className={style.paymentcheckbox}>
                  <input type="checkbox" />
                  <p>
                    I agree to Terms and Conditions, Privacy Statement. Meri
                    Job will automatically continue your subscription and
                    charge the monthly membership fee to your payment method
                    until you cancel. You may cancel your subscription at any
                    time.
                  </p>
                </div>

                <button
                  onClick={handlePaymentButtonClick}
                  className={style.checkbtn33}
                >
                  MAKE PAYMENT
                </button>
                <br />
                <div className={style.cardpaymentbtn}>
                  Don't Have Card?
                </div>
              </div>
            </div>
          </div>

          <div className={style.Checkoutmain2}>
            <h1>Price Details</h1>

            <div className={style.Checkoutmain3}>
              <div>Total</div>
              <div>₹ 1,495</div>
            </div>
            <div className={style.Checkoutmain5}>
              <div className={style.Checkoutmain6}>
                Discount (20% OFF) <span><i className="fa-solid fa-circle-info"></i></span>
              </div>
              <div> -₹ 298</div>
            </div>
            <div className={style.Checkoutmain3}>
              <div>Estimated GST</div>
              <div>₹ 215</div>
            </div>

            <div className={style.br}></div>

            <div className={style.Checkoutmain4}>
              <div>Total Payable Amount</div>
              <div>₹ 1,412</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CheckoutCardDetails;
