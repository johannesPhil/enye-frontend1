import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";
import Header from "./components/Header";
import Profile from "./components/Profile";
import Pagination from "./components/Pagination";

function App() {
	const API_KEY = "44c5b2073bd947b79c82ce050a72c597";
	const [profiles, setProfiles] = useState([]);
	const [loading, setLoading] = useState(false);
	const [currentPage, setcurrentPage] = useState(1);
	const [profilePerPage, setProfilePerPage] = useState(20);
	const [searchTerm, setsearchTerm] = useState("");

	useEffect(() => {
		fetchProfile();
	}, []);

	const fetchProfile = async () => {
		setLoading(true);
		const res = await axios.get("https://api.enye.tech/v1/challenge/records");

		const result = res.data.records.profiles;

		const loc = await Promise.all(
			result.map((profile) => {
				axios
					.get(
						`https://api.openweathermap.org/data/2.5/onecall?lat=${profile.Latitude}&lon=${profile.Longitude}&appid=${API_KEY}&units=metric`
					)
					.then((res) => {
						const timezone = res.data.timezone;
						profile["TimeZone"] = timezone;
					});
			})
		);

		console.log(loc);

		setProfiles(result);
		console.log(result.TimeZone);
		localStorage.setItem("profiles", JSON.stringify(result));
		setLoading(false);
	};

	const refresh = () => {
		setLoading(true);
		const saved = JSON.parse(localStorage.getItem("profiles"));
		console.log(saved);
		setProfiles(saved);
		setLoading(false);
	};

	const lastPageIndex = currentPage * profilePerPage;
	const firstPageIndex = lastPageIndex - profilePerPage;
	const currentProfile = profiles.slice(firstPageIndex, lastPageIndex);
	const changePage = (pageNumber) => setcurrentPage(pageNumber);

	const searchUserName = (event) => {
		const term = event.target.value;
		setsearchTerm(term);
		const searchResult = profiles.filter((profile) => {
			return profile.UserName.toLowerCase().includes(term.toLowerCase());
		});
		setProfiles(searchResult);
		console.log(searchResult);
	};
	const searchGender = (event) => {
		const gender = event.target.value;
		const searchResult = profiles.filter((profile) => {
			return profile.Gender === gender;
		});
		setProfiles(searchResult);
		console.log(searchResult);
	};
	const searchPayment = (event) => {
		const method = event.target.value;
		const searchResult = profiles.filter((profile) => {
			return profile.PaymentMethod === method;
		});
		setProfiles(searchResult);
		console.log(searchResult);
	};

	if (loading) {
		return <div className="loading"></div>;
	}

	return (
		<div className="container">
			<Header
				className="mb-5"
				search={searchUserName}
				searchGender={searchGender}
				searchPayment={searchPayment}
				searchTerm={searchTerm}
				refresh={refresh}
			/>
			<div className="grid mb-3">
				<Profile profiles={currentProfile} loading={loading} />
			</div>
			<Pagination
				className="mb-5"
				profilePerPage={profilePerPage}
				totalProfile={profiles.length}
				changePage={changePage}
			/>
		</div>
	);
}

export default App;
