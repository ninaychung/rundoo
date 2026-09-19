import { useState } from 'react'

const columns = {
  Estimation: ['Not scheduled', 'Scheduled', 'Complete'],
  Order: ['Not ordered', 'Ordered', 'Received'],
  Installation: ['Not scheduled', 'Scheduled', 'In progress', 'Complete'],
}

const flowStages = ['Estimation', 'Order', 'Installation', 'Invoicing']
const workAreas = [
  ['LR', 'Living Room'],
  ['DR', 'Dining Room'],
  ['MBR', 'Main Bedroom'],
  ['BR1', 'Bedroom 1'],
  ['BR2', 'Bedroom 2'],
  ['BR3', 'Bedroom 3'],
  ['FR', 'Family Room'],
  ['Sunroom', 'Sunroom'],
  ['Attic', 'Attic'],
  ['Closet', 'Closet'],
  ['Stairs', 'Stairs'],
  ['Hall', 'Hall'],
  ['Kitchen', 'Kitchen'],
  ['Bath', 'Bath'],
]
const checklistLabels = ['Steps', 'Stringers', 'Metal', 'Padding', 'Cartaway', 'T.K./G.D./L.L.', 'R.P./S.P./C.A.']
const money = (value) => value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })

const installers = [
  { id: 'tony', name: 'Tony Vasquez', type: 'Subcontractor', trade: 'carpet', email: 'tony.vasquez@example.com' },
  { id: 'ray', name: 'Ray Morales', type: 'Subcontractor', trade: 'carpet', email: 'ray.morales@example.com' },
  { id: 'dave', name: 'Dave Kalinowski', type: 'Employee', trade: 'sand & finish', email: 'dave.kalinowski@example.com' },
]

const rateCards = {
  tony: [
    ['Rip up old carpet & pad', 'per ft', 0.75],
    ['Install', 'per ft', 1.65],
    ['Steps', 'each', 18],
    ['Furniture move', 'per room', 45],
    ['Wall base / cove base', 'per ft', 1.75],
    ['Leveler', 'per ft', 2.25],
  ],
  ray: [
    ['Rip up old carpet & pad', 'per ft', 0.8],
    ['Install', 'per ft', 1.7],
    ['Steps', 'each', 20],
    ['Furniture move', 'per room', 50],
    ['Wall base / cove base', 'per ft', 1.85],
    ['Leveler', 'per ft', 2.4],
  ],
  dave: [['Sand & finish', 'per hour', 52]],
}

const seedJobs = [
  job({
    id: 'JOB-5009',
    customer: 'Whitman, J.',
    city: 'Metuchen NJ',
    address: '7 Fairview Ave, Metuchen NJ',
    column: 'Estimation',
    subState: 'Not scheduled',
    material: 'Shaw Secret Adventure',
    areas: ['FR'],
    size: '260 ft',
    amount: 1590,
  }),
  job({
    id: 'JOB-5011',
    customer: 'Andrew Beckman',
    firstName: 'Andrew',
    lastName: 'Beckman',
    city: 'Edison NJ',
    address: '44 Wooding Ave, Edison NJ',
    column: 'Estimation',
    subState: 'Scheduled',
    measureDate: '2026-09-22',
    material: 'Mohawk carpet',
    areas: ['LR', 'DR'],
    size: '310 ft',
    amount: 1960,
  }),
  job({
    id: 'JOB-5006',
    customer: 'Ferraro, D.',
    city: 'Edison NJ',
    address: '21 Grove Ave, Edison NJ',
    column: 'Order',
    subState: 'Ordered',
    eta: '2026-09-25',
    material: 'Mannington LVP',
    areas: ['LR', 'DR'],
    size: '610 ft',
    installerId: 'tony',
    amount: 3785,
  }),
  job({
    id: 'JOB-5007',
    customer: 'Okonkwo, A.',
    city: 'Edison NJ',
    address: '415 Plainfield Rd, Edison NJ',
    column: 'Installation',
    subState: 'Scheduled',
    installDate: '2026-09-24',
    installerId: 'ray',
    material: 'Mohawk carpet',
    areas: ['MBR', 'BR1', 'BR2'],
    size: '385 ft',
    amount: 2450,
  }),
  job({
    id: 'JOB-5005',
    customer: 'Nick Hershey',
    firstName: 'Nick',
    lastName: 'Hershey',
    city: 'Edison NJ',
    address: '34 Runyon Ave, Edison NJ',
    phone: '(732) 988-2347',
    column: 'Installation',
    subState: 'Complete',
    date: '2026-09-17',
    measureDate: '2026-09-17',
    installDate: '2026-09-24',
    installerId: 'tony',
    material: 'Shaw Secret Adventure',
    color: 'Shadow',
    areas: ['Sunroom'],
    size: '240 ft',
    amount: 1612.68,
    instructions: 'Key is in the mailbox',
    checklist: { Steps: false, Stringers: false, Metal: false, Padding: true, Cartaway: true, 'T.K./G.D./L.L.': false, 'R.P./S.P./C.A.': true },
    lineItems: [
      line('Shaw Secret Adventure', 'Shadow', ['Sunroom'], '12 x 20', 240, 5.96),
      { material: 'Take up old carpet + pad', color: '', areas: [], size: '', ydsFt: '', unitPrice: '', amount: 82.08 },
    ],
    totals: { sale: 1512.48, tax: 100.2, delivery: 0, due: 1612.68, deposit: 800, balance: 812.68 },
  }),
  job({
    id: 'JOB-5008',
    customer: 'Greenbrook Apartments Unit 204',
    city: 'Edison NJ',
    address: '1100 Oak Tree Rd, Edison NJ',
    contact: 'Denise Ruiz, Property Manager',
    column: 'Invoicing',
    subState: 'Invoice received',
    completedDate: '2026-09-22',
    installerId: 'ray',
    material: 'Shaw commercial carpet',
    areas: ['LR'],
    size: '495 ft',
    amount: 2980,
    addOns: [{ material: 'Leveler', amount: 140, note: 'Floor uneven - leveler required. Common on vinyl and wood.' }],
  }),
]

function App() {
  const [activeNav, setActiveNav] = useState('Jobs')
  const [view, setView] = useState('Board')
  const [jobs, setJobs] = useState(seedJobs)
  const [draggedId, setDraggedId] = useState(null)
  const [selectedJobId, setSelectedJobId] = useState('JOB-5005')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [drawerExpanded, setDrawerExpanded] = useState(false)
  const [newJobOpen, setNewJobOpen] = useState(false)
  const [newJobExpanded, setNewJobExpanded] = useState(false)
  const [stockOpen, setStockOpen] = useState(false)
  const [sendOpen, setSendOpen] = useState(false)
  const [highlightedId, setHighlightedId] = useState('')
  const [paid, setPaid] = useState(false)
  const [guideOpen, setGuideOpen] = useState(true)
  const [guideStep, setGuideStep] = useState(0)

  const selectedJob = jobs.find((item) => item.id === selectedJobId) ?? jobs[0]

  const updateJob = (jobId, patch) => {
    setJobs((current) => current.map((item) => (item.id === jobId ? { ...item, ...patch } : item)))
  }

  const openJob = (jobId) => {
    setSelectedJobId(jobId)
    setDrawerOpen(true)
    setDrawerExpanded(false)
  }

  const moveJob = (jobId, column) => {
    updateJob(jobId, { column, subState: columns[column][0] })
  }

  const createJob = (newJob) => {
    setJobs((current) => [newJob, ...current])
    setHighlightedId(newJob.id)
    setNewJobOpen(false)
    setTimeout(() => setHighlightedId(''), 1800)
  }

  const guideSteps = [
    {
      title: 'Start with the board',
      body: 'This board is the whole job lifecycle. Jobs move left to right from Estimation to Invoicing.',
      target: 'board',
      action: () => {
        setActiveNav('Jobs')
        setView('Board')
        setDrawerOpen(false)
      },
    },
    {
      title: 'Create a new job',
      body: 'Use + New job to enter the paper work order details. Required fields show a red asterisk.',
      target: 'new-job',
      action: () => {
        setActiveNav('Jobs')
        setView('Board')
        setNewJobOpen(true)
      },
    },
    {
      title: 'Open the hero job',
      body: 'Click a card to open the right-side drawer while keeping the board in view.',
      target: 'hero-card',
      action: () => {
        setNewJobOpen(false)
        openJob('JOB-5005')
      },
    },
    {
      title: 'Advance the stage',
      body: 'Use the toggles inside the drawer to move the job through estimation, order, installation, and invoicing.',
      target: 'drawer',
      action: () => openJob('JOB-5005'),
    },
    {
      title: 'Check stock and price',
      body: 'This opens the dealer-portal style stock lookup and negotiation step.',
      target: 'stock',
      action: () => {
        openJob('JOB-5005')
        setStockOpen(true)
      },
    },
    {
      title: 'Send the work order',
      body: 'The installer copy is emailed and hides the unit price and amount columns.',
      target: 'send',
      action: () => {
        setStockOpen(false)
        openJob('JOB-5005')
        setSendOpen(true)
      },
    },
    {
      title: 'Use the calendar',
      body: 'Calendar shows measure dates, material ETAs, and install dates as separate events.',
      target: 'calendar',
      action: () => {
        setSendOpen(false)
        setDrawerOpen(false)
        setActiveNav('Jobs')
        setView('Calendar')
      },
    },
    {
      title: 'Settle up invoices',
      body: 'Invoices is where the store records the installer invoice, checks exceptions, and queues the check.',
      target: 'invoices',
      action: () => {
        setActiveNav('Invoices')
        setDrawerOpen(false)
      },
    },
  ]

  const activeGuideTarget = guideOpen ? guideSteps[guideStep].target : ''
  const showGuideStep = (nextStep) => {
    const boundedStep = Math.max(0, Math.min(nextStep, guideSteps.length - 1))
    setGuideStep(boundedStep)
    guideSteps[boundedStep].action()
  }

  return (
    <div className="flex min-h-screen bg-[#FAFAFA] text-[#18181B]">
      <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} />
      <div className="min-w-0 flex-1">
        <TopBar title={activeNav} view={view} setView={setView} />
        <main className="px-8 pb-8">
          {activeNav === 'Jobs' && view === 'Board' && (
            <Board
              jobs={jobs}
              draggedId={draggedId}
              setDraggedId={setDraggedId}
              moveJob={moveJob}
              openJob={openJob}
              openNewJob={() => setNewJobOpen(true)}
              highlightedId={highlightedId}
              guideTarget={activeGuideTarget}
            />
          )}
          {activeNav === 'Jobs' && view === 'List' && <ListView jobs={jobs} openJob={openJob} openNewJob={() => setNewJobOpen(true)} />}
          {activeNav === 'Jobs' && view === 'Calendar' && <CalendarView jobs={jobs} openJob={openJob} openNewJob={() => setNewJobOpen(true)} guideTarget={activeGuideTarget} />}
          {activeNav === 'Calendar' && <CalendarView jobs={jobs} openJob={openJob} openNewJob={() => setNewJobOpen(true)} guideTarget={activeGuideTarget} />}
          {activeNav === 'Installers' && <InstallersScreen jobs={jobs} />}
          {activeNav === 'Invoices' && <InvoicesScreen jobs={jobs} paid={paid} setPaid={setPaid} guideTarget={activeGuideTarget} />}
        </main>
      </div>
      {drawerOpen && (
        <JobDrawer
          job={selectedJob}
          expanded={drawerExpanded}
          setExpanded={setDrawerExpanded}
          close={() => setDrawerOpen(false)}
          updateJob={updateJob}
          openStock={() => setStockOpen(true)}
          openSend={() => setSendOpen(true)}
          guideTarget={activeGuideTarget}
        />
      )}
      {newJobOpen && (
        <NewJobModal
          expanded={newJobExpanded}
          setExpanded={setNewJobExpanded}
          close={() => setNewJobOpen(false)}
          createJob={createJob}
        />
      )}
      {stockOpen && <StockModal close={() => setStockOpen(false)} />}
      {sendOpen && (
        <SendWorkOrderModal
          job={selectedJob}
          close={() => setSendOpen(false)}
          send={() => {
            updateJob(selectedJob.id, { column: 'Installation', subState: 'In progress' })
            setSendOpen(false)
          }}
        />
      )}
      {guideOpen ? (
        <DemoGuide
          step={guideStep}
          steps={guideSteps}
          next={() => showGuideStep(guideStep + 1)}
          previous={() => showGuideStep(guideStep - 1)}
          close={() => setGuideOpen(false)}
        />
      ) : (
        <button
          onClick={() => setGuideOpen(true)}
          className="fixed bottom-5 left-[250px] z-50 rounded-md bg-[#1D4ED8] px-4 py-2 text-sm font-semibold text-white"
        >
          Show guide
        </button>
      )}
    </div>
  )
}

function Sidebar({ activeNav, setActiveNav }) {
  const items = ['Jobs', 'Calendar', 'Installers', 'Invoices']
  return (
    <aside className="flex w-[230px] shrink-0 flex-col border-r border-[#E5E7EB] bg-white">
      <div className="flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#18181B] text-sm font-bold text-white">R</div>
          <span className="font-semibold tracking-tight">Rundoo</span>
        </div>
        <button className="h-7 w-7 rounded border border-[#E5E7EB] text-lg leading-none">+</button>
      </div>
      <nav className="flex-1 space-y-1 px-3">
        {items.map((item) => (
          <button
            key={item}
            onClick={() => setActiveNav(item)}
            className={`flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-sm ${
              activeNav === item ? 'bg-[#F1F1F4] font-medium text-[#18181B]' : 'text-[#52525B] hover:bg-[#FAFAFA]'
            }`}
          >
            <Icon name={item} />
            {item}
          </button>
        ))}
      </nav>
      <div className="space-y-1 border-t border-[#E5E7EB] p-3 text-sm text-[#52525B]">
        <button className="flex w-full items-center gap-2 rounded-md px-2.5 py-2"><Icon name="Theme" />Change theme</button>
        <button className="flex w-full items-center gap-2 rounded-md px-2.5 py-2"><Icon name="Logout" />Log out</button>
      </div>
    </aside>
  )
}

function TopBar({ title, view, setView }) {
  return (
    <header className="border-b border-[#E5E7EB] bg-[#FAFAFA] px-8 py-5">
      <div className="flex items-start justify-between">
        <div className="flex items-end gap-5">
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          {title === 'Jobs' && (
            <div className="mb-1 flex gap-4 text-sm font-medium text-[#71717A]">
              {['Board', 'List', 'Calendar'].map((tab) => (
                <button key={tab} onClick={() => setView(tab)} className={view === tab ? 'text-[#18181B]' : ''}>{tab}</button>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-semibold">Michele</p>
            <p className="text-xs text-[#71717A]">CARPET PLACE | Edison</p>
          </div>
          <div className="flex h-9 w-64 items-center justify-between rounded-md border border-[#E5E7EB] bg-white px-3 text-sm text-[#71717A]">
            <span>Search</span>
            <span className="rounded border border-[#E5E7EB] px-1.5 py-0.5 text-xs">⌘K</span>
          </div>
          <button className="rounded-md border border-[#E5E7EB] bg-white px-3 py-2 text-sm font-medium">Support ▾</button>
        </div>
      </div>
      <p className="mt-3 text-right text-sm text-[#71717A]">6 jobs total</p>
    </header>
  )
}

function Board({ jobs, draggedId, setDraggedId, moveJob, openJob, openNewJob, highlightedId, guideTarget }) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <div className="w-[420px] rounded-md border border-[#E5E7EB] bg-white px-3 py-2 text-sm text-[#71717A]">Search jobs</div>
          <button className="rounded-md border border-[#E5E7EB] bg-white px-3 py-2 text-sm font-medium">Sort: Install date ▾</button>
        </div>
        <button onClick={openNewJob} className={`rounded-md bg-[#1D4ED8] px-4 py-2 text-sm font-semibold text-white ${tourRing(guideTarget, 'new-job')}`}>+ New job</button>
      </div>
      <div className={`grid grid-cols-4 gap-4 rounded-md ${tourRing(guideTarget, 'board')}`}>
        {Object.keys(columns).map((column) => {
          const columnJobs = jobs.filter((job) => job.column === column)
          return (
            <div
              key={column}
              onDragOver={(event) => event.preventDefault()}
              onDrop={() => draggedId && moveJob(draggedId, column)}
              className="min-h-[620px] rounded-md border border-[#E5E7EB] bg-white"
            >
              <div className="flex items-center justify-between border-b border-[#E5E7EB] px-3 py-3">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#71717A]">{column}</p>
                <span className="rounded-full bg-[#F1F1F4] px-2 py-0.5 text-xs font-semibold">{columnJobs.length}</span>
              </div>
              <div className="space-y-3 p-3">
                {columnJobs.map((job) => (
                  <JobCard key={job.id} job={job} openJob={openJob} setDraggedId={setDraggedId} highlighted={highlightedId === job.id || (guideTarget === 'hero-card' && job.id === 'JOB-5005')} />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

function JobCard({ job, openJob, setDraggedId, highlighted = false, compact = false, border = 'border-l-[#1D4ED8]' }) {
  const installer = installerFor(job.installerId)
  return (
    <button
      draggable
      onDragStart={() => setDraggedId?.(job.id)}
      onClick={() => openJob(job.id)}
      className={`w-full rounded-md border border-l-[3px] ${border} border-[#E5E7EB] bg-[#EEF2FE] p-3 text-left transition ${
        highlighted ? 'ring-2 ring-[#1D4ED8]' : ''
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <p className="flex items-center gap-2 text-sm font-semibold text-[#1E40AF]"><span className="h-2 w-2 rounded-full bg-[#1D4ED8]" />{job.id}</p>
        <span className="text-[10px] font-semibold uppercase tracking-wide text-[#71717A]">{job.subState}</span>
      </div>
      <p className="mt-2 font-semibold">{job.customer}</p>
      <p className="mt-1 text-xs text-[#71717A]">{job.address}</p>
      <p className="mt-2 text-xs text-[#71717A]">{job.material} · {formatAreas(job.areas)} · {job.size}</p>
      <div className="mt-3 flex items-center justify-between text-xs text-[#71717A]">
        <span>♙ {installer ? installer.name : 'Unassigned'}</span>
        <span>◷ {nextDate(job)}</span>
      </div>
      {!compact && <p className="mt-2 text-right font-bold">{money(job.amount)}</p>}
    </button>
  )
}

function ListView({ jobs, openJob, openNewJob }) {
  return (
    <section className="rounded-md border border-[#E5E7EB] bg-white">
      <div className="flex items-center justify-between border-b border-[#E5E7EB] p-4">
        <div className="flex-1 rounded-md border border-[#E5E7EB] px-3 py-2 text-sm text-[#71717A]">Search jobs</div>
        <button onClick={openNewJob} className="ml-3 rounded-md bg-[#1D4ED8] px-4 py-2 text-sm font-semibold text-white">+ New job</button>
      </div>
      <div className="divide-y divide-[#E5E7EB]">
        {jobs.map((job) => (
          <button key={job.id} onClick={() => openJob(job.id)} className="grid w-full grid-cols-[1fr_1fr_160px] gap-4 px-4 py-4 text-left hover:bg-[#FAFAFA]">
            <div><p className="font-semibold text-[#1E40AF]">{job.id}</p><p className="font-semibold">{job.customer}</p><p className="text-sm text-[#71717A]">{job.address}</p></div>
            <p className="text-sm text-[#71717A]">{job.column} · {job.subState}</p>
            <p className="text-right font-bold">{money(job.amount)}</p>
          </button>
        ))}
      </div>
    </section>
  )
}

function CalendarView({ jobs, openJob, openNewJob, guideTarget }) {
  const days = [
    ['MON', '21'], ['TUE', '22'], ['WED', '23'], ['THU', '24'], ['FRI', '25'], ['SAT', '26'], ['SUN', '27'],
  ]
  const events = calendarEvents(jobs)
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-[#71717A]">
          <span>‹</span><button className="rounded border border-[#E5E7EB] bg-white px-3 py-2 font-medium text-[#18181B]">Today</button><span>›</span>
          <span className="ml-2 font-medium text-[#18181B]">Sep 21 – 27, 2026</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="rounded-md border border-[#E5E7EB] bg-white p-1 text-sm"><button className="rounded bg-[#F1F1F4] px-3 py-1.5">Week</button><button className="px-3 py-1.5 text-[#71717A]">Month</button></div>
          <button onClick={openNewJob} className="rounded-md bg-[#1D4ED8] px-4 py-2 text-sm font-semibold text-white">+ New job</button>
        </div>
      </div>
      <div className={`grid min-h-[660px] grid-cols-7 rounded-md border border-[#E5E7EB] bg-white ${tourRing(guideTarget, 'calendar')}`}>
        {days.map(([day, date]) => (
          <div key={date} className={`border-r border-[#E5E7EB] p-3 last:border-r-0 ${date === '24' ? 'bg-[#EEF2FE]/60' : ''}`}>
            <div className="mb-3 text-center">
              <p className="text-xs font-semibold text-[#71717A]">{day}</p>
              <p className={`mx-auto mt-1 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${date === '24' ? 'bg-[#1D4ED8] text-white' : ''}`}>{date}</p>
            </div>
            <div className="space-y-2">
              {events.filter((event) => event.day === date).map((event) => (
                <JobCard key={`${event.job.id}-${event.type}`} job={event.job} openJob={openJob} compact border={event.border} />
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="text-sm text-[#71717A]"><span className="text-green-700">Green</span> Measure · <span className="text-[#1D4ED8]">Blue</span> Install · <span className="text-amber-700">Amber</span> Material ETA</p>
    </section>
  )
}

function NewJobModal({ expanded, setExpanded, close, createJob }) {
  const [form, setForm] = useState(newJobForm())
  const [touched, setTouched] = useState({})
  const required = ['lastName', 'firstName', 'address', 'cityState', 'phone', 'date']
  const missing = required.filter((field) => !String(form[field]).trim())
  const submit = () => {
    setTouched(Object.fromEntries(required.map((field) => [field, true])))
    if (missing.length) return
    const id = `JOB-${5000 + Math.floor(Math.random() * 900)}`
    createJob(job({
      id,
      customer: `${form.lastName}, ${form.firstName}`,
      firstName: form.firstName,
      lastName: form.lastName,
      address: form.address,
      city: form.cityState,
      phone: form.phone,
      column: 'Estimation',
      subState: 'Not scheduled',
      date: form.date,
      measureDate: form.measureDate,
      installDate: form.installDate,
      installerId: '',
      salesperson: form.salesperson,
      material: form.lines[0].material || 'Draft material',
      areas: form.lines[0].areas,
      size: `${form.lines[0].ydsFt || 0} ft`,
      amount: saleTotal(form.lines),
      lineItems: form.lines,
      checklist: form.checklist,
      instructions: form.instructions,
      totals: totalsFor(form.lines, form.deposit, form.delivery),
    }))
  }
  return (
    <Modal expanded={expanded} wide>
      <ModalHeader title="New job" expanded={expanded} setExpanded={setExpanded} />
      <div className="grid grid-cols-2 gap-4">
        <TextInput label="Customer last name" required field="lastName" form={form} setForm={setForm} touched={touched} setTouched={setTouched} />
        <TextInput label="Customer first name" required field="firstName" form={form} setForm={setForm} touched={touched} setTouched={setTouched} />
        <TextInput label="Address" required field="address" form={form} setForm={setForm} touched={touched} setTouched={setTouched} />
        <TextInput label="City, State" required field="cityState" form={form} setForm={setForm} touched={touched} setTouched={setTouched} />
        <TextInput label="Phone" required field="phone" form={form} setForm={setForm} touched={touched} setTouched={setTouched} />
        <TextInput label="Date" required type="date" field="date" form={form} setForm={setForm} touched={touched} setTouched={setTouched} />
      </div>
      <Divider label="Job details" />
      <div className="grid grid-cols-3 gap-4">
        {['apt', 'zip', 'businessPhone', 'measureDate', 'installDate', 'salesperson'].map((field) => (
          <TextInput key={field} label={labelFor(field)} field={field} type={field.includes('Date') ? 'date' : 'text'} form={form} setForm={setForm} touched={touched} setTouched={setTouched} />
        ))}
      </div>
      <EditableLines lines={form.lines} setLines={(lines) => setForm({ ...form, lines })} />
      <EditableChecklist checklist={form.checklist} setChecklist={(checklist) => setForm({ ...form, checklist })} />
      <textarea value={form.instructions} onChange={(event) => setForm({ ...form, instructions: event.target.value })} placeholder="Key is in the mailbox" className="mt-4 h-24 w-full resize-none rounded-md border border-[#E5E7EB] p-3" />
      <Totals totals={totalsFor(form.lines, form.deposit, form.delivery)} />
      <div className="mt-5 flex justify-end gap-2">
        <button onClick={close} className="rounded-md border border-[#E5E7EB] bg-white px-4 py-2 font-semibold">Cancel</button>
        <button onClick={submit} className="rounded-md bg-[#1D4ED8] px-4 py-2 font-semibold text-white">Create job</button>
      </div>
    </Modal>
  )
}

function JobDrawer({ job, expanded, setExpanded, close, updateJob, openStock, openSend, guideTarget }) {
  const [localInstructions, setLocalInstructions] = useState(job.instructions)
  const setLineItems = (lineItems) => updateJob(job.id, { lineItems, amount: saleTotal(lineItems), totals: totalsFor(lineItems, job.totals.deposit, job.totals.delivery) })
  return (
    <div className="fixed inset-0 z-40 flex justify-end bg-black/20">
      <aside className={`${expanded ? 'w-full' : 'w-[560px]'} flex h-full flex-col border-l border-[#E5E7EB] bg-white ${tourRing(guideTarget, 'drawer')}`}>
        <div className="flex items-start justify-between border-b border-[#E5E7EB] p-4">
          <div><p className="font-semibold text-[#1E40AF]">{job.id}</p><h2 className="text-xl font-bold">{job.customer}</h2><StatusPill label={`${job.column} / ${job.subState}`} /></div>
          <div className="flex gap-2"><button onClick={() => setExpanded(!expanded)} className="rounded border border-[#E5E7EB] px-2 py-1">⤢</button><button onClick={close} className="rounded border border-[#E5E7EB] px-2 py-1">X</button></div>
        </div>
        <div className="flex-1 space-y-5 overflow-auto p-4">
          <CompactStageTracker current={job.column} />
          <DrawerSection id="estimation" title="Estimation">
            <FieldSelect label="Who measured" value={job.measuredBy} options={['Shariq', 'Michele', 'Carlos']} onChange={(value) => updateJob(job.id, { measuredBy: value })} />
            <FieldDate label="Date of measure" value={job.measureDate} onChange={(value) => updateJob(job.id, { measureDate: value })} />
            <Toggle label="Estimation complete" checked={job.column !== 'Estimation'} onChange={() => updateJob(job.id, { column: 'Order', subState: 'Not ordered' })} />
          </DrawerSection>
          <DrawerSection id="order" title="Order">
            <button onClick={openStock} className={`rounded-md bg-[#1D4ED8] px-3 py-2 text-sm font-semibold text-white ${tourRing(guideTarget, 'stock')}`}>Check stock & price</button>
            <div className="mt-3 grid grid-cols-3 gap-3">
              <FieldDate label="Ordered date" value={job.orderedDate} onChange={(value) => updateJob(job.id, { orderedDate: value })} />
              <FieldText label="Supplier" value={job.supplier} onChange={(value) => updateJob(job.id, { supplier: value })} />
              <FieldDate label="ETA" value={job.eta} onChange={(value) => updateJob(job.id, { eta: value })} />
            </div>
            <Toggle label="Material received" checked={job.column === 'Installation' || job.column === 'Invoicing'} onChange={() => updateJob(job.id, { column: 'Installation', subState: 'Not scheduled' })} />
          </DrawerSection>
          <DrawerSection id="installation" title="Installation">
            <FieldSelect label="Installer" value={job.installerId} options={installers.map((installer) => installer.id)} labels={Object.fromEntries(installers.map((installer) => [installer.id, installer.name]))} onChange={(value) => updateJob(job.id, { installerId: value })} />
            <FieldDate label="Install date" value={job.installDate} onChange={(value) => updateJob(job.id, { installDate: value })} />
            <button onClick={openSend} className={`mt-3 rounded-md border border-[#E5E7EB] bg-white px-3 py-2 text-sm font-semibold ${tourRing(guideTarget, 'send')}`}>Send work order</button>
            <div className="mt-3 flex flex-wrap gap-2">{columns.Installation.map((state) => <button key={state} onClick={() => updateJob(job.id, { column: 'Installation', subState: state })} className={`rounded-full border px-3 py-1 text-sm ${job.subState === state && job.column === 'Installation' ? 'border-blue-200 bg-blue-50 text-[#1E40AF]' : 'border-[#E5E7EB] text-[#71717A]'}`}>{state}</button>)}</div>
          </DrawerSection>
          <EditableLines lines={job.lineItems} setLines={setLineItems} />
          <div className="grid grid-cols-2 gap-4">
            <DrawerSection title="Work order details">
              <ChecklistControls checklist={job.checklist} setChecklist={(checklist) => updateJob(job.id, { checklist })} />
            </DrawerSection>
            <DrawerSection title="Additional directions">
              <textarea
                value={localInstructions}
                onChange={(event) => { setLocalInstructions(event.target.value); updateJob(job.id, { instructions: event.target.value }) }}
                className="h-48 w-full resize-none rounded-md border border-[#E5E7EB] p-3"
                placeholder="Key is in the mailbox"
              />
            </DrawerSection>
          </div>
          <DrawerSection title="Payment">
            <div className="grid grid-cols-2 gap-3"><FieldText label="Initial deposit" value={job.totals.deposit} onChange={(value) => updateJob(job.id, { totals: { ...job.totals, deposit: Number(value), balance: job.totals.due - Number(value) } })} /><FieldText label="Balance" value={job.totals.balance} onChange={(value) => updateJob(job.id, { totals: { ...job.totals, balance: Number(value) } })} /></div>
            <div className="mt-3 flex flex-wrap gap-2">
              <button className="rounded-md bg-[#1D4ED8] px-3 py-2 text-sm font-semibold text-white">Ring up order</button>
              <label className="flex items-center gap-2 rounded-md border border-[#E5E7EB] bg-white px-3 py-2 text-sm font-semibold">
                <input type="checkbox" checked={job.paymentMethod === 'check'} onChange={() => updateJob(job.id, { paymentMethod: job.paymentMethod === 'check' ? '' : 'check' })} />
                Customer paid by check
              </label>
              <label className="flex items-center gap-2 rounded-md border border-[#E5E7EB] bg-white px-3 py-2 text-sm font-semibold">
                <input type="checkbox" checked={job.paymentMethod === 'cash'} onChange={() => updateJob(job.id, { paymentMethod: job.paymentMethod === 'cash' ? '' : 'cash' })} />
                Customer paid by cash
              </label>
            </div>
          </DrawerSection>
        </div>
        <div className="flex justify-between border-t border-[#E5E7EB] bg-white p-4"><button className="text-sm font-semibold text-[#71717A]">Delete</button><button onClick={close} className="rounded-md bg-[#1D4ED8] px-4 py-2 font-semibold text-white">Save</button></div>
      </aside>
    </div>
  )
}

function EditableLines({ lines, setLines }) {
  const update = (index, patch) => setLines(lines.map((lineItem, itemIndex) => itemIndex === index ? { ...lineItem, ...patch, amount: calcAmount({ ...lineItem, ...patch }) } : lineItem))
  return (
    <div className="mt-5">
      <div className="mb-2 flex items-center justify-between"><p className="text-sm font-semibold">Line items</p><button onClick={() => setLines([...lines, emptyLine()])} className="text-sm font-semibold text-[#1E40AF]">+ Add line</button></div>
      <table className="w-full text-left text-sm">
        <thead className="border-y border-[#E5E7EB] bg-[#FAFAFA] text-xs uppercase text-[#71717A]"><tr>{['Material description', 'Color', 'Work areas', 'Size', 'Yds ft', 'Unit price', 'Amount'].map((head) => <th key={head} className="px-2 py-2">{head}</th>)}</tr></thead>
        <tbody>{lines.map((lineItem, index) => <tr key={index} className="border-b border-[#E5E7EB]">
          <td className="px-2 py-2"><input value={lineItem.material} onChange={(event) => update(index, { material: event.target.value })} className="w-full rounded border border-[#E5E7EB] px-2 py-1" /></td>
          <td className="px-2 py-2"><input value={lineItem.color} onChange={(event) => update(index, { color: event.target.value })} className="w-full rounded border border-[#E5E7EB] px-2 py-1" /></td>
          <td className="px-2 py-2"><select multiple value={lineItem.areas} onChange={(event) => update(index, { areas: [...event.target.selectedOptions].map((option) => option.value) })} className="h-16 w-full rounded border border-[#E5E7EB] px-2 py-1">{workAreas.map(([code, name]) => <option key={code} value={code}>{name === code ? name : `${name} (${code})`}</option>)}</select></td>
          <td className="px-2 py-2"><input value={lineItem.size} onChange={(event) => update(index, { size: event.target.value })} className="w-24 rounded border border-[#E5E7EB] px-2 py-1" /></td>
          <td className="px-2 py-2"><input value={lineItem.ydsFt} onChange={(event) => update(index, { ydsFt: event.target.value })} className="w-20 rounded border border-[#E5E7EB] px-2 py-1" /></td>
          <td className="px-2 py-2"><input value={lineItem.unitPrice} onChange={(event) => update(index, { unitPrice: event.target.value })} className="w-20 rounded border border-[#E5E7EB] px-2 py-1" /></td>
          <td className="px-2 py-2 font-semibold">{money(Number(lineItem.amount) || 0)}</td>
        </tr>)}</tbody>
      </table>
    </div>
  )
}

function EditableChecklist({ checklist, setChecklist }) {
  return (
    <div className="mt-5">
      <p className="mb-2 text-sm font-semibold">Work order details</p>
      <ChecklistControls checklist={checklist} setChecklist={setChecklist} />
    </div>
  )
}

function ChecklistControls({ checklist, setChecklist }) {
  return (
    <div className="grid grid-cols-1 gap-2">
      {checklistLabels.map((label) => (
        <MiniToggle
          key={label}
          label={label}
          checked={checklist[label]}
          onChange={() => setChecklist({ ...checklist, [label]: !checklist[label] })}
        />
      ))}
    </div>
  )
}

function StockModal({ close }) {
  const [checked, setChecked] = useState(false)
  const [discount, setDiscount] = useState(0.12)
  return (
    <Modal wide>
      <ModalHeader title="Check stock & price" />
      <p className="mt-2 text-sm text-[#71717A]">Live from Dixie Group / Masland - account 152047 CARPET PLACE INC.</p>
      <div className="mt-5 flex gap-2"><button className="rounded-md bg-[#1D4ED8] px-3 py-2 text-sm font-semibold text-white">Broadloom Carpet</button><button className="rounded-md border border-[#E5E7EB] px-3 py-2 text-sm font-semibold">Hard Surface</button></div>
      <div className="mt-4 grid grid-cols-2 gap-4"><FieldText label="Style" value="BUENA VIDA - 9680" readOnly /><FieldText label="Color" value="BOTA-00857" readOnly /></div>
      <div className="mt-4 grid grid-cols-2 gap-3 rounded-md border border-[#E5E7EB] bg-[#FAFAFA] p-4 text-sm">{[['Width', '12 ft'], ['Pattern repeat', '18.00 in x 18.00 in'], ['Fiber', 'NYLON 66'], ['Unit price', '$27.49 / sy']].map(([label, value]) => <Spec key={label} label={label} value={value} />)}</div>
      <button onClick={() => setChecked(true)} className="mt-4 rounded-md bg-[#1D4ED8] px-4 py-2 text-sm font-semibold text-white">Check Stock & Reserve</button>
      {checked && <p className="mt-3 rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm font-semibold text-green-700">In stock - 3 rolls, ETA Sep 24</p>}
      <div className="mt-5 rounded-md border border-[#E5E7EB] p-4"><div className="flex items-center justify-between"><p className="font-semibold">Quoted $5.96/ft</p><div className="flex items-center gap-2"><button onClick={() => setDiscount(Math.max(0, discount - 0.03))} className="h-8 w-8 rounded border border-[#E5E7EB]">-</button><span className="w-20 text-center text-sm">{money(discount)} off</span><button onClick={() => setDiscount(discount + 0.03)} className="h-8 w-8 rounded border border-[#E5E7EB]">+</button></div></div><p className="mt-2 text-sm text-[#71717A]">Resulting margin {Math.round(((5.96 - discount - 4.12) / (5.96 - discount)) * 100)}%. Negotiated on ~90% of jobs.</p></div>
      <ModalFooter close={close} action={close} actionLabel="Add to job" />
    </Modal>
  )
}

function SendWorkOrderModal({ job, close, send }) {
  const installer = installerFor(job.installerId)
  return (
    <Modal wide>
      <ModalHeader title="Send work order" />
      <p className="mt-2 text-sm text-[#71717A]">Emailed to the installer. Previously sent by text.</p>
      <FieldText label="To" value={installer?.email || ''} readOnly />
      <div className="mt-4 max-h-[430px] overflow-auto rounded-md border border-[#E5E7EB] p-4"><PaperHeader job={job} /><WorkOrderTable job={job} hidePrices /></div>
      <label className="mt-4 block text-sm font-semibold">Optional note<textarea className="mt-1 h-20 w-full resize-none rounded-md border border-[#E5E7EB] p-3 font-normal" defaultValue="Remember: upgraded padding on this one" /></label>
      <ModalFooter close={close} action={send} actionLabel="Send work order" />
    </Modal>
  )
}

function InstallersScreen({ jobs }) {
  const [selectedId, setSelectedId] = useState('tony')
  const selected = installerFor(selectedId)
  const installerJobs = jobs.filter((job) => job.installerId === selectedId)
  return (
    <div className="grid grid-cols-[300px_1fr] gap-5">
      <section className="rounded-md border border-[#E5E7EB] bg-white p-3"><h2 className="px-2 pb-1 font-semibold">Installers</h2><p className="px-2 pb-3 text-sm text-[#71717A]">Installers are subcontractors, but long-tenured - 3-4 years on average.</p>{installers.map((installer) => <button key={installer.id} onClick={() => setSelectedId(installer.id)} className={`mb-1 w-full rounded-md px-3 py-3 text-left ${selectedId === installer.id ? 'bg-[#F1F1F4]' : 'hover:bg-[#FAFAFA]'}`}><p className="font-semibold">{installer.name}</p><p className="text-sm text-[#71717A]">{installer.type} · {installer.trade}</p></button>)}</section>
      <section className="rounded-md border border-[#E5E7EB] bg-white"><div className="border-b border-[#E5E7EB] p-4"><h2 className="font-semibold">{selected.name}</h2><p className="text-sm text-[#71717A]">{selected.type} · {selected.email}</p></div><div className="grid grid-cols-[1fr_340px] gap-5 p-4"><div><table className="w-full text-left text-sm"><thead className="border-b border-[#E5E7EB] text-xs uppercase text-[#71717A]"><tr><th className="py-2">Task</th><th>Unit</th><th>Rate</th></tr></thead><tbody>{rateCards[selectedId].map(([task, unit, rate]) => <tr key={task} className="border-b border-[#E5E7EB] last:border-0"><td className="py-2">{task}</td><td>{unit}</td><td><input defaultValue={rate.toFixed(2)} className="w-24 rounded-md border border-[#E5E7EB] px-2 py-1" /></td></tr>)}</tbody></table><p className="mt-4 rounded-md border border-[#E5E7EB] bg-[#FAFAFA] p-3 text-sm text-[#71717A]">Carpet Place supplies flooring, wall base, transition strips, glue and pads. The installer supplies everything else.</p></div><div className="space-y-4"><MiniList title="Recent jobs" items={installerJobs.map((job) => `${job.id} · ${job.customer} · ${job.subState}`)} /><MiniList title="Past invoices" items={selected.type === 'Employee' ? ['Employee - paid through payroll'] : ['INV-4411 · Sep 15-19 · Paid', 'INV-4417 · Sep 22-26 · Received']} /></div></div></section>
    </div>
  )
}

function InvoicesScreen({ jobs, paid, setPaid, guideTarget }) {
  const completed = jobs.filter((job) => job.column === 'Invoicing' || job.subState === 'Complete')
  const greenbrook = jobs.find((job) => job.id === 'JOB-5008')
  return (
    <div className={`grid grid-cols-[1fr_360px] gap-5 rounded-md ${tourRing(guideTarget, 'invoices')}`}>
      <section className="rounded-md border border-[#E5E7EB] bg-white"><div className="border-b border-[#E5E7EB] p-4"><h2 className="font-semibold">Ray Morales · Sep 21-26</h2><p className="mt-1 text-sm text-[#71717A]">Invoice received Sep 26. The installer typed it up and sent it in weekly.</p>{paid && <p className="mt-3 rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm font-semibold text-green-700">Check #4417 queued - $1,980.00 to Tony Vasquez</p>}</div><div className="space-y-5 p-4"><div className="rounded-md border border-[#E5E7EB]"><div className="border-b border-[#E5E7EB] bg-[#FAFAFA] px-4 py-3"><p className="font-semibold">{greenbrook.customer} <span className="font-normal text-[#71717A]">· Completed Sep 22</span></p><p className="text-sm text-[#71717A]">{greenbrook.address}</p></div><table className="w-full text-left text-sm"><thead className="border-b border-[#E5E7EB] text-xs uppercase text-[#71717A]"><tr>{['Task', 'Work order', 'Invoiced', 'Rate', 'Amount'].map((head) => <th key={head} className="px-4 py-2 font-semibold">{head}</th>)}</tr></thead><tbody>{[['Install', '495 ft', '495 ft', '$1.70/ft', 841.5], ['Rip up old carpet & pad', '495 ft', '495 ft', '$0.80/ft', 396], ['Wall base / cove base', '75 ft', '75 ft', '$1.85/ft', 138.5], ['Leveler', '0 ft', '58 ft', '$2.40/ft', 140, true]].map(([task, workOrder, invoiced, rate, amount, added]) => <tr key={task} className={`border-b border-[#E5E7EB] last:border-0 ${added ? 'bg-[#FEF3C7] text-[#B45309]' : ''}`}><td className="px-4 py-2">{task}{added && <span className="ml-2 rounded bg-white/70 px-2 py-1 text-xs font-semibold">Added on site</span>}{added && <p className="mt-1 text-xs">Floor uneven - leveler required. Common on vinyl and wood.</p>}</td><td className="px-4 py-2">{workOrder}</td><td className="px-4 py-2 font-semibold">{invoiced}</td><td className="px-4 py-2">{rate}</td><td className="px-4 py-2 font-semibold">{money(amount)}</td></tr>)}</tbody></table></div><div className="rounded-md border border-[#E5E7EB] bg-[#FAFAFA] p-4 font-semibold">Work orders $1,840.00 · Invoiced $1,980.00 · Difference $140.00</div><div className="flex justify-end gap-2"><button className="rounded-md border border-[#E5E7EB] bg-white px-4 py-2 font-semibold">Query line</button><button onClick={() => setPaid(true)} className="rounded-md bg-[#1D4ED8] px-4 py-2 font-semibold text-white">Approve & pay by check</button></div></div></section>
      <aside className="rounded-md border border-[#E5E7EB] bg-white"><div className="border-b border-[#E5E7EB] p-4"><div className="flex items-center gap-2"><Icon name="Awaiting" /><h2 className="font-semibold">Awaiting invoice</h2></div><p className="mt-1 text-sm text-[#71717A]">5 completed jobs not yet invoiced.</p><div className="mt-3 rounded-md border border-[#E5E7EB] px-3 py-2 text-sm text-[#71717A]">Search</div><div className="mt-3 flex items-center justify-between text-sm"><label className="flex items-center gap-2 text-[#71717A]"><input type="checkbox" /> Select all</label><button className="rounded border border-[#E5E7EB] px-2 py-1">Completed: oldest ▾</button></div></div><div className="divide-y divide-[#E5E7EB]">{completed.map((job) => <div key={job.id} className="p-4 text-sm"><p className="font-semibold text-[#1E40AF]">{job.id} ↗ <span className="ml-2 text-[#18181B]">{job.customer}</span></p><p className="mt-2 font-semibold">◷ Completed {displayDate(job.completedDate || job.installDate)}</p><p className="mt-1 text-[#52525B]">⌖ {job.address}</p><p className="mt-1 text-[#52525B]">♙ {installerFor(job.installerId)?.name || 'Unassigned'}</p><p className="mt-2 text-[#71717A]">{job.size} · {job.lineItems.length} line items · {money(job.amount)}</p></div>)}</div></aside>
    </div>
  )
}

function PaperHeader({ job }) {
  return <div className="mb-4 grid grid-cols-2 gap-4 rounded-md border border-[#E5E7EB] bg-[#FAFAFA] p-4 text-sm"><div className="grid grid-cols-2 gap-x-4 gap-y-2"><Spec label="Customer last name" value={job.lastName} /><Spec label="First name" value={job.firstName} /><Spec label="Address" value={job.address} /><Spec label="Apt #" value={job.apt || '-'} /><Spec label="City, State / Zip" value={job.city} /><Spec label="Phone" value={job.phone} /><Spec label="B. Phone" value={job.businessPhone || '-'} /></div><div className="grid grid-cols-2 gap-x-4 gap-y-2"><Spec label="Date" value={displayDate(job.date)} /><Spec label="Date of measure" value={displayDate(job.measureDate)} /><Spec label="Date of installation" value={displayDate(job.installDate)} /><Spec label="Salesperson" value={job.salesperson} /></div></div>
}

function WorkOrderTable({ job, hidePrices = false }) {
  return <table className="w-full text-left text-sm"><thead className="border-y border-[#E5E7EB] bg-[#FAFAFA] text-xs uppercase text-[#71717A]"><tr>{['Material description', 'Color', 'Work areas', 'Size', 'Yds ft'].map((head) => <th key={head} className="px-3 py-2">{head}</th>)}{!hidePrices && <th className="px-3 py-2">Unit price</th>}{!hidePrices && <th className="px-3 py-2 text-right">Amount</th>}</tr></thead><tbody>{job.lineItems.map((item) => <tr key={item.material} className="border-b border-[#E5E7EB]"><td className="px-3 py-3 font-medium">{item.material}</td><td className="px-3 py-3">{item.color}</td><td className="px-3 py-3"><span title="LR living room · DR dining room · MBR main bedroom · BR1 bedroom 1 · BR2 bedroom 2 · FR family room">{formatAreas(item.areas)}</span></td><td className="px-3 py-3">{item.size}</td><td className="px-3 py-3">{item.ydsFt}</td>{!hidePrices && <td className="px-3 py-3">{item.unitPrice ? money(Number(item.unitPrice)) : ''}</td>}{!hidePrices && <td className="px-3 py-3 text-right font-semibold">{money(Number(item.amount) || 0)}</td>}</tr>)}</tbody></table>
}

function Modal({ children, wide = false, expanded = false }) {
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-8"><section className={`${expanded ? 'h-full w-full' : wide ? 'w-[720px]' : 'w-[560px]'} max-h-full overflow-auto rounded-md border border-[#E5E7EB] bg-white p-5 shadow-lg`}>{children}</section></div>
}

function ModalHeader({ title, expanded, setExpanded }) {
  return <div className="mb-4 flex items-center justify-between"><div className="flex items-center gap-2"><Icon name={title} /><h2 className="text-xl font-bold">{title}</h2></div>{setExpanded && <button onClick={() => setExpanded(!expanded)} className="rounded border border-[#E5E7EB] px-2 py-1">⤢</button>}</div>
}

function ModalFooter({ close, action, actionLabel }) {
  return <div className="mt-6 flex justify-end gap-2"><button onClick={close} className="rounded-md border border-[#E5E7EB] bg-white px-4 py-2 font-semibold">Cancel</button><button onClick={action} className="rounded-md bg-[#1D4ED8] px-4 py-2 font-semibold text-white">{actionLabel}</button></div>
}

function TextInput({ label, field, form, setForm, required = false, type = 'text', touched, setTouched }) {
  const invalid = required && touched[field] && !String(form[field]).trim()
  return <label className="text-sm font-semibold">{label} {required && <span className="text-red-600">*</span>}<input type={type} value={form[field]} onBlur={() => setTouched({ ...touched, [field]: true })} onChange={(event) => setForm({ ...form, [field]: event.target.value })} className={`mt-1 w-full rounded-md border px-3 py-2 font-normal ${invalid ? 'border-red-500' : 'border-[#E5E7EB]'}`} />{invalid && <p className="mt-1 text-xs text-red-600">Required</p>}</label>
}

function FieldText({ label, value, onChange, readOnly = false }) {
  return <label className="block text-sm font-semibold">{label}<input readOnly={readOnly} value={value ?? ''} onChange={(event) => onChange?.(event.target.value)} className="mt-1 w-full rounded-md border border-[#E5E7EB] px-3 py-2 font-normal" /></label>
}

function FieldDate({ label, value, onChange }) {
  return <label className="block text-sm font-semibold">{label}<input type="date" value={value || ''} onChange={(event) => onChange(event.target.value)} className="mt-1 w-full rounded-md border border-[#E5E7EB] px-3 py-2 font-normal" /></label>
}

function FieldSelect({ label, value, options, labels = {}, onChange }) {
  return <label className="block text-sm font-semibold">{label}<select value={value || ''} onChange={(event) => onChange(event.target.value)} className="mt-1 w-full rounded-md border border-[#E5E7EB] bg-white px-3 py-2 font-normal"><option value="">Unassigned</option>{options.map((option) => <option key={option} value={option}>{labels[option] || option}</option>)}</select></label>
}

function Toggle({ label, checked, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className="mt-3 flex w-full items-center justify-between rounded-md border border-[#E5E7EB] bg-white px-3 py-2 text-sm font-semibold"
    >
      <span>{label}</span>
      <span className="flex items-center gap-2">
        <span className={checked ? 'text-[#1E40AF]' : 'text-[#71717A]'}>{checked ? 'Yes' : 'No'}</span>
        <span className={`flex h-6 w-11 items-center rounded-full p-0.5 transition ${checked ? 'bg-[#1D4ED8]' : 'bg-[#D4D4D8]'}`}>
          <span className={`h-5 w-5 rounded-full bg-white transition ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
        </span>
      </span>
    </button>
  )
}

function MiniToggle({ label, checked, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className="flex items-center justify-between rounded-md border border-[#E5E7EB] bg-white px-3 py-2 text-left text-sm font-medium"
    >
      <span>{label}</span>
      <span className="flex items-center gap-2">
        <span className={checked ? 'text-[#1E40AF]' : 'text-[#71717A]'}>{checked ? 'Yes' : 'No'}</span>
        <span className={`flex h-5 w-9 items-center rounded-full p-0.5 transition ${checked ? 'bg-[#1D4ED8]' : 'bg-[#D4D4D8]'}`}>
          <span className={`h-4 w-4 rounded-full bg-white transition ${checked ? 'translate-x-4' : 'translate-x-0'}`} />
        </span>
      </span>
    </button>
  )
}

function DrawerSection({ id, title, children }) {
  return <section id={id} className="rounded-md border border-[#E5E7EB] p-4"><h3 className="mb-3 text-sm font-bold uppercase tracking-[0.14em] text-[#71717A]">{title}</h3>{children}</section>
}

function CompactStageTracker({ current }) {
  const stages = flowStages
  const currentIndex = stageIndex(current)
  const progress = `${(currentIndex / (stages.length - 1)) * 100}%`
  return (
    <div className="rounded-md border border-[#E5E7EB] bg-[#FAFAFA] p-4">
      <div className="relative">
        <div className="absolute left-0 right-0 top-4 h-2 rounded-full bg-[#E5E7EB]" />
        <div
          className="absolute left-0 top-4 h-2 rounded-full bg-gradient-to-r from-[#1D4ED8] to-[#93C5FD]"
          style={{ width: progress }}
        />
        <div className="relative grid grid-cols-4 gap-2">
          {stages.map((stage, index) => {
            const complete = index < currentIndex
            const active = index === currentIndex
            return (
              <button
                key={stage}
                onClick={() => document.getElementById(stage.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}
                className="flex flex-col items-center gap-2 text-center"
              >
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold ${
                    complete
                      ? 'border-[#1D4ED8] bg-[#1D4ED8] text-white'
                      : active
                        ? 'border-[#1D4ED8] bg-white text-[#1D4ED8]'
                        : 'border-[#D4D4D8] bg-white text-[#71717A]'
                  }`}
                >
                  {complete ? '✓' : index + 1}
                </span>
                <span className={`text-xs font-semibold ${active ? 'text-[#1D4ED8]' : complete ? 'text-[#18181B]' : 'text-[#71717A]'}`}>
                  {stage}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function Totals({ totals }) {
  return <div className="mt-5 ml-auto w-80 rounded-md border border-[#E5E7EB] bg-[#FAFAFA] p-4 text-sm">{[['Amount of sale', totals.sale], ['Sales tax (6.625%)', totals.tax], ['Delivery charge', totals.delivery], ['Total due', totals.due], ['Initial deposit', totals.deposit], ['Balance', totals.balance]].map(([label, value]) => <div key={label} className="flex justify-between py-1"><span className="text-[#71717A]">{label}</span><span className="font-semibold">{money(Number(value) || 0)}</span></div>)}</div>
}

function MiniList({ title, items }) {
  return <div className="rounded-md border border-[#E5E7EB] p-3"><h3 className="mb-2 text-sm font-semibold">{title}</h3><div className="space-y-2 text-sm text-[#52525B]">{items.map((item) => <p key={item}>{item}</p>)}</div></div>
}

function StatusPill({ label }) {
  return <span className="mt-2 inline-flex rounded-full border border-blue-200 bg-blue-50 px-2 py-1 text-xs font-semibold text-[#1E40AF]">{label}</span>
}

function DemoGuide({ step, steps, next, previous, close }) {
  const current = steps[step]
  const isLast = step === steps.length - 1
  return (
    <section className="fixed bottom-5 left-[250px] z-[60] w-[360px] rounded-md border border-[#E5E7EB] bg-white p-4 shadow-lg">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#71717A]">
            Guided flow {step + 1} of {steps.length}
          </p>
          <h2 className="mt-1 text-lg font-bold">{current.title}</h2>
        </div>
        <button onClick={close} className="rounded border border-[#E5E7EB] px-2 py-1 text-sm">X</button>
      </div>
      <p className="mt-3 text-sm text-[#52525B]">{current.body}</p>
      <div className="mt-4 flex items-center justify-between">
        <button
          onClick={previous}
          disabled={step === 0}
          className="rounded-md border border-[#E5E7EB] bg-white px-3 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-40"
        >
          Back
        </button>
        <div className="flex gap-2">
          <button onClick={current.action} className="rounded-md border border-[#E5E7EB] bg-white px-3 py-2 text-sm font-semibold">
            Show me
          </button>
          <button
            onClick={isLast ? close : next}
            className="rounded-md bg-[#1D4ED8] px-3 py-2 text-sm font-semibold text-white"
          >
            {isLast ? 'Done' : 'Next'}
          </button>
        </div>
      </div>
    </section>
  )
}

function Icon({ name }) {
  return <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded border border-[#D4D4D8] text-[10px] font-semibold text-[#71717A]">{name.slice(0, 1).toUpperCase()}</span>
}

function Spec({ label, value }) {
  return <div><p className="text-xs font-semibold uppercase tracking-wide text-[#71717A]">{label}</p><p className="mt-1 font-medium">{value || '-'}</p></div>
}

function Divider({ label }) {
  return <div className="my-5 flex items-center gap-3"><div className="h-px flex-1 bg-[#E5E7EB]" /><span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#71717A]">{label}</span><div className="h-px flex-1 bg-[#E5E7EB]" /></div>
}

function job(overrides) {
  const firstLine = line(overrides.material || '', overrides.color || '', overrides.areas || [], overrides.size || '', parseFloat(overrides.size) || '', 0)
  return {
    firstName: overrides.firstName || overrides.customer.split(', ')[1] || '',
    lastName: overrides.lastName || overrides.customer.split(', ')[0] || '',
    apt: '',
    phone: '(732) 555-0100',
    businessPhone: '',
    date: '2026-09-18',
    measureDate: '',
    installDate: '',
    eta: '',
    orderedDate: '',
    supplier: 'Dixie Group / Masland',
    measuredBy: 'Shariq',
    salesperson: 'Michele',
    installerId: '',
    contact: overrides.customer,
    checklist: defaultChecklist(),
    instructions: '',
    lineItems: [firstLine],
    addOns: [],
    totals: totalsFor([firstLine], 0, 0),
    completedDate: '',
    paymentMethod: '',
    ...overrides,
  }
}

function line(material, color, areas, size, ydsFt, unitPrice) {
  const item = { material, color, areas, size, ydsFt, unitPrice, amount: 0 }
  return { ...item, amount: calcAmount(item) }
}

function emptyLine() {
  return { material: '', color: '', areas: [], size: '', ydsFt: '', unitPrice: '', amount: 0 }
}

function defaultChecklist() {
  return Object.fromEntries(checklistLabels.map((label) => [label, false]))
}

function newJobForm() {
  return { lastName: '', firstName: '', address: '', cityState: '', phone: '', date: new Date().toISOString().slice(0, 10), apt: '', zip: '', businessPhone: '', measureDate: '', installDate: '', salesperson: 'Michele', lines: [emptyLine()], checklist: defaultChecklist(), instructions: '', deposit: 0, delivery: 0 }
}

function calcAmount(item) {
  return (Number(item.ydsFt) || 0) * (Number(item.unitPrice) || 0)
}

function saleTotal(lines) {
  return lines.reduce((sum, item) => sum + (Number(item.amount) || 0), 0)
}

function totalsFor(lines, deposit = 0, delivery = 0) {
  const sale = saleTotal(lines)
  const tax = Math.round(sale * 0.06625 * 100) / 100
  const due = sale + tax + Number(delivery || 0)
  return { sale, tax, delivery: Number(delivery || 0), due, deposit: Number(deposit || 0), balance: due - Number(deposit || 0) }
}

function installerFor(id) {
  return installers.find((installer) => installer.id === id)
}

function nextDate(job) {
  return displayDate(job.measureDate || job.eta || job.installDate || job.date)
}

function displayDate(value) {
  if (!value) return '-'
  if (!value.includes('-')) return value
  const date = new Date(`${value}T00:00:00`)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function stageIndex(stage) {
  return flowStages.indexOf(stage)
}

function formatAreas(areas = []) {
  return areas.map((area) => {
    const match = workAreas.find(([code]) => code === area)
    if (!match) return area
    const [code, name] = match
    return name === code ? name : `${name} (${code})`
  }).join(' + ')
}

function calendarEvents(jobs) {
  return jobs.flatMap((jobItem) => {
    const events = []
    if (jobItem.measureDate) events.push({ type: 'measure', day: dayOf(jobItem.measureDate), border: 'border-l-green-600', job: jobItem })
    if (jobItem.installDate) events.push({ type: 'install', day: dayOf(jobItem.installDate), border: 'border-l-[#1D4ED8]', job: jobItem })
    if (jobItem.eta) events.push({ type: 'eta', day: dayOf(jobItem.eta), border: 'border-l-amber-600', job: jobItem })
    return events
  })
}

function dayOf(value) {
  return new Date(`${value}T00:00:00`).getDate().toString()
}

function labelFor(field) {
  return {
    apt: 'Apt #',
    zip: 'Zip code',
    businessPhone: 'B. Phone',
    measureDate: 'Date of measure',
    installDate: 'Date of installation',
    salesperson: 'Salesperson',
  }[field]
}

function tourRing(activeTarget, target) {
  return activeTarget === target ? 'ring-2 ring-[#1D4ED8] ring-offset-2 ring-offset-[#FAFAFA]' : ''
}

export default App
