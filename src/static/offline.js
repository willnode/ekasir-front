import React from 'react';
import session from '../Session';
import { useLocation } from 'react-router-dom';

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

export default function Offline() {
	let reason = useQuery().get('reason');
	let uri = useQuery().get('uri');
	let message = reason.includes('Fetch') ? 'Mohon maaf kami tidak bisa menjangkau internet. Mohon periksa koneksi anda.' :
		reason.includes('Unexpected') ? 'Mohon maaf terjadi galat di server kami. Mohon beritahukan ke Admin.' :
		'Mohon maaf terjadi error yang tidak kami ketahui. Cobalah beberapa saat lagi.';
	return <div>
		<div className="container text-center">
			<div className="h2 my-5">Error :(</div>
			<p>{message}</p>
			<button className="btn btn-lg btn-secondary my-4" onClick={() => session.history.goBack()}>Kembali</button>
			<p className="text-muted small">{reason}</p>
			<p className="text-muted small">{uri}</p>
		</div>
	</div>
}