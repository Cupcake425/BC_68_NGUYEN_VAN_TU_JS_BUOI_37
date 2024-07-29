import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import InputCustom from "../components/Input/InputCustom";
import * as yup from "yup";
import TableNhanVien from "../components/table/TableNhanVien";
import { useDispatch } from "react-redux";
import { themNhanVien, xoaNhanVien } from "../redux/nhanVienSlice";
import { getValueLocalStorage, setValueLocalStorage } from "../util/util";

const Home = () => {
  const [arrNhanVien, setArrNhanVien] = useState([]);

  const [nhanVien, setNhanVien] = useState();

  const dispatch = useDispatch();

  const {
    handleSubmit,
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    setValues,
    resetForm,
  } = useFormik({
    initialValues: {
      msnv: "",
      tenNhanVien: "",
      email: "",
      soDienThoai: "",
    },
    onSubmit: (values, { resetForm }) => {
      const newArrNhanVien = [...arrNhanVien, values];
      setArrNhanVien(newArrNhanVien);
      setValueLocalStorage("arrNhanVien", newArrNhanVien);
      dispatch(themNhanVien(values));
      resetForm();
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("Vui lòng nhập đúng định dạng email")
        .required("Vui lòng nhập email"),
      tenNhanVien: yup.string().required("Vui lòng không bỏ trống"),
      soDienThoai: yup
        .string()
        .required("Vui lòng không bỏ trống")
        .matches(
          /([\+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/,
          "Vui lòng nhập đúng số điện thoại"
        ),
      msnv: yup.string().required("Vui lòng không bỏ trống"),
    }),
  });

  useEffect(() => {
    const data = getValueLocalStorage("arrNhanVien");
    data && setArrNhanVien(data);
  }, []);

  useEffect(() => {
    nhanVien && setValues(nhanVien);
  }, [nhanVien]);

  const handleDelete = (msnv) => {
    const newArrNhanVien = [...arrNhanVien];
    let index = newArrNhanVien.findIndex((item) => item.msnv == msnv);
    if (index != -1) {
      newArrNhanVien.splice(index, 1);
      dispatch(xoaNhanVien(index));
      setArrNhanVien(newArrNhanVien);
      setValueLocalStorage("arrNhanVien", newArrNhanVien);
    }
  };

  const handleUpdate = () => {
    const updateNhanVien = [...arrNhanVien];
    const index = updateNhanVien.findIndex(
      (item) => item.msnv == nhanVien.msnv
    );
    if (index != -1) {
      updateNhanVien[index] = values;

      setArrNhanVien(updateNhanVien);
      setValueLocalStorage("arrNhanVien", updateNhanVien);
    }
  };

  const handleGetNhanVien = (nhanVien) => {
    setNhanVien(nhanVien);
  };
  return (
    <div className="home">
      <h2 className="text-center p-5 bg-slate-500 mb-5 text-3xl font-bold">
        Thông tin sinh viên
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-5 container mx-auto">
          <InputCustom
            contentLabel={"Mã sinh viên"}
            placeholder={"Vui lòng nhập mã số nhân viên"}
            name="msnv"
            value={values.msnv}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.msnv}
            touched={touched.msnv}
          />
          <InputCustom
            contentLabel={"Họ tên"}
            placeholder={"Vui lòng nhập họ tên"}
            name="tenNhanVien"
            value={values.tenNhanVien}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.tenNhanVien}
            touched={touched.tenNhanVien}
          />
          <InputCustom
            contentLabel={"Số điện thoại"}
            placeholder={"Vui lòng nhập số điện thoại"}
            name="soDienThoai"
            value={values.soDienThoai}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.soDienThoai}
            touched={touched.soDienThoai}
          />
          <InputCustom
            contentLabel={"Email"}
            placeholder={"Vui lòng nhập email"}
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.email}
            touched={touched.email}
          />
          <div className="space-x-5">
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-5 rounded"
            >
              Thêm sinh viên
            </button>
            <button
              onClick={resetForm}
              type="button"
              className="bg-red-500 text-white py-2 px-5 rounded"
            >
              Reset form
            </button>
            <button
              onClick={() => {
                handleUpdate();
              }}
              type="button"
              className="bg-red-500 text-white py-2 px-5 rounded"
            >
              Cập nhập nhân viên
            </button>
          </div>
        </div>
      </form>
      <div className="mt-5">
        <TableNhanVien
          handleDelete={handleDelete}
          handleGetNhanVien={handleGetNhanVien}
          arrNhanVien={arrNhanVien}
        />
      </div>
    </div>
  );
};

export default Home;
