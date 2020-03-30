import React from 'react';
import session from '../Session';
import { Link, Switch, Route } from 'react-router-dom';

import AdminSidebar from '../admin/sidebar';


function HeaderLogon() {
  return <>

  <ul className="navbar-nav ml-auto">
    <li>
      <div className="topbar-divider d-none d-sm-block h-100"></div>
    </li>

    <Route path="/admin">
      <AdminSidebar/>
    </Route>

    <li className="nav-item dropdown no-arrow">
      <a className="nav-link dropdown-toggle" href="/#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
<span className="mr-2 d-none d-lg-inline text-gray-600 small">{session.login.nama}</span>
        <img alt="Profile Pic" className="img-profile rounded-circle" src={session.login.avatar ? session.baseUrl(`uploads/avatar/${session.login.avatar}`) : '/assets/user.png'} />
      </a>
      <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
        <Link className="dropdown-item" to={`/${session.login.role}/`}>
          <i className="fas fa-home fa-sm fa-fw mr-2 text-gray-400"></i>
          Beranda
        </Link>
        <Link className="dropdown-item" to={`/${session.login.role}/profil`}>
          <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
          Profil
        </Link>
        <div className="dropdown-divider"></div>
        <Link className="dropdown-item" to="/logout">
          <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
          Logout
        </Link>
      </div>
    </li>

  </ul>

</>
}

export default function Header() {
  return (
    <nav className="bg-white navbar navbar-expand navbar-light shadow sticky-top topbar">
      <Link className="navbar-brand" to='/'>
        <img src="/assets/nogo-navbar-sm.png" height="40" width="auto" alt="logo"/>
      </Link>
      <Switch>
        <Route path="/offline">
          <div></div>
        </Route>
        <Route path="/admin">
          <HeaderLogon/>
        </Route>
        <Route>
          <>
          <div id="navbar" className="navbar-collapse collapse">
              <ul id="top-menu" className="nav navbar-nav navbar-right main-nav ml-auto">
                <li className="nav-link"><Link className="btn btn-link" to="/login">Login</Link></li>
              </ul>
            </div>
          </>
        </Route>
      </Switch>
    </nav>
  )
}