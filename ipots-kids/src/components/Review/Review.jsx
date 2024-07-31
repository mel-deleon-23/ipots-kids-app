// @flow strict

import * as React from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import "./Review.css";
import ReviewItem from "./ReviewItem";
const Review = () => {
  
    const reviewItems = [
        {
            name: 'Shirvir,Student',
            description: 'The card game was awesome! I love iPOTS KIDS!! I learned so much about different disabilities and cannot wait to meet more of the cute animals',
            
            img: 'https://i.etsystatic.com/13434992/r/il/4c6029/3219261003/il_794xN.3219261003_f9hg.jpg'
        },
        {
            name: 'Melanie,Parent',
            description: 'I loved watching my kids play with the iPOTS KIDS games and all the conversation it inspired after they finished playing. It helped them understand that grandma uses the ostomy bag and helped them understand how to better interact with her. Fantastic games!',
            
            img: 'https://i.etsystatic.com/13434992/r/il/4c6029/3219261003/il_794xN.3219261003_f9hg.jpg'
        },
        {
            name: 'Alan,High School Teacher',
            description: 'I love the iPOTS KIDS card game. Fun, informative, and encouraging for people needing to understand important ideas about themselves, and is delivered in an easy-to-read and welcoming manner',
           
            img: 'https://i.etsystatic.com/13434992/r/il/4c6029/3219261003/il_794xN.3219261003_f9hg.jpg'
        },
        {
            name: 'Sassan,Uncle',
            description: 'iPOTS KIDS games are a great way to teach my niece and nephew about different medical devices and it helps them connect kindness with doing things in a different way. Kids are going to play, it is better when they play with purpose!',
            
            img: 'https://i.etsystatic.com/13434992/r/il/4c6029/3219261003/il_794xN.3219261003_f9hg.jpg'
        },
    ]
    //Owl Carousel Settings
    const options = {
        loop: true,
        center: true,
        items: 3,
        margin: 0,
        autoplay: true,
        dots: true,
        autoplayTimeout: 8500,
        smartSpeed: 450,
        nav: false,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 3
            },
            1000: {
                items: 3
            }
        }
    };
return(
    <section id="testimonial" className="testimonials pt-70 pb-70">
       <div className="container mt-5">
           <h4 className="miniTitle text-center">TESTIMONIALS</h4>
           <div className="text-center ">
                    <h3 className="sectionTitle">What Our Quiz Takers are Saying?</h3>
                </div>
                <p className="text-center ">See what our quiz takers feel after taking our quiz.</p>
                <div className="row">
                    <div className="col-md-12">
                        <OwlCarousel id="customer-testimonoals" className="owl-carousel owl-theme" {...options}>
                            {
                               
                                    reviewItems.map(reviewDetail => {
                                        return (
                                            <ReviewItem reviewDetail={reviewDetail} key={reviewDetail.name} />
                                            )
                                        })
                                }
                            </OwlCarousel>
                        </div>
                    </div>



      </div>
      </section>
        );
    };


export default Review;