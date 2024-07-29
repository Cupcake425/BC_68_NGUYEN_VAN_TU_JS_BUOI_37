import React from "react";
import { Space, Table, Tag } from "antd";

const TableNhanVien = ({ arrNhanVien, handleDelete, handleGetNhanVien }) => {
  const columns = [
    {
      title: "Mã số nhân viên",
      dataIndex: "msnv",
      key: "name",
    },
    {
      title: "Tên nhân viên",
      dataIndex: "tenNhanVien",
      key: "age",
    },
    {
      title: "Số điện thoại",
      dataIndex: "soDienThoai",
      key: "address",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "address",
    },
    {
      title: "Hành động",
      render: (text, record, index) => {
        return (
          <>
            <button
              onClick={() => {
                handleDelete(record.msnv);
              }}
              className="py-2 px-5 bg-red-500 text-white rounded"
            >
              Xóa
            </button>
            <button
              onClick={() => {
                handleGetNhanVien(record);
              }}
              className="py-2 px-5 bg-yellow-500 text-white rounded ml-3"
            >
              Sửa
            </button>
          </>
        );
      },
    },
  ];
  return <Table columns={columns} dataSource={arrNhanVien} />;
};

export default TableNhanVien;
