
import React from 'react';

const ReviewItem = ({reviewDetail}) => {
    const {name, address, description, img} = reviewDetail;
    
    return (
        <div className="item">
            <div className="shadow-effect">
                <img src={img} alt="" srcSet="" className="img-circle"/>
                <p>{description}</p>
            </div>
            <div className="testimonial-name">
                <h5>{name}</h5>
                <small>{address}</small>
            </div>
        </div>
    );
};

export default ReviewItem;
