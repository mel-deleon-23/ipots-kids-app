import { useEffect, useState } from "react";

const About = () => {
  const [message, setMessage] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost/ipots-kids-webApp/ipots-server/about.php");

        const data = await response.json();
        setMessage(data.message);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
};
export default About;