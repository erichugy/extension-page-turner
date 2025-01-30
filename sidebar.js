import { getUrl, updateUrl, incrementNumberInUrl, decrementNumberInUrl } from "./utils.js";
const debug = true;

document.getElementById("increment").addEventListener("click", async () => {
  try {
    if (debug) console.log("Increment button clicked!");
    const currentUrl = await getUrl();
    const newUrl = incrementNumberInUrl(currentUrl);
    await updateUrl(newUrl);
  } catch (error) {
    console.error(error);
  }
});

document.getElementById("decrement").addEventListener("click", async () => {
  try {
    if (debug) console.log("Decrement button clicked!");
    const currentUrl = await getUrl();
    const newUrl = decrementNumberInUrl(currentUrl);
    await updateUrl(newUrl);
  } catch (error) {
    console.error(error);
  }
});

document.getElementById("close").addEventListener("click", () => {
  chrome.sidePanel.setOptions({ enabled: false });
});
