import { forwardRef, ReactComponentElement } from "react";
import "../styles/profile.scss";

const title = "Safegg";
const desc =
  "安全蛋是一只两岁不到的香槟色英短（其实是土猫）";

const srcAvatar = process.env.PUBLIC_URL + "/img/avatar.jpg";

const Profile = forwardRef<HTMLDivElement | null, {}>(({ }, ref) => {
  return (
    <div className="Profile" ref={ref}>
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
});

export default Profile;
