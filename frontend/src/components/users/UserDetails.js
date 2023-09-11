import "./UserDetails.css";
import Users from "./Users";

const UserDetails = () => {
  return (
    <div className="user-details-container">
      <div className="user-details">
        <div className="col-1">
          <p>Serial No</p>
        </div>
        <div className="col-2">
          <p>Username</p>
        </div>
        <div className="col-3">
          <p>Role</p>
        </div>
        <div className="col-4">
          <p>Role Requested</p>
        </div>
      </div>
      <Users />
    </div>
  );
};

export default UserDetails;
