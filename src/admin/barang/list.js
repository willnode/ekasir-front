import React from 'react';
import { controlTable, controlButtons, controlDelete } from '../../widget/controls';

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
			field: 'barang_harga_jual',
			title: 'Harga',
		}, {
			field: 'barang_sisa_stok',
			title: 'Stok',
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
