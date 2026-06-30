import { useState } from "react";

const COLORS = {
  bg: "#F7F6F3",
  card: "#FFFFFF",
  primary: "#5B6AF0",
  primaryLight: "#EEF0FD",
  accent: "#E8845C",
  accentLight: "#FDF1EB",
  green: "#4CAF82",
  greenLight: "#EBF7F1",
  text: "#1A1A2E",
  muted: "#6B7280",
  border: "#E5E7EB",
  tag: "#F3F4F6",
  hard: "#7C3AED",
  hardLight: "#F5F3FF",
};

// Flag emoji map — 5 nationalities only
const FLAGS = {
  British: "🇬🇧",
  Turkish: "🇹🇷",
  Nigerian: "🇳🇬",
  Indian: "🇮🇳",
  Somali: "🇸🇴",
};

// Patient profiles for drillthrough challenge
const PATIENTS = [
  { id:"PAT-001", name:"Sophie Clarke", age:34, gender:"Female", nationality:"British", problem:"Low Mood", referral:"08 Jan 2024", surgery:"Hillside Medical Centre", borough:"Southwark", active:"Yes",
    sessions:[
      {id:"SES-001",date:"22 Jan 2024",type:"Telephone",attendance:"Attended",phq:14,gad:11},
      {id:"SES-002",date:"29 Jan 2024",type:"Telephone",attendance:"Attended",phq:12,gad:9},
      {id:"SES-003",date:"05 Feb 2024",type:"Telephone",attendance:"Attended",phq:10,gad:8},
      {id:"SES-004",date:"04 Nov 2024",type:"Telephone",attendance:"Attended",phq:8,gad:6},
      {id:"SES-005",date:"11 Nov 2024",type:"Telephone",attendance:"Attended",phq:6,gad:5},
    ],
    wave1:{cope:2,connected:2,optimistic:1,sleep:2,stress:1,mood:2},
    wave2:{cope:4,connected:4,optimistic:4,sleep:3,stress:4,mood:4},
    outcome:{date:"18 Mar 2024",reason:"Treatment Completed",recovery:"Recovered",improvement:"Yes"},
  },
  { id:"PAT-007", name:"Sinem Yilmaz", age:32, gender:"Female", nationality:"Turkish", problem:"Low Mood", referral:"11 Mar 2024", surgery:"Riverside Health Practice", borough:"Tower Hamlets", active:"Yes",
    sessions:[
      {id:"SES-019",date:"18 Mar 2024",type:"Face to Face",attendance:"Attended",phq:19,gad:16},
      {id:"SES-020",date:"25 Mar 2024",type:"Face to Face",attendance:"Attended",phq:15,gad:13},
      {id:"SES-021",date:"01 Apr 2024",type:"Face to Face",attendance:"Attended",phq:11,gad:9},
      {id:"SES-022",date:"08 Apr 2024",type:"Face to Face",attendance:"Attended",phq:8,gad:6},
    ],
    wave1:{cope:1,connected:2,optimistic:1,sleep:1,stress:1,mood:2},
    wave2:{cope:4,connected:4,optimistic:5,sleep:4,stress:4,mood:5},
    outcome:{date:"18 Jun 2024",reason:"Treatment Completed",recovery:"Recovered",improvement:"Yes"},
  },
  { id:"PAT-014", name:"Salma Hassan", age:48, gender:"Female", nationality:"Somali", problem:"Low Mood", referral:"17 May 2024", surgery:"Oakfield Surgery", borough:"Lambeth", active:"Yes",
    sessions:[
      {id:"SES-040",date:"24 May 2024",type:"Telephone",attendance:"Attended",phq:15,gad:12},
      {id:"SES-041",date:"31 May 2024",type:"Telephone",attendance:"Attended",phq:12,gad:10},
      {id:"SES-042",date:"07 Jun 2024",type:"Telephone",attendance:"Attended",phq:9,gad:7},
    ],
    wave1:{cope:2,connected:2,optimistic:2,sleep:1,stress:2,mood:2},
    wave2:{cope:3,connected:3,optimistic:3,sleep:3,stress:3,mood:3},
    outcome:{date:"20 Aug 2024",reason:"Dropped Out",recovery:"Not Recovered",improvement:"No"},
  },
  { id:"PAT-002", name:"James Okafor", age:28, gender:"Male", nationality:"Nigerian", problem:"Anxiety", referral:"15 Jan 2024", surgery:"Riverside Health Practice", borough:"Tower Hamlets", active:"Yes",
    sessions:[
      {id:"SES-004",date:"23 Jan 2024",type:"Video",attendance:"Attended",phq:18,gad:15},
      {id:"SES-005",date:"30 Jan 2024",type:"Video",attendance:"DNA",phq:null,gad:null},
      {id:"SES-006",date:"06 Feb 2024",type:"Video",attendance:"Attended",phq:14,gad:11},
      {id:"SES-080",date:"05 Nov 2024",type:"Video",attendance:"Attended",phq:11,gad:9},
    ],
    wave1:{cope:1,connected:2,optimistic:1,sleep:1,stress:1,mood:1},
    wave2:{cope:2,connected:2,optimistic:2,sleep:2,stress:2,mood:2},
    outcome:{date:"12 Mar 2024",reason:"Dropped Out",recovery:"Not Recovered",improvement:"No"},
  },
  { id:"PAT-016", name:"Grace Osei", age:39, gender:"Female", nationality:"Nigerian", problem:"Stress", referral:"08 Jun 2024", surgery:"Hillside Medical Centre", borough:"Southwark", active:"Yes",
    sessions:[
      {id:"SES-045",date:"12 Jun 2024",type:"Face to Face",attendance:"Attended",phq:8,gad:6},
      {id:"SES-046",date:"19 Jun 2024",type:"Face to Face",attendance:"Attended",phq:5,gad:4},
      {id:"SES-047",date:"26 Jun 2024",type:"Face to Face",attendance:"Attended",phq:3,gad:2},
    ],
    wave1:{cope:3,connected:4,optimistic:3,sleep:3,stress:3,mood:4},
    wave2:{cope:5,connected:5,optimistic:5,sleep:4,stress:5,mood:5},
    outcome:{date:"10 Sep 2024",reason:"Treatment Completed",recovery:"Recovered",improvement:"Yes"},
  },
];

const days = [
  {
    id:1, label:"Day 1", title:"How Data Is Stored",
    subtitle:"Tables, rows, columns, data types & relationships", phase:"foundations", recap:null,
    sections:[
      {type:"intro", content:"Hey Berry 👋 Welcome to your first day. Before we open any software, we're going to spend a bit of time understanding how data is actually organised — because everything you do in Power BI will make way more sense once this clicks. Don't worry, this is all pretty intuitive once you see it with a real example."},
      {type:"lesson", title:"Tables, Rows & Columns", content:`Think about the Patients table you'll be working with shortly. Every patient in the service has a row — one horizontal line of information about them. Every column is a specific piece of information we track about every patient: their ID, their name, their age, their presenting problem.\n\nThat's all a table is. Rows = individual records. Columns = the fields we track. Simple.\n\nHere's a preview of what the Patients table looks like:`,
        table:{
          headers:["PatientID","FirstName","LastName","Age","Gender","Nationality","PresentingProblem","ReferralDate","SurgeryID"],
          rows:[
            ["PAT-001","Sophie","Clarke",34,"Female","British 🇬🇧","Low Mood","2024-01-08","SRG-01"],
            ["PAT-002","James","Okafor",28,"Male","Nigerian 🇳🇬","Anxiety","2024-01-15","SRG-03"],
            ["PAT-007","Sinem","Yilmaz","thirty two","Female","Turkish 🇹🇷","Low Mood","2024-03-11","SRG-03"],
          ],
        },
      },
      {type:"lesson", title:"Data Types", content:"Every column stores a specific type of data. This matters because Power BI behaves differently depending on the type — you can't average names, and you can't spell out a date. Here are the five types you'll come across in your dataset:",
        types:[
          {name:"Text (String)", colour:"#5B6AF0", example:"PAT-001, Sophie, Low Mood, British", note:"Anything that's a word, label or ID. Can't do maths on it."},
          {name:"Whole Number (Integer)", colour:"#E8845C", example:"34 (age), 6 (session number)", note:"Counts and whole amounts. No decimals."},
          {name:"Decimal", colour:"#4CAF82", example:"7.5 (average PHQ-9 score)", note:"Numbers with decimal places — usually calculated averages."},
          {name:"Date", colour:"#9B59B6", example:"2024-01-08 (referral date)", note:"Power BI is very particular about date formats — we'll cover this."},
          {name:"Boolean (True/False)", colour:"#E74C3C", example:"TRUE (ActivePatient), FALSE", note:"Only ever two values. Great for yes/no flags."},
        ],
        callout:"Open the Patients table you've downloaded. Can you find one column for each data type above?",
      },
      {type:"lesson", title:"Primary Keys & Foreign Keys", content:"Every table needs a way to uniquely identify each row — that's called a Primary Key (PK). In the Patients table, that's PatientID. No two patients share the same ID.\n\nWhen that ID appears in another table — like Sessions — it's called a Foreign Key (FK). It's the bridge that links the two tables together.",
        dualTable:{
          left:{title:"Patients (PK = PatientID)", headers:["PatientID 🔑","FirstName","Nationality"], rows:[["PAT-001","Sophie","British 🇬🇧"],["PAT-002","James","Nigerian 🇳🇬"],["PAT-007","Sinem","Turkish 🇹🇷"]]},
          right:{title:"Sessions (FK = PatientID)", headers:["SessionID","PatientID 🔗","PHQ9"], rows:[["SES-001","PAT-001","14"],["SES-002","PAT-001","12"],["SES-004","PAT-002","18"]]},
        },
        afterDual:"Sophie (PAT-001) has two sessions. James (PAT-002) has one. The PatientID in Sessions is the FK — it points back to Patients.",
      },
      {type:"lesson", title:"Relationships: One-to-Many & Many-to-Many", content:"Most relationships in a well-structured database are one-to-many. One patient can have many sessions. One surgery can have many patients.\n\nMany-to-many is where things get messy. Imagine linking Patients directly to Therapists — one patient might see multiple therapists, and one therapist sees multiple patients. The fix is a bridge table that sits in between. Power BI can handle many-to-many but it needs careful setup.", diagram:true},
      {type:"resources", title:"Go Deeper — Watch These", links:[
        {label:"W3Schools — What is RDBMS?", url:"https://www.w3schools.com/mysql/mysql_rdbms.asp", note:"Quick read, the example tables are helpful"},
        {label:"W3Schools — Primary Keys", url:"https://www.w3schools.com/mysql/mysql_primarykey.asp", note:"3 min read"},
        {label:"W3Schools — Foreign Keys", url:"https://www.w3schools.com/mysql/mysql_foreignkey.asp", note:"3 min read"},
        {label:"YouTube — Database Relationships Explained (Lucidchart)", url:"https://www.youtube.com/watch?v=V5DyvUfsboA", note:"8 min — really clear visuals"},
        {label:"YouTube — Primary & Foreign Keys (Socratica)", url:"https://www.youtube.com/watch?v=B5r8CcTUs5Y", note:"6 min — worth it just for the key explanation"},
      ]},
      {type:"quiz", questions:[
        {q:"Look at the Patients table. What data type is the ReferralDate column — the one that contains values like 2024-01-08?", options:["String","Integer","Date","Boolean"], answer:2, explanation:"ReferralDate stores a date value like 2024-01-08. Power BI needs this recognised as a Date type to do time-based analysis — if it's stored as text, date filtering won't work properly."},
        {q:"PatientID is the Primary Key in the Patients table. The same PatientID column also appears in the Sessions table to link the two. What is PatientID called when it appears in the Sessions table?", options:["Primary Key","Foreign Key","Index Key","Lookup Key"], answer:1, explanation:"When a primary key from one table appears in another table to create a link between them, it's called a Foreign Key in that second table. PatientID is the PK in Patients, and the FK in Sessions."},
        {q:"One patient can have many sessions — Sophie Clarke has 3 sessions in the Sessions table, all with PatientID PAT-001. What type of relationship is this between the Patients table and the Sessions table?", options:["Many-to-Many","One-to-One","One-to-Many","Many-to-One"], answer:2, explanation:"One patient (one side) links to many sessions (many side). This is a one-to-many relationship. The 'one' side always holds the primary key — in this case Patients holds PatientID."},
        {q:"The ActivePatient column in your Patients table contains only TRUE or FALSE values — nothing else. What data type is this?", options:["String","Integer","Date","Boolean"], answer:3, explanation:"Boolean columns only ever hold True or False. They're great for yes/no flags like whether a patient is currently active in the service."},
        {q:"Imagine trying to link a Patients table directly to a Therapists table. One patient might see multiple therapists, and one therapist sees multiple patients. Why is this a problem?", options:["It creates too many rows in the table","Neither table has a unique key that cleanly identifies the 'one' side — you need a bridge table in between","It only works in Excel, not in Power BI","It makes the file too large to open"], answer:1, explanation:"Many-to-many means both tables have multiple matching rows on each side. There's no clean 'one' side to anchor the relationship on. The fix is a bridge table — a third table that sits between them with one row per patient-therapist combination."},
      ]},
      {type:"hardquiz", questions:[
        {q:"The Nationality column contains values like 'British' and 'Turkish'. What data type is this, and could you use it in a SUM calculation?", options:["String — no, you can't sum text","Integer — yes","Boolean — maybe","Decimal — yes"], answer:0, explanation:"Nationality is a String (text). You can COUNT how many British patients there are, but you can't SUM a text column. Only numeric columns can be summed."},
        {q:"You notice two rows in the Patients table with the same PatientID (PAT-004) but the row appears twice. What is this called and why does it cause a problem when linking tables?", options:["A duplicate — harmless in most cases","A duplicate — it breaks the Primary Key rule because PKs must be unique, making foreign key lookups in Sessions ambiguous","A foreign key conflict — easy to fix","A data type mismatch"], answer:1, explanation:"A Primary Key must be unique — no two rows can share the same value. If PAT-004 appears twice in Patients, any Sessions row pointing to PAT-004 could match either record. Power BI won't know which is correct and the relationship becomes unreliable."},
        {q:"You want to link the GP Surgeries table to the Patients table using SurgeryID. GP Surgeries has one row per surgery (SRG-01, SRG-02 etc). Patients has many patients all sharing the same SurgeryID. Which table holds the Primary Key for SurgeryID, and which holds the Foreign Key?", options:["Patients holds the PK because there are more patients","GP Surgeries holds the PK (SurgeryID) because it has one row per surgery — Patients holds SurgeryID as a Foreign Key","Either table can hold the PK — it doesn't matter which","Neither — SurgeryID creates a many-to-many relationship"], answer:1, explanation:"GP Surgeries is the 'one' side — each surgery appears exactly once, so SurgeryID is the Primary Key there. Many patients can belong to the same surgery, so Patients holds SurgeryID as a Foreign Key pointing back to GP Surgeries. The PK always lives on the 'one' side of the relationship."},
      ]},
    ],
  },
  {
    id:2, label:"Day 2", title:"Your First Look at the Data",
    subtitle:"Open the files, get familiar, spot what's off", phase:"foundations",
    recap:"Yesterday you learned how data is organised into tables with rows and columns, the five key data types, and how Primary and Foreign Keys link tables together. Today you're opening the actual files.",
    sections:[
      {type:"intro", content:"Today is simple — open the three Excel files (Patients, Sessions, Outcomes), have a proper look around, and work through the tasks below one by one. Some things will jump out immediately. Others you'll need to look closer. The goal isn't to fix everything perfectly — it's to get really familiar with the data before we take it into Power BI."},
      {type:"tasks", title:"Patients Table", file:"Patients.xlsx", tasks:[
        {id:"p1", text:"Have a read through the columns. Can you name the data type of each one?"},
        {id:"p2", text:"Something doesn't look quite right in one of the columns — have a look and see if you can spot it. Fix it when you do."},
        {id:"p3", text:"There are some rows that appear more than once. Remove the duplicates so each patient appears only once."},
        {id:"p4", text:"One of the text columns has some inconsistent entries — the same value written in different ways. Standardise them so the column is consistent throughout."},
        {id:"p5", text:"Have a look at the Nationality column — notice any patterns? Which nationalities appear in the dataset?"},
      ]},
      {type:"tasks", title:"Sessions Table", file:"Sessions.xlsx", tasks:[
        {id:"s1", text:"Take a look through the columns — notice anything familiar from yesterday's lesson?"},
        {id:"s2", text:"There's a column that should link Sessions back to Patients. Can you find it?"},
        {id:"s3", text:"Have a look at the date column — do all the dates look the same format?"},
        {id:"s4", text:"Look at the Attendance column — are all the values consistent? Something doesn't look right in at least one row."},
        {id:"s5", text:"Find the session where the attendance value suggests the patient wasn't there, but scores have still been recorded. Note it down — what would you do with this row?"},
        {id:"s6", text:"Have a look at the TherapistName column — is every name spelled the same way throughout?"},
      ]},
      {type:"tasks", title:"Outcomes Table", file:"Outcomes.xlsx", tasks:[
        {id:"o1", text:"Look through the table — what does one row represent?"},
        {id:"o2", text:"Cross reference a few PatientIDs with the Patients table. Do they all match up?"},
        {id:"o3", text:"Have a look at the PresentingProblemAtDischarge column — does everything look right?"},
        {id:"o4", text:"Check the RecoveryStatus column — are all the values written the same way?"},
      ]},

      {type:"bonus", title:"⭐ Bonus Challenge — Excel Formula Fun", tasks:[
        {id:"b2_1", text:"Add a new column called Title to the Patients table. If Gender is Male → Mr, if Female → Ms. Use an IF formula: =IF(E2=\"Male\",\"Mr\",\"Ms\")"},
        {id:"b2_2", text:"Add a new column called Initials. This should show the first letter of FirstName and first letter of LastName joined together — e.g. Sophie Clarke → SC. Use: =LEFT(B2,1)&LEFT(C2,1)"},
        {id:"b2_3", text:"Add a FullName column that combines Title, FirstName and LastName into one — e.g. \"Ms Sophie Clarke\". Use: =D2&\" \"&B2&\" \"&C2 (where D2 is your Title column)."},
        {id:"b2_4", text:"Notice how the Gender column has inconsistencies (female, F etc) — does your Title formula handle those? What happens if Gender = \"female\" lowercase? Fix the Gender column first and see what changes."},
      ]},
      {type:"comprehension", title:"Quick Questions — answer using filters or COUNTIF / COUNTIFS", questions:[
        {q:"How many patients were referred for Low Mood?", a:"9 patients — use COUNTIF on the PresentingProblem column filtering for \"Low Mood\"."},
        {q:"How many sessions were marked as DNA (Did Not Attend)?", a:"8 sessions — COUNTIF on the Attendance column for \"DNA\". Note: one row says \"Not attended\" which you\'ll standardise in Power BI."},
        {q:"What is the most common presenting problem across all patients?", a:"Low Mood — it appears most frequently across the Patients table."},
        {q:"How many patients have been discharged (check Outcomes)?", a:"28 patients have an outcome record. PAT-025 and PAT-029 have no outcome row yet — they\'re still active."},
        {q:"Which session type (phone / video / face-to-face) appears most often?", a:"Telephone — COUNTIF the SessionType column to compare all three types."},
        {q:"How many Turkish patients are in the dataset?", a:"6 Turkish patients — Rojiin Demir, Sinem Yilmaz, Dilan Arslan, Beritan Kaya, Dilal Ozturk and Rojiin Celik."},
        {q:"🧶 Multi-criteria: How many patients are Nigerian AND referred for Anxiety? Use COUNTIFS with two criteria ranges.", a:"1 patient — James Okafor. COUNTIFS(Nationality,\"Nigerian\",PresentingProblem,\"Anxiety\"). COUNTIFS lets you stack multiple conditions unlike COUNTIF which only takes one."},
        {q:"🧶 Multi-criteria: How many patients are Turkish OR Nigerian? Hint — you can\'t do OR directly in COUNTIFS, so use two separate COUNTIFs and add them together.", a:"8 patients total — 6 Turkish + 2 Nigerian (James Okafor and Grace Osei and Yemi Adeyemi). Formula: =COUNTIF(Nationality,\"Turkish\")+COUNTIF(Nationality,\"Nigerian\")"},
        {q:"🧶 Multi-criteria: How many Female patients were referred for Low Mood? Use COUNTIFS with Gender and PresentingProblem.", a:"7 patients — COUNTIFS(Gender,\"Female\",PresentingProblem,\"Low Mood\"). This is where COUNTIFS shines — stacking two conditions to get a precise answer."},
      ]},
      {type:"resources", title:"Useful for Today", links:[
        {label:"Excel — Remove Duplicates (Microsoft Support)", url:"https://support.microsoft.com/en-us/office/find-and-remove-duplicates-00e35bea-b46a-4d5d-b28e-66a552dc138d", note:"If you need a reminder"},
        {label:"YouTube — COUNTIF explained in 5 mins (ExcelJet)", url:"https://www.youtube.com/watch?v=8OKFZ-IOdNc", note:"Handy for the comprehension questions"},
      ]},
      {type:"hardquiz", questions:[
        {q:"You find a session row where Attendance = 'DNA' but PHQ9 = 9 and GAD7 = 7. What's the correct action and why?", options:["Leave it — the scores might be from a previous session","Null out the scores — a DNA means the patient didn't attend so no scores could have been collected","Delete the whole row","Change the attendance to Attended"], answer:1, explanation:"If a patient didn't attend (DNA), no assessment could have been completed. The scores are a data entry error. The right fix is to null them out, not delete the row — the session still happened (as a non-attendance event)."},
        {q:"The TherapistName column has 'Solomon Attah' in most rows but 'Soloman Attah' in one. Why does this matter for Power BI reporting?", options:["It doesn't — Power BI ignores minor spelling differences","Power BI treats them as two different therapists, so session counts and measures would split across both names","It matters only for printing","It affects date calculations"], answer:1, explanation:"Power BI is exact-match on text. 'Solomon Attah' and 'Soloman Attah' become two separate values. If you group by therapist, Solomon's sessions would be split across two rows — making his totals wrong."},
        {q:"In the Outcomes table, RecoveryStatus has 'Recovered', 'Not Recovered', and 'not recovered'. How many distinct values will Power BI count this as?", options:["1 — it ignores case","2 — Recovered and Not Recovered","3 — all three are different","Depends on the visual"], answer:2, explanation:"Power BI is case-sensitive for text grouping. 'Not Recovered' and 'not recovered' are treated as two distinct values. Your recovery rate measure would be wrong until you standardise the column."},
      ]},
    ],
  },
  {
    id:3, label:"Day 3", title:"Into Power BI",
    subtitle:"Load your data, meet Power Query, start cleaning", phase:"powerbi",
    recap:"Last time you opened the three source files, spotted inconsistencies, DNA errors, typos and duplicates. You know this dataset well now. Today we bring it into Power BI.",
    sections:[
      {type:"intro", content:"Welcome to Power BI. This is where it all starts to come together. Today you're going to load your three cleaned files, meet Power Query (Power BI's built-in data cleaning tool), and fix the issues we left in from the source data. By the end of today you'll have clean tables loaded and ready to connect."},
      {type:"lesson", title:"The Three Views in Power BI", content:"When you open Power BI Desktop you'll see three icons on the left sidebar:\n\nReport view — this is where you build visuals and dashboards.\n\nTable view — shows you your data as a table. Good for checking things look right.\n\nModel view — shows your tables and how they relate. This is where you draw relationships."},
      {type:"lesson", title:"Loading Your Data", content:"Go to Home → Get Data → Excel Workbook. Load in your Patients, Sessions and Outcomes files one at a time. When the Navigator opens, tick the sheet and click Transform Data — this takes you into Power Query rather than loading straight in. Always do this.",
        tip:"Always click Transform Data rather than Load — it gives you a chance to check and clean before anything lands in your model."},
      {type:"tasks", title:"Power Query — Clean These", tasks:[
        {id:"pq1", text:"In the Sessions table, the date column has some inconsistent formats. Right-click the column header → Change Type → Date. See what happens — does it flag any errors?"},
        {id:"pq2", text:"Some PHQ-9 and GAD-7 score cells are blank. Right-click → Replace Values. Think carefully — should blanks become 0, or stay null? What would make more analytical sense?"},
        {id:"pq3", text:"Fix the TherapistName typo — 'Soloman Attah' needs to become 'Solomon Attah'. Use Replace Values in Power Query."},
        {id:"pq4", text:"Fix the Attendance inconsistency — 'Not attended' needs to match 'DNA'. Replace Values again."},
        {id:"pq5", text:"Fix the DNA session that has scores — select those rows and null out the PHQ9 and GAD7 values."},
        {id:"pq6", text:"Check data types on every column in all three tables. Fix any that look wrong."},
        {id:"pq7", text:"When you're happy, click Close & Apply. Your tables will load into Power BI."},
      ]},
      {type:"lesson", title:"Why Applied Steps Matter", content:"Power Query records every step you take as Applied Steps on the right-hand side. When new data comes in next month, you just refresh — all those cleaning steps run again automatically. You never redo the work.\n\nThis is one of the things that makes Power BI genuinely powerful for consultancy work.",
        tip:"Applied Steps are your cleaning audit trail. A client can see exactly what was done to their data and why."},
      {type:"resources", title:"Watch These", links:[
        {label:"YouTube — Power BI for Beginners: Getting Data (Guy in a Cube)", url:"https://www.youtube.com/watch?v=TmhQCQr_AbQ", note:"Start here"},
        {label:"YouTube — Power Query Full Tutorial (Pragmatic Works)", url:"https://www.youtube.com/watch?v=0aeZX1l4JT4", note:"Longer but covers everything you'll need this week"},
      ]},
      {type:"quiz", questions:[
        {q:"You click 'Get Data' and the Navigator opens. Should you click Load or Transform Data?", options:["Load — get it in quickly","Transform Data — clean it first","Either works","Depends on file type"], answer:1, explanation:"Always Transform Data first. Once data lands without cleaning it's harder to fix."},
        {q:"In Power Query, you replace null PHQ-9 values with 0. Is this always right?", options:["Yes — nulls always become 0","No — a null means the assessment wasn't taken, which is different to scoring 0","Yes — Power BI can't handle nulls","No — delete those rows"], answer:1, explanation:"A null PHQ-9 means the assessment wasn't completed — that's different data to a score of 0. You might flag it or exclude it from averages instead."},
        {q:"Why is Power Query's Applied Steps list useful for consultancy work?", options:["It makes the file smaller","It emails your client automatically","Your cleaning logic reruns automatically when new data comes in","It converts data to SQL"], answer:2, explanation:"Applied Steps means your transformation logic is repeatable. Refresh the data source and every step runs again."},
      ]},
      {type:"hardquiz", questions:[
        {q:"You need to remove rows where Attendance = 'DNA' AND scores are not null. Which Power Query approach is most efficient?", options:["Delete them manually one by one","Use Add Column → Conditional Column to flag them, then filter on the flag","Filter on Attendance = DNA, then filter again on PHQ9 not null, then remove those rows","Change the scores to null using Replace Values filtered to DNA rows only"], answer:3, explanation:"The cleanest approach is Replace Values scoped to the right rows — you keep the DNA session record (important for attendance metrics) but correct the erroneous scores. Deleting the rows would lose the DNA event from your counts."},
        {q:"After fixing 'Soloman Attah' to 'Solomon Attah' in Power Query, a new data batch arrives with the typo again. What happens?", options:["The fix disappears and you have to redo it","The Applied Step runs on the new data automatically and fixes it","You need to manually check each new batch","Power BI rejects the new data"], answer:1, explanation:"This is the beauty of Applied Steps — the Replace Values step runs on every data refresh. The fix is baked in. New batches with the same typo get corrected automatically."},
        {q:"The Nationality column has 'British', 'Turkish', 'Nigerian', 'Indian', 'Somali'. You want to add a flag emoji next to each in Power BI. Where is the best place to do this?", options:["Edit the source Excel file","Add a Conditional Column in Power Query","Use a DAX calculated column","Change it in the visual formatting"], answer:1, explanation:"A Conditional Column in Power Query is ideal — you add a new FlagEmoji column with IF Nationality = British → 🇬🇧 etc. It's clean, repeatable, and doesn't touch the source data."},
      ]},
    ],
  },
  {
    id:4, label:"Day 4", title:"Dashboards, Star Schema & First Visuals",
    subtitle:"What a dashboard actually is, your model, and your first 5 visuals", phase:"powerbi",
    recap:"Last time you went into Power BI for the first time — loaded your tables, cleaned them in Power Query, fixed typos and nulls. Today's a big one. Day 4 has been updated after you've been breezing through 😉 you're on a corporate journey now.",
    sections:[
      {type:"intro", content:"Today has a few parts: what a dashboard actually is and why it matters, the star schema (with a proper video this time), building your model and first 5 visuals, then a look at chart types and when to use each. By the end of today you'll have something that genuinely looks like a Power BI report."},
      {type:"lesson", title:"What Is a Dashboard, Actually?", content:"A dashboard is a single screen that answers the questions a decision-maker has, at a glance, without them needing to dig through raw data themselves. Think about your old manager at the Talking Therapies service — they don't want to scroll through 300 rows of session data. They want to know: how many referrals this month, what's our recovery rate, are we hitting our DNA targets.\n\nA report is usually the full thing — multiple pages, lots of detail, built for someone who wants to explore. A dashboard is the summary view — built for someone who wants the headline in 10 seconds.\n\nIn Power BI the two blur together a bit (people use the words loosely) but the principle holds: every visual you add should answer a real question someone actually has."},
      {type:"lesson", title:"Watch First — Star Schema Explained", content:"Before you touch the model, watch this. It explains fact tables, dimension tables, and why star schema is the standard approach — properly visual, properly clear.", video:{label:"Star Schema vs Snowflake Schema, Fact vs Dimension Table (codebasics)", url:"https://www.youtube.com/watch?v=hQvCOBv_-LE", note:"Covers exactly what you need before building your model today."}},
      {type:"lesson", title:"Your Star Schema, Recap", content:"Patients is your hub. Sessions, Outcomes and GP Surgeries all connect to it. One patient → many sessions. One patient → one outcome. One surgery → many patients.\n\nToday you're connecting all four tables. You won't do anything further with GP Surgeries yet beyond loading and connecting it — that's coming later.", starDiagram:true},
      {type:"tasks", title:"Build the Model — All 4 Tables", tasks:[
        {id:"m1", text:"Go to Model view (the icon that looks like three connected boxes on the left)."},
        {id:"m2", text:"Drag PatientID from Patients onto PatientID in Sessions. A line appears — that's your relationship."},
        {id:"m3", text:"Do the same to connect Patients → Outcomes via PatientID."},
        {id:"m4", text:"Load GPSurgeries.xlsx via Get Data → Transform Data. There's something in there that needs cleaning before you use it — have a look."},
        {id:"m5", text:"Once clean, Close & Apply, then connect SurgeryID from GP Surgeries to SurgeryID in Patients."},
        {id:"m6", text:"Click each relationship line — check the cardinality shows one-to-many with the arrow flowing outward from the 'one' side each time."},
        {id:"m7", text:"You now have a working 4-table star schema. Take a screenshot — this is worth being proud of."},
      ]},
      {type:"lesson", title:"Watch Second — Popular Visualisations", content:"With your model built, now watch this. It walks through the chart types you'll use constantly: stacked bar, stacked column, line, line + column, scatter, pie/donut, card and table. Keep this on hand as a reference.", video:{label:"Popular Visualizations in Power BI (Alex The Analyst)", url:"https://www.youtube.com/watch?v=3NV5Jtbhfcw", note:"Timestamps: 1:30 Stacked Bar, 3:00 Stacked Column, 5:12 Line, 7:30 Line+Column, 8:36 Scatter, 9:29 Pie/Donut, 11:08 Card, 12:21 Table"}},
      {type:"lesson", title:"Chart Types — When to Use What", content:"Bar chart (horizontal) — great for comparing categories with long labels, like presenting problems or surgery names.\n\nColumn chart (vertical) — same idea but better when you want a left-to-right sense of progression, like months.\n\nLine chart — built for trends over time. Always put your date field on the X axis. This is the one place where order matters — Power BI needs to know your dates are continuous, not just categories.\n\nPie / Donut chart — only ever for proportion of a whole, like nationality split. Never use a pie chart to show change over time — that's what line charts are for. A pie chart with more than 5-6 slices becomes unreadable, so use it sparingly.\n\nScatter chart — shows the relationship between two numeric values, like PHQ-9 score vs GAD-7 score per patient.\n\nCard — a single big number. Total Patients, Recovery Rate. You'll use these once you have measures, in a later day.",
        callout:"Rule of thumb: if you're showing a trend over time, use a line chart. If you're comparing categories, use a bar or column chart. If you're showing parts of a whole, use a pie chart — but only with a handful of categories."},
      {type:"lesson", title:"Table vs Matrix", content:"A Table shows your data in flat rows and columns — like Excel. Good for a detailed list, e.g. every patient and their referral date.\n\nA Matrix is more like a Pivot Table — it lets you put one field on rows and another on columns, and it shows you a cross-tab. For example: Presenting Problem on rows, Nationality on columns, and Count of Patients in the values. This is brilliant for spotting patterns a simple bar chart would hide — like whether a particular nationality is more associated with one presenting problem than another.\n\nUse a Table when you want a clean list. Use a Matrix when you want to cross-reference two categories against each other.",
        callout:"You'll build one of each today so you can feel the difference yourself."},
      {type:"lesson", title:"X and Y Axis — Plotting Dates Correctly", content:"On any chart with two axes, the X axis (horizontal) is usually your category or time field — like Month, or Presenting Problem. The Y axis (vertical) is usually your number — Count of Patients, Average Score.\n\nWhen plotting dates specifically: always make sure Power BI recognises the column as a proper Date type (you did this back in Power Query already). If a date column is still text, Power BI will often sort it alphabetically rather than chronologically — March would come before January. That's an easy and very common mistake to spot and fix."},
      {type:"tasks", title:"Build Your First 5 Visuals", tasks:[
        {id:"v1", text:"PIE CHART — drag PresentingProblem onto a pie chart. This shows you the proportion of each presenting problem across all patients."},
        {id:"v2", text:"BAR CHART — drag Nationality onto a bar chart with Count of PatientID. Compare how it reads next to the pie chart."},
        {id:"v3", text:"LINE CHART — drag ReferralDate onto the X axis and Count of PatientID onto the Y axis. Check Power BI is reading ReferralDate as a continuous date, not sorting it as text."},
        {id:"v4", text:"TABLE — add a table visual with PatientID, FullName (or FirstName + LastName), PresentingProblem and ReferralDate. This is your detail view."},
        {id:"v5", text:"MATRIX — add a matrix with PresentingProblem on rows, Nationality on columns, and Count of PatientID in values. Look for any patterns. Does anything stand out?"},
        {id:"v6", text:"No KPI cards yet — those need measures, which comes in a later day. For now, this is purely visual practice."},
      ]},
      {type:"quiz", questions:[
        {q:"You want to show how referrals have changed month by month over the year. Which chart type is correct?", options:["Pie chart","Line chart","Card","Matrix"], answer:1, explanation:"Line charts are built for trends over time. Pie charts show proportion of a whole at a single point in time, not change over time."},
        {q:"You want to compare PresentingProblem against Nationality to see if any patterns exist between the two categories. What should you use?", options:["A pie chart","A line chart","A Matrix — Presenting Problem on rows, Nationality on columns","A card"], answer:2, explanation:"A Matrix lets you cross-reference two categorical fields against each other, like a pivot table. A pie or line chart can only really show one category at a time."},
        {q:"Your ReferralDate column is showing on a line chart in alphabetical order rather than chronological order — March before January. What's the likely cause?", options:["The chart type is wrong","The column isn't recognised as a Date type — it's probably still Text","Power BI is broken","You need to use a Matrix instead"], answer:1, explanation:"If a date column is stored as Text, Power BI sorts it alphabetically. Go back to Power Query and confirm the column type is set to Date, not Text."},
        {q:"Why shouldn't you use a pie chart to show 8 different presenting problems?", options:["Pie charts can only show 2 categories","Too many slices become hard to read and compare visually — a bar chart works better for many categories","Power BI doesn't allow more than 5 slices","Pie charts only work with numbers, not categories"], answer:1, explanation:"Pie charts are great for a handful of categories but become cluttered and hard to compare visually beyond 5-6 slices. A bar chart scales much better for more categories."},
      ]},
      {type:"hardquiz", questions:[
        {q:"You connect GP Surgeries to Patients via SurgeryID but Power BI shows a 'many-to-many' warning. Patients has 30 rows. What's the most likely cause given what you fixed earlier in the course?", options:["GP Surgeries has too many columns","There's a duplicate PatientID still in the Patients table breaking its uniqueness as the 'one' side","SurgeryID is the wrong data type","Power BI has a bug"], answer:1, explanation:"If a duplicate PatientID slipped through, Patients is no longer cleanly unique on its key, which can cascade into ambiguous relationships elsewhere in the model. Always double check your dimension tables are clean before connecting them."},
        {q:"You build a Matrix with PresentingProblem on rows and Nationality on columns. One cell shows a count of 0. What does that tell you?", options:["The model is broken","No patients of that nationality have that presenting problem in the dataset — a genuinely useful absence to notice","You need to refresh the data","The relationship is many-to-many"], answer:1, explanation:"A 0 in a Matrix cell is real information — it tells you that combination simply doesn't occur in your data. Spotting absences like this is exactly the kind of pattern recognition a consultant gets paid to notice."},
        {q:"Why are KPI cards intentionally left out of today's visuals even though they're the most common thing people picture on a dashboard?", options:["Cards are too hard to build","Cards typically display a measure (like Recovery Rate %) and you haven't learned to write measures yet", "Cards don't work with this dataset","Cards require a Date Table first"], answer:1, explanation:"A card usually shows a single calculated number — most often a DAX measure rather than a raw column. Since measures haven't been taught yet, building cards now would mean copying syntax without understanding it. Cards will make much more sense once you've covered measures."},
      ]},
    ],
  },
  {
    id:5, label:"Day 5", title:"Merging Data & Calculated Columns",
    subtitle:"What a merge actually is, the postcode merge, and some quick calculated column practice", phase:"powerbi",
    recap:"Last time was a big one — dashboards explained, your full 4-table star schema connected, and your first 5 visuals built. Today is shorter and focused on one specific skill: merging. We'll round it off with a few calculated columns since today has a bit of room.",
    sections:[
      {type:"intro", content:"Today you're learning a skill that's genuinely one of the most useful things in a consultant's toolkit — merging data. It's different to a relationship, and today you'll feel that difference for yourself. Then a few quick calculated columns to round things out."},
      {type:"lesson", title:"Merge vs Relationship — What's the Difference?", content:"A relationship (what you built last time) is a live link between two tables. The tables stay separate, but Power BI knows how to connect them when you build a visual. Nothing gets copied — it's all done on the fly.\n\nA merge is different. A merge physically pulls columns from one table into another, creating a combined result. It's the Power Query equivalent of a VLOOKUP — you're looking up a value in one table and bringing it into another.\n\nYou'd use a relationship when you want two tables to stay separate but linked (like Patients and Sessions). You'd use a merge when you specifically want to enrich one table with extra columns from another — which is exactly what you're about to do with postcodes.", video:{label:"How To Easily Merge Tables With Power Query: VLOOKUP Alternative (Excel Campus)", url:"https://www.youtube.com/watch?v=73T7isNVH_w", note:"Watch this before starting — it explains merging in the exact terms you'll recognise from VLOOKUP."}},
      {type:"lesson", title:"The Postcode Merge", content:"Your Patients table now has a Postcode column — things like 'SW16 7PQ'. On its own that's not very useful for reporting. But you've also been given a PostcodePrefixes.xlsx file that maps postcode prefixes (like 'SW16') to an AreaName and a Region (like 'London').\n\nThe problem: your Patients table has the full postcode including the space and suffix ('SW16 7PQ'), but PostcodePrefixes only has the prefix ('SW16'). You can't merge these directly — the values don't match. You need to extract just the prefix from Patients' Postcode column first, then merge on that.",
        tip:"This is a genuinely realistic scenario. Real-world data almost never lines up perfectly for a merge on the first try — you'll usually need to clean or extract something first."},
      {type:"tasks", title:"Postcode Merge — Step by Step", file:"PostcodePrefixes.xlsx", tasks:[
        {id:"pm1", text:"Load PostcodePrefixes.xlsx into Power BI via Get Data → Transform Data."},
        {id:"pm2", text:"In the Patients query, add a Custom Column called PostcodePrefix. Use Text.BeforeDelimiter([Postcode], \" \") to grab everything before the space — e.g. 'SW16 7PQ' becomes 'SW16'."},
        {id:"pm3", text:"Check your new PostcodePrefix column against the PostcodePrefix column in PostcodePrefixes.xlsx — do the values now match?"},
        {id:"pm4", text:"On the Patients query, go to Home → Merge Queries. Select PostcodePrefixes as the table to merge, and match on PostcodePrefix in both tables."},
        {id:"pm5", text:"Use a Left Outer join — this keeps every patient even if a postcode prefix doesn't match anything (worth checking if any don't)."},
        {id:"pm6", text:"Expand the merged column and select just Region (and AreaName if you want it). Untick 'Use original column name as prefix' so the new column is just called Region."},
        {id:"pm7", text:"Close & Apply. You now have a Region column on your Patients table, sourced entirely from a separate file."},
      ]},
      {type:"tasks", title:"Second Merge — Extra Practice", tasks:[
        {id:"pm8", text:"For a second rep at this skill: in your Sessions table, you have a TherapistName column but no extra detail about each therapist. Create a small reference table yourself in Excel with two columns — TherapistName and a made-up TherapistRole (e.g. 'Senior PWP', 'Trainee PWP') for each of the four therapists (Dr. Lena Marsh, Solomon Attah, Berivan Sahin, Sarah Obi)."},
        {id:"pm9", text:"Load this new table into Power BI and merge it onto Sessions using TherapistName as the matching column."},
        {id:"pm10", text:"Notice anything tricky? If 'Soloman Attah' (the typo) wasn't fully cleaned earlier, the merge would miss those rows. This is exactly why cleaning early matters — a merge is only as good as the columns you're matching on."},
      ]},
      {type:"lesson", title:"Calculated Columns — Using the New DateOfBirth Field", content:"Quick one to round off today. Your Patients table now has a DateOfBirth column. These are all calculated columns in Power Query — row by row, just like you've practised before."},
      {type:"tasks", title:"Calculated Columns Practice", file:"Patients_1.xlsx", tasks:[
        {id:"c1", text:"In Power Query, add a Custom Column called MonthsOld using Duration.TotalDays and dividing by ~30, or use DateTime.LocalNow() compared to DateOfBirth. Don't worry about being exact — this is about practising the logic."},
        {id:"c2", text:"Add a DaysOld column showing how many days old each patient is, using the difference between today and DateOfBirth."},
        {id:"c3", text:"For a bit of fun: add a DaysTilRetirement column, assuming retirement age is 67. Calculate DateOfBirth + 67 years, then the number of days between that date and today."},
        {id:"c4", text:"Try one more calculated column of your own choosing using the new fields (DateOfBirth, Email, Postcode, Region). What else could be useful to calculate?"},
      ]},
      {type:"resources", title:"Watch These", links:[
        {label:"How To Easily Merge Tables With Power Query: VLOOKUP Alternative (Excel Campus)", url:"https://www.youtube.com/watch?v=73T7isNVH_w", note:"The main video for today — clear and beginner-friendly"},
      ]},
      {type:"quiz", questions:[
        {q:"What's the key difference between a relationship and a merge?", options:["There is no real difference", "A relationship links two tables live without copying data; a merge physically pulls columns from one table into another", "A merge is only for dates", "A relationship only works with one table"], answer:1, explanation:"A relationship keeps tables separate but linked behind the scenes. A merge combines columns from one table directly into another, creating a new enriched result."},
        {q:"Patients has Postcode = 'SW16 7PQ'. PostcodePrefixes has PostcodePrefix = 'SW16'. Why can't you merge these two columns directly?", options:["They're different data types","The values don't match exactly — one has extra characters the other doesn't","Power Query doesn't support postcodes","You need a relationship instead"], answer:1, explanation:"A merge needs matching values on both sides. 'SW16 7PQ' and 'SW16' are not identical, so you first need to extract just the prefix from Patients before the merge will work."},
        {q:"Which join type should you use for the postcode merge so that no patients are accidentally dropped from the table?", options:["Inner join", "Left Outer join — keeps every row from Patients regardless of a match","Right Outer join","Full Outer join"], answer:1, explanation:"A Left Outer join keeps every row from your primary table (Patients) and brings in matching data where it exists. An Inner join would silently drop any patient whose postcode prefix didn't match — risky."},
      ]},
      {type:"hardquiz", questions:[
        {q:"After your postcode merge, three patients show a blank Region. What does this most likely mean?", options:["The merge failed completely","Their postcode prefix doesn't exist in PostcodePrefixes.xlsx — the lookup table doesn't cover every possible prefix","Power BI has a bug","You used the wrong join type"], answer:1, explanation:"A blank after a Left Outer join means no match was found — in this case the postcode prefix simply isn't in your reference table. This is common in real consultancy work; reference tables are rarely 100% complete and you'd flag this to a client."},
        {q:"Your second merge (TherapistName) silently drops Solomon Attah's session rows where the name was typed 'Soloman Attah'. What's the underlying lesson here?", options:["Merges are unreliable and shouldn't be used","A merge is only as accurate as the exactness of the values you're matching on — inconsistent text breaks it silently with no error message","You need a relationship instead of a merge","TherapistName should be a number, not text"], answer:1, explanation:"This is one of the most important lessons in data work: a merge won't throw an error for a near-miss like 'Soloman' vs 'Solomon' — it just won't match, and the row quietly gets a blank. This is exactly why cleaning text columns early protects everything you build later."},
        {q:"Why would a consultant generally prefer a relationship over a merge when connecting Patients to Sessions, but prefer a merge for bringing in Region from postcodes?", options:["Merges are always better","Relationships keep large fact tables (like Sessions) efficient and dynamic; merges suit smaller reference enrichments where you just want extra descriptive columns added once", "It doesn't matter which you use","Merges are required for any table over 20 rows"], answer:1, explanation:"Relationships are efficient for connecting tables that stay large and central to your model — you don't want to physically duplicate Sessions data into Patients. Merges suit smaller, descriptive enrichments like adding a Region label, where you genuinely just want a new column added permanently."},
      ]},
    ],
  },
  {
    id:6, label:"Day 6", title:"Measures",
    subtitle:"DAX measures — the smart, dynamic calculations that make Power BI powerful", phase:"powerbi",
    recap:"Yesterday you learned to merge — postcodes into Region, plus a second practice merge on therapists. You now understand the difference between a relationship and a merge. Today is all about measures.",
    sections:[
      {type:"intro", content:"Today is one of the most important days in the whole course. Measures are what separate a Power BI report that just displays data from one that actually answers questions dynamically. Once you can write measures confidently, you can build almost anything."},
      {type:"lesson", title:"Calculated Column vs Measure — Quick Recap", content:"You've already written calculated columns (MonthsOld, DaysOld, DaysTilRetirement on Day 4) — these calculate row by row and live permanently in the table.\n\nA Measure is different. It doesn't calculate row by row — it calculates based on whatever is currently selected on the report. Change a slicer, and the measure recalculates instantly. This is what makes Power BI feel 'alive' compared to a static spreadsheet.",
        video:{label:"DAX Measures vs Calculated Columns (Guy in a Cube)", url:"https://www.youtube.com/watch?v=53RFhSzBBi8", note:"The single most important distinction in Power BI — watch this before writing your first measure today."}},
      {type:"lesson", title:"Your First Measures", content:"Measures are written in DAX. The basic pattern for most simple measures is an aggregation function wrapped around a column:",
        daxExamples:[
          {name:"Youngest Patient", formula:"Youngest Patient = MIN(Patients[DateOfBirth])", note:"MIN finds the earliest date — meaning the most recently born, i.e. youngest patient"},
          {name:"Oldest Patient", formula:"Oldest Patient = MAX(Patients[DateOfBirth])", note:"MAX finds the earliest-born, i.e. oldest patient"},
          {name:"Average Age at Referral", formula:"Avg Age at Referral = AVERAGE(Patients[Age])", note:"Simple average across the Age column"},
          {name:"Total Patients", formula:"Total Patients = COUNTROWS(Patients)", note:"Counts every row in the Patients table — try this on a card visual"},
        ],
      },
      {type:"lesson", title:"A Measure That Uses Other Measures", content:"This is where it gets clever. A measure can reference other measures you've already built, rather than going back to the raw column every time.",
        daxExamples:[
          {name:"Age Range (Days)", formula:"Age Range Days = DATEDIFF([Youngest Patient], [Oldest Patient], DAY)", note:"DATEDIFF calculates the day difference between your two existing measures — notice it references [Youngest Patient] and [Oldest Patient] in square brackets rather than rewriting the MIN/MAX logic again"},
          {name:"Total Patients by Region", formula:"Region Patients = CALCULATE(COUNTROWS(Patients), ALLEXCEPT(Patients, Patients[Region]))", note:"Counts patients but keeps the Region context — try this in a table with Region on rows"},
          {name:"Count by Title", formula:"Mr Count = CALCULATE(COUNTROWS(Patients), Patients[Title] = \"Mr\")", note:"Counts how many patients have Title = Mr, using your Title column from the merge work earlier"},
        ],
      },
      {type:"tasks", title:"Build These Measures", tasks:[
        {id:"me1", text:"Create the Youngest Patient measure. Put it on a card. What date shows?"},
        {id:"me2", text:"Create the Oldest Patient measure. Put it on a second card next to the first."},
        {id:"me3", text:"Create the Age Range (Days) measure using DATEDIFF referencing your two new measures."},
        {id:"me4", text:"Create the Average Age at Referral measure. Format it to show 1 decimal place."},
        {id:"me5", text:"Create the Total Patients by Region measure. Build a simple table or bar chart with Region on rows to see it in action."},
        {id:"me6", text:"Create a Ms Count measure as well as Mr Count, using your Title column. Do the numbers add up to your Total Patients measure?"},
        {id:"me7", text:"Try writing one measure entirely on your own using a column you haven't used yet. What question are you trying to answer with it?"},
      ]},
      {type:"resources", title:"Watch These", links:[
        {label:"DAX Measures vs Calculated Columns (Guy in a Cube)", url:"https://www.youtube.com/watch?v=53RFhSzBBi8", note:"Watch first — sets up everything else today"},
      ]},
      {type:"quiz", questions:[
        {q:"What's the core difference between a calculated column and a measure?", options:["No real difference", "A calculated column computes row by row and lives in the table permanently; a measure computes dynamically based on filters and slicers", "Measures are always slower", "Calculated columns only work with text"], answer:1, explanation:"This is the single most important distinction in Power BI. Calculated columns are static and stored. Measures are dynamic and respond to whatever context the report is currently showing."},
        {q:"You write Youngest Patient = MIN(Patients[DateOfBirth]). Why does MIN give you the youngest patient rather than the oldest?", options:["MIN always returns the oldest","A later date of birth means a more recently born, younger patient — MIN finds the latest (largest) date among dates of birth, so it naturally returns the youngest","It's a Power BI quirk with no logical reason","MIN doesn't work on dates"], answer:1, explanation:"This catches people out. A more recent date of birth (e.g. 2005) is actually a larger value than an older one (e.g. 1970) when comparing dates numerically. So MIN(DateOfBirth) returns the earliest calendar date typically, but practically the right function depends on framing — always sanity check your output rather than assuming."},
        {q:"Your Age Range Days measure references [Youngest Patient] and [Oldest Patient] using square brackets instead of rewriting MIN and MAX again. Why is this good practice?", options:["It's required syntax and has no real benefit","It keeps your DAX clean and means if you ever change how Youngest Patient is calculated, Age Range Days updates automatically too", "Square brackets make it calculate faster","It's the only way DAX allows date comparisons"], answer:1, explanation:"Referencing existing measures inside new measures avoids duplicating logic. If you ever refine the Youngest Patient measure, every measure built on top of it inherits that fix automatically — exactly the kind of repeatable, maintainable approach a consultant builds models with."},
      ]},
      {type:"hardquiz", questions:[
        {q:"You build Total Patients by Region using CALCULATE and ALLEXCEPT. A board member filters the report to Low Mood only. What does the measure now show?", options:["Total patients across all problems, ignoring the Low Mood filter","Total patients with Low Mood, broken down by Region — both filters apply together","An error, because ALLEXCEPT conflicts with slicers","Zero, because ALLEXCEPT removes all filters"], answer:1, explanation:"ALLEXCEPT(Patients, Patients[Region]) removes all filters on the Patients table except Region — meaning Region context is preserved while other filters like PresentingProblem still apply on top. So you'd see Low Mood patients broken down by Region."},
        {q:"You create a Mr Count and Ms Count measure. They don't add up to Total Patients. What's the most likely cause given what you know about the Gender column from Day 2?", options:["The measures have a bug","Some Gender values were still inconsistent ('female' lowercase, 'M' instead of 'Male') before the Title column was generated, so some patients got no Title assigned","CALCULATE can't count correctly","Title isn't a real column"], answer:1, explanation:"If the Title formula was IF(Gender=\"Male\",\"Mr\",IF(Gender=\"Female\",\"Ms\")) and Gender had inconsistent casing or values like 'M' or 'female', some rows would get neither Mr nor Ms — a genuinely useful discovery that traces back to a Day 2 cleaning task."},
        {q:"Why might a consultant prefer writing Region Patients as a measure rather than just adding a Region slicer and looking at the visual's total?", options:["Measures look more professional but do the same thing","A measure can be reused across multiple visuals, combined with other measures, and referenced inside more complex calculations — a slicer only filters what's already there", "Slicers don't work with merged columns","There's no real difference"], answer:1, explanation:"A measure is a reusable building block — you can drop it into a card, a table, a chart, or use it inside another measure. A slicer just filters whatever's already on the page. Measures are the foundation that makes a model genuinely scalable for a client who'll want new visuals added later."},
      ]},
    ],
  },
  {
    id:7, label:"Day 7", title:"Building a Real Report",
    subtitle:"Design, layout, KPIs and a patient drillthrough page", phase:"powerbi",
    recap:"Yesterday you wrote your first measures — Youngest Patient, Oldest Patient, Age Range, Total Patients by Region. You now have real building blocks. Today is about turning your model into something a stakeholder would actually want to look at.",
    sections:[
      {type:"intro", content:"Data without design is just numbers. Today you're going to think about how to lay out a report so it tells a story — what someone needs to see first, what's supporting detail, what they can filter. This is the bit consultants get paid for. And now that you have measures, your KPI cards finally make sense."},
      {type:"lesson", title:"Report Design Principles", content:"Top left = most important. People read left to right, top to bottom. KPI cards go top left.\n\nLimit your colour palette. Pick two or three colours and stick to them. Colour should mean something.\n\nEvery visual needs a clear question it's answering. If you can't name the question, cut the chart.\n\nSlicers go on the left or top — always in the same place.\n\nWhite space is not wasted space."},
      {type:"lesson", title:"More DAX — CALCULATE for Rates", content:"To build proper KPIs you'll need a couple more measures using CALCULATE — the most important function in DAX. It lets you change the filter context to calculate something under specific conditions.",
        daxExamples:[
          {name:"Recovery Rate", formula:`Recovery Rate = DIVIDE(CALCULATE(COUNTROWS(Outcomes), Outcomes[RecoveryStatus] = "Recovered"), COUNTROWS(Outcomes))`, note:"DIVIDE handles divide-by-zero automatically — always prefer it over a plain / in DAX"},
          {name:"DNA Rate", formula:`DNA Rate = DIVIDE(CALCULATE(COUNTROWS(Sessions), Sessions[Attendance] = "DNA"), COUNTROWS(Sessions))`, note:"What percentage of sessions were Did Not Attend"},
        ],
      },
      {type:"tasks", title:"Build Your Dashboard Page", tasks:[
        {id:"r1", text:"Add a title: 'Talking Therapies Service — Overview'"},
        {id:"r2", text:"Build the Recovery Rate and DNA Rate measures above, then add three KPI cards: Total Patients, Recovery Rate, DNA Rate."},
        {id:"r3", text:"Add your Pie, Bar, Line, Table and Matrix visuals from Day 4 onto this page, or rebuild them here if you want a fresh layout."},
        {id:"r4", text:"Add a slicer for Nationality — filter by British, Turkish, Nigerian etc, and watch your KPI cards update live."},
        {id:"r5", text:"Add a slicer for Region — using the Region field from your postcode merge."},
        {id:"r6", text:"Format everything — consistent fonts, remove gridlines, background colour on KPI cards."},
        {id:"r7", text:"Step back and ask: could a manager who knows nothing about this data understand this in 30 seconds?"},
      ]},
      {type:"drillthrough"},
      {type:"resources", title:"Watch These", links:[
        {label:"YouTube — Power BI Drillthrough Pages (Guy in a Cube)", url:"https://www.youtube.com/watch?v=2v8DmFkL6jU", note:"Exactly what you're building today"},
        {label:"YouTube — Power BI Report Design Tips (Guy in a Cube)", url:"https://www.youtube.com/watch?v=7BtwqKVFmWE", note:"Practical design tips from real client reports"},
      ]},
      {type:"quiz", questions:[
        {q:"Why do your KPI cards finally make sense today but not on Day 4?", options:["Cards are a new feature unlocked today","Cards typically display measures, and you only learned to write measures on Day 6", "Cards require a drillthrough page first","Cards only work with merged data"], answer:1, explanation:"A card needs a single calculated value to display — almost always a measure like Recovery Rate or Total Patients. Without measures, you'd have nothing meaningful to put on a card."},
        {q:"You add a Nationality slicer to your dashboard page and select Turkish. What happens to your Recovery Rate card?", options:["Nothing — cards don't respond to slicers","It recalculates to show the recovery rate for Turkish patients only", "It shows an error","It resets to 0"], answer:1, explanation:"This is the whole point of measures — they're dynamic. The Recovery Rate measure recalculates using whatever filter context is active, including any slicer selections."},
      ]},
      {type:"hardquiz", questions:[
        {q:"You set up a drillthrough page on Patient ID. A manager right-clicks on Sophie Clarke's bar in a visual and drills through. What does the drillthrough page show?", options:["All patients in Sophie's borough","All patients with Low Mood","Only data related to PAT-001 — Sophie's sessions, scores and outcome","The GP Surgery table"], answer:2, explanation:"Drillthrough passes the selected value (PAT-001) as a filter to the detail page. Every visual on that page is scoped to Sophie's data only — her sessions, her assessment scores, her outcome. This is the patient profile view."},
        {q:"A consultant presents this report to a board. One member asks 'what's the recovery rate for Somali patients specifically?' You haven't built that view. What's the quickest way to answer live?", options:["Tell them you'll follow up","Use the Nationality slicer on the main page to filter to Somali — the Recovery Rate card updates instantly","Build a new page on the spot","Export to Excel and calculate"], answer:1, explanation:"This is the whole point of dynamic measures. The Recovery Rate measure responds to any filter — select Somali in the Nationality slicer and the card recalculates immediately. No new visuals needed. This is what impresses clients."},
      ]},
    ],
  },
  {
    id:8, label:"Day 8", title:"Mini Project Begins",
    subtitle:"New data, append practice, and your project brief", phase:"project",
    recap:"Yesterday you built a structured dashboard page — KPI cards using real measures, slicers that update everything live, and a patient drillthrough page. Today the mini project officially starts — and we're keeping it flexible from here so you can really build.",
    sections:[
      {type:"intro", content:"From today, the course gets more open-ended. You're building towards a final report rather than following a tight script. Today also brings in one more real-world scenario — new data arriving with a formatting problem — before you get your brief."},
      {type:"lesson", title:"The Prefix Problem", content:"Your original Sessions data uses PAT-001 for Patient IDs. A new batch has just come in using P001 instead. They're the same patients — just formatted differently by whoever exported the data.\n\nIf you append without fixing this, Power BI won't match sessions to patients. PAT-001 and P001 look like different values even though they're not.",
        daxExamples:[
          {name:"Custom Column — fix prefix", formula:`= "PAT-" & Text.PadStart(Text.AfterDelimiter([PatientID], "P"), 3, "0")`, note:'Strips the "P" and rebuilds as "PAT-001" format. Focus on understanding what it does, not memorising the syntax.'},
        ],
      },
      {type:"tasks", title:"Append the New Batch", tasks:[
        {id:"a1", text:"Load Sessions_NewBatch.xlsx into Power Query via Get Data → Transform Data. Don't apply yet."},
        {id:"a2", text:"Add a Custom Column to fix the PatientID prefix so it matches PAT-001 format."},
        {id:"a3", text:"Delete the original PatientID column and rename your new column to PatientID."},
        {id:"a4", text:"Go to your original Sessions query. Home → Append Queries. Append the new batch onto the existing Sessions table."},
        {id:"a5", text:"Close & Apply. Check the row count in Table view — it should be higher than before."},
        {id:"a6", text:"Check a visual — does it update with the new data?"},
      ]},
      {type:"brief", title:"Your Mini Project Brief", content:`The Head of Talking Therapies wants a board-ready summary report. They've asked for:\n\n— An overview of patient referrals: how many, by presenting problem, and by Region.\n\n— Recovery and reliable improvement rates — overall and broken down by presenting problem.\n\n— DNA rates — are any presenting problems associated with higher drop-out?\n\n— Age data — Youngest, Oldest and Average Age at Referral on display somewhere sensible.\n\n— Nationality breakdown — is the service reaching a diverse population?\n\n— A patient profile drillthrough page accessible from any patient-level visual.\n\nThe report should be clean, professional and filterable by Nationality and Presenting Problem. It will be presented at a board meeting. You have the rest of the course to build it — work at your own pace from here.`},
      {type:"tasks", title:"Get Started", tasks:[
        {id:"mp1", text:"Read the brief properly before opening Power BI. Think about which visuals answer which question."},
        {id:"mp2", text:"Plan your pages — you might want more than one. Maybe an Overview page and an Age/Demographics page."},
        {id:"mp3", text:"Start building. Refer back to any previous day if you need a reminder on a technique."},
      ]},
      {type:"resources", title:"Watch These", links:[
        {label:"YouTube — Append Queries in Power Query (Pragmatic Works)", url:"https://www.youtube.com/watch?v=2NNnLRPkG7w", note:"Covers exactly what you did today"},
      ]},
      {type:"hardquiz", questions:[
        {q:"After appending the new Sessions batch, you notice some PatientIDs in the new batch have no matching patient in the Patients table. What does this mean in your model?", options:["Power BI deletes those rows automatically","Those sessions become orphaned — they appear in Sessions but won't show in any visual filtered through Patients","The relationship breaks entirely","It causes a refresh error"], answer:1, explanation:"Orphaned rows — sessions with no matching PatientID in Patients — still exist in Sessions but won't join through to any patient-level data. Important to flag to the client."},
        {q:"The prefix fix formula uses Text.PadStart(..., 3, '0'). What does the 3 and '0' do?", options:["Adds 3 zeros to the end","Pads the number to 3 characters wide using zeros — so '1' becomes '001'","Rounds to 3 decimal places","Limits text to 3 characters"], answer:1, explanation:"PadStart ensures the number part is always 3 digits — P1 becomes PAT-001, P23 becomes PAT-023."},
      ]},
    ],
  },
  {
    id:9, label:"Day 9", title:"Building Out the Project",
    subtitle:"Keep building — refine, add detail, polish", phase:"project",
    recap:"Yesterday the project began — you appended new session data and got your brief. Today is open building time. Keep working through the brief at your own pace.",
    sections:[
      {type:"intro", content:"No new lessons today — just keep building against your brief from Day 8. Use this as a checkpoint to make sure you're covering everything asked for, and a chance to polish what you've already got."},
      {type:"tasks", title:"Checkpoint Against the Brief", tasks:[
        {id:"cp1", text:"Referrals overview by presenting problem and Region — built?"},
        {id:"cp2", text:"Recovery and reliable improvement rates, overall and by presenting problem — built?"},
        {id:"cp3", text:"DNA rate, broken down by presenting problem — built?"},
        {id:"cp4", text:"Age data — Youngest, Oldest, Average Age at Referral — visible somewhere sensible?"},
        {id:"cp5", text:"Nationality breakdown — built?"},
        {id:"cp6", text:"Patient profile drillthrough page — working from at least one visual?"},
        {id:"cp7", text:"Filters for Nationality and Presenting Problem — added and tested?"},
      ]},
      {type:"lesson", title:"A Few Polish Ideas If You Have Time", content:"Tidy up your colour scheme so it's consistent across every page.\n\nCheck every visual still answers a clear question — if you've added something just because it looked nice, ask whether it earns its place.\n\nMake sure your page titles are clear and your slicers are in the same place on every page.\n\nIf you have extra time, try adding a second page entirely — perhaps an Age & Demographics page using your Region, Nationality and Age measures together."},
    ],
  },
  {
    id:10, label:"Day 10", title:"Final Polish & Wrap Up",
    subtitle:"Finish strong — this is your first portfolio piece", phase:"project",
    recap:"You've spent two days building against a real brief. Today is your final day before you start your new role tomorrow. Let's bring it home.",
    sections:[
      {type:"intro", content:"This is it — your last day. Today is about finishing properly, reviewing what you've built, and feeling proud of it. This report is your first real portfolio piece."},
      {type:"tasks", title:"Final Tasks", tasks:[
        {id:"f1", text:"Do one final pass against the brief from Day 8 — does the report answer every question they asked?"},
        {id:"f2", text:"Check formatting one more time — gridlines, fonts, colours, alignment."},
        {id:"f3", text:"Save your .pbix file somewhere safe. This is your first portfolio piece."},
        {id:"f4", text:"Write yourself a couple of sentences on what each page of your report shows and why — practice explaining your own work, since that's the actual consultancy skill."},
      ]},
      {type:"lesson", title:"You Did It 🎉", content:"Genuinely — going from zero to a board-ready Power BI dashboard in two weeks, while working and starting something new, is impressive. Properly impressive.\n\nWhat you've covered: relational data modelling, Power Query cleaning, merging and relationships, star schema design, DAX measures, CALCULATE, drillthrough pages, report design and a real-world data scenario from start to finish. That's the core of what a Power BI consultant does.\n\nThe next step is practice on real or open datasets, and getting comfortable talking through what you built and why. That's the consultancy skill — not just building it, but explaining the decisions."},
      {type:"hardquiz", questions:[
        {q:"A potential client asks 'can you connect Power BI to our live database rather than Excel files?' What's your honest answer based on what you now know?", options:["No — Power BI only works with Excel","Yes — Power BI can connect directly to SQL databases, SharePoint, APIs and more. The cleaning logic in Power Query works the same way regardless of source","Maybe — it depends on the version of Power BI","Only if they use Microsoft SQL Server"], answer:1, explanation:"Power BI supports hundreds of connectors. Everything you learned about Power Query, the model and DAX applies identically. The source just changes."},
        {q:"A client wants to share the dashboard with their whole team so they can each see it on their laptops. What do they need?", options:["Everyone installs Power BI Desktop and you send the .pbix file","The report is published to Power BI Service and shared via a workspace — viewers only need a browser and a Power BI Pro licence","You export it as a PDF monthly","They all need to install the same version of Excel"], answer:1, explanation:"Power BI Desktop is for building. Power BI Service is for sharing. Viewers don't need Desktop — just a browser and a licence."},
        {q:"You notice that patients from one Region have a lower recovery rate than another. A board member asks if this is statistically significant. What do you say?", options:["Yes — the chart clearly shows the difference","Power BI shows the pattern but can't determine statistical significance — you'd need a statistician or further analysis to confirm whether the difference is meaningful or within expected variation","No — small datasets are always too noisy to draw conclusions","Tell them to look at the numbers themselves"], answer:1, explanation:"Power BI visualises patterns — it doesn't test significance. Being honest about this builds trust and is exactly the kind of nuanced thinking that makes a good consultant."},
      ]},
    ],
  },
];

const tips = [
  {category:"Power Query", items:["Always click Transform Data, not Load — clean before it lands in your model.","Applied Steps are recorded and rerun automatically on refresh — your cleaning is baked in.","Right-click a column header to quickly change type, replace values or remove errors.","Use Add Column → Conditional Column for age bands, flag emojis, or any if/then logic.","If something goes wrong, delete the last Applied Step and try again — nothing is permanent."]},
  {category:"Data Model", items:["Always build a star schema — one central table, dimension tables around it.","Relationships flow from the 'one' side (PK) to the 'many' side (FK).","Avoid many-to-many relationships where possible — use a bridge table.","Create a Date Table and connect it to every date column in your model.","Duplicate PKs break relationships — always check your dimension tables are unique on the key column."]},
  {category:"DAX", items:["CALCULATE is the most important function — learn it well.","Use DIVIDE instead of / — it handles divide-by-zero automatically.","Measures are dynamic (respond to filters). Calculated columns are static (row-by-row).","SUMX and AVERAGEX let you calculate row by row across a table.","Format your measures immediately — percentage, currency, decimal places."]},
  {category:"Report Design", items:["Top left = most important. KPI cards go first.","Limit to 2-3 colours. Colour should mean something.","Every visual should answer one clear question.","Slicers go left or top — always in the same place.","Set up a drillthrough page for detailed record views — clients love this.","Test your report: could a non-technical person understand this in 30 seconds?"]},
  {category:"Drillthrough & Patient Profiles", items:["Drillthrough pages show detail for a specific record — right-click on a data point to access.","Add the drillthrough field (e.g. PatientID) to the drillthrough bucket on your detail page.","Use card visuals for key patient facts — name, nationality (with flag), referral date.","A table visual showing all sessions works perfectly on a patient detail page.","Flag emojis: 🇬🇧 British · 🇹🇷 Turkish · 🇳🇬 Nigerian · 🇮🇳 Indian · 🇸🇴 Somali — add via Conditional Column in Power Query."]},
];

const glossary = [
  {term:"Boolean", def:"A data type that only holds True or False. Used for yes/no columns like ActivePatient or ReliableImprovement."},
  {term:"Calculated Column", def:"A DAX column added to a table that calculates row by row. Lives in the table, doesn't respond to filters dynamically."},
  {term:"CALCULATE", def:"The most important DAX function. Evaluates a measure under modified filter conditions."},
  {term:"Cardinality", def:"The type of relationship between two tables — one-to-one, one-to-many, or many-to-many."},
  {term:"Conditional Column", def:"A Power Query column built on if/then logic. Used for age bands, flag emojis, custom categories."},
  {term:"Date Table", def:"A table containing every date in a continuous range. Required for time intelligence in Power BI."},
  {term:"DAX", def:"Data Analysis Expressions — the formula language used in Power BI for measures and calculated columns."},
  {term:"Decimal", def:"A number data type that supports decimal places. Used for averages and calculated scores."},
  {term:"Dimension Table", def:"A table that provides context — like Patients or GP Surgeries. Sits around the fact table in a star schema."},
  {term:"Drillthrough", def:"A Power BI feature that lets you right-click a data point and navigate to a detail page filtered to that record."},
  {term:"Fact Table", def:"The central table in a star schema containing measurable data — like Sessions or Wellbeing Assessments."},
  {term:"Filter Context", def:"The set of filters active at any given moment in Power BI — set by slicers, visuals, and CALCULATE."},
  {term:"Foreign Key (FK)", def:"A column that references the Primary Key of another table. The link between two tables."},
  {term:"Integer", def:"A whole number data type. No decimals. Used for age, session number, counts."},
  {term:"Measure", def:"A DAX calculation that responds dynamically to filters and slicers. The smart kind of calculation in Power BI."},
  {term:"Many-to-Many", def:"A relationship where rows on both sides match multiple rows on the other side. Needs a bridge table."},
  {term:"One-to-Many", def:"The most common relationship type. One row on the 'one' side links to multiple rows on the 'many' side."},
  {term:"Orphaned Row", def:"A row in a fact table whose FK has no matching PK in the related dimension table."},
  {term:"Power Query", def:"Power BI's built-in data cleaning and transformation tool. Every step is recorded and reruns on refresh."},
  {term:"Primary Key (PK)", def:"A column that uniquely identifies each row in a table. No duplicates, no nulls."},
  {term:"Star Schema", def:"A data model with one central fact table surrounded by dimension tables. The standard approach in Power BI."},
  {term:"String", def:"A text data type. Names, IDs, categories — anything that's words or labels."},
];

// ── Components ────────────────────────────────────────────────────────────────

function QuizSection({ questions, hard }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const score = submitted ? questions.filter((q,i) => answers[i] === q.answer).length : 0;
  const accent = hard ? COLORS.hard : COLORS.primary;
  const accentLight = hard ? COLORS.hardLight : COLORS.primaryLight;

  return (
    <div style={{background: accentLight, borderRadius:16, padding:24, marginTop:8}}>
      <div style={{fontWeight:700, fontSize:15, color: accent, marginBottom:20}}>
        {hard ? "🧠 Tougher Questions" : "📝 Quick Quiz"}
      </div>
      {questions.map((q,i) => (
        <div key={i} style={{marginBottom:24}}>
          <div style={{fontWeight:600, color:COLORS.text, marginBottom:10, lineHeight:1.5}}>{i+1}. {q.q}</div>
          <div style={{display:"flex", flexDirection:"column", gap:8}}>
            {q.options.map((opt,j) => {
              let bg=COLORS.card, border=`2px solid ${COLORS.border}`, color=COLORS.text;
              if(answers[i]===j){bg=accentLight; border=`2px solid ${accent}`; color=accent;}
              if(submitted && j===q.answer){bg=COLORS.greenLight; border=`2px solid ${COLORS.green}`; color=COLORS.green;}
              if(submitted && answers[i]===j && j!==q.answer){bg="#FEF2F2"; border="2px solid #EF4444"; color="#EF4444";}
              return <button key={j} onClick={()=>!submitted&&setAnswers(a=>({...a,[i]:j}))}
                style={{background:bg,border,color,borderRadius:10,padding:"10px 14px",textAlign:"left",cursor:submitted?"default":"pointer",fontSize:14,fontFamily:"inherit",transition:"all 0.15s"}}>{opt}</button>;
            })}
          </div>
          {submitted && <div style={{marginTop:8,padding:"10px 14px",background:COLORS.card,borderRadius:10,fontSize:13,color:COLORS.muted,borderLeft:`3px solid ${COLORS.green}`}}>💡 {q.explanation}</div>}
        </div>
      ))}
      {!submitted
        ? <button onClick={()=>Object.keys(answers).length===questions.length&&setSubmitted(true)}
            style={{background:Object.keys(answers).length===questions.length?accent:COLORS.border,color:"#fff",border:"none",borderRadius:10,padding:"12px 24px",fontWeight:600,cursor:Object.keys(answers).length===questions.length?"pointer":"not-allowed",fontSize:15,fontFamily:"inherit"}}>
            Submit
          </button>
        : <div style={{background:score===questions.length?COLORS.greenLight:COLORS.accentLight,border:`2px solid ${score===questions.length?COLORS.green:COLORS.accent}`,borderRadius:12,padding:16,fontWeight:600,color:score===questions.length?COLORS.green:COLORS.accent}}>
            {score===questions.length?`🎉 Perfect — ${score}/${questions.length}!`:`${score}/${questions.length} — check the explanations above.`}
          </div>
      }
    </div>
  );
}

function TaskList({tasks}) {
  const [done,setDone]=useState({});
  return (
    <div style={{display:"flex",flexDirection:"column",gap:10}}>
      {tasks.map(t=>(
        <div key={t.id} onClick={()=>setDone(d=>({...d,[t.id]:!d[t.id]}))}
          style={{display:"flex",alignItems:"flex-start",gap:12,background:done[t.id]?COLORS.greenLight:COLORS.card,border:`1.5px solid ${done[t.id]?COLORS.green:COLORS.border}`,borderRadius:12,padding:"12px 16px",cursor:"pointer",transition:"all 0.2s"}}>
          <div style={{width:22,height:22,borderRadius:6,border:`2px solid ${done[t.id]?COLORS.green:COLORS.border}`,background:done[t.id]?COLORS.green:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1}}>
            {done[t.id]&&<span style={{color:"#fff",fontSize:13,fontWeight:700}}>✓</span>}
          </div>
          <span style={{color:done[t.id]?COLORS.green:COLORS.text,fontSize:14,lineHeight:1.6,textDecoration:done[t.id]?"line-through":"none"}}>{t.text}</span>
        </div>
      ))}
    </div>
  );
}

function SimpleTable({headers,rows}) {
  return (
    <div style={{overflowX:"auto",borderRadius:10,border:`1px solid ${COLORS.border}`,marginTop:12,marginBottom:4}}>
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
        <thead><tr style={{background:COLORS.primaryLight}}>
          {headers.map((h,i)=><th key={i} style={{padding:"10px 14px",textAlign:"left",color:COLORS.primary,fontWeight:700,whiteSpace:"nowrap"}}>{h}</th>)}
        </tr></thead>
        <tbody>{rows.map((row,i)=>(
          <tr key={i} style={{borderTop:`1px solid ${COLORS.border}`,background:i%2===0?"#fff":COLORS.bg}}>
            {row.map((cell,j)=><td key={j} style={{padding:"9px 14px",color:COLORS.text,whiteSpace:"nowrap"}}>{cell}</td>)}
          </tr>
        ))}</tbody>
      </table>
    </div>
  );
}

function StarDiagram() {
  return (
    <div style={{background:COLORS.bg,borderRadius:14,padding:24,margin:"16px 0",textAlign:"center"}}>
      <div style={{display:"flex",justifyContent:"center",alignItems:"center",flexWrap:"wrap",gap:8}}>
        {["Sessions\n(Fact)","Outcomes","GP Surgeries"].map((label,i)=>(
          <div key={i} style={{display:"flex",flexDirection:i<2?"row":"row-reverse",alignItems:"center"}}>
            <div style={{background:COLORS.primaryLight,border:`2px solid ${COLORS.primary}`,borderRadius:10,padding:"8px 14px",fontSize:12,fontWeight:600,color:COLORS.primary,whiteSpace:"pre-line",textAlign:"center"}}>{label}</div>
            <div style={{width:32,height:2,background:COLORS.primary}}/>
            {i===1&&<div style={{background:COLORS.accent,border:`2px solid ${COLORS.accent}`,borderRadius:12,padding:"10px 18px",fontSize:13,fontWeight:700,color:"#fff"}}>Patients<br/><span style={{fontSize:11,fontWeight:400}}>Central Hub</span></div>}
          </div>
        ))}
      </div>
      <div style={{marginTop:12,fontSize:12,color:COLORS.muted}}>Every table connects to Patients via PatientID (or SurgeryID for GP Surgeries)</div>
    </div>
  );
}

function RelationshipDiagram() {
  return (
    <div style={{background:COLORS.bg,borderRadius:14,padding:20,margin:"16px 0"}}>
      <div style={{display:"flex",gap:16,alignItems:"stretch",flexWrap:"wrap"}}>
        <div style={{flex:1,minWidth:140,background:COLORS.greenLight,border:`2px solid ${COLORS.green}`,borderRadius:12,padding:14}}>
          <div style={{fontWeight:700,color:COLORS.green,fontSize:13,marginBottom:8}}>ONE-TO-MANY ✓</div>
          <div style={{fontSize:13,color:COLORS.text,lineHeight:1.6}}>One Patient → Many Sessions<br/>One Surgery → Many Patients<br/>One Patient → Many Assessments</div>
        </div>
        <div style={{flex:1,minWidth:140,background:"#FEF2F2",border:"2px solid #EF4444",borderRadius:12,padding:14}}>
          <div style={{fontWeight:700,color:"#EF4444",fontSize:13,marginBottom:8}}>MANY-TO-MANY ⚠️</div>
          <div style={{fontSize:13,color:COLORS.text,lineHeight:1.6}}>Many Patients ↔ Many Therapists<br/>Needs a bridge table to resolve.</div>
        </div>
      </div>
    </div>
  );
}

function DrillthroughChallenge() {
  const [selected, setSelected] = useState(null);
  const p = PATIENTS.find(x=>x.id===selected);

  return (
    <div style={{background:COLORS.card,border:`2px solid ${COLORS.primary}`,borderRadius:16,padding:22,marginTop:8}}>
      <div style={{fontWeight:700,fontSize:16,color:COLORS.primary,marginBottom:4}}>🔍 Patient Drillthrough Challenge</div>
      <div style={{fontSize:14,color:COLORS.muted,marginBottom:18,lineHeight:1.6}}>
        In Power BI you'd right-click a patient's name in a visual to drill through to their profile page. Here's a preview of what that page should look like — pick a patient below to see their full profile, then use this as your blueprint when building the drillthrough page in Power BI.
      </div>
      <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:20}}>
        {PATIENTS.map(pt=>(
          <button key={pt.id} onClick={()=>setSelected(selected===pt.id?null:pt.id)}
            style={{background:selected===pt.id?COLORS.primary:COLORS.bg,color:selected===pt.id?"#fff":COLORS.text,border:`2px solid ${selected===pt.id?COLORS.primary:COLORS.border}`,borderRadius:10,padding:"8px 14px",cursor:"pointer",fontSize:13,fontWeight:600,fontFamily:"inherit",transition:"all 0.15s"}}>
            {FLAGS[pt.nationality]} {pt.name}
          </button>
        ))}
      </div>

      {p && (
        <div style={{background:COLORS.bg,borderRadius:14,padding:20}}>
          {/* Header */}
          <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:20,flexWrap:"wrap"}}>
            <div style={{width:52,height:52,borderRadius:14,background:COLORS.primary,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>
              {FLAGS[p.nationality]}
            </div>
            <div>
              <div style={{fontWeight:800,fontSize:20,color:COLORS.text,letterSpacing:"-0.5px"}}>{p.name}</div>
              <div style={{fontSize:13,color:COLORS.muted,marginTop:2}}>{p.id} · {p.gender} · Age {p.age} · {p.nationality}</div>
            </div>
            <div style={{marginLeft:"auto",background:p.outcome?.recovery==="Recovered"?COLORS.greenLight:"#FEF2F2",border:`1.5px solid ${p.outcome?.recovery==="Recovered"?COLORS.green:"#EF4444"}`,borderRadius:10,padding:"6px 14px",fontSize:13,fontWeight:700,color:p.outcome?.recovery==="Recovered"?COLORS.green:"#EF4444"}}>
              {p.outcome?.recovery||"Active"}
            </div>
          </div>

          {/* Info grid */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:10,marginBottom:20}}>
            {[
              {label:"Presenting Problem", value:p.problem},
              {label:"Referral Date", value:p.referral},
              {label:"GP Surgery", value:p.surgery},
              {label:"Borough", value:p.borough},
              {label:"Active Patient", value:p.active},
              {label:"Discharge Reason", value:p.outcome?.reason||"—"},
            ].map((item,i)=>(
              <div key={i} style={{background:COLORS.card,borderRadius:10,padding:"12px 14px",border:`1px solid ${COLORS.border}`}}>
                <div style={{fontSize:11,color:COLORS.muted,fontWeight:600,marginBottom:4,textTransform:"uppercase",letterSpacing:"0.5px"}}>{item.label}</div>
                <div style={{fontSize:14,fontWeight:600,color:COLORS.text}}>{item.value}</div>
              </div>
            ))}
          </div>

          {/* Sessions */}
          <div style={{marginBottom:20}}>
            <div style={{fontWeight:700,fontSize:14,color:COLORS.text,marginBottom:10}}>Sessions</div>
            <div style={{overflowX:"auto",borderRadius:10,border:`1px solid ${COLORS.border}`}}>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
                <thead><tr style={{background:COLORS.primaryLight}}>
                  {["Session","Date","Type","Attendance","PHQ-9","GAD-7"].map(h=>(
                    <th key={h} style={{padding:"8px 12px",textAlign:"left",color:COLORS.primary,fontWeight:700,whiteSpace:"nowrap"}}>{h}</th>
                  ))}
                </tr></thead>
                <tbody>{p.sessions.map((s,i)=>(
                  <tr key={i} style={{borderTop:`1px solid ${COLORS.border}`,background:i%2===0?"#fff":COLORS.bg}}>
                    <td style={{padding:"8px 12px",color:COLORS.muted,fontSize:12}}>{s.id}</td>
                    <td style={{padding:"8px 12px"}}>{s.date}</td>
                    <td style={{padding:"8px 12px"}}>{s.type}</td>
                    <td style={{padding:"8px 12px"}}>
                      <span style={{background:s.attendance==="Attended"?COLORS.greenLight:s.attendance==="DNA"?"#FEF2F2":COLORS.accentLight,color:s.attendance==="Attended"?COLORS.green:s.attendance==="DNA"?"#EF4444":COLORS.accent,borderRadius:6,padding:"2px 8px",fontSize:12,fontWeight:600}}>
                        {s.attendance}
                      </span>
                    </td>
                    <td style={{padding:"8px 12px",fontWeight:600}}>{s.phq??<span style={{color:COLORS.muted}}>—</span>}</td>
                    <td style={{padding:"8px 12px",fontWeight:600}}>{s.gad??<span style={{color:COLORS.muted}}>—</span>}</td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </div>

          {/* Wellbeing scores */}
          {p.wave1 && (
            <div>
              <div style={{fontWeight:700,fontSize:14,color:COLORS.text,marginBottom:10}}>Wellbeing Scores</div>
              <div style={{overflowX:"auto",borderRadius:10,border:`1px solid ${COLORS.border}`}}>
                <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
                  <thead><tr style={{background:COLORS.primaryLight}}>
                    {["Question","Wave 1","Wave 2","Change"].map(h=>(
                      <th key={h} style={{padding:"8px 12px",textAlign:"left",color:COLORS.primary,fontWeight:700}}>{h}</th>
                    ))}
                  </tr></thead>
                  <tbody>{[
                    {q:"Able to cope",k:"cope"},
                    {q:"Feeling connected",k:"connected"},
                    {q:"Feeling optimistic",k:"optimistic"},
                    {q:"Sleep quality",k:"sleep"},
                    {q:"Managing stress",k:"stress"},
                    {q:"Mood stability",k:"mood"},
                  ].map((row,i)=>{
                    const w1=p.wave1[row.k]; const w2=p.wave2?.[row.k];
                    const diff=w2!=null?w2-w1:null;
                    return (
                      <tr key={i} style={{borderTop:`1px solid ${COLORS.border}`,background:i%2===0?"#fff":COLORS.bg}}>
                        <td style={{padding:"8px 12px"}}>{row.q}</td>
                        <td style={{padding:"8px 12px",fontWeight:600}}>{w1}/5</td>
                        <td style={{padding:"8px 12px",fontWeight:600}}>{w2!=null?`${w2}/5`:"—"}</td>
                        <td style={{padding:"8px 12px",fontWeight:700,color:diff==null?COLORS.muted:diff>0?COLORS.green:diff<0?"#EF4444":COLORS.muted}}>
                          {diff==null?"—":diff>0?`+${diff}`:diff===0?"→":diff}
                        </td>
                      </tr>
                    );
                  })}</tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
      {!selected && (
        <div style={{textAlign:"center",padding:"32px 0",color:COLORS.muted,fontSize:14}}>Select a patient above to see their profile ↑</div>
      )}
    </div>
  );
}

function ComprehensionSection({section}) {
  const [revealed, setRevealed] = useState({});
  return (
    <div style={{background:COLORS.card,border:`1.5px solid ${COLORS.border}`,borderRadius:16,padding:22}}>
      <div style={{fontWeight:700,fontSize:15,color:COLORS.text,marginBottom:6}}>{section.title}</div>
      <div style={{fontSize:13,color:COLORS.muted,marginBottom:14}}>Work out the answer in Excel first, then peek to check.</div>
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        {section.questions.map((item,qi)=>(
          <div key={qi} style={{background:COLORS.bg,borderRadius:10,padding:"14px 16px"}}>
            <div style={{fontSize:14,color:COLORS.text,lineHeight:1.5,marginBottom:8}}>
              <span style={{fontWeight:700,color:COLORS.primary,marginRight:8}}>Q{qi+1}.</span>{item.q}
            </div>
            {revealed[qi]
              ? <div style={{background:COLORS.greenLight,border:`1.5px solid ${COLORS.green}`,borderRadius:8,padding:"10px 14px",fontSize:13,color:COLORS.green,lineHeight:1.6}}>
                  ✅ {item.a}
                </div>
              : <button onClick={()=>setRevealed(r=>({...r,[qi]:true}))}
                  style={{background:"none",border:`1.5px solid ${COLORS.border}`,borderRadius:8,padding:"7px 14px",fontSize:12,color:COLORS.muted,cursor:"pointer",fontFamily:"inherit",fontWeight:600}}>
                  Peek at answer 👀
                </button>
            }
          </div>
        ))}
      </div>
    </div>
  );
}

function DayContent({day}) {
  const mainSections = day.sections.filter(s=>s.type!=="bonus");
  const bonusSections = day.sections.filter(s=>s.type==="bonus");
  const allOrdered = [...mainSections, ...bonusSections];
  return (
    <div style={{display:"flex",flexDirection:"column",gap:20}}>
      {day.recap && (
        <div style={{background:COLORS.accentLight,border:`1.5px solid ${COLORS.accent}`,borderRadius:14,padding:18}}>
          <div style={{fontWeight:700,color:COLORS.accent,fontSize:13,marginBottom:6}}>📚 Yesterday's Recap</div>
          <div className="day-text" style={{color:COLORS.text,fontSize:14,lineHeight:1.7}}>{day.recap}</div>
        </div>
      )}
      {allOrdered.map((s,i)=>{
        if(s.type==="intro") return <div key={i} className="day-text" style={{color:COLORS.text,fontSize:15,lineHeight:1.8,padding:"4px 0"}}>{s.content}</div>;
        if(s.type==="drillthrough") return <DrillthroughChallenge key={i}/>;
        if(s.type==="bonus") return (
          <div key={i} style={{background:"linear-gradient(135deg,#fff8f0 0%,#fff3e8 100%)",border:`2px solid ${COLORS.accent}`,borderRadius:16,padding:22}}>
            <div style={{fontWeight:700,fontSize:16,color:COLORS.accent,marginBottom:4}}>{s.title}</div>
            <div style={{fontSize:13,color:COLORS.muted,marginBottom:14}}>Optional — but do try it. These are the skills that make you look sharp.</div>
            <TaskList tasks={s.tasks}/>
          </div>
        );
        if(s.type==="quiz") return <QuizSection key={i} questions={s.questions} hard={false}/>;
        if(s.type==="hardquiz") return <QuizSection key={i} questions={s.questions} hard={true}/>;
        if(s.type==="tasks") return (
          <div key={i} className="day-card" style={{background:COLORS.card,border:`1.5px solid ${COLORS.border}`,borderRadius:16,padding:22}}>
            <div className="day-text" style={{fontWeight:700,fontSize:16,color:COLORS.text,marginBottom:4}}>{s.title}</div>
            {s.file&&<div style={{fontSize:13,color:COLORS.muted,marginBottom:14}}>📁 File: <span style={{fontFamily:"monospace",color:COLORS.primary}}>{s.file}</span></div>}
            {!s.file&&<div style={{marginBottom:14}}/>}
            <TaskList tasks={s.tasks}/>
          </div>
        );
        if(s.type==="comprehension") return (
          <ComprehensionSection key={i} section={s}/>
        );
        if(s.type==="brief") return (
          <div key={i} style={{background:"#1A1A2E",borderRadius:16,padding:24}}>
            <div style={{fontWeight:700,fontSize:15,color:"#fff",marginBottom:14}}>📋 {s.title}</div>
            <div style={{color:"#CBD5E1",fontSize:14,lineHeight:1.9,whiteSpace:"pre-line"}}>{s.content}</div>
          </div>
        );
        if(s.type==="resources") return (
          <div key={i} style={{background:COLORS.card,border:`1.5px solid ${COLORS.border}`,borderRadius:16,padding:22}}>
            <div style={{fontWeight:700,fontSize:15,color:COLORS.text,marginBottom:14}}>{s.title}</div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {s.links.map((l,li)=>(
                <a key={li} href={l.url} target="_blank" rel="noreferrer"
                  style={{display:"flex",alignItems:"flex-start",gap:12,background:COLORS.bg,borderRadius:10,padding:"12px 14px",textDecoration:"none"}}>
                  <span style={{fontSize:16,flexShrink:0}}>🔗</span>
                  <div>
                    <div style={{fontWeight:600,color:COLORS.primary,fontSize:14}}>{l.label}</div>
                    <div style={{color:COLORS.muted,fontSize:13,marginTop:2}}>{l.note}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        );
        if(s.type==="lesson") return (
          <div key={i} className="day-card" style={{background:COLORS.card,border:`1.5px solid ${COLORS.border}`,borderRadius:16,padding:22}}>
            <div className="day-text" style={{fontWeight:700,fontSize:16,color:COLORS.text,marginBottom:12}}>{s.title}</div>
            <div className="day-text" style={{color:COLORS.text,fontSize:14,lineHeight:1.8,whiteSpace:"pre-line"}}>{s.content}</div>
            {s.table&&<SimpleTable headers={s.table.headers} rows={s.table.rows}/>}
            {s.dualTable&&(
              <div style={{display:"flex",gap:12,marginTop:16,flexWrap:"wrap"}}>
                {[s.dualTable.left,s.dualTable.right].map((t,ti)=>(
                  <div key={ti} style={{flex:1,minWidth:220}}>
                    <div style={{fontWeight:600,fontSize:12,color:COLORS.primary,marginBottom:6}}>{t.title}</div>
                    <SimpleTable headers={t.headers} rows={t.rows}/>
                  </div>
                ))}
              </div>
            )}
            {s.afterDual&&<div className="day-text" style={{marginTop:12,color:COLORS.text,fontSize:14,lineHeight:1.7}}>{s.afterDual}</div>}
            {s.types&&(
              <div style={{display:"flex",flexDirection:"column",gap:10,marginTop:14}}>
                {s.types.map((t,ti)=>(
                  <div key={ti} style={{display:"flex",alignItems:"flex-start",gap:12,background:COLORS.bg,borderRadius:10,padding:"12px 14px"}}>
                    <div style={{background:t.colour,color:"#fff",borderRadius:8,padding:"3px 10px",fontSize:12,fontWeight:700,whiteSpace:"nowrap",flexShrink:0}}>{t.name}</div>
                    <div style={{flex:1}}>
                      <div style={{fontSize:13,color:COLORS.muted,fontFamily:"monospace",marginBottom:3}}>{t.example}</div>
                      <div style={{fontSize:13,color:COLORS.text}}>{t.note}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {s.callout&&(
              <div style={{marginTop:16,background:COLORS.primaryLight,borderRadius:10,padding:"12px 16px",fontSize:14,color:COLORS.primary,fontWeight:500,borderLeft:`4px solid ${COLORS.primary}`}}>
                🔍 {s.callout}
              </div>
            )}
            {s.diagram&&<RelationshipDiagram/>}
            {s.starDiagram&&<StarDiagram/>}
            {s.video&&(
              <a href={s.video.url} target="_blank" rel="noreferrer" style={{display:"flex",alignItems:"flex-start",gap:12,background:"#1A1A2E",borderRadius:12,padding:"14px 16px",marginTop:14,textDecoration:"none"}}>
                <span style={{fontSize:20,flexShrink:0}}>▶️</span>
                <div>
                  <div style={{fontWeight:600,color:"#9B8FFF",fontSize:14}}>{s.video.label}</div>
                  {s.video.note&&<div style={{color:"#94A3B8",fontSize:12,marginTop:4,lineHeight:1.5}}>{s.video.note}</div>}
                </div>
              </a>
            )}
            {s.daxExamples&&(
              <div style={{display:"flex",flexDirection:"column",gap:10,marginTop:14}}>
                {s.daxExamples.map((d,di)=>(
                  <div key={di} style={{background:"#1A1A2E",borderRadius:12,padding:16}}>
                    <div style={{color:"#9B8FFF",fontSize:12,fontWeight:600,marginBottom:6}}>{d.name}</div>
                    <div style={{fontFamily:"monospace",fontSize:13,color:"#E2E8F0",lineHeight:1.6}}>{d.formula}</div>
                    {d.note&&<div style={{marginTop:8,fontSize:12,color:"#94A3B8"}}>// {d.note}</div>}
                  </div>
                ))}
              </div>
            )}
            {s.tip&&(
              <div style={{marginTop:14,background:COLORS.greenLight,borderRadius:10,padding:"12px 16px",fontSize:13,color:COLORS.green,borderLeft:`4px solid ${COLORS.green}`}}>
                💡 <strong>Tip:</strong> {s.tip}
              </div>
            )}
          </div>
        );
        return null;
      })}
    </div>
  );
}

export default function App() {
  const [activeTab,setActiveTab]=useState("day-1");
  const [activePage,setActivePage]=useState("course");
  const [dark,setDark]=useState(false);
  const phaseColour=p=>p==="foundations"?COLORS.accent:p==="project"?COLORS.green:COLORS.primary;
  const phaseLabel=p=>p==="foundations"?"Foundations":p==="project"?"Project":"Power BI";
  const C = dark ? {...COLORS, bg:"#0f0f1a", card:"#1a1a2e", text:"#e2e8f0", muted:"#94a3b8", border:"#2d3748"} : COLORS;

  const headerBg = dark ? "#0f0f1a" : "#1a0a00";
  const headerBorder = dark ? "#2d3748" : "#3d2000";
  const bgColor = dark ? C.bg : COLORS.bg;

  return (
    <div data-dark={dark} style={{fontFamily:"'Inter',-apple-system,BlinkMacSystemFont,sans-serif",background:bgColor,minHeight:"100vh",color:dark?C.text:COLORS.text,transition:"background 0.3s,color 0.3s"}}>
      <style>{`
        [data-dark="true"] .day-text { color: #e2e8f0 !important; }
        [data-dark="true"] .day-muted { color: #94a3b8 !important; }
        [data-dark="true"] .day-card { background: #1a1a2e !important; border-color: #2d3748 !important; }
        [data-dark="true"] .day-bg { background: #0f0f1a !important; }
      `}</style>
      <div style={{background:headerBg,borderBottom:`1px solid ${headerBorder}`,padding:"0 24px"}}>
        <div style={{maxWidth:960,margin:"0 auto"}}>
          <div style={{padding:"18px 0 0",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <span style={{fontSize:28}}>🍓</span>
              <div>
                <div style={{fontWeight:800,fontSize:20,color:"#fff",letterSpacing:"-0.5px"}}>Berry's Power BI Course</div>
                <div style={{fontSize:13,color:"#d4876a",marginTop:2}}>10 weekdays · 1–2 hrs a day · You've got this 🧶</div>
              </div>
            </div>
            <button onClick={()=>setDark(d=>!d)} style={{background:"rgba(255,255,255,0.1)",border:"1.5px solid rgba(255,255,255,0.2)",borderRadius:20,padding:"6px 16px",cursor:"pointer",fontSize:13,fontWeight:600,color:"#fff",fontFamily:"inherit",transition:"all 0.2s"}}>
              {dark ? "☀️ Light" : "🌙 Dark"}
            </button>
          </div>
          <div style={{display:"flex",gap:0,marginTop:16,overflowX:"auto"}}>
            {[{id:"course",label:"Course"},{id:"tips",label:"Tips & Tricks"},{id:"glossary",label:"Glossary"}].map(p=>(
              <button key={p.id} onClick={()=>setActivePage(p.id)}
                style={{background:"none",border:"none",borderBottom:activePage===p.id?"3px solid #E8845C":"3px solid transparent",color:activePage===p.id?"#E8845C":"rgba(255,255,255,0.6)",fontWeight:activePage===p.id?700:500,fontSize:14,padding:"10px 18px",cursor:"pointer",whiteSpace:"nowrap",fontFamily:"inherit",transition:"all 0.15s"}}>
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{maxWidth:960,margin:"0 auto",padding:"24px 16px"}}>
        {activePage==="course"&&(
          <div style={{display:"flex",gap:20,alignItems:"flex-start"}}>
            <div style={{width:160,flexShrink:0,display:"flex",flexDirection:"column",gap:6,position:"sticky",top:20}}>
              {days.map(d=>(
                <button key={d.id} onClick={()=>setActiveTab(`day-${d.id}`)}
                  style={{background:activeTab===`day-${d.id}`?COLORS.primary:COLORS.card,border:`1.5px solid ${activeTab===`day-${d.id}`?COLORS.primary:COLORS.border}`,borderRadius:12,padding:"10px 12px",cursor:"pointer",textAlign:"left",fontFamily:"inherit",transition:"all 0.15s"}}>
                  <div style={{fontSize:13,fontWeight:700,color:activeTab===`day-${d.id}`?"#fff":COLORS.text,lineHeight:1.3}}>{d.label}</div>
                  <div style={{marginTop:5,display:"inline-block",background:activeTab===`day-${d.id}`?"rgba(255,255,255,0.2)":COLORS.tag,borderRadius:6,padding:"2px 7px",fontSize:10,fontWeight:600,color:activeTab===`day-${d.id}`?"#fff":phaseColour(d.phase)}}>
                    {phaseLabel(d.phase)}
                  </div>
                </button>
              ))}
            </div>
            <div style={{flex:1,minWidth:0}}>
              {days.filter(d=>activeTab===`day-${d.id}`).map(day=>(
                <div key={day.id}>
                  <div style={{marginBottom:24}}>
                    <div style={{display:"inline-block",background:phaseColour(day.phase),color:"#fff",borderRadius:8,padding:"3px 12px",fontSize:12,fontWeight:700,marginBottom:10}}>{phaseLabel(day.phase)}</div>
                    <div className="day-text" style={{fontWeight:800,fontSize:24,color:COLORS.text,letterSpacing:"-0.5px",lineHeight:1.2}}>{day.title}</div>
                    <div className="day-muted" style={{fontSize:15,color:COLORS.muted,marginTop:4}}>{day.subtitle}</div>
                  </div>
                  <DayContent day={day}/>
                </div>
              ))}
            </div>
          </div>
        )}

        {activePage==="tips"&&(
          <div>
            <div style={{fontWeight:800,fontSize:22,marginBottom:20}}>Tips & Tricks</div>
            <div style={{display:"flex",flexDirection:"column",gap:16}}>
              {tips.map((cat,i)=>(
                <div key={i} style={{background:COLORS.card,border:`1.5px solid ${COLORS.border}`,borderRadius:16,padding:22}}>
                  <div style={{fontWeight:700,fontSize:16,color:COLORS.primary,marginBottom:14}}>{cat.category}</div>
                  <div style={{display:"flex",flexDirection:"column",gap:8}}>
                    {cat.items.map((item,j)=>(
                      <div key={j} style={{display:"flex",gap:10,alignItems:"flex-start",fontSize:14,color:COLORS.text,lineHeight:1.6}}>
                        <span style={{color:COLORS.accent,fontWeight:700,flexShrink:0}}>→</span>{item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activePage==="glossary"&&(
          <div>
            <div style={{fontWeight:800,fontSize:22,marginBottom:20}}>Glossary</div>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {glossary.map((g,i)=>(
                <div key={i} style={{background:COLORS.card,border:`1.5px solid ${COLORS.border}`,borderRadius:12,padding:"14px 18px",display:"flex",gap:16,alignItems:"flex-start"}}>
                  <div style={{fontWeight:700,color:COLORS.primary,fontSize:14,minWidth:160,flexShrink:0}}>{g.term}</div>
                  <div style={{fontSize:14,color:COLORS.text,lineHeight:1.6}}>{g.def}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}