const butInstall = document.getElementById('buttonInstall');
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  deferredPrompt = event;
  butInstall.style.display = 'block';

  butInstall.addEventListener('click', async () => {
    if (deferredPrompt !== null) {
      deferredPrompt.prompt();
      const result = await deferredPrompt.userChoice;
      console.log('User choice', result);
      deferredPrompt = null;
    }
    butInstall.style.display = 'none';
  });
});

window.addEventListener('appinstalled', (event) => {
  console.log('App installed', event);
});
