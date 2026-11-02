import React, { useMemo, useState } from 'react'
import {
  GraduationCap, BookOpen, CalendarDays, Wallet, UserRound, Bell, Search,
  ChevronRight, ChevronDown, MapPin, Clock3, Award, Library, FileText,
  ClipboardCheck, Headphones, Menu, X, LogOut, ShieldCheck, Eye, EyeOff,
  ArrowLeft, Mail, LockKeyhole, IdCard, CircleHelp, Download, CheckCircle2,
  Laptop, CalendarCheck, BookMarked, CreditCard, Settings, ExternalLink,
  Megaphone, Users, ChartNoAxesColumn, CircleUserRound
} from 'lucide-react'

const navItems = [
  { id: 'academics', label: 'Academics', icon: GraduationCap },
  { id: 'classroom', label: 'Classroom', icon: BookOpen },
  { id: 'events', label: 'Events', icon: CalendarDays },
  { id: 'fees', label: 'Fees', icon: Wallet },
  { id: 'profile', label: 'Profile', icon: UserRound }
]
const courses = [
  { code: 'CS 401', name: 'Design & Analysis of Algorithms', teacher: 'Prof. Sharma', credits: 4, att: 92, color: 'green' },
  { code: 'CS 402', name: 'Database Management Systems', teacher: 'Dr. Verma', credits: 4, att: 88, color: 'green' },
  { code: 'CS 403', name: 'Operating Systems', teacher: 'Dr. Gupta', credits: 3, att: 84, color: 'amber' },
  { code: 'CS 404', name: 'Web Technologies & Full Stack', teacher: 'Prof. Singh', credits: 4, att: 95, color: 'green' }
]
const events = [
  { day: '28', month: 'OCT', weekday: 'TUE', tag: 'Sports Meet', title: 'Spardha 2025 Annual Athletics', info: 'Track & Field, Cricket, Badminton & Volleyball', place: 'Main Sports Complex', time: '08:30 AM', button: 'Register Roster', color: 'green' },
  { day: '05', month: 'NOV', weekday: 'WED', tag: 'Guest Lecture', title: 'Alumni Leadership: AI in Engineering', info: 'Keynote by invited industry speaker', place: 'Seminar Hall 2', time: '02:00 PM', button: 'Reserve Seat', color: 'rose' },
  { day: '12', month: 'NOV', weekday: 'WED', tag: 'Cultural Fest', title: 'Shobhit Cultural Night & Diyas', info: 'Classical dance, Sufi band performances', place: 'Open Air Amphitheatre', time: '05:30 PM', button: 'Get Entry Pass', color: 'gold' }
]
const demoFees = [
  { title: 'Semester III Tuition Fee', date: 'Paid on Jul 14, 2024 via HDFC NetBanking', ref: 'SHU-REC-8921', amount: '₹52,000' },
  { title: 'Hostel & Mess Charges (Sem III)', date: 'Paid on Jul 20, 2024 via UPI', ref: 'SHU-REC-7734', amount: '₹38,000' },
  { title: 'Caution & Library Security Deposit', date: 'Paid on Aug 02, 2023 at Campus Cashier', ref: 'SHU-REC-3108', amount: '₹5,000' }
]

function Logo({ small=false }) {
  return <div className="flex items-center gap-2.5 min-w-0">
    <div className={`${small ? 'h-9 w-9' : 'h-11 w-11'} flex shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white`}>
      <img src="/shobhit-logo.png" alt="Shobhit University logo" className="h-full w-full object-contain" />
    </div>
    <div className="min-w-0 leading-tight">
      <div className="font-extrabold tracking-tight text-ink">Shobhit <span className="hidden sm:inline">University</span><span className="sm:hidden">CMS</span></div>
      <div className="text-[10px] text-slate-500">Gangoh · Student Portal</div>
    </div>
  </div>
}
function Pill({ children, tone='blue' }) {
  const colors = { blue:'bg-blue-100 text-blue-800', green:'bg-emerald-100 text-emerald-800', rose:'bg-rose-100 text-rose-700', gold:'bg-amber-100 text-amber-800', gray:'bg-slate-100 text-slate-600' }
  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold ${colors[tone]}`}>{children}</span>
}
function SectionTitle({ title, subtitle, action, onAction }) {
  return <div className="mb-3 flex items-end justify-between gap-3">
    <div><h2 className="text-[17px] font-extrabold tracking-tight text-ink">{title}</h2>{subtitle && <p className="mt-1 text-xs text-slate-500">{subtitle}</p>}</div>
    {action && <button onClick={onAction} className="shrink-0 text-xs font-bold text-brand hover:underline">{action} <ChevronRight size={13} className="inline" /></button>}
  </div>
}
function StatCard({ title, value, suffix, hint, icon:Icon, tone='blue' }) {
  const tones = { blue:'bg-blue-100 text-blue-800', green:'bg-emerald-100 text-emerald-700', gold:'bg-amber-100 text-amber-800', rose:'bg-rose-100 text-rose-700' }
  return <article className="rounded-2xl border border-slate-100 bg-white p-4 shadow-soft">
    <div className="flex items-center justify-between gap-2"><span className="text-xs font-medium text-slate-500">{title}</span><span className={`grid h-9 w-9 place-items-center rounded-xl ${tones[tone]}`}><Icon size={18}/></span></div>
    <div className="mt-2 text-[27px] font-extrabold tracking-tight text-slate-950">{value}<span className="ml-1 text-xs font-semibold text-slate-400">{suffix}</span></div>
    <p className="mt-1 text-[10px] text-slate-500">{hint}</p>
  </article>
}
function App() {
  const [page, setPage] = useState('academics')
  const [mobileMenu, setMobileMenu] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [showLogin, setShowLogin] = useState(true)
  const [recovery, setRecovery] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [role, setRole] = useState('Student')
  const [eventFilter, setEventFilter] = useState('All')
  const [registered, setRegistered] = useState([])
  const [expandedCourse, setExpandedCourse] = useState('')
  const [toast, setToast] = useState('')
  const [profileMenu, setProfileMenu] = useState(false)
  const [formId, setFormId] = useState('SHU-2023-CS089')
  const [formPassword, setFormPassword] = useState('')
  const [signedIn, setSignedIn] = useState(false)

  const notify = (message) => {
    setToast(message)
    window.clearTimeout(window.__cmsToast)
    window.__cmsToast = window.setTimeout(() => setToast(''), 2800)
  }
  const choosePage = (id) => { setPage(id); setMobileMenu(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const filteredEvents = useMemo(() => events.filter(e => {
    const matchesTab = eventFilter === 'All' || e.tag === eventFilter
    const q = search.toLowerCase()
    const matchesSearch = !q || `${e.title} ${e.info} ${e.tag}`.toLowerCase().includes(q)
    return matchesTab && matchesSearch
  }), [eventFilter, search])

  if (!signedIn) {
    return <div className="min-h-screen bg-canvas px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <header className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 shadow-soft">
          <button onClick={() => setRecovery(false)} className="rounded-full p-2 hover:bg-slate-100" aria-label="Back"><ArrowLeft size={22}/></button>
          <Logo />
          <button onClick={() => notify('For help, contact the university IT support desk.')} className="rounded-full p-2 text-slate-600 hover:bg-slate-100" aria-label="Help"><CircleHelp size={22}/></button>
        </header>
        <div className="mx-auto grid max-w-4xl gap-6 py-7 md:grid-cols-[.85fr_1.15fr] md:items-center md:py-12">
          <section className="text-center md:text-left">
            <div className="mx-auto mb-4 grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-ink to-slate-700 p-3 shadow-lg md:mx-0"><img src="/shobhit-logo.png" alt="" className="h-full w-full rounded-full object-contain bg-white"/></div>
            <Pill tone="blue">● DIGICAMPUS CMS PORTAL</Pill>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink">Shobhit University</h1>
            <p className="mt-2 text-sm italic text-slate-500">Education Empowers · Meerut & Gangoh</p>
            <div className="mt-6 rounded-2xl border-l-4 border-wine bg-white p-4 text-left shadow-soft">
              <div className="flex gap-3"><ShieldCheck className="mt-1 shrink-0 text-wine" size={22}/><div><b className="text-xs text-wine">OFFICIAL SECURITY NOTICE</b><p className="mt-1 text-sm leading-6 text-slate-600">Portal credentials are provisioned by the university. Self-registration is disabled for institutional security.</p></div></div>
            </div>
          </section>
          <section className="rounded-3xl border border-slate-100 bg-white p-5 shadow-soft sm:p-8">
            {recovery ? <>
              <Pill>OFFICIAL PORTAL</Pill><h2 className="mt-4 text-2xl font-extrabold text-ink">Password Recovery & Reset</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">Enter your university ID and registered contact details to start account recovery.</p>
              <form className="mt-6 space-y-4" onSubmit={e=>{e.preventDefault();notify('Demo only: connect the approved account-recovery API.')}}>
                <label className="block text-xs font-bold text-slate-700">University Enrollment No.<input required value={formId} onChange={e=>setFormId(e.target.value)} className="field mt-2" placeholder="Enter Enrollment ID"/></label>
                <label className="block text-xs font-bold text-slate-700">Registered Mobile No. or SIS Email<input required className="field mt-2" placeholder="name@shobhituniversity.ac.in or +91"/></label>
                <label className="block text-xs font-bold text-slate-700">Preferred reset medium<select className="field mt-2"><option>Official Academic Email</option><option>SMS Security Code</option></select></label>
                <button className="primary-button w-full" type="submit">Send Security OTP <ChevronRight size={18}/></button>
              </form>
              <button onClick={()=>setRecovery(false)} className="mt-5 w-full text-sm font-semibold text-brand hover:underline">← Back to Institutional Sign In</button>
            </> : <>
              <div className="flex items-center justify-between gap-3"><h2 className="text-2xl font-extrabold text-ink">Sign In</h2><Pill>STUDENT ACCESS</Pill></div>
              <p className="mt-2 text-sm text-slate-500">Use your university-issued credentials to continue.</p>
              <div className="mt-5 flex gap-2 rounded-xl bg-blue-50 p-1">
                {['Student','Faculty','Staff / Admin'].map(r=><button key={r} onClick={()=>setRole(r)} className={`flex-1 rounded-lg px-2 py-2.5 text-xs font-bold ${role===r?'bg-white text-ink shadow-sm':'text-slate-500'}`}>{r}</button>)}
              </div>
              <form className="mt-5 space-y-4" onSubmit={e=>{e.preventDefault();setSignedIn(true);setPage('academics');notify('Demo portal opened. Use a real backend for authentication.')}}>
                <label className="block text-xs font-bold text-slate-700">University ID / Enrollment Number<input required value={formId} onChange={e=>setFormId(e.target.value)} className="field mt-2" placeholder="e.g. SHU-2024-CS089"/></label>
                <label className="block text-xs font-bold text-slate-700">Portal Password<div className="relative mt-2"><input required type={showPassword?'text':'password'} value={formPassword} onChange={e=>setFormPassword(e.target.value)} className="field pr-12" placeholder="Enter your password"/><button type="button" onClick={()=>setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" aria-label="Toggle password visibility">{showPassword?<EyeOff size={19}/>:<Eye size={19}/>}</button></div></label>
                <div className="text-right"><button type="button" onClick={()=>setRecovery(true)} className="text-xs font-bold text-wine hover:underline">Forgot / Reset?</button></div>
                <button className="primary-button w-full" type="submit"><LogOut size={18} className="rotate-180"/> Sign In to Campus Portal</button>
              </form>
              <div className="mt-5 rounded-xl bg-blue-50 p-4 text-center"><Headphones size={18} className="mx-auto text-brand"/><b className="mt-2 block text-xs">INSTITUTIONAL IT SUPPORT</b><p className="mt-2 text-xs leading-5 text-slate-500">Need assistance? Contact the university IT helpdesk through official university channels.</p></div>
            </>}
          </section>
        </div>
        <p className="text-center text-[10px] leading-5 text-slate-400">© {new Date().getFullYear()} Shobhit University · Gangoh · Demo frontend</p>
      </div>
      <Toast message={toast}/>
    </div>
  }

  return <div className="min-h-screen bg-canvas text-ink">
    {mobileMenu && <button className="fixed inset-0 z-30 bg-slate-950/40 md:hidden" onClick={()=>setMobileMenu(false)} aria-label="Close navigation overlay"/>}
    <aside className={`fixed inset-y-0 left-0 z-40 flex w-[248px] flex-col border-r border-slate-100 bg-white px-4 py-5 transition-transform md:translate-x-0 ${mobileMenu?'translate-x-0':'-translate-x-full'}`}>
      <div className="px-1"><Logo/></div>
      <div className="mt-8 px-3 text-[10px] font-extrabold tracking-[.16em] text-slate-400">CAMPUS MENU</div>
      <nav className="mt-3 space-y-1">
        {navItems.map(({id,label,icon:Icon})=><button key={id} onClick={()=>choosePage(id)} className={`nav-link ${page===id?'nav-link-active':''}`}><Icon size={19}/><span>{label}</span>{page===id&&<span className="ml-auto h-1.5 w-1.5 rounded-full bg-gold"/>}</button>)}
      </nav>
      <div className="mt-auto rounded-2xl bg-blue-50 p-4"><div className="flex items-center gap-2 text-sm font-bold"><Headphones size={17}/> Need help?</div><p className="mt-2 text-xs leading-5 text-slate-500">Contact the campus support team for portal assistance.</p><button onClick={()=>notify('Please contact your official campus IT support desk.')} className="mt-3 text-xs font-bold text-brand">Help & support ↗</button></div>
      <button onClick={()=>{setSignedIn(false);setRecovery(false)}} className="mt-3 flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-slate-500 hover:bg-slate-50"><LogOut size={18}/> Sign out</button>
    </aside>

    <main className="min-h-screen pb-24 md:ml-[248px] md:pb-6">
      <header className="sticky top-0 z-20 flex h-[68px] items-center justify-between border-b border-slate-100 bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <button onClick={()=>setMobileMenu(true)} className="rounded-lg p-2 hover:bg-slate-100 md:hidden" aria-label="Open navigation"><Menu size={22}/></button>
          <div className="min-w-0"><div className="text-sm font-extrabold text-ink">Shobhit University</div><div className="text-[10px] text-slate-500">{navItems.find(n=>n.id===page)?.label || 'Campus Portal'}</div></div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          {searchOpen && <input autoFocus value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search events..." className="w-28 rounded-lg border border-slate-200 px-2 py-2 text-xs sm:w-44"/>}
          <button onClick={()=>setSearchOpen(!searchOpen)} className="icon-button" aria-label="Search"><Search size={18}/></button>
          <button onClick={()=>notify('You are all caught up.')} className="icon-button relative" aria-label="Notifications"><Bell size={18}/><span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-wine"/></button>
          <div className="relative">
            <button onClick={()=>setProfileMenu(!profileMenu)} className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-xs font-extrabold text-white">AS</button>
            {profileMenu&&<div className="absolute right-0 top-11 z-30 w-48 rounded-xl border border-slate-100 bg-white p-2 shadow-lg"><div className="px-3 py-2"><b className="block text-xs">Aarav Sharma</b><span className="text-[10px] text-slate-500">Student · {formId}</span></div><button onClick={()=>{choosePage('profile');setProfileMenu(false)}} className="w-full rounded-lg px-3 py-2 text-left text-xs hover:bg-slate-50">My profile</button><button onClick={()=>{setSignedIn(false);setProfileMenu(false)}} className="w-full rounded-lg px-3 py-2 text-left text-xs text-wine hover:bg-rose-50">Sign out</button></div>}
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1440px] px-3 py-5 sm:px-5 lg:px-8 lg:py-7">
        {page==='academics'&&<Academics choosePage={choosePage} expandedCourse={expandedCourse} setExpandedCourse={setExpandedCourse} notify={notify}/>}
        {page==='classroom'&&<Classroom notify={notify}/>}
        {page==='events'&&<Events eventFilter={eventFilter} setEventFilter={setEventFilter} filteredEvents={filteredEvents} registered={registered} setRegistered={setRegistered} notify={notify}/>}
        {page==='fees'&&<Fees notify={notify}/>}
        {page==='profile'&&<Profile formId={formId} role={role} notify={notify}/>}
        <footer className="mt-8 hidden items-center justify-between gap-3 border-t border-slate-200 pt-4 text-[10px] text-slate-400 md:flex"><span>© {new Date().getFullYear()} Shobhit University, Gangoh · College CMS</span><span>Frontend demonstration · Responsive portal</span></footer>
      </div>
    </main>

    <nav className="fixed inset-x-0 bottom-0 z-20 grid grid-cols-5 border-t border-slate-200 bg-white/95 px-1 pb-[max(env(safe-area-inset-bottom),5px)] pt-2 backdrop-blur md:hidden">
      {navItems.map(({id,label,icon:Icon})=><button key={id} onClick={()=>choosePage(id)} className={`flex flex-col items-center gap-1 rounded-lg py-1 text-[10px] font-semibold ${page===id?'text-ink':'text-slate-500'}`}><Icon size={20} strokeWidth={page===id?2.5:1.8}/><span>{label}</span>{page===id&&<span className="h-1 w-5 rounded-full bg-gold"/>}</button>)}
    </nav>
    <Toast message={toast}/>
  </div>
}

function Academics({choosePage,expandedCourse,setExpandedCourse,notify}) {
  return <div className="space-y-6">
    <section className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end"><div><div className="text-[10px] font-extrabold tracking-[.15em] text-brand">ACADEMIC YEAR 2024–25</div><h1 className="mt-2 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">Semester IV <span className="text-slate-400">—</span> B.Tech</h1><p className="mt-1 text-sm text-slate-500">Computer Science & Engineering · Section A</p></div><Pill tone="green">● Enrolled Active</Pill></section>
    <section className="grid grid-cols-2 gap-3 xl:grid-cols-4">
      <StatCard title="Cumulative GPA" value="8.74" suffix="/ 10" hint="↗ +0.21 vs Sem III" icon={Award} tone="gold"/>
      <StatCard title="Earned Credits" value="78" suffix="/ 160" hint="48.7% Degree Done" icon={BookOpen} tone="blue"/>
      <StatCard title="Aggregate Attendance" value="89.2%" suffix="" hint="Safe (≥75% required)" icon={ClipboardCheck} tone="green"/>
      <StatCard title="Dean's Standing" value="Top 5%" suffix="" hint="Rank #6 of 142" icon={Award} tone="rose"/>
    </section>
    <section className="overflow-hidden rounded-2xl bg-ink text-white shadow-soft">
      <div className="grid gap-4 p-5 sm:grid-cols-[1fr_auto] sm:items-center sm:p-6"><div><div className="flex flex-wrap items-center gap-2"><span className="text-xs font-bold text-amber-300">● HAPPENING NEXT</span><Pill tone="gray">10:30 – 11:25 AM</Pill></div><h2 className="mt-3 text-lg font-extrabold">Design & Analysis of Algorithms</h2><p className="mt-1 text-xs text-slate-300">CS401 · Lecture · Prof. Sharma</p><p className="mt-4 flex items-center gap-2 text-xs text-slate-300"><MapPin size={15}/> Lecture Hall LT-3 (2nd Floor)</p></div><button onClick={()=>notify('Check-in is a demo. Connect the approved attendance service.')} className="rounded-xl bg-gold px-4 py-3 text-xs font-extrabold text-ink hover:bg-amber-300">Check-in →</button></div>
    </section>
    <section><SectionTitle title="Registered Courses" subtitle="Your current semester modules" action="Curriculum" onAction={()=>notify('Curriculum will be connected to academic records.')}/><div className="grid gap-3 lg:grid-cols-2">{courses.map(c=><article key={c.code} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-soft"><button onClick={()=>setExpandedCourse(expandedCourse===c.code?'':c.code)} className="flex w-full items-center gap-3 text-left"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-blue-50 text-xs font-extrabold text-brand">{c.code.split(' ')[0]}<small>{c.code.split(' ')[1]}</small></span><span className="min-w-0 flex-1"><b className="block truncate text-sm">{c.name}</b><small className="mt-1 block text-xs text-slate-500">{c.teacher} · {c.credits} Credits</small></span><ChevronDown size={17} className={`shrink-0 text-slate-400 transition ${expandedCourse===c.code?'rotate-180':''}`}/></button><div className="mt-3 flex items-center gap-3"><div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100"><div className={`h-full rounded-full ${c.color==='green'?'bg-emerald-600':'bg-amber-500'}`} style={{width:`${c.att}%`}}/></div><span className={`text-[10px] font-bold ${c.color==='green'?'text-emerald-700':'text-amber-700'}`}>{c.att}% Attd</span></div>{expandedCourse===c.code&&<div className="mt-3 rounded-xl bg-slate-50 p-3 text-xs leading-5 text-slate-600">Attendance shown is sample data. Open the attendance module to view verified session records and date filters.</div>}</article>)}</div></section>
    <section><SectionTitle title="Today's Lectures" subtitle="Monday, 21 April"/><div className="rounded-2xl border border-slate-100 bg-white p-3 shadow-soft">{[['09:00 AM','Maths IV (Discrete)','Room LT-2 · Dr. Tyagi','Attended'],['10:30 AM','Algorithms (CS401)','Room LT-3 · Prof. Sharma','Live'],['01:30 PM','DBMS Lab Section A','Hardware Lab 2 · Dr. Verma','Upcoming']].map((l,i)=><div key={l[1]} className={`flex gap-3 rounded-xl p-3 ${i===1?'bg-blue-50':''}`}><div className="w-[72px] shrink-0 border-r border-slate-200 pr-3"><b className="block text-[11px]">{l[0]}</b><small className="text-[10px] text-slate-500">{i===1?'Current':i===0?'1 hr':'1.5 hrs'}</small></div><div className="min-w-0 flex-1"><b className={`block text-sm ${i===0?'text-slate-400 line-through':''}`}>{l[1]}</b><small className="text-xs text-slate-500">{l[2]}</small></div><Pill tone={i===1?'green':'gray'}>{l[3]}</Pill></div>)}</div></section>
    <section><SectionTitle title="Academic Services & Requests" subtitle="Frequently used student services"/><div className="grid grid-cols-2 gap-3 xl:grid-cols-4">{[{title:'Syllabus PDF',desc:'Regulation 2024',icon:FileText,tone:'blue'},{title:'Exam Dates',desc:'Mid Sem II & Finals',icon:CalendarDays,tone:'rose'},{title:'Transcripts',desc:'Grade Cards & SGPA',icon:ClipboardCheck,tone:'gold'},{title:'Leave / Cert',desc:'Bonafide & Medical',icon:BookMarked,tone:'green'}].map(s=><button key={s.title} onClick={()=>notify(`${s.title}: connect to the official student service.`)} className="rounded-2xl border border-slate-100 bg-white p-4 text-left shadow-soft hover:border-blue-200"><span className={`mb-3 grid h-9 w-9 place-items-center rounded-xl ${s.tone==='blue'?'bg-blue-100 text-blue-800':s.tone==='rose'?'bg-rose-100 text-rose-700':s.tone==='gold'?'bg-amber-100 text-amber-800':'bg-emerald-100 text-emerald-700'}`}><s.icon size={18}/></span><b className="block text-sm">{s.title}</b><small className="mt-1 block text-[11px] text-slate-500">{s.desc}</small></button>)}</div></section>
    <section className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-soft sm:flex-row sm:items-center"><div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-slate-100"><img src="/shobhit-logo.png" alt="University emblem" className="h-full w-full object-contain"/></div><div className="flex-1"><small className="text-[9px] font-bold tracking-widest text-slate-500">ASSIGNED FACULTY MENTOR</small><b className="mt-1 block text-sm">Dr. Rajesh K. Mittal</b><small className="text-xs text-slate-500">Dept. of Computer Science & Engineering</small></div><button onClick={()=>notify('Messaging will be available when institutional communication is connected.')} className="secondary-button"><Mail size={16}/> Contact mentor</button></section>
  </div>
}
function Classroom({notify}) {
  const [tab,setTab]=useState('Active Courses')
  const [filter,setFilter]=useState('')
  const tasks=[{status:'DUE TOMORROW · 11:59 PM',points:'20 Pts',title:'DBMS Lab 4: Relational Algebra & SQL Views',course:'CS401 · Prof. D. Sharma',due:'26 hours left',tone:'rose'},{status:'DUE FRIDAY · OCT 24',points:'In Review',title:'Algorithm Complexity Case Study',course:'CS405 · Dr. Anita Verma',due:'Draft v2 submitted · Pending TA verification',tone:'gold'},{status:'GRADED',points:'A · 48/50 Pts',title:'OS Kernel Threading Benchmark',course:'CS402 · Dr. S. K. Roy',due:'Graded feedback available',tone:'green'}]
  return <div className="space-y-6"><PageIntro eyebrow="CLASSROOM" title="Your learning space" desc="Classes, assignments, notes and faculty updates."/><div className="rounded-2xl bg-ink p-5 text-white shadow-soft"><div className="flex flex-wrap items-center justify-between gap-2"><Pill tone="rose">● LIVE IN 12 MINS</Pill><span className="text-xs text-slate-300">◉ Hall 4 · HyFlex</span></div><p className="mt-4 text-[10px] font-bold text-amber-300">CS401 · SEMESTER VI</p><h2 className="mt-1 text-lg font-extrabold">Distributed Database Systems</h2><p className="mt-2 text-xs text-slate-300">Prof. Devendra Sharma · Lab-4 & Virtual Stream</p><div className="mt-5 grid grid-cols-2 gap-2"><button onClick={()=>notify('Classroom join link must be supplied by your institution.')} className="primary-button !bg-gold !text-ink"><Laptop size={17}/> Join Hall</button><button onClick={()=>notify('Check-in PIN is not configured in this frontend demo.')} className="rounded-xl bg-blue-100 px-3 py-3 text-xs font-bold text-ink"><ClipboardCheck size={17} className="inline mr-2"/>Check-in PIN</button></div></div><div className="flex gap-2 overflow-x-auto pb-1">{['Active Courses','Assignments','Notes'].map(t=><button key={t} onClick={()=>setTab(t)} className={`shrink-0 rounded-full px-4 py-2.5 text-xs font-bold ${tab===t?'bg-ink text-white':'bg-white text-slate-600'}`}>{t}{t==='Assignments'&&<span className="ml-2 rounded-full bg-rose-100 px-1.5 py-0.5 text-rose-700">3</span>}</button>)}</div>{tab==='Assignments'?<section><SectionTitle title="Submissions & Deadlines" subtitle="Track work and feedback"/><div className="space-y-3">{tasks.filter(t=>`${t.title} ${t.course}`.toLowerCase().includes(filter.toLowerCase())).map(t=><article key={t.title} className={`rounded-2xl border-l-4 bg-white p-4 shadow-soft ${t.tone==='rose'?'border-wine':t.tone==='gold'?'border-amber-400':'border-emerald-600'}`}><div className="flex flex-wrap items-center justify-between gap-2"><Pill tone={t.tone}>{t.status}</Pill><span className="text-[10px] font-bold text-slate-500">{t.points}</span></div><h3 className="mt-3 font-extrabold">{t.title}</h3><p className="mt-1 text-xs text-slate-500">{t.course}</p><div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500"><span><Clock3 size={13} className="inline mr-1"/>{t.due}</span><button onClick={()=>notify('Submission editing needs the backend and file storage.')} className="secondary-button">{t.tone==='rose'?'Upload PDF / Code':'View details'}</button></div></article>)}</div></section>:tab==='Notes'?<section><SectionTitle title="Course Resources & Notes" subtitle="Semester VI repository"/>{['Lecture 14: B+ Trees & Indexing','Module 3: Deadlock Detection','Faculty notice: Mid-term revision'].map((x,i)=><button key={x} onClick={()=>notify('Resource download is not connected yet.')} className="mb-3 flex w-full items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 text-left shadow-soft"><span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-brand"><FileText size={19}/></span><span className="min-w-0 flex-1"><b className="block truncate text-sm">{x}</b><small className="text-xs text-slate-500">{i===0?'PDF · 4.8 MB':i===1?'PPTX · 14.2 MB':'Faculty announcement'}</small></span><Download size={18} className="text-slate-500"/></button>)}</section>:<section><SectionTitle title="Active Courses" subtitle="Courses available to your account"/>{courses.map(c=><div key={c.code} className="mb-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-soft"><b className="text-sm">{c.name}</b><p className="mt-1 text-xs text-slate-500">{c.code} · {c.teacher}</p><div className="mt-3 flex items-center justify-between"><Pill tone="blue">{c.credits} Credits</Pill><button onClick={()=>notify('Course page will connect to the classroom module.')} className="text-xs font-bold text-brand">Open course ↗</button></div></div>)}</section>}</div>
}
function Events({eventFilter,setEventFilter,filteredEvents,registered,setRegistered,notify}) {
  const filters=['All','Sports Meet','Guest Lecture','Cultural Fest']
  return <div className="space-y-6"><PageIntro eyebrow="CAMPUS LIFE" title="Events & activities" desc="Explore university events and manage your passes."/><div className="flex flex-col gap-3 sm:flex-row"><div className="grid flex-1 grid-cols-2 rounded-xl bg-blue-100 p-1"><button className="rounded-lg bg-ink px-3 py-2.5 text-xs font-bold text-white"><CalendarDays size={15} className="mr-1 inline"/> Explore Events</button><button onClick={()=>notify(`You have ${registered.length} demo event registration(s).`)} className="rounded-lg px-3 py-2.5 text-xs font-bold text-slate-700">▣ My Passes {registered.length>0&&<span className="ml-1 text-wine">●</span>}</button></div><button onClick={()=>notify('Event proposal form will be connected to the event-management backend.')} className="secondary-button"><Megaphone size={16}/> Propose an event</button></div><div className="flex gap-2 overflow-x-auto pb-1">{filters.map(f=><button key={f} onClick={()=>setEventFilter(f)} className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold ${eventFilter===f?'bg-ink text-white':'border border-slate-100 bg-white text-slate-600'}`}>{f==='All'?'▦ All (18)':f}</button>)}</div><section className="overflow-hidden rounded-3xl bg-ink text-white shadow-soft"><div className="event-hero flex min-h-[220px] flex-col justify-end p-5 sm:p-7"><div className="flex flex-wrap gap-2"><Pill tone="gold">★ FEATURED FLAGSHIP</Pill><Pill tone="green">● Open · Free for Shobhit</Pill></div><p className="mt-5 text-[10px] font-extrabold tracking-widest text-amber-300">36-HOUR NATIONAL HACKATHON & SYMPOSIUM</p><h2 className="mt-1 text-2xl font-extrabold">TECHNO-VANI 2025</h2><p className="mt-2 max-w-xl text-xs leading-5 text-slate-200">Annual inter-university convergence of robotics, AI model deployment, circuit design and innovation.</p><div className="mt-4 flex flex-wrap gap-3 text-xs"><span className="rounded-lg bg-white/10 px-3 py-2"><MapPin size={14} className="mr-1 inline"/> Auditorium & CS Block</span><span className="rounded-lg bg-white/10 px-3 py-2"><Users size={14} className="mr-1 inline"/> 1,240+ Registered</span></div><button onClick={()=>notify('Featured event registration requires a live event service.')} className="mt-4 rounded-xl bg-gold px-5 py-3 text-xs font-extrabold text-ink sm:w-fit">Register Now <ChevronRight size={16} className="ml-1 inline"/></button></div></section><div className="rounded-2xl bg-blue-50 p-4"><div className="flex items-center gap-3"><CalendarDays className="text-brand" size={24}/><div className="flex-1"><b className="block text-sm">6 Events</b><small className="text-xs text-slate-500">Scheduled for this term</small></div><button onClick={()=>notify('Event timeline is a demo feature.')} className="text-xs font-bold text-brand">View timeline ↓</button></div></div><section><SectionTitle title="Upcoming Campus Events" subtitle={`${filteredEvents.length} events in this view`}/><div className="space-y-3">{filteredEvents.length?filteredEvents.map(e=><article key={e.title} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-soft"><div className="flex gap-3"><div className="flex w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-blue-50 py-2 text-brand"><b className="text-xl">{e.day}</b><span className="text-[10px] font-extrabold">{e.month}</span><span className="text-[9px]">{e.weekday}</span></div><div className="min-w-0 flex-1"><div className="flex flex-wrap gap-2"><Pill tone={e.color}>{e.tag}</Pill>{e.tag==='Guest Lecture'&&<Pill tone="rose">Limited seats</Pill>}</div><h3 className="mt-2 font-extrabold">{e.title}</h3><p className="mt-1 text-xs text-slate-500">{e.info}</p><div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-[10px] text-slate-500"><span><MapPin size={12} className="mr-1 inline"/>{e.place}</span><span><Clock3 size={12} className="mr-1 inline"/>{e.time}</span></div></div></div><div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3"><span className="text-[10px] text-slate-500">Details and availability may change</span><button onClick={()=>{if(registered.includes(e.title)){setRegistered(registered.filter(x=>x!==e.title));notify('Demo registration removed.')}else{setRegistered([...registered,e.title]);notify('Demo registration saved in this session.')}}} className={`rounded-lg px-4 py-2.5 text-xs font-bold ${registered.includes(e.title)?'bg-emerald-100 text-emerald-800':'bg-ink text-white'}`}>{registered.includes(e.title)?'✓ Registered':e.button}</button></div></article>):<Empty title="No events found" desc="Try another category or search term."/>}</div></section><section className="rounded-2xl bg-gradient-to-r from-ink to-slate-700 p-5 text-white sm:flex sm:items-center sm:justify-between"><div><h3 className="text-lg font-extrabold">Lead a Campus Activity?</h3><p className="mt-1 text-xs text-slate-300">Share your idea with the student organizing council.</p></div><button onClick={()=>notify('Event proposal needs approval from the university.')} className="mt-4 rounded-xl bg-white px-4 py-3 text-xs font-bold text-ink sm:mt-0">Propose an Event</button></section></div>
}
function Fees({notify}) {
  return <div className="space-y-6"><PageIntro eyebrow="STUDENT ACCOUNTS" title="Fees & payments" desc="Review fee details and past receipts."/><section className="rounded-3xl border border-slate-100 bg-white p-5 shadow-soft sm:p-7"><div className="flex flex-wrap items-start justify-between gap-3"><div><Pill tone="rose">CURRENT ACADEMIC DEMAND</Pill><div className="mt-3 text-3xl font-extrabold text-ink">₹42,500</div><p className="mt-1 text-xs text-slate-500">Sample fee summary · due date shown for demonstration</p></div><Pill tone="rose">Due: Nov 10, 2025</Pill></div><div className="mt-5 rounded-xl bg-blue-50 p-4"><div className="flex items-center gap-2"><Award className="text-amber-600" size={20}/><b className="text-sm">Merit Scholarship Tier 1</b><span className="ml-auto text-xs font-extrabold text-wine">−₹15,000</span></div></div><div className="mt-4 space-y-3 rounded-xl bg-slate-50 p-4"><div className="flex justify-between gap-3 text-xs"><span className="text-slate-500">Semester IV Tuition Fee</span><b>₹35,000</b></div><div className="flex justify-between gap-3 text-xs"><span className="text-slate-500">Mid & End-Term Examination Fee</span><b>₹4,500</b></div><div className="flex justify-between gap-3 text-xs"><span className="text-slate-500">Digital Library & Lab Resource Fund</span><b>₹3,000</b></div></div><button onClick={()=>notify('Online payment is not enabled in this frontend demo. Do not enter payment details.')} className="primary-button mt-5 w-full"><CreditCard size={18}/> Pay ₹42,500 via UPI / NetBanking / Cards</button><p className="mt-3 text-center text-[10px] text-slate-400"><ShieldCheck size={13} className="mr-1 inline"/> Payments require an approved secure university payment gateway.</p></section><section><SectionTitle title="Payment History" subtitle="Showing 3 example receipts"/><div className="space-y-3">{demoFees.map(f=><article key={f.ref} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-soft"><div className="flex flex-wrap items-start justify-between gap-2"><div className="min-w-0 flex-1"><b className="text-sm">{f.title}</b><p className="mt-1 text-xs text-slate-500">{f.date}</p><p className="mt-2 font-mono text-[10px] text-slate-400">REF: {f.ref}</p></div><div className="text-right"><Pill tone="green">Settled</Pill><b className="mt-2 block text-base">{f.amount}</b></div></div><button onClick={()=>notify('Receipt PDF download will work after connecting the payment API.')} className="secondary-button mt-4 w-full sm:ml-auto sm:w-auto"><Download size={15}/> Download PDF Receipt</button></article>)}</div></section><section className="rounded-2xl bg-blue-50 p-5"><div className="flex items-center gap-2"><CircleHelp className="text-wine" size={20}/><h3 className="font-extrabold">Student Accounts & Support Desk</h3></div><p className="mt-2 text-xs leading-5 text-slate-600">For fee clearance, duplicate transactions or challan generation, contact the university accounts office using official contact details.</p><button onClick={()=>notify('Please use the official university website for verified contact details.')} className="secondary-button mt-4"><Mail size={16}/> Contact fee desk</button></section></div>
}
function Profile({formId,role,notify}) {
  return <div className="space-y-6"><PageIntro eyebrow="ACCOUNT SETTINGS" title="My profile" desc="Review your portal profile and account information."/><section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-soft sm:p-7"><div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center"><div className="grid h-16 w-16 place-items-center rounded-2xl bg-ink text-xl font-extrabold text-white">AS</div><div className="flex-1"><h2 className="text-xl font-extrabold">Aarav Sharma</h2><p className="mt-1 text-sm text-slate-500">B.Tech · Computer Science & Engineering</p><div className="mt-2 flex flex-wrap gap-2"><Pill tone="green">Enrolled Active</Pill><Pill>{role}</Pill></div></div><button onClick={()=>notify('Profile editing requires the approved profile API.')} className="secondary-button"><Settings size={15}/> Edit profile</button></div><div className="mt-6 grid gap-4 border-t border-slate-100 pt-5 sm:grid-cols-2"><Info label="University ID" value={formId}/><Info label="Program" value="B.Tech Computer Science"/><Info label="Semester" value="IV · Section A"/><Info label="Academic Year" value="2024–25"/><Info label="University" value="Shobhit University, Gangoh"/><Info label="Account role" value={role}/></div></section><section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-soft"><SectionTitle title="Account & security" subtitle="Keep your portal account secure"/>{[{title:'Password and recovery',desc:'Use the official recovery process.',icon:LockKeyhole},{title:'Login and sessions',desc:'Manage your signed-in account.',icon:ShieldCheck},{title:'Help and support',desc:'Get help with access or profile information.',icon:Headphones}].map(x=><button key={x.title} onClick={()=>notify(`${x.title}: connect to the institutional account service.`)} className="flex w-full items-center gap-3 border-t border-slate-100 py-4 text-left"><span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-brand"><x.icon size={18}/></span><span className="flex-1"><b className="block text-sm">{x.title}</b><small className="mt-1 block text-xs text-slate-500">{x.desc}</small></span><ChevronRight size={17} className="text-slate-400"/></button>)}</section></div>
}
function PageIntro({eyebrow,title,desc}) { return <section><div className="text-[10px] font-extrabold tracking-[.16em] text-brand">{eyebrow}</div><h1 className="mt-2 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">{title}</h1><p className="mt-2 text-sm text-slate-500">{desc}</p></section> }
function Info({label,value}) { return <div className="rounded-xl bg-slate-50 p-3"><div className="text-[10px] font-bold uppercase tracking-wide text-slate-400">{label}</div><div className="mt-1 break-words text-sm font-semibold text-ink">{value}</div></div> }
function Empty({title,desc}) { return <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center"><CalendarDays className="mx-auto text-slate-300" size={28}/><b className="mt-3 block text-sm">{title}</b><p className="mt-1 text-xs text-slate-500">{desc}</p></div> }
function Toast({message}) { return <div aria-live="polite" className={`fixed bottom-20 left-1/2 z-[60] w-max max-w-[90vw] -translate-x-1/2 rounded-xl bg-ink px-4 py-3 text-xs font-semibold text-white shadow-xl transition-all md:bottom-5 ${message?'translate-y-0 opacity-100':'pointer-events-none translate-y-3 opacity-0'}`}>{message}</div> }

export default App
