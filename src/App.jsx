import { useMemo, useState } from 'react'

const palette = {
  primary: '#1D4ED8',
  link: '#1E40AF',
  event: '#EEF2FE',
  selected: '#F1F1F4',
  page: '#FAFAFA',
  surface: '#FFFFFF',
  border: '#E5E7EB',
  text: '#18181B',
  muted: '#71717A',
  amberText: '#B45309',
  amberBg: '#FEF3C7',
}

const installersSeed = [
  {
    id: 'ray',
    name: 'Ray Morales',
    specialty: 'Carpet and resilient',
    phone: '(732) 555-0132',
    rates: [
      { task: 'rip-up', unit: 'sq yd', rate: 4.5 },
      { task: 'install', unit: 'sq yd', rate: 7 },
      { task: 'stairs', unit: 'each', rate: 18 },
      { task: 'furniture move', unit: 'room', rate: 45 },
      { task: 'wall base', unit: 'lin ft', rate: 1.75 },
    ],
  },
  {
    id: 'tony',
    name: 'Tony Vasquez',
    specialty: 'LVP and carpet',
    phone: '(732) 555-0198',
    rates: [
      { task: 'rip-up', unit: 'sq yd', rate: 4 },
      { task: 'install', unit: 'sq yd', rate: 6.5 },
      { task: 'stairs', unit: 'each', rate: 16 },
      { task: 'furniture move', unit: 'room', rate: 40 },
      { task: 'wall base', unit: 'lin ft', rate: 1.5 },
    ],
  },
  {
    id: 'dave',
    name: 'Dave Kalinowski',
    specialty: 'Sand & stain only',
    phone: '(732) 555-0185',
    rates: [{ task: 'sand & finish', unit: 'sq ft', rate: 3.25 }],
  },
]

const jobsSeed = [
  {
    id: 'WO-1048',
    day: 'Mon',
    date: 'Mar 9',
    fullDate: 'Monday, Mar 9',
    time: '8:00 AM',
    customer: 'M. Serrano',
    address: '14 Chestnut Ln, Edison NJ',
    product: 'Mohawk Karastan carpet',
    qty: 92,
    unit: 'sq yd',
    installerId: 'ray',
    status: 'Completed',
    expected: [
      { task: 'install', qty: 92 },
      { task: 'rip-up', qty: 18 },
    ],
  },
  {
    id: 'WO-1049',
    day: 'Mon',
    date: 'Mar 9',
    fullDate: 'Monday, Mar 9',
    time: '11:30 AM',
    customer: 'R. Patel',
    address: '318 Talmadge Rd, Edison NJ',
    product: 'Shaw LVP',
    qty: 640,
    unit: 'sq ft',
    installerId: 'tony',
    status: 'Completed',
    expected: [{ task: 'install', qty: 640 }],
  },
  {
    id: 'WO-1050',
    day: 'Tue',
    date: 'Mar 10',
    fullDate: 'Tuesday, Mar 10',
    time: '9:00 AM',
    customer: 'Greenbrook Apts #204',
    address: '1100 Oak Tree Rd',
    product: 'Shaw commercial carpet',
    qty: 55,
    unit: 'sq yd',
    installerId: 'ray',
    status: 'Completed',
    expected: [
      { task: 'install', qty: 55 },
      { task: 'wall base', qty: 26 },
    ],
  },
  {
    id: 'WO-1051',
    day: 'Wed',
    date: 'Mar 11',
    fullDate: 'Wednesday, Mar 11',
    time: '8:30 AM',
    customer: 'J. Whitman',
    address: '7 Fairview Ave, Metuchen NJ',
    product: 'Masland carpet',
    qty: 74,
    unit: 'sq yd',
    installerId: 'ray',
    status: 'Completed',
    expected: [{ task: 'install', qty: 74 }],
  },
  {
    id: 'WO-1052',
    day: 'Thu',
    date: 'Mar 12',
    fullDate: 'Thursday, Mar 12',
    time: '10:00 AM',
    customer: 'L. Okafor',
    address: '229 Grove St, Edison NJ',
    product: 'Mannington LVP',
    qty: 410,
    unit: 'sq ft',
    installerId: 'tony',
    status: 'Completed',
    expected: [{ task: 'install', qty: 410 }],
  },
  {
    id: 'WO-1053',
    day: 'Fri',
    date: 'Mar 13',
    fullDate: 'Friday, Mar 13',
    time: '8:00 AM',
    customer: 'D. Feldman',
    address: '55 Woodbridge Ave, Edison NJ',
    product: 'Mohawk carpet',
    qty: 120,
    unit: 'sq yd',
    installerId: 'ray',
    status: 'Dispatched',
    expected: [{ task: 'install', qty: 120 }],
  },
]

const rayInvoiceSeed = {
  installerId: 'ray',
  week: 'Mar 9-13',
  status: 'Draft',
  jobs: {
    'WO-1048': [
      { task: 'install', planned: 92, actual: 92, note: '' },
      { task: 'rip-up', planned: 18, actual: 18, note: '' },
      { task: 'stairs', planned: 0, actual: 4, note: 'added on site' },
    ],
    'WO-1050': [
      { task: 'install', planned: 55, actual: 55, note: '' },
      { task: 'wall base', planned: 26, actual: 26, note: '' },
      { task: 'furniture move', planned: 0, actual: 2, note: 'added on site' },
      { task: 'wall base', planned: 0, actual: 80, note: 'added on site' },
    ],
    'WO-1051': [
      { task: 'install', planned: 74, actual: 71, note: 'less than planned' },
      { task: 'install', planned: 0, actual: 20, note: 'added on site' },
      { task: 'wall base', planned: 0, actual: 38, note: 'added on site' },
    ],
  },
}

const navGroups = [
  ['POINT OF SALE', ['Inbox', 'Transactions', 'Deliveries', 'Installs', 'Receivables', 'Cash Drawers']],
  ['INVENTORY', ['Orders', 'Transfers', 'Counts']],
  ['BOOKS', ['Products', 'Customers', 'Vendors', 'Installers']],
  ['ANALYTICS', ['Dashboards', 'Reports']],
]

const storeTabs = ['Jobs', 'Installers', 'Invoices']
const money = (value) =>
  value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })

function App() {
  const [role, setRole] = useState('store')
  const [storeTab, setStoreTab] = useState('Invoices')
  const [selectedJobId, setSelectedJobId] = useState('WO-1051')
  const [selectedInstallerId, setSelectedInstallerId] = useState('ray')
  const [invoiceStatus, setInvoiceStatus] = useState('Draft')
  const [installerJobId, setInstallerJobId] = useState(null)
  const [actuals, setActuals] = useState({ install: 120 })
  const [addedTask, setAddedTask] = useState('')

  const installers = installersSeed
  const jobs = jobsSeed
  const selectedJob = jobs.find((job) => job.id === selectedJobId) ?? jobs[0]
  const selectedInstaller =
    installers.find((installer) => installer.id === selectedInstallerId) ?? installers[0]

  const invoice = useMemo(() => {
    return buildInvoice(rayInvoiceSeed, jobs, installers.find((installer) => installer.id === 'ray'))
  }, [jobs, installers])

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#18181B]">
      {role === 'store' ? (
        <StoreShell role={role} setRole={setRole}>
          <TopBar role={role} setRole={setRole} />
          <main className="px-8 pb-8">
            <div className="mb-5 flex items-center justify-between">
              <div className="flex rounded-md border border-[#E5E7EB] bg-white p-1">
                {storeTabs.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setStoreTab(tab)}
                    className={`rounded px-4 py-2 text-sm font-medium ${
                      storeTab === tab ? 'bg-[#F1F1F4] text-[#18181B]' : 'text-[#71717A]'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 text-sm text-[#71717A]">
                <span>‹</span>
                <button className="rounded border border-[#E5E7EB] bg-white px-3 py-2 font-medium text-[#18181B]">
                  Today
                </button>
                <span>›</span>
                <span className="ml-2 font-medium text-[#18181B]">Mar 9-15, 2026</span>
              </div>
            </div>

            {storeTab === 'Jobs' && (
              <JobsView
                jobs={jobs}
                installers={installers}
                selectedJob={selectedJob}
                setSelectedJobId={setSelectedJobId}
                setStoreTab={setStoreTab}
              />
            )}
            {storeTab === 'Installers' && (
              <InstallersView
                jobs={jobs}
                installers={installers}
                selectedInstaller={selectedInstaller}
                setSelectedInstallerId={setSelectedInstallerId}
              />
            )}
            {storeTab === 'Invoices' && (
              <InvoicesView
                invoice={invoice}
                status={invoiceStatus}
                onApprove={() => setInvoiceStatus('Approved')}
              />
            )}
          </main>
        </StoreShell>
      ) : (
        <InstallerMode
          role={role}
          setRole={setRole}
          jobs={jobs}
          installer={installers[0]}
          selectedJobId={installerJobId}
          setSelectedJobId={setInstallerJobId}
          actuals={actuals}
          setActuals={setActuals}
          addedTask={addedTask}
          setAddedTask={setAddedTask}
        />
      )}
    </div>
  )
}

function StoreShell({ children }) {
  return (
    <div className="flex min-h-screen">
      <aside className="flex w-[230px] shrink-0 flex-col border-r border-[#E5E7EB] bg-white">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#18181B] text-sm font-bold text-white">
              R
            </div>
            <span className="font-semibold tracking-tight">Rundoo</span>
          </div>
          <button className="h-7 w-7 rounded border border-[#E5E7EB] text-lg leading-none">+</button>
        </div>
        <div className="mx-4 mb-4 grid grid-cols-2 rounded-md border border-[#E5E7EB] bg-[#FAFAFA] p-1 text-xs font-medium">
          <button className="rounded bg-white py-1.5 text-[#18181B]">POS</button>
          <button className="rounded py-1.5 text-[#71717A]">Admin</button>
        </div>
        <nav className="flex-1 space-y-5 px-3">
          {navGroups.map(([label, items]) => (
            <div key={label}>
              <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#71717A]">
                {label}
              </p>
              <div className="space-y-1">
                {items.map((item) => (
                  <button
                    key={item}
                    className={`flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-sm ${
                      item === 'Installs' || item === 'Installers'
                        ? 'bg-[#F1F1F4] font-medium text-[#18181B]'
                        : 'text-[#52525B] hover:bg-[#FAFAFA]'
                    }`}
                  >
                    <Icon name={item} />
                    {item}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>
        <div className="space-y-1 border-t border-[#E5E7EB] p-3 text-sm text-[#52525B]">
          <button className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 hover:bg-[#FAFAFA]">
            <Icon name="Change theme" />
            Change theme
          </button>
          <button className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 hover:bg-[#FAFAFA]">
            <Icon name="Log out" />
            Log out
          </button>
        </div>
      </aside>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  )
}

function TopBar({ role, setRole }) {
  return (
    <header className="border-b border-[#E5E7EB] bg-[#FAFAFA] px-8 py-5">
      <div className="flex items-start justify-between">
        <div className="flex items-end gap-5">
          <h1 className="text-3xl font-bold tracking-tight">Installs</h1>
          <div className="mb-1 flex gap-4 text-sm font-medium text-[#71717A]">
            <button className="text-[#18181B]">Calendar</button>
            <button>List</button>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <RoleToggle role={role} setRole={setRole} />
          <div className="text-right">
            <p className="text-sm font-semibold">Nina Chung</p>
            <p className="text-xs text-[#71717A]">RUNDOO | Redwood City</p>
          </div>
          <div className="flex h-9 w-64 items-center justify-between rounded-md border border-[#E5E7EB] bg-white px-3 text-sm text-[#71717A]">
            <span>Search</span>
            <span className="rounded border border-[#E5E7EB] px-1.5 py-0.5 text-xs">⌘K</span>
          </div>
          <button className="rounded-md border border-[#E5E7EB] bg-white px-3 py-2 text-sm font-medium">
            Support ▾
          </button>
        </div>
      </div>
      <p className="mt-3 text-right text-sm text-[#71717A]">6 jobs this week</p>
    </header>
  )
}

function RoleToggle({ role, setRole }) {
  return (
    <div className="grid grid-cols-2 rounded-md border border-[#E5E7EB] bg-white p-1 text-xs font-semibold">
      {['store', 'installer'].map((item) => (
        <button
          key={item}
          onClick={() => setRole(item)}
          className={`rounded px-3 py-1.5 capitalize ${
            role === item ? 'bg-[#1D4ED8] text-white' : 'text-[#71717A]'
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  )
}

function JobsView({ jobs, installers, selectedJob, setSelectedJobId, setStoreTab }) {
  return (
    <div className="grid grid-cols-[1fr_360px] gap-5">
      <section className="rounded-md border border-[#E5E7EB] bg-white">
        <div className="flex items-center justify-between border-b border-[#E5E7EB] p-4">
          <div>
            <h2 className="font-semibold">Jobs</h2>
            <p className="text-sm text-[#71717A]">Scheduled, dispatched, and completed installs.</p>
          </div>
          <button className="rounded-md bg-[#1D4ED8] px-3 py-2 text-sm font-semibold text-white">
            + New
          </button>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="border-b border-[#E5E7EB] text-xs uppercase tracking-wide text-[#71717A]">
            <tr>
              {['Date', 'Customer', 'Address', 'Product', 'Qty', 'Installer', 'Status'].map((heading) => (
                <th key={heading} className="px-4 py-3 font-semibold">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => {
              const installer = installers.find((person) => person.id === job.installerId)
              return (
                <tr
                  key={job.id}
                  onClick={() => setSelectedJobId(job.id)}
                  className={`cursor-pointer border-b border-[#E5E7EB] last:border-0 ${
                    selectedJob.id === job.id ? 'bg-[#EEF2FE]' : 'hover:bg-[#FAFAFA]'
                  }`}
                >
                  <td className="px-4 py-3 font-medium">{job.date}</td>
                  <td className="px-4 py-3">
                    <span className="font-semibold text-[#1E40AF]">{job.id}</span>
                    <br />
                    {job.customer}
                  </td>
                  <td className="px-4 py-3 text-[#52525B]">{job.address}</td>
                  <td className="px-4 py-3">{job.product}</td>
                  <td className="px-4 py-3">
                    {job.qty} {job.unit}
                  </td>
                  <td className="px-4 py-3">{installer?.name}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={job.status} />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </section>
      <WorkOrder job={selectedJob} installers={installers} setStoreTab={setStoreTab} />
    </div>
  )
}

function WorkOrder({ job, installers, setStoreTab }) {
  const installer = installers.find((person) => person.id === job.installerId)
  const rows = job.expected.map((item) => {
    const rate = installer.rates.find((entry) => entry.task === item.task)
    return { ...item, rate: rate?.rate ?? 0, unit: rate?.unit ?? job.unit }
  })
  const total = rows.reduce((sum, row) => sum + row.rate * row.qty, 0)

  return (
    <aside className="rounded-md border border-[#E5E7EB] bg-white">
      <div className="border-b border-[#E5E7EB] p-4">
        <div className="flex items-center gap-2">
          <Icon name="work order" />
          <h2 className="font-semibold">Work order</h2>
        </div>
        <p className="mt-1 text-sm text-[#71717A]">Review planned line items before dispatch.</p>
      </div>
      <div className="space-y-4 p-4 text-sm">
        <div>
          <p className="font-semibold">{job.customer}</p>
          <p className="text-[#71717A]">{job.address}</p>
          <p className="mt-2">{job.fullDate}</p>
          <p>
            {job.product} · {job.qty} {job.unit}
          </p>
        </div>
        <table className="w-full text-left">
          <thead className="text-xs uppercase text-[#71717A]">
            <tr>
              <th className="py-2">Task</th>
              <th>Rate</th>
              <th>Qty</th>
              <th className="text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={`${job.id}-${row.task}`} className="border-t border-[#E5E7EB]">
                <td className="py-2 capitalize">{row.task}</td>
                <td>{money(row.rate)}</td>
                <td>{row.qty}</td>
                <td className="text-right">{money(row.rate * row.qty)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between border-t border-[#E5E7EB] pt-3 font-semibold">
          <span>Expected total</span>
          <span>{money(total)}</span>
        </div>
        <label className="block text-xs font-semibold uppercase tracking-wide text-[#71717A]">
          Assign installer
          <select className="mt-1 w-full rounded-md border border-[#E5E7EB] bg-white px-3 py-2 text-sm font-normal normal-case text-[#18181B]">
            {installers.map((person) => (
              <option key={person.id}>{person.name}</option>
            ))}
          </select>
        </label>
        <div className="grid grid-cols-2 gap-2">
          <button className="rounded-md bg-[#1D4ED8] px-3 py-2 font-semibold text-white">
            Send work order
          </button>
          <button className="rounded-md border border-[#E5E7EB] bg-white px-3 py-2 font-semibold">
            Print
          </button>
        </div>
        <button
          onClick={() => setStoreTab('Invoices')}
          className="w-full rounded-md border border-[#E5E7EB] bg-[#FAFAFA] px-3 py-2 font-medium text-[#1E40AF]"
        >
          View weekly invoice
        </button>
      </div>
    </aside>
  )
}

function InstallersView({ installers, jobs, selectedInstaller, setSelectedInstallerId }) {
  const installerJobs = jobs.filter((job) => job.installerId === selectedInstaller.id)
  return (
    <div className="grid grid-cols-[300px_1fr] gap-5">
      <section className="rounded-md border border-[#E5E7EB] bg-white p-3">
        <h2 className="px-2 pb-3 font-semibold">Installers</h2>
        {installers.map((installer) => (
          <button
            key={installer.id}
            onClick={() => setSelectedInstallerId(installer.id)}
            className={`mb-1 w-full rounded-md px-3 py-3 text-left ${
              installer.id === selectedInstaller.id ? 'bg-[#F1F1F4]' : 'hover:bg-[#FAFAFA]'
            }`}
          >
            <p className="font-semibold">{installer.name}</p>
            <p className="text-sm text-[#71717A]">{installer.specialty}</p>
          </button>
        ))}
      </section>
      <section className="rounded-md border border-[#E5E7EB] bg-white">
        <div className="border-b border-[#E5E7EB] p-4">
          <h2 className="font-semibold">{selectedInstaller.name}</h2>
          <p className="text-sm text-[#71717A]">{selectedInstaller.phone}</p>
        </div>
        <div className="grid grid-cols-[1fr_320px] gap-5 p-4">
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[#71717A]">
              Rate card
            </h3>
            <table className="w-full text-left text-sm">
              <thead className="border-b border-[#E5E7EB] text-xs uppercase text-[#71717A]">
                <tr>
                  <th className="py-2">Task</th>
                  <th>Unit</th>
                  <th>Rate</th>
                </tr>
              </thead>
              <tbody>
                {selectedInstaller.rates.map((rate) => (
                  <tr key={rate.task} className="border-b border-[#E5E7EB] last:border-0">
                    <td className="py-2 capitalize">{rate.task}</td>
                    <td>{rate.unit}</td>
                    <td>
                      <input
                        aria-label={`${rate.task} rate`}
                        defaultValue={rate.rate.toFixed(2)}
                        className="w-24 rounded-md border border-[#E5E7EB] px-2 py-1"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="space-y-4">
            <MiniList
              title="Past jobs"
              items={installerJobs.map((job) => `${job.id} · ${job.customer} · ${job.status}`)}
            />
            <MiniList
              title="Past invoices"
              items={
                selectedInstaller.id === 'ray'
                  ? ['INV-3901 · Mar 9-13 · Draft', 'INV-3894 · Mar 2-6 · Approved']
                  : ['INV-3899 · Mar 9-13 · Approved']
              }
            />
          </div>
        </div>
      </section>
    </div>
  )
}

function InvoicesView({ invoice, status, onApprove }) {
  return (
    <div className="grid grid-cols-[1fr_360px] gap-5">
      <section className="rounded-md border border-[#E5E7EB] bg-white">
        <div className="flex items-center justify-between border-b border-[#E5E7EB] p-4">
          <div>
            <div className="flex items-center gap-2">
              <Icon name="Invoices" />
              <h2 className="font-semibold">Weekly invoice reconciliation</h2>
            </div>
            <p className="mt-1 text-sm text-[#71717A]">
              One invoice for Ray Morales covering all completed jobs this week.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <select className="rounded-md border border-[#E5E7EB] bg-white px-3 py-2 text-sm">
              <option>Ray Morales</option>
              <option>Tony Vasquez</option>
            </select>
            <select className="rounded-md border border-[#E5E7EB] bg-white px-3 py-2 text-sm">
              <option>Week of Mar 9</option>
            </select>
            <StatusBadge status={status} />
          </div>
        </div>
        <div className="space-y-5 p-4">
          {invoice.jobs.map((job) => (
            <div key={job.id} className="rounded-md border border-[#E5E7EB]">
              <div className="flex items-center justify-between border-b border-[#E5E7EB] bg-[#FAFAFA] px-4 py-3">
                <div>
                  <p className="font-semibold">
                    {job.customer} <span className="font-normal text-[#71717A]">· {job.date}</span>
                  </p>
                  <p className="text-sm text-[#71717A]">{job.address}</p>
                </div>
                <span className="text-sm font-semibold text-[#1E40AF]">{job.id}</span>
              </div>
              <table className="w-full text-left text-sm">
                <thead className="border-b border-[#E5E7EB] text-xs uppercase text-[#71717A]">
                  <tr>
                    {['Task', 'Planned qty', 'Actual qty', 'Rate', 'Amount'].map((heading) => (
                      <th key={heading} className="px-4 py-2 font-semibold">
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {job.lines.map((line, index) => {
                    const variant = line.actual !== line.planned || line.planned === 0
                    return (
                      <tr
                        key={`${job.id}-${line.task}-${index}`}
                        className={`border-b border-[#E5E7EB] last:border-0 ${
                          variant ? 'bg-[#FEF3C7] text-[#B45309]' : ''
                        }`}
                      >
                        <td className="px-4 py-2">
                          <span className="capitalize">{line.task}</span>
                          {line.note && <span className="ml-2 text-xs font-semibold">{line.note}</span>}
                        </td>
                        <td className="px-4 py-2">{line.planned}</td>
                        <td className="px-4 py-2 font-semibold">{line.actual}</td>
                        <td className="px-4 py-2">{money(line.rate)}</td>
                        <td className="px-4 py-2 font-semibold">{money(line.amount)}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          ))}
          <div className="flex items-center justify-between rounded-md border border-[#E5E7EB] bg-[#FAFAFA] p-4">
            <p className="font-semibold">
              Planned {money(invoice.planned)} · Actual {money(invoice.actual)} · Difference{' '}
              {money(invoice.actual - invoice.planned)}
            </p>
            <p className="text-xl font-bold">{money(invoice.actual)}</p>
          </div>
          <div className="flex justify-end gap-2">
            <button className="rounded-md border border-[#E5E7EB] bg-white px-4 py-2 font-semibold">
              Query line
            </button>
            <button
              onClick={onApprove}
              className="rounded-md bg-[#1D4ED8] px-4 py-2 font-semibold text-white"
            >
              Approve invoice
            </button>
          </div>
        </div>
      </section>
      <StagingPanel status={status} invoice={invoice} />
    </div>
  )
}

function StagingPanel({ status, invoice }) {
  return (
    <aside className="rounded-md border border-[#E5E7EB] bg-white">
      <div className="border-b border-[#E5E7EB] p-4">
        <div className="flex items-center gap-2">
          <Icon name="staging" />
          <h2 className="font-semibold">{status === 'Approved' ? 'Payables' : 'Awaiting invoice'}</h2>
        </div>
        <p className="mt-1 text-sm text-[#71717A]">
          {status === 'Approved'
            ? '1 approved installer invoice ready to pay'
            : '3 jobs completed, not yet invoiced'}
        </p>
        <div className="mt-3 rounded-md border border-[#E5E7EB] px-3 py-2 text-sm text-[#71717A]">Search</div>
        <div className="mt-3 flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-[#71717A]">
            <input type="checkbox" /> Select all
          </label>
          <button className="rounded border border-[#E5E7EB] px-2 py-1">Sort ▾</button>
        </div>
      </div>
      <div className="divide-y divide-[#E5E7EB]">
        {invoice.jobs.map((job) => (
          <div key={job.id} className="p-4 text-sm">
            <p className="font-semibold text-[#1E40AF]">
              {job.id} ↗ <span className="ml-2 text-[#18181B]">{job.customer}</span>
            </p>
            <p className="mt-2 font-semibold">✓ Completed {job.date}</p>
            <p className="mt-1 text-[#52525B]">⌖ {job.address}</p>
            <p className="mt-1 text-[#52525B]">♙ {job.customer}</p>
            <p className="mt-2 text-[#71717A]">
              {money(job.actual)} · {job.qty} {job.unit} · {job.lines.length} tasks
            </p>
          </div>
        ))}
      </div>
    </aside>
  )
}

function InstallerMode({
  role,
  setRole,
  jobs,
  installer,
  selectedJobId,
  setSelectedJobId,
  actuals,
  setActuals,
  addedTask,
  setAddedTask,
}) {
  const todaysJobs = jobs.filter((job) => job.installerId === installer.id && ['Completed', 'Dispatched'].includes(job.status))
  const selectedJob = selectedJobId ? jobs.find((job) => job.id === selectedJobId) : null

  return (
    <div className="flex min-h-screen flex-col items-center px-6 py-6">
      <div className="mb-5 flex w-full max-w-5xl items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Installer</h1>
          <p className="text-sm text-[#71717A]">Phone view for Ray Morales</p>
        </div>
        <RoleToggle role={role} setRole={setRole} />
      </div>
      <div className="w-[390px] rounded-[32px] border-8 border-[#18181B] bg-[#18181B]">
        <div className="min-h-[780px] overflow-hidden rounded-[24px] bg-[#FAFAFA]">
          <div className="border-b border-[#E5E7EB] bg-white px-5 py-4">
            <div className="mx-auto mb-3 h-1.5 w-20 rounded-full bg-[#18181B]" />
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#71717A]">Today</p>
            <h2 className="text-2xl font-bold">{selectedJob ? 'Record work' : 'Today'}</h2>
          </div>
          {selectedJob ? (
            <JobDetail
              job={selectedJob}
              installer={installer}
              actuals={actuals}
              setActuals={setActuals}
              addedTask={addedTask}
              setAddedTask={setAddedTask}
              onBack={() => setSelectedJobId(null)}
            />
          ) : (
            <div className="space-y-3 p-4">
              {todaysJobs.map((job) => (
                <button
                  key={job.id}
                  onClick={() => {
                    setSelectedJobId(job.id)
                    setActuals(Object.fromEntries(job.expected.map((line) => [line.task, line.qty])))
                  }}
                  className="w-full rounded-md border border-[#E5E7EB] bg-white p-4 text-left"
                >
                  <div className="flex items-start justify-between">
                    <p className="text-lg font-bold">{job.time}</p>
                    <StatusBadge status={job.status} />
                  </div>
                  <p className="mt-3 text-lg font-semibold">{job.customer}</p>
                  <p className="text-sm text-[#71717A]">{job.address}</p>
                  <p className="mt-3 text-sm">
                    {job.product} · {job.qty} {job.unit}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function JobDetail({ job, installer, actuals, setActuals, addedTask, setAddedTask, onBack }) {
  const rateOptions = installer.rates
  const rows = [
    ...job.expected.map((line) => ({ ...line, source: 'expected' })),
    ...(addedTask ? [{ task: addedTask, qty: 0, source: 'added' }] : []),
  ]

  return (
    <div className="flex min-h-[690px] flex-col p-4">
      <button onClick={onBack} className="mb-3 text-left text-sm font-semibold text-[#1E40AF]">
        ‹ Back to today
      </button>
      <section className="rounded-md border border-[#E5E7EB] bg-white p-4">
        <p className="font-bold">{job.customer}</p>
        <p className="text-sm text-[#71717A]">{job.address}</p>
        <p className="mt-3 text-sm">
          {job.product} · {job.qty} {job.unit}
        </p>
      </section>
      <p className="mt-5 text-sm font-semibold uppercase tracking-wide text-[#71717A]">Expected</p>
      <div className="mt-2 space-y-3">
        {rows.map((line) => {
          const rate = rateOptions.find((option) => option.task === line.task)
          const value = actuals[line.task] ?? ''
          return (
            <div key={`${line.task}-${line.source}`} className="rounded-md border border-[#E5E7EB] bg-white p-4">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <p className="font-semibold capitalize">{line.task}</p>
                  <p className="text-xs text-[#71717A]">
                    Planned {line.qty} {rate?.unit}
                  </p>
                </div>
                {line.source === 'added' && (
                  <span className="rounded bg-[#FEF3C7] px-2 py-1 text-xs font-semibold text-[#B45309]">
                    added
                  </span>
                )}
              </div>
              <label className="text-xs font-semibold uppercase tracking-wide text-[#71717A]">
                Actual quantity
                <input
                  type="number"
                  min="0"
                  value={value}
                  onChange={(event) => setActuals({ ...actuals, [line.task]: event.target.value })}
                  className="mt-1 h-14 w-full rounded-md border border-[#E5E7EB] px-4 text-2xl font-bold"
                />
              </label>
            </div>
          )
        })}
      </div>
      <div className="mt-4 rounded-md border border-[#E5E7EB] bg-white p-4">
        <label className="text-sm font-semibold">
          + Add task
          <select
            value={addedTask}
            onChange={(event) => {
              setAddedTask(event.target.value)
              if (event.target.value) setActuals({ ...actuals, [event.target.value]: 0 })
            }}
            className="mt-2 h-12 w-full rounded-md border border-[#E5E7EB] bg-white px-3 text-base"
          >
            <option value="">Pick from rate card</option>
            {rateOptions.map((rate) => (
              <option key={rate.task} value={rate.task}>
                {rate.task} · {money(rate.rate)}/{rate.unit}
              </option>
            ))}
          </select>
        </label>
      </div>
      <button className="mt-auto h-14 rounded-md bg-[#1D4ED8] text-lg font-bold text-white">
        Mark complete
      </button>
    </div>
  )
}

function MiniList({ title, items }) {
  return (
    <div className="rounded-md border border-[#E5E7EB] p-3">
      <h3 className="mb-2 text-sm font-semibold">{title}</h3>
      <div className="space-y-2 text-sm text-[#52525B]">
        {items.map((item) => (
          <p key={item}>{item}</p>
        ))}
      </div>
    </div>
  )
}

function StatusBadge({ status }) {
  const styles =
    status === 'Completed'
      ? 'border-green-200 bg-green-50 text-green-700'
      : status === 'Approved'
        ? 'border-blue-200 bg-blue-50 text-[#1E40AF]'
        : status === 'Draft'
          ? 'border-[#E5E7EB] bg-white text-[#71717A]'
          : 'border-[#E5E7EB] bg-[#EEF2FE] text-[#1E40AF]'
  return (
    <span className={`inline-flex rounded-full border px-2 py-1 text-xs font-semibold ${styles}`}>
      {status}
    </span>
  )
}

function Icon({ name }) {
  const letter = name.slice(0, 1).toUpperCase()
  return (
    <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded border border-[#D4D4D8] text-[10px] font-semibold text-[#71717A]">
      {letter}
    </span>
  )
}

function buildInvoice(invoiceSeed, jobs, installer) {
  const rateByTask = Object.fromEntries(installer.rates.map((rate) => [rate.task, rate]))
  const invoiceJobs = Object.entries(invoiceSeed.jobs).map(([jobId, lines]) => {
    const job = jobs.find((item) => item.id === jobId)
    const invoiceLines = lines.map((line) => {
      const rate = rateByTask[line.task]
      return {
        ...line,
        unit: rate.unit,
        rate: rate.rate,
        plannedAmount: line.planned * rate.rate,
        amount: line.actual * rate.rate,
      }
    })
    return {
      ...job,
      lines: invoiceLines,
      planned: invoiceLines.reduce((sum, line) => sum + line.plannedAmount, 0),
      actual: invoiceLines.reduce((sum, line) => sum + line.amount, 0),
    }
  })
  return {
    ...invoiceSeed,
    jobs: invoiceJobs,
    planned: invoiceJobs.reduce((sum, job) => sum + job.planned, 0),
    actual: invoiceJobs.reduce((sum, job) => sum + job.actual, 0),
  }
}

export default App
