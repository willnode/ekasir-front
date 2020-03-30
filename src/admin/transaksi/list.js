import React from 'react';
import { controlTable } from '../../widget/controls';

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
		}])
		}
	</div>
}
