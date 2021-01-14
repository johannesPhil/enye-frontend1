import React from "react";

const Pagination = ({ profilePerPage, totalProfile, changePage }) => {
	const pageNumbers = [];
	for (let i = 1; i <= Math.ceil(totalProfile / profilePerPage); i++) {
		pageNumbers.push(i);
	}

	return (
		<nav className="page-nav">
			<ul className="pagination">
				{pageNumbers.map((page) => (
					<li key={page} className="page-item">
						<button className="page-link" onClick={() => changePage(page)}>
							{page}
						</button>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Pagination;
