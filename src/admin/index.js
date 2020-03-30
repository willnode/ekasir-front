import React from 'react';
import Dashboard from './dashboard';
import Profile from './profile';
import Transaksi from './transaksi';
import Barang from './barang';
import {
	Redirect,
	Switch,
	Route
} from 'react-router-dom';

import session from '../Session';
export default function () {
	return !session.login || session.login.role !== 'admin' ? <Redirect to="/login" /> : (
		<div className="container mt-4">
			<Switch>
				<Route exact path="/admin">
					<Dashboard />
				</Route>
				<Route exact path="/admin/profil">
					<Profile />
				</Route>
				<Route exact path="/admin/transaksi">
					<Transaksi />
				</Route>
				<Route exact path="/admin/barang">
					<Barang />
				</Route>
				<Route>
					<>
						<div className="h2 my-5 text-center">Error :(</div>
						<p className="text-center">Mohon maaf halaman ini tidak tersedia.</p>
					</>
				</Route>
			</Switch>
		</div>
	)
}