import React, { Component } from 'react'
import FormDangKy from './FormDangKy'

import TableDanhSachSinhVien from './TableDanhSachSinhVien'

export default class BaiTapQuanLySinhVien extends Component {
    render() {
        return (
           
            <div className="container">
                 <h1 className='text-center'>Quản lý Sinh viên</h1>
                <FormDangKy />
                <TableDanhSachSinhVien />
            </div>
        )
    }
}
