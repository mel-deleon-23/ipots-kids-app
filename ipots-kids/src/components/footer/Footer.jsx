import "./footer.css";

const footer = () => {
    return (
        <footer className="footer">
            <div className="container-fluid">
                <h2 className="footer-header mt-2 mb-4 ">Subscribe to Our Site</h2>
                <div className="input-box-container gap-1 mb-5">
                    <input type="text" placeholder="Email" className="input-place form-control rounded-4" />
                    <button className="input-btn rounded-4 mb-2">Subscribe Now</button>
                </div>
                <div className="footer-bottom mt-5">
                    <h3> CONTACT | INSTAGRAM | X | LINKEDIN </h3>
                    <p>© {new Date().getFullYear()} by iPOTS, improving POTS, IPOTS KIDS, iAccess, All Rights Reserved</p>
                </div>   
            </div>
        </footer>
    );
};

export default footer;