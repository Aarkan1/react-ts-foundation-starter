import { Link } from "react-router-dom";
// Rename the imported Link to avoid conflict with the Link component from react-router-dom
import { Link as LinkType } from "../../types";

interface NavigationProps {
  links: LinkType[];
}

const Navigation = ({ links }: NavigationProps): JSX.Element => {
  // TODO: Get what is needed from Context/Redux to implement the logout functionality.

  return (
    <nav>
      {links.map(({ href, name }, i) => (
        <Link className="link" key={i} to={href}>
          {name}
        </Link>
      ))}
      {/* TODO 2: Show logout button if user logged in and write the code that 
            allows them to logout. */}
    </nav>
  );
};

export default Navigation;
