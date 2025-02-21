import { useEffect, useState } from 'react';

import img from "../../assets/images/profile/profile.png";

import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';

const PersonalAccessibility = () => {
  const [isLoading, setIsLoading] = useState(false)

  const loadNotification = () => {
    setIsLoading(!isLoading)
  }

  // State to store the profile picture URL
  const [profilePic, setProfilePic] = useState("");

  // Load image from localStorage on component mount
  useEffect(() => {
    const storedImage = localStorage.getItem("backgroundImage");
    if (storedImage) {
      setProfilePic(storedImage);
    }
  }, []);

  // Handle file input change
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target.result;
        setProfilePic(imageUrl);

        // Save the image data URL to localStorage
        localStorage.setItem("backgroundImage", imageUrl);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
      <div className="personal-accessibility">
          <div className="notification" onClick={loadNotification}>
            <NotificationsNoneIcon/>
            <span className="badge"></span>
          </div>

          <div className="profile-image">
            <img
              src={profilePic || img}
              alt="profile picture"
              id="profile-picture"
            />
            <div className="profile-overlay" title="New pic?">
              <label htmlFor="input-file">+</label>
              <input
                type="file"
                accept="image/jpeg, image/png, image/jpg,"
                id="input-file"
                style={{display: "none"}}
                onChange={handleFileChange}
              />
            </div>
            <span className="badge"></span>
          </div>

          <div className="notifications-messages" style={{display: isLoading ? "block" : "none"}}>
            <div className="notifications">
              <div> 
                <LightbulbOutlinedIcon/>
                Did you know you can easily change the current profile to your own photo?</div>
              <div>
                <LightbulbOutlinedIcon/>
                If the timezone doesn't work correctly, please refresh the page for once!</div>
            </div>
          </div>
        </div>
  )
}

export default PersonalAccessibility