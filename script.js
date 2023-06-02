// Handle the drop event
function handleDrop(event) {
  event.preventDefault();
  const items = event.dataTransfer.items;
  convertToSFZ(items);
}

// Convert the files to SFZ format
function convertToSFZ(items) {
  const sfzContent = generateSFZContent(items);
  downloadSFZ(sfzContent);
}

// Generate the SFZ content from the files
function generateSFZContent(items) {
  let sfzContent = '';
  let currentNote = 48; // MIDI note number for C2
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (item.kind === 'file') {
      const file = item.getAsFile();
      sfzContent += `<region> sample=${file.name} key=${currentNote} loop_mode=no_loop\n`;
      currentNote++;
    }
  }
  return sfzContent;
}

// Download the generated SFZ file
function downloadSFZ(sfzContent) {
  const sfzBlob = new Blob([sfzContent], { type: 'text/plain' });
  const sfzURL = URL.createObjectURL(sfzBlob);
  const link = document.createElement('a');
  link.href = sfzURL;
  link.download = 'bweew-kit.sfz';
  link.click();
}

// Prevent the default dragover event
function handleDragOver(event) {
  event.preventDefault();
}

// Add event listeners to the dropzone element
const dropzone = document.getElementById('dropzone');
dropzone.addEventListener('drop', handleDrop);
dropzone.addEventListener('dragover', handleDragOver);
