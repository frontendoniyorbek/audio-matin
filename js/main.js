document.addEventListener('DOMContentLoaded', () => {
	const synth = window.speechSynthesis;

	// Matnni ovoz chiqarib o'qish funksiyasi
	function speak(text) {
		if (synth.speaking) {
			console.error('SpeechSynthesisUtterance is already speaking.');
			return;
		}

		if (text !== '') {
			const utterThis = new SpeechSynthesisUtterance(text);
			utterThis.onend = () => {
				console.log('SpeechSynthesisUtterance.onend');
			};
			utterThis.onerror = event => {
				console.error('SpeechSynthesisUtterance.onerror', event);
			};

			// O'zbekcha ovozni tanlash
			const voices = synth.getVoices();
			let uzbekVoice = null;
			for (let i = 0; i < voices.length; i++) {
				if (voices[i].lang === 'uz-UZ' || voices[i].lang.startsWith('uz')) {
					uzbekVoice = voices[i];
					break;
				}
			}

			// Agar o'zbekcha ovoz topilmasa, inglizcha ovozni tanlash
			if (!uzbekVoice) {
				for (let i = 0; i < voices.length; i++) {
					if (voices[i].lang === 'en-US') {
						uzbekVoice = voices[i];
						break;
					}
				}
			}

			utterThis.voice = uzbekVoice;
			utterThis.pitch = 1;
			utterThis.rate = 1;
			synth.speak(utterThis);
		}
	}

	// Sahifadagi har qanday elementga bosilganda ishlaydigan funksiya
	document.body.addEventListener('click', event => {
		const description = event.target.getAttribute('data-description');
		if (description) {
			speak(description);
		}
	});
});
