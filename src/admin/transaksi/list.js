import React from 'react';
import { controlTable, controlButtons } from '../../widget/controls';

export default function () {
	return <div>
		{controlTable({
			url: 'transaksi'
		}, [{
			field: 'transaksi_waktu',
			title: 'Waktu',
		}, {
			field: 'transaksi_total',
			title: 'Total',
		}, {
			field: 'transaksi_id',
			title: 'Action',
			formatter: (value) => (controlButtons([{
				href: `detail/${value}`,
				style: 'btn btn-sm btn-primary',
				icon: 'fa fa-file',
				width: 1,
			}]))
		}])
		}
	</div>
}
