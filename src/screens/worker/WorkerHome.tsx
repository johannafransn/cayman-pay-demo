import { StatusBar } from '../../components/StatusBar';
import { Mark } from '../../components/icons';
import { BRAND } from '../../lib/brand';
import { EMPLOYEE, RECIPIENTS, DEFAULT_RECIPIENT, usd2, type Recipient } from '../../lib/remit';

interface Props {
  onSend: (r: Recipient) => void;
  onLogout: () => void;
}

export const WorkerHome = ({ onSend, onLogout }: Props) => (
  <div className="screen homev2">
    <div className="scroll">
      <div className="hero">
        <StatusBar />
        <div className="brandrow" style={{ marginTop: 4 }}>
          <div className="brand on-blue">
            <span className="mark">
              <Mark color="#0096C7" />
            </span>
            <span>{BRAND}</span>
          </div>
          <button className="logout" onClick={onLogout}>
            Log out
          </button>
        </div>

        <div className="herobody">
          <div className="eyebrow-light">Your balance</div>
          <div className="savedbig">{usd2(EMPLOYEE.balanceUsd)}</div>
          <div className="savedcap">ready to send or spend</div>
        </div>
      </div>

      <div className="accountcard">
        <div className="acctlabel">Your account</div>
        <div className="bizrow">
          <div className="em">
            {EMPLOYEE.emoji}
            <span className="verified">✓</span>
          </div>
          <div>
            <div className="n">{EMPLOYEE.name}</div>
            <div className="c">{EMPLOYEE.role}</div>
          </div>
        </div>
        <div className="acctdiv" />
        <button className="btn small" onClick={() => onSend(DEFAULT_RECIPIENT)}>
          Send money
        </button>
      </div>

      <div className="sectiontitle">Recent</div>
      <div className="activity">
        <div className="actrow">
          <div className="ic in">↓</div>
          <div className="info">
            <div className="n">Ironshore Construction</div>
            <div className="c">Wages · 2 days ago</div>
          </div>
          <div className="amt pos">+US$920.00</div>
        </div>
        <div className="actrow">
          <div className="ic out">↑</div>
          <div className="info">
            <div className="n">Mom · Kingston</div>
            <div className="c">Sent home · last week</div>
          </div>
          <div className="amt">−US$500.00</div>
        </div>
      </div>

      <div className="sectiontitle">Send money to</div>
      <div className="merchlist">
        {RECIPIENTS.map((r) => (
          <button key={r.id} className="merchrow" onClick={() => onSend(r)}>
            <div className="em">{r.flag}</div>
            <div className="info">
              <div className="n">{r.name}</div>
              <div className="c">
                {r.relation} · {r.city}, {r.country}
              </div>
            </div>
            <div className="needtag">
              gets {r.currency}
              <span className="vol">via {r.flag}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  </div>
);
