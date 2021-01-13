import React from "react";
import "./style.css";
import { Place, CreditCard, Link, Mail, Phone } from "@material-ui/icons";

const Profile = ({ profiles, loading }) => {
	return profiles.map((profile) => (
		<div className="card" key={profile.UserName}>
			<div className="card-inner">
				<div className="card-front">
					<div className="avi mb-1"></div>
					<h3 className="username mb-1">{profile.UserName}</h3>
					<p className="name mb-1">
						{profile.FirstName + " " + profile.LastName}
					</p>
					<p className="payment">{profile.PaymentMethod}</p>
				</div>
				<div className="card-back">
					{/* <h3 className="name mb-1">
						{profile.FirstName + " " + profile.LastName}
					</h3> */}
					<div className="more-info">
						<Place />
						<p className="">{profile.TimeZone}</p>
					</div>
					<div className="more-info">
						<Mail />
						<p className="">{profile.Email}</p>
					</div>
					<div className="more-info">
						<Phone />
						<p className="">{profile.PhoneNumber}</p>
					</div>
					<div className="more-info">
						<Link />
						<p className="">{profile.DomainName}</p>
					</div>
					<div className="more-info">
						<CreditCard />
						<p className="">{profile.CreditCardNumber}</p>
					</div>
				</div>
			</div>
		</div>
	));
};

export default Profile;
