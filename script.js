document.addEventListener("DOMContentLoaded", () => {
	const inputs = document.querySelectorAll('input[type="number"]');

	// Load saved data from localStorage
	inputs.forEach((input) => {
		const savedValue = localStorage.getItem(input.id);
		const savedTime = localStorage.getItem(`time-${input.id.split("-")[1]}`);
		if (savedValue !== null) {
			input.value = savedValue;
			input.style.borderColor = "red";
		}
		if (savedTime !== null) {
			const timeSpan = document.querySelector(`#time-${input.id.split("-")[1]}`);
			timeSpan.textContent = savedTime;
		}
	});

	inputs.forEach((input) => {
		input.addEventListener("keypress", (event) => {
			if (!isNaN(event.key) && event.key !== " ") {
				input.style.borderColor = "red";
				const timeSpan = document.querySelector(`#time-${input.id.split("-")[1]}`);
				const currentTime = new Date().toLocaleTimeString();
				timeSpan.textContent = `Last input at: ${currentTime}`;

				// Save data to localStorage
				localStorage.setItem(input.id, input.value + event.key);
				localStorage.setItem(`time-${input.id.split("-")[1]}`, timeSpan.textContent);
			}
		});

		input.addEventListener("input", () => {
			if (input.value === "") {
				input.style.borderColor = "";
				const timeSpan = document.querySelector(`#time-${input.id.split("-")[1]}`);
				timeSpan.textContent = "";

				// Remove data from localStorage
				localStorage.removeItem(input.id);
				localStorage.removeItem(`time-${input.id.split("-")[1]}`);
			} else {
				// Update localStorage with the current value
				localStorage.setItem(input.id, input.value);
			}
		});
	});
});
