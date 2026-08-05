(() => {
  if (document.querySelector('#frontendReadinessStyles')) return;
  const style = document.createElement('style');
  style.id = 'frontendReadinessStyles';
  style.textContent = `
    .form-section-title{grid-column:1/-1;margin:8px 0 0;padding-top:12px;border-top:1px solid var(--line);font-size:10px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:var(--muted)}
    .field-help{display:block;margin-top:4px;font-size:10px;line-height:1.35;color:var(--muted);font-weight:400}
    .completion-indicator{display:inline-block;margin-top:5px;padding:3px 6px;font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:.04em;border:1px solid}
    .completion-indicator.complete{color:#216047;background:#edf6f1;border-color:#b9d8c8}
    .completion-indicator.pending{color:#8b5b0b;background:#fff7df;border-color:#ead49a}
    input:disabled,select:disabled,textarea:disabled{background:#f1f3f2;color:#869088;cursor:not-allowed}
  `;
  document.head.appendChild(style);
})();