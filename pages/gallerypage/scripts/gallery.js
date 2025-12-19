(function () {
  // Find app-container hvor galleriet rendres
  const app = document.getElementById('gallery-app');

  // Stier til assets (relative til gallerypage.html)
  const ASSETS = {
    // Brug dine egne filer her:
    arrowLeft: './scripts/arrow-left.png',
    arrowRight: './scripts/arrow-right.png',
    json: '../../shared/scripts/img_urls.json',
  };

  // Simpelt state: liste af billeder og aktuelt indeks
  let urls = [];
  let current = 0;

  // Track selected destination (null = alle)
  let filterDest = null;

  // Lyt til breakpoint og re-render ved skærmbreddeskift
  const mql = window.matchMedia('(min-width: 1024px)');
  mql.addEventListener('change', render);

  // Hent billed-URLs og start appen
  fetch(ASSETS.json)
    .then(r => r.json())
    .then(data => {
      // Understøtter både arrays, {urls:[]}, og {images:[{img,thumb}]}
      if (Array.isArray(data)) {
        urls = data.map(u => ({ img: u, thumb: u, dest: null }));
      } else if (Array.isArray(data.images)) {
        urls = data.images
          .map(it => ({
            img: it.img || it.url || it.src,
            thumb: it.thumb || it.thumbnail || it.img || it.url || it.src,
            dest: it.dest || null,
          }))
          .filter(it => !!it.img);
      } else if (Array.isArray(data.urls)) {
        urls = data.urls.map(u => ({ img: u, thumb: u, dest: null }));
      } else {
        // Kort og klar fejlbesked hvis format er forkert
        throw new Error('img_urls.json er tom eller forkert format.');
      }
      if (!urls.length) throw new Error('Ingen gyldige billeder fundet.');
      render();
    })
    .catch(err => {
      // Vis fejl i UI så brugeren får feedback
      app.innerHTML = `<p style="color:#b00">Kunne ikke indlæse billeder: ${err.message}</p>`;
    });

  function render() {
    // Ryd og genopbyg UI på hver render
    const desktop = window.matchMedia('(min-width: 1024px)').matches;
    app.innerHTML = '';

    // Titel + filter-knapper container
    const titleBar = document.createElement('div');
    titleBar.className = 'title-bar';

    const title = document.createElement('h1');
    title.className = 'page-title';
    title.textContent = 'STREET ART GALLERY';

    const filterWrap = document.createElement('div');
    filterWrap.className = 'gallery-filter';

    const btnKarolinelund = document.createElement('button');
    btnKarolinelund.type = 'button';
    btnKarolinelund.className = 'filter-btn';
    btnKarolinelund.textContent = 'Karolinelund';
    btnKarolinelund.addEventListener('click', () => {
      filterDest = 'karolinelund';
      current = 0;
      updateAll();
      updateFilterUI();
    });

    const btnAkkc = document.createElement('button');
    btnAkkc.type = 'button';
    btnAkkc.className = 'filter-btn';
    btnAkkc.textContent = 'AKKC';
    btnAkkc.addEventListener('click', () => {
      filterDest = 'akkc';
      current = 0;
      updateAll();
      updateFilterUI();
    });

    filterWrap.appendChild(btnKarolinelund);
    filterWrap.appendChild(btnAkkc);

    titleBar.appendChild(title);
    titleBar.appendChild(filterWrap);
    app.appendChild(titleBar);

    // Viewer med stort billede, indikator og pile
    const viewer = document.createElement('div');
    viewer.className = 'viewer';

    const big = document.createElement('img');
    big.className = 'big-image';
    big.alt = 'Street art billede';
    viewer.appendChild(big);

    // Indikator for aktivt billede
    const indicator = document.createElement('div');
    indicator.className = 'indicator';
    viewer.appendChild(indicator);

    // Navigationspile (forrige/næste)
    const leftBtn = makeArrow('left', ASSETS.arrowLeft, () => step(-1));
    const rightBtn = makeArrow('right', ASSETS.arrowRight, () => step(1));
    viewer.appendChild(leftBtn);
    viewer.appendChild(rightBtn);

    // Container til thumbnails under det store billede
    const thumbsWrap = document.createElement('div');
    thumbsWrap.className = 'thumbs';

    app.appendChild(viewer);
    app.appendChild(thumbsWrap);

    // Aktiv liste (afhænger af filter)
    let active = [];

    function getActiveList() {
      return filterDest ? urls.filter(u => u.dest === filterDest) : urls;
    }

    function updateFilterUI() {
      btnKarolinelund.classList.toggle('active', filterDest === 'karolinelund');
      btnAkkc.classList.toggle('active', filterDest === 'akkc');
    }

    function updateAll() {
      active = getActiveList();
      if (!active.length) {
        big.src = '';
        indicator.textContent = '0/0';
        thumbsWrap.innerHTML = '<p style="margin:8px 0">Ingen billeder for valgt kategori.</p>';
        return;
      }
      // Sørg for current er i bounds for aktiv liste
      current = Math.min(current, active.length - 1);
      updateBig();
      updateIndicator();
      renderThumbs();
    }

    function step(dir) {
      current = (current + dir + active.length) % active.length;
      updateAll();
    }

    function updateBig() {
      big.src = active[current].img;
    }

    function updateIndicator() {
      indicator.textContent = `${current + 1}/${active.length}`;
    }

    function renderThumbs() {
      thumbsWrap.innerHTML = '';

      const desktop = window.matchMedia('(min-width: 1024px)').matches;

      if (!desktop) {
        // Mobil: 2 store venstre, 6 små højre (8 pr. gruppe)
        thumbsWrap.classList.remove('parent', 'thumbs-grid');
        thumbsWrap.classList.add('thumbs', 'thumbs-mobile');

        const leftCol = document.createElement('div');
        leftCol.className = 'thumbs-left';
        const rightCol = document.createElement('div');
        rightCol.className = 'thumbs-right';

        const groupSize = 8; // 2 + 6
        const count = Math.min(active.length, groupSize);
        const base = Math.floor(current / groupSize) * groupSize;

        for (let i = 0; i < count; i++) {
          const idx = (base + i) % active.length;
          const t = document.createElement('button');
          t.className = 'thumb';
          t.type = 'button';
          t.dataset.index = String(idx);
          if (idx === current) t.classList.add('selected');

          const img = document.createElement('img');
          img.src = active[idx].thumb || active[idx].img;
          img.loading = 'lazy';
          img.alt = `Thumbnail ${idx + 1}`;
          t.appendChild(img);

          // Klik sætter aktuelt billede og opdaterer UI
          t.addEventListener('click', () => {
            current = idx;
            updateBig();
            updateIndicator();
            renderThumbs();
          });

          if (i < 2) leftCol.appendChild(t);
          else rightCol.appendChild(t);
        }

        thumbsWrap.appendChild(leftCol);
        thumbsWrap.appendChild(rightCol);
        return;
      }

      // Desktop: 10-felts mosaik med faste områder
      thumbsWrap.classList.remove('thumbs-mobile');
      thumbsWrap.classList.add('parent', 'thumbs-grid');

      const positions = ['div1','div2','div3','div4','div5','div6','div7','div8','div9','div10'];
      const groupSize = positions.length;
      const count = Math.min(active.length, groupSize);
      const base = Math.floor(current / groupSize) * groupSize;

      for (let i = 0; i < count; i++) {
        const idx = (base + i) % active.length;
        const t = document.createElement('button');
        t.className = `thumb ${positions[i]}`;
        t.type = 'button';
        t.dataset.index = String(idx);
        if (idx === current) t.classList.add('selected');

        const img = document.createElement('img');
        img.src = active[idx].thumb || active[idx].img;
        img.loading = 'lazy';
        img.alt = `Thumbnail ${idx + 1}`;
        t.appendChild(img);

        // Klik sætter aktuelt billede og opdaterer UI
        t.addEventListener('click', () => {
          current = idx;
          updateBig();
          updateIndicator();
          renderThumbs();
        });

        thumbsWrap.appendChild(t);
      }

      // Grid-nav pile (skifter 10 ad gangen)
      const groupLeft = makeArrow('left', ASSETS.arrowLeft, () => groupStep(-1));
      const groupRight = makeArrow('right', ASSETS.arrowRight, () => groupStep(1));
      thumbsWrap.appendChild(groupLeft);
      thumbsWrap.appendChild(groupRight);
    }

    // Skift gruppe (10 billeder frem/tilbage)
    function groupStep(dir) {
      const groupSize = 10;
      const base = Math.floor(current / groupSize) * groupSize;
      current = (base + dir * groupSize + active.length) % active.length;
      updateAll();
    }

    // Initial render: vis alle billeder (filterDest === null)
    updateAll();
    updateFilterUI();
  }

  // Hjælper til at bygge pil-knapperne
  function makeArrow(side, src, onClick) {
    const btn = document.createElement('button');
    btn.className = `arrow arrow-${side}`;
    btn.type = 'button';
    const img = document.createElement('img');
    img.src = src;
    img.alt = side === 'left' ? 'Forrige' : 'Næste';
    btn.appendChild(img);
    // Knap klik handler (delegér logik via callback)
    btn.addEventListener('click', onClick);
    return btn;
  }
})();
