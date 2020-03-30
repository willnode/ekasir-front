import React from 'react';
import Dashboard from './dashboard';
import Profile from './profile';
import Transaksi from './transaksi/list';
import Barang from './barang/list';
import BarangEdit from './barang/edit';
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
				<Route exact strict path="/admin/transaksi/">
					<Transaksi />
				</Route>
				<Route exact strict path="/admin/barang/">
					<Barang />
				</Route>
				<Route strict path="/admin/barang/edit/:id">
					<BarangEdit />
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