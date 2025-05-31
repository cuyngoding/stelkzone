import { IoArrowBack } from "react-icons/io5"
import { useNavigate } from "react-router-dom";
import './ButtonBack.css'

function ButtonBack() {
    const navigate = useNavigate();
  return (
    <>
    <button type='button' className="back-btn" onClick={()=> navigate(-1)}><IoArrowBack/></button>
    </>
  )
}

export default ButtonBack