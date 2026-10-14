import React, {useId, useState} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './DriverCalculator.module.css';

const copy = {
  en: {
    title: 'Reference voltage calculator',
    current: 'RMS current (A)',
    voltage: 'Reference voltage (V)',
    calculate: 'Calculate',
    formula: 'Source formula: Vref = Irms × 1.41. The result is rounded to two decimal places.',
    hint: 'Enter a non-negative current. A decimal point or comma is accepted.',
    error: 'Enter a valid, non-negative current in amperes.',
    result: 'Calculated reference voltage:',
  },
  zh: {
    title: '参考电压计算器',
    current: 'RMS 电流（A）',
    voltage: '参考电压（V）',
    calculate: '计算',
    formula: '原文公式：Vref = Irms × 1.41，结果保留两位小数。',
    hint: '请输入非负电流，小数点或小数逗号均可。',
    error: '请输入有效的非负电流，单位为安培。',
    result: '计算得到的参考电压：',
  },
};

/**
 * Replaces the MkDocs inline calculator without document-wide form references.
 * @param {{type?: string, language?: 'auto'|'zh'|'en', initialCurrent?: string|number}} props
 */
export default function DriverCalculator({
  type = 'TMC2100',
  language = 'auto',
  initialCurrent = '0.6',
}) {
  const {i18n} = useDocusaurusContext();
  const locale = language === 'auto' ? i18n.currentLocale : language;
  const messages = copy[String(locale).startsWith('zh') ? 'zh' : 'en'];
  const id = useId();
  const [current, setCurrent] = useState(String(initialCurrent));
  const [voltage, setVoltage] = useState('');
  const [hasError, setHasError] = useState(false);

  function calculate(event) {
    event.preventDefault();
    const normalized = current.trim().replace(',', '.');
    const isDecimal = /^(?:\d+(?:\.\d*)?|\.\d+)$/.test(normalized);
    const amps = Number(normalized);
    const result = amps * 1.41;

    if (!isDecimal || !Number.isFinite(amps) || !Number.isFinite(result) || amps < 0) {
      setVoltage('');
      setHasError(true);
      return;
    }

    setHasError(false);
    setVoltage(result.toFixed(2));
  }

  function updateCurrent(event) {
    setCurrent(event.target.value);
    setVoltage('');
    setHasError(false);
  }

  return (
    <form className={styles.calculator} onSubmit={calculate} noValidate>
      <div className={styles.heading}>
        <span className={styles.model}>{type}</span>
        <strong>{messages.title}</strong>
      </div>
      <div className={styles.fields}>
        <label className={styles.field} htmlFor={`${id}-current`}>
          <span>{messages.current}</span>
          <input
            id={`${id}-current`}
            name="rms-current"
            type="text"
            inputMode="decimal"
            value={current}
            onChange={updateCurrent}
            aria-invalid={hasError}
            aria-describedby={`${id}-hint${hasError ? ` ${id}-error` : ''}`}
            autoComplete="off"
          />
        </label>
        <label className={styles.field} htmlFor={`${id}-voltage`}>
          <span>{messages.voltage}</span>
          <input
            id={`${id}-voltage`}
            name="reference-voltage"
            type="text"
            value={voltage}
            readOnly
            placeholder="—"
          />
        </label>
        <button className="button button--primary" type="submit">
          {messages.calculate}
        </button>
      </div>
      <p id={`${id}-hint`} className={styles.hint}>{messages.hint}</p>
      <p className={styles.formula}>{messages.formula}</p>
      {hasError && <p id={`${id}-error`} className={styles.error} role="alert">{messages.error}</p>}
      <span className={styles.srOnly} role="status" aria-live="polite">
        {voltage ? `${messages.result} ${voltage} V` : ''}
      </span>
    </form>
  );
}
