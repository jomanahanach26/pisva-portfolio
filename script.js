const slides = [
  {title:"Radar dashboard",desc:"A prioritized view of what needs attention today."},
  {title:"Responsibilities",desc:"Review ownership requests and explicitly accept or decline a handoff."},
  {title:"Appointments",desc:"See upcoming family appointments, dates, locations and support needs."},
  {title:"Shared notes",desc:"Keep family updates together and link notes to the relevant follow-up."},
  {title:"Family overview",desc:"Manage family spaces, members and access roles."},
  {title:"Appointment detail",desc:"Bring appointment information, accompaniment and related documents together."},
  {title:"Case detail",desc:"Track a responsibility, its owner, follow-up and latest activity."}
];
let current = 0;
const image = document.querySelector("#gallery-image");
const title = document.querySelector("#screen-title");
const desc = document.querySelector("#screen-desc");
const counter = document.querySelector("#counter");
const device = document.querySelector(".gallery-device");
const thumbs = [...document.querySelectorAll(".thumb")];
const dots = document.querySelector(".dots");
slides.forEach((_, i) => {
  const dot = document.createElement("button");
  dot.setAttribute("aria-label", `Show screenshot ${i + 1}`);
  dot.addEventListener("click", () => show(i));
  dots.append(dot);
});
function show(index) {
  current = (index + slides.length) % slides.length;
  device.classList.add("changing");
  window.setTimeout(() => {
    image.src = `assets/pisva-screen-${current + 1}.png`;
    image.alt = `PISVA ${slides[current].title} screen`;
    title.textContent = slides[current].title;
    desc.textContent = slides[current].desc;
    counter.textContent = `${String(current + 1).padStart(2,"0")} / 07`;
    thumbs.forEach((t,i) => t.classList.toggle("active", i === current));
    [...dots.children].forEach((d,i) => d.classList.toggle("active", i === current));
    device.classList.remove("changing");
  }, 180);
}
document.querySelector(".prev").addEventListener("click", () => show(current - 1));
document.querySelector(".next").addEventListener("click", () => show(current + 1));
thumbs.forEach(t => t.addEventListener("click", () => show(Number(t.dataset.index))));
const menu = document.querySelector(".menu");
const nav = document.querySelector("header nav");
menu.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menu.setAttribute("aria-expanded", String(open));
});
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));
show(0);
