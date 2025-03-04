
import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import bg from './bg-form2.jpg';
import { Select } from 'antd'; 
import img from './appreciation-logo.jpg';
import Swal from 'sweetalert2';

const { Option } = Select

const AppreciationForm = () => {

    const [show, setShow] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState(' ');
    const [message, setMessage] = useState('');
    const [hashtags, setHashtags] = useState([]);
    const [recipientName, setRecipientName] = useState('');
  
    const [error, setError] = useState(" ");

    const validEmail = (e) => {
        const pattern = /^[^ ]+@enfuse-solutions+\.[a-z]{2,3}$/;
        const emailValue = e.target.value.trim(); // Trim to remove any unwanted spaces
        setEmail(emailValue);
    
        if (emailValue.match(pattern)) {
            setError("");
            console.log("Valid email address");
            document.querySelector('#submitForm').disabled = false;
        } else {
            setError("Please enter a valid email address");
            console.log("Invalid email address");
            document.querySelector('#submitForm').disabled = true;
        }
    };
    

    const isValid = message && email;
    

    const validateMessage = (e) => {
        console.log(e.target.value);
        if ((e.target.value.length > 2000)) {
            console.log("message stored");
            setError("please enter enfuse email address")
        } else {
            setMessage(e.target.value);
            setError(" ");
        };
    }

const handleSelectChange = (value) => {
     setHashtags(value);
}

    const sendEmail = async (e) => {
        e.preventDefault();
        const res = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, name, recipientName, message, hashtags
            })
        });

        const data = await res.json();
        console.log(data);
        if (data.status === 401 || !data) {
            console.log("error")
        } else {
            setShow(true);
            setEmail("");
            Swal.fire({
                icon: 'success',
                title: 'Thank you!',
                text: 'Your mail has been sent successfully!',
                showConfirmButton: true,
                confirmButtonColor: '#00B4D2'
            });
        }
    }
    return (
        <>
          
            <div className="background-container">

                <div className='logo-area'>
                {/* <img src={img} alt='Thank-you-week' /> */}
                </div>
                <div className="form" style={{marginBottom: '100px', padding:'0px 100px'}}>
                    <Form className='form-container' autoComplete='off' >
                  
                        <Form.Group controlId="formBasicEmail" >
                            <div className="form-div">
                                <Form.Label>From Name</Form.Label>
                                <Form.Control type="text" name='Name' className="field" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your Name" />
                            </div>
                            <div className="form-div">
                                <Form.Label>Recipient Name</Form.Label>
                                <Form.Control type="text" className="field" name='RecipientName' value={recipientName} onChange={(e) => setRecipientName(e.target.value)} placeholder= "Enter Receipient Name"/>
                            </div>
                            <div className="form-div">
                                <Form.Label>Recipient Email</Form.Label>
                                <Form.Control type="email" className="field" name='email'  onPaste={(e) => validEmail(e)} value={email} onChange={validEmail} placeholder="@enfuse-solutions.com" required={true} />
                                <p className='errorText'>{error}</p>
                            </div>
                            <div className="form-div"> 
                            <Form.Label>Hashtags<span style={{color:'#00B4D2',fontSize: '14px',fontStyle: 'italic', color: 'inherit', paddingLeft: '10px'}}>(*Mention the most relevant hashtag for the recipient)</span></Form.Label> <br/>
                            <Select mode="tags" className="tag-field" placeholder="Add most relevant hashtag for the recipient" value={hashtags} onChange={handleSelectChange} required > {hashtags.map((hashtag, index) => ( <Option key={index} value={hashtag}> {hashtag} </Option> ))} </Select> 
                            </div>
                            <div className="form-div-full">
                                <Form.Label>Add Your Message</Form.Label>
                                <textarea className="form-control field" rows="4" value={message}
                                    onChange={validateMessage} placeholder="Add Your Message upto 2000" />
                               
                            </div>
                            
                        </Form.Group>
                        <div className="button-div">
                            <button className='btn' type="submit" id='submitForm' disabled = {!isValid} onClick={sendEmail}>
                                Submit
                            </button>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default AppreciationForm;