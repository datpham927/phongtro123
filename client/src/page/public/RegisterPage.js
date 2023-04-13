import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "../../components/ButtonComponent";
import InputComponent from "../../components/InputComponent";
import toastMessage from "../../components/toastMessage";
import { setLogin } from "../../redux/authSlice/authSlice";
import { apiRegister } from "../../services/authServices";
import validate from "../../utils/valueDate/valueDate";

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [valueForm, setValueForm] = useState({
    name: "",
    phone: "",
    password: "",
  });
  const [invalidFields, setInvalidFields] = useState([]);
  const [open, setOpen] = useState(false);

  const handleChangeInput = (e) => {
    setInvalidFields([]);
    setValueForm({ ...valueForm, [e.target.name]: e.target.value });
  };

  const handelSummit = async (e) => {
    e.preventDefault();
    if (validate(valueForm, setInvalidFields) >= 1) {
      return;
    }
    const response = await apiRegister(valueForm);
    if (response?.err === 2) {
      toastMessage("Số điện thoại đã được đăng ký");
    } else if (response?.err === 0) {
      toastMessage("Đăng ký thành công");
      dispatch(setLogin(response?.token));
      navigate("/login");
    }
  };

  useEffect(() => {
    if (open) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);
  return (
    <div
      className="flex justify-center items-center  fixed  w-full h-full top-0 right-0 bg-[rgba(0,0,0,.5)] z-30"
      onClick={() => setOpen(true)}
    >
      <form
        className="flex flex-col w-1/2  mx-auto p-4 bg-white rounded-md mt-3"
        onClick={(e) => {
          e.stopPropagation();
          setOpen(false);
        }}
      >
        <InputComponent
          type="text"
          name="phone"
          placeholder="Phone number"
          onChange={handleChangeInput}
          invalidFields={invalidFields}
        />
        <InputComponent
          type="text"
          name="name"
          placeholder="name"
          onChange={handleChangeInput}
          invalidFields={invalidFields}
        />
        <InputComponent
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChangeInput}
          invalidFields={invalidFields}
        />
        <ButtonComponent
          className="btn-primary bg-blue-custom   text-white"
          text="Đăng ký"
          onClick={handelSummit}
        />
        <div className="my-3 flex justify-between ">
          <ButtonComponent
            text="Quên mật khẩu?"
            className="hover:text-blue-custom"
          />

          <ButtonComponent
            text="Đăng Nhập"
            link="/login"
            className="hover:text-blue-custom"
          />
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;
