import React, { useState } from 'react';
import Page from '../../widget/page';
import { useParams } from 'react-router-dom';
import session from '../../Session';


export default function ({ id }) {
	if (id === null || id === undefined) {
		id = useParams().id;
	}
	const [d, setData] = useState(null);
	const data = (d && d.data);
	return (
		<Page src={'transaksi/' + id} dataCallback={setData}>
			{!data ? '' : (
				<div className="ticketPrint">
					<h1>E-Kasir Toko Super Sejahtera</h1>
					<table>
						<thead><tr><th>Barang</th><th>Harga</th><th>Qty</th><th>Total</th></tr></thead>
						<tbody>
							{
								data.struk.map(x => <tr key={x.barang_id}>
									<td>{x.barang_nama}</td>
									<td>{session.formatRupiah (x.struk_harga_barang)}</td>
									<td>{x.struk_qty}</td>
									<td>{session.formatRupiah (x.struk_harga_barang * x.struk_qty)}</td>
								</tr>)
							}
						</tbody>
						<tfoot>
							<tr><th colSpan={3}>Total</th><th>{session.formatRupiah (
								data.struk.reduce((t, x) => t + x.struk_harga_barang * x.struk_qty, 0))}</th></tr>
							<tr><th colSpan={3}>Waktu</th><th>{new Date(Date.parse(data.transaksi_waktu)).toLocaleString('id-ID')}</th></tr>
						</tfoot>
					</table>
					<button onClick={window.print} className="btn btn-primary btn-block my-3">Cetak</button>
					<button onClick={session.history.goBack} className="btn btn-secondary btn-block my-3">Kembali</button>
				</div>
			)}
		</Page>)
}
