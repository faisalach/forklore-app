import axios from "axios";
import { useEffect, useState } from "react";
import { Helper } from "../helper/helper";
import { Link } from "react-router-dom";
import MultipleSelect from "../components/MultipleSelect";

const FormPage = () => {
	const [foods, setFoods] = useState([]);
	const [umur, setUmur] = useState("");
	const [tinggiBadan, setTinggiBadan] = useState("");
	const [jenisKelamin, setJenisKelamin] = useState("");
	const [showModal, setShowModal] = useState(0);
	const [foodIds, setFoodIds] = useState([]);
	const [result, setResult] = useState([]);

	const { baseURLAPI } = Helper();

	const loadFoods = async () => {
		await axios.get(baseURLAPI("foods/list")).then((responseText) => {
			let data = responseText.data;
			let id = Object.values(data.id);
			let name = Object.values(data.name);
			let new_data = [];

			name.map((nm, i) => {
				new_data.push({
					id: id[i],
					name: name[i],
				});
			});
			setFoods(new_data);
		});
	};

	const handleFoodIds = (e) => {
		let arr = foodIds;
		let value = parseInt(e.target.value);
		if (e.target.checked) {
			arr.push(value);
		} else {
			let index = 0;
			do {
				index = arr.indexOf(value);
				if (index > -1) {
					arr.splice(index, 1);
				}
			} while (index > -1);
		}
		setFoodIds(arr);
	};

	const submitForm = async (e) => {
		e.preventDefault();

		await axios
			.post(baseURLAPI("foods"), {
				umur: umur,
				tinggi_badan: tinggiBadan,
				jenis_kelamin: jenisKelamin,
				food_ids: foodIds,
			})
			.then((responseText) => {
				responseText.data.foodIds = foodIds;
				setResult([responseText.data]);
				console.log(result);
			});
	};

	useEffect(() => {
		loadFoods();
	}, []);

	return (
		<div className="bg-slate-200 min-h-screen px-20 py-14 h-full bg-gradient-to-b from-slate-50">
			<div className="flex gap-2 justify-center">
				<div className="bg-white flex-1 rounded-xl p-10 shadow-lg max-w-96">
					<h1 className="text-2xl font-semibold text-green-400">
						Cek Pilihan Makanan
					</h1>
					<hr className="my-3" />

					<form className="max-w-md mx-auto" onSubmit={submitForm}>
						<div className="relative z-0 w-full mb-5 group mt-5">
							<input
								type="number"
								name="umur"
								id="umur"
								className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
								placeholder=" "
								required
								defaultValue={umur}
								onChange={(e) => setUmur(e.target.value)}
							/>
							<label
								htmlFor="umur"
								className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
							>
								Umur (Bulan)
							</label>
						</div>
						<div className="relative z-0 w-full mb-5 group">
							<input
								type="number"
								name="tinggi_badan"
								id="tinggi_badan"
								className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
								placeholder=" "
								required
								defaultValue={tinggiBadan}
								onChange={(e) => setTinggiBadan(e.target.value)}
							/>
							<label
								htmlFor="tinggi_badan"
								className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
							>
								Tinggi Badan (cm)
							</label>
						</div>
						<div className="relative z-0 w-full mb-5 group">
							<select
								id="jenis_kelamin"
								name="jenis_kelamin"
								className="border-b-2 border-0 border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								defaultValue={jenisKelamin}
								onChange={(e) =>
									setJenisKelamin(e.target.value)
								}
							>
								<option value="">Jenis Kelamin</option>
								<option value="0">Laki-laki</option>
								<option value="1">Perempuan</option>
							</select>
						</div>
						<div className="relative z-0 w-full mb-5 group">
							<button
								type="button"
								className="w-full py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-green-400 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
								onClick={() => setShowModal(1)}
							>
								+ Makanan Sering Dimakan{" "}
								{foodIds.length > 0
									? ` (${foodIds.length} Makanan) `
									: ""}
							</button>

							<div
								className={`${
									showModal == "0" ? "hidden" : ""
								} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
							>
								<div className="relative p-4 w-full max-w-2xl max-h-full mx-auto">
									<div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
										<div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
											<h3 className="text-xl font-semibold text-gray-900 dark:text-white">
												Pilihan Makanan yang Sering
												Dimakan
											</h3>
											<button
												type="button"
												className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
												onClick={() => setShowModal(0)}
											>
												<svg
													className="w-3 h-3"
													aria-hidden="true"
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 14 14"
												>
													<path
														stroke="currentColor"
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth="2"
														d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
													/>
												</svg>
												<span className="sr-only">
													Close modal
												</span>
											</button>
										</div>
										<div className="p-4 md:p-5 space-y-4 overflow-auto">
											<ul className="max-h-64">
												{foods.map((row) => (
													<>
														{foodIds.indexOf(
															row.id
														) > -1 ? (
															<li
																className="mb-2 "
																key={
																	`li_checked_` +
																	row.id
																}
															>
																<label className="inline-block w-full">
																	<input
																		type="checkbox"
																		className="mr-3"
																		name="food_ids[]"
																		value={
																			row.id
																		}
																		onChange={
																			handleFoodIds
																		}
																		defaultChecked
																	/>
																	{row.name}
																</label>
															</li>
														) : (
															""
														)}
													</>
												))}

												{foodIds.length > 0 ? (
													<div className="border-b-2 mb-3 border-gray-300"></div>
												) : (
													""
												)}

												{foods.map((row) => (
													<>
														{foodIds.indexOf(
															row.id
														) < 0 ? (
															<li
																className="mb-2 "
																key={
																	`li_` +
																	row.id
																}
															>
																<label className="inline-block w-full">
																	<input
																		type="checkbox"
																		className="mr-3"
																		name="food_ids[]"
																		value={
																			row.id
																		}
																		onChange={
																			handleFoodIds
																		}
																	/>
																	{row.name}
																</label>
															</li>
														) : (
															""
														)}
													</>
												))}
											</ul>
										</div>
										<div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
											<button
												onClick={() => setShowModal(0)}
												type="button"
												className="text-white bg-green-400 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-green-400 dark:focus:ring-green-800"
											>
												Done
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
						<button
							type="submit"
							className="mr-3 text-white bg-green-400 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-green-400 dark:focus:ring-green-800"
						>
							Submit
						</button>
						<Link
							to="/"
							className="text-dark bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-gray-100 dark:focus:ring-gray-800"
						>
							Kembali
						</Link>
					</form>
				</div>

				{result.length > 0 ? (
					<div className="bg-white flex-1 rounded-xl p-10 shadow-lg">
						<table className="w-full">
							<tr>
								<td className="pl-0 p-2" width={150}>
									Umur
								</td>
								<td className="pl-0 p-2">
									: {result[0].stunting.umur} Bulan
								</td>
								<td className="pl-0 p-2" width={150}>
									Tinggi Badan
								</td>
								<td className="pl-0 p-2">
									: {result[0].stunting.tinggi_badan} Cm
								</td>
							</tr>
							<tr>
								<td className="pl-0 p-2" width={150}>
									Jenis Kelamin
								</td>
								<td className="pl-0 p-2">
									:{" "}
									{result[0].stunting.jenis_kelamin == "0"
										? "Laki-laki"
										: "Perempuan"}
								</td>
								<td className="pl-0 p-2" width={150}>
									Status Gizi
								</td>
								<td className="pl-0 p-2">
									: {result[0].stunting.stunting}
								</td>
							</tr>
						</table>
						<p className="my-4 font-semibold">
							Makanan yang Sering Dimakan:
						</p>
						<ul className="list-disc pl-10">
							{foods.map((row) => (
								<>
									{result[0].foodIds.indexOf(row.id) > -1 ? (
										<li className="mb-2">{row.name}</li>
									) : (
										""
									)}
								</>
							))}
						</ul>
						<p className="my-4 font-semibold">
							Makanan yang Direkomendasikan:
						</p>
						<ul className="list-disc pl-10">
							{result[0].food.map((row) => (
								<li className="mb-2">{row}</li>
							))}
						</ul>
					</div>
				) : (
					""
				)}
			</div>
			<p className="text-center mt-5">
				<span className="font-semibold">&copy; Copyright 2024. </span>
				<span className="font-bold"> Forklore</span>
			</p>
		</div>
	);
};

export default FormPage;
