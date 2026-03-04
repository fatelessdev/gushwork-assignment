/**
 * Manufacturing Process Tabs Functionality
 * 
 * This module implements tabbed content for the manufacturing section:
 * - Switches between different manufacturing process steps
 * - Uses data attributes to connect tabs with panels
 * - Updates aria-selected for accessibility
 */
function initManufacturingTabs() {
  const tabs = document.querySelectorAll('.mfg-tab');
  const panels = document.querySelectorAll('.mfg-panel');
  
  // Exit if required elements don't exist
  if (!tabs.length || !panels.length) return;

  /**
   * Add click handler to each tab
   */
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      // Get the target panel ID from data attribute
      const targetPanel = tab.dataset.tab;

      // Reset all tabs to inactive state
      tabs.forEach((item) => {
        item.classList.remove('active');
        item.setAttribute('aria-selected', 'false');
      });

      // Activate the clicked tab
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      // Hide all panels then show the target panel
      panels.forEach((panel) => panel.classList.remove('active'));
      const activePanel = document.querySelector(`.mfg-panel[data-panel="${targetPanel}"]`);
      if (activePanel) {
        activePanel.classList.add('active');
      }
    });
  });
}

