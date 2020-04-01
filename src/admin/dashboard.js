import React, { useState, useEffect } from 'react';
import session from '../Session';
import { controlPost } from '../widget/controls';

function ListBarang({ data, idx, setQty, readonly }) {
	return <div className="card my-2">
		<input type="hidden" name={`struk[${idx}][barang_id]`} defaultValue={data.barang_id} />
		<input type="hidden" name={`struk[${idx}][struk_modal_barang]`} defaultValue={data.barang_modal} />
		<input type="hidden" name={`struk[${idx}][struk_harga_barang]`} defaultValue={data.barang_harga} />
		<div className="row no-gutters">
			<div className="col-md-6 form-control px-2">
				{data.barang_nama}
			</div>
			<div className="col-md-3 col-sm-6 form-control px-2">
				{session.formatRupiah(data.barang_harga)}
			</div>
			<div className="col-md-3 col-sm-6">
				<input type="number" min={1} readOnly={readonly} className="form-control" name={`struk[${idx}][struk_qty]`} value={data.struk_qty} onChange={setQty} />
			</div>
		</div>
	</div>
}
export default function () {
	const [data, setData] = useState([]);
	const [fill, setFill] = useState("");
	const [checkout, setCheckout] = useState(0);
	const [money, setMoney] = useState(0);
	useEffect(() => {
		if (checkout) {
			const m = document.getElementById('moneyInput');
			if (m !== document.activeElement) {
				m.select();
			}
		}
	})
	return (
		<form onSubmit={controlPost('transaksi', (r) => session.history.push(`/admin/transaksi/detail/${r.row_id}`))}>
			<h1>Kasir</h1>
			<p>Input barang:</p>
			{
				data.map((v, i) => <ListBarang key={v.barang_kode} idx={i} data={v} readonly={checkout} setQty={(e) => {
					data[i].struk_qty = Number.parseInt(e.target.value);
					setData([...data]);
				}} />)
			}
			<div style={{display: checkout ? 'none' : 'block'}} >

			<input placeholder="Nama / Kode Barang" type="text" className="form-control" value={fill} onChange={(e) => setFill(e.target.value)} onKeyDown={(e) => {
				if (e.key === 'Enter') {
					e.preventDefault();
					if (!e.target.value) {
						if (data.length > 0)
							document.getElementById('almostCheckout').click();
						return;
					}
					const flag1 = data.findIndex((v) => v.barang_kode === e.target.value);
					if (flag1 !== -1) {
						data[flag1].struk_qty++;
					}
					else {
						const pos = data.length;
						data.push({
							barang_kode: e.target.value,
							status: 'Loading',
							struk_qty: 1,
						});
						session.getByRole('barang?search=' + encodeURIComponent(e.target.value)).then(d => {
							if (d.rows.length === 0) {
								data.pop();
							} else {
								let flag2 = data.findIndex((v) => v.barang_id === d.rows[0].barang_id);
								if (flag2 !== -1) {
									data[flag2].struk_qty++;
									data.pop();
								} else {
									data[pos] = {
										...data[pos],
										...d.rows[0],
									}
									data[pos].status = 'OK';
								}
							}
							setData([...data]);
						});
					}
					setData([...data]);
					setFill("");
				}
			}} />
			<button id='almostCheckout' onClick={(e) => {
				e.preventDefault();
				const total = data.map(x => x.struk_qty * x.barang_harga).reduce((a, b) => a + b, 0);
				setCheckout(total);
				setMoney(total)
			}} disabled={data.length === 0} className="my-2 btn btn-block btn-primary">Checkout</button>
			</div>
			<div style={{display: checkout ? 'block' : 'none'}}>
				<p className="h4">Total: {session.formatRupiah(checkout)}</p>
				<p className="h4">Uang: </p>
				<p className="h4"><input name="transaksi_uang" className="form-control" id="moneyInput" type="number"
					required min={0} step={100} value={money} onChange={(e) => setMoney(e.target.value)}
					onInput={(e) => {
						if (e.key === 'Enter') {
							e.preventDefault();
							if (e.target.value >= checkout) {
								e.target.form.submit();
							}
						}
					}}/></p>
				<p className="h4">Kembalian: {money - checkout >= 0 ? session.formatRupiah(money - checkout) : '-'}</p>
				<input type="submit" disabled={money - checkout < 0 } value="Submit" className="my-2 btn btn-block btn-primary"/>
				<input type="button" onClick={() => setCheckout(0)} value="Back" className="my-2 btn btn-block btn-secondary"/>
			</div>

			<hr/>
		</form>
	)
}