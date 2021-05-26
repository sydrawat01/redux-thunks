import { FC } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar: FC = () => {
  return (
    <nav>
      <section>
        <NavLink activeClassName="active" exact to="/">
          Dashboard
        </NavLink>
        <NavLink activeClassName="active" exact to="/posts">
          Posts
        </NavLink>
      </section>
    </nav>
  );
};

export default Navbar;
