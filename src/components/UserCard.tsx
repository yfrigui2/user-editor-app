import { Link } from "react-router-dom";

export const UserCard: React.FC<{ user: User }> = ({ user }) => {
  return (
    <li className="userCard">
      <div>{user.name}</div>
      <div>{user.email}</div>
      <div>{user.phone}</div>
      <div>{user.address.city}</div>
      <Link to={`/users/edit/${user.id}`}>Edit</Link>
    </li>
  );
};
