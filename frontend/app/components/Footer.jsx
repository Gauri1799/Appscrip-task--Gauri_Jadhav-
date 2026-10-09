"use client"


import { useState } from "react"
import "./footer.css"
import { FaInstagram, FaLinkedin } from "react-icons/fa"

export default function Footer() {

    const [open, setOpen] = useState(null)

    const toggle = (section) => {
        setOpen(open === section ? null : section)
    }

    return (
        <footer className="footer">
            <div className="footerTop">

                <div>
                    <h3>BE THE FIRST TO KNOW</h3>
                    <p className="pf-text">Sign up for updates from mettā muse.</p>

                    <div className="subscribeBox">
                        <input placeholder="Enter your e-mail..." />
                        <button>SUBSCRIBE</button>
                    </div>
                </div>

                <div className="contact">
                    <h4>CONTACT US</h4>
                    <p className="cp-text">+44 221 133 5360</p>
                    <p className="cp-text">customercare@mettamuse.com</p>

                    <h4 className="currenncy">CURRENCY</h4>
                    <p className="cu-text">🇺🇸 USD</p>
                    <p className="t-text">Transaction will be completed in Euros and a currenncy refrence is available on hover</p>
                </div>

            </div>

            <div className="footerBottom">
                <div
                    className={`footerCol ${open === "metta" ? "active" : ""}`}
                    onClick={() => toggle("metta")}>
                    <div className="footerHeader">mettā muse</div>

                    <ul className="footerList">
                        <li>About Us</li>
                        <li>Stories</li>
                        <li>Artisans</li>
                        <li>Boutiques</li>
                        <li>Contact Us</li>
                        <li>EU Compliances Docs</li>

                    </ul>
                </div>
                <div
                    className={`footerCol ${open === "links" ? "active" : ""}`}
                    onClick={() => toggle("links")} >
                    <div className="footerHeader">QUICK LINKS</div>

                    <ul className="footerList">
                        <li>Orders & Shipping</li>
                        <li>Join/Login as a Seller</li>
                        <li>Payment & Pricing</li>
                        <li>Return & Refund</li>
                        <li>FAQs</li>
                        <li>Privacy Policy</li>
                        <li>Terms & Conditions</li>
                    </ul>
                </div>
                <div
                    className={`footerCol ${open === "follow" ? "active" : ""}`}
                    onClick={() => toggle("follow")}>
                    <div className="footerHeader">FOLLOW US</div>

                    <div className="footerList socialIcons">
                        <FaInstagram />
                        <FaLinkedin />
                    </div>
                    <div className="payments">
                        <p>mettā muse ACCEPTS</p>

                        <div className="paymentIcons">
                            <img src="/images/gpay.png" />
                            <img src="/images/apple.png" />
                            <img src="/images/paypal.png" />
                            
                        </div>
                    </div>
                </div>

            </div>
            <p className="copyright">
                Copyright © 2023 mettamuse. All rights reserved.  
            </p>

        </footer>
    )
}