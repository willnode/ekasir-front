import React, { useState } from 'react';
import Page from '../../widget/page';
import {
	controlInput, controlSubmit, controlBack, controlPost
} from '../../widget/controls';
import { useParams } from 'react-router-dom';


export default function ({ id }) {
	if (id === null || id === undefined) {
		id = useParams().id;
	}
	const [d, setData] = useState(null);
	const data = (d && d.data);
	return (
		<Page src={'barang/' + id} dataCallback={setData}>
			{!data ? '' : (
			<form onSubmit={controlPost('barang', id)}>
				{controlInput({name: 'barang_nama', label: 'Nama', value: data.barang_nama, required: true})}
				{controlInput({name: 'barang_harga_beli', label: 'Harga Beli', value: data.barang_harga_beli, required: true, type: 'number'})}
				{controlInput({name: 'barang_harga_jual', label: 'Harga Jual', value: data.barang_harga_jual, required: true, type: 'number'})}
				{controlInput({name: 'barang_sisa_stok', label: 'Sisa Stok', value: data.barang_sisa_stok, required: true, type: 'number'})}
				{controlSubmit()}
			</form>)}
			{controlBack()}
		</Page>)
}
