import { useState } from 'react';

import img from "../../assets/images/profile/profile.png";

import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';

const PersonalAccessibility = () => {
  const [isLoading, setIsLoading] = useState(false)

  const loadNotification = () => {
    setIsLoading(!isLoading)
  }

  return (
      <div className="personal-accessibility">
          <div className="notification" onClick={loadNotification}>
            <NotificationsNoneIcon/>
            <span className="badge"></span>
          </div>

          <div className="profile-image">
            <img
              src={img}
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
              />
            </div>
            <span className="badge"></span>
          </div>

          <div class="notifications-messages" style={{display: isLoading ? "block" : "none"}}>
            <div class="notifications">
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