import { Link } from "react-router-dom"
import Page from '../../widget/page'
import React, { useState } from "react";
import { Chart } from 'react-charts';

export default function ({id}) {
	const [d, setData] = useState(null);
	const data = d && d.data;
	const tanggal = d && d.data && d.data.tanggal.reverse();
	const axes = [
		{ type: 'utc', position: 'bottom', primary: true },
		{ type: 'linear', position: 'right'},
	];
	return <Page src={'laporan/' + id} dataCallback={setData}>
		<div className="text-center my-2"><div className="btn-group" role="group">
			<Link to="harian" className="btn btn-primary">Harian</Link>
			<Link to="mingguan" className="btn btn-primary">Mingguan</Link>
			<Link to="bulanan" className="btn btn-primary">Bulanan</Link>
		</div></div>

		{data ?
			<div>
				<h2>Data Jumlah Transaksi</h2>
				<div style={{ height: '200px' }}>
					<Chart data={[
						{
							data: data.transaksi.reverse().map((e, i) => ({x: Date.parse(tanggal[i]),y: e}))
						},
					]} axes={axes} tooltip/>
				</div>
				<h2>Data Bruto</h2>
				<div style={{ height: '200px' }}>
					<Chart data={[
						{
							data: data.bruto.reverse().map((e, i) => ({x: Date.parse(tanggal[i]),y: e}))
						},
					]} axes={axes} tooltip/>
				</div>
				<h2>Data Neto</h2>
				<div style={{ height: '200px' }}>
					<Chart data={[
						{
							data: data.neto.reverse().map((e, i) => ({x: Date.parse(tanggal[i]),y: e}))
						},
					]} axes={axes} tooltip/>

				</div>
			</div>
			: ''}
	</Page>
}