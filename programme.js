// ============================================================
// SCHWARZENEGGER IRON PROGRAMME
// 10-Month Training Programme Data
// Jun 1, 2026 → Mar 19, 2027
// ============================================================

const PROGRAMME_START = new Date('2026-06-01');
const PROGRAMME_END = new Date('2027-03-19');

const QUOTES = [
  { text: "The mind is the limit. As long as the mind can envision the fact that you can do something, you can do it.", attr: "Arnold Schwarzenegger" },
  { text: "Strength does not come from winning. Your struggles develop your strengths.", attr: "Arnold Schwarzenegger" },
  { text: "The worst thing I can be is the same as everybody else.", attr: "Arnold Schwarzenegger" },
  { text: "You can have results or excuses. Not both.", attr: "Arnold Schwarzenegger" },
  { text: "Just remember, you can't climb the ladder of success with your hands in your pockets.", attr: "Arnold Schwarzenegger" },
  { text: "The last three or four reps is what makes the muscle grow.", attr: "Arnold Schwarzenegger" },
  { text: "Everybody pities the weak; jealousy you have to earn.", attr: "Arnold Schwarzenegger" },
  { text: "If it's hard to remember, it'll be difficult to forget.", attr: "Arnold Schwarzenegger" },
  { text: "You have to remember something: everybody pities the weak; jealousy you have to earn.", attr: "Arnold Schwarzenegger" },
  { text: "The pain you feel today will be the strength you feel tomorrow.", attr: "Arnold Schwarzenegger" },
  { text: "Milk is for babies. When you grow up you have to drink beer.", attr: "Arnold Schwarzenegger" },
  { text: "I do the same exercises I did 50 years ago and they still work.", attr: "Arnold Schwarzenegger" },
  { text: "If you want to turn a vision into reality, you have to give 100% and never stop believing.", attr: "Arnold Schwarzenegger" },
  { text: "The Iron never lies to you.", attr: "Arnold Schwarzenegger" },
  { text: "I was born to be a champion.", attr: "Arnold Schwarzenegger" }
];

const MACROS = {
  training: { calories: 2800, protein: 200, carbs: 290, fat: 75 },
  rest:     { calories: 2400, protein: 200, carbs: 190, fat: 70 }
};

const SUPPLEMENTS = [
  { name: "Creatine Monohydrate", dose: "5g", timing: "Daily with food" },
  { name: "Whey Isolate", dose: "30–40g", timing: "Post-workout" },
  { name: "Omega-3 Fish Oil", dose: "2–3g EPA+DHA", timing: "With meals" },
  { name: "Vitamin D3 + K2", dose: "3,000 IU", timing: "Morning" },
  { name: "Magnesium Glycinate", dose: "400mg", timing: "Evening" },
  { name: "Caffeine / Pre-workout", dose: "150–200mg", timing: "30 min pre-session" },
  { name: "Collagen Peptides", dose: "10g", timing: "Pre-workout (joint support)" }
];

// ============================================================
// WORKOUT TEMPLATES BY DAY OF WEEK
// Mon=1, Tue=2(rest), Wed=3, Thu=4(rest), Fri=5, Sat=6, Sun=0
// ============================================================

const WORKOUT_TEMPLATES = {
  // PHASE 1: Foundation (Weeks 1–6: Jun 1 – Jul 13)
  phase1: {
    name: "PHASE I — FOUNDATION",
    subtitle: "Volume · Form · Baseline Strength",
    weeks: [1, 6],
    days: {
      1: { // Monday - Push
        name: "PUSH DAY",
        muscles: "Chest · Shoulders · Triceps",
        exercises: [
          { name: "Barbell Bench Press", sets: 4, reps: "10–12", rest: "90s", notes: "Control the eccentric — 3 sec down" },
          { name: "Incline Dumbbell Press", sets: 3, reps: "12–14", rest: "75s", notes: "45° incline, full range of motion" },
          { name: "Cable Lateral Raise", sets: 4, reps: "15", rest: "60s", notes: "Lead with elbow, slight forward lean" },
          { name: "Seated DB Shoulder Press", sets: 3, reps: "12–14", rest: "75s", notes: "Don't lock out at top" },
          { name: "Cable Chest Fly", sets: 3, reps: "15", rest: "60s", notes: "Squeeze hard at peak contraction" },
          { name: "Tricep Rope Pushdown", sets: 3, reps: "15", rest: "60s", notes: "Flare wrists at bottom" },
          { name: "Overhead Tricep Extension (cable)", sets: 3, reps: "12–15", rest: "60s", notes: "Keep elbows tucked" }
        ],
        cardio: { type: "Rowing Machine — Steady State", duration: "12 min", protocol: "RPE 6–7, moderate pace" }
      },
      3: { // Wednesday - Pull
        name: "PULL DAY",
        muscles: "Back · Rear Delts · Biceps",
        exercises: [
          { name: "Weighted Pull-Ups", sets: 4, reps: "6–8", rest: "90s", notes: "Full dead hang at bottom" },
          { name: "Barbell Bent-Over Row", sets: 4, reps: "10–12", rest: "90s", notes: "Hinge at hip, row to lower chest" },
          { name: "Seated Cable Row (wide grip)", sets: 3, reps: "12", rest: "75s", notes: "Squeeze shoulder blades at peak" },
          { name: "Face Pull (rope)", sets: 4, reps: "15", rest: "60s", notes: "External rotate at top — key for V-taper" },
          { name: "Rear Delt Cable Fly", sets: 3, reps: "15", rest: "60s", notes: "Keep slight bend in elbows" },
          { name: "Incline Dumbbell Curl", sets: 3, reps: "12", rest: "60s", notes: "Lie back on 45° bench, full stretch" },
          { name: "Hammer Curl", sets: 3, reps: "12 each", rest: "60s", notes: "Neutral grip, no swinging" }
        ],
        cardio: { type: "Ski Erg or Stationary Bike", duration: "12 min", protocol: "Steady state RPE 6" }
      },
      5: { // Friday - Legs + Core
        name: "LEGS + CORE",
        muscles: "Quads · Hamstrings · Glutes · Abs",
        exercises: [
          { name: "Leg Press (bilateral)", sets: 4, reps: "12–15", rest: "90s", notes: "Feet shoulder-width, full depth, no knee lockout" },
          { name: "Romanian Deadlift", sets: 4, reps: "12", rest: "90s", notes: "Hinge deep, feel hamstring stretch" },
          { name: "Hack Squat (controlled)", sets: 3, reps: "12", rest: "75s", notes: "Controlled descent, left leg checked" },
          { name: "Single-Leg Curl", sets: 3, reps: "12 each", rest: "60s", notes: "Adjust load for left leg if needed" },
          { name: "Seated Calf Raise", sets: 4, reps: "20", rest: "45s", notes: "Full range, pause at top and bottom" },
          { name: "Cable Crunch", sets: 4, reps: "15", rest: "60s", notes: "Crunch from ribcage, not neck" },
          { name: "Hanging Leg Raise", sets: 3, reps: "12", rest: "60s", notes: "Control the swing" },
          { name: "Ab Wheel Rollout", sets: 3, reps: "10", rest: "60s", notes: "Keep core braced throughout" }
        ],
        cardio: { type: "Stationary Bike (Low Impact)", duration: "12 min", protocol: "Steady state, easy on left leg" }
      },
      6: { // Saturday - Shoulders & Arms
        name: "SHOULDERS & ARMS",
        muscles: "Delts · Biceps · Triceps",
        exercises: [
          { name: "Seated Arnold Press", sets: 4, reps: "12", rest: "75s", notes: "The Arnie classic — rotate through full range" },
          { name: "Cable Lateral Raise (unilateral)", sets: 4, reps: "15 each", rest: "60s", notes: "Lean slightly away from cable" },
          { name: "Bent-Over Lateral Raise", sets: 3, reps: "15", rest: "60s", notes: "Torso parallel to floor" },
          { name: "Front Raise (plate)", sets: 3, reps: "12", rest: "60s", notes: "Keep slight bend at elbow" },
          { name: "EZ Bar Curl", sets: 4, reps: "12", rest: "75s", notes: "Don't let elbows drift forward" },
          { name: "Concentration Curl", sets: 3, reps: "12 each", rest: "60s", notes: "Peak squeeze, slow negative" },
          { name: "Skull Crusher (EZ bar)", sets: 4, reps: "12", rest: "75s", notes: "Lower to forehead level, extend fully" },
          { name: "Cable Kickback", sets: 3, reps: "15 each", rest: "60s", notes: "Elbow fixed, only forearm moves" }
        ],
        cardio: { type: "Elliptical", duration: "12 min", protocol: "Moderate intensity, RPE 6–7" }
      },
      0: { // Sunday - Full Body Power
        name: "FULL BODY POWER",
        muscles: "Full Body · Core",
        exercises: [
          { name: "Trap Bar Deadlift", sets: 4, reps: "8", rest: "2 min", notes: "Drive through full foot, chest tall" },
          { name: "Push Press (barbell)", sets: 4, reps: "8", rest: "90s", notes: "Slight dip, explosive drive overhead" },
          { name: "Chest-Supported DB Row", sets: 3, reps: "12", rest: "75s", notes: "Neutral grip, full retraction" },
          { name: "Bulgarian Split Squat", sets: 3, reps: "10 each", rest: "75s", notes: "Right leg leads — adjust load for left" },
          { name: "Cable Woodchop (high to low)", sets: 3, reps: "12 each", rest: "60s", notes: "Rotate from core, not arms" },
          { name: "Plank Hold", sets: 3, reps: "45s", rest: "45s", notes: "Squeeze glutes and abs — no hips dropping" }
        ],
        cardio: { type: "Rowing Machine", duration: "15 min", protocol: "Steady moderate pace, RPE 6–7" }
      }
    }
  },

  // PHASE 2: Hypertrophy (Weeks 7–18: Jul 14 – Oct 4)
  phase2: {
    name: "PHASE II — HYPERTROPHY",
    subtitle: "Max Muscle Stimulus · Progressive Overload",
    weeks: [7, 18],
    days: {
      1: {
        name: "PUSH DAY",
        muscles: "Chest · Shoulders · Triceps",
        exercises: [
          { name: "Barbell Bench Press", sets: 4, reps: "8–10", rest: "90s", notes: "Add 2.5kg from Phase 1 working weight" },
          { name: "Incline DB Press", sets: 4, reps: "10–12", rest: "75s", notes: "Increase weight — feel the upper chest" },
          { name: "Cable Lateral Raise", sets: 4, reps: "12–15", rest: "60s", notes: "The V-taper builder — never skip these" },
          { name: "Seated DB Shoulder Press", sets: 3, reps: "10–12", rest: "75s", notes: "Heavier than Phase 1" },
          { name: "Cable Chest Fly", sets: 3, reps: "12–15", rest: "60s", notes: "Cross arms at peak for extra squeeze" },
          { name: "Tricep Rope Pushdown", sets: 3, reps: "12–15", rest: "60s", notes: "Superset with overhead ext if time tight" },
          { name: "Overhead Tricep Extension (cable)", sets: 3, reps: "10–12", rest: "60s", notes: "Long head stretch — key for arm size" },
          { name: "Pec Deck Machine", sets: 2, reps: "15–20", rest: "45s", notes: "Pump finisher — squeeze hard" }
        ],
        cardio: { type: "Rowing Machine — HIIT", duration: "12 min", protocol: "30s hard / 30s easy × 12 rounds" }
      },
      3: {
        name: "PULL DAY",
        muscles: "Back · Rear Delts · Biceps",
        exercises: [
          { name: "Weighted Pull-Ups", sets: 4, reps: "6–8", rest: "90s", notes: "Add belt weight — champion standard" },
          { name: "Barbell Bent-Over Row", sets: 4, reps: "8–10", rest: "90s", notes: "Heavier, explosive row" },
          { name: "Seated Cable Row (wide grip)", sets: 3, reps: "10–12", rest: "75s", notes: "Wide grip = more lat activation" },
          { name: "Face Pull (rope)", sets: 4, reps: "15", rest: "60s", notes: "Non-negotiable for shoulder health" },
          { name: "Rear Delt Cable Fly", sets: 3, reps: "12–15", rest: "60s", notes: "Increase weight from Phase 1" },
          { name: "Incline DB Curl", sets: 3, reps: "10–12", rest: "60s", notes: "Brutal stretch, maximise growth" },
          { name: "Hammer Curl", sets: 3, reps: "12 each", rest: "60s", notes: "Brachialis growth = bigger arms" },
          { name: "Straight Arm Pulldown", sets: 2, reps: "15", rest: "45s", notes: "Pump finisher for lats" }
        ],
        cardio: { type: "Ski Erg", duration: "12 min", protocol: "Steady state RPE 6–7" }
      },
      5: {
        name: "LEGS + CORE",
        muscles: "Quads · Hamstrings · Glutes · Abs",
        exercises: [
          { name: "Leg Press (bilateral)", sets: 5, reps: "10–12", rest: "90s", notes: "More volume — push the weight" },
          { name: "Romanian Deadlift", sets: 4, reps: "10–12", rest: "90s", notes: "Load up — feel every rep in the hamstrings" },
          { name: "Hack Squat (controlled)", sets: 4, reps: "10–12", rest: "75s", notes: "Add volume from Phase 1" },
          { name: "Leg Extension", sets: 3, reps: "15", rest: "60s", notes: "Terminal quad squeeze, watch left knee" },
          { name: "Single-Leg Curl", sets: 3, reps: "12 each", rest: "60s", notes: "Unilateral balance" },
          { name: "Seated Calf Raise", sets: 4, reps: "20", rest: "45s", notes: "Calves respond to volume and stretch" },
          { name: "Cable Crunch", sets: 4, reps: "15", rest: "60s", notes: "Add weight — treat abs like any muscle" },
          { name: "Hanging Leg Raise", sets: 3, reps: "15", rest: "60s", notes: "Tuck to straight leg progression" },
          { name: "Ab Wheel Rollout", sets: 3, reps: "12", rest: "60s", notes: "Extended range of motion" }
        ],
        cardio: { type: "Stationary Bike", duration: "12 min", protocol: "Steady state, low impact" }
      },
      6: {
        name: "SHOULDERS & ARMS",
        muscles: "Delts · Biceps · Triceps",
        exercises: [
          { name: "Seated Arnold Press", sets: 4, reps: "10–12", rest: "75s", notes: "Heavier than Phase 1 — earn the Arnie name" },
          { name: "Cable Lateral Raise (unilateral)", sets: 5, reps: "15 each", rest: "60s", notes: "5 sets — this builds the V-taper" },
          { name: "Bent-Over Lateral Raise", sets: 3, reps: "15", rest: "60s", notes: "Rear delts = 3D shoulders" },
          { name: "Front Raise (plate)", sets: 3, reps: "12", rest: "60s", notes: "Controlled — front delt isolation" },
          { name: "EZ Bar Curl", sets: 4, reps: "10–12", rest: "75s", notes: "Heavier curls this phase" },
          { name: "Concentration Curl", sets: 3, reps: "12 each", rest: "60s", notes: "Arnie's favourite — peak bicep" },
          { name: "Skull Crusher (EZ bar)", sets: 4, reps: "10–12", rest: "75s", notes: "Mass builder for triceps" },
          { name: "Cable Kickback", sets: 3, reps: "15 each", rest: "60s", notes: "Lateral head definition" }
        ],
        cardio: { type: "Elliptical — HIIT", duration: "12 min", protocol: "30s hard / 30s easy × 12 rounds" }
      },
      0: {
        name: "FULL BODY POWER",
        muscles: "Full Body · Core",
        exercises: [
          { name: "Trap Bar Deadlift", sets: 5, reps: "6–8", rest: "2 min", notes: "PR territory — champion weights" },
          { name: "Push Press (barbell)", sets: 4, reps: "6–8", rest: "90s", notes: "Explosive power — more weight than Phase 1" },
          { name: "Chest-Supported DB Row", sets: 4, reps: "10–12", rest: "75s", notes: "Extra set added" },
          { name: "Bulgarian Split Squat", sets: 3, reps: "10 each", rest: "75s", notes: "Add DBs if left leg allows" },
          { name: "Cable Woodchop", sets: 3, reps: "12 each", rest: "60s", notes: "Heavy and controlled" },
          { name: "Plank Hold", sets: 3, reps: "60s", rest: "45s", notes: "60s holds now — building iron core" },
          { name: "Pallof Press", sets: 3, reps: "12 each", rest: "60s", notes: "Anti-rotation for waist tightening" }
        ],
        cardio: { type: "Rowing Machine", duration: "15 min", protocol: "Moderate pace RPE 6–7" }
      }
    }
  },

  // PHASE 3: Strength + Cut (Weeks 19–30: Oct 5 – Dec 27)
  phase3: {
    name: "PHASE III — STRENGTH & CUT",
    subtitle: "Heavier Loads · Tighten Body Composition",
    weeks: [19, 30],
    days: {
      1: {
        name: "PUSH DAY",
        muscles: "Chest · Shoulders · Triceps",
        exercises: [
          { name: "Barbell Bench Press", sets: 5, reps: "5–6", rest: "2 min", notes: "Heavy — this is strength phase, go for PRs" },
          { name: "Incline DB Press", sets: 4, reps: "8–10", rest: "90s", notes: "Heavier DBs, controlled negatives" },
          { name: "Cable Lateral Raise", sets: 4, reps: "12–15", rest: "60s", notes: "Maintain volume — V-taper preserved" },
          { name: "Seated DB Shoulder Press", sets: 4, reps: "8–10", rest: "90s", notes: "Heavy pressing phase" },
          { name: "Cable Chest Fly", sets: 3, reps: "12", rest: "60s", notes: "Maintain muscle, heavier weight" },
          { name: "Tricep Dip (weighted)", sets: 3, reps: "8–10", rest: "75s", notes: "Belt weight — compound tricep mass" },
          { name: "Overhead Tricep Extension", sets: 3, reps: "10", rest: "60s", notes: "Keep the volume" }
        ],
        cardio: { type: "Rowing Machine — HIIT", duration: "15 min", protocol: "40s hard / 20s easy × 12 rounds" }
      },
      3: {
        name: "PULL DAY",
        muscles: "Back · Rear Delts · Biceps",
        exercises: [
          { name: "Weighted Pull-Ups", sets: 5, reps: "5–6", rest: "2 min", notes: "Max belt weight — back width champion" },
          { name: "Barbell Bent-Over Row", sets: 5, reps: "6–8", rest: "90s", notes: "Strength phase rows — heavy" },
          { name: "Seated Cable Row", sets: 3, reps: "10", rest: "75s", notes: "Maintain thickness" },
          { name: "Face Pull (rope)", sets: 4, reps: "15", rest: "60s", notes: "Always — shoulder integrity" },
          { name: "Rear Delt Cable Fly", sets: 3, reps: "12", rest: "60s", notes: "3D shoulder definition" },
          { name: "Barbell Curl", sets: 4, reps: "8", rest: "75s", notes: "Heavy curls — peak strength" },
          { name: "Hammer Curl", sets: 3, reps: "10 each", rest: "60s", notes: "Arm density" }
        ],
        cardio: { type: "Ski Erg — HIIT", duration: "15 min", protocol: "30s max / 30s rest × 15 rounds" }
      },
      5: {
        name: "LEGS + CORE",
        muscles: "Quads · Hamstrings · Glutes · Abs",
        exercises: [
          { name: "Leg Press (bilateral)", sets: 5, reps: "8–10", rest: "2 min", notes: "Heavy plate work" },
          { name: "Romanian Deadlift", sets: 5, reps: "8", rest: "90s", notes: "Strength phase — load it up" },
          { name: "Hack Squat", sets: 4, reps: "8–10", rest: "90s", notes: "Heavier, controlled" },
          { name: "Leg Extension", sets: 3, reps: "12", rest: "60s", notes: "Quad definition" },
          { name: "Single-Leg Curl", sets: 3, reps: "10 each", rest: "60s", notes: "Balance both legs" },
          { name: "Seated Calf Raise", sets: 5, reps: "15", rest: "45s", notes: "Maximum calf volume" },
          { name: "Cable Crunch", sets: 4, reps: "15", rest: "60s", notes: "Heavy abs — visible core incoming" },
          { name: "Hanging Leg Raise", sets: 4, reps: "15", rest: "60s", notes: "Lower abs definition" },
          { name: "Weighted Plank", sets: 3, reps: "60s", rest: "45s", notes: "Plate on back" }
        ],
        cardio: { type: "Stationary Bike — Intervals", duration: "15 min", protocol: "1 min hard / 1 min easy × 7" }
      },
      6: {
        name: "SHOULDERS & ARMS",
        muscles: "Delts · Biceps · Triceps",
        exercises: [
          { name: "Seated Arnold Press", sets: 5, reps: "8–10", rest: "90s", notes: "Champion heavy pressing" },
          { name: "Cable Lateral Raise (unilateral)", sets: 5, reps: "12–15 each", rest: "60s", notes: "V-taper sculptor — never drop these" },
          { name: "Bent-Over Lateral Raise", sets: 4, reps: "12", rest: "60s", notes: "Rear delt volume" },
          { name: "EZ Bar Curl", sets: 5, reps: "8", rest: "75s", notes: "Heavy curls — peak arms" },
          { name: "Incline DB Curl", sets: 3, reps: "10 each", rest: "60s", notes: "Full stretch for bicep length" },
          { name: "Skull Crusher (EZ bar)", sets: 5, reps: "8–10", rest: "75s", notes: "Heavy pressing for tricep mass" },
          { name: "Tricep Rope Pushdown", sets: 3, reps: "12", rest: "60s", notes: "Definition pump finisher" }
        ],
        cardio: { type: "Elliptical", duration: "15 min", protocol: "Steady state RPE 7" }
      },
      0: {
        name: "FULL BODY POWER",
        muscles: "Full Body · Core",
        exercises: [
          { name: "Trap Bar Deadlift", sets: 5, reps: "5", rest: "2–3 min", notes: "Maximum strength — iron will" },
          { name: "Push Press (barbell)", sets: 5, reps: "5–6", rest: "90s", notes: "Explosive max effort" },
          { name: "Chest-Supported DB Row", sets: 4, reps: "10", rest: "75s", notes: "Heavy back thickness" },
          { name: "Bulgarian Split Squat", sets: 4, reps: "8 each", rest: "90s", notes: "Weighted — build single leg strength" },
          { name: "Cable Woodchop", sets: 3, reps: "12 each", rest: "60s", notes: "Oblique definition" },
          { name: "Weighted Plank", sets: 3, reps: "60s", rest: "45s", notes: "Core of steel" },
          { name: "Pallof Press", sets: 3, reps: "12 each", rest: "60s", notes: "Anti-rotation strength" }
        ],
        cardio: { type: "Rowing Machine — HIIT", duration: "15 min", protocol: "40s hard / 20s easy × 12 rounds" }
      }
    }
  },

  // PHASE 4: Peak (Weeks 31–40: Dec 28 – Mar 19)
  phase4: {
    name: "PHASE IV — PEAK",
    subtitle: "Definition · Performance · Hold Your Gains",
    weeks: [31, 40],
    days: {
      1: {
        name: "PUSH DAY",
        muscles: "Chest · Shoulders · Triceps",
        exercises: [
          { name: "Barbell Bench Press", sets: 4, reps: "8", rest: "90s", notes: "Maintain strength — no ego lifting" },
          { name: "Incline DB Press", sets: 4, reps: "10–12", rest: "75s", notes: "Focus on contraction quality" },
          { name: "Cable Lateral Raise", sets: 5, reps: "15", rest: "60s", notes: "Peak V-taper — high volume" },
          { name: "Seated DB Shoulder Press", sets: 3, reps: "10–12", rest: "75s", notes: "Controlled, peak squeeze" },
          { name: "Cable Chest Fly", sets: 3, reps: "15", rest: "60s", notes: "Striated chest — squeeze every rep" },
          { name: "Tricep Dip (weighted)", sets: 3, reps: "10", rest: "75s", notes: "Maintain tricep mass" },
          { name: "Overhead Tricep Extension", sets: 3, reps: "12", rest: "60s", notes: "Long head definition" },
          { name: "Pec Deck Machine", sets: 2, reps: "20", rest: "45s", notes: "Pump and definition finisher" }
        ],
        cardio: { type: "Rowing Machine — HIIT", duration: "15 min", protocol: "20s max / 40s moderate × 15 rounds" }
      },
      3: {
        name: "PULL DAY",
        muscles: "Back · Rear Delts · Biceps",
        exercises: [
          { name: "Weighted Pull-Ups", sets: 4, reps: "8", rest: "90s", notes: "Maintain width — peak back" },
          { name: "Barbell Bent-Over Row", sets: 4, reps: "10", rest: "90s", notes: "Mind-muscle connection at its peak" },
          { name: "Seated Cable Row", sets: 3, reps: "12", rest: "75s", notes: "Slow negatives for detail" },
          { name: "Face Pull (rope)", sets: 4, reps: "15", rest: "60s", notes: "Rear delt definition" },
          { name: "Rear Delt Cable Fly", sets: 4, reps: "15", rest: "60s", notes: "3D shoulder peak" },
          { name: "Incline DB Curl", sets: 3, reps: "12 each", rest: "60s", notes: "Full stretch for peak bicep" },
          { name: "Concentration Curl", sets: 3, reps: "12 each", rest: "60s", notes: "Arnie's peak builder" },
          { name: "Straight Arm Pulldown", sets: 3, reps: "15", rest: "45s", notes: "Lat detail finisher" }
        ],
        cardio: { type: "Ski Erg", duration: "15 min", protocol: "Moderate pace RPE 6–7" }
      },
      5: {
        name: "LEGS + CORE",
        muscles: "Quads · Hamstrings · Glutes · Abs",
        exercises: [
          { name: "Leg Press (bilateral)", sets: 4, reps: "12", rest: "90s", notes: "Peak conditioning — maintain volume" },
          { name: "Romanian Deadlift", sets: 4, reps: "12", rest: "90s", notes: "Hamstring definition" },
          { name: "Hack Squat", sets: 3, reps: "12", rest: "75s", notes: "Quad sweep and detail" },
          { name: "Leg Extension", sets: 4, reps: "15", rest: "60s", notes: "High rep definition work" },
          { name: "Single-Leg Curl", sets: 3, reps: "15 each", rest: "60s", notes: "Hamstring detail" },
          { name: "Seated Calf Raise", sets: 5, reps: "20", rest: "45s", notes: "Diamond calves — peak" },
          { name: "Cable Crunch", sets: 5, reps: "15", rest: "60s", notes: "Chiselled abs — heavy weight" },
          { name: "Hanging Leg Raise", sets: 4, reps: "15", rest: "60s", notes: "Lower abs — the finishing touch" },
          { name: "Ab Wheel Rollout", sets: 3, reps: "12", rest: "60s", notes: "Full extension for peak abs" }
        ],
        cardio: { type: "Stationary Bike — HIIT", duration: "15 min", protocol: "1 min hard / 30s easy × 10 rounds" }
      },
      6: {
        name: "SHOULDERS & ARMS",
        muscles: "Delts · Biceps · Triceps",
        exercises: [
          { name: "Seated Arnold Press", sets: 4, reps: "10–12", rest: "75s", notes: "Peak shoulder press — Arnie proud" },
          { name: "Cable Lateral Raise (unilateral)", sets: 5, reps: "15 each", rest: "60s", notes: "Maximum V-taper volume" },
          { name: "Bent-Over Lateral Raise", sets: 4, reps: "15", rest: "60s", notes: "Rear delt peak detail" },
          { name: "Front Raise (plate)", sets: 3, reps: "15", rest: "60s", notes: "Front delt separation" },
          { name: "EZ Bar Curl", sets: 4, reps: "10–12", rest: "75s", notes: "Bicep peak maintained" },
          { name: "Concentration Curl", sets: 4, reps: "12 each", rest: "60s", notes: "The peak builder — squeeze hard" },
          { name: "Skull Crusher (EZ bar)", sets: 4, reps: "10–12", rest: "75s", notes: "Tricep mass holder" },
          { name: "Cable Kickback", sets: 3, reps: "15 each", rest: "60s", notes: "Tricep definition peak" }
        ],
        cardio: { type: "Elliptical", duration: "15 min", protocol: "Moderate HIIT — 30s on / 30s off" }
      },
      0: {
        name: "FULL BODY POWER",
        muscles: "Full Body · Core",
        exercises: [
          { name: "Trap Bar Deadlift", sets: 4, reps: "6–8", rest: "2 min", notes: "Maintain strength peak" },
          { name: "Push Press (barbell)", sets: 4, reps: "6–8", rest: "90s", notes: "Explosive power maintained" },
          { name: "Chest-Supported DB Row", sets: 3, reps: "12", rest: "75s", notes: "Back detail and thickness" },
          { name: "Bulgarian Split Squat", sets: 3, reps: "10 each", rest: "75s", notes: "Leg definition and balance" },
          { name: "Cable Woodchop", sets: 3, reps: "15 each", rest: "60s", notes: "Oblique definition — waist tightening" },
          { name: "Plank Hold", sets: 3, reps: "60s", rest: "45s", notes: "Iron core for the final reveal" },
          { name: "Pallof Press", sets: 3, reps: "15 each", rest: "60s", notes: "Anti-rotation peak strength" }
        ],
        cardio: { type: "Rowing Machine", duration: "15 min", protocol: "Mixed: 5 min steady, 5 min HIIT, 5 min cool down" }
      }
    }
  }
};

// ============================================================
// HELPER: Get phase for a given date
// ============================================================
function getPhaseForDate(date) {
  const weekNum = getWeekNumber(date);
  if (weekNum <= 6)  return WORKOUT_TEMPLATES.phase1;
  if (weekNum <= 18) return WORKOUT_TEMPLATES.phase2;
  if (weekNum <= 30) return WORKOUT_TEMPLATES.phase3;
  return WORKOUT_TEMPLATES.phase4;
}

function getWeekNumber(date) {
  const msPerDay = 86400000;
  const diff = date - PROGRAMME_START;
  return Math.floor(diff / (msPerDay * 7)) + 1;
}

function isRestDay(dayOfWeek) {
  return dayOfWeek === 2 || dayOfWeek === 4; // Tue or Thu
}

function isProgrammeDay(date) {
  return date >= PROGRAMME_START && date <= PROGRAMME_END;
}

function getWorkoutForDate(date) {
  if (!isProgrammeDay(date)) return null;
  const dow = date.getDay(); // 0=Sun,1=Mon,...,6=Sat
  if (isRestDay(dow)) return null;
  const phase = getPhaseForDate(date);
  return phase.days[dow] ? { ...phase.days[dow], phase: phase.name, phaseSubtitle: phase.phaseSubtitle, week: getWeekNumber(date) } : null;
}
