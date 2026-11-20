// Railway Ticket Tracker — demo data only.
// Sample timetable & sample fares. Always check eticket.railway.gov.bd for live booking.
const STATIONS = ["Dhaka", "Rajshahi", "Rangpur", "Bogura (Santahar)", "Chattogram", "Sylhet", "Khulna"];

// fares are SAMPLE per-person fares in BDT by class
const TRAINS = [
  { name: "Dhumketu Express", no: "769", from: "Dhaka", to: "Rajshahi", dep: "06:00", arr: "11:50", dur: "5h 50m", off: ["Friday"], fares: { "Shovon": 295, "Shovon Chair": 340, "AC Chair": 640, "Snigdha": 540, "AC Berth": 980 } },
  { name: "Silk City Express", no: "753", from: "Dhaka", to: "Rajshahi", dep: "14:45", arr: "20:35", dur: "5h 50m", off: ["Sunday"], fares: { "Shovon": 295, "Shovon Chair": 340, "AC Chair": 640, "Snigdha": 540, "AC Berth": 980 } },
  { name: "Padma Express", no: "759", from: "Dhaka", to: "Rajshahi", dep: "23:00", arr: "04:40", dur: "5h 40m", off: ["Tuesday"], fares: { "Shovon": 295, "Shovon Chair": 340, "AC Chair": 640, "Snigdha": 540, "AC Berth": 980 } },
  { name: "Banalata Express", no: "791", from: "Dhaka", to: "Rajshahi", dep: "13:30", arr: "19:20", dur: "5h 50m", off: ["Friday"], fares: { "Shovon": 295, "Shovon Chair": 340, "AC Chair": 640, "Snigdha": 540, "AC Berth": 980 } },
  { name: "Dhumketu Express", no: "770", from: "Rajshahi", to: "Dhaka", dep: "06:00", arr: "11:40", dur: "5h 40m", off: ["Saturday"], fares: { "Shovon": 295, "Shovon Chair": 340, "AC Chair": 640, "Snigdha": 540, "AC Berth": 980 } },
  { name: "Silk City Express", no: "754", from: "Rajshahi", to: "Dhaka", dep: "07:40", arr: "13:30", dur: "5h 50m", off: ["Sunday"], fares: { "Shovon": 295, "Shovon Chair": 340, "AC Chair": 640, "Snigdha": 540, "AC Berth": 980 } },
  { name: "Rangpur Express", no: "771", from: "Dhaka", to: "Rangpur", dep: "09:10", arr: "19:05", dur: "9h 55m", off: ["Monday"], fares: { "Shovon": 445, "Shovon Chair": 505, "AC Chair": 940, "Snigdha": 810, "AC Berth": 1440 } },
  { name: "Rangpur Express", no: "772", from: "Rangpur", to: "Dhaka", dep: "20:10", arr: "06:05", dur: "9h 55m", off: ["Sunday"], fares: { "Shovon": 445, "Shovon Chair": 505, "AC Chair": 940, "Snigdha": 810, "AC Berth": 1440 } },
  { name: "Lalmoni Express", no: "751", from: "Dhaka", to: "Rangpur", dep: "21:45", arr: "07:30", dur: "9h 45m", off: ["Friday"], fares: { "Shovon": 445, "Shovon Chair": 505, "AC Chair": 940, "Snigdha": 810, "AC Berth": 1440 } },
  { name: "Drutojan Express", no: "757", from: "Dhaka", to: "Bogura (Santahar)", dep: "20:00", arr: "02:10", dur: "6h 10m", off: ["Wednesday"], fares: { "Shovon": 305, "Shovon Chair": 355, "AC Chair": 670, "Snigdha": 565, "AC Berth": 1020 } },
  { name: "Ekota Express", no: "705", from: "Dhaka", to: "Bogura (Santahar)", dep: "10:10", arr: "16:20", dur: "6h 10m", off: ["Tuesday"], fares: { "Shovon": 305, "Shovon Chair": 355, "AC Chair": 670, "Snigdha": 565, "AC Berth": 1020 } },
  { name: "Drutojan Express", no: "758", from: "Bogura (Santahar)", to: "Dhaka", dep: "07:20", arr: "13:30", dur: "6h 10m", off: ["Wednesday"], fares: { "Shovon": 305, "Shovon Chair": 355, "AC Chair": 670, "Snigdha": 565, "AC Berth": 1020 } },
  { name: "Subarna Express", no: "701", from: "Dhaka", to: "Chattogram", dep: "07:30", arr: "12:45", dur: "5h 15m", off: ["Monday"], fares: { "Shovon": 320, "Shovon Chair": 365, "AC Chair": 690, "Snigdha": 580, "AC Berth": 1050 } },
  { name: "Mohanagar Express", no: "721", from: "Dhaka", to: "Chattogram", dep: "21:20", arr: "04:30", dur: "7h 10m", off: ["Sunday"], fares: { "Shovon": 320, "Shovon Chair": 365, "AC Chair": 690, "Snigdha": 580, "AC Berth": 1050 } },
  { name: "Subarna Express", no: "702", from: "Chattogram", to: "Dhaka", dep: "07:30", arr: "12:40", dur: "5h 10m", off: ["Monday"], fares: { "Shovon": 320, "Shovon Chair": 365, "AC Chair": 690, "Snigdha": 580, "AC Berth": 1050 } },
];

const POPULAR = [
  ["Dhaka", "Rajshahi"], ["Rajshahi", "Dhaka"],
  ["Dhaka", "Rangpur"], ["Rangpur", "Dhaka"],
  ["Dhaka", "Bogura (Santahar)"], ["Bogura (Santahar)", "Dhaka"],
  ["Dhaka", "Chattogram"], ["Chattogram", "Dhaka"],
];

const $ = (id) => document.getElementById(id);
const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) || d; } catch { return d; } };
const save = (k, v) => localStorage.setItem(k, JSON.stringify(v));

function dayName(dateStr) {
  return new Date(dateStr + "T12:00:00").toLocaleDateString("en-GB", { weekday: "long" });
}
// Deterministic demo seat count from train + date + class, so the same search is stable.
function seatCount(train, dateStr, cls) {
  const s = train.no + dateStr + cls;
  let h = 0; for (const c of s) h = (h * 31 + c.charCodeAt(0)) % 997;
  return h % 48;
}
function seatStatus(n) {
  if (n >= 15) return ["ok", `Available • ${n} seats`];
  if (n >= 1) return ["warn", `Few left • ${n} seats`];
  return ["bad", "Waiting list • 0 seats"];
}

function fillStations() {
  for (const id of ["from", "to"]) {
    $(id).innerHTML = STATIONS.map(s => `<option>${s}</option>`).join("");
  }
  $("from").value = "Dhaka"; $("to").value = "Rajshahi";
  const today = new Date().toISOString().slice(0, 10);
  $("date").min = today; $("date").value = today;
  $("year").textContent = new Date().getFullYear();
}

function renderRoutes() {
  $("route-chips").innerHTML = POPULAR.map(([a, b]) =>
    `<button type="button" data-from="${a}" data-to="${b}">${a} → ${b}</button>`).join("");
  $("route-chips").addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (!b) return;
    $("from").value = b.dataset.from; $("to").value = b.dataset.to;
    $("search").scrollIntoView({ behavior: "smooth" });
    doSearch();
  });
}

function doSearch() {
  const from = $("from").value, to = $("to").value, date = $("date").value;
  const cls = $("travel-class").value, pax = Math.max(1, parseInt($("passengers").value || "1", 10));
  if (from === to) { $("search-meta").textContent = "From and To cannot be the same station."; $("results").innerHTML = ""; return; }
  if (!date) { $("search-meta").textContent = "Please pick a travel date."; return; }
  const day = dayName(date);
  const matches = TRAINS.filter(t => t.from === from && t.to === to);
  $("search-meta").textContent = `${matches.length} train(s) found • ${from} → ${to} • ${date} (${day}) • ${cls} • ${pax} passenger(s) • Sample fares`;
  if (!matches.length) {
    $("results").innerHTML = `<div class="empty">No direct train in this demo timetable for ${from} → ${to}. Try Dhaka → Rajshahi, Dhaka → Rangpur, Dhaka → Bogura (Santahar) or Dhaka → Chattogram.</div>`;
    return;
  }
  $("results").innerHTML = matches.map(t => {
    const off = t.off.includes(day);
    const seats = off ? 0 : seatCount(t, date, cls);
    const [stCls, stTxt] = off ? ["bad", `No service on ${day}s`] : seatStatus(seats);
    const fare = (t.fares[cls] || 0) * pax;
    return `<article class="card">
      <h3>${t.name} <span class="tag">(${t.no})</span></h3>
      <p class="time">${t.dep} → ${t.arr}</p>
      <p class="muted">${from} → ${to} • ${t.dur} • ${day}</p>
      <p><span class="status ${stCls}">${stTxt}</span></p>
      <p class="fare">৳${fare.toLocaleString("en-IN")} total <span class="muted">• ৳${(t.fares[cls] || 0).toLocaleString("en-IN")} × ${pax} • ${cls} (sample)</span></p>
      <div class="actions">
        <button class="btn small" ${off ? "disabled" : ""} onclick="saveTrip('${t.name} (${t.no})','${from}','${to}','${date}','${t.dep}','${t.arr}','${cls}',${fare})">Save trip</button>
        <button class="btn small outline" onclick="addAlert('${t.name} (${t.no})','${from}','${to}','${date}','${cls}')">Set seat alert</button>
      </div>
    </article>`;
  }).join("");
}

window.saveTrip = function (train, from, to, date, dep, arr, cls, fare) {
  const trips = load("rtt_trips", []);
  trips.unshift({ train, from, to, date, dep, arr, cls, fare, saved: new Date().toISOString().slice(0, 10) });
  save("rtt_trips", trips); renderSaved();
};
window.addAlert = function (train, from, to, date, cls) {
  const alerts = load("rtt_alerts", []);
  alerts.unshift({ train, from, to, date, cls });
  save("rtt_alerts", alerts); renderSaved();
};
window.deleteTrip = function (i) { const t = load("rtt_trips", []); t.splice(i, 1); save("rtt_trips", t); renderSaved(); };
window.deleteAlert = function (i) { const a = load("rtt_alerts", []); a.splice(i, 1); save("rtt_alerts", a); renderSaved(); };

function renderSaved() {
  const trips = load("rtt_trips", []);
  $("saved-trips").innerHTML = trips.length ? trips.map((t, i) => `<article class="card">
    <h3>${t.train}</h3><p>${t.from} → ${t.to} • ${t.date} • ${t.dep} → ${t.arr}</p>
    <p class="muted">${t.cls} • ৳${t.fare.toLocaleString("en-IN")} (sample)</p>
    <div class="actions"><button class="btn small outline" onclick="deleteTrip(${i})">Remove</button></div>
  </article>`).join("") : `<div class="empty">No saved trips yet — search a train and tap “Save trip”.</div>`;
  const alerts = load("rtt_alerts", []);
  $("saved-alerts").innerHTML = alerts.length ? alerts.map((a, i) => `<article class="card">
    <h3>🔔 ${a.train}</h3><p>${a.from} → ${a.to} • ${a.date} • ${a.cls}</p>
    <p class="muted">Demo alert — check the official e-ticket site for live seats.</p>
    <div class="actions"><button class="btn small outline" onclick="deleteAlert(${i})">Remove alert</button></div>
  </article>`).join("") : `<div class="empty">No seat alerts yet.</div>`;
}

document.addEventListener("DOMContentLoaded", () => {
  fillStations(); renderRoutes(); renderSaved(); doSearch();
  $("search-form").addEventListener("submit", (e) => { e.preventDefault(); doSearch(); });
});
