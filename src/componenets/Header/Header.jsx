import React from 'react'
import { container, Logo, LogoutBtn } from "../index"
import { Link, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Container from './../Container/Container';
import Logo from './../logo';
import LogoutBtn from './LogoutBtn';

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const Navigate = useNavigate()


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
    <haeder className="py-3 shadow bg-gray-500">
      <Container>
        <nav>
          <div className="flex"></div>
          <div className="mr-4">
            <Link to='/'>

              <Logo width='70px' />

            </Link>
          </div>
          <ul className='flex ml-auto'>
            {navItems.map((item) =>
              item.active ? (
                // Unordered list
                <li key={item.name}>  {/* Providing a unique key for each item to help React identify elements */}
                  <button onClick={() => Navigate(item.slug)}
                    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>
                    {item.name}
                  </button>
                </li> // Where HTML Element repeat then there is use of key.
              ) : null
            )}

            {/* if authStatus is true then show the user logout Button */}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </haeder>
  )
}

export default Header