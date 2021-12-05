import React,{useContext} from 'react'
import {GlobalState} from '../../GlobalState';
import Cart from "./icon/cart.svg";
import {Link} from "react-router-dom";
import axios from "axios";


function Header() {
    const state = useContext(GlobalState)
    //console.log(state)
    const[isLogged] =state.userAPI.isLogged
    const[isAdmin] =state.userAPI.isAdmin
    const [cart]=state.userAPI.cart
    
 
const logoutUser = async()=>
{
    await axios.get("/user/logout")
    localStorage.removeItem('first Login')
    window.location.href="/";
}    
const adminRouter= ()=>{
    return(
        <>
        <li><Link to ="/create_product">CreateProduct</Link></li>&nbsp;
        <li><Link to ="/category">Categories</Link></li>&nbsp;
        </>
    )
}

const loggedRouter= ()=>{
    return(
        <>
        <li><Link to ="/history">History</Link></li> &nbsp;
        <li><Link to ="/" onClick={logoutUser}>Logout</Link></li>
        </>
    )
}
        // const toggleMenu = () => setMenu(!menu)

     return (
        <header>
        <div className="logo">
            <h1>
                <Link to ="/">{isAdmin ? 'Admin' : 'Sandy SHOP'}</Link>
            </h1>
        </div>

        <ul>

            <li><Link to ="/">{isAdmin ? 'Products' : "Shop"}</Link></li>&nbsp;
            
            {isAdmin && adminRouter()}
            
            {
                isLogged ? loggedRouter() : <li><Link to ="/login">Login  ✥  Register</Link></li>
            }
       </ul>

        {
            
        isAdmin ? '' 
        :<div className="cart-icon">
            <span>{cart.length}</span>
                <Link to ="/cart">
                    <img src={Cart} alt="" width="30" />
                </Link>
        </div>
        }
        </header>
    )
}

export default Header
