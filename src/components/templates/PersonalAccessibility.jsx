import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import img from "../../assets/images/profile/profile.png";

const PersonalAccessibility = () => {
  return (
    <div className="personal-accessibility">
          <div className="notification">
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
        </div>
  )
}

export default PersonalAccessibility