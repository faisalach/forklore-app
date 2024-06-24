import { Link } from "react-router-dom";

const HomePage = () => {
	return (
	<div className="bg-slate-200 min-h-screen h-full bg-gradient-to-b from-slate-50">
		<div className="grid md:grid-cols-2 gap-4 items-center px-32">
			<div className="">
				<p className="text-3xl mb-2 font-bold text-green-400">Pilihan</p> 
				<p className="text-5xl mb-2 font-bold text-green-400">Makanan Bergizi</p>
				<p className="text-5xl mb-2 font-bold text-green-400">Terbaik</p>

				<p className="mt-8 mb-8">Pilihan makanan bergizi terbaik adalah kunci untuk kesehatan yang optimal. Dengan memilih dengan bijak, kita memberikan fondasi yang kuat untuk kehidupan yang sehat dan bugar. Setiap suapan adalah langkah menuju kehidupan yang lebih baik dan lebih bertenaga. Ayo, mari pilih makanan bergizi terbaik untuk kesehatan yang prima dan masa depan yang cerah!</p>

				<Link to="/" class="focus:outline-none text-lg text-white bg-green-400 hover:bg-green-500 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-400 dark:focus:ring-green-500">
					Cek Pilihan Makanan Terbaik untuk Si Kecil
				</Link>
			</div>
			<div className="">
				<img src="/head-1.png" className="h-screen m-auto" alt="" />
			</div>
		</div>
	</div>
	);
};

export default HomePage;
