import "./contact.css";
import React from "react";

export default function Page() {
    return (
        <div className="container">
            <div className="left-column">
                <div className="contact-info">
                    <div className="contact-item">
                        <img src="/call.png"/>
                        <a href="tel:+420123456789">+420 123 456 789</a>
                    </div>
                    <div className="contact-item">
                        <img src="/email.png"/>
                        <a className="contact" href="mailto:info@tda.cz">info@tda.cz</a>
                    </div>
                    <div className="contact-item">
                        <img src="/location.png"/>
                        <a>Dukelská 99, Zlín</a>
                    </div>
                </div>
                <p className="additional-text">Neváhejte nás kontaktovat jednou z výše uvedených možností a nebo nás přijďte rovnou navštívít!</p>
            </div>
            <div className="right-column">
                <img src="/contact-example.jpeg" className="rounded-image" />
            </div>
        </div>
    );
}
