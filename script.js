document.querySelectorAll(".cert-thumb").forEach(function(b){b.dataset.full=b.querySelector("img").src;});

/* ============ SETTINGS (edit these) ============ */
// Contact form opens the visitor's email app addressed to this email.
const CONTACT_EMAIL = "muqaddasalam999@gmail.com";
/* ================================================ */

(function () {
    "use strict";
    document.body.classList.remove("no-js");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ---- Mobile menu ----
    const toggle = document.getElementById("menuToggle");
    const nav = document.getElementById("navLinks");
    const closeMenu = () => {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
    };
    toggle.addEventListener("click", () => {
        const open = nav.classList.toggle("open");
        toggle.setAttribute("aria-expanded", String(open));
    });
    nav.querySelectorAll("a").forEach(a => a.addEventListener("click", closeMenu));

    // ---- Active nav link on scroll ----
    const links = [...nav.querySelectorAll("a")];
    const sections = links.map(a => document.querySelector(a.getAttribute("href"))).filter(Boolean);
    if ("IntersectionObserver" in window) {
        const spy = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id));
                }
            });
        }, { rootMargin: "-45% 0px -50% 0px" });
        sections.forEach(s => spy.observe(s));

        // ---- Scroll reveal ----
        const io = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); const t = e.target; setTimeout(() => { t.style.transitionDelay = ""; }, 1600); }
            });
        }, { threshold: 0.12 });
        document.querySelectorAll(".reveal").forEach(el => io.observe(el));
    } else {
        document.querySelectorAll(".reveal").forEach(el => el.classList.add("visible"));
    }

    // ---- Certificate filters ----
    const buttons = document.querySelectorAll(".filter-btn");
    const cards = document.querySelectorAll(".cert-card");
    function applyFilter(f) {
        buttons.forEach(b => b.classList.toggle("active", b.dataset.filter === f));
        cards.forEach(c => {
            const show = f === "all" || c.dataset.cat === f;
            c.classList.toggle("hide", !show);
            if (show) c.classList.add("visible");
        });
    }
    buttons.forEach(b => b.addEventListener("click", () => applyFilter(b.dataset.filter)));
    document.querySelectorAll("[data-filter-link]").forEach(a =>
        a.addEventListener("click", () => applyFilter(a.dataset.filterLink)));

    // ---- Lightbox ----
    const lb = document.getElementById("lightbox");
    const lbImg = document.getElementById("lbImg");
    const lbCap = document.getElementById("lbCap");
    const openLb = btn => {
        lbImg.src = btn.dataset.full;
        lbImg.alt = btn.dataset.title;
        lbCap.textContent = btn.dataset.title;
        lb.hidden = false;
        document.body.style.overflow = "hidden";
    };
    const closeLb = () => { lb.hidden = true; lbImg.src = ""; document.body.style.overflow = ""; };
    document.querySelectorAll(".cert-thumb").forEach(b => b.addEventListener("click", () => openLb(b)));
    lb.addEventListener("click", closeLb);
    document.addEventListener("keydown", e => { if (e.key === "Escape" && !lb.hidden) closeLb(); });


    // ---- Stagger reveal inside grids ----
    document.querySelectorAll(".skills-grid,.projects-grid,.exp-grid,.certificates-grid,.about-info").forEach(g =>
        [...g.children].forEach((c, i) => c.style.transitionDelay = (i % 3) * 110 + "ms"));

    // ---- Scroll progress bar ----
    const bar = document.getElementById("progress");
    const onScroll = () => {
        const h = document.documentElement;
        bar.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight) * 100) + "%";
    };
    window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

    // ---- Typing effect ----
    const typed = document.getElementById("typed");
    const words = ["responsive websites", "clean front-end designs", "C & C++ programs", "things people love to use"];
    if (typed && !reduce) {
        let w = 0, c = 0, del = false;
        const tick = () => {
            const word = words[w];
            typed.textContent = word.slice(0, c);
            if (!del && c < word.length) { c++; setTimeout(tick, 70); }
            else if (!del) { del = true; setTimeout(tick, 1400); }
            else if (c > 0) { c--; setTimeout(tick, 35); }
            else { del = false; w = (w + 1) % words.length; setTimeout(tick, 300); }
        };
        typed.textContent = ""; tick();
    }

    // ---- Counters ----
    const counters = document.querySelectorAll("[data-count]");
    if ("IntersectionObserver" in window && !reduce) {
        const co = new IntersectionObserver(es => es.forEach(e => {
            if (!e.isIntersecting) return;
            co.unobserve(e.target);
            const end = +e.target.dataset.count; let n = 0;
            const step = () => { n++; e.target.textContent = n; if (n < end) setTimeout(step, 1000 / end / 1.4); };
            e.target.textContent = 0; step();
        }), { threshold: .6 });
        counters.forEach(c => co.observe(c));
    }

    // ---- Card spotlight (follows mouse) ----
    document.querySelectorAll(".info-box,.skill-card,.project-card,.cert-card,.exp-card").forEach(card => {
        card.addEventListener("pointermove", e => {
            const r = card.getBoundingClientRect();
            card.style.setProperty("--mx", (e.clientX - r.left) + "px");
            card.style.setProperty("--my", (e.clientY - r.top) + "px");
        });
    });

    // ---- Profile 3D tilt + cursor glow ----
    if (window.matchMedia("(hover: hover)").matches && !reduce) {
        const pc = document.querySelector(".profile-card");
        if (pc) {
            pc.addEventListener("pointermove", e => {
                const r = pc.getBoundingClientRect();
                const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
                pc.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-4px)`;
            });
            pc.addEventListener("pointerleave", () => pc.style.transform = "");
        }
        const bgText = document.getElementById("bgText");
        const heroEl = document.getElementById("home");
        if (bgText && heroEl) {
            heroEl.addEventListener("pointermove", e => {
                const x = (e.clientX / window.innerWidth - .5) * 2;
                bgText.style.transform = `translateX(calc(-50% + ${x * -18}px))`;
            });
        }
        const glow = document.getElementById("cursorGlow");
        window.addEventListener("pointermove", e => {
            glow.style.opacity = 1;
            glow.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`;
        }, { passive: true });
    }


    // ---- Skill boxes light up in the middle of the screen ----
    const skillBoxes = document.querySelectorAll(".skill-box");
    skillBoxes.forEach(b => b.querySelectorAll(".pills span").forEach((p, i) => p.style.setProperty("--i", i)));
    if ("IntersectionObserver" in window) {
        const so = new IntersectionObserver(es => es.forEach(e => e.target.classList.toggle("reached", e.isIntersecting)),
            { rootMargin: "-40% 0px -40% 0px" });
        skillBoxes.forEach(b => so.observe(b));

        // ---- Project videos play only while visible ----
        const vo = new IntersectionObserver(es => es.forEach(e => {
            if (e.isIntersecting) { e.target.play().catch(() => {}); } else { e.target.pause(); }
        }), { threshold: 0.25 });
        document.querySelectorAll("video[data-lazy]").forEach(v => vo.observe(v));
    } else {
        document.querySelectorAll("video[data-lazy]").forEach(v => { v.autoplay = true; });
    }

    // ---- Contact form (opens email app) ----
    const form = document.getElementById("contactForm");
    const note = document.getElementById("formNote");
    const emailEl = document.getElementById("contactEmail");
    if (CONTACT_EMAIL && emailEl) { emailEl.textContent = CONTACT_EMAIL; emailEl.href = "mailto:" + CONTACT_EMAIL; }

    form.addEventListener("submit", e => {
        e.preventDefault();
        if (!CONTACT_EMAIL) {
            note.textContent = "Contact email isn't set up yet — please check back soon.";
            return;
        }
        const d = new FormData(form);
        const body = `${d.get("message")}\n\n— ${d.get("name")} (${d.get("email")})`;
        window.location.href =
            `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(d.get("subject"))}&body=${encodeURIComponent(body)}`;
        note.textContent = "Opening your email app…";
        form.reset();
    });
})();
