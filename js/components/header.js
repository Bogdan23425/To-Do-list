export function renderHeader(currentPath) {
  const link = (href, label, iconClass) => {
    const active = currentPath === href ? "active" : "";
    return `
      <a class="nav-link ${active}" href="#${href}">
        <span class="icon ${iconClass}" aria-hidden="true"></span>
        ${label}
      </a>
    `;
  };

  return `
    <div class="shell-inner">
      <div class="brand">
        <div class="brand-badge">
          <img src="assets/pixel/icon.png" alt="" />
        </div>
        <div>
          <div class="brand-title">MyTodo дневник</div>
          <div class="tag">тихий ежедневный ритуал</div>
        </div>
      </div>
      <nav class="shell-nav">
        ${link("/home", "Главная", "icon-sparkle")}
        ${link("/today", "Сегодня", "icon-leaf")}
        ${link("/history", "История", "icon-calendar")}
      </nav>
    </div>
  `;
}
