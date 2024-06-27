document.addEventListener("DOMContentLoaded", () => {
	const inputs = document.querySelectorAll('input[type="number"]');

	// Load saved data from localStorage
	inputs.forEach((input) => {
		const savedValue = localStorage.getItem(input.id);
		const savedTime = localStorage.getItem(`time-${input.id.split("-")[1]}`);
		if (savedValue !== null) {
			input.value = savedValue;
			input.style.borderColor = "var(--highlight-color)";
		}
		if (savedTime !== null) {
			const timeSpan = document.querySelector(`#time-${input.id.split("-")[1]}`);
			timeSpan.textContent = savedTime;
			timeSpan.style.color = "var(--highlight-color)";

			// Schedule the time color change if the saved time exists
			const savedTimestamp = localStorage.getItem(`timestamp-${input.id.split("-")[1]}`);
			if (savedTimestamp !== null) {
				const elapsedTime = Date.now() - parseInt(savedTimestamp, 10);
				if (elapsedTime < 3600000) {
					setTimeout(() => {
						timeSpan.style.color = "var(--alert-color)";
					}, 3600000 - elapsedTime);
				} else {
					timeSpan.style.color = "var(--alert-color)";
				}
			}
		}
	});

	inputs.forEach((input) => {
		input.addEventListener("keypress", (event) => {
			if (!isNaN(event.key) && event.key !== " ") {
				input.style.borderColor = "var(--highlight-color)";
				const timeSpan = document.querySelector(`#time-${input.id.split("-")[1]}`);
				const currentTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
				timeSpan.textContent = `Emprestado às: ${currentTime}`;
				timeSpan.style.color = "var(--highlight-color)";

				const timestamp = Date.now();

				// Save data to localStorage
				localStorage.setItem(input.id, input.value + event.key);
				localStorage.setItem(`time-${input.id.split("-")[1]}`, timeSpan.textContent);
				localStorage.setItem(`timestamp-${input.id.split("-")[1]}`, timestamp);

				// Schedule the time color change
				setTimeout(() => {
					timeSpan.style.color = "var(--alert-color)";
				}, 3600000);
			}
		});

		input.addEventListener("input", () => {
			const timeSpan = document.querySelector(`#time-${input.id.split("-")[1]}`);
			if (input.value === "") {
				input.style.borderColor = "";
				timeSpan.textContent = "Disponível";
				timeSpan.style.color = "";

				// Remove data from localStorage
				localStorage.removeItem(input.id);
				localStorage.removeItem(`time-${input.id.split("-")[1]}`);
				localStorage.removeItem(`timestamp-${input.id.split("-")[1]}`);
			} else {
				// Update localStorage with the current value
				localStorage.setItem(input.id, input.value);
			}
		});
	});
});
