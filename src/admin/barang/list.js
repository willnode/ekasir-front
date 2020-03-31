import React from 'react';
import { controlTable, controlButtons, controlDelete } from '../../widget/controls';
import session from '../../Session';

export default function () {
	return <div>
		{controlTable({
			url: 'barang',
			toolbar: controlButtons([{
				href: 'create',
				title: 'Barang Baru',
				icon: 'fa fa-plus',
				style: 'btn btn-success ml-2',
			}])
		}, [{
			field: 'barang_nama',
			title: 'Nama',
		}, {
			field: 'barang_modal',
			title: 'Modal',
			formatter: session.formatRupiah,
		}, {
			field: 'barang_harga',
			title: 'Harga',
			formatter: session.formatRupiah,
		}, {
			field: 'barang_id',
			title: 'Action',
			formatter: (value) => (controlButtons([{
				href: `edit/${value}`,
				style: 'btn btn-sm btn-warning',
				icon: 'fa fa-edit',
			}, {
				href: controlDelete('barang', value),
				key: 'del'+value,
				style: 'btn btn-sm btn-danger',
				icon: 'fa fa-trash',
				confirm: 'Yakin?'
			}]))
		}])
		}
	</div>
}
