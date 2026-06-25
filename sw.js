/* Service Worker – cacht die App, damit sie nach dem ersten Laden offline läuft. */
const CACHE = "toefl-lernapp-v11";
// Shell-Assets müssen vorhanden sein (Install scheitert sonst); Audios werden fehlertolerant nachgecacht.
const CORE = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png"
];
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./audio/cr1.mp3",
  "./audio/cr2.mp3",
  "./audio/cr3.mp3",
  "./audio/conv1.mp3",
  "./audio/conv2.mp3",
  "./audio/conv3.mp3",
  "./audio/conv4.mp3",
  "./audio/conv5.mp3",
  "./audio/conv6.mp3",
  "./audio/ann.mp3",
  "./audio/talkOpp.mp3",
  "./audio/talkComp.mp3",
  "./audio/lr1.mp3",
  "./audio/lr2.mp3",
  "./audio/lr3.mp3",
  "./audio/lr4.mp3",
  "./audio/lr5.mp3",
  "./audio/lr6.mp3",
  "./audio/lr7.mp3",
  "./audio/ann_library_hours.mp3",
  "./audio/ann_career_fair.mp3",
  "./audio/ann_shuttle_change.mp3",
  "./audio/ann_printing_system.mp3",
  "./audio/ann_guest_lecture.mp3",
  "./audio/ann_lab_safety.mp3",
  "./audio/ann_scholarship_deadline.mp3",
  "./audio/ann_cafeteria_renovation.mp3",
  "./audio/ann_survey_request.mp3",
  "./audio/talk_sunk_cost.mp3",
  "./audio/talk_just_in_time.mp3",
  "./audio/talk_brand_loyalty.mp3",
  "./audio/talk_hawthorne_effect.mp3",
  "./audio/talk_placebo_effect.mp3",
  "./audio/talk_economies_of_scale.mp3",
  "./audio/talk_procrastination.mp3",
  "./audio/talk_compound_interest.mp3",
  "./audio/talk_photosynthesis_carbon.mp3",
  "./audio/conv_library_loan_t1.mp3",
  "./audio/conv_library_loan_t2.mp3",
  "./audio/conv_library_loan_t3.mp3",
  "./audio/conv_library_loan_t4.mp3",
  "./audio/conv_library_loan_t5.mp3",
  "./audio/conv_library_loan_t6.mp3",
  "./audio/conv_library_loan_t7.mp3",
  "./audio/conv_library_loan_t8.mp3",
  "./audio/conv_housing_office_t1.mp3",
  "./audio/conv_housing_office_t2.mp3",
  "./audio/conv_housing_office_t3.mp3",
  "./audio/conv_housing_office_t4.mp3",
  "./audio/conv_housing_office_t5.mp3",
  "./audio/conv_housing_office_t6.mp3",
  "./audio/conv_housing_office_t7.mp3",
  "./audio/conv_housing_office_t8.mp3",
  "./audio/conv_housing_office_t9.mp3",
  "./audio/conv_lab_safety_t1.mp3",
  "./audio/conv_lab_safety_t2.mp3",
  "./audio/conv_lab_safety_t3.mp3",
  "./audio/conv_lab_safety_t4.mp3",
  "./audio/conv_lab_safety_t5.mp3",
  "./audio/conv_lab_safety_t6.mp3",
  "./audio/conv_lab_safety_t7.mp3",
  "./audio/conv_lab_safety_t8.mp3",
  "./audio/conv_lab_safety_t9.mp3",
  "./audio/conv_academic_advisor_credits_t1.mp3",
  "./audio/conv_academic_advisor_credits_t2.mp3",
  "./audio/conv_academic_advisor_credits_t3.mp3",
  "./audio/conv_academic_advisor_credits_t4.mp3",
  "./audio/conv_academic_advisor_credits_t5.mp3",
  "./audio/conv_academic_advisor_credits_t6.mp3",
  "./audio/conv_academic_advisor_credits_t7.mp3",
  "./audio/conv_academic_advisor_credits_t8.mp3",
  "./audio/conv_career_center_t1.mp3",
  "./audio/conv_career_center_t2.mp3",
  "./audio/conv_career_center_t3.mp3",
  "./audio/conv_career_center_t4.mp3",
  "./audio/conv_career_center_t5.mp3",
  "./audio/conv_career_center_t6.mp3",
  "./audio/conv_career_center_t7.mp3",
  "./audio/conv_career_center_t8.mp3",
  "./audio/conv_career_center_t9.mp3",
  "./audio/conv_career_center_t10.mp3",
  "./audio/conv_office_hours_grade_t1.mp3",
  "./audio/conv_office_hours_grade_t2.mp3",
  "./audio/conv_office_hours_grade_t3.mp3",
  "./audio/conv_office_hours_grade_t4.mp3",
  "./audio/conv_office_hours_grade_t5.mp3",
  "./audio/conv_office_hours_grade_t6.mp3",
  "./audio/conv_office_hours_grade_t7.mp3",
  "./audio/conv_office_hours_grade_t8.mp3",
  "./audio/conv_office_hours_grade_t9.mp3",
  "./audio/conv_it_helpdesk_t1.mp3",
  "./audio/conv_it_helpdesk_t2.mp3",
  "./audio/conv_it_helpdesk_t3.mp3",
  "./audio/conv_it_helpdesk_t4.mp3",
  "./audio/conv_it_helpdesk_t5.mp3",
  "./audio/conv_it_helpdesk_t6.mp3",
  "./audio/conv_it_helpdesk_t7.mp3",
  "./audio/conv_it_helpdesk_t8.mp3",
  "./audio/conv_it_helpdesk_t9.mp3",
  "./audio/conv_internship_credit_t1.mp3",
  "./audio/conv_internship_credit_t2.mp3",
  "./audio/conv_internship_credit_t3.mp3",
  "./audio/conv_internship_credit_t4.mp3",
  "./audio/conv_internship_credit_t5.mp3",
  "./audio/conv_internship_credit_t6.mp3",
  "./audio/conv_internship_credit_t7.mp3",
  "./audio/conv_internship_credit_t8.mp3",
  "./audio/conv_internship_credit_t9.mp3",
  "./audio/conv_internship_credit_t10.mp3",
  "./audio/conv_writing_center_t1.mp3",
  "./audio/conv_writing_center_t2.mp3",
  "./audio/conv_writing_center_t3.mp3",
  "./audio/conv_writing_center_t4.mp3",
  "./audio/conv_writing_center_t5.mp3",
  "./audio/conv_writing_center_t6.mp3",
  "./audio/conv_writing_center_t7.mp3",
  "./audio/conv_writing_center_t8.mp3",
  "./audio/conv_writing_center_t9.mp3",
  "./audio/conv_writing_center_t10.mp3"
];

self.addEventListener("install", (e) => {
  e.waitUntil((async () => {
    const c = await caches.open(CACHE);
    await c.addAll(CORE);                 // Shell zwingend – schlägt fehl, wenn etwas fehlt
    const audio = ASSETS.filter((a) => a.startsWith("./audio/"));
    await Promise.allSettled(audio.map((a) => c.add(a)));  // einzelne MP3s fehlertolerant
    self.skipWaiting();
  })());
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  // HTML/Navigation: network-first (frischer Stand nach Deploy), Cache nur als Offline-Fallback.
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req).then((r) => { const cp = r.clone(); caches.open(CACHE).then((c) => c.put("./index.html", cp)); return r; })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }
  // Statische Assets (Audio/Icons/Manifest): cache-first.
  e.respondWith(caches.match(req).then((hit) => hit || fetch(req)));
});
