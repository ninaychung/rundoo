import { useMemo, useState } from 'react'

const installersSeed = [
  {
    id: 'ray',
    name: 'Ray Morales',
    type: 'Contractor',
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
    type: 'Contractor',
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
    type: 'Employee',
    specialty: 'Sand & stain only',
    phone: '(732) 555-0185',
    rates: [{ task: 'sand & finish', unit: 'hour', rate: 52 }],
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
    contact: 'M. Serrano',
    address: '14 Chestnut Ln, Edison, NJ 08820',
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
    contact: 'R. Patel',
    address: '318 Talmadge Rd, Edison, NJ 08817',
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
    customer: 'Greenbrook Apartments - Unit 204',
    contact: 'Denise Ruiz, Property Manager',
    address: '1100 Oak Tree Rd, Edison, NJ 08820',
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
    contact: 'J. Whitman',
    address: '7 Fairview Ave, Metuchen, NJ 08840',
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
    contact: 'L. Okafor',
    address: '229 Grove St, Edison, NJ 08820',
    product: 'Mannington LVP',
    qty: 410,
    unit: 'sq ft',
    installerId: 'tony',
    status: 'Completed',
    expected: [{ task: 'install', qty: 410 }],
  },
  {
    id: 'WO-1054',
    day: 'Thu',
    date: 'Mar 12',
    fullDate: 'Thursday, Mar 12',
    time: '1:30 PM',
    customer: 'K. Brennan',
    contact: 'K. Brennan',
    address: '41 Denman Ave, Edison, NJ 08820',
    product: 'Mohawk carpet + hardwood stairs sand & finish',
    qty: 64,
    unit: 'sq yd',
    installerId: 'ray',
    additionalInstallers: ['dave'],
    status: 'Completed',
    expected: [
      { task: 'install', qty: 64 },
      { task: 'rip-up', qty: 64 },
    ],
    sharedWork: [{ installerId: 'dave', task: 'sand & finish', qty: 48, unit: 'sq ft' }],
  },
  {
    id: 'WO-1053',
    day: 'Fri',
    date: 'Mar 13',
    fullDate: 'Friday, Mar 13',
    time: '8:00 AM',
    customer: 'D. Feldman',
    contact: 'D. Feldman',
    address: '55 Woodbridge Ave, Edison, NJ 08817',
    product: 'Mohawk carpet',
    qty: 120,
    unit: 'sq yd',
    installerId: 'ray',
    status: 'Dispatched',
    expected: [{ task: 'install', qty: 120 }],
  },
]

const invoiceLinesSeed = {
  'WO-1048': [
    { task: 'install', planned: 92, actual: 92 },
    { task: 'rip-up', planned: 18, actual: 18 },
    { task: 'stairs', planned: 0, actual: 4 },
  ],
  'WO-1050': [
    { task: 'install', planned: 55, actual: 55 },
    { task: 'wall base', planned: 26, actual: 26 },
    { task: 'furniture move', planned: 0, actual: 2 },
    { task: 'wall base', planned: 0, actual: 80 },
  ],
  'WO-1051': [
    { task: 'install', planned: 74, actual: 71 },
    { task: 'wall base', planned: 0, actual: 38 },
  ],
  'WO-1054': [
    { task: 'install', planned: 64, actual: 64 },
    { task: 'rip-up', planned: 64, actual: 64 },
  ],
}

const navGroups = [
  ['POINT OF SALE', ['Inbox', 'Transactions', 'Deliveries', 'Installs', 'Receivables', 'Cash Drawers']],
  ['INVENTORY', ['Orders', 'Transfers', 'Counts']],
  ['BOOKS', ['Products', 'Customers', 'Vendors', 'Installers']],
  ['ANALYTICS', ['Dashboards', 'Reports']],
]

const storeTabs = ['Jobs', 'Installers', 'Invoices']
const jobStatuses = ['Scheduled', 'Dispatched', 'Completed']

const money = (value) =>
  value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })

function App() {
  const [role, setRole] = useState('store')
  const [storeTab, setStoreTab] = useState('Invoices')
  const [jobs, setJobs] = useState(jobsSeed)
  const [selectedJobId, setSelectedJobId] = useState('WO-1051')
  const [selectedInstallerId, setSelectedInstallerId] = useState('ray')
  const [invoiceInstallerId, setInvoiceInstallerId] = useState('ray')
  const [invoiceJobIds, setInvoiceJobIds] = useState(['WO-1048', 'WO-1050', 'WO-1051', 'WO-1054'])
  const [selectedReadyIds, setSelectedReadyIds] = useState(['WO-1054'])
  const [invoiceStatus, setInvoiceStatus] = useState('Draft')
  const [installerJobId, setInstallerJobId] = useState(null)
  const [actuals, setActuals] = useState({ install: 120 })
  const [addedTask, setAddedTask] = useState('')

  const selectedJob = jobs.find((job) => job.id === selectedJobId) ?? jobs[0]
  const selectedInstaller =
    installersSeed.find((installer) => installer.id === selectedInstallerId) ?? installersSeed[0]
  const invoiceInstaller =
    installersSeed.find((installer) => installer.id === invoiceInstallerId) ?? installersSeed[0]
  const contractorInstallers = installersSeed.filter((installer) => installer.type === 'Contractor')
  const readyJobs = jobs.filter(
    (job) => job.status === 'Completed' && job.installerId === invoiceInstaller.id,
  )
  const invoice = useMemo(
    () => buildInvoice(invoiceJobIds, jobs, invoiceInstaller),
    [invoiceJobIds, jobs, invoiceInstaller],
  )

  const updateJobStatus = (jobId, status) => {
    setJobs((currentJobs) =>
      currentJobs.map((job) => (job.id === jobId ? { ...job, status } : job)),
    )
  }

  const addSelectedToInvoice = () => {
    setInvoiceJobIds((currentIds) => [...new Set([...currentIds, ...selectedReadyIds])])
    setSelectedReadyIds([])
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#18181B]">
      {role === 'store' ? (
        <StoreShell>
          <TopBar role={role} setRole={setRole} jobCount={jobs.length} />
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
                installers={installersSeed}
                selectedJob={selectedJob}
                setSelectedJobId={setSelectedJobId}
                setStoreTab={setStoreTab}
                updateJobStatus={updateJobStatus}
              />
            )}
            {storeTab === 'Installers' && (
              <InstallersView
                jobs={jobs}
                installers={installersSeed}
                selectedInstaller={selectedInstaller}
                setSelectedInstallerId={setSelectedInstallerId}
              />
            )}
            {storeTab === 'Invoices' && (
              <InvoicesView
                invoice={invoice}
                status={invoiceStatus}
                onApprove={() => setInvoiceStatus('Approved')}
                contractorInstallers={contractorInstallers}
                invoiceInstaller={invoiceInstaller}
                setInvoiceInstallerId={setInvoiceInstallerId}
                readyJobs={readyJobs}
                selectedReadyIds={selectedReadyIds}
                setSelectedReadyIds={setSelectedReadyIds}
                addSelectedToInvoice={addSelectedToInvoice}
              />
            )}
          </main>
        </StoreShell>
      ) : (
        <InstallerMode
          role={role}
          setRole={setRole}
          jobs={jobs}
          installer={installersSeed[0]}
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

function TopBar({ role, setRole, jobCount }) {
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
      <p className="mt-3 text-right text-sm text-[#71717A]">{jobCount} jobs this week</p>
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

function JobsView({
  jobs,
  installers,
  selectedJob,
  setSelectedJobId,
  setStoreTab,
  updateJobStatus,
}) {
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
              const extraInstallers = (job.additionalInstallers ?? [])
                .map((id) => installers.find((person) => person.id === id))
                .filter(Boolean)
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
                  <td className="space-y-1 px-4 py-3">
                    <NameWithType person={installer} />
                    {extraInstallers.map((person) => (
                      <NameWithType key={person.id} person={person} />
                    ))}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={job.status}
                      onClick={(event) => event.stopPropagation()}
                      onChange={(event) => updateJobStatus(job.id, event.target.value)}
                      className="rounded-md border border-[#E5E7EB] bg-white px-2 py-1 text-xs font-semibold"
                    >
                      {jobStatuses.map((status) => (
                        <option key={status}>{status}</option>
                      ))}
                    </select>
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
  const sharedPeople = (job.additionalInstallers ?? [])
    .map((id) => installers.find((person) => person.id === id))
    .filter(Boolean)

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
          <p className="text-[#71717A]">{job.contact}</p>
          <p className="text-[#71717A]">{job.address}</p>
          <p className="mt-2">{job.fullDate}</p>
          <p>
            {job.product} · {job.qty} {job.unit}
          </p>
        </div>
        <div className="rounded-md border border-[#E5E7EB] bg-[#FAFAFA] p-3">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#71717A]">
            Assigned installer
          </p>
          <NameWithType person={installer} />
          {sharedPeople.map((person) => (
            <div key={person.id} className="mt-2">
              <NameWithType person={person} />
            </div>
          ))}
          {job.sharedWork?.map((work) => (
            <p key={`${work.installerId}-${work.task}`} className="mt-2 text-xs text-[#71717A]">
              {work.task} · {work.qty} {work.unit}
            </p>
          ))}
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
                <td>
                  {money(row.rate)}/{row.unit}
                </td>
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
              <option key={person.id}>
                {person.name} - {person.type}
              </option>
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
  const installerJobs = jobs.filter(
    (job) =>
      job.installerId === selectedInstaller.id ||
      (job.additionalInstallers ?? []).includes(selectedInstaller.id),
  )
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
            <NameWithType person={installer} />
            <p className="mt-1 text-sm text-[#71717A]">{installer.specialty}</p>
          </button>
        ))}
      </section>
      <section className="rounded-md border border-[#E5E7EB] bg-white">
        <div className="border-b border-[#E5E7EB] p-4">
          <NameWithType person={selectedInstaller} large />
          <p className="mt-1 text-sm text-[#71717A]">{selectedInstaller.phone}</p>
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
                    <td>/{rate.unit}</td>
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
                selectedInstaller.type === 'Employee'
                  ? ['Payroll employee · no installer invoices']
                  : selectedInstaller.id === 'ray'
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

function InvoicesView({
  invoice,
  status,
  onApprove,
  contractorInstallers,
  invoiceInstaller,
  setInvoiceInstallerId,
  readyJobs,
  selectedReadyIds,
  setSelectedReadyIds,
  addSelectedToInvoice,
}) {
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
              One invoice for <NameWithType person={invoiceInstaller} inline /> covering completed contractor work.
            </p>
            <p className="mt-2 text-sm text-[#71717A]">
              Employees are paid through payroll and do not appear here.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={invoiceInstaller.id}
              onChange={(event) => setInvoiceInstallerId(event.target.value)}
              className="rounded-md border border-[#E5E7EB] bg-white px-3 py-2 text-sm"
            >
              {contractorInstallers.map((installer) => (
                <option key={installer.id} value={installer.id}>
                  {installer.name} - {installer.type}
                </option>
              ))}
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
              <InvoiceTable lines={job.lines} />
            </div>
          ))}
          <div className="rounded-md border border-[#E5E7EB] bg-[#FAFAFA] p-4">
            <p className="font-semibold">
              Planned {money(invoice.planned)} · Quantity variance {money(invoice.quantityVariance)} · Added on
              site {money(invoice.addedOnSite)} · Total {money(invoice.total)}
            </p>
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
      <StagingPanel
        readyJobs={readyJobs}
        invoiceInstaller={invoiceInstaller}
        selectedReadyIds={selectedReadyIds}
        setSelectedReadyIds={setSelectedReadyIds}
        addSelectedToInvoice={addSelectedToInvoice}
      />
    </div>
  )
}

function InvoiceTable({ lines }) {
  return (
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
        {lines.map((line, index) => {
          const added = line.planned === 0
          const quantityVariance = line.planned > 0 && line.actual !== line.planned
          const delta = line.actual - line.planned
          return (
            <tr
              key={`${line.task}-${index}`}
              className={`border-b border-[#E5E7EB] last:border-0 ${
                added ? 'bg-[#FEF3C7] text-[#B45309]' : ''
              }`}
            >
              <td className="px-4 py-2">
                <span className="capitalize">{line.task}</span>
                {added && (
                  <span className="ml-2 rounded bg-white/70 px-2 py-1 text-xs font-semibold text-[#B45309]">
                    Added on site
                  </span>
                )}
              </td>
              <td className="px-4 py-2">{line.planned}</td>
              <td className="px-4 py-2">
                {quantityVariance ? (
                  <span>
                    <strong>{line.actual}</strong>{' '}
                    <span className="text-[#71717A]">
                      {delta > 0 ? '▲' : '▼'} {delta > 0 ? `+${delta}` : delta}
                    </span>
                  </span>
                ) : (
                  <strong>{line.actual}</strong>
                )}
              </td>
              <td className="px-4 py-2">
                {money(line.rate)}/{line.unit}
              </td>
              <td className="px-4 py-2 font-semibold">{money(line.amount)}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

function StagingPanel({
  readyJobs,
  invoiceInstaller,
  selectedReadyIds,
  setSelectedReadyIds,
  addSelectedToInvoice,
}) {
  const toggleJob = (jobId) => {
    setSelectedReadyIds((currentIds) =>
      currentIds.includes(jobId)
        ? currentIds.filter((id) => id !== jobId)
        : [...currentIds, jobId],
    )
  }

  const toggleAll = () => {
    setSelectedReadyIds(
      selectedReadyIds.length === readyJobs.length ? [] : readyJobs.map((job) => job.id),
    )
  }

  return (
    <aside className="rounded-md border border-[#E5E7EB] bg-white">
      <div className="border-b border-[#E5E7EB] p-4">
        <div className="flex items-center gap-2">
          <Icon name="Ready" />
          <h2 className="font-semibold">Ready to invoice</h2>
        </div>
        <p className="mt-1 text-sm text-[#71717A]">
          {readyJobs.length} completed jobs not yet on an invoice.
        </p>
        <div className="mt-3 rounded-md border border-[#E5E7EB] px-3 py-2 text-sm text-[#71717A]">Search</div>
        <div className="mt-3 flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-[#71717A]">
            <input
              type="checkbox"
              checked={readyJobs.length > 0 && selectedReadyIds.length === readyJobs.length}
              onChange={toggleAll}
            />
            Select all
          </label>
          <button className="rounded border border-[#E5E7EB] px-2 py-1">Completed: oldest ▾</button>
        </div>
      </div>
      <div className="divide-y divide-[#E5E7EB]">
        {readyJobs.map((job) => {
          const amount = estimateJobAmount(job, invoiceInstaller)
          return (
            <label key={job.id} className="block cursor-pointer p-4 text-sm hover:bg-[#FAFAFA]">
              <div className="flex gap-3">
                <input
                  type="checkbox"
                  checked={selectedReadyIds.includes(job.id)}
                  onChange={() => toggleJob(job.id)}
                  className="mt-1"
                />
                <div>
                  <p className="font-semibold text-[#1E40AF]">
                    {job.id} ↗ <span className="ml-2 text-[#18181B]">{job.customer}</span>
                  </p>
                  <p className="mt-2 font-semibold">◷ Completed {job.date}</p>
                  <p className="mt-1 text-[#52525B]">⌖ {job.address}</p>
                  <p className="mt-1 text-[#52525B]">♙ {invoiceInstaller.name}</p>
                  <p className="mt-2 text-[#71717A]">
                    {money(amount)} · {job.qty} {job.unit} · {job.expected.length} tasks
                  </p>
                </div>
              </div>
            </label>
          )
        })}
      </div>
      <div className="border-t border-[#E5E7EB] p-4">
        <button
          onClick={addSelectedToInvoice}
          className="w-full rounded-md bg-[#1D4ED8] px-4 py-2 font-semibold text-white"
        >
          Add to invoice
        </button>
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
  const todaysJobs = jobs.filter(
    (job) =>
      (job.installerId === installer.id || (job.additionalInstallers ?? []).includes(installer.id)) &&
      ['Completed', 'Dispatched'].includes(job.status),
  )
  const selectedJob = selectedJobId ? jobs.find((job) => job.id === selectedJobId) : null

  return (
    <div className="flex min-h-screen flex-col items-center px-6 py-6">
      <div className="mb-5 flex w-full max-w-5xl items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Installer</h1>
          <div className="mt-1">
            <NameWithType person={installer} />
          </div>
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
                    Added on site
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

function NameWithType({ person, large = false, inline = false }) {
  if (!person) return null
  const content = (
    <>
      <span className={large ? 'text-lg font-semibold' : 'font-semibold'}>{person.name}</span>
      <TypeChip type={person.type} />
    </>
  )
  if (inline) return <span className="inline-flex items-center gap-2">{content}</span>
  return <div className="flex items-center gap-2">{content}</div>
}

function TypeChip({ type }) {
  return (
    <span
      className={`inline-flex rounded-full border px-2 py-0.5 text-[11px] font-semibold ${
        type === 'Employee'
          ? 'border-[#E5E7EB] bg-[#F1F1F4] text-[#52525B]'
          : 'border-blue-200 bg-blue-50 text-[#1E40AF]'
      }`}
    >
      {type}
    </span>
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

function buildInvoice(invoiceJobIds, jobs, installer) {
  if (installer.type !== 'Contractor') {
    return { jobs: [], planned: 0, quantityVariance: 0, addedOnSite: 0, total: 0 }
  }

  const rateByTask = Object.fromEntries(installer.rates.map((rate) => [rate.task, rate]))
  const invoiceJobs = invoiceJobIds
    .map((jobId) => jobs.find((item) => item.id === jobId))
    .filter((job) => job && job.status === 'Completed' && job.installerId === installer.id)
    .map((job) => {
      const seedLines = invoiceLinesSeed[job.id] ?? job.expected.map((line) => ({
        task: line.task,
        planned: line.qty,
        actual: line.qty,
      }))
      const lines = seedLines.map((line) => {
        const rate = rateByTask[line.task]
        const plannedAmount = line.planned * rate.rate
        const amount = line.actual * rate.rate
        const quantityVariance =
          line.planned > 0 && line.actual !== line.planned ? amount - plannedAmount : 0
        const addedOnSite = line.planned === 0 ? amount : 0
        return {
          ...line,
          unit: rate.unit,
          rate: rate.rate,
          plannedAmount,
          amount,
          quantityVariance,
          addedOnSite,
        }
      })
      return {
        ...job,
        lines,
        planned: lines.reduce((sum, line) => sum + line.plannedAmount, 0),
        quantityVariance: lines.reduce((sum, line) => sum + line.quantityVariance, 0),
        addedOnSite: lines.reduce((sum, line) => sum + line.addedOnSite, 0),
        total: lines.reduce((sum, line) => sum + line.amount, 0),
      }
    })

  return {
    jobs: invoiceJobs,
    planned: invoiceJobs.reduce((sum, job) => sum + job.planned, 0),
    quantityVariance: invoiceJobs.reduce((sum, job) => sum + job.quantityVariance, 0),
    addedOnSite: invoiceJobs.reduce((sum, job) => sum + job.addedOnSite, 0),
    total: invoiceJobs.reduce((sum, job) => sum + job.total, 0),
  }
}

function estimateJobAmount(job, installer) {
  const rateByTask = Object.fromEntries(installer.rates.map((rate) => [rate.task, rate]))
  const lines = invoiceLinesSeed[job.id] ?? job.expected.map((line) => ({
    task: line.task,
    actual: line.qty,
  }))
  return lines.reduce((sum, line) => sum + (rateByTask[line.task]?.rate ?? 0) * line.actual, 0)
}

export default App
