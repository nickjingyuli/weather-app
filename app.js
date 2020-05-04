window.addEventListener('load', () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(
    '.temperature-description'
  );
  let temperatureDegree = document.querySelector('.temperature-degree');
  let locationTimezone = document.querySelector('.location-timezone');
  let degreeSection = document.querySelector('.degree-section');
  let degreeSpan = document.querySelector('.degree-section span');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => {
      long = pos.coords.longitude;
      lat = pos.coords.latitude;

      const proxy = 'https://cors-anywhere.herokuapp.com/';

      const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;
      fetch(api)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          const { temperature, summary, icon } = data.currently;
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = data.timezone;
          // Set icon
          setIcons(icon, document.querySelector('.icon'));
          let celsius = (temperature - 32) * (5 / 9);
          convertDegree(celsius, temperature);
        });
    });
  }

  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: 'white' });
    const currentIcon = icon.replace(/-/g, '_').toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }

  function convertDegree(celsius, fahrenheit) {
    degreeSection.addEventListener('click', () => {
      if (degreeSpan.textContent === 'F') {
        degreeSpan.textContent = 'C';
        temperatureDegree.textContent = Math.floor(celsius);
      } else {
        degreeSpan.textContent = 'F';
        temperatureDegree.textContent = fahrenheit;
      }
    });
  }
});
