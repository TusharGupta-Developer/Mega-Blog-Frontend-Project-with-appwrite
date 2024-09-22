import React from 'react'
import { container, Logo, LogoutBtn } from "../index"
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
  const authStatus = useSelector((state) => {
    state.auth.status
  })

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
    <div>Header</div>
  )
}

export default Header