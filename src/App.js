import { useState, useMemo } from "react";
import "./App.css";

const VER = "16.5.1";
const IMG = (id) => `https://ddragon.leagueoflegends.com/cdn/${VER}/img/champion/${id}.png`;

const CHAMPS = [
  {id:"Aatrox",name:"아트록스",t:"전사"},{id:"Ahri",name:"아리",t:"마법사"},
  {id:"Akali",name:"아칼리",t:"암살자"},{id:"Akshan",name:"아크샨",t:"원딜"},
  {id:"Alistar",name:"알리스타",t:"탱커"},{id:"Amumu",name:"아무무",t:"탱커"},
  {id:"Ambessa",name:"앰베사",t:"전사"},
  {id:"Anivia",name:"애니비아",t:"마법사"},{id:"Annie",name:"애니",t:"마법사"},
  {id:"Aphelios",name:"아펠리오스",t:"원딜"},{id:"Ashe",name:"애쉬",t:"원딜"},
  {id:"AurelionSol",name:"아우렐리온 솔",t:"마법사"},{id:"Aurora",name:"오로라",t:"마법사"},
  {id:"Azir",name:"아지르",t:"마법사"},{id:"Bard",name:"바드",t:"서포터"},
  {id:"Belveth",name:"벨베스",t:"전사"},{id:"Blitzcrank",name:"블리츠크랭크",t:"탱커"},
  {id:"Brand",name:"브랜드",t:"마법사"},{id:"Braum",name:"브라움",t:"서포터"},
  {id:"Briar",name:"브라이어",t:"전사"},{id:"Caitlyn",name:"케이틀린",t:"원딜"},
  {id:"Camille",name:"카밀",t:"전사"},{id:"Cassiopeia",name:"카시오페아",t:"마법사"},
  {id:"Chogath",name:"초가스",t:"탱커"},{id:"Corki",name:"코르키",t:"원딜"},
  {id:"Darius",name:"다리우스",t:"전사"},{id:"Diana",name:"다이애나",t:"전사"},
  {id:"DrMundo",name:"문도 박사",t:"탱커"},{id:"Draven",name:"드레이븐",t:"원딜"},
  {id:"Ekko",name:"에코",t:"암살자"},{id:"Elise",name:"엘리스",t:"마법사"},
  {id:"Evelynn",name:"이블린",t:"암살자"},{id:"Ezreal",name:"이즈리얼",t:"원딜"},
  {id:"Fiddlesticks",name:"피들스틱",t:"마법사"},{id:"Fiora",name:"피오라",t:"전사"},
  {id:"Fizz",name:"피즈",t:"암살자"},{id:"Galio",name:"갈리오",t:"탱커"},
  {id:"Gangplank",name:"갱플랭크",t:"전사"},{id:"Garen",name:"가렌",t:"전사"},
  {id:"Gnar",name:"나르",t:"전사"},{id:"Gragas",name:"그라가스",t:"전사"},
  {id:"Graves",name:"그레이브즈",t:"원딜"},{id:"Gwen",name:"그웬",t:"전사"},
  {id:"Hecarim",name:"헤카림",t:"전사"},{id:"Heimerdinger",name:"하이머딩거",t:"마법사"},
  {id:"Hwei",name:"훼이",t:"마법사"},{id:"Illaoi",name:"일라오이",t:"전사"},
  {id:"Irelia",name:"이렐리아",t:"전사"},{id:"Ivern",name:"아이번",t:"서포터"},
  {id:"Janna",name:"잔나",t:"서포터"},{id:"JarvanIV",name:"자르반 4세",t:"탱커"},
  {id:"Jax",name:"잭스",t:"전사"},{id:"Jayce",name:"제이스",t:"전사"},
  {id:"Jhin",name:"진",t:"원딜"},{id:"Jinx",name:"징크스",t:"원딜"},
  {id:"KSante",name:"크산테",t:"탱커"},{id:"Kaisa",name:"카이사",t:"원딜"},
  {id:"Kalista",name:"칼리스타",t:"원딜"},{id:"Karma",name:"카르마",t:"서포터"},
  {id:"Karthus",name:"카서스",t:"마법사"},{id:"Kassadin",name:"카사딘",t:"암살자"},
  {id:"Katarina",name:"카타리나",t:"암살자"},{id:"Kayle",name:"케일",t:"전사"},
  {id:"Kayn",name:"케인",t:"암살자"},{id:"Kennen",name:"케넨",t:"마법사"},
  {id:"Khazix",name:"카직스",t:"암살자"},{id:"Kindred",name:"킨드레드",t:"원딜"},
  {id:"Kled",name:"클레드",t:"전사"},{id:"KogMaw",name:"코그모",t:"원딜"},
  {id:"Leblanc",name:"르블랑",t:"암살자"},{id:"LeeSin",name:"리 신",t:"전사"},
  {id:"Leona",name:"레오나",t:"탱커"},{id:"Lillia",name:"릴리아",t:"마법사"},
  {id:"Lissandra",name:"리산드라",t:"마법사"},{id:"Lucian",name:"루시안",t:"원딜"},
  {id:"Lulu",name:"룰루",t:"서포터"},{id:"Lux",name:"럭스",t:"마법사"},
  {id:"Malphite",name:"말파이트",t:"탱커"},{id:"Malzahar",name:"말자하",t:"마법사"},
  {id:"Maokai",name:"마오카이",t:"탱커"},{id:"MasterYi",name:"마스터 이",t:"암살자"},
  {id:"Mel",name:"멜",t:"마법사"},
  {id:"Milio",name:"밀리오",t:"서포터"},{id:"MissFortune",name:"미스 포츈",t:"원딜"},
  {id:"Mordekaiser",name:"모데카이저",t:"전사"},{id:"Morgana",name:"모르가나",t:"서포터"},
  {id:"Naafiri",name:"나피리",t:"암살자"},{id:"Nami",name:"나미",t:"서포터"},
  {id:"Nasus",name:"나서스",t:"전사"},{id:"Nautilus",name:"노틸러스",t:"탱커"},
  {id:"Neeko",name:"니코",t:"마법사"},{id:"Nidalee",name:"니달리",t:"암살자"},
  {id:"Nilah",name:"닐라",t:"전사"},{id:"Nocturne",name:"녹턴",t:"암살자"},
  {id:"Nunu",name:"누누와 윌럼프",t:"탱커"},{id:"Olaf",name:"올라프",t:"전사"},
  {id:"Orianna",name:"오리아나",t:"마법사"},{id:"Ornn",name:"오른",t:"탱커"},
  {id:"Pantheon",name:"판테온",t:"전사"},{id:"Poppy",name:"뽀삐",t:"탱커"},
  {id:"Pyke",name:"파이크",t:"암살자"},{id:"Qiyana",name:"키아나",t:"암살자"},
  {id:"Quinn",name:"퀸",t:"암살자"},{id:"Rakan",name:"라칸",t:"서포터"},
  {id:"Rammus",name:"람머스",t:"탱커"},{id:"RekSai",name:"렉사이",t:"전사"},
  {id:"Rell",name:"렐",t:"탱커"},{id:"Renata",name:"레나타 글라스크",t:"서포터"},
  {id:"Renekton",name:"레넥톤",t:"전사"},{id:"Rengar",name:"렝가",t:"암살자"},
  {id:"Riven",name:"리븐",t:"전사"},{id:"Rumble",name:"럼블",t:"전사"},
  {id:"Ryze",name:"라이즈",t:"마법사"},{id:"Samira",name:"사미라",t:"원딜"},
  {id:"Sejuani",name:"세주아니",t:"탱커"},{id:"Senna",name:"세나",t:"서포터"},
  {id:"Seraphine",name:"세라핀",t:"서포터"},{id:"Sett",name:"세트",t:"전사"},
  {id:"Shaco",name:"샤코",t:"암살자"},{id:"Shen",name:"쉔",t:"탱커"},
  {id:"Shyvana",name:"쉬바나",t:"전사"},{id:"Singed",name:"신지드",t:"탱커"},
  {id:"Sion",name:"사이온",t:"탱커"},{id:"Sivir",name:"시비르",t:"원딜"},
  {id:"Skarner",name:"스카너",t:"탱커"},{id:"Smolder",name:"스몰더",t:"원딜"},
  {id:"Sona",name:"소나",t:"서포터"},{id:"Soraka",name:"소라카",t:"서포터"},
  {id:"Swain",name:"스웨인",t:"마법사"},{id:"Sylas",name:"사일러스",t:"마법사"},
  {id:"Syndra",name:"신드라",t:"마법사"},{id:"TahmKench",name:"탐 켄치",t:"서포터"},
  {id:"Taliyah",name:"탈리야",t:"마법사"},{id:"Talon",name:"탈론",t:"암살자"},
  {id:"Taric",name:"타릭",t:"서포터"},{id:"Teemo",name:"티모",t:"마법사"},
  {id:"Thresh",name:"쓰레쉬",t:"서포터"},{id:"Tristana",name:"트리스타나",t:"원딜"},
  {id:"Trundle",name:"트런들",t:"전사"},{id:"Tryndamere",name:"트린다미어",t:"전사"},
  {id:"TwistedFate",name:"트위스티드 페이트",t:"마법사"},{id:"Twitch",name:"트위치",t:"원딜"},
  {id:"Udyr",name:"우디르",t:"전사"},{id:"Urgot",name:"우르곳",t:"전사"},
  {id:"Varus",name:"바루스",t:"원딜"},{id:"Vayne",name:"베인",t:"원딜"},
  {id:"Veigar",name:"베이가",t:"마법사"},{id:"Velkoz",name:"벨코즈",t:"마법사"},
  {id:"Vex",name:"벡스",t:"마법사"},{id:"Vi",name:"바이",t:"전사"},
  {id:"Viego",name:"비에고",t:"암살자"},{id:"Viktor",name:"빅토르",t:"마법사"},
  {id:"Vladimir",name:"블라디미르",t:"마법사"},{id:"Volibear",name:"볼리베어",t:"탱커"},
  {id:"Warwick",name:"워윅",t:"전사"},{id:"MonkeyKing",name:"오공",t:"전사"},
  {id:"Xayah",name:"자야",t:"원딜"},{id:"Xerath",name:"제라스",t:"마법사"},
  {id:"XinZhao",name:"신 짜오",t:"전사"},{id:"Yasuo",name:"야스오",t:"전사"},
  {id:"Yone",name:"요네",t:"전사"},{id:"Yorick",name:"요릭",t:"전사"},
  {id:"Yunara",name:"유나라",t:"원딜"},
  {id:"Yuumi",name:"유미",t:"서포터"},{id:"Zac",name:"자크",t:"탱커"},
  {id:"Zaahen",name:"자헨",t:"전사"},
  {id:"Zed",name:"제드",t:"암살자"},{id:"Zeri",name:"제리",t:"원딜"},
  {id:"Ziggs",name:"직스",t:"마법사"},{id:"Zilean",name:"질리언",t:"서포터"},
  {id:"Zoe",name:"조이",t:"마법사"},{id:"Zyra",name:"자이라",t:"마법사"},
].sort((a, b) => a.name.localeCompare(b.name, "ko"));

const DRAFT = [
  {phase:"ban", team:1, label:"블루 밴"},
  {phase:"ban", team:2, label:"레드 밴"},
  {phase:"ban", team:1, label:"블루 밴"},
  {phase:"ban", team:2, label:"레드 밴"},
  {phase:"ban", team:1, label:"블루 밴"},
  {phase:"ban", team:2, label:"레드 밴"},
  {phase:"pick",team:1, label:"블루 픽"},
  {phase:"pick",team:2, label:"레드 픽"},
  {phase:"pick",team:2, label:"레드 픽"},
  {phase:"pick",team:1, label:"블루 픽"},
  {phase:"pick",team:1, label:"블루 픽"},
  {phase:"pick",team:2, label:"레드 픽"},
  {phase:"ban", team:1, label:"블루 밴"},
  {phase:"ban", team:2, label:"레드 밴"},
  {phase:"ban", team:1, label:"블루 밴"},
  {phase:"ban", team:2, label:"레드 밴"},
  {phase:"pick",team:2, label:"레드 픽"},
  {phase:"pick",team:1, label:"블루 픽"},
  {phase:"pick",team:1, label:"블루 픽"},
  {phase:"pick",team:2, label:"레드 픽"},
];
const TOTAL = DRAFT.length;
const TABS = ["전체","전사","마법사","암살자","원딜","탱커","서포터"];

// ─── Setup ────────────────────────────────────────────────────────────────────
function Setup({ onStart }) {
  const [t1, setT1] = useState("블루팀");
  const [t2, setT2] = useState("레드팀");
  const [n, setN] = useState(3);
  return (
    <div className="setup">
      <div className="setup-card">
        <div className="setup-title">FEARLESS DRAFT</div>
        <div className="setup-sub">리그 오브 레전드 · 페어리스 밴픽</div>
        <div className="setup-row">
          <div>
            <label className="setup-label">🔵 블루팀 이름</label>
            <input className="setup-input" value={t1} onChange={e => setT1(e.target.value)} />
          </div>
          <div>
            <label className="setup-label">🔴 레드팀 이름</label>
            <input className="setup-input" value={t2} onChange={e => setT2(e.target.value)} />
          </div>
        </div>
        <label className="setup-label" style={{display:"block",textAlign:"center",marginBottom:"10px"}}>총 게임 수</label>
        <div className="seg">
          {[1,3,5].map(x => (
            <button key={x} className={`seg-btn${n===x?" on":""}`} onClick={() => setN(x)}>
              {x===1?"Bo1":x===3?"Bo3":"Bo5"}
            </button>
          ))}
        </div>
        <button className="start-btn" onClick={() => onStart({t1,t2,n})}>⚔　드래프트 시작</button>
      </div>
    </div>
  );
}

// ─── 진영 선택 모달 ────────────────────────────────────────────────────────────
function SideModal({ gameNum, t1, t2, onConfirm, onCancel }) {
  return (
    <div style={{
      position:"fixed", inset:0, background:"rgba(0,0,0,.85)",
      display:"flex", alignItems:"center", justifyContent:"center", zIndex:9999
    }}>
      <div style={{
        background:"#0D1017", border:"1px solid #C89B3C",
        padding:"44px 48px", minWidth:"400px", textAlign:"center",
        boxShadow:"0 0 60px rgba(200,155,60,.2)"
      }}>
        <div style={{fontFamily:"'Cinzel',serif", fontSize:"1.1rem", color:"#C89B3C", letterSpacing:"4px", marginBottom:"6px"}}>
          GAME {gameNum}
        </div>
        <div style={{fontSize:".82rem", color:"#48536A", letterSpacing:"1px", marginBottom:"36px"}}>
          다음 게임 진영을 선택하세요
        </div>
        <div style={{display:"flex", gap:"16px", justifyContent:"center", marginBottom:"20px"}}>
          <button onClick={() => onConfirm(false)} style={{
            background:"rgba(11,196,227,.08)", border:"2px solid #0BC4E3", color:"#0BC4E3",
            padding:"20px 24px", cursor:"pointer", minWidth:"155px",
            fontFamily:"'Noto Sans KR',sans-serif", lineHeight:"1.7", borderRadius:0
          }}>
            <div style={{fontSize:"1.5rem", marginBottom:"6px"}}>🔵</div>
            <div style={{fontSize:".95rem", fontWeight:700}}>{t1}</div>
            <div style={{fontSize:".72rem", opacity:.6, marginTop:"3px"}}>블루 유지</div>
          </button>
          <button onClick={() => onConfirm(true)} style={{
            background:"rgba(232,64,87,.08)", border:"2px solid #E84057", color:"#E84057",
            padding:"20px 24px", cursor:"pointer", minWidth:"155px",
            fontFamily:"'Noto Sans KR',sans-serif", lineHeight:"1.7", borderRadius:0
          }}>
            <div style={{fontSize:"1.5rem", marginBottom:"6px"}}>🔴</div>
            <div style={{fontSize:".95rem", fontWeight:700}}>{t1}</div>
            <div style={{fontSize:".72rem", opacity:.6, marginTop:"3px"}}>진영 교체</div>
          </button>
        </div>
        <button onClick={onCancel} style={{
          background:"transparent", border:"1px solid #1E2430", color:"#48536A",
          padding:"7px 22px", cursor:"pointer", fontFamily:"'Noto Sans KR',sans-serif", fontSize:".75rem"
        }}>취소</button>
      </div>
    </div>
  );
}

// ─── ChampCard ────────────────────────────────────────────────────────────────
function ChampCard({ champ, state, onClick }) {
  const cls = ["champ-card", state !== "n" ? `cc-${state}` : ""].join(" ").trim();
  return (
    <div className={cls} onClick={onClick} title={champ.name}>
      <img src={IMG(champ.id)} alt={champ.name} className="champ-img"
        onError={e => { e.target.style.display = "none"; }} />
      <span className="champ-name">{champ.name}</span>
    </div>
  );
}

// ─── Slot ─────────────────────────────────────────────────────────────────────
function Slot({ action, idx, phase, side, active }) {
  const isBan = phase === "ban";
  const champ = action ? CHAMPS.find(c => c.id === action.id) : null;
  const name  = champ ? champ.name : "—";
  const cls = [
    "slot",
    side === "blue" ? (isBan ? "slot-bb" : "slot-bp") : (isBan ? "slot-rb" : "slot-rp"),
    action ? "slot-filled" : "slot-empty",
    active ? "slot-active" : "",
  ].join(" ");
  return (
    <div className={cls}>
      {action
        ? <img src={IMG(action.id)} alt={name} className="slot-img"
            onError={e => { e.target.style.display = "none"; }} />
        : <div className="slot-ph">{idx + 1}</div>
      }
      <span className="slot-name">{name}</span>
      {isBan && action && <span className="ban-x">✕</span>}
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen]             = useState("setup");
  const [cfg, setCfg]                   = useState(null);
  const [step, setStep]                 = useState(0);
  const [acts, setActs]                 = useState([]);
  const [sel, setSel]                   = useState(null);
  const [q, setQ]                       = useState("");
  const [tab, setTab]                   = useState("전체");
  const [fear, setFear]                 = useState([]);
  const [hist, setHist]                 = useState([]);
  const [showSideModal, setShowSideModal] = useState(false);

  const done = step >= TOTAL;
  const cur  = done ? null : DRAFT[step];

  const banned  = new Set(acts.filter(a => a.phase === "ban").map(a => a.id));
  const picked  = new Set(acts.filter(a => a.phase === "pick").map(a => a.id));
  const fearSet = new Set(fear);

  const bBans  = acts.filter(a => a.phase === "ban"  && a.team === 1);
  const rBans  = acts.filter(a => a.phase === "ban"  && a.team === 2);
  const bPicks = acts.filter(a => a.phase === "pick" && a.team === 1);
  const rPicks = acts.filter(a => a.phase === "pick" && a.team === 2);

  function cSt(id) {
    if (banned.has(id) || picked.has(id)) return "off";
    if (fearSet.has(id)) return "fear";
    if (sel === id) return cur?.phase === "ban" ? "sel-ban" : "sel-pick";
    return "n";
  }

  function handleClick(id) {
    if (cSt(id) === "off" || cSt(id) === "fear" || done) return;
    setSel(p => p === id ? null : id);
  }

  function commit(phase) {
    if (!sel || !cur || cur.phase !== phase) return;
    setActs(p => [...p, { id: sel, phase, team: cur.team }]);
    setStep(p => p + 1);
    setSel(null);
  }

  function undo() {
    if (!acts.length) return;
    setActs(p => p.slice(0, -1));
    setStep(p => p - 1);
    setSel(null);
  }

  function isSlotActive(team, phase, idx) {
    if (done || !cur) return false;
    if (cur.phase !== phase || cur.team !== team) return false;
    return acts.filter(a => a.phase === phase && a.team === team).length === idx;
  }

  function start(c) {
    setCfg(c); setFear([]); setHist([]);
    setStep(0); setActs([]); setSel(null); setQ(""); setTab("전체");
    setShowSideModal(false);
    setScreen("draft");
  }

  function handleNextGame(swapSide) {
    const picks = [...bPicks, ...rPicks].map(a => a.id);
    setFear(p => [...new Set([...p, ...picks])]);
    setHist(p => [...p, { b: bPicks.map(a => a.id), r: rPicks.map(a => a.id) }]);
    if (swapSide) setCfg(p => ({ ...p, t1: p.t2, t2: p.t1 }));
    setShowSideModal(false);
    setStep(0); setActs([]); setSel(null); setQ(""); setTab("전체");
  }

  function reset() {
    setScreen("setup"); setFear([]); setHist([]);
    setStep(0); setActs([]); setSel(null); setQ(""); setTab("전체");
    setShowSideModal(false);
  }

  const filtered = useMemo(() => CHAMPS.filter(c => {
    const matchQ = !q || c.name.includes(q) || c.id.toLowerCase().includes(q.toLowerCase());
    const matchT = tab === "전체" || c.t === tab;
    return matchQ && matchT;
  }), [q, tab]);

  const gameNum = hist.length + 1;

  if (screen === "setup") return <Setup onStart={start} />;

  return (
    <div className="app">

      {/* 진영 선택 모달 */}
      {showSideModal && (
        <SideModal
          gameNum={gameNum + 1}
          t1={cfg?.t1}
          t2={cfg?.t2}
          onConfirm={handleNextGame}
          onCancel={() => setShowSideModal(false)}
        />
      )}

      {/* Header */}
      <header className="header">
        <div className="logo">FEARLESS DRAFT</div>
        <div className="header-center">
          <span className="badge badge-blue">{cfg?.t1}</span>
          <span className="vs-text">VS</span>
          <span className="badge badge-red">{cfg?.t2}</span>
          {cfg?.n > 1 && <span className="badge badge-gold">GAME {gameNum}/{cfg.n}</span>}
        </div>
        <button className="back-btn" onClick={reset}>↩ 처음으로</button>
      </header>

      <div className="layout">

        {/* 블루팀 */}
        <div className="team-col">
          <div className="team-header blue">{cfg?.t1}</div>
          <div className="phase-label">— 밴 1페이즈 —</div>
          {[0,1,2].map(i => <Slot key={i} action={bBans[i]}  idx={i} phase="ban"  side="blue" active={isSlotActive(1,"ban",i)}  />)}
          <div className="phase-label">— 픽 1페이즈 —</div>
          {[0,1,2].map(i => <Slot key={i} action={bPicks[i]} idx={i} phase="pick" side="blue" active={isSlotActive(1,"pick",i)} />)}
          <div className="phase-label">— 밴 2페이즈 —</div>
          {[3,4].map(i =>   <Slot key={i} action={bBans[i]}  idx={i} phase="ban"  side="blue" active={isSlotActive(1,"ban",i)}  />)}
          <div className="phase-label">— 픽 2페이즈 —</div>
          {[3,4].map(i =>   <Slot key={i} action={bPicks[i]} idx={i} phase="pick" side="blue" active={isSlotActive(1,"pick",i)} />)}
        </div>

        {/* 센터 */}
        <div className="center-col">

          {/* 상태 바 */}
          <div className="status-bar">
            {done
              ? <span className="status-text done">✦ 드래프트 완료</span>
              : <span className={`status-text ${cur.team===1?"blue":"red"}`}>
                  {cur.team===1?"🔵":"🔴"} {cur.label} — {cur.phase==="ban"?"밴 선택":"픽 선택"}
                </span>
            }
            <div className="progress-bar">
              <div className="progress-fill" style={{width:`${(step/TOTAL)*100}%`}} />
            </div>
            <span className="step-count">{step}/{TOTAL}</span>
          </div>

          {/* 밴픽 컨트롤 */}
          {!done && (
            <>
              <div className="control-row">
                <input className="search-input" placeholder="챔피언 검색 (한글/영문)…"
                  value={q} onChange={e => setQ(e.target.value)} />
                <button className="action-btn ban-btn" onClick={() => commit("ban")}
                  disabled={!sel || cur?.phase !== "ban"}>밴</button>
                <button className="action-btn pick-btn" onClick={() => commit("pick")}
                  disabled={!sel || cur?.phase !== "pick"}>픽</button>
                <button className="action-btn undo-btn" onClick={undo} disabled={!acts.length}>↩</button>
              </div>
              <div className="tab-row">
                {TABS.map(t => (
                  <button key={t} className={`tab-btn${tab===t?" active":""}`}
                    onClick={() => setTab(t)}>{t}</button>
                ))}
              </div>
              <div className="champ-grid">
                {filtered.map(c => (
                  <ChampCard key={c.id} champ={c} state={cSt(c.id)} onClick={() => handleClick(c.id)} />
                ))}
              </div>
            </>
          )}

          {/* 페어리스 패널 */}
          {fear.length > 0 && (
            <div className="fear-panel">
              <div className="fear-title">⛔ 페어리스 금지 ({fear.length}개) — 이전 게임 픽</div>
              <div className="fear-list">
                {fear.map(id => {
                  const champ = CHAMPS.find(c => c.id === id);
                  return (
                    <div key={id} className="fear-tag">
                      <img src={IMG(id)} alt={id} className="fear-img"
                        onError={e => { e.target.style.display="none"; }} />
                      <span>{champ?.name ?? id}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 드래프트 완료 결과 */}
          {done && (
            <div className="result-box">
              <div className="result-title">⚔ DRAFT COMPLETE</div>
              <div className="result-grid">
                <div>
                  <div className="result-team-title blue">{cfg?.t1} — 픽</div>
                  {bPicks.map((a,i) => {
                    const champ = CHAMPS.find(c => c.id === a.id);
                    return (
                      <div key={i} className="result-pick">
                        <img src={IMG(a.id)} alt={a.id} className="result-img"
                          onError={e => { e.target.style.display="none"; }} />
                        <span>{champ?.name ?? a.id}</span>
                      </div>
                    );
                  })}
                  <div className="result-bans">
                    밴: {bBans.map(a => CHAMPS.find(c=>c.id===a.id)?.name??a.id).join(" / ")}
                  </div>
                </div>
                <div>
                  <div className="result-team-title red">{cfg?.t2} — 픽</div>
                  {rPicks.map((a,i) => {
                    const champ = CHAMPS.find(c => c.id === a.id);
                    return (
                      <div key={i} className="result-pick">
                        <img src={IMG(a.id)} alt={a.id} className="result-img"
                          onError={e => { e.target.style.display="none"; }} />
                        <span>{champ?.name ?? a.id}</span>
                      </div>
                    );
                  })}
                  <div className="result-bans">
                    밴: {rBans.map(a => CHAMPS.find(c=>c.id===a.id)?.name??a.id).join(" / ")}
                  </div>
                </div>
              </div>
              {fear.length > 0 && (
                <p className="fear-notice">⛔ 이번 게임 픽은 다음 게임에서 사용 불가</p>
              )}
            </div>
          )}

          {/* 완료 버튼 */}
          {done && (
            <div className="done-btns">
              {cfg?.n > 1 && gameNum < cfg.n && (
                <button className="action-btn next-btn" onClick={() => setShowSideModal(true)}>
                  ▶ 다음 게임
                </button>
              )}
              <button className="action-btn new-btn" onClick={reset}>↺ 새 시리즈</button>
            </div>
          )}

        </div>

        {/* 레드팀 */}
        <div className="team-col">
          <div className="team-header red">{cfg?.t2}</div>
          <div className="phase-label">— 밴 1페이즈 —</div>
          {[0,1,2].map(i => <Slot key={i} action={rBans[i]}  idx={i} phase="ban"  side="red" active={isSlotActive(2,"ban",i)}  />)}
          <div className="phase-label">— 픽 1페이즈 —</div>
          {[0,1,2].map(i => <Slot key={i} action={rPicks[i]} idx={i} phase="pick" side="red" active={isSlotActive(2,"pick",i)} />)}
          <div className="phase-label">— 밴 2페이즈 —</div>
          {[3,4].map(i =>   <Slot key={i} action={rBans[i]}  idx={i} phase="ban"  side="red" active={isSlotActive(2,"ban",i)}  />)}
          <div className="phase-label">— 픽 2페이즈 —</div>
          {[3,4].map(i =>   <Slot key={i} action={rPicks[i]} idx={i} phase="pick" side="red" active={isSlotActive(2,"pick",i)} />)}
        </div>

      </div>
    </div>
  );
}
