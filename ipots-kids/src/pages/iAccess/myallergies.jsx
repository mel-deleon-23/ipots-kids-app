import React, { useContext , useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from "../Auth";
import '../../styles/iAccess/myallergies.css'; 
import allergiesImg from "../../../public/iAccess/06-allergy.png";
import downImg from "../../../public/iAccess/arrowDown.png";
import upImg from "../../../public/iAccess/arrowUp.png";

const MyAllergies = () => {
  const host = "http://localhost";
  const [userId , setUserId] = useState("1");
  const { user } = useContext(AuthContext);
  const [openCategory, setOpenCategory] = useState(null);
  const [allergies, setAllergies] = useState([]);
  const [otherAllergies, setOtherAllergies] = useState({
    otherFoodAllergies: [],
    otherEnvironmentalAllergies: [],
    otherMedicationAllergies: [],
  });
//  set user id if user is signed in else navigate to signin
  useEffect(() => {
    if (user) {
      setUserId(user.data.user_id);
    }
    else {
      navigate('/home');
    }
  }, [user]);

  useEffect(() => {
    const fetchAllergies = async () => {
      try {
        // Fetch allergies (method=allallergies)
        const url = host + "/ipots-kids-app/ipots-server/myallergies.php" ;
        const allergiesResponse = await axios.get(url, {
          params: {
            method: 'allallergies',
            iaccess_id: userId ,
          },
        });
        setAllergies(allergiesResponse.data);

        // Fetch other allergies (method=otherallergies)
        
        const otherAllergiesResponse = await axios.get(url, {
          params: {
            method: 'otherallergies',
            iaccess_id: userId, 
          },
        });
       
        // setOtherAllergies(otherAllergiesResponse.data);
        // setOtherAllergies(otherAllergiesResponse.data[0]);
        setOtherAllergies({
          otherFoodAllergies:otherAllergiesResponse.data[0].other_food_allergies || '',
          otherEnvironmentalAllergies: otherAllergiesResponse.data[0].other_environmental_allergies || '',
          otherMedicationAllergies: otherAllergiesResponse.data[0].other_medication_allergies || '',
        });
        console.log( otherAllergies);

      } catch (error) {
        console.error('Error fetching allergies:', error);
      }
    };

    fetchAllergies();
  }, []);

  const toggleCategory = (category) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  return (
    <div className="allergies-page">
      <div className="allergies-page-header">
        <img src={allergiesImg} alt="Allergies Icon" className="allergies-icon" />
        <h1 className='allergies-heading'>My Allergies</h1>
      </div>
      <div className="item-list">
        <div className={`allergies-category ${openCategory === 'food' ? 'expanded' : ''}`} onClick={() => toggleCategory('food')}>
          <div className="allergies-category-header">
            Food Allergies
            <img src={openCategory === 'food' ? upImg : downImg} alt="" />
          </div>
          {openCategory === 'food' && (
            <div className="allergies-category-content">
              {allergies.filter(allergy => allergy.type === 'food').map(allergy => (
                <div key={allergy.id} className="allergy-item">{allergy.title}</div>
              ))}
              {otherAllergies.otherFoodAllergies.split(',').map((allergy, index) => (
                <div key={`other-food-${index}`} className="allergy-item">{allergy}</div>
              ))}
            </div>
          )}
        </div>
        <div className={`allergies-category ${openCategory === 'environmental' ? 'expanded' : ''}`} onClick={() => toggleCategory('environmental')}>
          <div className="allergies-category-header">
            Environmental Allergies
            <img src={openCategory === 'environmental' ? upImg : downImg} alt="" />
          </div>
          {openCategory === 'environmental' && (
            <div className="allergies-category-content">
              {allergies.filter(allergy => allergy.type === 'environmental').map(allergy => (
                <div key={allergy.id} className="allergy-item">{allergy.title}</div>
              ))}
              {otherAllergies.otherEnvironmentalAllergies.split(',').map((allergy, index) => (
                <div key={`other-environmental-${index}`} className="allergy-item">{allergy}</div>
              ))}
            </div>
          )}
        </div>
        <div className={`allergies-category ${openCategory === 'medication' ? 'expanded' : ''}`} onClick={() => toggleCategory('medication')}>
          <div className="allergies-category-header">
            Medication Allergies
            <img src={openCategory === 'medication' ? upImg : downImg} alt="" />
          </div>
          {openCategory === 'medication' && (
            <div className="allergies-category-content">
              {allergies.filter(allergy => allergy.type === 'medication').map(allergy => (
                <div key={allergy.id} className="allergy-item">{allergy.title}</div>
              ))}
              {otherAllergies.otherMedicationAllergies.split(',').map((allergy, index) => (
                <div key={`other-medication-${index}`} className="allergy-item">{allergy}</div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyAllergies;
