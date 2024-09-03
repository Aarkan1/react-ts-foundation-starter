// This interface can be extracted to an interface.ts file and imported here instead, since this one is used in multiple places.
interface User {
  id: number;
  name: string;
  email: string;
}

interface UserProps {
  user: User;
}

const User = ({ user }: UserProps): JSX.Element => {
  return (
    <span>
      {user.name} | {user.email}
    </span>
  );
};

export default User;
