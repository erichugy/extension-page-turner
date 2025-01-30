const debug = true; // Define the debug variable

export function incrementNumberInUrl(url) {
  // Find the last number in the URL
  const matches = url.match(/\d+/g);
  if (matches && matches.length > 0) {
    const lastNumber = matches[matches.length - 1]; // Get the last number
    const newNumber = parseInt(lastNumber, 10) + 1; // Increment the number
    return url.replace(new RegExp(`${lastNumber}(?!.*\\d)`), newNumber); // Replace the last occurrence
  }
  return url; // Return the original URL if no number is found
}

export function decrementNumberInUrl(url) {
  // Find the last number in the URL
  const matches = url.match(/\d+/g);
  if (matches && matches.length > 0) {
    const lastNumber = matches[matches.length - 1]; // Get the last number
    const newNumber = parseInt(lastNumber, 10) - 1; // Decrement the number
    return url.replace(new RegExp(`${lastNumber}(?!.*\\d)`), newNumber); // Replace the last occurrence
  }
  return url; // Return the original URL if no number is found
}

export const getUrl = async () => {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs && tabs[0]) {
        const currentUrl = tabs[0].url;
        if (debug) console.log("Current URL:", currentUrl);
        resolve(currentUrl);
      } else {
        reject(new Error("No active tab found."));
      }
    });
  });
};

export const updateUrl = async (newUrl) => {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs && tabs[0]) {
        if (debug) console.log("Updating URL to:", newUrl);
        chrome.tabs.update(tabs[0].id, { url: newUrl }, () => {
          if (chrome.runtime.lastError) {
            reject(new Error(`Failed to update URL: ${chrome.runtime.lastError.message}`));
          } else {
            resolve();
          }
        });
      } else {
        reject(new Error("No active tab found."));
      }
    });
  });
};