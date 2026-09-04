import { StatusBar } from '../../components/StatusBar';
import { Mark } from '../../components/icons';
import { BRAND } from '../../lib/brand';
import { BUSINESS, TEAM, payrollTotal, usd2, type Worker } from '../../lib/pay';

interface Props {
  onRunPayroll: () => void;
  onPayOne: (w: Worker) => void;
  onLogout: () => void;
}

export const OwnerHome = ({ onRunPayroll, onPayOne, onLogout }: Props) => {
  const total = payrollTotal(TEAM);
  return (
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
            <div className="eyebrow-light">Payroll balance</div>
            <div className="savedbig">{usd2(BUSINESS.payrollUsd)}</div>
            <div className="savedcap">{TEAM.length} workers on your team</div>
          </div>
        </div>

        <div className="accountcard">
          <div className="acctlabel">Your business</div>
          <div className="bizrow">
            <div className="em">
              {BUSINESS.emoji}
              <span className="verified">✓</span>
            </div>
            <div>
              <div className="n">{BUSINESS.name}</div>
              <div className="c">{BUSINESS.category}</div>
            </div>
          </div>
          <div className="savedline">
            You saved: <b>US${BUSINESS.savedThisMonth.toLocaleString('en-US', { maximumFractionDigits: 0 })}</b> this
            month in fees
          </div>
          <div className="acctdiv" />
          <button className="btn small" onClick={onRunPayroll}>
            Run payroll · {usd2(total)}
          </button>
        </div>

        <div className="sectiontitle">Your team</div>
        <div className="merchlist">
          {TEAM.map((w) => (
            <button key={w.id} className="merchrow" onClick={() => onPayOne(w)}>
              <div className="em">{w.flag}</div>
              <div className="info">
                <div className="n">{w.name}</div>
                <div className="c">
                  {w.role} · {w.country}
                </div>
              </div>
              <div className="needtag">
                {usd2(w.wage)}
                <span className="vol">this week</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
