// import React, { Component } from "react";
// import {
//   Collapse,
//   Container,
//   Navbar,
//   NavbarBrand,
//   NavbarToggler,
//   NavItem,
//   NavLink,
// } from "reactstrap";
// import { Link } from "react-router-dom";
// import "./NavMenu.css";

// export class NavMenu extends Component {
//   static displayName = NavMenu.name;

//   constructor(props) {
//     super(props);

//     this.toggleNavbar = this.toggleNavbar.bind(this);
//     this.state = {
//       collapsed: true,
//     };
//   }

//   toggleNavbar() {
//     this.setState({
//       collapsed: !this.state.collapsed,
//     });
//   }

//   render() {
//     return (
//       <header>
//         <Navbar
//           className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3"
//           light
//         >
//           <Container>
//             <NavbarBrand tag={Link} to="/">
//               ProductsInStore
//             </NavbarBrand>
//             <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
//             <Collapse
//               className="d-sm-inline-flex flex-sm-row-reverse"
//               isOpen={!this.state.collapsed}
//               navbar
//             >
//               <ul className="navbar-nav flex-grow">
//                 <NavItem>
//                   <NavLink tag={Link} className="text-dark" to="/GetCustomers">
//                     Customers
//                   </NavLink>
//                 </NavItem>
//                 <NavItem>
//                   <NavLink tag={Link} className="text-dark" to="/GetProducts">
//                     Products
//                   </NavLink>
//                 </NavItem>
//                 <NavItem>
//                   <NavLink tag={Link} className="text-dark" to="/GetStores">
//                     Stores
//                   </NavLink>
//                   <NavLink tag={Link} className="text-dark" to="/GetSales">
//                     Sales
//                   </NavLink>
//                 </NavItem>
//               </ul>
//             </Collapse>
//           </Container>
//         </Navbar>
//       </header>
//     );
//   }
// }

import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import StoreIcon from "@material-ui/icons/Store";
import LocalGroceryStoreIcon from "@material-ui/icons/LocalGroceryStore";
import LoyaltyIcon from "@material-ui/icons/Loyalty";

const colors = ["orange"];

class NavigationMenu extends Component {
  state = { activeItem: "ProductsInStore" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;
    const { color } = this.props;

    return (
      <Menu color={color} inverted widths={5}>
        <Menu.Item
          name="ProductsInStore"
          active={activeItem === "ProductsInStore"}
          onClick={this.handleItemClick}
        >
          <Link to="/">ProductsInStore</Link>
        </Menu.Item>
        <Menu.Item
          name="Customers"
          active={activeItem === "Customers"}
          onClick={this.handleItemClick}
        >
          <Link to="/GetCustomers">
            Customers
            <AccountCircleIcon />
          </Link>
        </Menu.Item>
        <Menu.Item
          name="Products"
          active={activeItem === "Products"}
          onClick={this.handleItemClick}
        >
          <Link to="/GetProducts">
            Products
            <LocalGroceryStoreIcon />
          </Link>
        </Menu.Item>
        <Menu.Item
          name="Stores"
          active={activeItem === "Stores"}
          onClick={this.handleItemClick}
        >
          <Link to="/GetStores">
            Stores
            <StoreIcon />
          </Link>
        </Menu.Item>
        <Menu.Item
          name="Sales"
          active={activeItem === "Sales"}
          onClick={this.handleItemClick}
        >
          <Link to="/GetSales">
            Sales
            <LoyaltyIcon />
          </Link>
        </Menu.Item>
      </Menu>
    );
  }
}

export const NavMenu = () => {
  const menus = colors.map((color) => (
    <NavigationMenu color={color} key={color} />
  ));

  return <div>{menus}</div>;
};
