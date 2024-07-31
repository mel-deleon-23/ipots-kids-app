import "./footer.css";
import Review from "../Review/Review";
const footer = () => {
    return (
        <footer className="footer">
            <div className="container-fluid">
                <h2 className="footer-header mt-2 mb-4 ">Subscribe to Our Site</h2>
                <div className="input-container gap-3 mb-5">
                    <input type="text" placeholder="Email" className="input-place form-control rounded-4" />
                    <button className="input-btn rounded-4 mb-2">Subscribe Now</button>
                </div>
                <div className="footer-bottom mt-5">
                    <h3> CONTACT | INSTAGRAM | X | LINKEDIN </h3>
                    <p>© {new Date().getFullYear()} by iPOTS, improving POTS, IPOTS KIDS, iAccess, All Rights Reserved</p>
                </div>
                <Review />
            </div>
        </footer>
    );
};

export default footer;