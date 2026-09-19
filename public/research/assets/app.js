/* Citation system: hover reveals the quote, click opens the source. */

const SOURCES = {
  "michelle-subs": {
    who: "Michelle, store manager — Carpet Place, Edison NJ",
    quote: "They're really subcontractors. If someone asks, we say they work for us, because they do work for us. They've been here three, four years.",
    href: "transcripts.html#cp-subs"
  },
  "michelle-price": {
    who: "Michelle, store manager — Carpet Place",
    quote: "If they do 100 yards, they get paid for 100 yards to rip up the old, 100 yards to install the new. And then steps — they get extra for steps. So everything has a price. Whatever they do, that's how they get paid.",
    href: "transcripts.html#cp-taskpay"
  },
  "michelle-book": {
    who: "Michelle, store manager — Carpet Place",
    quote: "We have a book. Once the job goes in the book, I'd send them the work order. And then they'd go do the job.",
    href: "transcripts.html#cp-book"
  },
  "michelle-weekly": {
    who: "Michelle, store manager — Carpet Place",
    quote: "Every week they turn in a bill. Of all the jobs they did, how many feet, how much they charge a foot, and then the total.",
    href: "transcripts.html#cp-weekly"
  },
  "michelle-invoice": {
    who: "Michelle, store manager — Carpet Place",
    quote: "You guys don't create this invoice. They do. They just type it up.",
    href: "transcripts.html#cp-invoice"
  },
  "michelle-phone": {
    who: "Michelle, store manager — Carpet Place",
    quote: "I like the phone because I like talking to someone to make sure it's really there.",
    href: "transcripts.html#cp-ordering"
  },
  "michelle-quote": {
    who: "Michelle, store manager — Carpet Place",
    quote: "Owner researched a flooring-specific system and was quoted roughly $6,000–7,000 upfront plus monthly fees. He judged it too expensive.",
    href: "transcripts.html#cp-software"
  },
  "michelle-samples": {
    who: "Michelle, store manager — Carpet Place",
    quote: "They come and go. The sales rep comes in and pulls out the discontinued ones, we throw them out, and new ones come, like every other day.",
    href: "transcripts.html#cp-samples"
  },
  "michelle-rep": {
    who: "Michelle, store manager — Carpet Place",
    quote: "For each product there's a sales rep. Some come in once a week. Some every two weeks. He came in and said, this is peel and stick tile, you could go over anything with it except carpet.",
    href: "transcripts.html#cp-reps"
  },
  "michelle-cca": {
    who: "Michelle, store manager — Carpet Place",
    quote: "Not in a buying group. Had never heard of CCA Global. Does not keep in contact with other flooring store owners.",
    href: "transcripts.html#cp-group"
  },
  "michelle-tile": {
    who: "Michelle, store manager — Carpet Place",
    quote: "They dropped tile — it's harder to estimate: size, shape, diagonal layouts, edging. Those customers go to Home Depot or Floor & Decor.",
    href: "transcripts.html#cp-tile"
  },
  "michelle-leveler": {
    who: "Michelle, store manager — Carpet Place",
    quote: "Say the floor was uneven — we can't tell that until we rip up the carpet. It's called leveler. It's like a cement.",
    href: "transcripts.html#cp-leveler"
  },
  "michelle-boss": {
    who: "Michelle, store manager — Carpet Place",
    quote: "There's one main boss. He has four or five different crews. If he has a big job, he'll bring all his crews with him. They get paid by the day, his installers, and he pays them.",
    href: "transcripts.html#cp-boss"
  },
  "michelle-negotiate": {
    who: "Michelle, store manager — Carpet Place",
    quote: "Negotiation happens 90% of the time with the customer. There's a percentage I can go down.",
    href: "transcripts.html#cp-negotiate"
  },
  "michelle-portal": {
    who: "Michelle, store manager — Carpet Place",
    quote: "Checks the mill's dealer portal with the customer present — unit price per square yard, colour, and live stock.",
    href: "transcripts.html#cp-portal"
  },
  "lynn-employees": {
    who: "Lynn, 40-year veteran — West Carpets, Rahway NJ",
    quote: "Our guys work for us. We do a lot of prevailing wage, and the state is strict about it.",
    href: "transcripts.html#wc-labor"
  },
  "lynn-racks": {
    who: "Lynn — West Carpets",
    quote: "We used to be, but we're not anymore. We don't do that much residential, it costs too much, and they charge you for everything. They nickel-and-dime these retailers.",
    href: "transcripts.html#wc-racks"
  },
  "lynn-spec": {
    who: "Lynn — West Carpets",
    quote: "An architect picks every finish. It goes out to bid to four or five construction companies. We bid to the GC — we're one sub among many. If their GC loses, we lose.",
    href: "transcripts.html#wc-bid"
  },
  "lynn-discontinued": {
    who: "Lynn — West Carpets",
    quote: "Product specified in January was discontinued by September. I had to email the client and ask whether to buy the old product or switch.",
    href: "transcripts.html#wc-revisions"
  },
  "lynn-sku": {
    who: "Lynn — West Carpets",
    quote: "The style is the SKU, and then there are all the colours underneath it. Pricing comes from the rep by email, based on quantity.",
    href: "transcripts.html#wc-sku"
  },
  "lynn-momandpop": {
    who: "Lynn — West Carpets",
    quote: "Most of your mom and pops aren't gonna have any system. Everything's done by hand still. They're very cheap — they typically start up in their house.",
    href: "transcripts.html#wc-market"
  },
  "lynn-kane": {
    who: "Lynn — West Carpets",
    quote: "Named the Kane Carpet episode independently: a Secaucus distributor whose computer system failed in the 90s, leaving them unable to invoice.",
    href: "transcripts.html#wc-kane"
  },
  "karen-prices": {
    who: "Karen, showroom manager — Standard Tile, Edison NJ",
    quote: "Prices aren't marked. Tariffs, and diesel is over six dollars a gallon — trucks move everything, so costs change quarterly.",
    href: "transcripts.html#st-pricing"
  },
  "karen-inventory": {
    who: "Karen — Standard Tile",
    quote: "It's in the computer. Twenty cases go out, the count drops by twenty. And I can see all five stores.",
    href: "transcripts.html#st-inventory"
  },
  "karen-lot": {
    who: "Karen — Standard Tile",
    quote: "The manufacturer makes X amount. On a re-run the colour may not match. We've had products we liked discontinued because they couldn't reproduce the colour.",
    href: "transcripts.html#st-lot"
  },
  "karen-fd": {
    who: "Karen — Standard Tile",
    quote: "Floor & Decor is cheaper but the quality is lower — it's largely Chinese, ours is European. Some contractors won't install their product.",
    href: "transcripts.html#st-competition"
  },
  "karen-racks": {
    who: "Karen — Standard Tile",
    quote: "The manufacturer supplies the display. Some are free. Some charge you and refund it once you hit a sales number.",
    href: "transcripts.html#st-racks"
  },
  "karen-b2b": {
    who: "Karen — Standard Tile",
    quote: "For at least half our manufacturers we can check whether the stock is in New Jersey, Virginia or Texas.",
    href: "transcripts.html#st-b2b"
  },
  "nicole-ahead": {
    who: "Nicole, family owner — Royal Stone Cabinet & Tile, Flushing NY",
    quote: "Orders are placed before customer demand, with small trial orders for new styles. Lead time is two to three months. Inventory is reviewed and cleared monthly; slow movers get pushed to contractors, who are less style-sensitive.",
    href: "transcripts.html#rs-inventory"
  },
  "nicole-factories": {
    who: "Nicole — Royal Stone",
    quote: "Sources from Malaysia, Indonesia, Thailand and Spain — deliberately not China, because of tariffs. Visits the factories twice a year to check quality, colour and style.",
    href: "transcripts.html#rs-sourcing"
  },
  "nicole-sku": {
    who: "Nicole — Royal Stone",
    quote: "The code on each tile is the supplier's item number, not an internal one. The supplier assigns it; Royal Stone uses it to identify the exact product on reorder. No brand logos on the site, because they work with different overseas factories.",
    href: "transcripts.html#rs-sku"
  },
  "nicole-tech": {
    who: "Nicole — Royal Stone",
    quote: "WeChat, WhatsApp, Gmail, Excel and QuickBooks. No inventory or business management software. Open to exploring it, but concerned it can't keep up with a one-to-two-month turnover cycle.",
    href: "transcripts.html#rs-tech"
  },
  "nicole-ops": {
    who: "Nicole — Royal Stone",
    quote: "Thirty employees across fabrication, warehouse, sales, install and delivery. Five installers, a mix of employees and contractors. Estimators are a separate role. Installer schedules are optimised by customer address.",
    href: "transcripts.html#rs-ops"
  },
  "ww-samples": {
    who: "Senior salesperson — Worldwide Flooring, Edison NJ",
    quote: "We're not a sample store. Samples get ordered — about five dollars for carpet, twenty for tile.",
    href: "transcripts.html#ww-samples"
  },
  "ww-position": {
    who: "Senior salesperson — Worldwide Flooring",
    quote: "Home Depot sells flooring material. We're a flooring company.",
    href: "transcripts.html#ww-position"
  },
  "ww-traffic": {
    who: "Senior salesperson — Worldwide Flooring",
    quote: "We used to get about fifty customers on a Saturday. Now it's about ten.",
    href: "transcripts.html#ww-traffic"
  },
  "ww-contractors": {
    who: "Senior salesperson — Worldwide Flooring",
    quote: "Both the estimators and the installers are outside contractors, not employees.",
    href: "transcripts.html#ww-labor"
  },
  "ww-proprietary": {
    who: "Marty Schlesinger, new business development — Worldwide Flooring",
    quote: "Declined to discuss the company's technology, describing it as proprietary. Offered to take questions by email.",
    href: "transcripts.html#ww-tech"
  },
  "huey-bypass": {
    who: "Huey Ho, contractor and architect",
    quote: "Large contractors — a hundred-unit apartment building — buy direct from manufacturers or wholesalers, not retailers. Wholesalers like MSI also sell to homeowners directly.",
    href: "transcripts.html#hh-chain"
  },
  "huey-repeat": {
    who: "Huey Ho, contractor and architect",
    quote: "Small retailers don't track repeat customers. Homeowners rarely return. Contractors are the repeat business.",
    href: "transcripts.html#hh-repeat"
  },
  "huey-catalog": {
    who: "Huey Ho, contractor and architect",
    quote: "Small retailers carry lines from many different companies and lack the staff to maintain a product database. There's no integration between retailer and wholesaler systems — two entirely separate stacks.",
    href: "transcripts.html#hh-tech"
  },
  "huey-architect": {
    who: "Huey Ho, contractor and architect",
    quote: "Manufacturers market to architects and interior designers, often visiting firms with a local rep or retailer in tow. The architect specifies the material; the contractor sources it.",
    href: "transcripts.html#hh-spec"
  },
  "diane-racks": {
    who: "Diane, owner — Windsor Kitchen & Bath",
    quote: "MSI gave her sample racks for tile. She doesn't sell flooring. Nothing ever sold, and the racks have been sitting there since.",
    href: "transcripts.html#diane"
  }
};

(function(){
  const tip = document.createElement('div');
  tip.id = 'tip';
  document.body.appendChild(tip);

  let hideTimer;

  function show(el){
    clearTimeout(hideTimer);
    const s = SOURCES[el.dataset.src];
    if(!s) return;
    tip.innerHTML = '<span class="who">' + s.who + '</span>' + s.quote +
                    '<span class="go">Click to open the source</span>';
    tip.classList.add('on');
    const r = el.getBoundingClientRect();
    const w = Math.min(400, window.innerWidth - 32);
    tip.style.width = w + 'px';
    let left = r.left + window.scrollX;
    if(left + w > window.innerWidth - 16) left = window.innerWidth - w - 16;
    if(left < 16) left = 16;
    tip.style.left = left + 'px';
    const th = tip.offsetHeight;
    let top = r.top + window.scrollY - th - 10;
    if(top < window.scrollY + 8) top = r.bottom + window.scrollY + 10;
    tip.style.top = top + 'px';
  }
  function hide(){
    hideTimer = setTimeout(function(){ tip.classList.remove('on'); }, 90);
  }

  document.querySelectorAll('cite.c').forEach(function(el){
    const s = SOURCES[el.dataset.src];
    if(s){
      el.setAttribute('tabindex','0');
      el.setAttribute('role','link');
      el.setAttribute('aria-label','Source: ' + s.who);
    }
    el.addEventListener('mouseenter', function(){ show(el); });
    el.addEventListener('focus', function(){ show(el); });
    el.addEventListener('mouseleave', hide);
    el.addEventListener('blur', hide);
    el.addEventListener('click', function(){
      const s = SOURCES[el.dataset.src];
      if(s) window.location.href = s.href;
    });
    el.addEventListener('keydown', function(e){
      if(e.key === 'Enter' || e.key === ' '){
        e.preventDefault();
        const s = SOURCES[el.dataset.src];
        if(s) window.location.href = s.href;
      }
    });
  });

  // number the citations in document order
  document.querySelectorAll('cite.c').forEach(function(el, i){
    if(!el.querySelector('sup')){
      const sup = document.createElement('sup');
      sup.textContent = i + 1;
      el.appendChild(sup);
    }
  });
})();
