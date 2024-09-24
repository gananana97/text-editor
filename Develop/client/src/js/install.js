const installBtn = document.getElementById('buttonInstall');
let deferredPrompt;

// Listen for the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (e) => {
    console.log('beforeinstallprompt event fired');
  // Prevent the mini-infobar from appearing
  e.preventDefault();
  // Store the event for triggering it later
  deferredPrompt = e;
  // Unhide the install button
  installBtn.classList.remove('hidden');

  installBtn.addEventListener('click', () => {
    // Hide the button once clicked
    installBtn.classList.add('hidden');
    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      // Clear the deferredPrompt so it can only be used once
      deferredPrompt = null;
    });
  });
});

// Listen for the appinstalled event
window.addEventListener('appinstalled', (evt) => {
  console.log('PWA was installed');
});