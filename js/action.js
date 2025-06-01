const languageData = {
	en: english,
	de: german
};

// Save the original DOM tree
const originalResume = document.getElementById("resume").cloneNode(true);

function replacePlaceholders(node, data) {
	if (node.nodeType === Node.TEXT_NODE) {
		let text = node.nodeValue;
		// Check if there are placeholders
		if (text.match(/{{(\w+)}}/)) {
			// Get the matching key
			text = text.replace(/{{(\w+)}}/g, (match, key) => data[key] || match);
			//  Determine if HTML tags are included
			if (text !== node.nodeValue && /<[^>]+>/.test(text)) {
				//  If HTML is included after replacement, replace the parent node's innerHTML
				node.parentNode.innerHTML = text;
			} else {
				//  replace with plain text
				node.nodeValue = text;
			}
		}
	} else if (node.nodeType === Node.ELEMENT_NODE) {
		for (let child of Array.from(node.childNodes)) {  
			replacePlaceholders(child, data);
		}
	}
}

function switchLanguage(lang) {
	// Clone the original DOM to avoid multiple replacements causing failure
	const newResume = originalResume.cloneNode(true);
	replacePlaceholders(newResume, languageData[lang]);
	const resumeContainer = document.getElementById("resume");
	resumeContainer.replaceWith(newResume);
	newResume.id = "resume";  // Reset the id
}

// Default to displaying german
switchLanguage('de');
