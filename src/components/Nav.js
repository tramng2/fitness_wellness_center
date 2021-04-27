import React from 'react'
import { Link } from 'react-router-dom'

function Nav() {
    return (
        <div>
            <ul>
                <Link to='/'>Home</Link>
                <Link to='/training'>Training</Link>
                <Link to='/calendar'>Calendar</Link>
            </ul>
            
        </div>
    )
}

export default Nav
