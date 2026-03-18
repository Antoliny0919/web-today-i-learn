// ========== TIL 폼 등록 ==========
const tilForm = document.querySelector("#til-form");
const tilList = document.querySelector("#til-list");

tilForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const date = document.querySelector("#til-date").value;
  const title = document.querySelector("#til-title").value;
  const content = document.querySelector("#til-content").value;

  const article = document.createElement("article");
  article.className = "til-item fade-in";

  const timeEl = document.createElement("time");
  timeEl.textContent = date;

  const h3El = document.createElement("h3");
  h3El.textContent = title;

  const pEl = document.createElement("p");
  pEl.textContent = content;

  article.append(timeEl, h3El, pEl);
  tilList.prepend(article);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => article.classList.add("visible"));
  });

  tilForm.reset();
});

// ========== 갤러리 라이트박스 ==========
const lightbox = document.querySelector("#lightbox");
const lightboxImg = document.querySelector("#lightbox-img");
const lightboxClose = document.querySelector("#lightbox-close");

document.querySelectorAll(".gallery-grid img").forEach((img) => {
  const wrapper = document.createElement("div");
  wrapper.className = "gallery-item";

  const overlay = document.createElement("div");
  overlay.className = "gallery-overlay";
  overlay.innerHTML = "<span>&#128269;</span>";

  img.parentNode.insertBefore(wrapper, img);
  wrapper.appendChild(img);
  wrapper.appendChild(overlay);

  wrapper.addEventListener("click", () => {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
  });
});

function closeLightbox() {
  lightbox.classList.remove("open");
  document.body.style.overflow = "";
}

lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});

// ========== 스크롤 시 섹션 페이드인 ==========
const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll(".content-section").forEach((el) => {
  el.classList.add("fade-in");
  fadeObserver.observe(el);
});

// ========== 스크롤 스파이 (활성 네비 링크) ==========
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

const scrollTopBtn = document.querySelector("#scroll-top");

window.addEventListener(
  "scroll",
  () => {
    // 스크롤 상단 버튼 표시
    scrollTopBtn.classList.toggle("visible", window.scrollY > 400);

    // 활성 네비 링크
    const scrollY = window.scrollY;
    sections.forEach((section) => {
      const top = section.offsetTop - 80;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");

      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach((link) => link.classList.remove("active"));
        const active = document.querySelector(`.nav-links a[href="#${id}"]`);
        if (active) active.classList.add("active");
      }
    });
  },
  { passive: true }
);

// ========== 스크롤 상단 이동 ==========
scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
