import * as React from 'react';

import "./Testimonial.css";
import Carousel from 'react-bootstrap/Carousel';

const Testimonial = () => {

    const testimonials = [
        {
            name: 'Shirvir,Student',
            description: 'The card game was awesome! I love iPOTS KIDS!! I learned so much about different disabilities and cannot wait to meet more of the cute animals',
            img: 'images/testimonial/Riya.png'
        },
        {
            name: 'Melanie,Parent',
            description: 'I loved watching my kids play with the iPOTS KIDS games and all the conversation it inspired after they finished playing. It helped them understand that grandma uses the ostomy bag and helped them understand how to better interact with her. Fantastic games!',
            img: 'images/testimonial/Renee.png'
        },
        {
            name: 'Alan,High School Teacher',
            description: 'I love the iPOTS KIDS card game. Fun, informative, and encouraging for people needing to understand important ideas about themselves, and is delivered in an easy-to-read and welcoming manner',
            img: 'images/testimonial/Navpreet.png'
        },
        {
            name: 'Sassan,Uncle',
            description: 'iPOTS KIDS games are a great way to teach my niece and nephew about different medical devices and it helps them connect kindness with doing things in a different way. Kids are going to play, it is better when they play with purpose!',
            img: 'images/testimonial/Sassan.png'
        }
    ];

    return (
        <Carousel controls={false} className='border rounded testimonial mx-auto'>
            {testimonials.map((item,index) =>
            <Carousel.Item id={`reviewitem${index}`}>
                <div className='d-flex mx-auto align-items-center p-3 fs-5'>
                    <img src={`${item.img}`} className='testimonial-thumbnail' />
                    <div className='d-flex flex-column'>
                       <strong className='mb-3'>{item.name}</strong>
                       <span className='text-start'>{item.description}</span>
                    </div>
                </div>
            </Carousel.Item>
            )}
        </Carousel>
    );
};


export default Testimonial;