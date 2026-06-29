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
    id:1, date:"Mon 30 Jun", label:"Day 1", title:"How Data Is Stored",
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
    id:2, date:"Tue 1 Jul", label:"Day 2", title:"Your First Look at the Data",
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
      {type:"comprehension", title:"Quick Questions — answer using filters or COUNTIF", questions:[
        "How many patients were referred for Low Mood?",
        "How many sessions were marked as DNA (Did Not Attend)?",
        "What is the most common presenting problem across all patients?",
        "How many patients have been discharged (check Outcomes)?",
        "Which session type (phone / video / face-to-face) appears most often?",
        "How many Turkish patients are in the dataset?",
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
    id:3, date:"Thu 3 Jul", label:"Day 3", title:"Into Power BI",
    subtitle:"Load your data, meet Power Query, start cleaning", phase:"powerbi",
    recap:"On Tuesday you opened the three source files, spotted inconsistencies, DNA errors, typos and duplicates. You know this dataset well now. Today we bring it into Power BI.",
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
    id:4, date:"Fri 4 Jul", label:"Day 4", title:"Building the Star Schema",
    subtitle:"Relationships, model view & your first visuals", phase:"powerbi",
    recap:"Yesterday you loaded your three tables into Power BI, cleaned in Power Query, and got your tables ready. Today you're connecting them — this is where the star schema comes to life.",
    sections:[
      {type:"intro", content:"Today is one of the most important days of the course. You're going to go into Model view and draw the relationships between your tables. Once that's done, Power BI can answer questions that span multiple tables — like 'show me recovery rates by presenting problem' — without you having to manually look anything up."},
      {type:"lesson", title:"The Star Schema", content:"A star schema has one central table that everything connects to. In your dataset, Patients is the hub. Every other table links to it.\n\nThink of it like a patient file — the patient is at the centre, and hanging off them are their sessions, their outcome, their assessment scores, and their GP surgery.", starDiagram:true},
      {type:"tasks", title:"Build the Model", tasks:[
        {id:"m1", text:"Go to Model view (the icon that looks like three connected boxes on the left)."},
        {id:"m2", text:"Drag PatientID from Patients onto PatientID in Sessions. A line appears — that's your relationship."},
        {id:"m3", text:"Do the same to connect Patients → Outcomes via PatientID."},
        {id:"m4", text:"Click each relationship line — check the cardinality shows one-to-many with the arrow flowing from Patients outward."},
        {id:"m5", text:"Switch to Report view. Add a bar chart — drag PresentingProblem onto Axis and count of PatientID onto Values. You just built your first visual."},
      ]},
      {type:"lesson", title:"The GP Surgeries Table Arrives", content:"Your manager has just sent over a GP Surgeries reference file — Surgery ID, Surgery Name, PCN, Borough and Deprivation Quintile. The Patients table already has a SurgeryID column. Load it, clean it in Power Query (there's something in there), then connect it.",
        tip:"Once GP Surgeries is connected to Patients, you can break down any visual by Borough or Deprivation Quintile — much more meaningful for a service report."},
      {type:"tasks", title:"GP Surgeries — Load & Connect", tasks:[
        {id:"g1", text:"Load GPSurgeries.xlsx into Power BI via Get Data → Transform Data."},
        {id:"g2", text:"Have a look through in Power Query — there's something that needs cleaning before you use it."},
        {id:"g3", text:"Once clean, Close & Apply."},
        {id:"g4", text:"In Model view, connect SurgeryID from GP Surgeries to SurgeryID in Patients."},
        {id:"g5", text:"Add Borough as a slicer on your report. See how your bar chart updates? That's the relationship working."},
      ]},
      {type:"resources", title:"Watch These", links:[
        {label:"YouTube — Power BI Data Modelling & Relationships (Guy in a Cube)", url:"https://www.youtube.com/watch?v=MrLnibDCeQA", note:"Exactly what you're doing today"},
        {label:"YouTube — Star Schema explained simply (SQLBI)", url:"https://www.youtube.com/watch?v=fpk2lqp2FfY", note:"10 mins — worth it for the concept"},
      ]},
      {type:"quiz", questions:[
        {q:"In your star schema, which table sits at the centre?", options:["Sessions","Outcomes","Patients","GP Surgeries"], answer:2, explanation:"Patients is the hub. Every other table connects to it via PatientID or SurgeryID."},
        {q:"You draw a relationship between Patients and Sessions. Which side is 'one' and which is 'many'?", options:["Sessions is one, Patients is many","Patients is one, Sessions is many","Both are one","Both are many"], answer:1, explanation:"One patient can have many sessions — Patients is the 'one' side, Sessions is the 'many' side."},
        {q:"After connecting GP Surgeries to Patients, you add Borough as a slicer. How does Power BI know which patients belong to which borough?", options:["You manually map them","Power BI guesses based on postcode","It follows the relationship — Borough is on GP Surgeries, connected to Patients via SurgeryID","You write a formula"], answer:2, explanation:"The relationship does the work. Filter by Borough → passes through to Patients via SurgeryID → flows to Sessions and Outcomes."},
      ]},
      {type:"hardquiz", questions:[
        {q:"You try to connect Patients → Sessions but Power BI flags a 'many-to-many' warning. What most likely caused this?", options:["The tables are too large","There are duplicate PatientIDs in the Patients table — it's no longer a true one side","Sessions is the wrong table","The date column has errors"], answer:1, explanation:"If PatientID is duplicated in Patients, it's no longer a unique Primary Key — Power BI can't determine a clean 'one' side. This is exactly why removing that duplicate PAT-004 row mattered on Day 2."},
        {q:"GP Surgeries has 5 rows (including the duplicate). After cleaning in Power Query you have 4 surgeries. Patients has 30 rows across 4 surgeries. What is the cardinality of the GP Surgeries → Patients relationship?", options:["One-to-one","Many-to-many","One-to-many (GP Surgeries is one)","One-to-many (Patients is one)"], answer:2, explanation:"One surgery links to many patients. GP Surgeries holds the Primary Key (SurgeryID) — that's the 'one' side. Patients holds SurgeryID as a Foreign Key — that's the 'many' side."},
      ]},
    ],
  },
  {
    id:5, date:"Mon 7 Jul", label:"Day 5", title:"Scores, Averages & Age Bands",
    subtitle:"Wellbeing assessments, DAX basics & conditional columns", phase:"powerbi",
    recap:"On Friday you built the star schema — Patients at the centre, Sessions, Outcomes and GP Surgeries connected. You built your first visuals and saw how filters flow through relationships. Today we add Wellbeing Assessments and start with DAX.",
    sections:[
      {type:"intro", content:"The Wellbeing Assessment table is the most analytically interesting part of the dataset. Six scored questions per patient per wave — so you can look at average scores by surgery, by presenting problem, by age group, and track whether scores improved. This is where Power BI starts to feel genuinely powerful."},
      {type:"tasks", title:"Load Wellbeing Assessments", tasks:[
        {id:"w1", text:"Load WellbeingAssessments.xlsx via Get Data → Transform Data."},
        {id:"w2", text:"Check the data types — the Q columns should be Whole Numbers. Fix any that aren't."},
        {id:"w3", text:"There's something in this table that needs cleaning in Power Query — have a look and sort it."},
        {id:"w4", text:"Close & Apply, then connect WellbeingAssessments to Patients via PatientID in Model view."},
      ]},
      {type:"lesson", title:"DAX — Your First Measures", content:"DAX (Data Analysis Expressions) is the formula language in Power BI. Two things you can create:\n\nA Calculated Column adds a new column to a table, row by row. Like adding a formula column in Excel.\n\nA Measure calculates dynamically based on what's selected on the report — it responds to filters and slicers. Measures are what make Power BI smart.",
        daxExamples:[
          {name:"Total Wellbeing Score", formula:"Total Score = SUM(WellbeingAssessments[Q1_Cope]) + SUM(WellbeingAssessments[Q2_Connected]) + SUM(WellbeingAssessments[Q3_Optimistic]) + SUM(WellbeingAssessments[Q4_Sleep]) + SUM(WellbeingAssessments[Q5_Stress]) + SUM(WellbeingAssessments[Q6_Mood])", note:"Adds up all six question scores"},
          {name:"Avg Cope Score", formula:"Avg Cope = AVERAGE(WellbeingAssessments[Q1_Cope])", note:"Start simple — average of one question. Then try all six."},
          {name:"Patient Count", formula:"Patient Count = COUNTROWS(Patients)", note:"Counts all patients — try this as a card visual"},
        ],
      },
      {type:"lesson", title:"Age Banding — Conditional Column", content:"The Patients table has individual ages. For reporting you want age groups. Go back into Power Query (Home → Transform Data), select Patients, then Add Column → Conditional Column:\n\n• If Age <= 25 → '18–25'\n• If Age <= 35 → '26–35'\n• If Age <= 50 → '36–50'\n• Otherwise → '51+'\n\nClose & Apply, then use AgeBand as an axis on a chart.",
        tip:"Age bands are one of the most common things a consultant adds to a dataset. You'll do this in almost every health or HR dataset you work with."},
      {type:"resources", title:"Watch These", links:[
        {label:"YouTube — DAX Measures vs Calculated Columns (Guy in a Cube)", url:"https://www.youtube.com/watch?v=53RFhSzBBi8", note:"The most important distinction in Power BI"},
        {label:"YouTube — Conditional Columns in Power Query (Wyn Hopkins)", url:"https://www.youtube.com/watch?v=JTKMbSGSlhc", note:"Quick and practical"},
      ]},
      {type:"quiz", questions:[
        {q:"What's the difference between a Calculated Column and a Measure?", options:["No real difference","A Calculated Column adds a row-by-row column; a Measure calculates dynamically based on filters","Measures are faster to write","Calculated Columns only work in Excel"], answer:1, explanation:"Calculated Columns are static — they live in the table. Measures are dynamic — they respond to slicers, filters and visual context."},
        {q:"You want to show average wellbeing score filtered by Borough. Use a Calculated Column or Measure?", options:["Calculated Column","Measure","Either","Neither — use Power Query"], answer:1, explanation:"You need a Measure — it needs to respond dynamically to whichever Borough is selected."},
      ]},
      {type:"hardquiz", questions:[
        {q:"You create a measure: Avg Score = AVERAGE(WellbeingAssessments[Q1_Cope]). You put it in a visual filtered to Wave 1 only. What does the measure calculate?", options:["The average Q1 score across all waves regardless of the filter","The average Q1 score for Wave 1 rows only — the filter context changes what AVERAGE sees","It throws an error","The total, not the average"], answer:1, explanation:"This is filter context in action. When Wave 1 is selected, Power BI passes that filter to the measure — AVERAGE only sees Wave 1 rows. This is why measures are more powerful than calculated columns."},
        {q:"You want a measure showing the improvement in average score from Wave 1 to Wave 2. What's the right approach?", options:["Subtract two AVERAGE measures using CALCULATE to fix each to a wave","Use a Calculated Column","Export to Excel and calculate there","Filter the visual to both waves and use a line chart"], answer:0, explanation:"You'd write: Wave1 Avg = CALCULATE(AVERAGE(...), WellbeingAssessments[Wave] = 'Wave 1') and Wave2 Avg similarly, then Improvement = [Wave2 Avg] - [Wave1 Avg]. CALCULATE lets you override the filter context per measure."},
        {q:"A patient's age is stored as 'thirty two' (text) in the Patients table. You create an age band conditional column. What happens to this patient's age band?", options:["They get assigned to '26-35' correctly","Power Query throws an error and stops","They get assigned to 'null' or an error value because the condition compares text to a number","They appear in '51+' by default"], answer:2, explanation:"The conditional column compares Age <= 25, Age <= 35 etc — but 'thirty two' is text, not a number. The comparison fails and the row gets null or an error. This is exactly why fixing the age text entries in Excel first was important."},
      ]},
    ],
  },
  {
    id:6, date:"Tue 8 Jul", label:"Day 6", title:"New Data Arrives",
    subtitle:"Append, prefix cleaning & seeing the refresh work", phase:"powerbi",
    recap:"Yesterday you added the Wellbeing Assessment table, created your first DAX measures and built age bands. Today you see one of the most satisfying things Power BI can do — handle new data automatically.",
    sections:[
      {type:"intro", content:"In the real world, data doesn't arrive once and stay still. New sessions get logged every week. Today you're getting a second batch of Sessions data — but it's got a problem. The Patient IDs use a different prefix. You'll fix it in Power Query, append it to your existing Sessions, then hit refresh and watch the row count go up."},
      {type:"lesson", title:"The Prefix Problem", content:"Your original Sessions data uses PAT-001 for Patient IDs. The new batch uses P001. They're the same patients — just formatted differently.\n\nIf you append without fixing this, Power BI won't match sessions to patients. PAT-001 and P001 look like different values even though they're not.",
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
      {type:"lesson", title:"What Just Happened", content:"What you just did is exactly what a Power BI consultant sets up for a client. The source file updates, the client hits Refresh, and the dashboard updates — cleaning steps, appends, relationships and all. No manual work.",
        tip:"In a real consultancy setup you'd connect to a SharePoint folder or database so even the file-dropping step is automated. That's the next level — but this is the concept."},
      {type:"resources", title:"Watch These", links:[
        {label:"YouTube — Append Queries in Power Query (Pragmatic Works)", url:"https://www.youtube.com/watch?v=2NNnLRPkG7w", note:"Covers exactly what you did today"},
        {label:"YouTube — Power BI Refresh explained (Guy in a Cube)", url:"https://www.youtube.com/watch?v=TNirzFVeWKs", note:"Good context on how refresh works in practice"},
      ]},
      {type:"hardquiz", questions:[
        {q:"After appending the new Sessions batch, you notice some PatientIDs in the new batch have no matching patient in the Patients table. What does this mean in your model?", options:["Power BI deletes those rows automatically","Those sessions become orphaned — they appear in Sessions but won't show in any visual filtered through Patients","The relationship breaks entirely","It causes a refresh error"], answer:1, explanation:"Orphaned rows — sessions with no matching PatientID in Patients — still exist in Sessions but won't join through to any patient-level data. They'd appear in a session count but not in a 'sessions by patient nationality' visual. Important to flag to the client."},
        {q:"The prefix fix formula uses Text.PadStart(..., 3, '0'). What does the 3 and '0' do?", options:["Adds 3 zeros to the end","Pads the number to 3 characters wide using zeros — so '1' becomes '001'","Rounds to 3 decimal places","Limits text to 3 characters"], answer:1, explanation:"PadStart ensures the number part is always 3 digits — P1 becomes PAT-001, P23 becomes PAT-023. Without this, PAT-1 and PAT-01 and PAT-001 would all be treated as different IDs."},
        {q:"You append the new batch but forget to fix the prefix first. You notice the mistake after clicking Close & Apply. What's the quickest fix?", options:["Delete everything and start again","Go back into Power Query, find the New Batch query, add the prefix fix step there, then re-run the append","Delete the Sessions table and reload it","Change the IDs manually in Table view"], answer:1, explanation:"Power Query is non-destructive. Go back in (Transform Data), find your new batch query, add the fix as a new Applied Step before the append, then Close & Apply again. The append re-runs with the fixed IDs."},
      ]},
    ],
  },
  {
    id:7, date:"Wed 9 Jul", label:"Day 7", title:"DAX — Going Deeper",
    subtitle:"CALCULATE, FILTER & the Date Table", phase:"powerbi",
    recap:"Yesterday you handled a real-world scenario — new data with mismatched IDs, fixed it in Power Query, appended and watched the data update. Today we go deeper into DAX.",
    sections:[
      {type:"intro", content:"DAX is what separates a Power BI report that just shows data from one that actually answers questions. Today you're going to learn CALCULATE — the most important function in DAX — and a few patterns you'll use in almost every report you ever build."},
      {type:"lesson", title:"CALCULATE", content:"CALCULATE is the engine behind almost every useful DAX measure. It lets you change the filter context — calculate something under specific conditions.\n\nCALCULATE([measure], filter1, filter2...)",
        daxExamples:[
          {name:"Low Mood Patients", formula:`Low Mood Count = CALCULATE(COUNTROWS(Patients), Patients[PresentingProblem] = "Low Mood")`, note:"Counts only Low Mood patients regardless of what's selected on the report"},
          {name:"Recovery Rate", formula:`Recovery Rate = DIVIDE(CALCULATE(COUNTROWS(Outcomes), Outcomes[RecoveryStatus] = "Recovered"), COUNTROWS(Outcomes))`, note:"DIVIDE handles divide-by-zero automatically"},
          {name:"DNA Rate", formula:`DNA Rate = DIVIDE(CALCULATE(COUNTROWS(Sessions), Sessions[Attendance] = "DNA"), COUNTROWS(Sessions))`, note:"What percentage of sessions were Did Not Attend"},
        ],
      },
      {type:"lesson", title:"The Date Table", content:"A Date Table is a separate table containing every single date in a continuous range. Power BI needs this to do time intelligence properly — month-on-month comparisons, year-to-date totals.\n\nYou generate it automatically with DAX:",
        daxExamples:[
          {name:"Create Date Table", formula:"DateTable = CALENDAR(DATE(2024,1,1), DATE(2025,12,31))", note:"Paste this in Table Tools → New Table"},
          {name:"Add Month Name", formula:`Month = FORMAT(DateTable[Date], "MMMM")`, note:"Add as a new column in your DateTable"},
          {name:"Add Year", formula:"Year = YEAR(DateTable[Date])", note:"Simple year column — useful for slicers"},
        ],
        tip:"Connect your DateTable to Sessions[SessionDate] and Patients[ReferralDate]. Once connected, time-based slicers work properly across your whole model.",
      },
      {type:"tasks", title:"Build These Measures", tasks:[
        {id:"d1", text:"Create the Low Mood Count measure and put it on a card visual."},
        {id:"d2", text:"Create the Recovery Rate measure. Display it as a percentage."},
        {id:"d3", text:"Create the DNA Rate measure. What's the DNA rate for your dataset?"},
        {id:"d4", text:"Create your Date Table using the CALENDAR formula. Connect it to Sessions and Patients."},
        {id:"d5", text:"Add a Month slicer to your report using your Date Table. Filter to a single month — do your measures update?"},
      ]},
      {type:"resources", title:"Watch These", links:[
        {label:"YouTube — CALCULATE explained (Guy in a Cube)", url:"https://www.youtube.com/watch?v=Xz9MBFv4fac", note:"The best explanation of CALCULATE out there"},
        {label:"YouTube — Date Tables in Power BI (SQLBI)", url:"https://www.youtube.com/watch?v=3_ORcKLBLeI", note:"SQLBI are the authority on DAX — this is the definitive date table video"},
      ]},
      {type:"hardquiz", questions:[
        {q:"You write: Turkish Patients = CALCULATE(COUNTROWS(Patients), Patients[Nationality] = 'Turkish'). You place this on a card. Then you add a Borough slicer and select Lambeth. What does the card show?", options:["All Turkish patients regardless of borough","Only Turkish patients in Lambeth — the slicer filter compounds with CALCULATE's filter","An error — CALCULATE and slicers conflict","Zero — CALCULATE ignores all external filters"], answer:1, explanation:"CALCULATE adds to the existing filter context — it doesn't replace it. The slicer applies Lambeth first, then CALCULATE adds the Turkish filter on top. The card shows Turkish patients in Lambeth only."},
        {q:"Why does Power BI recommend a separate Date Table rather than using dates directly from your Sessions table?", options:["Sessions dates take up too much memory","Sessions dates may have gaps (no sessions on weekends/holidays) — a Date Table is continuous and complete, which time intelligence functions require","It's just a style preference","Date columns in fact tables can't be used as slicers"], answer:1, explanation:"Time intelligence functions like DATESYTD, SAMEPERIODLASTYEAR etc require a contiguous, complete date table with no gaps. If you use SessionDate directly and there are no sessions on a given day, that date doesn't exist — breaking the time calculation."},
        {q:"You calculate DNA Rate = 15%. You add a Nationality slicer and select Turkish. The DNA Rate card now shows 22%. What explains this?", options:["CALCULATE broke the filter","The measure is recalculating using only Turkish patients' sessions — a higher proportion of Turkish patients' sessions were DNA","It's a display error","The Date Table is causing interference"], answer:1, explanation:"Measures are dynamic. When Nationality = Turkish is applied, the COUNTROWS inside CALCULATE only counts Turkish patients' sessions. If Turkish patients happen to have a higher DNA rate, the percentage goes up. This is the insight — and exactly what makes Power BI useful for equity analysis in health services."},
      ]},
    ],
  },
  {
    id:8, date:"Thu 10 Jul", label:"Day 8", title:"Building a Real Report",
    subtitle:"Design, layout & telling a story with data", phase:"powerbi",
    recap:"Yesterday you went deep into DAX — CALCULATE, Recovery Rate, DNA Rate, and the Date Table. You have a proper working model with real measures. Today is about turning that into something a stakeholder would actually read.",
    sections:[
      {type:"intro", content:"Data without design is just numbers. Today you're going to think about how to lay out a report so it tells a story — what someone needs to see first, what's supporting detail, what they can filter. This is the bit consultants get paid for."},
      {type:"lesson", title:"Report Design Principles", content:"Top left = most important. People read left to right, top to bottom. KPI cards go top left.\n\nLimit your colour palette. Pick two or three colours and stick to them. Colour should mean something.\n\nEvery visual needs a clear question it's answering. If you can't name the question, cut the chart.\n\nSlicers go on the left or top — always in the same place.\n\nWhite space is not wasted space."},
      {type:"tasks", title:"Build Your Dashboard Page", tasks:[
        {id:"r1", text:"Add a title: 'Talking Therapies Service — Overview'"},
        {id:"r2", text:"Add three KPI cards: Total Patients, Recovery Rate, DNA Rate."},
        {id:"r3", text:"Add a bar chart: Referrals by Presenting Problem."},
        {id:"r4", text:"Add a bar chart: Average Wellbeing Score by Borough."},
        {id:"r5", text:"Add a slicer for Month (using your Date Table)."},
        {id:"r6", text:"Add a slicer for Nationality — filter by British, Turkish, Nigerian etc."},
        {id:"r7", text:"Format everything — consistent fonts, remove gridlines, background on KPI cards."},
        {id:"r8", text:"Step back and ask: could a manager who knows nothing about this data understand this in 30 seconds?"},
      ]},
      {type:"drillthrough"},
      {type:"resources", title:"Watch These", links:[
        {label:"YouTube — Power BI Drillthrough Pages (Guy in a Cube)", url:"https://www.youtube.com/watch?v=2v8DmFkL6jU", note:"Exactly what you're building today"},
        {label:"YouTube — Power BI Report Design Tips (Guy in a Cube)", url:"https://www.youtube.com/watch?v=7BtwqKVFmWE", note:"Practical design tips from real client reports"},
      ]},
      {type:"hardquiz", questions:[
        {q:"You set up a drillthrough page on Patient ID. A manager right-clicks on Sophie Clarke's bar in a visual and drills through. What does the drillthrough page show?", options:["All patients in Sophie's borough","All patients with Low Mood","Only data related to PAT-001 — Sophie's sessions, scores and outcome","The GP Surgery table"], answer:2, explanation:"Drillthrough passes the selected value (PAT-001) as a filter to the detail page. Every visual on that page is scoped to Sophie's data only — her sessions, her assessment scores, her outcome. This is the patient profile view."},
        {q:"You want the patient profile drillthrough page to show a flag emoji next to the patient's nationality. Where did that flag column need to be created?", options:["Directly in the visual formatting","As a DAX measure","As a Conditional Column in Power Query on the Patients table","In the source Excel file"], answer:2, explanation:"The cleanest approach is a Conditional Column in Power Query — IF Nationality = 'British' → '🇬🇧' etc. It becomes a proper column in the model that any visual on any page can use."},
        {q:"A consultant presents this report to a board. One member asks 'what's the recovery rate for Somali patients specifically?' You haven't built that view. What's the quickest way to answer live?", options:["Tell them you'll follow up","Use the Nationality slicer on the main page to filter to Somali — the Recovery Rate card updates instantly","Build a new page on the spot","Export to Excel and calculate"], answer:1, explanation:"This is the whole point of dynamic measures. The Recovery Rate measure responds to any filter — select Somali in the Nationality slicer and the card recalculates immediately. No new visuals needed. This is what impresses clients."},
      ]},
    ],
  },
  {
    id:9, date:"Fri 11 Jul", label:"Day 9", title:"Mini Project",
    subtitle:"Build a board-ready report from a brief", phase:"project",
    recap:"Yesterday you built a structured dashboard with KPIs, charts, slicers, formatting, and a patient drillthrough page. You're thinking about design as well as data now. Today is your final day — a proper test.",
    sections:[
      {type:"intro", content:"This is your mini project. You're going to build a report from a brief — the same way a consultant gets a request from a client. No step-by-step instructions this time. Use everything you've learned."},
      {type:"brief", title:"The Brief", content:`The Head of Talking Therapies wants a board-ready summary report. They've asked for:\n\n— An overview of patient referrals: how many, by presenting problem, and by borough.\n\n— Recovery and reliable improvement rates — overall and broken down by presenting problem.\n\n— DNA rates — are any surgeries or presenting problems associated with higher drop-out?\n\n— Wellbeing score trends — how do Wave 1 and Wave 2 scores compare? Which presenting problem group shows the most improvement?\n\n— Age breakdown — what age bands make up the referral population?\n\n— Nationality breakdown — is the service reaching a diverse population?\n\n— A patient profile drillthrough page accessible from any patient-level visual.\n\nThe report should be clean, professional and filterable by month and presenting problem. It will be presented at a board meeting.`},
      {type:"tasks", title:"Your Tasks", tasks:[
        {id:"mp1", text:"Read the brief properly before you open Power BI. Think about which visuals answer which questions."},
        {id:"mp2", text:"Plan your pages — you might want more than one. Maybe an Overview page and a Wellbeing Scores page."},
        {id:"mp3", text:"Build the report. Refer back to previous days if you need a reminder."},
        {id:"mp4", text:"When done, review it against the brief — does it answer every question they asked?"},
        {id:"mp5", text:"Save your .pbix file. This is your first portfolio piece."},
      ]},
      {type:"lesson", title:"You Did It 🎉", content:"Going from zero to a board-ready Power BI dashboard in two weeks, while working and starting something new, is genuinely impressive.\n\nWhat you've covered: relational data modelling, Power Query cleaning, star schema design, DAX measures, date intelligence, drillthrough pages, report design and a real-world data scenario. That's the core of what a Power BI consultant does.\n\nThe next step is practice on real datasets, and getting comfortable talking through what you built and why. That's the consultancy skill — not just building it, but explaining the decisions."},
      {type:"hardquiz", questions:[
        {q:"A potential client asks 'can you connect Power BI to our live database rather than Excel files?' What's your honest answer based on what you now know?", options:["No — Power BI only works with Excel","Yes — Power BI can connect directly to SQL databases, SharePoint, APIs and more. The cleaning logic in Power Query works the same way regardless of source","Maybe — it depends on the version of Power BI","Only if they use Microsoft SQL Server"], answer:1, explanation:"Power BI supports hundreds of connectors — SQL Server, PostgreSQL, SharePoint, Salesforce, APIs and more. Everything you learned about Power Query, the model and DAX applies identically. The source just changes."},
        {q:"A client wants to share the dashboard with their whole team so they can each see it on their laptops. What do they need?", options:["Everyone installs Power BI Desktop and you send the .pbix file","The report is published to Power BI Service (the web version) and shared via a workspace or app — viewers only need a browser and a Power BI Pro licence","You export it as a PDF monthly","They all need to install the same version of Excel"], answer:1, explanation:"Power BI Desktop is for building. Power BI Service (app.powerbi.com) is for sharing. You publish the .pbix, set up a scheduled refresh if needed, and share the link. Viewers don't need Desktop — just a browser and a licence."},
        {q:"You notice that patients from Tower Hamlets (Deprivation Quintile 5 — most deprived) have a lower recovery rate than patients from Southwark (Quintile 2). A board member asks if this is statistically significant. What do you say?", options:["Yes — the chart clearly shows the difference","Power BI shows the pattern but can't determine statistical significance — you'd need a statistician or R/Python analysis to confirm whether the difference is meaningful or within expected variation","No — small datasets are always too noisy to draw conclusions","Tell them to look at the numbers themselves"], answer:1, explanation:"This is an important professional boundary. Power BI visualises patterns — it doesn't test significance. Presenting a chart as definitive without statistical testing is a risk. Being honest about this builds trust and is exactly the kind of nuanced thinking that makes a good consultant."},
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
        {["Sessions\n(Fact)","Outcomes","GP Surgeries","Wellbeing\nAssessments"].map((label,i)=>(
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

function DayContent({day}) {
  return (
    <div style={{display:"flex",flexDirection:"column",gap:20}}>
      {day.recap && (
        <div style={{background:COLORS.accentLight,border:`1.5px solid ${COLORS.accent}`,borderRadius:14,padding:18}}>
          <div style={{fontWeight:700,color:COLORS.accent,fontSize:13,marginBottom:6}}>📚 Yesterday's Recap</div>
          <div style={{color:COLORS.text,fontSize:14,lineHeight:1.7}}>{day.recap}</div>
        </div>
      )}
      {day.sections.map((s,i)=>{
        if(s.type==="intro") return <div key={i} style={{color:COLORS.text,fontSize:15,lineHeight:1.8,padding:"4px 0"}}>{s.content}</div>;
        if(s.type==="drillthrough") return <DrillthroughChallenge key={i}/>;
        if(s.type==="quiz") return <QuizSection key={i} questions={s.questions} hard={false}/>;
        if(s.type==="hardquiz") return <QuizSection key={i} questions={s.questions} hard={true}/>;
        if(s.type==="tasks") return (
          <div key={i} style={{background:COLORS.card,border:`1.5px solid ${COLORS.border}`,borderRadius:16,padding:22}}>
            <div style={{fontWeight:700,fontSize:16,color:COLORS.text,marginBottom:4}}>{s.title}</div>
            {s.file&&<div style={{fontSize:13,color:COLORS.muted,marginBottom:14}}>📁 File: <span style={{fontFamily:"monospace",color:COLORS.primary}}>{s.file}</span></div>}
            {!s.file&&<div style={{marginBottom:14}}/>}
            <TaskList tasks={s.tasks}/>
          </div>
        );
        if(s.type==="comprehension") return (
          <div key={i} style={{background:COLORS.card,border:`1.5px solid ${COLORS.border}`,borderRadius:16,padding:22}}>
            <div style={{fontWeight:700,fontSize:15,color:COLORS.text,marginBottom:14}}>{s.title}</div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {s.questions.map((q,qi)=>(
                <div key={qi} style={{background:COLORS.bg,borderRadius:10,padding:"12px 16px",fontSize:14,color:COLORS.text,lineHeight:1.5}}>
                  <span style={{fontWeight:700,color:COLORS.primary,marginRight:8}}>Q{qi+1}.</span>{q}
                </div>
              ))}
            </div>
          </div>
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
          <div key={i} style={{background:COLORS.card,border:`1.5px solid ${COLORS.border}`,borderRadius:16,padding:22}}>
            <div style={{fontWeight:700,fontSize:16,color:COLORS.text,marginBottom:12}}>{s.title}</div>
            <div style={{color:COLORS.text,fontSize:14,lineHeight:1.8,whiteSpace:"pre-line"}}>{s.content}</div>
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
            {s.afterDual&&<div style={{marginTop:12,color:COLORS.text,fontSize:14,lineHeight:1.7}}>{s.afterDual}</div>}
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
  const phaseColour=p=>p==="foundations"?COLORS.accent:p==="project"?COLORS.green:COLORS.primary;
  const phaseLabel=p=>p==="foundations"?"Foundations":p==="project"?"Project":"Power BI";

  return (
    <div style={{fontFamily:"'Inter',-apple-system,BlinkMacSystemFont,sans-serif",background:COLORS.bg,minHeight:"100vh",color:COLORS.text}}>
      <div style={{background:COLORS.card,borderBottom:`1px solid ${COLORS.border}`,padding:"0 24px"}}>
        <div style={{maxWidth:960,margin:"0 auto"}}>
          <div style={{padding:"18px 0 0",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <div>
              <div style={{fontWeight:800,fontSize:20,color:COLORS.text,letterSpacing:"-0.5px"}}>Berry's Power BI Course 📊</div>
              <div style={{fontSize:13,color:COLORS.muted,marginTop:2}}>30 Jun → 11 Jul · 1–2 hrs a day · You've got this</div>
            </div>
          </div>
          <div style={{display:"flex",gap:0,marginTop:16,overflowX:"auto"}}>
            {[{id:"course",label:"Course"},{id:"tips",label:"Tips & Tricks"},{id:"glossary",label:"Glossary"}].map(p=>(
              <button key={p.id} onClick={()=>setActivePage(p.id)}
                style={{background:"none",border:"none",borderBottom:activePage===p.id?`3px solid ${COLORS.primary}`:"3px solid transparent",color:activePage===p.id?COLORS.primary:COLORS.muted,fontWeight:activePage===p.id?700:500,fontSize:14,padding:"10px 18px",cursor:"pointer",whiteSpace:"nowrap",fontFamily:"inherit",transition:"all 0.15s"}}>
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
                  <div style={{fontSize:11,fontWeight:700,color:activeTab===`day-${d.id}`?"rgba(255,255,255,0.7)":COLORS.muted,marginBottom:2}}>{d.date}</div>
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
                    <div style={{fontWeight:800,fontSize:24,color:COLORS.text,letterSpacing:"-0.5px",lineHeight:1.2}}>{day.title}</div>
                    <div style={{fontSize:15,color:COLORS.muted,marginTop:4}}>{day.subtitle}</div>
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
