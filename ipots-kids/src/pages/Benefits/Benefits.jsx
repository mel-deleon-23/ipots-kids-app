import "./Benefits.css";
import img1 from "../../assets/Education & Awareness.png";
import img2 from "../../assets/Community Building 1.png";
import img3 from "../../assets/Emotional Intelligence 1.png"

const Benefits = () => {
    return (
        <section className='hero'>
            <h1 className='benefit-header'>Benefits</h1>
            <div className="container mt-lg-5">
                <div className="card flex-row g-lg-5">
                    <div className="card-img-left d-flex gap-lg-3">
                        <img src={img1} className="img-fluid" alt="Card image" />
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">Disability Awareness</h5>
                        <h6 className="card-text mb-lg-4">Exploring Health Conditions</h6>
                        <p className="card-text">Engage with interactive content to learn about various disabilities and health conditions to improve disability awareness.</p>
                    </div>
                </div>
            </div>

            <div className="container mt-lg-5">
                <div className="card flex-row g-lg-5">
                    <div className="card-img-left d-flex gap-lg-3">
                        <img src={img2} className="img-fluid" alt="Card image" />
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">Community Building</h5>
                        <h6 className="card-text mb-lg-4">Understanding Accomodations</h6>
                        <p className="card-text">Discover the importance of inclusive communities and how accommodations support individuals with different needs.</p>
                    </div>
                </div>
            </div>

            <div className="container mt-lg-5">
                <div className="card flex-row g-lg-5">
                    <div className="card-img-left d-flex gap-lg-3">
                        <img src={img3} className="img-fluid" alt="Card image" />
                    </div>
                    <div className="card-body">
                        <h5 className="card-title text-wrap">Emotional Intelligence</h5>
                        <h6 className="card-text mb-lg-4">Develop Emotional Intelligence</h6>
                        <p className="card-text">Emotional wisdom allows us to listen and be more sensitive to others and control emotional reactions and allow for the freedom to change conflicting viewpoints of those who are different..</p>
                    </div>
                </div>
            </div>

            <h1 className='benefit-header'>Testimonials</h1>
        </section>  
    );
};

export default Benefits;