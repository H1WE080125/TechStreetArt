(function () {
  // Find app-container hvor galleriet rendres
  const app = document.getElementById('gallery-app');

  // Stier til assets (relative til gallerypage.html)
  const ASSETS = {
    // Brug dine egne filer her:
    arrowLeft: 'pages/gallerypage/assets/arrow left.png',
    arrowRight: 'pages/gallerypage/assets/arrow right.png',
    json: '../../shared/scripts/img_urls.json',
  };

  // Simpelt state: liste af billeder og aktuelt indeks
  let urls = [];
  let current = 0;

  // Lyt til breakpoint og re-render ved skærmbreddeskift
  const mql = window.matchMedia('(min-width: 1024px)');
  mql.addEventListener('change', render);

  // Hent billed-URLs og start appen
  fetch(ASSETS.json)
    .then(r => r.json())
    .then(data => {
      // Understøtter både arrays, {urls:[]}, og {images:[{img,thumb}]}
      if (Array.isArray(data)) {
        urls = data.map(u => ({ img: u, thumb: u }));
      } else if (Array.isArray(data.images)) {
        urls = data.images
          .map(it => ({
            img: it.img || it.url || it.src,
            thumb: it.thumb || it.thumbnail || it.img || it.url || it.src,
          }))
          .filter(it => !!it.img);
      } else if (Array.isArray(data.urls)) {
        urls = data.urls.map(u => ({ img: u, thumb: u }));
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

    // Titel
    const title = document.createElement('h1');
    title.className = 'page-title';
    title.textContent = 'STREET ART GALLERY';
    app.appendChild(title);

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

    updateAll();

    function updateAll() {
      // Synkroniser alle dele af UI
      updateBig();
      updateIndicator();
      renderThumbs();
    }

    function step(dir) {
      // Cirkulær navigation med wrap-around
      current = (current + dir + urls.length) % urls.length;
      updateAll();
    }

    function updateBig() {
      // Opdater kildens URL for stort billede
      big.src = urls[current].img;
    }

    function updateIndicator() {
      // 1-baseret visning af position
      indicator.textContent = `${current + 1}/${urls.length}`;
    }

    function renderThumbs() {
      // Rendrer thumbnail-grupper afhængigt af breakpoint
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
        const count = Math.min(urls.length, groupSize);
        const base = Math.floor(current / groupSize) * groupSize;

        for (let i = 0; i < count; i++) {
          const idx = (base + i) % urls.length;
          const t = document.createElement('button');
          t.className = 'thumb';
          t.type = 'button';
          t.dataset.index = String(idx);
          if (idx === current) t.classList.add('selected');

          const img = document.createElement('img');
          img.src = urls[idx].thumb || urls[idx].img;
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
      const count = Math.min(urls.length, groupSize);
      const base = Math.floor(current / groupSize) * groupSize;

      for (let i = 0; i < count; i++) {
        const idx = (base + i) % urls.length;
        const t = document.createElement('button');
        t.className = `thumb ${positions[i]}`;
        t.type = 'button';
        t.dataset.index = String(idx);
        if (idx === current) t.classList.add('selected');

        const img = document.createElement('img');
        img.src = urls[idx].thumb || urls[idx].img;
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
    }
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
