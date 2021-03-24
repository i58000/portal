import "./profile.scss";

const title = "Safegg";
const desc =
  "cat Safegg cat cat gallery cat cat Safegg cat, cat gallery cat gallery Safegg cat cat Safegg cat.";

const srcAvatar = '/img/avatar.jpg'

const Profile: React.FC = () => {
  return (
    <div className="Profile">
      <div className="top">
        <div className="left">
          <img src={srcAvatar} />
        </div>
        <div className="right">
          <div className="title">{title}</div>
          <div className="desc">{desc}</div>
        </div>
      </div>
      {/* <div className="bottom"></div> */}
    </div>
  );
};

export default Profile;
