
const form = document.getElementById("register-form");

form.addEventListener("submit", async (e) => {
	e.preventDefault();
	const formData = new FormData(form);
	const obj = {};
	formData.forEach((value, key) => (obj[key] = value));
	console.log(obj);

	try {
		await fetch("/api/sessions/register", {
			method: "POST",
			body: JSON.stringify(obj),
			headers: {
				"Content-Type": "application/json",
			},
		}).then((response) => {
			if (response.status === 200) {
				window.location.href = "/";
			} else {
				alert("Something went wrong");
			}
		});
	} catch (error) {
		console.error(error);
	}
});