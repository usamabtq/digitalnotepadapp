// Load note from localStorage on page load
window.onload = function () {
  const saved = localStorage.getItem("note");
  if (saved) {
    document.getElementById("noteInput").innerText = saved;
    updateWordCount();
    updateTimestamp(); // Update timestamp on load
  }
};

// Theme toggle
function toggleTheme() {
  document.body.classList.toggle("dark-mode");
}

// Auto-save to localStorage
function autoSave() {
  const note = document.getElementById("noteInput").innerText;
  localStorage.setItem("note", note);

  // Update autosave indicator
  document.getElementById("autosave-indicator").textContent = "Saved ✔";
  
  // Reset the "Saved" indicator after a delay
  setTimeout(function() {
    document.getElementById("autosave-indicator").textContent = "Saving...";
  }, 1000);

  // Update the timestamp of last edit
  updateTimestamp();
}

// Word & character counter
function updateWordCount() {
  const noteInput = document.getElementById("noteInput");
  const text = noteInput.textContent.trim();
  const words = text.split(/\s+/).filter(Boolean).length;
  const chars = text.length;

  document.getElementById("wordCount").textContent = `Words: ${words}`;
  document.getElementById("charCount").textContent = `Characters: ${chars}`;
}

// Update the last edited timestamp
function updateTimestamp() {
  const currentDate = new Date();
  const formattedTime = currentDate.toLocaleString();
  document.getElementById("timestamp").textContent = `Last Edited: ${formattedTime}`;
}

// Download note as .txt file
function downloadNote() {
  const note = document.getElementById("noteInput").innerText;
  const blob = new Blob([note], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "note.txt";
  a.click();

  URL.revokeObjectURL(url);
}
