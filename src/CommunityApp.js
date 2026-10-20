class CommunityApp {
  constructor() {
    this.container = null;
  }

  async run(env) {
    this.container = env.container;
    this.container.innerHTML = '';

    const wrap = makeElement('div', {
      style: {
        maxWidth: '860px',
        margin: '40px auto',
        padding: '24px',
        background: '#090d16',
        border: '1.5px solid #232d3f',
        borderRadius: '12px',
        color: '#f8fafc',
        fontFamily: 'system-ui, sans-serif'
      }
    }, [
      makeElement('div', { style: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' } }, [
        makeElement('span', { style: { fontSize: '24px' } }, '🌐'),
        makeElement('h1', { style: { fontSize: '20px', color: '#00f2fe', margin: 0 } }, 'Community Identity & Reputation Oracle')
      ]),
      makeElement('p', { style: { color: '#94a3b8', fontSize: '13px', lineHeight: '1.6' } },
        'The Community app provides the federated identity ledger and Web-of-Trust reputation vectors. Comments and Voting query this oracle to determine vote weight, prominence scaling, and probationary filtering.'
      ),
      makeElement('div', { id: 'community-profiles-grid', style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px', marginTop: '20px' } })
    ]);

    this.container.appendChild(wrap);

    const grid = wrap.querySelector('#community-profiles-grid');
    CommunityOracle.profiles.forEach(prof => {
      grid.appendChild(makeElement('div', {
        style: {
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid #1e293b',
          borderRadius: '8px',
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px'
        }
      }, [
        makeElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } }, [
          makeElement('strong', { style: { color: '#00f2fe', fontSize: '13px' } }, `${prof.name} #${prof.tag}`),
          makeElement('span', {
            style: { background: 'rgba(0, 242, 254, 0.15)', color: '#00f2fe', padding: '1px 6px', borderRadius: '10px', fontSize: '10px', fontFamily: 'monospace' }
          }, `${Math.round(prof.reputation * 100)}% Rep`)
        ]),
        makeElement('div', { style: { display: 'flex', gap: '4px', flexWrap: 'wrap' } },
          prof.badges.map(b => makeElement('span', {
            style: { background: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8', padding: '1px 6px', borderRadius: '4px', fontSize: '9.5px' }
          }, b))
        ),
        makeElement('div', { style: { fontSize: '11px', color: '#64748b', marginTop: '4px' } }, `Polls Authored: ${prof.pollsCreated}`)
      ]));
    });

    return this;
  }
}
globalThis.CommunityApp = CommunityApp;
if (typeof module !== 'undefined' && module.exports) module.exports = CommunityApp;
