(async function () {
  "use strict";

  const RAW_BASE = "https://github.com/microsoft/MNW/raw/main";

  // ── Load manifest ──
  const resp = await fetch("manifest.json");
  const manifest = await resp.json();
  const generators = manifest.generators;
  const stats = manifest.stats;

  // ── Render stats ──
  document.getElementById("stats").innerHTML = [
    `<div class="stat-item"><strong>${stats.total_generators}</strong> generators</div>`,
    `<div class="stat-item"><strong>${stats.total_files.toLocaleString()}</strong> files</div>`,
    `<div class="stat-item"><strong>${stats.categories["AI Generated"]?.toLocaleString() || 0}</strong> AI-generated</div>`,
    `<div class="stat-item"><strong>${stats.categories["Deepfake"]?.toLocaleString() || 0}</strong> deepfake</div>`,
  ].join("");

  // ── Build filter controls ──
  const categories = [...new Set(Object.values(generators).map((g) => g.category))].sort();
  const mediaTypes = [...new Set(Object.values(generators).map((g) => g.subcategory))].sort();
  const years = [...new Set(Object.values(generators).map((g) => g.year).filter(Boolean))].sort();
  const companies = stats.companies;

  const categoryEl = document.getElementById("category-filters");
  categories.forEach((cat) => {
    categoryEl.innerHTML += `<label><input type="checkbox" value="${cat}" checked> ${cat}</label>`;
  });

  const mediaEl = document.getElementById("media-filters");
  mediaTypes.forEach((mt) => {
    mediaEl.innerHTML += `<label><input type="checkbox" value="${mt}" checked> ${mt}</label>`;
  });

  const yearMinEl = document.getElementById("year-min");
  const yearMaxEl = document.getElementById("year-max");
  yearMinEl.innerHTML = `<option value="">Any</option>` + years.map((y) => `<option value="${y}">${y}</option>`).join("");
  yearMaxEl.innerHTML = `<option value="">Any</option>` + years.map((y) => `<option value="${y}">${y}</option>`).join("");

  const companyEl = document.getElementById("company-filter");
  companies.forEach((c) => {
    companyEl.innerHTML += `<option value="${c}">${c}</option>`;
  });

  // ── Badge class ──
  function badgeClass(category) {
    if (category === "AI Generated") return "badge-ai-generated";
    if (category === "Deepfake") return "badge-deepfake";
    return "badge-in-the-wild";
  }

  // ── Media type icon ──
  function mediaIcon(subcategory) {
    switch (subcategory) {
      case "Image": return "🖼️";
      case "Video": return "🎬";
      case "Audio": return "🔊";
      default: return "📁";
    }
  }

  // ── Render generator cards ──
  const container = document.getElementById("generators");

  function renderCards(filtered) {
    container.innerHTML = "";
    const entries = Object.entries(filtered);
    document.getElementById("result-count").textContent = `${entries.length} generator${entries.length !== 1 ? "s" : ""} found`;

    if (entries.length === 0) {
      container.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:3rem;color:var(--text-muted);">No generators match your filters.</div>`;
      return;
    }

    entries.forEach(([key, gen]) => {
      const card = document.createElement("div");
      card.className = "generator-card";
      card.dataset.key = key;

      // Preview thumbnails (only for images)
      let previewHtml = "";
      if (gen.subcategory === "Image" && gen.sample_files.length > 0) {
        const thumbs = gen.sample_files.slice(0, 4).map((f) => {
          const url = `${RAW_BASE}/${encodeURIComponent(f.path).replace(/%2F/g, "/")}`;
          return `<img class="thumb" src="${url}" alt="${f.filename}" loading="lazy" onerror="this.parentElement.removeChild(this)">`;
        });
        previewHtml = `<div class="card-preview">${thumbs.join("")}</div>`;
      } else if (gen.subcategory === "Video") {
        previewHtml = `<div class="card-preview"><div class="thumb-placeholder">🎬</div></div>`;
      } else if (gen.subcategory === "Audio") {
        previewHtml = `<div class="card-preview"><div class="thumb-placeholder">🔊</div></div>`;
      } else {
        previewHtml = `<div class="card-preview"><div class="thumb-placeholder">📁</div></div>`;
      }

      card.innerHTML = `
        <div class="card-header">
          <span class="card-name">${gen.display_name}</span>
          <span class="card-badge ${badgeClass(gen.category)}">${gen.category}</span>
        </div>
        <div class="card-meta">
          <span>${mediaIcon(gen.subcategory)} ${gen.subcategory}</span>
          ${gen.year ? `<span>📅 ${gen.year}</span>` : ""}
          <span>🏢 ${gen.company}</span>
          ${gen.github ? `<span>🔗</span>` : ""}
        </div>
        ${gen.description ? `<div class="card-desc">${gen.description}</div>` : ""}
        ${previewHtml}
        <div class="card-file-count">${gen.total_files.toLocaleString()} file${gen.total_files !== 1 ? "s" : ""}</div>
      `;

      card.addEventListener("click", () => openModal(key, gen));
      container.appendChild(card);
    });
  }

  // ── Filter logic ──
  function getFiltered() {
    const searchVal = document.getElementById("search").value.toLowerCase();
    const checkedCats = [...categoryEl.querySelectorAll("input:checked")].map((i) => i.value);
    const checkedMedia = [...mediaEl.querySelectorAll("input:checked")].map((i) => i.value);
    const yMin = yearMinEl.value ? parseInt(yearMinEl.value) : null;
    const yMax = yearMaxEl.value ? parseInt(yearMaxEl.value) : null;
    const company = companyEl.value;

    const result = {};
    for (const [key, gen] of Object.entries(generators)) {
      if (searchVal && !gen.display_name.toLowerCase().includes(searchVal) && !gen.company.toLowerCase().includes(searchVal)) continue;
      if (!checkedCats.includes(gen.category)) continue;
      if (!checkedMedia.includes(gen.subcategory)) continue;
      if (yMin && (!gen.year || gen.year < yMin)) continue;
      if (yMax && (!gen.year || gen.year > yMax)) continue;
      if (company && gen.company !== company) continue;
      result[key] = gen;
    }
    return result;
  }

  function applyFilters() {
    renderCards(getFiltered());
  }

  // Wire events
  document.getElementById("search").addEventListener("input", applyFilters);
  categoryEl.addEventListener("change", applyFilters);
  mediaEl.addEventListener("change", applyFilters);
  yearMinEl.addEventListener("change", applyFilters);
  yearMaxEl.addEventListener("change", applyFilters);
  companyEl.addEventListener("change", applyFilters);

  document.getElementById("reset-filters").addEventListener("click", () => {
    document.getElementById("search").value = "";
    categoryEl.querySelectorAll("input").forEach((i) => (i.checked = true));
    mediaEl.querySelectorAll("input").forEach((i) => (i.checked = true));
    yearMinEl.value = "";
    yearMaxEl.value = "";
    companyEl.value = "";
    applyFilters();
  });

  // View toggle
  const gridBtn = document.getElementById("view-grid");
  const listBtn = document.getElementById("view-list");
  gridBtn.addEventListener("click", () => {
    container.className = "generators grid-view";
    gridBtn.classList.add("active");
    listBtn.classList.remove("active");
  });
  listBtn.addEventListener("click", () => {
    container.className = "generators list-view";
    listBtn.classList.add("active");
    gridBtn.classList.remove("active");
  });

  // ── Modal ──
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modal-title");
  const modalMeta = document.getElementById("modal-meta");
  const modalMedia = document.getElementById("modal-media");

  function openModal(key, gen) {
    modalTitle.textContent = gen.display_name;
    modalMeta.innerHTML = `
      <span>${gen.category}</span>
      <span>${gen.subcategory}</span>
      ${gen.year ? `<span>Year: ${gen.year}</span>` : ""}
      <span>Company: ${gen.company}</span>
      <span>${gen.total_files.toLocaleString()} total files</span>
      <span>(showing up to 10 samples)</span>
      ${gen.github ? `<br><a href="${gen.github}" target="_blank" class="modal-link">🔗 GitHub / Model page</a>` : ""}
      ${gen.description ? `<br><em>${gen.description}</em>` : ""}
    `;

    modalMedia.innerHTML = "";
    gen.sample_files.forEach((f) => {
      const url = `${RAW_BASE}/${encodeURIComponent(f.path).replace(/%2F/g, "/")}`;
      const item = document.createElement("div");
      item.className = "media-item";

      if (f.type === "image") {
        item.innerHTML = `
          <img src="${url}" alt="${f.filename}" loading="lazy">
          <div class="media-label" title="${f.filename}">${f.filename}</div>
        `;
      } else if (f.type === "video") {
        item.innerHTML = `
          <video controls preload="metadata" src="${url}"></video>
          <div class="media-label" title="${f.filename}">${f.filename}</div>
        `;
      } else if (f.type === "audio") {
        item.innerHTML = `
          <div class="audio-card">
            <div class="audio-icon">🔊</div>
            <audio controls preload="metadata" src="${url}"></audio>
          </div>
          <div class="media-label" title="${f.filename}">${f.filename}</div>
        `;
      }

      modalMedia.appendChild(item);
    });

    modal.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = "";
    // Stop any playing media
    modalMedia.querySelectorAll("video, audio").forEach((el) => {
      el.pause();
      el.removeAttribute("src");
    });
  }

  modal.querySelector(".modal-overlay").addEventListener("click", closeModal);
  modal.querySelector(".modal-close").addEventListener("click", closeModal);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) closeModal();
  });

  // ── Initial render ──
  renderCards(generators);
})();
