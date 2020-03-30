import React from 'react';
import session from '../Session';
import { useLocation } from 'react-router-dom';

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

export default function Offline() {
	let reason = useQuery().get('reason');
	return <div>
		<div className="container text-center">
			<div className="h2 my-5">Error :(</div>
			<p>Mohon maaf kami tidak bisa menjangkau internet. Mohon periksa koneksi anda.</p>
			<button className="btn btn-lg btn-secondary my-4" onClick={() => session.history.goBack()}>Kembali</button>
			<p className="text-muted small">{reason}</p>
		</div>
	</div>
}