import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function Buy() {

  const navigate = useNavigate();
  const location = useLocation();
  const [books, setBooks] = useState({
    stock: 0,
  });
  const [data, setData] = useState([]);

  
  const id = location.pathname.split("/")[2];
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("http://localhost:5000/books?filter=all");
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBooks();
  }, []);

  const datas = data.find((book) => book.id == id);
  // setBooks({stock: datas.stock})

  const handleChange = (e) => {
    setBooks((currState) => ({
      ...currState,
      // stock: datas.stock - Number(e.target.value),
      stock:Number(e.target.value),
    }));
    console.log(books);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const addedBook = await axios.put(
      "http://localhost:5000/buy/" + location.pathname.split("/")[2],
      books,
      { withCredentials: true } // Include credentials
    );
    navigate("/books");
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className=" border px-8 py-8 ">
        <div className="flex justify-center  ">
          <h1 className="text-xl px-6 ">Purchase Book</h1>
        </div>
        <div className=" flex flex-col items-center justify-center  text-xl py-8 ">
          {datas && datas.price && (
            <div className=" flex flex-col justify-center items-center">
              <img
                className=" h-36 w-36 border bg-slate-400"
                src=""
                alt="img"
              />
              <span>title: {datas.title} </span>
              <span>price: {datas.price} </span>
              <span>quantity available : {datas.stock}</span>
            </div>
          )}
          <div className="flex justify-center mt-5">
            <h1 className="text-xl px-6 py-4">Quantity</h1>
            <input
              className="border border-[#00c46a] px-4 py-2 rounded-lg text-black"
              type="number"
              name="stock"
              placeholder="Quantity"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button
            onClick={handleClick}
            className="w-20 h-10 bg-[#00c46a] text-white rounded-lg mt-3"
          >
            Buy
          </button>
        </div>
      </div>
    </div>
  );
}

export default Buy;
