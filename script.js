// Начальные данные школы
const schoolCenter = [55.6317, 51.8207]; // приблизительные координаты школы №21

// Инициализация карты MapLibre
const map = new maplibregl.Map({
  container: 'map',
  style: 'https://demotiles.maplibre.org/style.json', // открытый стиль
  center: schoolCenter,
  zoom: 17,
  maxZoom: 19,
  minZoom: 15,
  maxBounds: [
    [ schoolCenter[1] - 0.005, schoolCenter[0] - 0.005 ], // минимальные долгота, широта
    [ schoolCenter[1] + 0.005, schoolCenter[0] + 0.005 ]  // максимальные долгота, широта
  ]
});

// Пример точек на карте (локации класса)
const points = [
  {
    coords: [55.6318, 51.8209],
    name: "Класс 1",
    info: "Преподаёт Иванов И.И.",
    panorama: "https://pannellum.org/images/alma.jpg"
  },
  {
    coords: [55.6316, 51.8205],
    name: "Класс 2",
    info: "Преподаёт Петров П.П.",
    panorama: "https://pannellum.org/images/alma.jpg"
  }
];

// Добавляем маркеры
points.forEach(p => {
  const el = document.createElement('div');
  el.className = 'marker';
  el.style.width = '20px';
  el.style.height = '20px';
  el.style.background = 'red';
  el.style.borderRadius = '50%';
  el.style.cursor = 'pointer';

  new maplibregl.Marker(el)
    .setLngLat([p[1], p[0]])
    .addTo(map)
    .getElement()
    .addEventListener('click', () => {
      showLocationInfo(p);
    });
});

// Функция показать информацию + панораму
function showLocationInfo(loc) {
  document.getElementById('info-content').innerHTML = `<h4>${loc.name}</h4><p>${loc.info}</p>`;
  initPanorama(loc);
}

// Панель с панорамой через Pannellum
let panoViewer = null;
let panoramaActive = false;

function initPanorama(loc) {
  panoramaActive = true;
  const pan = document.getElementById('panorama');
  pan.innerHTML = ''; // очистить
  panoViewer = pannellum.viewer('panorama', {
    type: 'equirectangular',
    panorama: loc.panorama,
    autoLoad: true
  });
}

// Кнопка назад (в шапке)
document.getElementById('back-to-main').addEventListener('click', (e) => {
  if (panoramaActive) {
    const confirmExit = confirm("Вы точно хотите завершить просмотр школы и вернуться назад?");
    if (!confirmExit) {
      e.preventDefault();
      return;
    }
    // Уничтожаем панораму
    panoViewer.destroy();
    panoramaActive = false;
  }

  // Можно здесь сделать логику перехода на главную секцию сайта
  // Например, скрыть секцию карты и показать другие секции
});

