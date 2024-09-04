// Rename the imported interface to avoid conflict with the User component
import { User as UserType } from "../../types";

interface UserProps {
  user: UserType;
}

const User = ({ user }: UserProps): JSX.Element => {
  return (
    <span>
      {user.name} | {user.email}
    </span>
  );
};

export default User;
