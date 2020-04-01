import React, { useState } from 'react';
import Page from '../../widget/page';
import {
	controlInput, controlSubmit, controlBack, controlPost
} from '../../widget/controls';
import { useParams } from 'react-router-dom';
import session from '../../Session';


export default function ({ id }) {
	if (id === null || id === undefined) {
		id = useParams().id;
	}
	const [d, setData] = useState(null);
	const data = (d && d.data);
	return (
		<Page src={'barang/' + id} dataCallback={setData}>
			{!data ? '' : (
			<form onSubmit={controlPost(`barang/${id}`, id === 0 ? ()=>session.history.goBack(): null)}>
				{controlInput({name: 'barang_nama', label: 'Nama', value: data.barang_nama, required: true})}
				{controlInput({name: 'barang_kode', label: 'Kode', value: data.barang_kode, required: true})}
				{controlInput({name: 'barang_modal', label: 'Harga Beli', value: data.barang_modal, required: true, type: 'number'})}
				{controlInput({name: 'barang_harga', label: 'Harga Jual', value: data.barang_harga, required: true, type: 'number'})}
				{controlSubmit()}
			</form>)}
			{controlBack()}
		</Page>)
}
