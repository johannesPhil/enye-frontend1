import React from "react";
import "./style.css";
import { Search, FilterList, Refresh } from "@material-ui/icons";

const Header = ({
	search,
	searchGender,
	searchPayment,
	searchTerm,
	refresh,
}) => {
	return (
		<div className="header">
			<div className="search">
				<Search style={{ color: "#6462d9" }} />
				<input
					type="text"
					placeholder="Search Username"
					value={searchTerm !== "" ? searchTerm : ""}
					onChange={search}
				></input>
			</div>
			<div className="filter">
				<FilterList style={{ color: "#6462d9" }} />
				<select name="gender" onChange={searchGender}>
					<option>Gender</option>
					<option name="" value="Prefer to skip">
						Prefer to Skip
					</option>
					<option name="" value="Female">
						Female
					</option>
					<option name="" value="Female">
						Male
					</option>
				</select>
				<select name="payment" defaultValue="" onChange={searchPayment}>
					<option>Payment</option>
					<option name="" value="cc">
						CC
					</option>
					<option name="" value="check">
						Check
					</option>
					<option name="" value="money order">
						Money Order
					</option>
					<option name="" value="paypal">
						Paypal
					</option>
				</select>
				<Refresh style={{ color: "#6462d9" }} onClick={refresh} />
			</div>
		</div>
	);
};

export default Header;
