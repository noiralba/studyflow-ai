function validatePrompt(prompt) {
  if (!prompt || typeof prompt !== "string") {
    return {
      error: "Prompt is required and must be a string",
      cleanPrompt: null,
    };
  }

  const cleanPrompt = prompt.trim();

  if (cleanPrompt.length === 0) {
    return {
      error: "Prompt cannot be empty",
      cleanPrompt: null,
    };
  }

  if (cleanPrompt.length > 200) {
    return {
      error: "Prompt is too long. Max 200 characters allowed.",
      cleanPrompt: null,
    };
  }

  const blockedWords = ["hack", "password", "bypass"];
  const lowerPrompt = cleanPrompt.toLowerCase();

  const containsBlockedWord = blockedWords.some(function (word) {
    return lowerPrompt.includes(word);
  });

  if (containsBlockedWord) {
    return {
      error: "Prompt contains restricted content",
      cleanPrompt: null,
    };
  }

  return {
    error: null,
    cleanPrompt,
  };
}

module.exports = validatePrompt;
