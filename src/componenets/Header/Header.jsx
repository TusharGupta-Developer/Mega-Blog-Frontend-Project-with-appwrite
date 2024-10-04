import React from 'react'
import {Container, Logo } from "../index"
import { Link, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import LogoutBtn from './LogoutBtn';

function Header() {
  const authStatus = useSelector((state) => state.auth?.status) || false; // Ensure it's either true or false
  const navigate = useNavigate()


  const navItems = [
    {
      name: 'Home',
      slug: '/',
      active: true

    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus, // Self: if user does not login then authStatus will be false, so making active true we use "!authStatus" so false value beacme true.
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ]


  return (
    <header className="py-3 shadow bg-gray-500">
      <Container>
        <nav className="flex justify-between items-center"> {/* Flexbox for alignment */}
          <div className="flex items-center">
            <Link to='/'>
              <Logo width='70px' />
            </Link>
          </div>
          <ul className='flex ml-auto'>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button onClick={() => navigate(item.slug)} className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}


export default Header