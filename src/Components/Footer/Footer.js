import React from 'react'
import './Footer.css'


const Footer = () => {
    return (
        <div className='footer_wrapper'>
            <div className="footer_description">
                <h1 className='footer_title'>Qestate Homes</h1>
                <p className="description_para">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti facilis dolores rerum, quibusdam ab earum voluptatibus libero expedita assumenda, esse, illo dicta asperiores! Suscipit optio, maxime architecto labore eligendi omnis?
                </p>
            </div>
            <div className="footer_contact">
                <h1 className='footer_title'>Contact</h1>
                <ul className="footer_list">
                    <li>Bengaluru, India</li>
                    <li>qestate@gmail.com</li>
                    <li>+91 8855885588</li>
                    <li>0212897349823</li>
                </ul>
            </div>
        </div>
    )
}

export default Footer;